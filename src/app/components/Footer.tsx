import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative bg-surface-alt pt-24 pb-12 mt-auto border-t-2 border-brand/10">
      <div className="absolute top-0 left-0 w-full h-8 -mt-8 overflow-hidden pointer-events-none">
         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-surface-alt">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C60.29,43.25,181.71,76.57,321.39,56.44Z"></path>
         </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-display font-bold text-3xl text-brand mb-4">EasyBites.</h5>
            <p className="text-text-muted mb-6 max-w-sm">
              Joyful everyday treats. We bake with love, premium ingredients, and a touch of modern magic.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'TikTok'].map((social) => (
                <a key={social} href="#" className="w-12 h-12 bg-white rounded-blob flex items-center justify-center text-text hover:text-brand hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <span className="font-bold text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-display font-bold text-xl text-text mb-6">Explore</h5>
            <ul className="flex flex-col gap-3">
              {['Home', 'Our Menu', 'Baking Blog', 'Contact Us'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-text-muted hover:text-brand font-semibold transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-brand transition-all duration-300"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="font-display font-bold text-xl text-text mb-6">Say Hello</h5>
            <ul className="flex flex-col gap-4 text-text-muted">
              <li>
                <strong className="block text-text mb-1">Visit Us</strong>
                123 Bakery Street, Sweet City
              </li>
              <li>
                <strong className="block text-text mb-1">Call Us</strong>
                +1 (555) 123-4567
              </li>
              <li>
                <strong className="block text-text mb-1">Email</strong>
                hello@easybites.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted font-semibold text-sm">
            &copy; {new Date().getFullYear()} EasyBites Bakery. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-text-muted font-semibold">
            <Link href="#" className="hover:text-brand">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
