'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

interface Class10StreamSelectorProps {
  onStreamSelected: (stream: 'engineering' | 'medical' | 'accounts') => void;
  studentName: string;
}

export default function Class10StreamSelector({ onStreamSelected, studentName }: Class10StreamSelectorProps) {
  const { language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedStream, setRecommendedStream] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      question: `Hi ${studentName}! What subjects do you enjoy the most?`,
      options: [
        { value: 'math_science', label: 'Mathematics and Science (Physics, Chemistry)' },
        { value: 'biology', label: 'Biology and Life Sciences' },
        { value: 'commerce', label: 'Commerce, Accounts, and Business Studies' },
        { value: 'mixed', label: 'A mix of different subjects' },
      ],
    },
    {
      id: 2,
      question: 'What kind of problems do you like solving?',
      options: [
        { value: 'technical', label: 'Technical problems and building things' },
        { value: 'medical', label: 'Health and medical problems' },
        { value: 'business', label: 'Business and financial problems' },
        { value: 'creative', label: 'Creative and design problems' },
      ],
    },
    {
      id: 3,
      question: 'What is your ideal work environment?',
      options: [
        { value: 'lab_office', label: 'Laboratory or Office with technology' },
        { value: 'hospital', label: 'Hospital or Healthcare setting' },
        { value: 'corporate', label: 'Corporate or Business environment' },
        { value: 'flexible', label: 'Flexible work environment' },
      ],
    },
    {
      id: 4,
      question: 'What are your career goals?',
      options: [
        { value: 'engineer', label: 'Become an Engineer or work in Technology' },
        { value: 'doctor', label: 'Become a Doctor or work in Healthcare' },
        { value: 'business', label: 'Work in Business, Finance, or Management' },
        { value: 'explore', label: 'Still exploring different options' },
      ],
    },
    {
      id: 5,
      question: 'How do you prefer to learn?',
      options: [
        { value: 'practical', label: 'Hands-on practical work and experiments' },
        { value: 'theory', label: 'Theoretical knowledge and concepts' },
        { value: 'both', label: 'A combination of both' },
        { value: 'visual', label: 'Visual learning and demonstrations' },
      ],
    },
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, get recommendation
      getStreamRecommendation(newAnswers);
    }
  };

  const getStreamRecommendation = async (allAnswers: Record<number, string>) => {
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/career/class10-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          answers: allAnswers,
          questions: questions.map(q => q.question),
        }),
      });

      const data = await response.json();
      if (data.recommendedStream) {
        setRecommendedStream(data.recommendedStream);
      }
    } catch (error) {
      console.error('Error getting stream recommendation:', error);
      // Fallback recommendation based on answers
      const engineeringCount = Object.values(allAnswers).filter(a => 
        a.includes('math_science') || a.includes('technical') || a.includes('engineer') || a.includes('lab_office')
      ).length;
      const medicalCount = Object.values(allAnswers).filter(a => 
        a.includes('biology') || a.includes('medical') || a.includes('doctor') || a.includes('hospital')
      ).length;
      const commerceCount = Object.values(allAnswers).filter(a => 
        a.includes('commerce') || a.includes('business') || a.includes('corporate')
      ).length;

      if (engineeringCount >= medicalCount && engineeringCount >= commerceCount) {
        setRecommendedStream('engineering');
      } else if (medicalCount >= commerceCount) {
        setRecommendedStream('medical');
      } else {
        setRecommendedStream('accounts');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStreamConfirm = (stream: 'engineering' | 'medical' | 'accounts') => {
    onStreamSelected(stream);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Analyzing your answers...</p>
      </div>
    );
  }

  if (recommendedStream) {
    const streamLabels = {
      engineering: 'Engineering (Science with Mathematics)',
      medical: 'Medical (Science with Biology)',
      accounts: 'Commerce/Accounts',
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Recommended Stream for You</h3>
        <div className="bg-primary-50 border-2 border-primary-600 rounded-lg p-6 mb-6">
          <p className="text-xl font-semibold text-primary-800 mb-2">
            Based on your answers, we recommend:
          </p>
          <p className="text-2xl font-bold text-primary-700">
            {streamLabels[recommendedStream as keyof typeof streamLabels]}
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => handleStreamConfirm(recommendedStream as 'engineering' | 'medical' | 'accounts')}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Accept Recommendation
          </button>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleStreamConfirm('engineering')}
              className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Choose Engineering
            </button>
            <button
              onClick={() => handleStreamConfirm('medical')}
              className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Choose Medical
            </button>
            <button
              onClick={() => handleStreamConfirm('accounts')}
              className="bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Choose Commerce
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h3>

      <div className="space-y-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="w-full text-left px-6 py-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition font-medium text-gray-700"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}




