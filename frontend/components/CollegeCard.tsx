'use client';

// FIXED: Changed @/ to ../
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';
import StudentProfile from './StudentProfile';

export interface College {
  id: string;
  name: string;
  course: string;
  duration: string;
  fees: {
    total: number;
    perYear: number;
    currency: string;
  };
  applicationOpenDate: string;
  applicationCloseDate: string;
  applicationLink: string;
  eligibility: number;
  location: string;
  minMarksPercentage?: number;
  jeeRankCutoff?: number;
  requiresJEE?: boolean;
  neetRankCutoff?: number;
  requiresNEET?: boolean;
  catScoreCutoff?: number;
  requiresCAT?: boolean;
  matScoreCutoff?: number;
  requiresMAT?: boolean;
  isStateCounseling?: boolean;
  stateCounselingName?: string;
}

// FIXED: Changed @/ to ../
import type { StudentData } from '../types/student';

interface CollegeCardProps {
  colleges: College[];
  isLoading?: boolean;
  studentData?: StudentData;
  maxFee?: number;
  scholarshipEligible?: boolean;
  scholarshipInfo?: Record<string, any>;
}

export default function CollegeCard({ colleges, isLoading, studentData, maxFee, scholarshipEligible, scholarshipInfo }: CollegeCardProps) {
  const { language } = useLanguage();
  
  // FIXED: Simplified the translation function
  const t = (key: any) => getTranslation(language, key);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800 font-semibold mb-2">{t('noCollegesEligible')}</p>
          <p className="text-yellow-700 text-sm">
            {studentData && (
              <>
                {studentData.marks && `Your marks: ${studentData.marks}%`}
                {studentData.marks && studentData.jeeRank && ' | '}
                {studentData.jeeRank ? ` JEE Rank: ${studentData.jeeRank}` : studentData.marks ? ' JEE: Not Attempted' : ''}
              </>
            )}
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat(language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredColleges = maxFee 
    ? colleges.filter(college => college.fees.total <= maxFee)
    : colleges;

  const checkScholarshipEligibility = (college: College) => {
    if (!scholarshipEligible || !scholarshipInfo) return null;
    const income = scholarshipInfo.familyIncome;
    const category = scholarshipInfo.category;
    const hasDisability = scholarshipInfo.hasDisability;
    const eligible = (income === 'below-1lakh' || income === '1-3lakh') || 
                     (category && ['sc', 'st', 'obc'].includes(category)) ||
                     hasDisability;
    return eligible;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {t('eligibleColleges')}
      </h2>
      {studentData && (
        <StudentProfile studentData={studentData} />
      )}
      
      {maxFee && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-semibold">
            Showing colleges with fees up to ₹{maxFee.toLocaleString('en-IN')}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {filteredColleges.map((college) => {
          const scholarshipEligibleForCollege = checkScholarshipEligibility(college);
          return (
            <div
              key={college.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg mb-2">{college.course}</p>
                  <p className="text-gray-600 mb-2">{college.location}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {college.isStateCounseling && (
                      <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold border-2 border-indigo-500">
                        🏛️ {college.stateCounselingName || t('stateCounseling')}
                      </div>
                    )}
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {college.eligibility}% Match
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('duration')}</p>
                  <p className="font-semibold text-gray-800">{college.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('fees')}</p>
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(college.fees.perYear, college.fees.currency)} / {t('year')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('applicationOpenDate')}</p>
                  <p className="font-semibold text-gray-800">{formatDate(college.applicationOpenDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('applicationCloseDate')}</p>
                  <p className="font-semibold text-gray-800">{formatDate(college.applicationCloseDate)}</p>
                </div>
              </div>

              <a
                href={college.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
              >
                {t('applyNow')}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
