'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation, Language } from '@/lib/i18n';

interface LanguageSelectorProps {
  onLanguageSelected?: () => void;
}

export default function LanguageSelector({ onLanguageSelected }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);
  
  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
    if (onLanguageSelected) {
      onLanguageSelected();
    }
  };

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t('selectLanguage')}
        </h2>
        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                language === lang.code
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{lang.name}</div>
                  <div className="text-sm text-gray-600">{lang.nativeName}</div>
                </div>
                {language === lang.code && (
                  <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

