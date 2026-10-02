import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

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
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} font-body bg-surface text-text antialiased selection:bg-accent/30 selection:text-text`}>
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
