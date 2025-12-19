# 🚀 Deploy ByteRizz - Quick Guide

## Step 1: Deploy Backend (Railway - FREE)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set Root Directory: `backend`
6. Add Environment Variables:
   - `GEMINI_API_KEY` = `AIzaSyBQxfwwgLyx4NSpEqG2g23CMbxYNeNIZ8k`
   - `PORT` = `3001`
7. Click "Deploy"
8. Copy your Railway URL (e.g., `https://your-app.railway.app`)

## Step 2: Deploy Frontend (Vercel - FREE)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Set Root Directory: `frontend`
6. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = Your Railway URL from Step 1
7. Click "Deploy"

## Step 3: Get Your Live Link! 🎉

Your app will be live at: `https://your-project-name.vercel.app`

**Share this link with anyone!**

---

## Alternative: Deploy Both on Render (FREE)

### Backend:
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Set:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: `GEMINI_API_KEY`, `PORT=3001`

### Frontend:
1. Click "New" → "Static Site"
2. Connect your repository
3. Set:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `frontend/.next`
   - Environment Variable: `NEXT_PUBLIC_API_URL`

---

## Need Help?

- Railway: https://docs.railway.app
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs



