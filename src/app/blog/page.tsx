import { prisma } from '../lib/prisma';
import Link from 'next/link';

const fallbackPosts = [
  { id: '1', title: 'How to Make the Perfect Neumorphic Croissant', author: 'Chef Reandy', category: 'Baking Tips', content: 'The secret to a perfect croissant is in the butter and the folds. Make sure everything is kept cold. Start with a good quality European butter and let the dough rest between each fold for at least 30 minutes to achieve that perfectly flaky, soft extrusion.', createdAt: new Date(), imageUrl: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: '2', title: '5 Mistakes to Avoid When Baking Bread', author: 'Chef Reandy', category: 'Tutorials', content: '1. Not letting the dough rise enough. 2. Killing the yeast with water that is too hot. 3. Over-kneading the dough. 4. Not preheating the oven properly. 5. Opening the oven too early during baking.', createdAt: new Date(Date.now() - 86400000), imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: '3', title: 'The Ultimate Chocolate Cookie Recipe', author: 'Chef Maria', category: 'Recipes', content: 'This rich chocolate cookie uses Dutch-process cocoa, espresso powder for depth, and a generous amount of dark chocolate chunks. Bake at 350°F for 12 minutes and let it cool completely before enjoying.', createdAt: new Date(Date.now() - 172800000), imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: '4', title: 'Why Resting Your Dough Matters', author: 'Chef Reandy', category: 'Science', content: 'Learn why resting your dough overnight completely transforms the flavor profile of your cookies, allowing the flour to fully hydrate and the complex flavors to develop naturally.', createdAt: new Date(Date.now() - 259200000), imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
];

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  let posts: { id: string, title: string, author: string, category?: string | null, content: string, createdAt: Date, imageUrl?: string | null }[] = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Database connection failed. Using fallback posts.");
    posts = fallbackPosts;
  }

  if (posts.length === 0) {
    posts = fallbackPosts;
  }

  // Pick the first post as featured
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  // Using a properly formatted date explicitly to avoid hydration mismatch
  const formatDate = (dateInput: Date | string) => {
    const d = new Date(dateInput);
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d);
  };

  const categories = ['Semua Artikel', 'Recipes', 'Baking Tips', 'Tutorials', 'News & Events'];

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Blog Hero & Featured Post */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="relative z-10">
            <span className="inline-block py-1 px-4 rounded-full bg-brand/10 text-brand font-bold text-sm mb-4 border border-brand/20">Jurnal EasyBites</span>
            <h1 className="text-5xl md:text-7xl font-display text-text">
              Cerita & <span className="text-accent">Resep</span>
            </h1>
          </div>
          <Link href="/admin/blog/new" className="px-6 py-3 bg-brand text-white font-bold rounded-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            Tulis Artikel
          </Link>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.id}`} className="block group">
            <div className="relative w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-surface-alt flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-shadow duration-500 border border-surface-alt">
              {/* Image side */}
              <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto">
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-500 z-10"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={featuredPost.imageUrl || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo" 
                />
              </div>
              
              {/* Content side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider rounded-full">
                    {featuredPost.category || 'Featured'}
                  </span>
                  <span className="text-text-muted text-sm font-semibold">
                    {formatDate(featuredPost.createdAt)}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display text-text mb-4 group-hover:text-brand transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                
                <p className="text-text-muted text-lg leading-relaxed mb-8 line-clamp-3">
                  {featuredPost.content}
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-brand/20 overflow-hidden flex items-center justify-center text-brand font-bold">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <span className="font-bold text-text">{featuredPost.author}</span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* Category Pills & Grid */}
      <section className="w-full bg-surface-alt py-20 px-6 md:px-12 relative overflow-hidden flex-1">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-8 mb-4 border-b border-brand/10">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  i === 0 
                    ? 'bg-text text-white shadow-md' 
                    : 'bg-white text-text-muted hover:bg-surface hover:text-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {regularPosts.map((post, idx) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full">
                <div className={`relative w-full aspect-[4/3] mb-6 overflow-hidden bg-white shadow-sm ${idx % 2 === 0 ? 'rounded-blob' : 'rounded-blob-alt'}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo" 
                  />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur text-text text-xs font-bold uppercase rounded-full shadow-sm">
                    {post.category || 'Article'}
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 px-2">
                  <div className="text-sm font-semibold text-text-muted mb-2">
                    {formatDate(post.createdAt)}
                  </div>
                  <h3 className="text-2xl font-display text-text mb-3 group-hover:text-brand transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed mb-6 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-brand/10 pt-4">
                    <span className="font-bold text-sm text-text">{post.author}</span>
                    <span className="text-brand group-hover:translate-x-1 transition-transform">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter inside Blog */}
          <div className="mt-24 bg-brand text-white rounded-[3rem] p-12 text-center relative overflow-hidden">
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-blob -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-blob-alt -z-0"></div>
            
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-4xl font-display mb-4">Never miss a recipe.</h2>
              <p className="text-white/80 text-lg mb-8">
                Join our newsletter to get baking tips, new recipes, and exclusive sweet deals delivered directly to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-full outline-none focus:bg-white/20 transition-colors"
                />
                <button type="button" className="bg-white text-brand px-8 py-4 rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}