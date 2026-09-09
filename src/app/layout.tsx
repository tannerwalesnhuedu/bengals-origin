import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bengals Origins | Game Reports & Practice Analysis",
  description: "In-depth film breakdowns and game analysis for the Cincinnati Bengals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        {/* Persistent Global Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#FB4F14] rounded-sm inline-block"></span>
              <a href="/" className="font-black text-xl tracking-wider uppercase text-slate-900">
                Bengals <span className="text-[#FB4F14]">Origins</span>
              </a>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a href="/" className="hover:text-[#FB4F14] transition-colors">Home</a>
              <a href="/posts" className="hover:text-[#FB4F14] transition-colors">Film Room</a>
              <a href="/about" className="hover:text-[#FB4F14] transition-colors">About</a>
            </nav>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Persistent Global Footer */}
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Bengals Origins</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Dedicated analytical deep-dives, film study, and game reports for the Cincinnati Bengals fanbase.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white transition-colors">Latest Reports</a></li>
                <li><a href="/posts" className="hover:text-white transition-colors">Film Breakdowns</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About the Author</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Disclaimer</h4>
              <p className="text-xs leading-relaxed text-slate-500">
                This is an independent analysis publication not officially affiliated with or endorsed by the NFL or the Cincinnati Bengals.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Bengals Origins. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
