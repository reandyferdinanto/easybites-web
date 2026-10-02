import { getPosts, deletePost } from '../actions';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Resep & Artikel</h1>
          <p className="text-text-muted">Kelola resep, tips, dan cerita EasyBites.</p>
        </div>
        <Link href="/admin/blog/new" className="bg-brand text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" /> Tulis Resep
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-surface-alt overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-alt text-text-muted text-sm uppercase tracking-wider">
                <th className="p-4 font-bold">Gambar</th>
                <th className="p-4 font-bold">Judul Resep / Artikel</th>
                <th className="p-4 font-bold">Kategori</th>
                <th className="p-4 font-bold">Tanggal</th>
                <th className="p-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-muted">
                    Belum ada artikel. Silakan buat artikel baru.
                  </td>
                </tr>
              ) : (
                posts.map((post: any) => (
                  <tr key={post.id} className="border-b border-surface-alt last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      {post.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.imageUrl} alt={post.title} className="w-16 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-surface-alt flex items-center justify-center text-text-muted">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-text max-w-[200px] truncate" title={post.title}>{post.title}</td>
                    <td className="p-4 text-text-muted">
                      {post.category || '-'}
                    </td>
                    <td className="p-4 text-text-muted text-sm">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/blog/${post.id}`} className="p-2 text-text-muted hover:text-brand hover:bg-brand/10 rounded-lg transition-colors">
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deletePost(post.id);
                        }}>
                          <button type="submit" className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
