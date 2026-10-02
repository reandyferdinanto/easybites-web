'use client';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronLeft, Building2 } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Mohon lengkapi data pengiriman.');
      return;
    }
    // Show success/bank transfer info
    setIsSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    const adminPhone = '6281315341342'; // Ganti dengan nomor WA admin
    let message = `Halo Admin EasyBites, saya ingin konfirmasi pesanan dan pembayaran transfer bank:\n\n`;
    message += `*Data Pemesan:*\n`;
    message += `Nama: ${formData.name}\n`;
    message += `No. HP: ${formData.phone}\n`;
    message += `Alamat: ${formData.address}\n`;
    if (formData.notes) message += `Catatan: ${formData.notes}\n`;
    
    message += `\n*Detail Pesanan:*\n`;
    items.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) = ${formatIDR(item.price * item.quantity)}\n`;
    });
    
    message += `\n*Total Bayar: ${formatIDR(getTotal())}*\n\n`;
    message += `Tolong info jika pesanan sudah diproses ya. Terima kasih!`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
  };

  if (!mounted) return null;

  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-display font-bold mb-4">Keranjang Kosong</h1>
        <p className="text-text-muted mb-8">Kamu belum memasukkan pesanan apa pun.</p>
        <Link href="/" className="px-8 py-4 bg-brand text-white font-bold rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          Kembali Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-brand font-bold mb-8 transition-colors group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Kembali
      </Link>

      {isSubmitted ? (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-surface-alt text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 sm:mb-4">Pesanan Diterima!</h1>
          <p className="text-text-muted text-base sm:text-lg mb-6 sm:mb-8">
            Terima kasih, <strong>{formData.name}</strong>. Silakan selesaikan pembayaran melalui transfer bank untuk memproses pesananmu.
          </p>

          <div className="bg-surface p-4 sm:p-6 rounded-xl sm:rounded-2xl text-left mb-6 sm:mb-8 border border-surface-alt">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand" /> Informasi Transfer Bank
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-xs sm:text-sm text-text-muted">Bank BCA</p>
                <p className="font-bold text-lg sm:text-xl tracking-wider">123 456 7890</p>
                <p className="text-xs sm:text-sm font-medium">a.n. PT EasyBites Indonesia</p>
              </div>
              <div className="border-t border-surface-alt pt-3 sm:pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                <span className="text-sm sm:text-base text-text-muted">Total Tagihan:</span>
                <span className="font-bold text-xl sm:text-2xl text-brand">{formatIDR(getTotal())}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-text-muted mb-6">
            Setelah transfer, harap konfirmasi melalui WhatsApp agar kami dapat segera menyiapkan pesananmu.
          </p>
          
          <a 
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => clearCart()}
            className="flex sm:inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] text-white font-bold text-sm sm:text-base rounded-full hover:bg-[#1ebd5a] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Konfirmasi Pembayaran
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Checkout */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-display font-bold mb-8">Informasi Pengiriman</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-surface-alt">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold text-text-muted mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                    placeholder="Contoh: Budi Santoso"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-muted mb-2">Nomor WhatsApp / HP</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                    placeholder="Contoh: 08123456789"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-muted mb-2">Alamat Pengiriman</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
                    placeholder="Tuliskan alamat lengkap beserta kecamatan dan kode pos"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-muted mb-2">Catatan Tambahan (Opsional)</label>
                  <input 
                    type="text" 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                    placeholder="Contoh: Tolong bungkus extra bubble wrap"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-surface-alt sticky top-32">
              <h2 className="text-2xl font-display font-bold mb-6">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center pb-4 border-b border-surface-alt last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-sm text-text">{item.name}</p>
                        <p className="text-xs text-text-muted">{item.quantity} x {formatIDR(item.price)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">{formatIDR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-surface-alt pt-6 space-y-3 mb-8">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span>{formatIDR(getTotal())}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Ongkos Kirim</span>
                  <span>Dihitung admin</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-text pt-2">
                  <span>Total Tagihan</span>
                  <span className="text-brand">{formatIDR(getTotal())}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full py-4 bg-brand text-white font-bold rounded-full hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/20 transition-all duration-300"
              >
                Buat Pesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
