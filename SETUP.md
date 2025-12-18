# ByteRizz Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Setup

**Backend Environment** (`backend/.env`):
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
COLLEGE_API_KEY=your_college_api_key_here
```

**Frontend Environment** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to `backend/.env`

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features Implemented

✅ Multi-language support (English, Hindi, Tamil)
✅ Student information form with conditional fields
✅ Gemini AI integration for career recommendations
✅ College matching with eligibility criteria (90%+)
✅ Responsive design for all devices
✅ Loading states and error handling
✅ Form validation

## Project Structure

```
byterizz/
├── frontend/          # Next.js application
│   ├── app/           # Pages and routes
│   ├── components/    # React components
│   └── lib/           # Utilities and contexts
├── backend/           # Express API server
│   ├── routes/        # API routes
│   ├── services/      # Business logic (Gemini, College API)
│   └── config/        # Configuration
└── README.md
```

## Notes

- The college data is currently using mock data. To integrate with real APIs, update `backend/services/collegeAPI.js`
- All components are fully responsive and support all three languages
- The application follows the complete flow: Language Selection → Student Form → Career Recommendations → College Details

