'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AUTHOR_NAME = 'Your Name'; // <-- Replace with your actual name

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

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
          title: article?.title || 'Havoc Shift Breakdown',
          text: 'Check out this breakdown on Havoc Shift!',
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

  const authorDisplay = article.author || AUTHOR_NAME;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(article.title);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 text-slate-900">
      <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
        ← Back to All Posts
      </Link>

      {/* Article Header */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
          <Link
            href={`/?category=${encodeURIComponent(article.category || 'Bengals Jungle')}#latest-takes`}
            className="text-[#FB4F14] uppercase tracking-wider text-xs font-extrabold hover:underline cursor-pointer"
          >
            {article.category || 'Fan Thoughts'}
          </Link>
          <span>•</span>
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
          {article.read_time && (
            <>
              <span>•</span>
              <span className="text-slate-500 font-medium">{article.read_time}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* Author Byline at Top of Article */}
        <div className="flex items-center gap-2.5 pt-1 text-sm text-slate-700">
          <div className="w-7 h-7 rounded-full bg-[#FB4F14]/15 text-[#FB4F14] font-black text-xs flex items-center justify-center">
            {authorDisplay.charAt(0).toUpperCase()}
          </div>
          <span>
            By <strong className="font-bold text-slate-900">{authorDisplay}</strong>
          </span>
        </div>
      </div>

      {/* FTC & impact.com Affiliate Disclosure for Gear Guides */}
      {article.category === 'Fan Gear' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Disclosure:</strong> This post may contain affiliate links. If you purchase gear through links on this page, Havoc Shift may earn a small commission at no extra cost to you.{' '}
          <Link href="/affiliate-disclosure" className="text-[#FB4F14] font-bold hover:underline">
            Learn more
          </Link>.
        </div>
      )}

      {/* Featured Image Banner */}
      {article.image_url && (
        <figure className="my-6 space-y-2">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <img src={article.image_url} alt={article.title} className="w-full h-auto object-cover max-h-[420px]" />
          </div>
          {article.image_credit && (
            <figcaption className="text-[11px] text-slate-500 text-right px-1">
              {article.image_credit}
            </figcaption>
          )}
        </figure>
      )}

      {/* Share Bar */}
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
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`}
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

      {/* Markdown Content */}
      <div className="text-slate-800 text-base space-y-4 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ node, ...props }) => (
              <div className="my-6 w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-sm text-slate-800 border-collapse" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-900" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="py-3.5 px-4 font-extrabold text-slate-900 text-xs uppercase tracking-wider whitespace-nowrap" {...props} />
            ),
            tbody: ({ node, ...props }) => (
              <tbody className="divide-y divide-slate-200 bg-white" {...props} />
            ),
            tr: ({ node, ...props }) => (
              <tr className="hover:bg-slate-50/80 transition-colors" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="py-3.5 px-4 align-middle text-slate-700 text-xs sm:text-sm whitespace-nowrap" {...props} />
            ),
            img: ({ node, ...props }) => (
              <div className="my-6 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img {...props} className="w-full max-h-[420px] object-cover block" alt={props.alt || 'Article image'} />
              </div>
            ),
            a: ({ node, ...props }) => (
              <a {...props} className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer" />
            ),
            strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-black text-slate-900 mt-8 mb-3" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-black text-slate-900 mt-10 mb-3" {...props} />,
            p: ({ node, ...props }) => <p className="leading-relaxed my-3" {...props} />,
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>

      {/* Sources Link */}
      <div className="pt-4 border-t border-slate-200">
        <Link
          href={`/sources?slug=${article.slug}`}
          className="text-xs font-bold text-[#FB4F14] hover:underline flex items-center gap-1.5"
        >
          <span>📚</span> View Data Sources & References for This Article ↗
        </Link>
      </div>

      {/* Author / Editorial Signoff */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2 shadow-sm">
        <h4 className="text-sm font-bold text-slate-900">About Havoc Shift</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Independent NFL analysis and Cincinnati Bengals coverage written by dedicated fans. Read more about our editorial standards on our{' '}
          <Link href="/about" className="text-[#FB4F14] font-bold hover:underline">About page</Link>.
        </p>
      </div>
    </main>
  );
}