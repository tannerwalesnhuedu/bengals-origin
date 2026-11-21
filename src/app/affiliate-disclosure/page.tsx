import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'FTC Affiliate Disclosure and editorial transparency policy for Havoc Shift.',
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 bg-[#fdfbf7] min-h-screen text-slate-900">
      <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
        ← Back to Home
      </Link>

      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#FB4F14]">
          Transparency & Editorial Policy
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Affiliate Disclosure
        </h1>
        <p className="text-xs text-slate-500">Last Updated: November 2026</p>
      </div>

      <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <p>
          <strong className="text-slate-900">Havoc Shift</strong> is a fan-powered football and sports commentary website. To help cover the costs of hosting, research, and running this site, some of the links in our articles—particularly in our <strong className="text-slate-900">Fan Gear</strong> buying guides—are affiliate links.
        </p>

        <h2 className="text-lg font-black text-slate-900 pt-2">How Affiliate Links Work</h2>
        <p>
          If you click on a product link on Havoc Shift and make a purchase through a partner retailer (such as Fanatics, NFL Shop, or Amazon), we may earn a small commission <strong className="text-slate-900">at zero extra cost to you</strong>. The price you pay is identical whether you use our link or visit the store directly.
        </p>

        <h2 className="text-lg font-black text-slate-900 pt-2">Our Editorial Independence</h2>
        <p>
          We do not accept paid placements to rank one jersey, hat, or piece of stadium gear above another. Every product recommendation is chosen independently based on fit, value, durability, and real game-day usefulness for Cincinnati Bengals and NFL fans.
        </p>

        <h2 className="text-lg font-black text-slate-900 pt-2">Questions?</h2>
        <p>
          If you have any questions about our affiliate partnerships or site policies, feel free to reach out through our{' '}
          <Link href="/contact" className="text-[#FB4F14] font-bold hover:underline">
            Contact Us
          </Link>{' '}
          page.
        </p>
      </div>
    </main>
  );
}