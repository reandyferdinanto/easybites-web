const fs = require('fs');

const file = 'src/app/admin/recipes/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `<div className="bg-white rounded-[2rem] border border-surface-alt overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-alt text-text-muted text-sm uppercase tracking-wider">
                <th className="p-4 font-bold">Gambar</th>
                <th className="p-4 font-bold">Judul Resep</th>
                <th className="p-4 font-bold">Kategori</th>
                <th className="p-4 font-bold">Tanggal</th>
                <th className="p-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-text-muted">
                    Belum ada resep. Silakan buat resep baru.
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
                        <Link href={\`/admin/recipes/\${post.id}\`} className="p-2 text-text-muted hover:text-brand hover:bg-brand/10 rounded-lg transition-colors">
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

        {/* Mobile Cards */}
        <div className="block md:hidden">
          {posts.length === 0 ? (
            <div className="p-8 text-center text-text-muted">
              Belum ada resep. Silakan buat resep baru.
            </div>
          ) : (
            <div className="flex flex-col">
              {posts.map((post: any) => (
                <div key={post.id} className="border-b border-surface-alt last:border-0 p-4 flex gap-4 hover:bg-surface/50 transition-colors">
                  <div className="shrink-0">
                    {post.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.imageUrl} alt={post.title} className="w-20 h-20 rounded-xl object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-surface-alt flex items-center justify-center text-text-muted">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div>
                      <h3 className="font-bold text-text text-lg line-clamp-1" title={post.title}>{post.title}</h3>
                      <p className="text-sm text-text-muted mb-1">{post.category || '-'}</p>
                      <p className="text-xs text-text-muted">
                        {new Date(post.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Link href={\`/admin/recipes/\${post.id}\`} className="flex-1 py-2 bg-brand/10 text-brand font-bold text-sm text-center rounded-lg hover:bg-brand hover:text-white transition-colors">
                        Edit
                      </Link>
                      <form action={async () => {
                          'use server';
                          await deletePost(post.id);
                        }} className="flex-1">
                        <button type="submit" className="w-full py-2 bg-red-50 text-red-500 font-bold text-sm text-center rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                          Hapus
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>`;

content = content.replace(/<div className="bg-white rounded-\[2rem\] border border-surface-alt overflow-hidden">[\s\S]*?<\/table>\s*<\/div>\s*<\/div>/, replacement);
fs.writeFileSync(file, content, 'utf8');
