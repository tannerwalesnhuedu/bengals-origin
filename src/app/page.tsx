'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Bengals Jungle', 'Around the NFL', 'AFC North', 'The Fan Lounge'];

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching articles:', error.message);
        } else if (data) {
          setArticles(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(art => art.category === activeCategory);

  const featuredArticle = articles[0];

  return (
<main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-10 text-slate-900">      
      {/* Hero Section */}
      <section className="space-y-4 pt-4">
        <div className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#FB4F14] bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-md">
          Unfiltered Fan Perspectives & NFL Takes
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Cincinnati Roots. Sunday-Wide NFL Reactions.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Your go-to spot for honest Bengals breakdowns, massive league-wide storylines, game reactions, and real football passion.
          </p>
        </div>

        {/* Featured Hero Card */}
        {activeCategory === 'All' && featuredArticle && (
          <Link 
            href={`/articles/${featuredArticle.slug}`}
            className="block group bg-white border border-slate-200 hover:border-[#FB4F14] transition-all rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#FB4F14] bg-orange-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                {featuredArticle.category || 'Bengals Jungle'}
              </span>
              <span className="text-slate-400">{new Date(featuredArticle.created_at).toLocaleDateString()}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#FB4F14] transition-colors mt-2">
              {featuredArticle.title}
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base line-clamp-2 leading-relaxed mt-2">
              {featuredArticle.excerpt || featuredArticle.content?.substring(0, 140) + '...'}
            </p>

            <div className="pt-4">
              <span className="inline-block font-extrabold text-xs text-white bg-[#FB4F14] hover:bg-orange-600 px-5 py-2.5 rounded-xl transition-all shadow-sm">
                Read Full Take →
              </span>
            </div>
          </Link>
        )}
      </section>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat 
                ? 'bg-[#FB4F14] text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Feed Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">
            {activeCategory === 'All' ? 'Latest Takes Across the League' : `${activeCategory} Posts`}
          </h3>
          <span className="text-xs text-slate-400 font-medium">{filteredArticles.length} Articles</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading posts from database...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-sm">
            <p className="text-slate-600 text-sm font-medium">No posts found in this category yet.</p>
            <p className="text-slate-400 text-xs">Head over to your admin portal to publish your first take!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredArticles.map((article) => (
              <Link 
                key={article.id || article.slug} 
                href={`/articles/${article.slug}`}
                className="block bg-white border border-slate-200 hover:border-[#FB4F14] p-6 rounded-2xl transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#FB4F14] uppercase tracking-wider">{article.category || 'Bengals Jungle'}</span>
                  <span className="text-slate-400">{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#FB4F14] transition-colors mt-2">
                  {article.title}
                </h4>
                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mt-1">
                  {article.excerpt || article.content}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{article.read_time || '4 min read'}</span>
                  <span className="text-xs font-bold text-[#FB4F14] group-hover:translate-x-1 transition-transform">
                    Read Take →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}