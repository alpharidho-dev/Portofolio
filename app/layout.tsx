import type { Metadata } from 'next';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Alpharidho — Frontend Developer',
    template: '%s | Alpharidho',
  },
  description:
    'Portofolio Alpharidho. Siswa SMK Taruna Bhakti yang sedang belajar Frontend Development. HTML, CSS, JavaScript, React, Next.js.',
  keywords: [
    'frontend developer',
    'react',
    'next.js',
    'portofolio',
    'smk taruna bhakti',
    'pelajar',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
