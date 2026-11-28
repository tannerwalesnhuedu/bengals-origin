import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy outlining how Havoc Shift handles information and cookies.',
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
        <p className="text-xs text-slate-500">Last updated: October 24, 2026</p>
      </div>

      <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 pt-2">Information We Collect</h2>
        <p>
          Welcome to <strong className="text-slate-900">Havoc Shift</strong>. This Privacy Policy outlines how we handle information on our independent analytical publication.
        </p>

        <h2 className="text-lg font-black text-slate-900 pt-2">Google AdSense & Cookies</h2>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
        </p>
        <p>
          Users may opt out of personalized advertising by visiting{' '}
          <a 
            href="https://adssettings.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#FB4F14] font-bold hover:underline"
          >
            Ads Settings
          </a>.
        </p>

        <h2 className="text-lg font-black text-slate-900 pt-2">Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, you can reach out via our{' '}
          <Link href="/contact" className="text-[#FB4F14] font-bold hover:underline">
            contact page
          </Link>.
        </p>
      </div>
    </main>
  );
}