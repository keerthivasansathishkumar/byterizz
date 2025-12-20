# How to Run ByteRizz Application

## Prerequisites
- Node.js installed (v18 or higher)
- npm or yarn package manager
- Gemini API key

## Step 1: Install Dependencies

### Backend
```powershell
cd backend
npm install
```

### Frontend
```powershell
cd frontend
npm install
```

## Step 2: Setup Environment Variables

### Backend (.env file in backend folder)
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local file in frontend folder)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Step 3: Start the Application

### Terminal 1 - Start Backend Server
```powershell
cd backend
npm start
```
The backend will run on http://localhost:5000

### Terminal 2 - Start Frontend Server
```powershell
cd frontend
npm run dev
```
The frontend will run on http://localhost:3000

## Step 4: Open in Browser

Open your browser and navigate to:
**http://localhost:3000**

## Quick Start Script (PowerShell)

You can also use the provided scripts:

### Start Backend
```powershell
.\start-backend.ps1
```

### Start Frontend
```powershell
.\start-frontend.ps1
```

## Troubleshooting

1. **Port already in use**: Change the PORT in backend/.env or use a different port
2. **API connection error**: Make sure backend is running before starting frontend
3. **Gemini API error**: Check your API key in backend/.env
4. **Module not found**: Run `npm install` in both backend and frontend folders

## Features Available

✅ Currently studying option
✅ Class 10 AI-powered stream selection
✅ Class 12 subject combinations
✅ Law interest option
✅ Competitive exams tracking
✅ Scholarship eligibility form
✅ Fee-based college filters
✅ 100+ colleges database
✅ State counseling options

Enjoy using ByteRizz! 🚀




