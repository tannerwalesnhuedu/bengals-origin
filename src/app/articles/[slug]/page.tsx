import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

type ArticleRow = {
  id: string | number;
  slug?: string | null;
  title: string;
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

async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  const supabase = getSupabaseClient();
  const decodedSlug = decodeURIComponent(slug);

  // 1. Try exact slug match
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

  // 2. Fallback to matching by id if slug wasn't found
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

  const displayDate = article.date ?? article.created_at ?? "";

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      {displayDate ? (
        <p className="text-sm text-gray-500 mt-2">{displayDate}</p>
      ) : null}
      <div className="mt-6 whitespace-pre-line">{article.content}</div>
    </article>
  );
}