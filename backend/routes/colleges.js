import express from 'express';
import { getCollegesForCareer } from '../services/collegeAPI.js';

const router = express.Router();

router.get('/:careerId', async (req, res) => {
  try {
    const { careerId } = req.params;
    const { marks, jeeRank, neetRank, catScore, matScore, stream, state } = req.query; 

    // Convert strings from URL to real numbers
    const studentData = {
      marks: marks ? parseFloat(marks) : null,
      jeeRank: jeeRank && jeeRank !== 'null' ? parseInt(jeeRank) : null,
      neetRank: neetRank && neetRank !== 'null' ? parseInt(neetRank) : null,
      catScore: catScore && catScore !== 'null' ? parseFloat(catScore) : null,
      matScore: matScore && matScore !== 'null' ? parseFloat(matScore) : null,
      stream: stream,
      state: state,
    };

    // LOGIC FIX: 
    // If the student has a NEET rank, we should look for Medical careers 
    // regardless of what the 'careerId' in the URL says.
    const result = await getCollegesForCareer(careerId, studentData);
    
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