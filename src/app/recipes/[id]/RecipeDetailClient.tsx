'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Clock, Users, ChefHat, CheckCircle2 } from 'lucide-react';

type Ingredient = {
  item: string;
  amount: number;
  unit: string;
};

type RecipeData = {
  description?: string;
  prepTime?: string;
  bakeTime?: string;
  servings?: number;
  ingredients?: Ingredient[];
  steps?: string[];
};

export default function RecipeDetailClient({ post }: { post: { title: string, category: string | null, author: string, createdAt: Date, imageUrl: string | null, content: string } }) {
  const [multiplier, setMultiplier] = useState<number>(1);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  // Parse structured data if possible
  let recipeData: RecipeData = {};
  let isStructured = false;

  try {
    const parsed = JSON.parse(post.content);
    if (parsed.ingredients || parsed.steps) {
      recipeData = parsed;
      isStructured = true;
    }
  } catch (e) {
    // Not a JSON string, fallback to standard text
    isStructured = false;
  }

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleMultiplierChange = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setMultiplier(num);
    } else if (val === '') {
      // allow empty temporarily
      setMultiplier(0);
    }
  };

  const formatDate = (dateInput: Date | string) => {
    const d = new Date(dateInput);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d);
  };

  return (
    <div className="w-full bg-surface min-h-screen pb-24">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-4">
        <Link href="/recipes" className="inline-flex items-center gap-2 text-text-muted hover:text-brand font-bold transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Recipes
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
            <span className="px-4 py-1.5 bg-brand/10 text-brand font-bold text-xs uppercase tracking-wider rounded-full">
              {post.category || 'Recipe'}
            </span>
            <span className="text-text-muted text-sm font-semibold">
              {formatDate(post.createdAt)}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-text mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-alt flex items-center justify-center text-brand">
              <ChefHat className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold text-text">{post.author}</p>
              <p className="text-sm text-text-muted">Master Baker</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full aspect-video rounded-[2rem] sm:rounded-[3rem] overflow-hidden mb-12 shadow-sm border border-surface-alt relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={post.imageUrl || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {!isStructured ? (
          // Unstructured Fallback
          <div className="prose prose-lg max-w-none text-text-muted">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        ) : (
          // Structured Recipe View
          <div className="flex flex-col gap-12">
            
            {/* Description & Meta Info */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-surface-alt">
              <p className="text-lg text-text-muted leading-relaxed mb-8 italic">
                &quot;{recipeData.description}&quot;
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-surface-alt">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Clock className="w-5 h-5 text-brand" />
                    <span className="font-bold text-sm uppercase tracking-wider">Prep Time</span>
                  </div>
                  <span className="text-xl font-display font-bold text-text">{recipeData.prepTime || '-'}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Clock className="w-5 h-5 text-brand" />
                    <span className="font-bold text-sm uppercase tracking-wider">Bake Time</span>
                  </div>
                  <span className="text-xl font-display font-bold text-text">{recipeData.bakeTime || '-'}</span>
                </div>
                
                <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-text-muted mb-1">
                    <Users className="w-5 h-5 text-brand" />
                    <span className="font-bold text-sm uppercase tracking-wider">Servings</span>
                  </div>
                  <span className="text-xl font-display font-bold text-text">
                    {recipeData.servings ? Math.round(recipeData.servings * (multiplier || 1)) : '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Ingredients Sidebar */}
              <div className="lg:col-span-4 bg-surface-alt p-6 sm:p-8 rounded-[2rem] lg:sticky lg:top-32">
                <h3 className="text-2xl font-display font-bold text-text mb-6">Ingredients</h3>
                
                <div className="bg-white p-4 rounded-2xl mb-6 shadow-sm flex items-center justify-between">
                  <label className="text-sm font-bold text-text-muted">Scale Recipe:</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      step="0.5"
                      min="0.5"
                      value={multiplier || ''}
                      onChange={(e) => handleMultiplierChange(e.target.value)}
                      className="w-16 bg-surface border border-surface-alt rounded-lg px-2 py-1 text-center font-bold text-brand focus:outline-none focus:border-brand"
                    />
                    <span className="text-sm font-bold text-text-muted">x</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-4">
                  {recipeData.ingredients?.map((ing, idx) => {
                    const scaledAmount = ing.amount * (multiplier || 1);
                    // format to 1 decimal if needed
                    const displayAmount = scaledAmount % 1 === 0 ? scaledAmount : scaledAmount.toFixed(1);
                    return (
                      <li key={idx} className="flex justify-between items-start gap-4 border-b border-surface pb-4 last:border-0 last:pb-0">
                        <span className="font-medium text-text-muted">{ing.item}</span>
                        <span className="font-bold text-text text-right whitespace-nowrap">
                          {displayAmount} {ing.unit}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Instructions */}
              <div className="lg:col-span-8">
                <h3 className="text-3xl font-display font-bold text-text mb-8">Instructions</h3>
                <div className="flex flex-col gap-6">
                  {recipeData.steps?.map((step, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => toggleStep(idx)}
                      className={`flex gap-4 sm:gap-6 p-6 rounded-[2rem] cursor-pointer transition-all duration-300 border-2 ${
                        checkedSteps[idx] 
                          ? 'bg-brand/5 border-brand/20 opacity-60' 
                          : 'bg-white border-transparent hover:border-surface-alt hover:shadow-sm'
                      }`}
                    >
                      <div className="shrink-0 mt-1">
                        {checkedSteps[idx] ? (
                          <CheckCircle2 className="w-8 h-8 text-brand" />
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-surface-alt flex items-center justify-center font-bold text-text-muted font-display">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <p className={`text-lg leading-relaxed ${checkedSteps[idx] ? 'text-text-muted line-through' : 'text-text'}`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
