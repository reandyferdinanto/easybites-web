'use client';
import { useState, useEffect } from 'react';
import { Upload, X, Loader2, Plus, Trash2 } from 'lucide-react';

export default function RecipeForm({ 
  post, 
  action 
}: { 
  post?: { title?: string, content?: string, author?: string, category?: string | null, imageUrl?: string | null }, 
  action: (formData: FormData) => Promise<void> 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Recipe structured data states
  const [recipeDesc, setRecipeDesc] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [bakeTime, setBakeTime] = useState('');
  const [servings, setServings] = useState<number | ''>('');
  
  const [ingredients, setIngredients] = useState<{item: string, amount: string, unit: string}[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  // Parse existing content on load
  useEffect(() => {
    if (post?.content) {
      try {
        const parsed = JSON.parse(post.content);
        if (parsed.ingredients || parsed.steps) {
          setRecipeDesc(parsed.description || '');
          setPrepTime(parsed.prepTime || '');
          setBakeTime(parsed.bakeTime || '');
          setServings(parsed.servings || '');
          setIngredients(parsed.ingredients || []);
          setSteps(parsed.steps || []);
        }
      } catch {
        // If it was raw content, we just ignore since we only support recipes now
      }
    }
  }, [post]);

  const addIngredient = () => {
    setIngredients([...ingredients, { item: '', amount: '', unit: '' }]);
  };
  const updateIngredient = (index: number, field: string, value: string) => {
    const newIngs = [...ingredients];
    newIngs[index] = { ...newIngs[index], [field]: value };
    setIngredients(newIngs);
  };
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addStep = () => setSteps([...steps, '']);
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Gagal mengunggah gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.set('imageUrl', imageUrl);
    
    // Compile content based on recipe type
    const structuredContent = {
      description: recipeDesc,
      prepTime,
      bakeTime,
      servings: Number(servings) || null,
      ingredients: ingredients.map(ing => ({
        item: ing.item,
        amount: Number(ing.amount) || 0,
        unit: ing.unit
      })),
      steps: steps.filter(s => s.trim() !== '')
    };
    formData.set('content', JSON.stringify(structuredContent));
    
    try {
      await action(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2rem] border border-surface-alt max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-bold text-text-muted mb-2">Judul Resep</label>
            <input 
              type="text" 
              name="title"
              defaultValue={post?.title || ''}
              className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
              required
            />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-muted mb-2">Deskripsi Singkat</label>
              <textarea 
                value={recipeDesc}
                onChange={e => setRecipeDesc(e.target.value)}
                rows={3}
                className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none text-sm"
                placeholder="Ceritakan sedikit tentang resep ini..."
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1">Prep Time</label>
                <input type="text" value={prepTime} onChange={e => setPrepTime(e.target.value)} placeholder="Misal: 15 mins" className="w-full bg-surface border border-surface-alt px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1">Bake Time</label>
                <input type="text" value={bakeTime} onChange={e => setBakeTime(e.target.value)} placeholder="Misal: 30 mins" className="w-full bg-surface border border-surface-alt px-3 py-2 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-1">Hasil (Porsi)</label>
                <input type="number" value={servings} onChange={e => setServings(Number(e.target.value))} placeholder="Misal: 12" className="w-full bg-surface border border-surface-alt px-3 py-2 rounded-lg text-sm" />
              </div>
            </div>

            {/* Ingredients Builder */}
            <div className="bg-surface-alt p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-text">Bahan-Bahan</label>
                <button type="button" onClick={addIngredient} className="text-xs bg-white px-3 py-1.5 rounded-lg font-bold text-brand flex items-center gap-1 shadow-sm hover:scale-105 transition-transform"><Plus className="w-3 h-3"/> Tambah</button>
              </div>
              <div className="space-y-3">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2">
                    <input type="text" placeholder="Nama Bahan" value={ing.item} onChange={e => updateIngredient(idx, "item", e.target.value)} className="w-full sm:flex-1 bg-white border border-surface-alt px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-brand" />
                    <div className="flex flex-row gap-2 w-full sm:w-auto items-center">
                      <input type="number" step="any" placeholder="Jumlah" value={ing.amount} onChange={e => updateIngredient(idx, "amount", e.target.value)} className="flex-1 sm:w-20 bg-white border border-surface-alt px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-brand" />
                      <input type="text" placeholder="Satuan (g, ml)" value={ing.unit} onChange={e => updateIngredient(idx, "unit", e.target.value)} className="flex-1 sm:w-24 bg-white border border-surface-alt px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-brand" />
                      <button type="button" onClick={() => removeIngredient(idx)} className="text-red-400 hover:text-red-600 p-2 sm:p-1.5 flex items-center justify-center bg-white sm:bg-transparent border border-surface-alt sm:border-0 rounded-lg transition-colors hover:bg-red-50 shrink-0"><Trash2 className="w-5 h-5 sm:w-4 sm:h-4"/></button>
                    </div>
                  </div>
                ))}
                {ingredients.length === 0 && <p className="text-xs text-text-muted text-center py-2">Belum ada bahan ditambahkan.</p>}
              </div>
            </div>

            {/* Steps Builder */}
            <div className="bg-surface-alt p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-text">Langkah Pembuatan</label>
                <button type="button" onClick={addStep} className="text-xs bg-white px-3 py-1.5 rounded-lg font-bold text-brand flex items-center gap-1 shadow-sm hover:scale-105 transition-transform"><Plus className="w-3 h-3"/> Tambah</button>
              </div>
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold shrink-0 mt-1">{idx + 1}</div>
                    <textarea value={step} onChange={e => updateStep(idx, e.target.value)} placeholder="Deskripsi langkah..." rows={2} className="flex-1 bg-white border border-surface-alt px-3 py-2 rounded-lg text-sm resize-none focus:outline-none focus:border-brand" />
                    <button type="button" onClick={() => removeStep(idx)} className="text-red-400 hover:text-red-600 p-2.5 sm:p-1.5 mt-0.5 flex items-center justify-center bg-white sm:bg-transparent border border-surface-alt sm:border-0 rounded-lg transition-colors hover:bg-red-50"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))}
                {steps.length === 0 && <p className="text-xs text-text-muted text-center py-2">Belum ada langkah ditambahkan.</p>}
              </div>
            </div>

          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-text-muted mb-2">Penulis</label>
            <input 
              type="text" 
              name="author"
              defaultValue={post?.author || 'Admin EasyBites'}
              className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-muted mb-2">Kategori</label>
            <input 
              type="text" 
              name="category"
              defaultValue={post?.category || ''}
              placeholder="Misal: Cookies, Cakes"
              className="w-full bg-surface border border-surface-alt px-4 py-3 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-text-muted mb-2">Gambar Utama (Cover)</label>
            {imageUrl ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-surface-alt group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative w-full aspect-video border-2 border-dashed border-surface-alt rounded-2xl flex flex-col items-center justify-center text-text-muted hover:border-brand hover:text-brand transition-colors bg-surface/50">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-brand" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm font-bold">Unggah Cover</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-surface-alt flex justify-end">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-brand text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Simpan Resep'}
        </button>
      </div>
    </form>
  );
}