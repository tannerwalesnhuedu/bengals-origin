import Link from 'next/link';

export default function PostCard({ article }: { article: any }) {
  return (
    <Link 
      href={`/articles/${article.slug}`}
      className="block group bg-slate-900/60 border border-slate-800 hover:border-[#FB4F14] p-6 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="space-y-3">
        {/* Category & Date Header */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FB4F14] uppercase tracking-wider">{article.category || 'Bengals Jungle'}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">{new Date(article.created_at).toLocaleDateString()}</span>
          </div>
          {article.read_time && (
            <span className="text-slate-500">{article.read_time}</span>
          )}
        </div>

        {/* Title with hover color change */}
        <h3 className="text-xl font-bold text-white group-hover:text-[#FB4F14] transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Call to action at the bottom */}
        <div className="pt-2 flex items-center justify-end text-xs font-bold text-[#FB4F14] group-hover:translate-x-1 transition-transform">
          Read Take →
        </div>
      </div>
    </Link>
  );
}