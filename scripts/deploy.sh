#!/bin/bash

# SageAI Deployment Script
echo "🚀 Starting SageAI deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build the client
echo "🔨 Building client..."
cd client
npm run build
cd ..

# Check if build was successful
if [ ! -d "client/dist" ]; then
    echo "❌ Error: Build failed. Check the build output above."
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Vercel"
echo "3. Set up environment variables in Vercel dashboard"
echo "4. Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md" 