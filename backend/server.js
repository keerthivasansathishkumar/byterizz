import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import careerRoutes from './routes/career.js';
import collegeRoutes from './routes/colleges.js';
import class10StreamRoutes from './routes/class10Stream.js';

dotenv.config();

const app = express();

// 1. MANUAL CORS & PREFLIGHT HANDLING (The Fix)
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://byterizz-1.vercel.app', 
    'https://byterizz-etde.vercel.app', 
    'https://byterizz-lsd1.vercel.app',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // If the browser is just "testing" the connection (OPTIONS), say OK immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// 2. STANDARD MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: true, // Reflects the origin allowed above
  credentials: true
}));

// 3. ROUTES
app.use('/api/career', careerRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/class10', class10StreamRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ByteRizz API Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// IMPORTANT: Vercel needs the app exported
export default app;

// Local development listener
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}