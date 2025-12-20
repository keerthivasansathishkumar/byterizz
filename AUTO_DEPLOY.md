# 🚀 Auto-Deploy ByteRizz - Easiest Method!

## Option 1: Netlify Drop (NO SIGNUP NEEDED!) ⚡

1. **Go to**: https://app.netlify.com/drop
2. **Drag and drop** your entire project folder
3. **Wait 2 minutes** - Netlify will build it
4. **Get your live link** instantly! 🎉

**Note**: For backend, you'll need to deploy separately to Railway (see below)

---

## Option 2: Vercel CLI (One Command!) ⚡

### Frontend:
```bash
cd frontend
npx vercel --prod
```

### Backend (Railway):
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Set Root Directory: `backend`
5. Add Environment Variables:
   - `GEMINI_API_KEY` = `AIzaSyBQxfwwgLyx4NSpEqG2g23CMbxYNeNIZ8k`
   - `PORT` = `3001`
6. Copy Railway URL
7. In Vercel, add environment variable: `NEXT_PUBLIC_API_URL` = Your Railway URL

---

## Option 3: GitHub Pages (FREE Forever!)

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source: `frontend` folder
4. Your site will be live at: `https://yourusername.github.io/repo-name`

---

## Quick Deploy Script

Run this PowerShell script:

```powershell
# Deploy Frontend to Vercel
cd frontend
npx vercel --prod --yes

# Your app will be live in 2 minutes!
```

---

## Need Help?

- **Netlify**: https://docs.netlify.com
- **Vercel**: https://vercel.com/docs
- **Railway**: https://docs.railway.app

**All services are FREE for personal projects!** 🎉





