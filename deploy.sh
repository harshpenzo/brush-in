#!/bin/bash

# Production Deployment Script for Brushin.in
# This script builds and prepares the application for production deployment

echo "🚀 Starting production deployment for Brushin.in..."

# Set production environment
export NODE_ENV=production
export VITE_APP_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf .vite/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build for production
echo "🔨 Building for production..."
npm run build

# Verify build output
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist/ directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check bundle sizes
echo "📊 Analyzing bundle sizes..."
du -sh dist/js/*.js
du -sh dist/css/*.css

# Verify critical files exist
echo "🔍 Verifying critical files..."
required_files=(
    "dist/index.html"
    "dist/manifest.json"
    "dist/sitemap.xml"
    "dist/robots.txt"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing!"
        exit 1
    fi
done

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf brushin-production-$(date +%Y%m%d-%H%M%S).tar.gz dist/

echo "🎉 Production deployment package ready!"
echo "📁 Archive created: brushin-production-*.tar.gz"
echo "📂 Build output: dist/"
echo ""
echo "Next steps:"
echo "1. Upload dist/ contents to your web server"
echo "2. Configure HTTPS/SSL certificate"
echo "3. Set up environment variables"
echo "4. Test all routes and functionality"
echo "5. Monitor performance and errors"
