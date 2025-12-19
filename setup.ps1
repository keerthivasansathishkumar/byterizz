# ByteRizz Setup Script for Windows PowerShell

Write-Host "ByteRizz Setup Script" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
Write-Host "Checking for npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm is not installed or not in PATH!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install frontend dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "Frontend dependencies installed successfully!" -ForegroundColor Green

Write-Host ""
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location ../backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install backend dependencies!" -ForegroundColor Red
    exit 1
}
Write-Host "Backend dependencies installed successfully!" -ForegroundColor Green

Set-Location ..

Write-Host ""
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Add your Gemini API key to backend/.env" -ForegroundColor Yellow
Write-Host "2. Run 'npm run dev' in the backend directory" -ForegroundColor Yellow
Write-Host "3. Run 'npm run dev' in the frontend directory" -ForegroundColor Yellow
Write-Host "4. Open http://localhost:3000 in your browser" -ForegroundColor Yellow



