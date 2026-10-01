import Link from 'next/link';
import { LayoutDashboard, Package, FileText, Store } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-alt flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-alt flex flex-col shadow-sm hidden md:flex">
        <div className="p-6 border-b border-surface-alt">
          <Link href="/admin" className="font-display font-bold text-2xl text-brand">
            EB Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text hover:bg-brand/10 hover:text-brand transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text hover:bg-brand/10 hover:text-brand transition-colors">
            <Package className="w-5 h-5" />
            Produk
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text hover:bg-brand/10 hover:text-brand transition-colors">
            <FileText className="w-5 h-5" />
            Blog Posts
          </Link>
        </nav>
        <div className="p-4 border-t border-surface-alt">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text-muted hover:bg-surface-alt transition-colors">
            <Store className="w-5 h-5" />
            Kembali ke Toko
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-surface-alt p-4 flex justify-between items-center">
          <span className="font-display font-bold text-xl text-brand">EB Admin</span>
          <Link href="/" className="text-text-muted text-sm font-bold">Ke Toko</Link>
        </header>

        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
