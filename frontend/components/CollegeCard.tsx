'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';
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

import { StudentData } from '@/types/student';

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
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
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

  // Filter colleges by max fee if provided
  const filteredColleges = maxFee 
    ? colleges.filter(college => college.fees.total <= maxFee)
    : colleges;

  // Check scholarship eligibility for each college
  const checkScholarshipEligibility = (college: College) => {
    if (!scholarshipEligible || !scholarshipInfo) return null;
    
    const income = scholarshipInfo.familyIncome;
    const category = scholarshipInfo.category;
    const hasDisability = scholarshipInfo.hasDisability;
    
    // Basic eligibility check
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
      
      {/* Fee Filter */}
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
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-600"
            >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{college.name}</h3>
                <p className="text-primary-600 font-semibold text-lg mb-2">{college.course}</p>
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
                  {college.minMarksPercentage && (
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      Min: {college.minMarksPercentage}%
                    </div>
                  )}
                  {college.jeeRankCutoff && (
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                      JEE Rank: &lt;{college.jeeRankCutoff.toLocaleString()}
                    </div>
                  )}
                  {college.requiresJEE && !college.jeeRankCutoff && (
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                      JEE Required
                    </div>
                  )}
                  {college.neetRankCutoff && (
                    <div className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs">
                      NEET Rank: &lt;{college.neetRankCutoff.toLocaleString()}
                    </div>
                  )}
                  {college.requiresNEET && !college.neetRankCutoff && (
                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                      NEET Required
                    </div>
                  )}
                  {college.catScoreCutoff && (
                    <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      CAT Score: &gt;{college.catScoreCutoff}
                    </div>
                  )}
                  {college.requiresCAT && !college.catScoreCutoff && (
                    <div className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs">
                      CAT Required
                    </div>
                  )}
                  {college.matScoreCutoff && (
                    <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs">
                      MAT Score: &gt;{college.matScoreCutoff}
                    </div>
                  )}
                  {college.requiresMAT && !college.matScoreCutoff && (
                    <div className="bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-xs">
                      MAT Required
                    </div>
                  )}
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
                <p className="text-xs text-gray-500">
                  Total: {formatCurrency(college.fees.total, college.fees.currency)}
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

            {/* Scholarship Information */}
            {scholarshipEligibleForCollege && (
              <div className="mt-4 bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">🎓 Scholarship Available!</h4>
                <p className="text-sm text-green-700 mb-3">
                  You may be eligible for scholarships at this college. Check available options:
                </p>
                <div className="space-y-2">
                  <a
                    href={`${college.applicationLink}#scholarship`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition text-sm"
                  >
                    View College Scholarships
                  </a>
                  <a
                    href="https://scholarships.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm"
                  >
                    Check Government Scholarships
                  </a>
                </div>
              </div>
            )}

            <a
              href={college.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition mt-4"
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

