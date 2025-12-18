'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import SuccessStories from '@/components/SuccessStories';
import LanguageSelector from '@/components/LanguageSelector';
import BackgroundVideo from '@/components/BackgroundVideo';
import Header from '@/components/Header';
import StudentFeedback from '@/components/StudentFeedback';
import CompetitiveExamsList from '@/components/CompetitiveExamsList';

export default function Home() {
  const router = useRouter();
  const { language } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);

  const handleChooseCareer = () => {
    setShowLanguageSelector(true);
  };

  const handleLanguageSelected = () => {
    setShowLanguageSelector(false);
    router.push('/career');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showLanguageSelector && (
        <LanguageSelector onLanguageSelected={handleLanguageSelected} />
      )}
      
      {/* Hero Section with Background Video */}
      <section className="relative text-white py-24 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Video Component */}
        <BackgroundVideo />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl text-white">ByteRizz</h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-lg text-white">
            {t('aboutUsContent')}
          </p>
          <button
            onClick={handleChooseCareer}
            className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {t('chooseCareer')}
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {t('aboutUs')}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              {t('aboutUsContent')}
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Guidance</h3>
                <p className="text-gray-600">Get personalized career recommendations using advanced AI technology</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">College Matching</h3>
                <p className="text-gray-600">Find the best colleges that match your profile and eligibility</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Support</h3>
                <p className="text-gray-600">Access comprehensive information and expert guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <SuccessStories />

      {/* Student Feedback */}
      <StudentFeedback />

      {/* Competitive Exams List */}
      <CompetitiveExamsList />
    </div>
  );
}

