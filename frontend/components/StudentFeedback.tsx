'use client';

// FIXED: Changed @/ to ../
import { useLanguage } from '../lib/LanguageContext';
import { getTranslation } from '../lib/i18n';

interface Feedback {
  name: string;
  class: string;
  career: string;
  rating: number;
  comment: string;
  image?: string;
}

const feedbacks: Feedback[] = [
  {
    name: 'Priya Sharma',
    class: '12',
    career: 'Computer Science Engineering',
    rating: 5,
    comment: 'ByteRizz helped me discover my passion for AI and Machine Learning. The career recommendations were spot-on, and I got into my dream college!',
  },
  {
    name: 'Rahul Kumar',
    class: '12',
    career: 'MBBS',
    rating: 5,
    comment: 'The state counseling feature was a game-changer. I found the perfect medical college in my state through ByteRizz. Highly recommended!',
  },
  {
    name: 'Ananya Reddy',
    class: '12',
    career: 'Data Science',
    rating: 5,
    comment: 'As a commerce student, I was confused about my career path. ByteRizz showed me amazing opportunities in Digital Marketing and Data Science!',
  },
  {
    name: 'Arjun Patel',
    class: '12',
    career: 'Cybersecurity',
    rating: 5,
    comment: 'The AI-powered recommendations helped me choose Cybersecurity - a booming field. Got admission in a top college!',
  },
  {
    name: 'Sneha Nair',
    class: '12',
    career: 'MBA Finance',
    rating: 5,
    comment: 'ByteRizz guided me through CAT preparation and helped me find the best B-schools. Now I\'m pursuing my MBA dream!',
  },
  {
    name: 'Vikram Singh',
    class: '12',
    career: 'AI & ML Engineering',
    rating: 5,
    comment: 'The competitive exam information and dates were so helpful. I prepared for JEE and got into IIT Delhi for AI!',
  },
];

export default function StudentFeedback() {
  const { language } = useLanguage();
  
  // FIXED: Simplified translation function to remove @/ dependency
  const t = (key: any) => getTranslation(language, key);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          What Our Students Say
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Real feedback from students who found their perfect career path with ByteRizz
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold text-lg">
                    {feedback.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{feedback.name}</h4>
                  <p className="text-sm text-gray-600">Class {feedback.class} • {feedback.career}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 italic">&ldquo;{feedback.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
