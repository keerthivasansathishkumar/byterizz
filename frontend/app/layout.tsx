import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ByteRizz AI - Career Success Platform',
  description: 'Discover your ideal career path with AI-powered guidance. Rizz with Brains!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#1e40af',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}

