'use client';

import Hero3DBakery from '@/components/Hero3DBakery';
import { Croissant, Citrus, Cookie, CakeSlice, UserRound } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { FALLBACK_PRODUCTS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function Home() {
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Format the DB products to match UI expectations
          const formatted = data.map((p: { id: string; name: string; price: number; imageUrl?: string; description: string; }) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.imageUrl || "https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?auto=format&fit=crop&w=600&q=80",
            desc: p.description
          }));
          setProducts(formatted);
        }
      })
      .catch(console.error);
  }, []);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-10 sm:pb-12 lg:py-0 lg:min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-brand/10 rounded-blob blur-3xl -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-accent/20 rounded-blob-alt blur-3xl -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center h-full">
          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4 sm:gap-5 relative z-10 lg:col-span-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-brand font-bold text-xs sm:text-sm tracking-wide shadow-sm border border-brand/5 transform -rotate-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand animate-pulse"></span>
              Fresh out of the oven!
            </span>
            <h1 className="text-text font-display">
              Celebrate your day with <br className="hidden sm:block" />
              <span className="text-brand relative inline-block mt-1 sm:mt-2">
                Classic Bites.
                <svg className="absolute w-full h-2 sm:h-3 -bottom-1 left-0 text-accent/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,15 100,5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="text-text-muted text-base sm:text-lg max-w-md font-medium leading-relaxed">
              Premium quality seasonal cookies baked with love. Perfect for your everyday self-indulgence and happy moments.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
              <button 
                onClick={() => {
                  document.getElementById('seasonal-favorites')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-brand text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Order Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
              </button>
              <button 
                onClick={() => {
                  document.getElementById('seasonal-favorites')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-white text-text px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-surface-alt"
              >
                Our Menu
              </button>
            </div>
          </div>

          {/* 3D Model Content */}
          <div className="relative flex justify-center lg:justify-end mt-4 sm:mt-8 lg:mt-0 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[650px] lg:col-span-7">
            <div className="relative w-full h-full z-10 group">
              <Hero3DBakery />
            </div>
          </div>
        </div>
      </section>

      {/* Story & Tips Section */}
      <section className="bg-surface-alt py-16 sm:py-20 px-4 sm:px-6 md:px-12 w-full mt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="col-span-1 lg:col-span-5 relative z-10">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px] -z-10 group-hover:bg-brand/10 transition-colors duration-500"></div>
              <h2 className="text-3xl font-display text-text mb-4">Owner&apos;s <br/><span className="text-accent italic">Tips</span></h2>
              <p className="text-text-muted text-lg italic leading-relaxed mb-6">
                &quot;Untuk hasil Nastar yang sempurna, pastikan selai nanas sedikit kering sebelum dibungkus dengan adonan. Ini akan mencegah adonan pecah saat dipanggang dan menjaga warna luar tetap cantik keemasan!&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent p-1 bg-surface-alt flex items-center justify-center text-text-muted">
                  <UserRound className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-bold text-text">Reandy & Nadhira</p>
                  <p className="text-sm font-semibold text-brand">Owner</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 lg:pl-12">
            <h2 className="text-3xl md:text-4xl font-display text-text mb-6">Dipanggang segar setiap hari <br/>dengan penuh cinta.</h2>
            <p className="text-text-muted text-lg mb-8 max-w-2xl">
              Kami percaya setiap hari layak dirayakan. Kue-kue kami dibuat menggunakan resep tradisional yang diwariskan turun-temurun, namun dengan sentuhan modern yang menyenangkan untuk membuat setiap gigitan tak terlupakan.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-5 py-3 bg-white rounded-full font-bold text-text-muted shadow-sm flex items-center gap-2">
                <span className="text-accent">✓</span> Tanpa Pengawet
              </span>
              <span className="px-5 py-3 bg-white rounded-full font-bold text-text-muted shadow-sm flex items-center gap-2">
                <span className="text-brand">✓</span> Buah Asli
              </span>
              <span className="px-5 py-3 bg-white rounded-full font-bold text-text-muted shadow-sm flex items-center gap-2">
                <span className="text-amber-500">✓</span> Keju Premium
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Products Section */}
      <section id="seasonal-favorites" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-text mb-2 md:mb-4">Seasonal Favorites</h2>
            <p className="text-text-muted text-base sm:text-lg max-w-md">Kue kering favorit musim ini. Dapatkan sebelum kehabisan!</p>
          </div>
          <button className="text-brand font-bold hover:text-text transition-colors flex items-center gap-2 group mt-2 md:mt-0">
            Lihat menu lengkap
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
          {products.map(product => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              <div className="relative w-full aspect-[4/5] mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl overflow-hidden bg-surface-alt">
                {product.tag && (
                  <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 px-2 py-1 sm:px-3 sm:py-1 bg-brand text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded-full shadow-md">
                    {product.tag}
                  </span>
                )}
                {/* Overlay for hover */}
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300 z-10"></div>
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo" 
                />
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem({ id: String(product.id), name: product.name, price: product.price, image: product.image });
                  }}
                  className="absolute bottom-4 right-4 z-20 w-12 h-12 bg-white text-brand rounded-full flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand hover:text-white"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></svg>
                </button>
              </div>
              
              <h3 className="text-base sm:text-xl font-display text-text mb-1 sm:mb-2 leading-tight">{product.name}</h3>
              <p className="text-text-muted text-xs sm:text-sm mb-2 sm:mb-4 flex-grow line-clamp-2">{product.desc}</p>
              <div className="text-brand font-bold text-sm sm:text-lg mt-auto">
                {formatIDR(product.price)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flavor Profile Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12 mb-16 md:mb-20">
        <div className="bg-brand rounded-[2rem] md:rounded-[3rem] p-6 sm:p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden text-white">
          {/* Decorative SVG background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="polka" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="4" fill="currentColor"/>
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#polka)"/>
            </svg>
          </div>

          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-4 md:mb-6">Discover your perfect match.</h2>
            <p className="text-white/80 text-base sm:text-lg mb-6 md:mb-8 font-medium">
              Bingung mau coba yang mana? Jelajahi profil rasa kami. Baik Anda menyukai yang gurih, sangat manis, atau perpaduan keduanya.
            </p>
            <button className="w-full sm:w-auto bg-white text-brand px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-surface transition-colors duration-300">
              Ikuti Kuis Rasa
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-8 sm:gap-y-12 max-w-md w-full mt-4 lg:mt-0">
            {[
              { 
                name: "Rich & Savory", 
                desc: "Cheese & butter",
                icon: <Croissant className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />,
                color: "text-[#FFB703]" 
              },
              { 
                name: "Fruity & Tart", 
                desc: "Pineapple & citrus",
                icon: <Citrus className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />,
                color: "text-white" 
              },
              { 
                name: "Deep Chocolate", 
                desc: "Cocoa & cashew",
                icon: <Cookie className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />,
                color: "text-[#8D6E63]" 
              },
              { 
                name: "Sweet Vanilla", 
                desc: "Classic buttery",
                icon: <CakeSlice className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />,
                color: "text-[#8ECAE6]" 
              },
            ].map((flavor) => (
              <div 
                key={flavor.name} 
                className="group flex flex-col items-center justify-start text-center cursor-pointer"
              >
                <div className={`${flavor.color} mb-3 sm:mb-4 transform group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300 drop-shadow-md`}>
                  {flavor.icon}
                </div>
                <h3 className="font-display font-bold text-base sm:text-xl leading-tight mb-1 sm:mb-2 text-white group-hover:text-white/90 transition-colors">{flavor.name}</h3>
                <p className="text-xs sm:text-sm text-white/70 font-medium">{flavor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}