'use client';

import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Close custom menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShareOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setTimeout(() => {
      setCopied(false);
      setShareOpen(false);
    }, 1500);
  };

  const handleShareClick = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: article?.title || 'Bengals Origins Breakdown',
          text: 'Check out this breakdown on Bengals Origins!',
          url: window.location.href,
        });
        return;
      } catch (err) {
        // User cancelled native share
      }
    }
    setShareOpen(!shareOpen);
  };

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm">Loading article...</div>;
  }

  if (!article) {
    return (
      <main className="max-w-xl mx-auto py-24 text-center space-y-4 px-4">
        <h1 className="text-3xl font-black text-slate-900">Article Not Found</h1>
        <p className="text-slate-600 text-sm">This piece might have been removed or the link is incorrect.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-[#FB4F14] text-white font-bold text-sm rounded-xl shadow-sm">
          Back to Home
        </Link>
      </main>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(article.title);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 text-slate-900">
      
      {/* Back Link */}
      <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
        ← Back to All Posts
      </Link>
      
      {/* Article Header info */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
        <Link 
  href={`/?category=${encodeURIComponent(article.category || 'Bengals Jungle')}`}
  className="text-[#FB4F14] uppercase tracking-wider text-xs font-extrabold hover:underline cursor-pointer"
>
  {article.category || 'Fan Thoughts'}
</Link>
          <span>•</span>
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
          <span>•</span>
          <span>{article.read_time || '4 min read'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>
      </div>

      {/* Share Bar Card */}
      <div className="flex items-center justify-between border border-slate-200 py-3 px-5 bg-white rounded-2xl relative shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Spread The Word</span>
        
        <div className="relative" ref={shareMenuRef}>
          <button 
            onClick={handleShareClick}
            className="px-4 py-2 text-xs font-extrabold bg-[#FB4F14] hover:bg-orange-600 text-white rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>📤 Share Article</span>
          </button>

          {shareOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 space-y-1">
              <button 
                onClick={handleCopyLink} 
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <span>📋</span> <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition-colors"
              >
                <span>𝕏</span> <span>Share on X</span>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition-colors"
              >
                <span>f</span> <span>Share on Facebook</span>
              </a>
              <a 
                href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition-colors"
              >
                <span className="font-black text-orange-500">#</span> <span>Share on Reddit</span>
              </a>
              <a 
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20%20${encodedUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition-colors"
              >
                <span>💬</span> <span>Send via WhatsApp</span>
              </a>
              <a 
                href={`mailto:?subject=${encodedTitle}&body=Check%20out%20this%20breakdown:%20${encodedUrl}`} 
                className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition-colors"
              >
                <span>✉️</span> <span>Share via Email</span>
              </a>
            </div>
          )}
        </div>
      </div>

<div className="text-slate-800 text-base whitespace-pre-line">
  {article.content}
</div>

      {/* Advertisement Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2 shadow-sm">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Advertisement</span>
        <div className="py-6 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs font-medium">
          [ Leaderboard Ad Banner Space - Optimized for Mobile & Desktop ]
        </div>
      </div>

      {/* Author / Community Signoff Box */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900">About Bengals Origins</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Written by a dedicated fan sharing real-time game reactions, thoughts, and opinions with the community. Got feedback or want to debate a point? Hit us up on social media!
        </p>
      </div>

    </main>
  );
}