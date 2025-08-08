# SageAI Deployment Guide

## Vercel Deployment Setup

This guide will help you deploy SageAI to Vercel.

### Prerequisites

1. A Vercel account
2. API keys for the following services:
   - Groq API key
   - Hugging Face API key
   - OpenAI API key (optional, for file uploads)
   - OpenAI Assistant ID (optional, for file uploads)

### Environment Variables

Set the following environment variables in your Vercel project settings:

```
GROQ_API_KEY=your_groq_api_key_here
HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ASSISTANT_ID=your_openai_assistant_id_here
NODE_ENV=production
```

### Deployment Steps

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

2. **Configure build settings:**
   - Framework Preset: Other
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm run install:all`

3. **Set environment variables:**
   - Go to your project settings in Vercel
   - Navigate to the "Environment Variables" section
   - Add all the required environment variables listed above

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application

### API Endpoints

After deployment, your API will be available at:
- Chat: `https://your-domain.vercel.app/api/chat`
- Image Generation: `https://your-domain.vercel.app/api/generate-image`
- File Upload: `https://your-domain.vercel.app/api/upload`
- Image Models: `https://your-domain.vercel.app/api/image-models`

### Local Development

To run the project locally:

```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev
```

This will start both the client (port 3000) and server (port 5001).

### Troubleshooting

1. **Build errors:** Make sure all dependencies are properly installed
2. **API errors:** Verify all environment variables are set correctly
3. **File upload issues:** Ensure OpenAI API key is configured for file uploads
4. **CORS errors:** The server is configured to handle CORS automatically

### Notes

- The application uses Vercel's serverless functions for the backend
- File uploads are handled using temporary storage in `/tmp` directory
- The frontend is built as a static site and served by Vercel
- All API calls automatically adapt to the deployment environment 