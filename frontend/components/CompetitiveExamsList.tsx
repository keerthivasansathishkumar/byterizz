'use client';

import { useState } from 'react';
// FIXED: Changed @/ to ../
import { useLanguage } from '../lib/LanguageContext';
import { competitiveExams, getUpcomingExams, type CompetitiveExam } from '../lib/competitiveExams';

export default function CompetitiveExamsList() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'engineering' | 'medical' | 'commerce' | 'upcoming'>('upcoming');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  let filteredExams: CompetitiveExam[] = [];
  if (filter === 'upcoming') {
    filteredExams = getUpcomingExams();
  } else if (filter === 'engineering') {
    filteredExams = competitiveExams.filter(e => e.stream === 'science');
  } else if (filter === 'medical') {
    filteredExams = competitiveExams.filter(e => e.stream === 'science' && (e.id.includes('neet') || e.id.includes('aiims') || e.id.includes('jipmer')));
  } else if (filter === 'commerce') {
    filteredExams = competitiveExams.filter(e => e.stream === 'commerce');
  } else {
    filteredExams = competitiveExams;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Competitive Exams Information
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Get details about exam dates, application deadlines, and registration links
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { id: 'upcoming', label: 'Upcoming Exams' },
            { id: 'engineering', label: 'Engineering' },
            { id: 'medical', label: 'Medical' },
            { id: 'commerce', label: 'Commerce/Management' },
            { id: 'all', label: 'All Exams' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === btn.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const appOpen = new Date(exam.applicationOpenDate);
            const appClose = new Date(exam.applicationCloseDate);
            const today = new Date();
            const isApplicationOpen = today >= appOpen && today <= appClose;
            const isApplicationClosed = today > appClose;

            return (
              <div
                key={exam.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{exam.name}</h3>
                    <p className="text-sm text-gray-600">{exam.fullName}</p>
                  </div>
                  {isApplicationOpen && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                      Open
                    </span>
                  )}
                  {isApplicationClosed && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                      Closed
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-700 mb-4">{exam.description}</p>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Exam Date:</span>{' '}
                    <span className="text-gray-600">{formatDate(exam.examDate)}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Application:</span>{' '}
                    <span className="text-gray-600">
                      {formatDate(exam.applicationOpenDate)} - {formatDate(exam.applicationCloseDate)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Eligibility:</span>{' '}
                    <span className="text-gray-600">{exam.eligibility}</span>
                  </div>
                </div>

                <a
                  href={exam.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Apply Now
                </a>
              </div>
            );
          })}
        </div>

        {filteredExams.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No exams found for the selected filter.</p>
        )}
      </div>
    </section>
  );
}