import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type ArticleRecord = {
  id: string | number;
  slug?: string;
  title: string;
  date: string;
  content: ReactNode;
};

// Replace with your real articles array, DB query, or CMS fetch
const ARTICLES: ArticleRecord[] = [];

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getArticleBySlug(slug: string): Promise<{
  title: string;
  date: string;
  content: ReactNode;
} | null> {
  const normalized = slug.toLowerCase();

  const match = ARTICLES.find(
    (item) =>
      item.slug?.toLowerCase() === normalized ||
      toSlug(item.title) === normalized ||
      String(item.id) === slug
  );

  if (!match) return null;

  return {
    title: match.title,
    date: match.date,
    content: match.content,
  };
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