'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
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
    async function loadArticleAndRelated() {
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

          // Fetch related articles in the same category (excluding current article)
          const { data: sameCat } = await supabase
            .from('articles')
            .select('id, title, slug, category, created_at, read_time, excerpt, image_url')
            .eq('category', data.category)
            .neq('slug', slug)
            .order('created_at', { ascending: false })
            .limit(3);

          if (sameCat && sameCat.length >= 2) {
            setRelatedArticles(sameCat);
          } else {
            // Fallback to latest articles across the site if category has fewer than 2 other posts
            const { data: recent } = await supabase
              .from('articles')
              .select('id, title, slug, category, created_at, read_time, excerpt, image_url')
              .neq('slug', slug)
              .order('created_at', { ascending: false })
              .limit(3);
            setRelatedArticles(recent || []);
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadArticleAndRelated();
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
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm font-medium">
        Loading breakdown...
      </div>
    );
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
  const publisherName = article.author_name || 'Havoc Shift Editorial';

  return (
    <main className="max-w-3xl mx-auto py-10 sm:py-12 px-4 sm:px-6 space-y-8 text-slate-900">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <Link href="/" className="hover:text-[#FB4F14] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/?category=${encodeURIComponent(article.category || 'Bengals Jungle')}`}
          className="text-[#FB4F14] hover:underline"
        >
          {article.category || 'Bengals Jungle'}
        </Link>
      </nav>
      
      {/* Article Header & Publisher Byline */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-500">
          <Link 
            href={`/?category=${encodeURIComponent(article.category || 'Bengals Jungle')}`}
            className="bg-orange-50 text-[#FB4F14] border border-orange-200/80 px-2.5 py-0.5 rounded-md uppercase tracking-wider text-[11px] font-extrabold hover:bg-orange-100 transition-colors"
          >
            {article.category || 'Bengals Jungle'}
          </Link>
          <span>•</span>
          <time dateTime={article.created_at}>
            Published {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
          <span>•</span>
          <span className="text-slate-500 font-medium">{article.read_time}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {article.excerpt}
          </p>
        )}

        {/* Publisher / Author Byline Bar */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0b0f19] text-white flex items-center justify-center font-black text-xs border border-slate-700">
              <span className="text-[#FB4F14]">H</span>S
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-slate-900">By {publisherName}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                  Publisher
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Havoc Shift • Cincinnati NFL Coverage &amp; Analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image Banner with License Caption */}
      {article.image_url && (
        <figure className="my-6 space-y-2">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <img src={article.image_url} alt={article.title} className="w-full h-auto object-cover max-h-[420px]" />
          </div>
          {article.image_credit && (
            <figcaption className="text-[11px] text-slate-500 text-right px-1">
              {article.image_credit}
            </figcaption>
          )}
        </figure>
      )}

      {/* Editorial & Affiliate Transparency Notice (Great for AdSense E-E-A-T) */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-[11px] text-slate-500 leading-relaxed">
        <strong className="text-slate-700">Editorial Note:</strong> Havoc Shift is an independent fan-powered publication. Some gear or ticket guides may contain affiliate links at no extra cost to you. Read our{' '}
        <Link href="/affiliate-disclosure" className="text-[#FB4F14] font-semibold hover:underline">
          Affiliate Disclosure
        </Link>.
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

      {/* Clean Markdown Content Renderer */}
      <article className="text-slate-800 text-base space-y-4 leading-relaxed">
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
              <div className="my-6 w-full h-[350px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img {...props} className="w-full h-full object-cover block" alt={props.alt || 'Article image'} />
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
      </article>

      {/* Dedicated References Link Box */}
      <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <Link 
          href={`/sources?slug=${article.slug}`} 
          className="text-xs font-bold text-[#FB4F14] hover:underline flex items-center gap-1.5"
        >
          <span>📚</span> View Data Sources &amp; References for This Article ↗
        </Link>
        <Link
          href="/contact"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          Spot an error? Submit a correction
        </Link>
      </div>

      {/*
        ADSENSE SLOT: Uncomment and paste your Google AdSense <ins> code below AFTER AdSense approves your site.
        Do not leave fake "[ Ad Space ]" placeholders visible during AdSense review.
      */}
      {/* <div className="my-6">
        <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center mb-1">Advertisement</span>
        <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
      </div> */}

      {/* Publisher & Author Signoff Box */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#FB4F14]">About the Publisher</span>
          </div>
          <h4 className="text-base font-black text-slate-900">{publisherName} — Havoc Shift</h4>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
            Independent Cincinnati Bengals coverage, AFC North rivalry breakdowns, and honest fan gear guides. Every piece is researched using official NFL stats, game film notes, and verified league reports.
          </p>
        </div>
        <Link
          href="/about"
          className="shrink-0 px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors"
        >
          More About Us →
        </Link>
      </div>

      {/* Professional Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="pt-6 border-t border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              More From <span className="text-[#FB4F14]">Havoc Shift</span>
            </h2>
            <Link
              href="/"
              className="text-xs font-bold text-[#FB4F14] hover:underline"
            >
              View All Takes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/articles/${rel.slug}`}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {rel.image_url ? (
                    <div className="h-32 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={rel.image_url}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-2 bg-[#FB4F14]" />
                  )}

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FB4F14]">
                      {rel.category || 'Bengals Jungle'}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 leading-snug group-hover:text-[#FB4F14] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    {rel.excerpt && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-4 pb-3 pt-1 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>{rel.read_time || '3 min read'}</span>
                  <span className="text-[#FB4F14] font-bold group-hover:translate-x-0.5 transition-transform">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}