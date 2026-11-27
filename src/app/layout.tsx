import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

const NAV_CATEGORIES = [
  'Bengals Jungle',
  'Around the NFL',
  'AFC North',
  'Fan Gear',
  'The Fan Lounge',
];

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-black text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-2 shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FB4F14]" />
          <span>BENGALS ORIGIN</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-5 text-xs font-bold">
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className="text-slate-600 hover:text-[#FB4F14] transition-colors whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin/write"
          className="text-xs font-extrabold bg-[#FB4F14] hover:bg-orange-600 text-white px-3.5 py-2 rounded-xl transition-colors shrink-0"
        >
          Write Take
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="font-black text-sm text-slate-900 tracking-tight">BENGALS ORIGIN</p>
          <p className="text-xs text-slate-500">
            Cincinnati Roots. Sunday-Wide NFL Reactions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
          <Link href="/" className="hover:text-[#FB4F14] transition-colors">
            Home
          </Link>
          <Link
            href="/?category=Bengals%20Jungle"
            className="hover:text-[#FB4F14] transition-colors"
          >
            Bengals Jungle
          </Link>
          <Link
            href="/?category=Around%20the%20NFL"
            className="hover:text-[#FB4F14] transition-colors"
          >
            Around the NFL
          </Link>
          <Link href="/admin/write" className="hover:text-[#FB4F14] transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fdfbf7] text-slate-900 antialiased">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}