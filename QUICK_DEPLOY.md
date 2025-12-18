# Quick Deploy Guide - Make ByteRizz Public

## Easiest Way: Vercel (5 minutes)

### Step 1: Deploy Frontend

1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
6. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: (you'll add this after backend is deployed)
7. Click "Deploy"
8. **Your frontend is live!** Copy the URL

### Step 2: Deploy Backend

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add Service → Select `backend` folder
6. Add Environment Variables:
   - `GEMINI_API_KEY` = your API key
   - `PORT` = 5000
7. Click "Deploy"
8. **Your backend is live!** Copy the URL

### Step 3: Connect Frontend to Backend

1. Go back to Vercel
2. Project Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` = your Railway backend URL
4. Redeploy

### Step 4: Share Your App!

Your app is now live at: `https://your-app-name.vercel.app`

Share this link with anyone! 🎉

---

## Alternative: Render (All-in-One)

1. Go to: https://render.com
2. Sign up
3. Create **Web Service** for backend
4. Create **Static Site** for frontend
5. Add environment variables
6. Deploy both
7. Done!

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs


