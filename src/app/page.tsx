'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Game Reactions', 'Roster & Trades', 'Fan Thoughts'];

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

  const featuredArticle = articles[0]; // Most recent post as hero

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-10">
      
      {/* Editorial Hero Section */}
      <section className="space-y-4 pt-4">
        <div className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#FB4F14] bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-md">
          The Unfiltered Fan Perspective
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Real Talk & Reactions from the Jungle.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            No complex coaching jargon—just honest game reactions, big-picture thoughts, and passion for the Cincinnati Bengals.
          </p>
        </div>

        {/* Featured Hero Card (Shows only on 'All') */}
        {activeCategory === 'All' && featuredArticle && (
          <div className="bg-slate-900/80 border border-slate-800 hover:border-[#FB4F14]/50 transition-all rounded-3xl p-6 sm:p-8 space-y-4 mt-6 shadow-xl">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#FB4F14] bg-orange-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
                {featuredArticle.category || 'Game Reactions'}
              </span>
              <span className="text-slate-500">{new Date(featuredArticle.created_at).toLocaleDateString()}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white hover:text-[#FB4F14] transition-colors">
              <Link href={`/articles/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base line-clamp-2 leading-relaxed">
              {featuredArticle.excerpt || featuredArticle.content?.substring(0, 140) + '...'}
            </p>
            <div>
              <Link 
                href={`/articles/${featuredArticle.slug}`} 
                className="inline-block font-extrabold text-xs text-white bg-[#FB4F14] hover:bg-orange-600 px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Read Full Breakdown →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat 
                ? 'bg-[#FB4F14] text-white shadow-md' 
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">
            {activeCategory === 'All' ? 'Recent Posts' : `${activeCategory} Posts`}
          </h3>
          <span className="text-xs text-slate-500 font-medium">{filteredArticles.length} Articles</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-sm">Loading articles from database...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <p className="text-slate-400 text-sm font-medium">No articles found in this category yet.</p>
            <p className="text-slate-600 text-xs">Head over to your admin portal to publish your first piece!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredArticles.map((article) => (
              <article 
                key={article.id || article.slug} 
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#FB4F14] uppercase tracking-wider">{article.category || 'General'}</span>
                  <span className="text-slate-500">{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FB4F14] transition-colors">
                  <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                </h4>
                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                  {article.excerpt || article.content}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{article.read_time || '4 min read'}</span>
                  <Link href={`/articles/${article.slug}`} className="text-xs font-bold text-[#FB4F14] group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}