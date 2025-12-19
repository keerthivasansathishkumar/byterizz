# 🚀 Deploy ByteRizz - Get Your Shareable Link!

## Step 1: Save Your Logo
1. Save your logo image as: `frontend/public/logo.png`
2. Make sure it's named exactly `logo.png`

## Step 2: Deploy Frontend to Vercel (FREE)

### Option A: Using Vercel Website (Easiest)

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub (free, takes 1 minute)
3. **Click "Add New..." → "Project"**
4. **Import Git Repository**:
   - If you have GitHub: Connect and select your repo
   - If not: Click "Deploy" and upload your `frontend` folder
5. **Configure**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (if deploying from repo root)
   - **Environment Variables**: 
     - `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app` (add after backend deploy)
6. **Click "Deploy"**
7. **Wait 2-3 minutes**
8. **✅ You'll get a link like**: `https://byterizz.vercel.app`

### Option B: Using Vercel CLI (Faster)

```powershell
cd frontend
npm i -g vercel
vercel login
vercel --prod
```

This gives you a link in 1 minute!

## Step 3: Deploy Backend to Railway (FREE)

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Select your repository**
6. **Settings**:
   - **Root Directory**: `backend`
   - **Environment Variables** (Add these):
     ```
     GEMINI_API_KEY=AIzaSyBQxfwwgLyx4NSpEqG2g23CMbxYNeNIZ8k
     PORT=5000
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```
7. **Click "Deploy"**
8. **Wait 2-3 minutes**
9. **Copy your Railway URL** (like: `https://byterizz-backend.railway.app`)

## Step 4: Connect Frontend to Backend

1. **Go back to Vercel**
2. **Your Project → Settings → Environment Variables**
3. **Add/Update**:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app`
4. **Go to Deployments → Redeploy**

## Step 5: Share Your Link! 🎉

Your **Vercel URL** is your shareable link:
**https://your-app-name.vercel.app**

### ✅ Works on:
- ✅ Desktop computers
- ✅ Mobile phones
- ✅ Tablets
- ✅ Any device with internet!

### 📱 Mobile Features:
- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Mobile-optimized forms
- ✅ Fast loading

---

## Quick Checklist:

- [ ] Logo saved as `frontend/public/logo.png`
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Environment variables set
- [ ] Frontend connected to backend
- [ ] Tested on mobile phone
- [ ] Share link ready! 🎉

---

## Need Help?

If you get stuck:
1. Check error messages in Vercel/Railway dashboard
2. Make sure environment variables are set correctly
3. Wait a few minutes after deployment for DNS to update

**Your app will be live and shareable in 10 minutes!** 🚀


