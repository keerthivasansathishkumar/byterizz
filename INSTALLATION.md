# ByteRizz Installation Guide

## Step 1: Install Node.js

**Download and install Node.js:**
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer and follow the setup wizard
4. **Important**: Make sure to check "Add to PATH" during installation
5. Restart your computer or terminal after installation

**Verify installation:**
Open PowerShell or Command Prompt and run:
```powershell
node --version
npm --version
```

You should see version numbers. If you get an error, Node.js is not in your PATH.

## Step 2: Setup Environment Files

### Backend Environment

1. Copy `backend/env.example` to `backend/.env`:
   ```powershell
   Copy-Item backend\env.example backend\.env
   ```

2. Edit `backend/.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   COLLEGE_API_KEY=optional
   ```

### Frontend Environment

1. Copy `frontend/env.local.example` to `frontend/.env.local`:
   ```powershell
   Copy-Item frontend\env.local.example frontend\.env.local
   ```

2. The file should already have the correct API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

## Step 3: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the generated API key
5. Paste it in `backend/.env` file (replace `your_actual_api_key_here`)

## Step 4: Install Dependencies

### Option A: Using Setup Script (Recommended)

Run the PowerShell setup script:
```powershell
.\setup.ps1
```

### Option B: Manual Installation

**Install Frontend Dependencies:**
```powershell
cd frontend
npm install
cd ..
```

**Install Backend Dependencies:**
```powershell
cd backend
npm install
cd ..
```

## Step 5: Run the Application

You need **TWO terminal windows** open:

### Terminal 1 - Backend Server:
```powershell
cd backend
npm run dev
```

You should see: `Server is running on port 5000`

### Terminal 2 - Frontend Server:
```powershell
cd frontend
npm run dev
```

You should see: `Ready on http://localhost:3000`

## Step 6: Access the Application

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/health

## Quick Start Scripts

After installation, you can use these scripts:

**Start Backend:**
```powershell
.\start-backend.ps1
```

**Start Frontend:**
```powershell
.\start-frontend.ps1
```

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your terminal after installing Node.js
- Reinstall Node.js and make sure "Add to PATH" is checked

### "Port 5000 already in use"
- Another application is using port 5000
- Change PORT in `backend/.env` to a different number (e.g., 5001)
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` accordingly

### "Cannot find module" errors
- Run `npm install` again in the respective directory
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### Gemini API errors
- Verify your API key is correct
- Check API key has proper permissions
- The app will use fallback recommendations if API fails

### Dependencies fail to install
- Check your internet connection
- Try: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

## Project Structure

```
byterizz/
├── frontend/              # Next.js React application
│   ├── app/              # Pages (home, contact, career)
│   ├── components/       # React components
│   ├── lib/              # Utilities (i18n, context)
│   └── public/           # Static assets
├── backend/              # Express API server
│   ├── routes/           # API endpoints
│   ├── services/         # Gemini & College APIs
│   └── config/           # Configuration
├── setup.ps1             # Windows setup script
├── start-backend.ps1     # Start backend script
├── start-frontend.ps1    # Start frontend script
└── README.md
```

## Next Steps After Installation

1. ✅ Node.js installed
2. ✅ Dependencies installed
3. ✅ Environment files configured
4. ✅ Gemini API key added
5. ✅ Both servers running
6. 🎉 Open http://localhost:3000 and start using ByteRizz!

## Need Help?

- Check `QUICK_START.md` for quick reference
- Check `SETUP.md` for detailed setup instructions
- Check `README.md` for project overview


