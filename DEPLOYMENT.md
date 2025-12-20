# ByteRizz Deployment Guide

## How to Publish and Share Your Application

### Option 1: Deploy to Vercel (Recommended - Free & Easy)

**Frontend Deployment:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy Frontend:**
   ```bash
   cd frontend
   vercel
   ```
   - Follow the prompts
   - Your app will be live at: `https://your-app-name.vercel.app`

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Add: `NEXT_PUBLIC_API_URL` = your backend URL

**Backend Deployment:**

1. **Deploy Backend to Railway/Render:**
   - Go to https://railway.app or https://render.com
   - Connect your GitHub repository
   - Select the `backend` folder
   - Add environment variables:
     - `GEMINI_API_KEY` = your API key
     - `PORT` = 5000
   - Deploy

2. **Update Frontend API URL:**
   - Update `NEXT_PUBLIC_API_URL` in Vercel to your backend URL

### Option 2: Deploy to Netlify (Free)

**Frontend:**

1. Go to https://www.netlify.com
2. Sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
6. Add environment variable: `NEXT_PUBLIC_API_URL`

**Backend:**

- Use Railway, Render, or Heroku for backend
- Same steps as above

### Option 3: Deploy to Render (Free)

**Full Stack Deployment:**

1. Go to https://render.com
2. Create account
3. Create two services:

   **Backend Service:**
   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `GEMINI_API_KEY`
     - `PORT=5000`

   **Frontend Service:**
   - New → Static Site
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `frontend/.next`
   - Environment Variables:
     - `NEXT_PUBLIC_API_URL` = your backend URL

### Quick Deploy Commands

**For Vercel (Frontend):**
```bash
cd frontend
npm install -g vercel
vercel --prod
```

**For Railway (Backend):**
```bash
# Install Railway CLI
npm i -g @railway/cli
railway login
cd backend
railway init
railway up
```

### Environment Variables Setup

**Frontend (.env.local or Vercel/Netlify):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Backend (.env or Railway/Render):**
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
COLLEGE_API_KEY=optional
```

### After Deployment

1. Your frontend will be live at: `https://your-app.vercel.app`
2. Your backend will be live at: `https://your-backend.railway.app`
3. Share the frontend URL with others!

### Troubleshooting

- **CORS Issues:** Make sure backend allows your frontend domain
- **API Not Working:** Check environment variables are set correctly
- **Build Errors:** Make sure all dependencies are installed

### Free Hosting Options Summary

| Service | Frontend | Backend | Free Tier |
|---------|----------|---------|-----------|
| Vercel | ✅ | ❌ | Yes |
| Netlify | ✅ | ❌ | Yes |
| Railway | ❌ | ✅ | Yes (limited) |
| Render | ✅ | ✅ | Yes |
| Heroku | ❌ | ✅ | No (paid) |

**Recommended:** Vercel (Frontend) + Railway (Backend) = Both Free!





