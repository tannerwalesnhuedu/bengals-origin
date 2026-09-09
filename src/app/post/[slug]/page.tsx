import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/NewsLetter';

interface Props {
  params: { slug: string };
}

export default async function ArticleTemplate({ params }: Props) {
  const { slug } = params;

  // Formats URL "burrow-practice-notes" into "Burrow Practice Notes"
  const formattedTitle = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <article className="max-w-2xl mx-auto px-4 py-8 text-slate-900">
      {/* Back Button */}
      <Link 
        href="/" 
        className="text-xs font-bold text-[#FB4F14] hover:underline mb-6 inline-flex items-center gap-1"
      >
        ← Back to Latest Reports
      </Link>

      {/* Article Header */}
      <header className="border-b border-slate-200 pb-6 mb-8">
        <span className="bg-[#FB4F14] text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded tracking-wider">
          Bengals Origins
        </span>
        
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 leading-tight">
          {formattedTitle}
        </h1>
        
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-3 font-medium">
          <span>By Staff Writer</span>
          <span>•</span>
          <time>Sep 7, 2026</time>
          <span>•</span>
          <span>3 min read</span>
        </div>
      </header>

      {/* Article Cover Image */}
      <div className="relative h-64 sm:h-80 w-full mb-8 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
        <Image
          src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1200&auto=format&fit=crop"
          alt={formattedTitle}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
      </div>

      {/* Main Article Body */}
      <div className="prose prose-slate max-w-none text-slate-700 space-y-5 text-base sm:text-lg leading-relaxed">
        <p className="font-semibold text-slate-900 text-lg sm:text-xl">
          Write your article intro or opening hook right here.
        </p>
        <p>
          Add detailed practice breakdowns, player quotes, or film study notes directly inside this section when you're ready to cover game week updates.
        </p>
      </div>

      <hr className="border-slate-200 my-10" />

      {/* Social Share Bar */}
<div className="flex items-center gap-3 py-3 border-y border-slate-200 my-6 text-xs text-slate-500 font-medium">
  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Share Story:</span>
  <a
    href={`https://x.com/intent/tweet?text=${encodeURIComponent(formattedTitle)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors font-semibold"
  >
    Share on X
  </a>
  <a
    href="https://www.facebook.com/sharer/sharer.php"
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors font-semibold"
  >
    Facebook
  </a>
</div>
    </article>
  );
}