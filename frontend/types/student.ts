export interface StudentData {
  name: string;
  email: string;
  phone: string;
  class: string;
  currentlyStudying?: boolean;
  state?: string;
  district?: string;
  interest10?: 'engineering' | 'medical' | 'accounts';
  marks?: string;
  stream?: 'science' | 'commerce';
  class12SubjectCombination?: string;
  lawInterest?: boolean;
  jeeRank?: string | null;
  neetRank?: string | null;
  catScore?: string | null;
  matScore?: string | null;
  otherCompetitiveExams?: string[];
  otherExamScores?: Record<string, string>;
  scholarshipEligible?: boolean;
  familyIncome?: string;
  scholarshipInfo?: Record<string, any>;
}

// Simplified version for display components
export interface StudentDataDisplay {
  name: string;
  class: string;
  interest10?: 'engineering' | 'medical' | 'accounts';
  marks: string;
  stream?: 'science' | 'commerce';
  jeeRank?: string | null;
}


