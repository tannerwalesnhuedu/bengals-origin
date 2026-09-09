'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
{/* Social Share Bar */}
<div className="flex items-center gap-3 py-3 border-y border-slate-200 my-6 text-xs text-slate-500 font-medium">
  <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Share Story:</span>
  <a
    href={`https://x.com/intent/tweet?text=${encodeURIComponent}`}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors font-semibold"
  >
    Share on X
  </a>
  <a
    href="https://www.facebook.com/sharer/sharer.php"
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors font-semibold"
  >
    Facebook
  </a>
</div>
    </section>
  );
}