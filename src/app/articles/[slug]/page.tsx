'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [trendingArticles, setTrendingArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

useEffect(() => {
  async function loadContent() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('articles')
        .select('*');

      if (error) {
        console.error('Supabase error:', error.message);
      } else if (data) {
        setArticle(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      // THIS GUARANTEES LOADING STOPS EVEN IF IT FAILS
      setLoading(false);
    }
  }

  loadContent();
}, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || 'Check out this Bengals breakdown!',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm font-medium">
        Loading breakdown...
      </div>
    );
  }

  if (!article) {
    return (
      <main className="max-w-xl mx-auto py-24 text-center space-y-4 px-4">
        <h1 className="text-3xl font-black text-slate-900">Breakdown Not Found</h1>
        <Link href="/" className="inline-block px-6 py-3 bg-[#FB4F14] text-white font-bold text-sm rounded-xl">
          Back to Home
        </Link>
      </main>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      {/* Balanced Grid: Main article gets more breathing room (7 cols), sidebar gets 4 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 items-start">
        
        {/* Main Article Content */}
        <div className="lg:col-span-7 space-y-8">
          <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
            ← Back to All Breakdowns
          </Link>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="bg-orange-50 text-[#FB4F14] border border-orange-100 px-3.5 py-1 rounded-full uppercase tracking-wider text-[10px] font-extrabold shadow-sm">
                {article.category || 'Game Analysis'}
              </span>
              <span>•</span>
              <span>{article.read_time || '5 min read'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Clean Share Bar (No WhatsApp, optimized for Android & Laptop) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 py-3.5 px-2 bg-slate-50/50 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Share Breakdown</span>
            
            <div className="flex items-center flex-wrap gap-2">
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button 
                  onClick={handleNativeShare} 
                  className="px-4 py-2 text-xs font-extrabold bg-[#FB4F14] hover:bg-orange-600 text-white rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <span>📲 Share</span>
                </button>
              )}

              <button 
                onClick={handleCopyLink} 
                className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                {copied ? '✓ Copied!' : '📋 Copy Link'}
              </button>

              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 rounded-xl transition-colors shadow-sm"
              >
                𝕏 Share
              </a>

              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-blue-600 rounded-xl transition-colors shadow-sm"
              >
                f Share
              </a>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-5 text-base sm:text-lg pt-2">
            {article.content}
          </div>
        </div>

        {/* Fixed Right Sidebar for Top Read Breakdowns */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/80 p-6 sm:p-7 rounded-3xl shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#FB4F14] animate-pulse"></span>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Top Read Breakdowns</h3>
            </div>

            <div className="space-y-3">
              {trendingArticles.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No trending articles yet.</p>
              ) : (
                trendingArticles.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/articles/${item.slug}`}
                    className="block p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-100 hover:border-orange-200 transition-all group"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="text-xs font-black text-slate-300 group-hover:text-[#FB4F14]">0{index + 1}</span>
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-[#FB4F14] uppercase tracking-wider">{item.category || 'Analysis'}</span>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FB4F14] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}