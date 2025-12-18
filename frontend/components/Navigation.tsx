'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/i18n';

export default function Navigation() {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(language, key);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">ByteRizz</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              {t('home')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition">
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

