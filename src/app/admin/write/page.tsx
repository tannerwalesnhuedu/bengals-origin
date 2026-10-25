'use client';

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function WriteForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Bengals Jungle');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'draftSaved'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  useEffect(() => {
    async function checkUserAndLoadPost() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      setCheckingAuth(false);

      if (editId) {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', editId)
          .single();

        if (data) {
          setTitle(data.title || '');
          setCategory(data.category || 'Bengals Jungle');
          setExcerpt(data.excerpt || '');
          setContent(data.content || '');
          setReadTime(data.read_time || data.readTime || '5 min read');
        } else if (error) {
          console.error('Error loading post for edit:', error);
        }
      } else {
        const savedDraft = localStorage.getItem('havocshift_draft');
        if (savedDraft) {
          try {
            const parsed = JSON.parse(savedDraft);
            setTitle(parsed.title || '');
            setCategory(parsed.category || 'Bengals Jungle');
            setExcerpt(parsed.excerpt || '');
            setContent(parsed.content || '');
            setReadTime(parsed.readTime || '5 min read');
          } catch (e) {
            console.error('Failed to load draft', e);
          }
        }
      }
    }
    checkUserAndLoadPost();
  }, [router, editId]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
  };

  const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;

  const handleSaveDraft = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editId) return;
    const draftData = { title, category, excerpt, content, readTime };
    localStorage.setItem('havocshift_draft', JSON.stringify(draftData));
    setStatus('draftSaved');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const slug = generateSlug(title);

    // Explicitly mapping both versions for Supabase
    const articleData = { 
      title, 
      slug, 
      category, 
      excerpt, 
      content, 
      read_time: readTime,   // standard snake_case column
      readTime: readTime     // alternative camelCase column
    };

    try {
      if (editId) {
        const { error: updateError } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editId);

        if (updateError) throw updateError;
      } else {
        const { error: dbError } = await supabase
          .from('articles')
          .insert([articleData]);

        if (dbError) throw dbError;

        await fetch('/api/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, excerpt, slug }),
        });

        localStorage.removeItem('havocshift_draft');
      }

      setStatus('success');
      setTimeout(() => {
        router.push('/admin/manage');
      }, 1500);
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-[#FB4F14] font-extrabold text-xs uppercase tracking-wider">Secure Admin Portal</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            {editId ? '✏️ Edit Game Breakdown' : 'Publish New Game Breakdown'}
          </h1>
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
          ✓ Breakdown successfully {editId ? 'updated' : 'published and email broadcast sent'}! Redirecting...
        </div>
      )}

      {status === 'draftSaved' && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold">
          💾 Draft saved locally to your browser!
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
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Full Content</label>
            <span className="text-xs font-semibold text-slate-500">
              Word Count: <span className="text-[#FB4F14] font-bold">{wordCount}</span>
            </span>
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#FB4F14]" />
        </div>

        <div className="flex gap-3">
          {!editId && (
            <button 
              type="button" 
              onClick={handleSaveDraft}
              className="w-1/3 py-3 font-bold text-sm bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors shadow-sm cursor-pointer"
            >
              💾 Save Draft
            </button>
          )}
          <button 
            type="submit" 
            disabled={status === 'loading'} 
            className={`${editId ? 'w-full' : 'w-2/3'} py-3 font-bold text-sm bg-[#FB4F14] text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm cursor-pointer`}
          >
            {status === 'loading' ? 'Saving Changes...' : editId ? 'Save Changes' : 'Publish Breakdown & Email Subscribers'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminWritePage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-500 text-sm">Loading write portal...</div>}>
      <WriteForm />
    </Suspense>
  );
}