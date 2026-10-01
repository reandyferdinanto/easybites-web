import { createPost } from '../../actions';
import BlogForm from '../form';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-brand font-bold mb-4 transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </Link>
        <h1 className="text-3xl font-display font-bold">Tulis Artikel Baru</h1>
      </div>
      
      <BlogForm action={createPost} />
    </div>
  );
}
