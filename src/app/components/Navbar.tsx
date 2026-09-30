'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      <div className="w-full bg-brand text-white overflow-hidden py-2.5 flex items-center">
        <div className="animate-[marquee_15s_linear_infinite] whitespace-nowrap text-sm font-display font-bold tracking-[0.2em] uppercase inline-block">
          EASYBITES &nbsp;&nbsp;&nbsp; FRESHLY BAKED DAILY &nbsp;&nbsp;&nbsp; EASYBITES &nbsp;&nbsp;&nbsp; FRESHLY BAKED DAILY &nbsp;&nbsp;&nbsp; EASYBITES &nbsp;&nbsp;&nbsp; FRESHLY BAKED DAILY &nbsp;&nbsp;&nbsp; EASYBITES &nbsp;&nbsp;&nbsp; FRESHLY BAKED DAILY
        </div>
      </div>
      <nav className="sticky top-4 md:top-6 z-50 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center bg-surface/90 backdrop-blur-md rounded-full px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-surface-alt transition-transform duration-300">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-sm animate-[coin-flip_18s_ease-in-out_infinite] bg-white border border-brand/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="EasyBites Logo" className="w-full h-full object-cover scale-[1.05] group-hover:scale-110 transition-transform origin-center" />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {['Home', 'Menu', 'Blog', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="px-5 py-2 rounded-full font-bold text-text-muted hover:text-text hover:bg-surface-alt transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-11 h-11 rounded-full text-text-muted hover:text-text hover:bg-surface-alt transition-colors">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
            </button>
            <button className="flex items-center justify-center w-11 h-11 rounded-full text-text-muted hover:text-text hover:bg-surface-alt transition-colors relative">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-brand text-white rounded-full text-[10px] font-bold border-2 border-surface">
                3
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
