'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

interface SuccessStory {
  name: string;
  course: string;
  college: string;
  achievement: string;
  image?: string;
}

const successStories: SuccessStory[] = [
  {
    name: 'Rajesh Kumar',
    course: 'Computer Science Engineering',
    college: 'IIT Delhi',
    achievement: 'Secured admission with 95% marks and JEE Rank 1200',
  },
  {
    name: 'Priya Sharma',
    course: 'Business Administration',
    college: 'IIM Bangalore',
    achievement: 'Got selected with 92% marks in Commerce stream',
  },
  {
    name: 'Arjun Reddy',
    course: 'Mechanical Engineering',
    college: 'NIT Trichy',
    achievement: 'Achieved admission with 88% marks and JEE Rank 3500',
  },
  {
    name: 'Sneha Patel',
    course: 'Data Science',
    college: 'BITS Pilani',
    achievement: 'Successfully enrolled with 94% marks',
  },
];

export default function SuccessStories() {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {t('successStories')}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t('studentsSucceeded')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary-600">
                  {story.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                {story.name}
              </h3>
              <p className="text-primary-600 font-medium text-center mb-2">
                {story.course}
              </p>
              <p className="text-gray-600 text-sm text-center mb-2">
                {story.college}
              </p>
              <p className="text-gray-500 text-xs text-center italic">
                {story.achievement}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

