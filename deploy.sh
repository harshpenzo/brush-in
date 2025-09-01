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

# Copy deployment configuration files to dist
echo "📋 Copying deployment configuration files..."
cp public/_redirects dist/ 2>/dev/null || echo "⚠️  _redirects not found"
cp vercel.json dist/ 2>/dev/null || echo "⚠️  vercel.json not found"
cp netlify.toml dist/ 2>/dev/null || echo "⚠️  netlify.toml not found"

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

# Test routing configuration
echo "🔗 Checking routing configuration..."
if [ -f "dist/_redirects" ]; then
    echo "✅ Netlify redirects configured"
else
    echo "⚠️  Netlify redirects not found - may cause routing issues"
fi

if [ -f "dist/vercel.json" ]; then
    echo "✅ Vercel configuration found"
else
    echo "⚠️  Vercel configuration not found - may cause routing issues"
fi

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
echo "4. Configure SPA routing (CRITICAL for /about page):"
echo "   - Netlify: Uses _redirects file (already included)"
echo "   - Vercel: Uses vercel.json (already included)"
echo "   - Apache: Add RewriteRule ^(?!.*\\.).*$ /index.html [L]"
echo "   - Nginx: Add try_files \$uri \$uri/ /index.html;"
echo "5. Test all routes and functionality"
echo "6. Monitor performance and errors"
