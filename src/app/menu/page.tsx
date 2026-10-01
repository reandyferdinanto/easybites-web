'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

export default function MenuPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState<any[]>([
    { id: 1, name: "Premium Nastar", price: 120000, image: "https://images.unsplash.com/photo-1590080874088-eec64895e423?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "Best Seller", desc: "Classic melt-in-mouth pineapple tart." },
    { id: 2, name: "Kaastengel", price: 135000, image: "https://images.unsplash.com/photo-1605807646983-377bc5a7644e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "Cheese Lover", desc: "Savory Dutch-Indonesian cheese stick." },
    { id: 3, name: "Putri Salju", price: 110000, image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "", desc: "Crescent-shaped cookies coated in powdered sugar." },
    { id: 4, name: "Choco Cashew", price: 125000, image: "https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "New", desc: "Rich chocolate dough studded with roasted cashews." },
    { id: 5, name: "Matcha Almond", price: 130000, image: "https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "Fan Favorite", desc: "Earthy matcha blended with crunchy roasted almonds." },
    { id: 6, name: "Double Choco", price: 125000, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "", desc: "Dark chocolate cookies with melted chocolate chips inside." },
    { id: 7, name: "Parmesan Bites", price: 140000, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "Premium", desc: "Bite-sized treats bursting with aged parmesan flavor." },
    { id: 8, name: "Festive Hamper", price: 350000, image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80", tag: "Gift", desc: "A beautifully wrapped box containing 3 classic jars." },
  ]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.imageUrl || "https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?auto=format&fit=crop&w=600&q=80",
            desc: p.description,
            tag: ""
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
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-accent/10 rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-4xl animate-[float_6s_ease-in-out_infinite_reverse] opacity-80">🍍</div>
        <div className="absolute bottom-20 right-20 text-5xl animate-[float_5s_ease-in-out_infinite] opacity-80">🧀</div>
        <div className="absolute top-20 right-1/4 text-3xl animate-[float_7s_ease-in-out_infinite] opacity-60">🍫</div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-20 md:pb-32 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display text-text mb-6">
            Bite into <span className="text-brand">Happiness.</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
            Jelajahi koleksi lengkap kue premium buatan tangan kami.
            Dipanggang dengan sempurna untuk camilan harian Anda atau untuk dibagikan dengan orang tersayang.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((item, index) => (
            <div key={item.id} className="group flex flex-col">
              
              {/* Image Container with alternating blob shapes based on index */}
              <div 
                className={`relative w-full aspect-[4/5] mb-6 overflow-hidden bg-surface-alt ${
                  index % 3 === 0 ? 'rounded-blob' : index % 3 === 1 ? 'rounded-blob-alt' : 'rounded-[2rem]'
                }`}
              >
                {item.tag && (
                  <span className="absolute top-4 left-4 z-20 px-4 py-1.5 bg-brand text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-md">
                    {item.tag}
                  </span>
                )}
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo" 
                />
                
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/5 transition-colors duration-300 z-10 pointer-events-none"></div>

                {/* Quick Add Button */}
                <button className="absolute bottom-4 right-4 z-20 w-14 h-14 bg-white text-brand rounded-full flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand hover:text-white hover:scale-110">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              
              {/* Text Info */}
              <div className="flex flex-col flex-grow px-1">
                <div className="flex justify-between items-start mb-1 sm:mb-2 gap-2">
                  <h3 className="text-base sm:text-2xl font-display text-text leading-tight group-hover:text-brand transition-colors">{item.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-text-muted mb-2 sm:mb-4 flex-grow line-clamp-2">{item.desc}</p>
                <div className="font-bold text-sm sm:text-xl text-brand mt-auto">
                  {formatIDR(item.price)}
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="w-full py-24 flex flex-col items-center justify-center text-center">
            <span className="text-6xl mb-6">🍪</span>
            <h3 className="text-3xl font-display text-text mb-4">Oh crumb!</h3>
            <p className="text-text-muted max-w-md">
              Kami sedang menyiapkan kue-kue baru untuk Anda. Silakan periksa kembali nanti!
            </p>
          </div>
        )}

      </section>

      {/* Bottom CTA */}
      <section className="w-full bg-brand py-20 px-6 mt-12 text-center text-white relative overflow-hidden">
        {/* Decorative SVG background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="polka-menu" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="4" fill="currentColor"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-menu)"/>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display mb-6">Tidak menemukan yang Anda cari?</h2>
          <p className="text-white/90 text-lg mb-8">
            Kami menerima pesanan hampers kustom, kue dalam jumlah besar untuk acara, atau kolaborasi. Hubungi kami langsung.
          </p>
          <Link href="/contact" className="inline-block bg-white text-brand px-10 py-4 rounded-full font-bold text-lg hover:bg-surface hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            Hubungi Kami
          </Link>
        </div>
      </section>
      
      <style jsx>{`
        /* Hide scrollbar for the filter bar */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}