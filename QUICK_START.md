# Quick Start Guide

## Prerequisites

1. **Node.js** (v18 or higher) - Download from [https://nodejs.org/](https://nodejs.org/)
2. **npm** (comes with Node.js)

## Automatic Setup (Windows)

Run the setup script in PowerShell:
```powershell
.\setup.ps1
```

## Manual Setup

### Step 1: Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

**Backend** (`backend/.env`):
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
COLLEGE_API_KEY=optional_college_api_key
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Step 3: Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in `backend/.env`

### Step 4: Run the Application

**Option 1: Use PowerShell Scripts (Windows)**

Terminal 1 - Backend:
```powershell
.\start-backend.ps1
```

Terminal 2 - Frontend:
```powershell
.\start-frontend.ps1
```

**Option 2: Manual Commands**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Troubleshooting

### Node.js/npm not found
- Make sure Node.js is installed and added to PATH
- Restart your terminal after installing Node.js
- Verify installation: `node --version` and `npm --version`

### Port already in use
- Change the PORT in `backend/.env` if 5000 is taken
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` accordingly

### Gemini API errors
- Verify your API key is correct in `backend/.env`
- Check that you have API access enabled in Google AI Studio
- The app will use fallback career recommendations if API fails

### Dependencies installation fails
- Try deleting `node_modules` folders and `package-lock.json` files
- Run `npm install` again
- Make sure you have internet connection

## Project Structure

```
byterizz/
├── frontend/          # Next.js React app
│   ├── app/          # Pages (home, contact, career)
│   ├── components/   # React components
│   └── lib/          # Utilities (i18n, context)
├── backend/          # Express API server
│   ├── routes/       # API endpoints
│   ├── services/     # Gemini & College APIs
│   └── config/       # Configuration
└── README.md
```

## Features

✅ Multi-language (English, Hindi, Tamil)
✅ AI-powered career recommendations
✅ College matching with eligibility
✅ Responsive design
✅ Form validation

Enjoy using ByteRizz! 🚀


