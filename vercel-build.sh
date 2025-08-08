#!/bin/bash

# Vercel Build Script for SageAI
echo "🔨 Building SageAI for Vercel..."

# Install root dependencies
npm install

# Install client dependencies and build
cd client
npm install
npm run build
cd ..

# Install server dependencies
cd server
npm install
cd ..

echo "✅ Build completed!" 