'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import './globals.css';

const CATEGORIES = [
  'All',
  'Bengals Jungle',
  'Around the NFL',
  'AFC North',
  'Fan Gear',
  'The Fan Lounge',
];

function Navbar({ activeCategory }: { activeCategory: string }) {
  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-2 shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FB4F14]" />
          <span>BENGALS ORIGIN</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-5 text-xs font-bold">
          {CATEGORIES.filter((c) => c !== 'All').map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Link
                key={cat}
                href={`/?category=${encodeURIComponent(cat)}`}
                className={`transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#FB4F14]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/admin/write"
          className="text-xs font-extrabold bg-[#FB4F14] hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl transition-colors shrink-0"
        >
          Write Take
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="font-black text-sm text-slate-900 tracking-tight">BENGALS ORIGIN</p>
          <p className="text-xs text-slate-500">
            Cincinnati Roots. Sunday-Wide NFL Reactions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
          <Link href="/" className="hover:text-[#FB4F14] transition-colors">
            Home
          </Link>
          <Link
            href="/?category=Bengals%20Jungle"
            className="hover:text-[#FB4F14] transition-colors"
          >
            Bengals Jungle
          </Link>
          <Link
            href="/?category=Around%20the%20NFL"
            className="hover:text-[#FB4F14] transition-colors"
          >
            Around the NFL
          </Link>
          <Link href="/admin/write" className="hover:text-[#FB4F14] transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const paramCategory = searchParams.get('category');
    if (paramCategory && CATEGORIES.includes(paramCategory)) {
      setActiveCategory(paramCategory);
    } else if (!paramCategory) {
      setActiveCategory('All');
    }
  }, [searchParams]);

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

  useEffect(() => {
    if (loading || activeCategory === 'All') return;

    const el = document.getElementById('category-feed');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeCategory, loading]);

  const filteredArticles =
    activeCategory === 'All'
      ? articles
      : articles.filter((art) => art.category === activeCategory);

  const featuredArticle = articles[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-slate-900">
      <Navbar activeCategory={activeCategory} />

      <main className="flex-1 w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-10">
        {/* Hero Section */}
        <section className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm text-xs font-extrabold text-[#FB4F14] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FB4F14] animate-pulse"></span>
            Unfiltered Fan Perspectives &amp; NFL Takes
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Cincinnati Roots. Sunday-Wide NFL Reactions.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Your go-to spot for honest Bengals breakdowns, massive league-wide storylines, game reactions, and real football passion.
            </p>
          </div>

          {/* Homepage Ad Banner Slot */}
          <div className="max-w-4xl mx-auto px-4 mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center space-y-1.5 shadow-sm">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                Advertisement
              </span>
              <div className="py-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs font-medium">
                [ Leaderboard Ad Banner Space - Optimized for Homepage ]
              </div>
            </div>
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
                <span className="text-slate-400">
                  {new Date(featuredArticle.created_at).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#FB4F14] transition-colors mt-2">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base line-clamp-2 leading-relaxed mt-2">
                {featuredArticle.excerpt || featuredArticle.content?.substring(0, 140) + '...'}
              </p>

              <div className="pt-4">
                <span className="inline-block font-extrabold text-xs text-white bg-[#FB4F14] group-hover:bg-orange-600 px-5 py-2.5 rounded-xl transition-all shadow-sm">
                  Read Full Take →
                </span>
              </div>
            </Link>
          )}
        </section>

        {/* Scroll Target + Category Filter Bar + Article Feed */}
        <div id="category-feed" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
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
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">
                {activeCategory === 'All'
                  ? 'Latest Takes Across the League'
                  : `${activeCategory} Posts`}
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {filteredArticles.length} Articles
              </span>
            </div>

            {loading ? (
              <div className="text-center py-20 text-slate-400 text-sm">
                Loading posts from database...
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-sm">
                <p className="text-slate-600 text-sm font-medium">
                  No posts found in this category yet.
                </p>
                <p className="text-slate-400 text-xs">
                  Head over to your admin portal to publish your first take!
                </p>
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
                      <span className="font-bold text-[#FB4F14] uppercase tracking-wider">
                        {article.category || 'Bengals Jungle'}
                      </span>
                      <span className="text-slate-400">
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#FB4F14] transition-colors mt-2">
                      {article.title}
                    </h4>
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mt-1">
                      {article.excerpt || article.content}
                    </p>
                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {article.read_time || '4 min read'}
                      </span>
                      <span className="text-xs font-bold text-[#FB4F14] group-hover:translate-x-1 transition-transform">
                        Read Take →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 min-h-screen bg-[#fdfbf7] text-slate-400 text-sm">
          Loading...
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}