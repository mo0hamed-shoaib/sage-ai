module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
}; 