import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Havoc Shift for questions, feedback, or editorial tips.',
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 space-y-8 bg-[#fdfbf7] min-h-screen text-slate-900">
      <Link href="/" className="inline-block text-xs font-bold text-[#FB4F14] hover:underline uppercase tracking-wider">
        ← Back to Home
      </Link>

      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#FB4F14]">
          Get in Touch & Reader Tips
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="text-xs text-slate-500">Direct Support & Editorial Inquiries</p>
      </div>

      <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <p>
          Have questions, feedback, or corrections regarding our <strong className="text-slate-900">Bengals</strong> breakdowns? Reach out to us directly!
        </p>

        <div className="bg-[#fdfbf7] border border-slate-200 p-6 rounded-xl text-center space-y-2 my-4">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#FB4F14]">
            Direct Support Email
          </p>
          <a 
            href="mailto:havocshift@gmail.com" 
            className="inline-block text-lg sm:text-xl font-black text-slate-900 hover:text-[#FB4F14] transition-colors"
          >
            havocshift@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}