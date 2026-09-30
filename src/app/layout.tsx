import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const displayFont = Fredoka({ 
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700']
});

const bodyFont = Nunito({ 
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'EasyBites Bakery',
  description: 'A cozy bakery shop and recipe blog.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-surface text-text font-body selection:bg-brand selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
