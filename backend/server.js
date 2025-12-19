import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import careerRoutes from './routes/career.js';
import collegeRoutes from './routes/colleges.js';
import class10StreamRoutes from './routes/class10Stream.js';

dotenv.config();

const app = express();

// FIXED CORS: We are explicitly telling the backend to trust your frontend
app.use(cors({
  origin: ['https://byterizz-etde.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/career', careerRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/class10', class10StreamRoutes); // Changed path to avoid double /career

// Health check
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

// Vercel needs the app to be exported
export default app;

// Only run app.listen if NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}