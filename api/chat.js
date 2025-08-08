const { groq } = require('@ai-sdk/groq');
const { generateText } = require('ai');
const OpenAI = require('openai');

// API Keys
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

// OpenAI API setup
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, file_ids } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // If file_ids are present, use OpenAI Assistant API
        if (file_ids && file_ids.length > 0 && OPENAI_API_KEY && ASSISTANT_ID) {
            try {
                // 1. Create a thread
                const thread = await openai.beta.threads.create();
                if (!thread || !thread.id) {
                    console.error('Failed to create thread:', thread);
                    return res.status(500).json({ error: 'Failed to create thread', details: thread });
                }
                // 2. Add a message to the thread with file_ids
                await openai.beta.threads.messages.create(thread.id, {
                    role: 'user',
                    content: message,
                    attachments: file_ids.map(id => ({ file_id: id, tools: [{ type: 'file_search' }] }))
                });
                // 3. Run the assistant
                const run = await openai.beta.threads.runs.create(thread.id, {
                    assistant_id: ASSISTANT_ID
                });
                // 4. Poll for completion
                let runStatus = run.status;
                let runResult = run;
                let attempts = 0;
                while (runStatus !== 'completed' && runStatus !== 'failed' && attempts < 30) {
                    await new Promise(r => setTimeout(r, 2000));
                    runResult = await openai.beta.threads.runs.retrieve(thread.id, run.id);
                    runStatus = runResult.status;
                    attempts++;
                }
                if (runStatus !== 'completed') {
                    return res.status(500).json({ error: 'Assistant run did not complete', status: runStatus });
                }
                // 5. Get the latest message from the assistant
                const messages = await openai.beta.threads.messages.list(thread.id);
                const lastMsg = messages.data.find(m => m.role === 'assistant');
                const responseText = lastMsg?.content?.[0]?.text?.value || 'No response from assistant.';
                return res.json({ response: responseText, timestamp: new Date().toISOString(), file_ids });
            } catch (err) {
                console.error('OpenAI Assistant API Error:', err.response?.data || err.message);
                return res.status(500).json({ error: 'Failed to get response from OpenAI Assistant', details: err.response?.data || err.message });
            }
        }

        // Otherwise, use Groq as before
        // Generate response using Groq
        const { text } = await generateText({
            model: groq('llama-3.3-70b-versatile'),
            prompt: message,
            apiKey: GROQ_API_KEY,
        });

        res.json({
            response: text,
            timestamp: new Date().toISOString(),
            file_ids: file_ids || []
        });
    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({
            error: 'Failed to generate response',
            details: error.message
        });
    }
}; 