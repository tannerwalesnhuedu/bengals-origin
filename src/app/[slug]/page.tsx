import { notFound } from "next/navigation";
import type { ReactNode } from "react";

// Replace with your actual data-fetching function
async function getArticleBySlug(slug: string): Promise<{
  title: string;
  date: string;
  content: ReactNode;
} | null> {
  // Fetch from your database, CMS, or local data file
  return null;
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

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <p className="text-sm text-gray-500 mt-2">{article.date}</p>
      <div className="mt-6">{article.content}</div>
    </article>
  );
}