'use client';

// FIXED: Changed @/ to ../
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';
import StudentProfile from './StudentProfile';
import type { StudentDataDisplay } from '../types/student';

export interface CareerOption {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
}

interface CareerRecommendationsProps {
  careers: CareerOption[];
  onSelectCareer: (careerId: string) => void;
  isLoading?: boolean;
  studentData?: StudentDataDisplay;
}

export default function CareerRecommendations({ careers, onSelectCareer, isLoading, studentData }: CareerRecommendationsProps) {
  const { language } = useLanguage();
  
  // FIXED: Simplified the t function to remove the @/ shortcut
  const t = (key: any) => getTranslation(language, key);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">{t('loadingRecommendations')}</p>
        </div>
      </div>
    );
  }

  if (careers.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600">{t('error')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {t('careerRecommendations')}
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        {t('basedOnYourProfile')}
      </p>
      {studentData && (
        <StudentProfile studentData={studentData} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career) => (
          <div
            key={career.id}
            onClick={() => onSelectCareer(career.id)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-300"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{career.title}</h3>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {career.matchPercentage}%
              </div>
            </div>
            <p className="text-gray-600 mb-4">{career.description}</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              {t('viewDetails')}
            </button>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-500 mt-6 text-sm">
        {t('selectCareer')}
      </p>
    </div>
  );
}
