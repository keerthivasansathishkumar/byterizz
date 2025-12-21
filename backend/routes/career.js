import express from 'express';
import { getCareerRecommendations } from '../services/gemini.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
  try {
    const studentData = req.body;

    // Validate required fields (marks optional if currently studying)
    if (!studentData.name || !studentData.email || !studentData.phone || !studentData.class) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide name, email, phone, and class',
      });
    }
    if (studentData.currentlyStudying === false && !studentData.marks) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide marks if you have completed the class',
      });
    }

    const result = await getCareerRecommendations(studentData);
    
    res.json(result);
  } catch (error) {
    console.error('Error in career recommendation:', error);
    res.status(500).json({
      error: 'Failed to get career recommendations',
      message: error.message,
    });
  }
});

export default router;

import express from 'express';
import { getCareerRecommendations } from '../services/gemini.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
  try {
    const studentData = req.body;

    // Validate required fields (marks optional if currently studying)
    if (!studentData.name || !studentData.email || !studentData.phone || !studentData.class) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide name, email, phone, and class',
      });
    }
    if (studentData.currentlyStudying === false && !studentData.marks) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide marks if you have completed the class',
      });
    }

    const result = await getCareerRecommendations(studentData);
    
    res.json(result);
  } catch (error) {
    console.error('Error in career recommendation:', error);
    res.status(500).json({
      error: 'Failed to get career recommendations',
      message: error.message,
    });
  }
});

export default router;

import express from 'express';
import { getCareerRecommendations } from '../services/gemini.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
  try {
    const studentData = req.body;

    // Validate required fields (marks optional if currently studying)
    if (!studentData.name || !studentData.email || !studentData.phone || !studentData.class) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide name, email, phone, and class',
      });
    }
    if (studentData.currentlyStudying === false && !studentData.marks) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide marks if you have completed the class',
      });
    }

    const result = await getCareerRecommendations(studentData);
    
    res.json(result);
  } catch (error) {
    console.error('Error in career recommendation:', error);
    res.status(500).json({
      error: 'Failed to get career recommendations',
      message: error.message,
    });
  }
});

export default router;

