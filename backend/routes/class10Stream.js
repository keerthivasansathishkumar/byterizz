import express from 'express';
import { getStreamRecommendation } from '../services/gemini.js';

const router = express.Router();

router.post('/class10-stream', async (req, res) => {
  try {
    const { studentName, answers, questions } = req.body;

    if (!studentName || !answers || !questions) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const recommendedStream = await getStreamRecommendation(studentName, answers, questions);
    
    res.json({ recommendedStream });
  } catch (error) {
    console.error('Error in class10-stream route:', error);
    res.status(500).json({ error: 'Failed to get stream recommendation' });
  }
});

export default router;

