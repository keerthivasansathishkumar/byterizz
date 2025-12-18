import express from 'express';
import { getCollegesForCareer } from '../services/collegeAPI.js';

const router = express.Router();

router.get('/:careerId', async (req, res) => {
  try {
    const { careerId } = req.params;
    const { marks, jeeRank, neetRank, catScore, matScore, stream } = req.query; // Get student data from query params

    if (!careerId) {
      return res.status(400).json({
        error: 'Missing career ID',
        message: 'Please provide a valid career ID',
      });
    }

    // Convert query params to numbers
    const studentMarks = marks ? parseFloat(marks) : null;
    const studentJeeRank = jeeRank && jeeRank !== 'null' ? parseInt(jeeRank) : null;
    const studentNeetRank = neetRank && neetRank !== 'null' ? parseInt(neetRank) : null;
    const studentCatScore = catScore && catScore !== 'null' ? parseFloat(catScore) : null;
    const studentMatScore = matScore && matScore !== 'null' ? parseFloat(matScore) : null;

    const result = await getCollegesForCareer(careerId, {
      marks: studentMarks,
      jeeRank: studentJeeRank,
      neetRank: studentNeetRank,
      catScore: studentCatScore,
      matScore: studentMatScore,
      stream: stream,
    });
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({
      error: 'Failed to fetch college information',
      message: error.message,
    });
  }
});

export default router;

