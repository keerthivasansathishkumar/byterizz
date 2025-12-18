
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';
import { indianStates, getDistrictsForState } from '@/lib/statesDistricts';
import { competitiveExams, getExamsByStream, type CompetitiveExam } from '@/lib/competitiveExams';
import Class10StreamSelector from '@/components/Class10StreamSelector';
import { StudentData } from '@/types/student';

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
  isLoading?: boolean;
}

export default function StudentForm({ onSubmit, isLoading }: StudentFormProps) {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);

  const [formData, setFormData] = useState<StudentData>({
    name: '',
    email: '',
    phone: '',
    class: '',
    currentlyStudying: undefined,
    state: '',
    district: '',
    interest10: undefined,
    marks: undefined,
    stream: undefined,
    class12SubjectCombination: undefined,
    lawInterest: false,
    jeeRank: undefined,
    neetRank: undefined,
    catScore: undefined,
    matScore: undefined,
    otherCompetitiveExams: [],
    otherExamScores: {},
    scholarshipEligible: false,
    familyIncome: undefined,
    scholarshipInfo: {},
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentData, string>>>({});
  const [jeeAttempted, setJeeAttempted] = useState<boolean | null>(null);
  const [neetAttempted, setNeetAttempted] = useState<boolean | null>(null);
  const [catAttempted, setCatAttempted] = useState<boolean | null>(null);
  const [matAttempted, setMatAttempted] = useState<boolean | null>(null);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [showOtherExams, setShowOtherExams] = useState(false);
  const [selectedOtherExams, setSelectedOtherExams] = useState<string[]>([]);
  const [showClass10Questions, setShowClass10Questions] = useState(false);
  const [class10Answers, setClass10Answers] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^[0-9]{10}$/.test(phone);
  };

  const handleChange = (field: keyof StudentData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Update districts when state changes
    if (field === 'state') {
      const districts = getDistrictsForState(value);
      setAvailableDistricts(districts);
      setFormData(prev => ({ ...prev, district: '' })); // Reset district
    }
  };

  useEffect(() => {
    if (formData.state) {
      const districts = getDistrictsForState(formData.state);
      setAvailableDistricts(districts);
      if (!districts.includes(formData.district || '')) {
        setFormData(prev => ({ ...prev, district: '' }));
      }
    } else {
      setAvailableDistricts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.state]);

  const handleClassChange = (value: string) => {
    handleChange('class', value);
    // Reset stream and JEE rank when class changes
    if (value !== '12') {
      setFormData(prev => ({ ...prev, stream: undefined, jeeRank: undefined }));
      setJeeAttempted(null);
    }
    // Reset interest for other classes
    if (value !== '10') {
      setFormData(prev => ({ ...prev, interest10: undefined }));
    }
  };

  const handleStreamChange = (value: 'science' | 'commerce') => {
    handleChange('stream', value);
    // Reset exam data when stream changes
    if (value !== 'science') {
      setFormData(prev => ({ ...prev, jeeRank: undefined, neetRank: undefined }));
      setJeeAttempted(null);
      setNeetAttempted(null);
    } else {
      setFormData(prev => ({ ...prev, catScore: undefined, matScore: undefined }));
      setCatAttempted(null);
      setMatAttempted(null);
    }
  };

  const handleJeeAttempted = (attempted: boolean) => {
    setJeeAttempted(attempted);
    if (!attempted) {
      setFormData(prev => ({ ...prev, jeeRank: null }));
    } else {
      setFormData(prev => ({ ...prev, jeeRank: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StudentData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('pleaseFillAllFields');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('pleaseFillAllFields');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('pleaseFillAllFields');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('invalidPhone');
    }
    if (!formData.class) {
      newErrors.class = t('pleaseFillAllFields');
    }
    if (formData.currentlyStudying === undefined) {
      newErrors.currentlyStudying = 'Please select if you are currently studying';
    }
    if (formData.currentlyStudying === false && !formData.marks) {
      newErrors.marks = t('pleaseFillAllFields');
    }
    if (isClass12 && formData.stream && !formData.class12SubjectCombination) {
      newErrors.class12SubjectCombination = 'Please select your subject combination';
    }
    if (formData.scholarshipEligible && !formData.familyIncome) {
      newErrors.familyIncome = 'Please select your family income range';
    }
    if (!formData.state) {
      newErrors.state = t('pleaseFillAllFields');
    }
    if (!formData.district) {
      newErrors.district = t('pleaseFillAllFields');
    }
    if (formData.currentlyStudying === false) {
      if (!formData.marks || !formData.marks.trim()) {
        newErrors.marks = t('pleaseFillAllFields');
      } else {
        const marksNum = parseFloat(formData.marks);
        if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
          newErrors.marks = t('invalidMarks');
        }
      }
    }
    if (formData.class === '12' && !formData.stream) {
      newErrors.stream = t('pleaseFillAllFields');
    }
    if (formData.class === '10' && !formData.interest10) {
      newErrors.interest10 = t('pleaseFillAllFields');
    }
    if (formData.class === '12' && formData.stream === 'science') {
      // JEE is required for Science stream
      if (jeeAttempted === null) {
        newErrors.jeeRank = t('pleaseFillAllFields');
      } else if (jeeAttempted && (!formData.jeeRank || formData.jeeRank.trim() === '')) {
        newErrors.jeeRank = t('pleaseFillAllFields');
      }
      // NEET is optional, no validation needed
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isClass12 = formData.class === '12';
  const isClass10 = formData.class === '10';
  const isScience = formData.stream === 'science';

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t('studentInformation')}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('name')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {t('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="10 digits"
            maxLength={10}
            required
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Class */}
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
            {t('class')} <span className="text-red-500">*</span>
          </label>
          <select
            id="class"
            value={formData.class}
            onChange={(e) => handleClassChange(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
              errors.class ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            style={{ color: '#1f2937' }}
          >
            <option value="">Select Class</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
          {errors.class && <p className="mt-1 text-sm text-red-500">{errors.class}</p>}
        </div>

        {/* Currently Studying - Only show after class is selected */}
        {formData.class && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Are you currently studying in this class? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, currentlyStudying: true, marks: undefined }));
                  setErrors(prev => ({ ...prev, currentlyStudying: undefined, marks: undefined }));
                }}
                className={`flex-1 px-4 py-3 rounded-lg border font-medium ${
                  formData.currentlyStudying === true
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Yes, Currently Studying
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, currentlyStudying: false }));
                  setErrors(prev => ({ ...prev, currentlyStudying: undefined }));
                }}
                className={`flex-1 px-4 py-3 rounded-lg border font-medium ${
                  formData.currentlyStudying === false
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                No, Completed
              </button>
            </div>
            {errors.currentlyStudying && <p className="mt-1 text-sm text-red-500">{errors.currentlyStudying}</p>}
          </div>
        )}

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            {t('state')} <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            style={{ color: '#1f2937' }}
          >
            <option value="">{t('selectState')}</option>
            {indianStates.map(state => (
              <option key={state.value} value={state.value} style={{ color: '#1f2937' }}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
        </div>

        {/* District */}
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
            {t('district')} <span className="text-red-500">*</span>
          </label>
          <select
            id="district"
            value={formData.district}
            onChange={(e) => handleChange('district', e.target.value)}
            disabled={!formData.state || availableDistricts.length === 0}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
              errors.district ? 'border-red-500' : 'border-gray-300'
            } ${!formData.state ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            required
            style={{ color: '#1f2937' }}
          >
            <option value="">{t('selectDistrict')}</option>
            {availableDistricts.map(district => (
              <option key={district} value={district} style={{ color: '#1f2937' }}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district}</p>}
        </div>

        {/* Class 10 Stream Selection with AI Questions */}
        {isClass10 && formData.currentlyStudying !== undefined && (
          <div>
            {!formData.interest10 ? (
              <Class10StreamSelector
                onStreamSelected={(stream) => {
                  handleChange('interest10', stream);
                  setShowClass10Questions(false);
                }}
                studentName={formData.name || 'Student'}
              />
            ) : (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  Selected Stream: {formData.interest10 === 'engineering' ? 'Engineering' : formData.interest10 === 'medical' ? 'Medical' : 'Commerce/Accounts'}
                </p>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, interest10: undefined }))}
                  className="mt-2 text-sm text-green-700 underline"
                >
                  Change Selection
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mark Percentage - Only if not currently studying */}
        {formData.currentlyStudying === false && (
          <div>
            <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-2">
              {t('markPercentage')} <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="marks"
              value={formData.marks || ''}
              onChange={(e) => handleChange('marks', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
                errors.marks ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
              max="100"
              step="0.01"
              placeholder="0-100"
              required
            />
            {errors.marks && <p className="mt-1 text-sm text-red-500">{errors.marks}</p>}
          </div>
        )}

        {/* Stream (only for Class 12) */}
        {isClass12 && (
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('stream')} <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center text-gray-800">
                  <input
                    type="radio"
                    name="stream"
                  value="science"
                  checked={formData.stream === 'science'}
                  onChange={(e) => handleStreamChange(e.target.value as 'science')}
                  className="mr-2"
                />
                <span className="text-gray-800">{t('science')}</span>
              </label>
              <label className="flex items-center text-gray-800">
                <input
                  type="radio"
                  name="stream"
                  value="commerce"
                  checked={formData.stream === 'commerce'}
                  onChange={(e) => handleStreamChange(e.target.value as 'commerce')}
                  className="mr-2"
                />
                <span className="text-gray-800">{t('commerce')}</span>
              </label>
            </div>
            {errors.stream && <p className="mt-1 text-sm text-red-500">{errors.stream}</p>}
          </div>
        )}

        {/* Class 12 Subject Combinations */}
        {isClass12 && formData.stream && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Combination <span className="text-red-500">*</span>
            </label>
            {formData.stream === 'science' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'biomaths', label: 'Biology + Mathematics (Bio-Maths)' },
                  { value: 'comp-maths', label: 'Computer Science + Mathematics (Comp-Maths)' },
                  { value: 'pure-science', label: 'Pure Science (Physics, Chemistry, Mathematics)' },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('class12SubjectCombination', option.value)}
                    className={`px-4 py-3 rounded-lg border text-left ${
                      formData.class12SubjectCombination === option.value
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'business-maths', label: 'Business Mathematics' },
                  { value: 'computer-application', label: 'Computer Application' },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('class12SubjectCombination', option.value)}
                    className={`px-4 py-3 rounded-lg border text-left ${
                      formData.class12SubjectCombination === option.value
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Law Interest */}
        {isClass12 && (
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.lawInterest || false}
                onChange={(e) => handleChange('lawInterest', e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded"
              />
              <span className="text-gray-700 font-medium">
                I am also interested in Law courses (CLAT, AILET, etc.)
              </span>
            </label>
          </div>
        )}

        {/* Entrance Exams Section (only for Class 12) */}
        {isClass12 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('entranceExams')}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('attemptedEntranceExams')}
            </p>

            {/* JEE Rank (for Science stream) */}
            {isScience && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('jeeRank')} <span className="text-red-500">*</span>
                </label>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleJeeAttempted(true);
                      setFormData(prev => ({ ...prev, jeeRank: '' }));
                    }}
                    className={`mr-4 px-4 py-2 rounded-lg border ${
                      jeeAttempted === true
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Attempted
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleJeeAttempted(false);
                      setFormData(prev => ({ ...prev, jeeRank: null }));
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      jeeAttempted === false
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {t('notAttempted')}
                  </button>
                </div>
                {jeeAttempted === true && (
                  <input
                    type="number"
                    id="jeeRank"
                    value={formData.jeeRank || ''}
                    onChange={(e) => handleChange('jeeRank', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800 ${
                      errors.jeeRank ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter JEE Rank"
                    min="1"
                    required
                  />
                )}
                {errors.jeeRank && <p className="mt-1 text-sm text-red-500">{errors.jeeRank}</p>}
              </div>
            )}

            {/* NEET Rank (for Science stream - Medical) */}
            {isScience && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('neetRank')}
                </label>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setNeetAttempted(true);
                      setFormData(prev => ({ ...prev, neetRank: '' }));
                    }}
                    className={`mr-4 px-4 py-2 rounded-lg border ${
                      neetAttempted === true
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Attempted
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNeetAttempted(false);
                      setFormData(prev => ({ ...prev, neetRank: null }));
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      neetAttempted === false
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {t('notAttempted')}
                  </button>
                </div>
                {neetAttempted === true && (
                  <input
                    type="number"
                    id="neetRank"
                    value={formData.neetRank || ''}
                    onChange={(e) => handleChange('neetRank', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800"
                    placeholder="Enter NEET Rank"
                    min="1"
                  />
                )}
              </div>
            )}

            {/* CAT Score (for Commerce stream) */}
            {formData.stream === 'commerce' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('catScore')}
                </label>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCatAttempted(true);
                      setFormData(prev => ({ ...prev, catScore: '' }));
                    }}
                    className={`mr-4 px-4 py-2 rounded-lg border ${
                      catAttempted === true
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Attempted
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCatAttempted(false);
                      setFormData(prev => ({ ...prev, catScore: null }));
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      catAttempted === false
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {t('notAttempted')}
                  </button>
                </div>
                {catAttempted === true && (
                  <input
                    type="number"
                    id="catScore"
                    value={formData.catScore || ''}
                    onChange={(e) => handleChange('catScore', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800"
                    placeholder="Enter CAT Score (0-300)"
                    min="0"
                    max="300"
                  />
                )}
              </div>
            )}

            {/* MAT Score (for Commerce stream) */}
            {formData.stream === 'commerce' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('matScore')}
                </label>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMatAttempted(true);
                      setFormData(prev => ({ ...prev, matScore: '' }));
                    }}
                    className={`mr-4 px-4 py-2 rounded-lg border ${
                      matAttempted === true
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Attempted
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMatAttempted(false);
                      setFormData(prev => ({ ...prev, matScore: null }));
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      matAttempted === false
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {t('notAttempted')}
                  </button>
                </div>
                {matAttempted === true && (
                  <input
                    type="number"
                    id="matScore"
                    value={formData.matScore || ''}
                    onChange={(e) => handleChange('matScore', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800"
                    placeholder="Enter MAT Score (0-800)"
                    min="0"
                    max="800"
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Other Competitive Exams Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you attempted any other competitive exams?
          </label>
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                setShowOtherExams(true);
                if (!showOtherExams) {
                  setSelectedOtherExams([]);
                  setFormData(prev => ({ ...prev, otherCompetitiveExams: [], otherExamScores: {} }));
                }
              }}
              className={`mr-4 px-4 py-2 rounded-lg border ${
                showOtherExams
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                setShowOtherExams(false);
                setSelectedOtherExams([]);
                setFormData(prev => ({ ...prev, otherCompetitiveExams: [], otherExamScores: {} }));
              }}
              className={`px-4 py-2 rounded-lg border ${
                !showOtherExams
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              No
            </button>
          </div>

          {showOtherExams && (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-600 mb-3">Select exams you have attempted:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2 border rounded-lg">
                {getExamsByStream(formData.stream, formData.lawInterest).map((exam) => (
                  <label key={exam.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedOtherExams.includes(exam.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newSelected = [...selectedOtherExams, exam.id];
                          setSelectedOtherExams(newSelected);
                          setFormData(prev => ({
                            ...prev,
                            otherCompetitiveExams: newSelected,
                            otherExamScores: { ...prev.otherExamScores, [exam.id]: '' }
                          }));
                        } else {
                          const newSelected = selectedOtherExams.filter(id => id !== exam.id);
                          setSelectedOtherExams(newSelected);
                          const newScores = { ...formData.otherExamScores };
                          delete newScores[exam.id];
                          setFormData(prev => ({
                            ...prev,
                            otherCompetitiveExams: newSelected,
                            otherExamScores: newScores
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700">{exam.name}</span>
                      <p className="text-xs text-gray-500">{exam.fullName}</p>
                    </div>
                  </label>
                ))}
              </div>

              {/* Score inputs for selected exams */}
              {selectedOtherExams.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-medium text-gray-700">Enter your scores/ranks:</p>
                  {selectedOtherExams.map((examId) => {
                    const exam = competitiveExams.find(e => e.id === examId);
                    if (!exam) return null;
                    return (
                      <div key={examId}>
                        <label className="block text-sm text-gray-600 mb-1">
                          {exam.name} {exam.id.includes('rank') || exam.id.includes('jee') || exam.id.includes('neet') ? 'Rank' : 'Score'}
                        </label>
                        <input
                          type="text"
                          value={formData.otherExamScores?.[examId] || ''}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              otherExamScores: { ...prev.otherExamScores, [examId]: e.target.value }
                            }));
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800"
                          placeholder={`Enter ${exam.name} ${exam.id.includes('rank') || exam.id.includes('jee') || exam.id.includes('neet') ? 'Rank' : 'Score'}`}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scholarship Eligibility */}
        <div className="mb-6 border-t pt-6">
          <label className="flex items-center space-x-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={formData.scholarshipEligible || false}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, scholarshipEligible: e.target.checked }));
              }}
              className="w-5 h-5 text-primary-600 rounded"
            />
            <span className="text-gray-700 font-medium">
              I need financial assistance / Scholarship
            </span>
          </label>

          {formData.scholarshipEligible && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold text-gray-800 mb-3">Scholarship Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Family Income (INR) <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.familyIncome || ''}
                  onChange={(e) => handleChange('familyIncome', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800"
                  required={formData.scholarshipEligible}
                >
                  <option value="">Select Income Range</option>
                  <option value="below-1lakh">Below ₹1 Lakh</option>
                  <option value="1-3lakh">₹1 Lakh - ₹3 Lakh</option>
                  <option value="3-5lakh">₹3 Lakh - ₹5 Lakh</option>
                  <option value="5-8lakh">₹5 Lakh - ₹8 Lakh</option>
                  <option value="above-8lakh">Above ₹8 Lakh</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.scholarshipInfo?.category || ''}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      scholarshipInfo: { ...prev.scholarshipInfo, category: e.target.value }
                    }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-800"
                  required={formData.scholarshipEligible}
                >
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="ews">EWS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have any disability certificate?
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        scholarshipInfo: { ...prev.scholarshipInfo, hasDisability: true }
                      }));
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.scholarshipInfo?.hasDisability === true
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        scholarshipInfo: { ...prev.scholarshipInfo, hasDisability: false }
                      }));
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg border ${
                      formData.scholarshipInfo?.hasDisability === false
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Based on your information, we will show you eligible scholarships from colleges and government schemes.
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t('loading') : t('submit')}
        </button>
      </form>
    </div>
  );
}

