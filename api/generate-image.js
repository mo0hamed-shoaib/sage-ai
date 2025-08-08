const axios = require('axios');

// API Keys
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

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
}; 