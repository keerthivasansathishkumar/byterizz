# ByteRizz Career Success Web Application

A multi-language career guidance web application that helps students discover their ideal career path using AI-powered recommendations.

## Features

- 🌐 Multi-language support (English, Hindi, Tamil)
- 🤖 AI-powered career recommendations using Google Gemini
- 🎓 College matching with eligibility criteria
- 📊 Detailed college information (fees, duration, application dates)
- 📱 Responsive design for all devices

## Project Structure

- `frontend/` - Next.js React application
- `backend/` - Node.js Express API server

## Quick Setup

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Google Gemini API Key** - [Get it here](https://makersuite.google.com/app/apikey)

### Quick Start (Windows PowerShell)

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Make sure to check "Add to PATH" during installation

2. **Run the setup script:**
   ```powershell
   .\setup.ps1
   ```

3. **Copy environment files:**
   ```powershell
   .\copy-env-files.ps1
   ```

4. **Add your Gemini API key:**
   - Edit `backend/.env` and replace `your_gemini_api_key_here` with your actual API key

5. **Start the servers:**

   Terminal 1 (Backend):
   ```powershell
   .\start-backend.ps1
   ```

   Terminal 2 (Frontend):
   ```powershell
   .\start-frontend.ps1
   ```

6. **Open** [http://localhost:3000](http://localhost:3000) in your browser

### Detailed Setup Instructions

For detailed step-by-step instructions, see:
- **[INSTALLATION.md](INSTALLATION.md)** - Complete installation guide
- **[QUICK_START.md](QUICK_START.md)** - Quick reference guide

## Usage

1. Visit the home page
2. Click "Choose Your Career" button
3. Select your preferred language
4. Fill in your student information
5. Get AI-powered career recommendations
6. Select a career to see eligible colleges

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: Google Gemini API
- **APIs**: External college data APIs

