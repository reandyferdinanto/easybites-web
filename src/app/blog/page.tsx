import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChefHat, Clock, Utensils } from 'lucide-react';

const fallbackPosts = [
  { 
    id: '1', 
    title: 'The Perfect Melt-in-Mouth Nastar', 
    author: 'Chef Reandy', 
    category: 'Cookies', 
    content: JSON.stringify({
      description: "The secret to a perfect Nastar lies in the butter ratio and pineapple jam consistency. Start with a premium European butter and make sure your jam is dry enough so the dough won't crack during baking.",
      prepTime: "45 mins",
      bakeTime: "30 mins",
      servings: 40,
      ingredients: [
        { item: "Premium Butter (Cold)", amount: 250, unit: "g" },
        { item: "Margarine", amount: 50, unit: "g" },
        { item: "Icing Sugar", amount: 60, unit: "g" },
        { item: "Egg Yolks", amount: 3, unit: "pcs" },
        { item: "Milk Powder", amount: 20, unit: "g" },
        { item: "Cake Flour (Low Protein)", amount: 350, unit: "g" },
        { item: "Pineapple Jam (Rolled into small balls)", amount: 400, unit: "g" }
      ],
      steps: [
        "Whip butter, margarine, and icing sugar on low speed just until combined (about 1 minute). Do not overmix or the cookies will spread.",
        "Add egg yolks one at a time, mixing briefly after each addition.",
        "Fold in the sifted cake flour and milk powder using a spatula until a soft dough forms.",
        "Take a small portion of dough (about 8g), flatten it, and wrap it around a pineapple jam ball. Roll it into a smooth sphere.",
        "Place on a baking tray lined with parchment paper. Bake at 140°C for 20 minutes.",
        "Remove from oven, let cool slightly, then brush with egg wash (egg yolk mixed with a little milk and oil).",
        "Bake again for another 10-15 minutes until golden brown."
      ]
    }), 
    createdAt: new Date(), 
    imageUrl: 'https://images.unsplash.com/photo-1590080874088-eec64895e423?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '2', 
    title: 'Flaky & Savory Kaastengel Secret', 
    author: 'Chef Reandy', 
    category: 'Cheese', 
    content: JSON.stringify({
      description: 'For that irresistible savory kick, mix Edam and aged Parmesan. Do not over-knead the dough! Just bring it together gently.',
      prepTime: "20 mins",
      bakeTime: "25 mins",
      servings: 30,
      ingredients: [
        { item: "Butter", amount: 200, unit: "g" },
        { item: "Egg Yolk", amount: 2, unit: "pcs" },
        { item: "Grated Edam Cheese", amount: 150, unit: "g" },
        { item: "Grated Parmesan", amount: 50, unit: "g" },
        { item: "All Purpose Flour", amount: 300, unit: "g" }
      ],
      steps: [
        "Mix butter and egg yolks until just combined.",
        "Fold in the grated cheeses.",
        "Add flour gradually and mix gently with a spatula until a dough forms.",
        "Roll out the dough to 1cm thickness and cut into 1x4cm sticks.",
        "Brush with egg wash and sprinkle with extra cheddar cheese.",
        "Bake at 150°C for 25 minutes until crispy and golden."
      ]
    }),
    createdAt: new Date(Date.now() - 86400000), 
    imageUrl: 'https://images.unsplash.com/photo-1605807646983-377bc5a7644e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '3', 
    title: 'Ultimate Chocolate Chunk Cookies', 
    author: 'Chef Maria', 
    category: 'Chocolate', 
    content: JSON.stringify({
      description: 'Elevate your chocolate cookies by using brown butter and dark chocolate chunks instead of chips. The brown butter adds a deep nutty flavor, while resting the dough overnight hydrates the flour and intensifies the cocoa notes.',
      prepTime: "15 mins",
      bakeTime: "12 mins",
      servings: 12,
      ingredients: [
        { item: "Unsalted Butter", amount: 170, unit: "g" },
        { item: "Dark Brown Sugar", amount: 150, unit: "g" },
        { item: "Granulated Sugar", amount: 100, unit: "g" },
        { item: "Large Eggs", amount: 2, unit: "pcs" },
        { item: "All Purpose Flour", amount: 220, unit: "g" },
        { item: "Dutch Cocoa Powder", amount: 30, unit: "g" },
        { item: "Dark Chocolate Chunks (70%)", amount: 200, unit: "g" }
      ],
      steps: [
        "Brown the butter in a saucepan over medium heat until it smells nutty and golden brown bits form at the bottom. Let it cool.",
        "Whisk the cooled brown butter with both sugars until smooth.",
        "Whisk in the eggs one at a time.",
        "Fold in the flour and cocoa powder.",
        "Stir in the chocolate chunks.",
        "Chill the dough in the fridge for at least 2 hours (preferably overnight).",
        "Scoop onto a baking tray and bake at 175°C for 10-12 minutes. The centers should still look slightly underbaked when you pull them out."
      ]
    }),
    createdAt: new Date(Date.now() - 172800000), 
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  }
];

export const revalidate = 60; // Revalidate every 60 seconds

export default async function RecipesPage() {
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

  const categories = ['All Recipes', 'Cookies', 'Cakes', 'Chocolate', 'Baking Tips'];

  const getPreviewText = (content: string) => {
    try {
      const parsed = JSON.parse(content);
      return parsed.description || content;
    } catch {
      return content;
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-brand/5 pt-12 md:pt-20 pb-16 md:pb-24 rounded-b-[3rem] md:rounded-b-[4rem]">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 text-6xl animate-[float_6s_ease-in-out_infinite_reverse] opacity-50">👩‍🍳</div>
        <div className="absolute bottom-10 left-10 text-5xl animate-[float_5s_ease-in-out_infinite] opacity-50">📖</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-brand/10 text-brand font-bold text-sm mb-6 border border-brand/20">
            <ChefHat className="w-4 h-4" /> From Our Kitchen to Yours
          </span>
          <h1 className="text-5xl md:text-7xl font-display text-text mb-6">
            Baking <span className="text-brand">Secrets.</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Discover our favorite recipes, professional baking tips, and sweet inspiration to bring the EasyBites magic into your own home.
          </p>
        </div>
      </section>

      {/* Featured Recipe */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 -mt-12 relative z-20">
        {featuredPost && (
          <Link href={`/blog/${featuredPost.id}`} className="block group">
            <div className="w-full bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-brand/5 overflow-hidden flex flex-col lg:flex-row border border-surface-alt hover:shadow-2xl transition-all duration-500">
              {/* Image side */}
              <div className="w-full lg:w-3/5 relative aspect-square sm:aspect-video lg:aspect-auto h-[300px] sm:h-[400px] lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-500 z-10 pointer-events-none"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={featuredPost.imageUrl || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo" 
                />
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-2 bg-white text-text font-bold text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2">
                    ⭐ Featured Recipe
                  </span>
                </div>
              </div>
              
              {/* Content side */}
              <div className="w-full lg:w-2/5 p-8 sm:p-10 lg:p-16 flex flex-col justify-center bg-white relative">
                {/* Recipe Badge */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-[4rem] -z-0"></div>
                
                <span className="text-brand font-bold uppercase tracking-wider text-sm mb-4 relative z-10">
                  {featuredPost.category || 'Baking Recipe'}
                </span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-text mb-6 group-hover:text-brand transition-colors duration-300 relative z-10 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8 line-clamp-4 relative z-10">
                  {getPreviewText(featuredPost.content)}
                </p>
                
                <div className="flex items-center gap-4 mt-auto relative z-10 pt-6 border-t border-surface-alt">
                  <div className="w-12 h-12 rounded-full bg-surface-alt flex items-center justify-center text-text-muted">
                    <ChefHat className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="block font-bold text-text">{featuredPost.author}</span>
                    <span className="text-sm text-text-muted">EasyBites Baker</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* Category Pills & Grid */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-8 mb-4 border-b border-surface-alt">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  i === 0 
                    ? 'bg-brand text-white shadow-md' 
                    : 'bg-white border border-surface-alt text-text-muted hover:border-brand hover:text-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {regularPosts.map((post, idx) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full bg-white rounded-[2rem] shadow-sm border border-surface-alt hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-500 z-10 pointer-events-none"></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.imageUrl || 'https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out-expo" 
                  />
                  
                  {/* Category Tag overlay */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-white text-text text-xs font-bold uppercase rounded-full shadow-md">
                    {post.category || 'Recipe'}
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 p-6 sm:p-8">
                  <h3 className="text-2xl font-display text-text mb-3 group-hover:text-brand transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed mb-6 line-clamp-3 text-sm sm:text-base flex-grow">
                    {getPreviewText(post.content)}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-surface-alt">
                    <div className="flex items-center gap-2 text-text-muted text-sm font-semibold">
                      <ChefHat className="w-4 h-4 text-brand" />
                      {post.author}
                    </div>
                    <span className="text-brand font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <Utensils className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter inside Blog */}
          <div className="mt-24 bg-brand rounded-[3rem] p-8 sm:p-12 text-center relative overflow-hidden text-white shadow-xl">
             {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-blob -z-0"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-blob-alt -z-0 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block p-4 bg-white/10 rounded-full mb-6">
                <ChefHat className="w-10 h-10" />
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-4">Master Your Baking Skills.</h2>
              <p className="text-white/90 text-lg mb-8 font-medium">
                Subscribe to our newsletter and get new secret recipes, expert tips, and sweet inspiration delivered fresh to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/70 px-6 py-4 rounded-full outline-none focus:bg-white/20 transition-colors font-medium"
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