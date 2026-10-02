import { prisma } from '../../lib/prisma';
import { notFound } from 'next/navigation';
import RecipeDetailClient from './RecipeDetailClient';

// Using fallback posts to simulate DB if it's down
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
        { item: "Pineapple Jam", amount: 400, unit: "g" }
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
      description: 'Elevate your chocolate cookies by using brown butter and dark chocolate chunks instead of chips. The brown butter adds a deep nutty flavor.',
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
        { item: "Dark Chocolate Chunks", amount: 200, unit: "g" }
      ],
      steps: [
        "Brown the butter in a saucepan over medium heat until it smells nutty and golden brown bits form at the bottom. Let it cool.",
        "Whisk the cooled brown butter with both sugars until smooth.",
        "Whisk in the eggs one at a time.",
        "Fold in the flour and cocoa powder.",
        "Stir in the chocolate chunks.",
        "Chill the dough in the fridge for at least 2 hours (preferably overnight).",
        "Scoop onto a baking tray and bake at 175°C for 10-12 minutes."
      ]
    }),
    createdAt: new Date(Date.now() - 172800000), 
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f414e21fb5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  }
];

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  let post = null;
  try {
    post = await prisma.post.findUnique({ where: { id } });
  } catch (error) {
    post = fallbackPosts.find(p => p.id === id) || null;
  }

  if (!post) {
    notFound();
  }

  return <RecipeDetailClient post={post} />;
}
