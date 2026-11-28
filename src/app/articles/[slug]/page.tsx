import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArticleRow = {
  id: string | number;
  slug?: string | null;
  title: string;
  category?: string | null;
  image_url?: string | null;
  image_credit?: string | null;
  read_time?: string | number | null;
  date?: string | null;
  created_at?: string | null;
  content?: string | null;
};

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, key);
}

// 1. Add the date formatter helper here
function formatArticleDate(rawDate?: string | null): string {
  if (!rawDate) return "";

  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return rawDate;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatReadTime(readTime?: string | number | null): string {
  if (readTime === null || readTime === undefined || readTime === "") {
    return "";
  }
  const str = String(readTime).trim();
  return /min\s*read/i.test(str) ? str : `${str} min read`;
}

async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const supabase = getSupabaseClient();
  const decodedSlug = decodeURIComponent(slug);

  const { data: bySlug, error: slugError } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", decodedSlug)
    .maybeSingle();

  if (slugError) {
    console.error("Error fetching article by slug:", slugError);
  }
  if (bySlug) {
    return bySlug as ArticleRow;
  }

  const { data: byId, error: idError } = await supabase
    .from("articles")
    .select("*")
    .eq("id", decodedSlug)
    .maybeSingle();

  if (idError) {
    console.error("Error fetching article by id:", idError);
  }

  return (byId as ArticleRow) ?? null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // 2. Format the date (and optional read time) here
  const formattedDate = formatArticleDate(article.date ?? article.created_at);
  const formattedReadTime = formatReadTime(article.read_time);
const authorName = "[Bengals Fan]"; // ← Put your name here once

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Optional back link to all articles / home */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-4"
      >
        <span aria-hidden="true">←</span>
        <span>All Articles</span>
      </Link>

      {article.category ? (
        <span className="block text-xs font-extrabold uppercase tracking-wider text-[#FB4F14] mb-2">
          {article.category}
        </span>
      ) : null}

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
        {article.title}
      </h1>

      {/* 1. TOP BYLINE: Added authorName before the date */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-3">
        <span>
          By <strong className="font-semibold text-slate-800">{authorName}</strong>
        </span>
        {formattedDate ? (
          <>
            <span>•</span>
            <span>{formattedDate}</span>
          </>
        ) : null}
        {formattedReadTime ? (
          <>
            <span>•</span>
            <span>{formattedReadTime}</span>
          </>
        ) : null}
      </div>

      {article.image_url ? (
        <figure className="mt-6">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full rounded-xl object-cover max-h-[460px]"
          />
          {article.image_credit ? (
            <figcaption className="text-xs text-slate-500 mt-2">
              {article.image_credit}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="mt-8 space-y-4 text-slate-800 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="text-2xl font-extrabold text-slate-900 mt-8 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-slate-900 mt-7 mb-2.5">
                {children}
              </h3>
            ),
            p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-6 my-4 space-y-1.5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 my-4 space-y-1.5">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#FB4F14] pl-4 italic text-slate-600 my-5">
                {children}
              </blockquote>
            ),
            img: ({ src, alt }) => (
              <img
                src={src ?? ""}
                alt={alt ?? "Article image"}
                className="w-full rounded-xl my-6"
              />
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                <table className="w-full border-collapse text-left text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2.5 whitespace-nowrap">{children}</th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-2.5 border-t border-slate-200">
                {children}
              </td>
            ),
          }}
        >
          {article.content ?? ""}
        </ReactMarkdown>
      </div>

      {/* 2. BOTTOM AUTHOR BIO BOX */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-[#FB4F14] text-white font-black flex items-center justify-center shrink-0 text-lg">
          {authorName.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Written By
          </p>
          <h3 className="text-base font-extrabold text-slate-900">
            {authorName}
          </h3>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            Founder of Havoc Shift. Lifelong Bengals fan covering AFC North matchups, game-day gear, and Cincinnati football from the stands.{" "}
            <Link href="/about" className="text-[#FB4F14] font-semibold hover:underline">
              More about Havoc Shift →
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}