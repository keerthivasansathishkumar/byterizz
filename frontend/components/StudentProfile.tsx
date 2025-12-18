'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import { StudentData } from '@/types/student';

interface StudentProfileProps {
  studentData: Partial<StudentData>;
}

export default function StudentProfile({ studentData }: StudentProfileProps) {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-primary-600">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        {t('yourProfile')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('name')}</p>
          <p className="font-semibold text-gray-800">{studentData.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('class')}</p>
          <p className="font-semibold text-gray-800">Class {studentData.class}</p>
        </div>
        {studentData.marks && (
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('markPercentage')}</p>
            <p className="font-semibold text-gray-800">{studentData.marks}%</p>
          </div>
        )}
        {studentData.state && (
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('state')}</p>
            <p className="font-semibold text-gray-800">{studentData.state}</p>
          </div>
        )}
        {studentData.district && (
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('district')}</p>
            <p className="font-semibold text-gray-800">{studentData.district}</p>
          </div>
        )}
        {studentData.class === '10' && studentData.interest10 && (
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('interest')}</p>
            <p className="font-semibold text-gray-800">{t(studentData.interest10)}</p>
          </div>
        )}
        {studentData.class === '12' && studentData.stream && (
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('stream')}</p>
            <p className="font-semibold text-gray-800">{t(studentData.stream)}</p>
          </div>
        )}
        {studentData.class === '12' && studentData.stream === 'science' && (
          <>
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('jeeRank')}</p>
              <p className="font-semibold text-gray-800">
                {studentData.jeeRank ? studentData.jeeRank : t('notAttempted')}
              </p>
            </div>
            {studentData.neetRank !== undefined && (
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('neetRank')}</p>
                <p className="font-semibold text-gray-800">
                  {studentData.neetRank ? studentData.neetRank : t('notAttempted')}
                </p>
              </div>
            )}
          </>
        )}
        {studentData.class === '12' && studentData.stream === 'commerce' && (
          <>
            {studentData.catScore !== undefined && (
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('catScore')}</p>
                <p className="font-semibold text-gray-800">
                  {studentData.catScore ? studentData.catScore : t('notAttempted')}
                </p>
              </div>
            )}
            {studentData.matScore !== undefined && (
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('matScore')}</p>
                <p className="font-semibold text-gray-800">
                  {studentData.matScore ? studentData.matScore : t('notAttempted')}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 italic">
          {t('recommendationsBasedOn')}
        </p>
      </div>
    </div>
  );
}

