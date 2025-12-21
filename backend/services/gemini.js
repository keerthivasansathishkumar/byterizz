import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/config.js';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

// Fallback careers based on stream
function getFallbackCareers(studentData) {
  // For Commerce stream - BOOMING CAREERS
  if (studentData.stream === 'commerce' || studentData.interest10 === 'accounts') {
    return {
      careers: [
        {
          id: 'digital_marketing',
          title: 'Digital Marketing & E-commerce',
          description: '🔥 BOOMING CAREER! Massive growth in online business. Perfect for students interested in social media, SEO, and online sales.',
          matchPercentage: 96,
        },
        {
          id: 'mba_finance',
          title: 'MBA Finance',
          description: 'Ideal for students interested in financial management, investment banking, and corporate finance. High-paying career.',
          matchPercentage: 94,
        },
        {
          id: 'chartered_accountancy',
          title: 'Chartered Accountancy (CA)',
          description: 'Perfect career for commerce students interested in accounting, auditing, and financial management.',
          matchPercentage: 93,
        },
        {
          id: 'bba_business',
          title: 'BBA Business Administration',
          description: 'Great option for students wanting to pursue business management and entrepreneurship.',
          matchPercentage: 91,
        },
        {
          id: 'bcom_accounting',
          title: 'B.Com Accounting',
          description: 'Excellent foundation for careers in accounting, finance, and business management.',
          matchPercentage: 89,
        },
        {
          id: 'business_management',
          title: 'Business Management',
          description: 'Suitable for students with leadership qualities and interest in business operations.',
          matchPercentage: 87,
        },
      ],
    };
  }

  // For Medical interest
  if (studentData.interest10 === 'medical') {
    return {
      careers: [
        {
          id: 'mbbs_medicine',
          title: 'MBBS - Medicine',
          description: 'Excellent choice for students passionate about healthcare and treating patients.',
          matchPercentage: 96,
        },
        {
          id: 'bds_dental',
          title: 'BDS - Dental Surgery',
          description: 'Perfect for students interested in oral health and dental care.',
          matchPercentage: 94,
        },
        {
          id: 'bpharm_pharmacy',
          title: 'B.Pharm - Pharmacy',
          description: 'Great option for students interested in pharmaceutical sciences and drug development.',
          matchPercentage: 92,
        },
        {
          id: 'bpt_physiotherapy',
          title: 'BPT - Physiotherapy',
          description: 'Ideal for students interested in rehabilitation and physical therapy.',
          matchPercentage: 90,
        },
        {
          id: 'nursing',
          title: 'B.Sc Nursing',
          description: 'Suitable for students wanting to provide patient care and support in healthcare.',
          matchPercentage: 88,
        },
      ],
    };
  }

  // For Engineering/Science stream - BOOMING CAREERS
  if (studentData.stream === 'science' || studentData.interest10 === 'engineering') {
    return {
      careers: [
        {
          id: 'ai_ml_engineering',
          title: 'AI & Machine Learning Engineering',
          description: '🔥 BOOMING CAREER! High demand, excellent salaries. Perfect for students interested in cutting-edge technology and artificial intelligence.',
          matchPercentage: 96,
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          description: '🔥 BOOMING CAREER! Critical field with massive job opportunities. Ideal for students interested in protecting digital systems.',
          matchPercentage: 94,
        },
        {
          id: 'data_science',
          title: 'Data Science',
          description: '🔥 BOOMING CAREER! Perfect for students who enjoy working with numbers and finding patterns in data. High-paying opportunities.',
          matchPercentage: 92,
        },
        {
          id: 'cs_engineering',
          title: 'Computer Science Engineering',
          description: 'Excellent choice for students with strong analytical skills and interest in technology. Always in demand.',
          matchPercentage: 90,
        },
        {
          id: 'mechanical_engineering',
          title: 'Mechanical Engineering',
          description: 'Great option for students interested in design, manufacturing, and innovation.',
          matchPercentage: 85,
        },
        {
          id: 'electronics_engineering',
          title: 'Electronics Engineering',
          description: 'Suitable for students interested in circuits, systems, and electronic devices.',
          matchPercentage: 82,
        },
      ],
    };
  }

  // Default fallback (shouldn't reach here often)
  return {
    careers: [
      {
        id: 'cs_engineering',
        title: 'Computer Science Engineering',
        description: 'Excellent choice for students with strong analytical skills and interest in technology.',
        matchPercentage: 90,
      },
      {
        id: 'data_science',
        title: 'Data Science',
        description: 'Perfect for students who enjoy working with numbers and finding patterns in data.',
        matchPercentage: 88,
      },
      {
        id: 'business_management',
        title: 'Business Management',
        description: 'Ideal for students with leadership qualities and interest in business operations.',
        matchPercentage: 85,
      },
      {
        id: 'mechanical_engineering',
        title: 'Mechanical Engineering',
        description: 'Great option for students interested in design, manufacturing, and innovation.',
        matchPercentage: 82,
      },
    ],
  };
}

export async function getCareerRecommendations(studentData) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build prompt with stream-specific guidance
    let streamGuidance = '';
    if (studentData.stream === 'commerce' || studentData.interest10 === 'accounts') {
      streamGuidance = 'IMPORTANT: The student is from Commerce/Accounts stream. Recommend BOOMING careers like Digital Marketing, MBA Finance, Chartered Accountancy (CA), B.Com, BBA, etc. Use career IDs: digital_marketing, mba_finance, chartered_accountancy, bcom_accounting, bba_business, business_management';
    } else if (studentData.interest10 === 'medical') {
      streamGuidance = 'IMPORTANT: The student is interested in Medical field. Recommend careers like MBBS, BDS, Pharmacy, Physiotherapy, Nursing, etc. Use career IDs: mbbs_medicine, bds_dental, bpharm_pharmacy, bpt_physiotherapy, nursing';
    } else if (studentData.stream === 'science' || studentData.interest10 === 'engineering') {
      streamGuidance = 'IMPORTANT: The student is from Science/Engineering stream. Recommend BOOMING careers like AI & Machine Learning, Cybersecurity, Data Science, Computer Science Engineering, etc. Use career IDs: ai_ml_engineering, cybersecurity, data_science, cs_engineering, mechanical_engineering, electronics_engineering, civil_engineering';
    }

    // Build competitive exams string
    let competitiveExamsStr = '';
    if (studentData.otherCompetitiveExams && studentData.otherCompetitiveExams.length > 0) {
      competitiveExamsStr = '\n- Other Competitive Exams Attempted:';
      studentData.otherCompetitiveExams.forEach(examId => {
        const score = studentData.otherExamScores?.[examId] || 'Not provided';
        competitiveExamsStr += `\n  * ${examId}: ${score}`;
      });
    }

    // Derive basic subject information for safety rules
    const hasMaths =
      studentData.class12SubjectCombination === 'biomaths' ||
      studentData.class12SubjectCombination === 'comp-maths' ||
      studentData.class12SubjectCombination === 'pure-science' ||
      studentData.class12SubjectCombination === 'business-maths';

    const hasBiology =
      studentData.class12SubjectCombination === 'biomaths' ||
      studentData.class12SubjectCombination === 'pcb' ||
      studentData.class12SubjectCombination === 'biology-only';

    const prompt = `You are a career guidance counselor. Analyze the following student profile and recommend 10 suitable career options, focusing on BOOMING and HIGH-DEMAND careers that will lead to successful careers. Prioritize trending fields like AI/ML, Data Science, Cybersecurity, Digital Marketing, etc, but ONLY when the student is actually eligible based on subjects and exams.

IMPORTANT: Consider the competitive exams the student has attempted. If they have attempted engineering exams (JEE, BITSAT, VITEEE, SRMJEEE), recommend engineering careers. If they attempted medical exams (NEET, AIIMS, JIPMER), recommend medical careers. If they attempted management exams (CAT, MAT, XAT, CMAT, SNAP), recommend MBA/Business careers.

Student Profile:
- Name: ${studentData.name}
- Class: ${studentData.class}
- Marks Percentage: ${studentData.marks ?? 'Not provided'}%
${studentData.stream ? `- Stream: ${studentData.stream}` : ''}
${studentData.interest10 ? `- Interest after Class 10: ${studentData.interest10}` : ''}
${studentData.class12SubjectCombination ? `- Class 12 Subject Combination: ${studentData.class12SubjectCombination}` : ''}
${studentData.jeeRank !== null && studentData.jeeRank !== undefined ? `- JEE Rank: ${studentData.jeeRank}` : studentData.stream === 'science' ? '- JEE: Not Attempted' : ''}
${studentData.neetRank !== null && studentData.neetRank !== undefined ? `- NEET Rank: ${studentData.neetRank}` : ''}
${studentData.catScore !== null && studentData.catScore !== undefined ? `- CAT Score: ${studentData.catScore}` : ''}
${studentData.matScore !== null && studentData.matScore !== undefined ? `- MAT Score: ${studentData.matScore}` : ''}${competitiveExamsStr}

${streamGuidance}

VERY IMPORTANT ELIGIBILITY RULES (STRICTLY FOLLOW):
- Treat B.Tech/Engineering careers (ids: cs_engineering, ai_ml_engineering, cybersecurity, data_science, mechanical_engineering, electronics_engineering, civil_engineering) as requiring MATHEMATICS in Class 12.
- Recommend these engineering careers ONLY if the student has Mathematics in their Class 12 subject combination. Mathematics combinations are: biomaths, comp-maths, pure-science, business-maths.
- If the student does NOT have Mathematics in Class 12 (pure biology or other non-maths combinations), DO NOT recommend any B.Tech or core engineering careers. Prefer B.Sc, Biotechnology, Pharmacy, Nursing, or other non-engineering options instead.
- Respect the exams attempted: if no engineering exam (JEE/BITSAT/VITEEE/SRMJEEE) is attempted and JEE is not attempted, be very conservative before suggesting core engineering.
- Treat core Medical careers (ids: mbbs_medicine, bds_dental, bpharm_pharmacy, bpt_physiotherapy, nursing) as requiring BIOLOGY in Class 12.
- Recommend these medical careers ONLY if the student is from Science stream AND has Biology in their subject combination (for example: biomaths or PCB). If the student is from Commerce or pure Computer/Maths without Biology, DO NOT recommend MBBS/BDS/NEET-based medical careers.
- Do NOT suggest NEET / MBBS-type paths for pure Commerce students or for students whose Class 12 combination clearly does not include Biology.

Please provide career recommendations in the following JSON format:
{
  "careers": [
    {
      "id": "career_id_matching_database",
      "title": "Career Name",
      "description": "Brief description of why this career suits the student",
      "matchPercentage": 95
    },
    ...
  ]
}

Return ONLY valid JSON, no additional text or markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }

    const careerData = JSON.parse(cleanedText);
    
    // Validate and ensure we have appropriate careers
    if (!careerData.careers || careerData.careers.length < 10) {
      return getFallbackCareers(studentData);
    }

    // Validate career IDs exist in our database - Added booming careers
    const validCareerIds = ['cs_engineering', 'data_science', 'mechanical_engineering', 'electronics_engineering', 'civil_engineering',
                            'chartered_accountancy', 'bcom_accounting', 'mba_finance', 'bba_business', 
                            'mbbs_medicine', 'bds_dental', 'bpharm_pharmacy', 'bpt_physiotherapy', 'nursing',
                            'business_management', 'ai_ml_engineering', 'cybersecurity', 'digital_marketing'];
    
    const validatedCareers = careerData.careers.filter(career => 
      validCareerIds.includes(career.id)
    );

    if (validatedCareers.length < 10) {
      // If AI returned invalid IDs, use fallback
      return getFallbackCareers(studentData);
    }

    return { careers: validatedCareers };
  } catch (error) {
    console.error('Error getting career recommendations:', error);
    
    // Return fallback careers on error
    return getFallbackCareers(studentData);
  }
}

export async function getStreamRecommendation(studentName, answers, questions) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a career counselor helping a Class 10 student choose their stream for Class 11 and 12.

Student Name: ${studentName}

Questions and Answers:
${questions.map((q, idx) => `Q${idx + 1}: ${q}\nA${idx + 1}: ${answers[idx] || 'Not answered'}`).join('\n\n')}

Based on these answers, recommend the best stream for this student. The options are:
1. engineering - For students interested in technology, mathematics, physics, chemistry. Leads to engineering careers.
2. medical - For students interested in biology, healthcare, medicine. Leads to medical careers.
3. accounts - For students interested in commerce, business, finance, accounting. Leads to commerce/business careers.

Respond with ONLY one word: "engineering", "medical", or "accounts". Do not include any explanation or additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().toLowerCase();

    // Extract the stream from response
    if (text.includes('engineering')) return 'engineering';
    if (text.includes('medical')) return 'medical';
    if (text.includes('accounts') || text.includes('commerce')) return 'accounts';

    // Fallback based on answers
    const engineeringKeywords = ['math', 'science', 'technical', 'engineer', 'technology'];
    const medicalKeywords = ['biology', 'medical', 'doctor', 'health', 'hospital'];
    const commerceKeywords = ['commerce', 'business', 'account', 'finance', 'corporate'];

    let engineeringCount = 0;
    let medicalCount = 0;
    let commerceCount = 0;

    Object.values(answers).forEach(answer => {
      const lowerAnswer = String(answer).toLowerCase();
      if (engineeringKeywords.some(kw => lowerAnswer.includes(kw))) engineeringCount++;
      if (medicalKeywords.some(kw => lowerAnswer.includes(kw))) medicalCount++;
      if (commerceKeywords.some(kw => lowerAnswer.includes(kw))) commerceCount++;
    });

    if (engineeringCount >= medicalCount && engineeringCount >= commerceCount) return 'engineering';
    if (medicalCount >= commerceCount) return 'medical';
    return 'accounts';
  } catch (error) {
    console.error('Error getting stream recommendation:', error);
    // Fallback logic
    return 'engineering'; // Default fallback
  }
}
