import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
        
        {/* Left side: Branding / Copyright */}
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-bold text-white">Bengals Origins — Fan-Powered Insights</p>
          <p className="text-slate-500">© {new Date().getFullYear()} All rights reserved. Not officially affiliated with the NFL or Cincinnati Bengals.</p>
        </div>

        {/* Right side: Policy & Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
          <Link href="/privacy" className="font-bold text-white">Privacy Policy</Link>
          <Link href="/terms" className="font-bold text-white">Terms of Service</Link>
          <Link href="/contact" className="font-bold text-white">Contact Us</Link>
        </div>

      </div>
    </footer>
  );
}