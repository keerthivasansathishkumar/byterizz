import express from 'express';
import { getCareerRecommendations } from '../services/gemini.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
  try {
    const studentData = req.body;

    // 1. Validation
    if (!studentData.name || !studentData.class) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Capture all possible inputs
    const { jeeRank, neetRank, catScore, matScore, state, marks } = studentData;

    // 3. MASTER LOGIC: Determine the focus based on ALL exam types
    let focusInstructions = "";

    // Case A: Medical Student (NEET)
    if (neetRank && neetRank > 0 && (!jeeRank || jeeRank === 0)) {
      focusInstructions = "STRICT: This is a Medical student. Suggest 10 healthcare/bio careers (MBBS, BDS, Ayush, etc.). NO Engineering.";
    } 
    // Case B: Engineering Student (JEE)
    else if (jeeRank && jeeRank > 0 && (!neetRank || neetRank === 0)) {
      focusInstructions = "STRICT: This is a Tech student. Suggest 10 engineering/tech careers (CS, AI, Robotics, etc.). NO Medical.";
    } 
    // Case C: Management Student (CAT/MAT)
    else if (catScore > 0 || matScore > 0) {
      focusInstructions = "STRICT: This is a Business student. Suggest 10 management/MBA careers (Finance, Marketing, HR, etc.).";
    } 
    // Case D: Both Medical and Engineering
    else if (jeeRank > 0 && neetRank > 0) {
      focusInstructions = "Suggest a 50/50 mix of top Medical and Engineering careers (5 each).";
    } 
    // Case E: No specific rank (General)
    else {
      focusInstructions = "Suggest 10 diverse high-growth careers based on general academic performance.";
    }

    // 4. PREPARE THE DATA PACK (Focusing on all aspects)
    const finalDataForAI = {
      ...studentData,
      aiInstruction: `${focusInstructions} Include specific state counseling advice for ${state || 'their state'}. Provide exactly 10 suggestions.`,
      suggestionCount: 10
    };

    // 5. Call the AI Service
    const result = await getCareerRecommendations(finalDataForAI);
    
    res.json(result);

  } catch (error) {
    console.error('Error in career recommendation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;