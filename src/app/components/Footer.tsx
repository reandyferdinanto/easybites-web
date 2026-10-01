import React from 'react';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative bg-surface-alt pt-24 pb-12 mt-auto border-t-2 border-brand/10">
      <div className="absolute top-0 left-0 w-full h-8 -mt-8 overflow-hidden pointer-events-none">
         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-surface-alt">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C60.29,43.25,181.71,76.57,321.39,56.44Z"></path>
         </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-display font-bold text-3xl text-brand mb-4">EasyBites.</h5>
            <p className="text-text-muted mb-6 max-w-sm">
              Camilan harian yang membawa kebahagiaan. Kami memanggang dengan cinta, bahan premium, dan sentuhan keajaiban modern.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/easybites.baking" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white rounded-blob flex items-center justify-center text-text hover:text-brand hover:scale-110 hover:shadow-lg transition-all duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-display font-bold text-xl text-text mb-6">Jelajahi</h5>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Beranda', path: '/' },
                { name: 'Menu', path: '/menu' },
                { name: 'Blog', path: '/blog' },
                { name: 'Kontak', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-text-muted hover:text-brand font-semibold transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-brand transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-display font-bold text-xl text-text mb-6">Kunjungi Kami</h5>
            <ul className="flex flex-col gap-6 text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-brand" />
                <div>
                  <strong className="block text-text mb-1">Main Store</strong>
                  Jl Raya Hankam RT004/ RW005 No. 49<br />Ujung Aspal, Jatiranggon, Bekasi
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-brand" />
                <div>
                  <strong className="block text-text mb-1">Branch Store</strong>
                  Jl. Haji Nawi RT005 / RW013 No. A2<br />Jatimakmur, Pondok Gede, Bekasi
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 shrink-0 text-brand" />
                <div>
                  <strong className="block text-text mb-1">WhatsApp / Telepon</strong>
                  <a href="https://wa.me/6281315341342" className="hover:text-brand transition-colors">0813 1534 1342</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <InstagramIcon className="w-5 h-5 mt-1 shrink-0 text-brand" />
                <div>
                  <strong className="block text-text mb-1">Instagram</strong>
                  <a href="https://instagram.com/easybites.baking" target="_blank" rel="noreferrer" className="hover:text-brand transition-colors">@easybites.baking</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-surface flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted font-medium">
          <p>&copy; {new Date().getFullYear()} EasyBites Bakery. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-brand">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
