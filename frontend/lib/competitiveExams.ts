// Competitive Exams Database with Dates and Application Links
export interface CompetitiveExam {
  id: string;
  name: string;
  fullName: string;
  examDate: string;
  applicationOpenDate: string;
  applicationCloseDate: string;
  applicationLink: string;
  eligibility: string;
  stream: 'science' | 'commerce' | 'both';
  description: string;
}

export const competitiveExams: CompetitiveExam[] = [
  // Engineering Exams
  {
    id: 'jee_main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination Main',
    examDate: '2025-01-24',
    applicationOpenDate: '2024-11-01',
    applicationCloseDate: '2024-12-04',
    applicationLink: 'https://jeemain.nta.ac.in',
    eligibility: 'Class 12 with Physics, Chemistry, Mathematics',
    stream: 'science',
    description: 'National level engineering entrance exam for IITs, NITs, and other engineering colleges',
  },
  {
    id: 'jee_advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    examDate: '2025-05-26',
    applicationOpenDate: '2025-04-28',
    applicationCloseDate: '2025-05-07',
    applicationLink: 'https://jeeadv.ac.in',
    eligibility: 'Top 2.5 lakh JEE Main qualifiers',
    stream: 'science',
    description: 'For admission to IITs - requires JEE Main qualification',
  },
  {
    id: 'bitsat',
    name: 'BITSAT',
    fullName: 'BITS Admission Test',
    examDate: '2025-05-20',
    applicationOpenDate: '2025-01-15',
    applicationCloseDate: '2025-04-15',
    applicationLink: 'https://www.bitsadmission.com',
    eligibility: 'Class 12 with 75% aggregate and 60% in each subject',
    stream: 'science',
    description: 'For admission to BITS Pilani, Goa, and Hyderabad campuses',
  },
  {
    id: 'viteee',
    name: 'VITEEE',
    fullName: 'VIT Engineering Entrance Examination',
    examDate: '2025-04-19',
    applicationOpenDate: '2024-11-01',
    applicationCloseDate: '2025-03-31',
    applicationLink: 'https://vit.ac.in/admissions',
    eligibility: 'Class 12 with 60% aggregate',
    stream: 'science',
    description: 'For admission to VIT University campuses',
  },
  {
    id: 'srmjee',
    name: 'SRMJEEE',
    fullName: 'SRM Joint Engineering Entrance Examination',
    examDate: '2025-04-15',
    applicationOpenDate: '2024-11-01',
    applicationCloseDate: '2025-03-31',
    applicationLink: 'https://www.srmist.edu.in',
    eligibility: 'Class 12 with 50% aggregate',
    stream: 'science',
    description: 'For admission to SRM Institute of Science and Technology',
  },
  
  // Medical Exams
  {
    id: 'neet',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    examDate: '2025-05-05',
    applicationOpenDate: '2025-02-09',
    applicationCloseDate: '2025-03-09',
    applicationLink: 'https://neet.nta.nic.in',
    eligibility: 'Class 12 with Physics, Chemistry, Biology',
    stream: 'science',
    description: 'National level medical entrance exam for MBBS, BDS, and other medical courses',
  },
  {
    id: 'aiims',
    name: 'AIIMS MBBS',
    fullName: 'All India Institute of Medical Sciences',
    examDate: '2025-05-25',
    applicationOpenDate: '2025-02-01',
    applicationCloseDate: '2025-03-15',
    applicationLink: 'https://www.aiims.edu',
    eligibility: 'Class 12 with Physics, Chemistry, Biology, English',
    stream: 'science',
    description: 'For admission to AIIMS institutions (now through NEET)',
  },
  {
    id: 'jipmer',
    name: 'JIPMER',
    fullName: 'Jawaharlal Institute of Postgraduate Medical Education and Research',
    examDate: '2025-06-08',
    applicationOpenDate: '2025-03-01',
    applicationCloseDate: '2025-04-15',
    applicationLink: 'https://www.jipmer.edu.in',
    eligibility: 'Class 12 with Physics, Chemistry, Biology',
    stream: 'science',
    description: 'For admission to JIPMER Puducherry (now through NEET)',
  },
  
  // Commerce/Management Exams
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    examDate: '2024-11-24',
    applicationOpenDate: '2024-08-07',
    applicationCloseDate: '2024-09-13',
    applicationLink: 'https://iimcat.ac.in',
    eligibility: 'Bachelor\'s degree with 50% marks',
    stream: 'commerce',
    description: 'For admission to IIMs and other top B-schools',
  },
  {
    id: 'mat',
    name: 'MAT',
    fullName: 'Management Aptitude Test',
    examDate: '2025-02-09',
    applicationOpenDate: '2024-12-01',
    applicationCloseDate: '2025-01-31',
    applicationLink: 'https://www.aima.in',
    eligibility: 'Bachelor\'s degree in any discipline',
    stream: 'commerce',
    description: 'Accepted by 600+ B-schools across India',
  },
  {
    id: 'xat',
    name: 'XAT',
    fullName: 'Xavier Aptitude Test',
    examDate: '2025-01-05',
    applicationOpenDate: '2024-07-15',
    applicationCloseDate: '2024-11-30',
    applicationLink: 'https://www.xatonline.in',
    eligibility: 'Bachelor\'s degree',
    stream: 'commerce',
    description: 'For admission to XLRI and other XAMI member institutes',
  },
  {
    id: 'cmat',
    name: 'CMAT',
    fullName: 'Common Management Admission Test',
    examDate: '2025-04-06',
    applicationOpenDate: '2025-02-01',
    applicationCloseDate: '2025-03-15',
    applicationLink: 'https://cmat.nta.ac.in',
    eligibility: 'Bachelor\'s degree',
    stream: 'commerce',
    description: 'National level MBA entrance exam',
  },
  {
    id: 'snap',
    name: 'SNAP',
    fullName: 'Symbiosis National Aptitude Test',
    examDate: '2024-12-22',
    applicationOpenDate: '2024-08-23',
    applicationCloseDate: '2024-11-23',
    applicationLink: 'https://www.snaptest.org',
    eligibility: 'Bachelor\'s degree with 50% marks',
    stream: 'commerce',
    description: 'For admission to Symbiosis International University',
  },
  
  // Law Exams
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    examDate: '2024-12-01',
    applicationOpenDate: '2024-07-01',
    applicationCloseDate: '2024-11-03',
    applicationLink: 'https://consortiumofnlus.ac.in',
    eligibility: 'Class 12 with 45% marks',
    stream: 'both',
    description: 'For admission to National Law Universities',
  },
  {
    id: 'ailet',
    name: 'AILET',
    fullName: 'All India Law Entrance Test',
    examDate: '2024-12-08',
    applicationOpenDate: '2024-08-01',
    applicationCloseDate: '2024-11-15',
    applicationLink: 'https://nludelhi.ac.in',
    eligibility: 'Class 12 with 50% marks',
    stream: 'both',
    description: 'For admission to National Law University, Delhi',
  },
  
  // Design Exams
  {
    id: 'nid',
    name: 'NID DAT',
    fullName: 'National Institute of Design Design Aptitude Test',
    examDate: '2025-01-05',
    applicationOpenDate: '2024-10-01',
    applicationCloseDate: '2024-11-15',
    applicationLink: 'https://www.nid.edu',
    eligibility: 'Class 12 in any stream',
    stream: 'both',
    description: 'For admission to NID campuses',
  },
  {
    id: 'nift',
    name: 'NIFT',
    fullName: 'National Institute of Fashion Technology',
    examDate: '2025-02-02',
    applicationOpenDate: '2024-11-01',
    applicationCloseDate: '2024-12-31',
    applicationLink: 'https://www.nift.ac.in',
    eligibility: 'Class 12 in any stream',
    stream: 'both',
    description: 'For admission to NIFT campuses',
  },
  
  // Architecture
  {
    id: 'jee_paper2',
    name: 'JEE Paper 2',
    fullName: 'JEE Main Paper 2 (B.Arch)',
    examDate: '2025-01-24',
    applicationOpenDate: '2024-11-01',
    applicationCloseDate: '2024-12-04',
    applicationLink: 'https://jeemain.nta.ac.in',
    eligibility: 'Class 12 with Mathematics',
    stream: 'science',
    description: 'For admission to B.Arch programs',
  },
  {
    id: 'nata',
    name: 'NATA',
    fullName: 'National Aptitude Test in Architecture',
    examDate: '2025-04-06',
    applicationOpenDate: '2025-01-01',
    applicationCloseDate: '2025-03-15',
    applicationLink: 'https://www.nata.in',
    eligibility: 'Class 12 with Mathematics',
    stream: 'science',
    description: 'For admission to architecture programs',
  },
];

export function getExamsByStream(stream?: 'science' | 'commerce', lawInterest?: boolean): CompetitiveExam[] {
  let filtered = competitiveExams;

  if (stream) {
    filtered = filtered.filter(exam => exam.stream === stream || exam.stream === 'both');
  }

  // Exclude core exams that are already asked separately in the form
  const coreExamIds = new Set([
    'jee_main',
    'jee_advanced',
    'jee_paper2',
    'neet',
    'cat',
    'mat',
  ]);
  filtered = filtered.filter(exam => !coreExamIds.has(exam.id));

  // Include law exams if lawInterest is true
  if (lawInterest) {
    const lawExams = competitiveExams.filter(exam =>
      exam.id.includes('clat') || exam.id.includes('ailet') || exam.id.includes('law')
    );
    filtered = [...filtered, ...lawExams];
    // Remove duplicates
    filtered = filtered.filter((exam, index, self) =>
      index === self.findIndex(e => e.id === exam.id)
    );
  }

  return filtered;
}

export function getUpcomingExams(): CompetitiveExam[] {
  const today = new Date();
  return competitiveExams
    .filter(exam => new Date(exam.applicationCloseDate) >= today)
    .sort((a, b) => new Date(a.applicationCloseDate).getTime() - new Date(b.applicationCloseDate).getTime());
}


