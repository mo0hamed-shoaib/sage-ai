const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { groq } = require('@ai-sdk/groq');
const { generateText } = require('ai');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const OpenAI = require('openai');
const path = require('path');

// For Vercel deployment, we need to handle file uploads differently
const isVercel = process.env.VERCEL === '1';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Keys
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// Multer setup for file uploads
const upload = multer({ 
    dest: isVercel ? '/tmp/' : 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    }
});

// OpenAI API setup
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'SageAI is running with Groq and Hugging Face integration!' });
});

// Chat endpoint with Groq integration
app.post('/api/chat', async (req, res) => {
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
});

// Image generation endpoint with Hugging Face
app.post('/api/generate-image', async (req, res) => {
    try {
        const { prompt, model = 'stabilityai/stable-diffusion-xl-base-1.0' } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        if (!HUGGING_FACE_API_KEY || HUGGING_FACE_API_KEY === 'hf_...') {
            return res.status(400).json({
                error: 'Hugging Face API key not configured. Please add your API key to the server.',
                details: 'Get your free API key from https://huggingface.co/settings/tokens'
            });
        }

        console.log(`Generating image with prompt: "${prompt}" using model: ${model}`);

        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            { inputs: prompt },
            {
                headers: {
                    'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'image/png'
                },
                responseType: 'arraybuffer',
                timeout: 60000 // 60 second timeout
            }
        );

        // Convert the image buffer to base64
        const imageBuffer = Buffer.from(response.data);
        const base64Image = imageBuffer.toString('base64');
        const mimeType = response.headers['content-type'] || 'image/png';

        res.json({
            image: `data:${mimeType};base64,${base64Image}`,
            prompt: prompt,
            model: model,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Hugging Face API Error:', error);

        if (error.response) {
            // API error response
            let errorMessage = 'Unknown API error';

            if (error.response.status === 503) {
                errorMessage = 'Model is currently loading. Please try again in a few moments.';
            } else if (error.response.status === 404) {
                errorMessage = 'Model not found. Please try a different model.';
            } else if (error.response.status === 429) {
                errorMessage = 'Rate limit exceeded. Please wait a moment before trying again.';
            } else if (error.response.data) {
                try {
                    const errorData = JSON.parse(error.response.data.toString());
                    errorMessage = errorData.error || errorData.message || 'API error';
                } catch {
                    errorMessage = error.response.data.toString();
                }
            }

            res.status(error.response.status).json({
                error: 'Failed to generate image',
                details: errorMessage
            });
        } else if (error.code === 'ECONNABORTED') {
            res.status(408).json({
                error: 'Request timeout',
                details: 'The request took too long. Please try again.'
            });
        } else {
            // Network or other error
            res.status(500).json({
                error: 'Failed to generate image',
                details: error.message
            });
        }
    }
});

// Get available image models
app.get('/api/image-models', (req, res) => {
    const models = [
        {
            id: 'stabilityai/stable-diffusion-xl-base-1.0',
            name: 'Stable Diffusion XL',
            description: 'Latest and most advanced Stable Diffusion model'
        },
        {
            id: 'runwayml/stable-diffusion-v1-5',
            name: 'Stable Diffusion 1.5',
            description: 'Fast and reliable, most commonly used model'
        },
        {
            id: 'CompVis/stable-diffusion-v1-4',
            name: 'Stable Diffusion 1.4',
            description: 'Original Stable Diffusion model, very stable'
        },
        {
            id: 'stabilityai/stable-diffusion-2',
            name: 'Stable Diffusion 2.1',
            description: 'High-quality image generation with good prompt understanding'
        }
    ];

    res.json({ models });
});

// File upload endpoint for OpenAI
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    if (!OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API key not configured' });
    }
    try {
        // Attach the original filename to the stream
        const fileStream = fs.createReadStream(req.file.path);
        fileStream.path = req.file.path; // for compatibility
        fileStream.filename = req.file.originalname; // <-- This is the key line

        const response = await openai.files.create({
            file: fileStream,
            purpose: 'assistants'
        });
        
        // Clean up the temporary file
        try {
            fs.unlinkSync(req.file.path);
        } catch (cleanupError) {
            console.warn('Failed to cleanup temporary file:', cleanupError);
        }
        
        res.json({ file_id: response.id, file: response });
    } catch (error) {
        console.error('OpenAI File Upload Error:', error);
        
        // Clean up the temporary file on error
        try {
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path);
            }
        } catch (cleanupError) {
            console.warn('Failed to cleanup temporary file on error:', cleanupError);
        }
        
        res.status(500).json({ error: 'Failed to upload file to OpenAI', details: error.message, stack: error.stack });
    }
});

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log('Groq API integration ready!');
        console.log('Hugging Face image generation ready!');
        if (!HUGGING_FACE_API_KEY || HUGGING_FACE_API_KEY === 'hf_...') {
            console.log('⚠️  Please add your Hugging Face API key to use image generation');
            console.log('   Get your free API key from: https://huggingface.co/settings/tokens');
        }
    });
}

// Export for Vercel
module.exports = app;
