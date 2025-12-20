# Deploy Frontend to Vercel Script

Write-Host "ByteRizz - Deploy to Vercel" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version
    Write-Host "Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host ""
Write-Host "Deploying frontend to Vercel..." -ForegroundColor Cyan
Write-Host ""

Set-Location frontend
vercel --prod

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Don't forget to:" -ForegroundColor Yellow
Write-Host "1. Add NEXT_PUBLIC_API_URL in Vercel dashboard" -ForegroundColor Yellow
Write-Host "2. Deploy backend to Railway or Render" -ForegroundColor Yellow





