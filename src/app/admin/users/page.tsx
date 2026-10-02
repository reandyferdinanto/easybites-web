'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, UserPlus, Trash2, Key } from 'lucide-react';

interface Admin {
  id: string;
  username: string;
  password?: string;
  isMain: boolean;
}

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Admin Form
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Reveal Passwords Logic
  const [showPasswords, setShowPasswords] = useState(false);
  const [mainPasswordInput, setMainPasswordInput] = useState('');
  const [revealError, setRevealError] = useState('');

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setAdmins(Array.isArray(data) ? data : []);
    } catch {
      console.error("Gagal mengambil data admin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, password: newPassword })
      });
      const data = await res.json();
      
      if (res.ok) {
        setNewUsername('');
        setNewPassword('');
        setIsAdding(false);
        fetchAdmins();
      } else {
        alert(data.error || 'Gagal menambahkan admin');
      }
    } catch {
      alert('Terjadi kesalahan sistem.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus admin ini?')) return;
    
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchAdmins();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus admin');
      }
    } catch {
      alert('Terjadi kesalahan sistem.');
    }
  };

  const handleReveal = async (e: React.FormEvent) => {
    e.preventDefault();
    setRevealError('');
    
    // We check against the main admin credentials
    // Since we know the main admin from the requirements:
    // User: easybites.admin / Pass: elva123456
    // But we should verify via API to be secure. For simplicity and to match the DB fallback:
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'easybites.admin', password: mainPasswordInput })
      });
      
      if (res.ok) {
        setShowPasswords(true);
        setMainPasswordInput('');
      } else {
        setRevealError('Password admin utama salah');
      }
    } catch {
      setRevealError('Terjadi kesalahan.');
    }
  };

  if (isLoading) return <div>Memuat...</div>;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text">Kelola Admin</h1>
          <p className="text-text-muted mt-1">Tambah, hapus, atau lihat daftar admin sistem.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-brand text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <UserPlus className="w-5 h-5" />
          {isAdding ? 'Batal' : 'Tambah Admin'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-alt mb-8">
          <h2 className="text-xl font-bold mb-4">Admin Baru</h2>
          <form onSubmit={handleAddAdmin} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-text-muted mb-2">Username</label>
              <input 
                type="text" 
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                className="w-full bg-surface border border-surface-alt px-4 py-2.5 rounded-xl focus:outline-none focus:border-brand transition-all"
                required
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-bold text-text-muted mb-2">Password</label>
              <input 
                type="text" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full bg-surface border border-surface-alt px-4 py-2.5 rounded-xl focus:outline-none focus:border-brand transition-all"
                required
              />
            </div>
            <button type="submit" className="bg-brand text-white font-bold px-6 py-2.5 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all w-full sm:w-auto">
              Simpan
            </button>
          </form>
        </div>
      )}

      {/* Reveal Password Section */}
      <div className="bg-surface p-6 rounded-2xl border border-surface-alt mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-bold flex items-center gap-2 mb-1"><Key className="w-5 h-5 text-brand" /> Keamanan Sandi</h3>
          <p className="text-sm text-text-muted">Untuk melihat password akun admin lain, masukkan password admin utama.</p>
        </div>
        
        {!showPasswords ? (
          <form onSubmit={handleReveal} className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-col relative w-full sm:w-auto">
              <input 
                type="password" 
                placeholder="Password admin utama"
                value={mainPasswordInput}
                onChange={e => setMainPasswordInput(e.target.value)}
                className="bg-white border border-surface-alt px-4 py-2.5 rounded-xl focus:outline-none focus:border-brand text-sm w-full"
                required
              />
              {revealError && <span className="text-red-500 text-xs absolute -bottom-5 left-1 font-bold">{revealError}</span>}
            </div>
            <button type="submit" className="bg-brand text-white p-2.5 rounded-xl hover:bg-brand-hover transition-colors whitespace-nowrap">
              <Eye className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <button 
            onClick={() => setShowPasswords(false)}
            className="bg-surface-alt text-text font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-surface-alt/80 transition-colors w-full sm:w-auto justify-center"
          >
            <EyeOff className="w-5 h-5" /> Sembunyikan Password
          </button>
        )}
      </div>

      {/* List Admin */}
      <div className="bg-white rounded-[2rem] border border-surface-alt shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-alt text-text-muted text-sm uppercase tracking-wider">
                <th className="p-4 md:p-6 font-bold">Username</th>
                <th className="p-4 md:p-6 font-bold">Password</th>
                <th className="p-4 md:p-6 font-bold">Peran</th>
                <th className="p-4 md:p-6 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-alt">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-surface/50 transition-colors">
                  <td className="p-4 md:p-6 font-bold text-text">
                    {admin.username}
                  </td>
                  <td className="p-4 md:p-6 font-mono text-text-muted">
                    {showPasswords || admin.isMain ? (
                      admin.isMain ? '********' : admin.password
                    ) : (
                      <div className="flex gap-1">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="w-2 h-2 rounded-full bg-surface-alt"></div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-4 md:p-6">
                    {admin.isMain ? (
                      <span className="px-3 py-1 bg-brand/10 text-brand font-bold text-xs rounded-full">Admin Utama</span>
                    ) : (
                      <span className="px-3 py-1 bg-surface-alt text-text-muted font-bold text-xs rounded-full">Admin</span>
                    )}
                  </td>
                  <td className="p-4 md:p-6 text-right">
                    {!admin.isMain && (
                      <button 
                        onClick={() => handleDelete(admin.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors inline-flex"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-text-muted">Belum ada data admin</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
