import { Package, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-2">Admin Dashboard</h1>
      <p className="text-text-muted mb-8">Selamat datang di panel admin EasyBites. Kelola produk dan resep kamu di sini.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products" className="bg-white p-8 rounded-[2rem] border border-surface-alt hover:shadow-lg hover:-translate-y-1 transition-all group">
          <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Kelola Produk</h2>
          <p className="text-text-muted">Tambah, edit, dan hapus menu bakery kamu.</p>
        </Link>
        
        <Link href="/admin/recipes" className="bg-white p-8 rounded-[2rem] border border-surface-alt hover:shadow-lg hover:-translate-y-1 transition-all group">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-2">Kelola Resep</h2>
          <p className="text-text-muted">Buat dan atur postingan resep andalanmu.</p>
        </Link>
      </div>
    </div>
  );
}
