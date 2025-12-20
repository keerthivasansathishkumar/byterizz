import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import careerRoutes from './routes/career.js';
import collegeRoutes from './routes/colleges.js';
import class10StreamRoutes from './routes/class10Stream.js';

dotenv.config();

const app = express();

// Simplified and more robust CORS
const allowedOrigins = [
  'https://byterizz-1.vercel.app', 
  'https://byterizz-etde.vercel.app', 
  'https://byterizz-lsd1.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ROUTES
app.use('/api/career', careerRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/class10', class10StreamRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ByteRizz API Server is running' });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}