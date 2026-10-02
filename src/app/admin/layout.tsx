'use client';
import Link from 'next/link';
import { LayoutDashboard, Package, FileText, Store, Users, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminMain, setIsAdminMain] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check auth from localStorage
    const auth = localStorage.getItem('eb_admin_auth');
    if (auth) {
      try {
        const data = JSON.parse(auth);
        setIsAuthenticated(true);
        setIsAdminMain(data.isMain);
      } catch {
        localStorage.removeItem('eb_admin_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('eb_admin_auth', JSON.stringify({
          username: data.user.username,
          isMain: data.user.isMain
        }));
        setIsAuthenticated(true);
        setIsAdminMain(data.user.isMain);
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('eb_admin_auth');
    setIsAuthenticated(false);
    setIsAdminMain(false);
    setUsername('');
    setPassword('');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-surface-alt">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface-alt flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm max-w-md w-full text-center border border-surface-alt">
          <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-bold text-text mb-2">Admin Login</h1>
          <p className="text-text-muted mb-8">Masuk ke panel manajemen EasyBites</p>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-sm font-bold text-text-muted mb-2 ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                placeholder="Masukkan username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-text-muted mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                placeholder="Masukkan password"
                required
              />
            </div>
            <button type="submit" className="mt-4 bg-brand text-white font-bold py-4 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              Masuk
            </button>
          </form>
          
          <div className="mt-8">
            <Link href="/" className="text-text-muted hover:text-brand transition-colors text-sm font-semibold flex items-center justify-center gap-2">
              <Store className="w-4 h-4" /> Kembali ke Toko
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt flex flex-col md:flex-row pb-20 md:pb-0">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-alt flex-col shadow-sm hidden md:flex sticky top-0 h-screen">
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
          <Link href="/admin/recipes" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text hover:bg-brand/10 hover:text-brand transition-colors">
            <FileText className="w-5 h-5" />
            Resep
          </Link>
          {isAdminMain && (
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text hover:bg-brand/10 hover:text-brand transition-colors">
              <Users className="w-5 h-5" />
              Kelola Admin
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-surface-alt flex flex-col gap-2">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-text-muted hover:bg-surface-alt transition-colors">
            <Store className="w-5 h-5" />
            Ke Toko
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-surface-alt p-4 flex justify-between items-center sticky top-0 z-30">
          <span className="font-display font-bold text-xl text-brand">EB Admin</span>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
            <Link href="/" className="text-text-muted hover:text-brand transition-colors">
              <Store className="w-5 h-5" />
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-10 max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-alt shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 flex justify-around items-center p-2 pb-safe">
        <Link href="/admin" className="flex flex-col items-center gap-1 p-2 text-text-muted hover:text-brand">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold">Dash</span>
        </Link>
        <Link href="/admin/products" className="flex flex-col items-center gap-1 p-2 text-text-muted hover:text-brand">
          <Package className="w-6 h-6" />
          <span className="text-[10px] font-bold">Produk</span>
        </Link>
        <Link href="/admin/recipes" className="flex flex-col items-center gap-1 p-2 text-text-muted hover:text-brand">
          <FileText className="w-6 h-6" />
          <span className="text-[10px] font-bold">Resep</span>
        </Link>
        {isAdminMain && (
          <Link href="/admin/users" className="flex flex-col items-center gap-1 p-2 text-text-muted hover:text-brand">
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-bold">Admin</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
