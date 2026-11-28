import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Havoc Shift.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 bg-[#fdfbf7] min-h-screen text-slate-900">
      <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
        ← Back to Home
      </Link>

      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#FB4F14]">
          Transparency & Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Last Updated: November 2026</p>
      </div>

      <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Paste your existing Privacy Policy <h2> and <p> tags here using: */}
        {/* <h2 className="text-lg font-black text-slate-900 pt-2">Section Title</h2> */}
      </div>
    </main>
  );
}