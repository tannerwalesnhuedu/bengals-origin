import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/NewsLetter';

// Single article data for launch
const LATEST_ARTICLE = {
  id: '1',
  title: "Burrow & Chase Showcase Deep Connection in Red Zone Drills",
  slug: 'burrow-chase-red-zone-drills',
  category: 'Practice Report',
  date: 'Sep 7, 2026',
  readTime: '4 min read',
  excerpt: 'The first-team offense dominated 11-on-11 situational drills with crisp route running and zero sacks allowed.',
  imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1200&auto=format&fit=crop',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Bar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-7 bg-[#FB4F14] rounded-sm" />
            <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
              Bengals <span className="text-[#FB4F14]">Origins</span>
            </h1>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200 uppercase tracking-wider">
            Coverage
          </span>
        </div>
      </header>

      {/* Main Content Area (Centered Single-Column Container) */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-10">
        

        {/* Featured Latest Article Section */}
        <section>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Latest Report
            </h2>
            <span className="text-xs text-slate-500 font-medium">Just Published</span>
          </div>

          <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#FB4F14] transition-all">
            <Link href={`/post/${LATEST_ARTICLE.slug}`}>
              <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-slate-100">
                <Image
                  src={LATEST_ARTICLE.imageUrl}
                  alt={LATEST_ARTICLE.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#FB4F14] text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded tracking-wider shadow">
                  {LATEST_ARTICLE.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center text-xs text-slate-500 gap-2 mb-2 font-medium">
                  <time>{LATEST_ARTICLE.date}</time>
                  <span>•</span>
                  <span>{LATEST_ARTICLE.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-[#FB4F14] transition-colors leading-snug">
                  {LATEST_ARTICLE.title}
                </h3>

                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {LATEST_ARTICLE.excerpt}
                </p>

                <div className="mt-4 inline-flex items-center text-xs font-bold text-[#FB4F14] group-hover:underline">
                  Read Full Story →
                </div>
              </div>
            </Link>
          </article>
        </section>

      </div>
    </main>
  );
}