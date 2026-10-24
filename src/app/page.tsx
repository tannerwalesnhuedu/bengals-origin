'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('views', { ascending: false });

        if (!error && data) {
          setArticles(data);
        }
      } catch (err) {
        console.error("Error loading articles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const categories = ['All', ...Array.from(new Set(articles.map((art) => art.category || 'Game Analysis')))];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || (art.category || 'Game Analysis') === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const topArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-24">
      
      {/* Softer Navy Editorial Hero Header */}
      <section className="bg-slate-900 text-white border-b border-slate-800 pt-14 pb-16 px-4 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FB4F14]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-[#FB4F14] text-[11px] font-bold uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB4F14] animate-pulse"></span>
              Bengals Film Room & Analysis
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">The Stripe Breakdown</h1>
            <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
              Professional film studies, scheme breakdowns, and deep dives into the Cincinnati Bengals.
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search breakdowns..."
                className="w-full md:w-72 pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 text-white text-xs rounded-2xl focus:outline-none focus:border-[#FB4F14] transition-all shadow-inner placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        
        {/* Featured Top Read Hero Card */}
        {!searchQuery && topArticle && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FB4F14]"></span>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Featured Breakdown</h2>
              </div>
              <span className="text-[11px] font-extrabold text-[#FB4F14] uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">Editor's Pick</span>
            </div>

            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute -right-2.5 -bottom-5 text-white/2 font-black text-9xl select-none pointer-events-none group-hover:scale-105 transition-transform duration-500">
                BENGALS
              </div>
              
              <div className="space-y-3 max-w-2xl z-10">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
                  <span className="bg-[#FB4F14] text-white px-3.5 py-1 rounded-full uppercase tracking-wider text-[10px] font-bold shadow-sm">
                    {topArticle.category || 'Game Analysis'}
                  </span>
                  <span>•</span>
                  <span className="text-slate-400">{topArticle.read_time || '5 min read'}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-snug group-hover:text-orange-300 transition-colors">
                  {topArticle.title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base line-clamp-2 leading-relaxed font-normal">
                  {topArticle.excerpt}
                </p>
              </div>

              <div className="z-10 pt-2">
                <Link
                  href={`/articles/${topArticle.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FB4F14] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-0.5"
                >
                  Read Full Breakdown →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Content Library Divider */}
        <div className="relative flex py-2 items-center">
          <div className="grow border-t border-slate-200"></div>
          <span className="shrink mx-4 text-slate-500 text-[10px] uppercase tracking-widest font-bold bg-[#F8FAFC] px-3.5 py-1 rounded-full border border-slate-200 shadow-sm">
            All Content Library
          </span>
          <div className="grow border-t border-slate-200"></div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Grid Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
              {searchQuery ? `Search Results (${filteredArticles.length})` : `${selectedCategory} Breakdowns`}
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">{filteredArticles.length} Shown</span>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-400 text-sm font-medium">Loading editorial content...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl text-slate-500 text-sm shadow-sm">
              No breakdowns match your selection.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map((art) => (
                <div 
                  key={art.id} 
                  className="bg-white border border-slate-200/80 p-7 rounded-4xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-orange-50 text-[#FB4F14] border border-orange-100 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                        {art.category || 'Game Analysis'}
                      </span>
                      <span className="text-xs font-medium text-slate-400">{art.read_time || '5 min read'}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-[#FB4F14] transition-colors leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">
                      {art.created_at ? new Date(art.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </span>
                    <Link
                      href={`/articles/${art.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FB4F14] group-hover:translate-x-1 transition-transform"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}