'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

export default function SourcesPage() {
  const [sourcesList, setSourcesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSources() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('sources')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error('Error fetching sources:', error.message);
        } else if (data) {
          setSourcesList(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSources();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-sm">
        Loading sources...
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 text-slate-900">
      
      {/* Navigation */}
      <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
        ← Back to Home
      </Link>

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Data Sources & References</h1>
        <p className="text-slate-600 text-sm">
          All citations, stats, and research links used across our Havoc Shift game breakdowns.
        </p>
      </div>

      {/* Dynamic Sources List */}
      {sourcesList.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-sm">
          No sources added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {sourcesList.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                {item.article_slug ? (
                  <Link href={`/articles/${item.article_slug}`} className="hover:text-[#FB4F14] transition-colors">
                    {item.title} ↗
                  </Link>
                ) : (
                  item.title
                )}
              </h2>

              <div className="text-slate-800 text-sm leading-relaxed">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} className="text-blue-600 hover:text-blue-800 underline font-medium" target="_blank" rel="noopener noreferrer" />
                    ),
                    p: ({ node, ...props }) => <p className="leading-relaxed my-2" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                    li: ({ node, ...props }) => <li className="my-1" {...props} />,
                  }}
                >
                  {item.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}