'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../lib/LanguageContext';
import { getTranslation } from '../../lib/i18n';
import StudentForm from '../../components/StudentForm';
import CareerRecommendations from '../../components/CareerRecommendations';
import type { CareerOption } from '../../components/CareerRecommendations';
import CollegeCard from '../../components/CollegeCard';
import type { College } from '../../components/CollegeCard';
import type { StudentData, StudentDataDisplay } from '../../types/student';

type PageState = 'form' | 'recommendations' | 'colleges';

export default function CareerPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [pageState, setPageState] = useState<PageState>('form');
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [careers, setCareers] = useState<CareerOption[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxFee, setMaxFee] = useState<number | undefined>(undefined);
  const [scholarshipInfo, setScholarshipInfo] = useState<Record<string, any> | undefined>(undefined);

  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

  const handleFormSubmit = async (data: StudentData) => {
    setIsLoading(true);
    setError(null);
    setStudentData(data);
    
    // Store scholarship info if provided
    if (data.scholarshipEligible && data.scholarshipInfo) {
      setScholarshipInfo({
        ...data.scholarshipInfo,
        familyIncome: data.familyIncome,
      });
      
      // Set max fee based on income if scholarship eligible
      if (data.familyIncome === 'below-1lakh') {
        setMaxFee(500000); // ₹5 Lakh max
      } else if (data.familyIncome === '1-3lakh') {
        setMaxFee(1000000); // ₹10 Lakh max
      } else if (data.familyIncome === '3-5lakh') {
        setMaxFee(1500000); // ₹15 Lakh max
      }
    }

    try {
      const response = await fetch(`${API_URL}/api/career/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to get career recommendations');
      }

      const result = await response.json();
      setCareers(result.careers || []);
      setPageState('recommendations');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCareerSelect = async (careerId: string) => {
    // For classes other than 12, do not fetch colleges; just show info
    if (studentData?.class !== '12') {
      setError(t('collegeOnlyFor12'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedCareerId(careerId);

    try {
      // Build query parameters with student eligibility data
      const params = new URLSearchParams();
      if (studentData?.marks) {
        params.append('marks', studentData.marks);
      }
      if (studentData?.jeeRank !== null && studentData?.jeeRank !== undefined) {
        params.append('jeeRank', studentData.jeeRank.toString());
      }
      if (studentData?.neetRank !== null && studentData?.neetRank !== undefined) {
        params.append('neetRank', studentData.neetRank.toString());
      }
      if (studentData?.catScore !== null && studentData?.catScore !== undefined) {
        params.append('catScore', studentData.catScore.toString());
      }
      if (studentData?.matScore !== null && studentData?.matScore !== undefined) {
        params.append('matScore', studentData.matScore.toString());
      }
      if (studentData?.stream) {
        params.append('stream', studentData.stream);
      }

      const queryString = params.toString();
      const url = `${API_URL}/api/colleges/${careerId}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get college information');
      }

      const result = await response.json();
      setColleges(result.colleges || []);
      setPageState('colleges');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (pageState === 'colleges') {
      setPageState('recommendations');
      setColleges([]);
    } else if (pageState === 'recommendations') {
      setPageState('form');
      setCareers([]);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm underline"
            >
              {t('tryAgain')}
            </button>
          </div>
        )}

        {pageState !== 'form' && (
          <button
            onClick={handleBack}
            className="mb-6 text-primary-600 hover:text-primary-700 font-semibold flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('back')}
          </button>
        )}

        {pageState === 'form' && (
          <StudentForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}

        {pageState === 'recommendations' && (
          <CareerRecommendations
            careers={careers}
            onSelectCareer={handleCareerSelect}
            isLoading={isLoading}
            studentData={studentData ? {
              name: studentData.name,
              class: studentData.class,
              interest10: studentData.interest10,
              marks: studentData.marks || '',
              stream: studentData.stream,
              jeeRank: studentData.jeeRank
            } as StudentDataDisplay : undefined}
          />
        )}

        {pageState === 'colleges' && (
          <>
            {/* Fee Filter */}
            <div className="mb-6 bg-white rounded-lg shadow-md p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Maximum Fee (Optional)
              </label>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setMaxFee(500000)}
                  className={`px-4 py-2 rounded-lg border ${
                    maxFee === 500000
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Up to ₹5 Lakh
                </button>
                <button
                  onClick={() => setMaxFee(1000000)}
                  className={`px-4 py-2 rounded-lg border ${
                    maxFee === 1000000
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Up to ₹10 Lakh
                </button>
                <button
                  onClick={() => setMaxFee(2000000)}
                  className={`px-4 py-2 rounded-lg border ${
                    maxFee === 2000000
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Up to ₹20 Lakh
                </button>
                <button
                  onClick={() => setMaxFee(undefined)}
                  className="px-4 py-2 rounded-lg border bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Show All
                </button>
              </div>
            </div>
            <CollegeCard
              colleges={colleges}
              isLoading={isLoading}
              studentData={studentData || undefined}
              maxFee={maxFee}
              scholarshipEligible={studentData?.scholarshipEligible || false}
              scholarshipInfo={scholarshipInfo}
            />
          </>
        )}
      </div>
    </div>
  );
}

