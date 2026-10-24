'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ManageArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Delete confirmation modal states
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [confirmTitleInput, setConfirmTitleInput] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Fetch all articles
  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching articles:', error.message);
      } else if (data) {
        setArticles(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }

  // Secure Delete Handler with Title Verification
  async function handleDeleteConfirm() {
    if (!selectedArticle) return;

    if (confirmTitleInput !== selectedArticle.title) {
      setDeleteError('The title you typed does not match. Deletion aborted for safety.');
      return;
    }

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', selectedArticle.id);

      if (error) {
        setDeleteError(error.message);
      } else {
        // Success: Close modal and refresh list
        setSelectedArticle(null);
        setConfirmTitleInput('');
        setDeleteError('');
        fetchArticles();
      }
    } catch (err) {
      setDeleteError('An unexpected error occurred.');
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8">
      
      {/* Header & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <Link href="/admin/login" className="text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
            ← Back to Admin Portal
          </Link>
          <h1 className="text-3xl font-black text-white mt-2">Manage Published Posts</h1>
        </div>
        <Link 
          href="/" 
          target="_blank" 
          className="px-4 py-2 text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200 rounded-xl hover:bg-slate-700 transition-colors"
        >
          View Live Site ↗
        </Link>
      </div>

      {/* Articles List */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-sm">Loading posts...</div>
      ) : articles.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <p className="text-slate-400 text-sm font-medium">No articles found in the database.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#FB4F14] uppercase tracking-wider">{article.category || 'General'}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{new Date(article.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{article.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{article.excerpt || article.content}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link 
                  href={`/articles/${article.slug}`}
                  target="_blank"
                  className="px-3.5 py-2 text-xs font-bold bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors"
                >
                  View
                </Link>

                <button 
                  onClick={() => {
                    setSelectedArticle(article);
                    setConfirmTitleInput('');
                    setDeleteError('');
                  }}
                  className="px-3.5 py-2 text-xs font-bold bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECURE DELETE CONFIRMATION MODAL (Prevents accidental deletion) */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-red-400">⚠️ Confirm Article Deletion</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                This action is permanent and will remove the post from your website immediately. To prevent accidental clicks, please type the exact title of the article below:
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1">Target Article Title:</span>
              <p className="text-sm font-bold text-white select-all">{selectedArticle.title}</p>
            </div>

            <div className="space-y-2">
              <input 
                type="text"
                placeholder="Type exact title here..."
                value={confirmTitleInput}
                onChange={(e) => setConfirmTitleInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#FB4F14]"
              />
              {deleteError && <p className="text-xs font-medium text-red-400">{deleteError}</p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button 
                onClick={handleDeleteConfirm}
                disabled={confirmTitleInput !== selectedArticle.title}
                className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                  confirmTitleInput === selectedArticle.title 
                    ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-lg' 
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                Permanently Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}