# ByteRizz Auto-Deploy Script
# This script will help you deploy your app easily!

Write-Host "🚀 ByteRizz Deployment Helper" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Choose deployment method:" -ForegroundColor Cyan
Write-Host "1. Vercel (Recommended - Easiest)" -ForegroundColor White
Write-Host "2. Netlify Drop (No signup needed)" -ForegroundColor White
Write-Host "3. Manual Instructions" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Deploying to Vercel..." -ForegroundColor Cyan
        Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
        
        # Install Vercel CLI globally
        npm install -g vercel
        
        Write-Host ""
        Write-Host "Deploying frontend..." -ForegroundColor Cyan
        Set-Location frontend
        vercel --prod
        
        Write-Host ""
        Write-Host "✅ Frontend deployed!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Deploy backend to Railway: https://railway.app" -ForegroundColor White
        Write-Host "2. Add environment variable NEXT_PUBLIC_API_URL in Vercel dashboard" -ForegroundColor White
    }
    "2" {
        Write-Host ""
        Write-Host "📦 Netlify Drop Method:" -ForegroundColor Cyan
        Write-Host "1. Go to: https://app.netlify.com/drop" -ForegroundColor White
        Write-Host "2. Drag and drop your 'frontend' folder" -ForegroundColor White
        Write-Host "3. Wait 2 minutes - Get your live link!" -ForegroundColor White
        Write-Host ""
        Write-Host "For backend, use Railway: https://railway.app" -ForegroundColor Yellow
    }
    "3" {
        Write-Host ""
        Write-Host "📖 Manual Deployment Instructions:" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "See AUTO_DEPLOY.md for detailed instructions" -ForegroundColor White
        Write-Host ""
        Write-Host "Quick steps:" -ForegroundColor Yellow
        Write-Host "1. Frontend: Deploy to Vercel (vercel.com)" -ForegroundColor White
        Write-Host "2. Backend: Deploy to Railway (railway.app)" -ForegroundColor White
        Write-Host "3. Connect them with environment variables" -ForegroundColor White
    }
    default {
        Write-Host "Invalid choice!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✅ Done! Your app will be live soon!" -ForegroundColor Green





