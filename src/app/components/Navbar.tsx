'use client';
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <div className="w-full bg-brand text-white overflow-hidden py-1.5 flex items-center border-b border-white/10">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap text-[10px] font-body font-semibold tracking-[0.3em] uppercase inline-block opacity-90">
          EASYBITES &nbsp;&nbsp;&nbsp; PREMIUM QUALITY &nbsp;&nbsp;&nbsp; FRESHLY BAKED DAILY &nbsp;&nbsp;&nbsp; 100% NATURAL INGREDIENTS &nbsp;&nbsp;&nbsp; EASYBITES &nbsp;&nbsp;&nbsp; PREMIUM QUALITY &nbsp;&nbsp;&nbsp; FRESHLY BAKED DAILY
        </div>
      </div>
      
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out-expo ${
          isScrolled 
            ? 'bg-surface/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-text/5 py-2 md:py-3' 
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center relative">
          
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group relative z-20" onClick={() => setIsMobileMenuOpen(false)}>
            <div className={`rounded-full overflow-hidden shadow-sm animate-[coin-flip_18s_ease-in-out_infinite] bg-white border border-brand/10 transition-all duration-500 ease-out-expo ${isScrolled ? 'w-9 h-9 md:w-10 md:h-10' : 'w-12 h-12 md:w-14 md:h-14'}`}>
              <img src="/images/logo.png" alt="EasyBites Logo" className="w-full h-full object-cover scale-[1.05] group-hover:scale-110 transition-transform origin-center duration-500" />
            </div>
            {!isScrolled && (
              <span className="font-display font-bold text-base md:text-lg tracking-wide text-brand mt-1 opacity-100 transition-opacity duration-300">
                EASYBITES
              </span>
            )}
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                className="relative text-sm font-bold text-text-muted hover:text-brand transition-colors tracking-widest uppercase group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand group-hover:w-full transition-all duration-300 ease-out-expo"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-5 relative z-20">
            <button className="text-text-muted hover:text-brand transition-colors hidden md:block">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <div className="w-[1px] h-4 bg-text/10 hidden md:block"></div>
            <button 
              onClick={toggleCart} 
              className="text-text-muted hover:text-brand transition-colors relative group p-2 md:p-0"
            >
              <ShoppingBag className="w-6 h-6 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              {mounted && totalItems > 0 && (
                <span className="absolute 0 md:-top-1.5 0 md:-right-1.5 top-0 right-0 w-4 h-4 flex items-center justify-center bg-brand text-white rounded-full text-[9px] font-extrabold border-[1.5px] border-surface shadow-sm transform scale-100">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-muted hover:text-brand transition-colors md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-surface/95 backdrop-blur-lg z-40 transition-all duration-300 ease-in-out md:hidden flex flex-col items-center justify-center ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-6">
          {navLinks.map((item, i) => (
            <Link 
              key={item.name} 
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-display font-bold tracking-wider text-text hover:text-brand transition-all transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/admin" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`mt-4 px-6 py-2 bg-brand/10 text-brand rounded-full font-bold transition-all transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
          >
            Admin Panel
          </Link>
        </nav>
      </div>
    </>
  );
}
