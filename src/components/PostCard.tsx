import Link from 'next/link';

export default function PostCard({ article }: { article: any }) {
  return (
    <article className="group bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#FB4F14] hover:shadow-md transition-all duration-300">
      <Link href={`/articles/${article.slug}`} className="block">
        
        {/* Post Details */}
        <div className="p-6 space-y-3">
          
          {/* Category & Date Header */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#FB4F14] uppercase tracking-wider">
              {article.category || 'Bengals Jungle'}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">
              {new Date(article.created_at).toLocaleDateString()}
            </span>
            {article.read_time && (
              <>
                <span className="text-slate-600">•</span>
                <span className="text-slate-500">{article.read_time}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-[#FB4F14] transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Call to action prompt */}
          <div className="pt-2 flex items-center text-xs font-bold text-slate-300 group-hover:text-white">
            Read Full Breakdown →
          </div>

        </div>
      </Link>
    </article>
  );
}