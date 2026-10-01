import { getProduct, updateProduct } from '../../actions';
import ProductForm from '../form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, params.id);

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-text-muted hover:text-brand font-bold mb-4 transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </Link>
        <h1 className="text-3xl font-display font-bold">Edit Produk</h1>
      </div>
      
      <ProductForm product={product} action={updateProductWithId} />
    </div>
  );
}
