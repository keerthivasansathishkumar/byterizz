'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-3xl font-bold text-primary-700">ByteRizz</span>
          </Link>
          <nav className="flex items-center space-x-3 md:space-x-6">
            <Link href="/" className="text-sm md:text-base text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/career" className="text-sm md:text-base text-gray-700 hover:text-primary-600 font-medium">
              Career
            </Link>
            <Link href="/contact" className="text-sm md:text-base text-gray-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}


