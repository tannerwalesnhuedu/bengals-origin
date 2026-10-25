'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function AdminWritePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Bengals Jungle');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setCheckingAuth(false);
      }
    }
    checkUser();
  }, [router]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const slug = generateSlug(title);

    try {
      const { error: dbError } = await supabase
        .from('articles')
        .insert([{ title, slug, category, excerpt, content, read_time: readTime }]);

      if (dbError) throw dbError;

      await fetch('/api/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, slug }),
      });

      setStatus('success');
      setTitle('');
      setCategory('Bengals Jungle');
      setExcerpt('');
      setContent('');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong.');
    }
  };

  if (checkingAuth) {
    return <div className="text-center py-20 text-slate-500 text-sm">Verifying secure session...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      
      {/* Header with Switch to Manage Posts & Sign Out */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-[#FB4F14] font-extrabold text-xs uppercase tracking-wider">Secure Admin Portal</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Publish New Game Breakdown</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/manage" 
            className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl transition-colors"
          >
            ⚙️ Manage Posts
          </Link>
          <button 
            onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }}
            className="px-3.5 py-1.5 text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {status === 'success' && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold">
          ✓ Breakdown published successfully and email broadcast sent!
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
          Error: {errorMessage}
        </div>
      )}

      <form onSubmit={handlePublish} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Article Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#FB4F14]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Category Tag</label>
  <select 
    value={category} 
    onChange={(e) => setCategory(e.target.value)} 
    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#FB4F14] cursor-pointer"
  >
    <option value="Bengals Jungle">Bengals Jungle</option>
    <option value="Around the NFL">Around the NFL</option>
    <option value="AFC North">AFC North</option>
    <option value="The Fan Lounge">The Fan Lounge</option>
  </select>
  <span className="text-[10px] text-slate-400 mt-1 block">Select exact category for proper filtering</span>
</div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Read Time</label>
            <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="e.g., 5 min read" required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#FB4F14]" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Short Excerpt</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#FB4F14]" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#FB4F14]" />
        </div>

        <button type="submit" disabled={status === 'loading'} className="w-full py-3 font-bold text-sm bg-[#FB4F14] text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm cursor-pointer">
          {status === 'loading' ? 'Publishing & Sending Emails...' : 'Publish Breakdown & Email Subscribers'}
        </button>
      </form>
    </div>
  );
}