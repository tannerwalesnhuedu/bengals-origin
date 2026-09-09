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
      <div className="max-w-xl">
        <span className="text-[#FB4F14] font-extrabold text-xs uppercase tracking-wider">
          Bengals Origins Newsletter
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          Get Practice Notes Delivered
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 mb-5 leading-relaxed">
          Join free for instant email alerts on breaking team news, roster moves, and game recaps.
        </p>

        {status === 'success' ? (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            ✓ You're signed up! Check your inbox for updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FB4F14] text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-5 py-2.5 font-bold text-xs sm:text-sm bg-[#FB4F14] text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 whitespace-nowrap shadow-sm"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-xs mt-2">
            Something went wrong. Please check your email and try again.
          </p>
        )}
      </div>
    </section>
  );
}