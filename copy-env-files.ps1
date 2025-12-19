# Copy Environment Files Script

Write-Host "Setting up environment files..." -ForegroundColor Cyan

# Copy backend env file
if (Test-Path "backend\env.example") {
    if (-not (Test-Path "backend\.env")) {
        Copy-Item "backend\env.example" "backend\.env"
        Write-Host "Created backend/.env" -ForegroundColor Green
    } else {
        Write-Host "backend/.env already exists, skipping..." -ForegroundColor Yellow
    }
} else {
    Write-Host "backend/env.example not found!" -ForegroundColor Red
}

# Copy frontend env file
if (Test-Path "frontend\env.local.example") {
    if (-not (Test-Path "frontend\.env.local")) {
        Copy-Item "frontend\env.local.example" "frontend\.env.local"
        Write-Host "Created frontend/.env.local" -ForegroundColor Green
    } else {
        Write-Host "frontend/.env.local already exists, skipping..." -ForegroundColor Yellow
    }
} else {
    Write-Host "frontend/env.local.example not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Environment files setup complete!" -ForegroundColor Green
Write-Host "Don't forget to add your Gemini API key to backend/.env" -ForegroundColor Yellow



