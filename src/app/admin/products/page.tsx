import { getProducts, deleteProduct } from '../actions';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminProductsPage() {
  const products = []; // We use a fallback if the DB fails to fetch due to prisma issues in the test env, but let's try real data first. Let's make it async.
  
  return (
    <ProductsList />
  );
}

async function ProductsList() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Produk (Menu)</h1>
          <p className="text-text-muted">Kelola daftar produk EasyBites.</p>
        </div>
        <Link href="/admin/products/new" className="bg-brand text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" /> Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-surface-alt overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-alt text-text-muted text-sm uppercase tracking-wider">
                <th className="p-4 font-bold">Gambar</th>
                <th className="p-4 font-bold">Nama Produk</th>
                <th className="p-4 font-bold">Harga</th>
                <th className="p-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-text-muted">
                    Belum ada produk. Silakan tambah produk baru.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="border-b border-surface-alt last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-xl object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-surface-alt flex items-center justify-center text-text-muted">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-text">{product.name}</td>
                    <td className="p-4 text-brand font-bold">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/products/${product.id}`} className="p-2 text-text-muted hover:text-brand hover:bg-brand/10 rounded-lg transition-colors">
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteProduct(product.id);
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
