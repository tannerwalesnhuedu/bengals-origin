'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Supabase error:', error.message);
        } else if (data) {
          setArticle(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm">Loading article...</div>;
  }

  if (!article) {
    return (
      <main className="max-w-xl mx-auto py-24 text-center space-y-4 px-4">
        <h1 className="text-3xl font-black text-white">Article Not Found</h1>
        <p className="text-slate-400 text-sm">This piece might have been removed or the link is incorrect.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-[#FB4F14] text-white font-bold text-sm rounded-xl">
          Back to Home
        </Link>
      </main>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8">
      
      {/* Back Link */}
      <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
        ← Back to All Posts
      </Link>
      
      {/* Article Header info */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="bg-orange-500/10 text-[#FB4F14] border border-orange-500/20 px-3 py-1 rounded-full uppercase tracking-wider text-[10px] font-extrabold">
            {article.category || 'Fan Thoughts'}
          </span>
          <span>•</span>
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.read_time || '4 min read'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          {article.title}
        </h1>
      </div>

      {/* Share Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-slate-800/80 py-3 px-4 bg-slate-900/40 rounded-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Share This Take</span>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCopyLink} 
            className="px-3.5 py-1.5 text-xs font-bold bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            {copied ? '✓ Copied!' : '📋 Copy Link'}
          </button>

          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-3.5 py-1.5 text-xs font-bold bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-xl transition-colors"
          >
            𝕏 Share
          </a>
        </div>
      </div>

      {/* Main Content Body (Structured for readability) */}
      <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6 text-base sm:text-lg pt-2">
        {article.content}
      </div>

      {/* Author / Community Signoff Box */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl mt-12 space-y-2">
        <h4 className="text-sm font-bold text-white">About Bengals Origins</h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          Written by a dedicated fan sharing real-time game reactions, thoughts, and opinions with the community. Got feedback or want to debate a point? Hit us up on social media!
        </p>
      </div>

    </main>
  );
}