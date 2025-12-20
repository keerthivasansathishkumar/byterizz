# Deploy ByteRizz to Vercel (FREE - Get Shareable Link)

## Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub (free)
3. Verify your email

## Step 2: Deploy Frontend
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Connect your GitHub account
4. Select your repository (or create one)
5. **Root Directory**: Set to `frontend`
6. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app` (after deploying backend)
7. Click "Deploy"
8. Wait 2-3 minutes
9. **You'll get a link like: https://byterizz.vercel.app**

## Step 3: Deploy Backend to Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Click "Deploy from GitHub repo"
5. Select your repository
6. **Root Directory**: Set to `backend`
7. **Environment Variables**:
   - `GEMINI_API_KEY` = `AIzaSyBQxfwwgLyx4NSpEqG2g23CMbxYNeNIZ8k`
   - `PORT` = `5000`
   - `FRONTEND_URL` = `https://your-frontend-url.vercel.app`
8. Click "Deploy"
9. Wait 2-3 minutes
10. **You'll get a link like: https://byterizz-backend.railway.app**

## Step 4: Update Frontend URL
1. Go back to Vercel
2. Go to your project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to your Railway backend URL
4. Redeploy

## Step 5: Share Your Link!
Your frontend URL (from Vercel) is your shareable link!
Example: https://byterizz.vercel.app

---

## Quick Deploy Script (Alternative)

If you have Vercel CLI installed:
```powershell
cd frontend
npm i -g vercel
vercel login
vercel --prod
```

This will give you a shareable link instantly!




