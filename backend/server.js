import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import careerRoutes from './routes/career.js';
import collegeRoutes from './routes/colleges.js';
import class10StreamRoutes from './routes/class10Stream.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins in production, or specify your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/career', careerRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/career', class10StreamRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ByteRizz API Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// trigger railway deploy


