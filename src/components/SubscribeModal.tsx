'use client';

import { useState } from 'react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
 
export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

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
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2500); // auto-close after 2.5s on success
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 space-y-4">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          ✕
        </button>

        <div className="space-y-1">
          <span className="text-[#FB4F14] font-extrabold text-xs uppercase tracking-wider">
            Bengals Origins
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Never Miss a Breakdown
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Get instant email notifications when new film studies and game reports drop. No spam, ever.
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-semibold text-center">
            ✓ You're signed up! Check your inbox for updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FB4F14] text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2.5 font-bold text-xs sm:text-sm bg-[#FB4F14] text-white rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 shadow-sm"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe Now'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-xs text-center">
            Something went wrong. Please check your email and try again.
          </p>
        )}
      </div>
    </div>
  );
}