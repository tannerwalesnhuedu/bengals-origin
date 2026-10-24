import Image from 'next/image';
import Link from 'next/link';

interface PostProps {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: 'Game Analysis' | 'Roster & Trades' | 'Strategy' | 'Game Recap' | 'Practice Notes' | 'Analysis';
  imageUrl: string;
  readTime: string;
}

export default function PostCard({ post }: { post: PostProps }) {
  return (
    <article className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#FB4F14] hover:shadow-sm transition-all duration-300">
      <Link href={`/posts/${post.slug}`}>
        {/* Featured Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-[#FB4F14] text-white font-extrabold text-xs uppercase px-2.5 py-1 rounded-md tracking-wider shadow-xs">
            {post.category}
          </span>
        </div>

        {/* Post Details */}
        <div className="p-5">
          <div className="flex items-center text-xs text-slate-400 gap-2 mb-2">
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#FB4F14] transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}