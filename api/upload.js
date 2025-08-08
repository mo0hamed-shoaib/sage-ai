const multer = require('multer');
const fs = require('fs');
const OpenAI = require('openai');

// API Keys
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// OpenAI API setup
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// For Vercel deployment, we need to handle file uploads differently
const isVercel = process.env.VERCEL === '1';

// Multer setup for file uploads
const upload = multer({ 
    dest: isVercel ? '/tmp/' : 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    }
});

// Create a middleware function
const uploadMiddleware = upload.single('file');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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

    // Use multer middleware
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ error: 'File upload error', details: err.message });
        }

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
}; 