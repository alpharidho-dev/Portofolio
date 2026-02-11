import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from './components/layout/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Satria Bahari - Fullstack Developer',
  description: 'Portfolio profesional Satria Bahari',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Providers>
          <main className="max-w-3xl mx-auto px-4 py-8">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
