'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createPost } from './actions';

export default function NewBlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="w-full flex flex-col min-h-screen bg-surface">
      <section className="max-w-4xl mx-auto w-full px-6 md:px-12 py-16 md:py-24">
        
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-brand font-bold transition-colors mb-6 group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
            Back to Journal
          </Link>
          <h1 className="text-4xl md:text-5xl font-display text-text">
            Write a <span className="text-accent">New Story</span>
          </h1>
          <p className="text-text-muted mt-4 text-lg">
            Share your latest baking experiments, recipes, or news with the EasyBites community.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-sm border border-brand/5">
          <form 
            action={(formData) => {
              setIsSubmitting(true);
              createPost(formData);
            }} 
            className="flex flex-col gap-8"
          >
            {/* Title */}
            <div className="flex flex-col gap-3">
              <label htmlFor="title" className="text-sm font-bold text-text uppercase tracking-wider">
                Article Title
              </label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                required 
                placeholder="e.g., The Secret to Perfect Nastar" 
                className="w-full bg-surface-alt text-text text-xl md:text-2xl font-display px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all placeholder:text-text-muted/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Author */}
              <div className="flex flex-col gap-3">
                <label htmlFor="author" className="text-sm font-bold text-text uppercase tracking-wider">
                  Author Name
                </label>
                <input 
                  type="text" 
                  id="author" 
                  name="author" 
                  required 
                  defaultValue="Chef Maria"
                  className="w-full bg-surface-alt text-text font-semibold px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-3">
                <label htmlFor="category" className="text-sm font-bold text-text uppercase tracking-wider">
                  Category
                </label>
                <select 
                  id="category" 
                  name="category"
                  className="w-full bg-surface-alt text-text font-semibold px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="Recipes">Recipes</option>
                  <option value="Baking Tips">Baking Tips</option>
                  <option value="Tutorials">Tutorials</option>
                  <option value="Science">Science</option>
                  <option value="News & Events">News & Events</option>
                </select>
              </div>
            </div>

            {/* Cover Image URL */}
            <div className="flex flex-col gap-3">
              <label htmlFor="imageUrl" className="text-sm font-bold text-text uppercase tracking-wider flex items-center justify-between">
                <span>Cover Image URL</span>
                <span className="text-text-muted text-xs normal-case">(Optional)</span>
              </label>
              <input 
                type="url" 
                id="imageUrl" 
                name="imageUrl" 
                placeholder="https://images.unsplash.com/..." 
                className="w-full bg-surface-alt text-text font-medium px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-brand/20 transition-all"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <label htmlFor="content" className="text-sm font-bold text-text uppercase tracking-wider">
                Article Content
              </label>
              <textarea 
                id="content" 
                name="content" 
                required 
                rows={8}
                placeholder="Start writing your amazing story here..." 
                className="w-full bg-surface-alt text-text font-body leading-relaxed px-6 py-6 rounded-3xl outline-none focus:ring-4 focus:ring-brand/20 transition-all resize-none"
              ></textarea>
            </div>

            <hr className="border-brand/10 my-4" />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-brand text-white px-10 py-4 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
                {!isSubmitting && (
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                )}
              </button>
            </div>
          </form>
        </div>

      </section>
    </div>
  );
}