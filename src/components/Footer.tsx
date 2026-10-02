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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
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
          <div className="md:col-span-3 flex flex-col items-start text-left">
            <h5 className="font-display font-bold text-xl text-text mb-6">Jelajahi</h5>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Beranda', path: '/' },
                { name: 'Menu', path: '/menu' },
                { name: 'Recipes', path: '/recipes' },
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
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <h5 className="font-display font-bold text-xl text-text mb-6">Kunjungi Kami</h5>
            <ul className="flex flex-col gap-6 text-text-muted w-full">
              <li>
                <a href="https://www.google.com/maps/place/Warpen+(Warung+Pepen)/@-6.3376917,106.9220363,17z" target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 mt-1 shrink-0 text-brand group-hover:scale-110 transition-transform" />
                  <div className="group-hover:text-brand transition-colors">
                    <strong className="block text-text mb-1 group-hover:text-brand transition-colors">Main Store</strong>
                    Jl Raya Hankam RT004/ RW005 No. 49<br />Ujung Aspal, Jatiranggon, Bekasi
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/place/EasyBites+Baking/@-6.2901474,106.9359975,17z" target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                  <MapPin className="w-5 h-5 mt-1 shrink-0 text-brand group-hover:scale-110 transition-transform" />
                  <div className="group-hover:text-brand transition-colors">
                    <strong className="block text-text mb-1 group-hover:text-brand transition-colors">Branch Store</strong>
                    Jl. Haji Nawi RT005 / RW013 No. A2<br />Jatimakmur, Pondok Gede, Bekasi
                  </div>
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281315341342" target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                  <Phone className="w-5 h-5 mt-1 shrink-0 text-brand group-hover:scale-110 transition-transform" />
                  <div className="group-hover:text-brand transition-colors">
                    <strong className="block text-text mb-1 group-hover:text-brand transition-colors">WhatsApp / Telepon</strong>
                    0813 1534 1342
                  </div>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/easybites.baking" target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                  <InstagramIcon className="w-5 h-5 mt-1 shrink-0 text-brand group-hover:scale-110 transition-transform" />
                  <div className="group-hover:text-brand transition-colors">
                    <strong className="block text-text mb-1 group-hover:text-brand transition-colors">Instagram</strong>
                    @easybites.baking
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-surface flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-text-muted font-medium text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} EasyBites Bakery. Hak Cipta Dilindungi.<br className="md:hidden" />
            <span className="md:ml-1 opacity-70">3D Bakery Model by <a href="https://sketchfab.com/stokhuis" target="_blank" rel="noreferrer" className="hover:text-brand underline decoration-brand/30 underline-offset-2">Bjarne Stokhof</a> under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="hover:text-brand underline decoration-brand/30 underline-offset-2">CC BY 4.0</a>.</span>
          </p>
          <div className="flex gap-4 sm:gap-6 mt-2 md:mt-0">
            <Link href="#" className="hover:text-brand transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-brand transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
