import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service governing access to and use of Havoc Shift.',
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">Last updated: October 24, 2026</p>
      </div>

      <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 pt-2">1. Introduction</h2>
        <p>
          Our aim is to keep this Agreement as readable as possible, but in some cases for legal reasons, some of the language is required &quot;legalese&quot;. This document governs your access to and use of <strong className="text-slate-900">Havoc Shift</strong>.
        </p>

        <h2 className="text-lg font-black text-slate-900 pt-2">2. User Submissions & Conduct</h2>
        <p>
          You are responsible for your use of the website and any content you provide. You agree not to post inappropriate, offensive, or harmful material.
        </p>

        <h2 className="text-lg font-black text-slate-900 pt-2">3. Intellectual Property</h2>
        <p>
          The website and its entire contents are owned by <strong className="text-slate-900">Havoc Shift</strong> and protected by intellectual property laws.
        </p>
      </div>
    </main>
  );
}