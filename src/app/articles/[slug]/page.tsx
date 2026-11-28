import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'; // Adjust to match your Supabase import

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.read_time}</p>
      <div>{article.content}</div>
    </article>
  );
}