'use client';
import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export default function ProductForm({ 
  product, 
  action 
}: { 
  product?: { id: string; name: string; description: string; price: number; imageUrl: string | null; }, 
  action: (formData: FormData) => Promise<void> 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Gagal mengunggah gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.set('imageUrl', imageUrl);
    
    try {
      await action(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2rem] border border-surface-alt max-w-2xl">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-text-muted mb-2">Nama Produk</label>
          <input 
            type="text" 
            name="name"
            defaultValue={product?.name || ''}
            className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-text-muted mb-2">Harga (Rp)</label>
          <input 
            type="number" 
            name="price"
            defaultValue={product?.price || ''}
            className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-text-muted mb-2">Deskripsi</label>
          <textarea 
            name="description"
            rows={4}
            defaultValue={product?.description || ''}
            className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-text-muted mb-2">Gambar Produk</label>
          
          {imageUrl ? (
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-surface-alt group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => setImageUrl('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative w-full h-40 border-2 border-dashed border-surface-alt rounded-2xl flex flex-col items-center justify-center text-text-muted hover:border-brand hover:text-brand transition-colors bg-surface/50">
              {isUploading ? (
                <Loader2 className="w-8 h-8 animate-spin text-brand" />
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm font-bold">Klik untuk unggah gambar</span>
                </>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-surface-alt flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-brand text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Simpan Produk'}
        </button>
      </div>
    </form>
  );
}
