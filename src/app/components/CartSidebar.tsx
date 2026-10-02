'use client';

import { useCartStore } from '../store/cartStore';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) return null;

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-surface-alt flex justify-between items-center bg-brand text-white">
          <h2 className="text-xl font-display font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Keranjang
          </h2>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 bg-surface">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p>Keranjang kamu masih kosong</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-surface-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex flex-col justify-between flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-text leading-tight">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-text-muted hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-brand font-semibold text-sm">{formatIDR(item.price)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-surface-alt flex items-center justify-center hover:bg-brand hover:text-white transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-surface-alt flex items-center justify-center hover:bg-brand hover:text-white transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-surface-alt shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-text-muted font-medium">Total Estimasi</span>
              <span className="text-2xl font-bold text-text">{formatIDR(getTotal())}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={() => setIsOpen(false)}
              className="w-full py-4 bg-brand text-white font-bold rounded-full flex justify-center items-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Checkout Sekarang
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
