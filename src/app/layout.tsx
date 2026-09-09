import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

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
        {/* Professional Header with Categories, Search, and Subscribe */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#FB4F14] rounded-sm inline-block"></span>
                <a href="/" className="font-black text-xl tracking-wider uppercase text-slate-900">
                  Bengals <span className="text-[#FB4F14]">Origins</span>
                </a>
              </div>
              
              {/* Category Navigation Links */}
              <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-600">
                <a href="/" className="hover:text-[#FB4F14] transition-colors">Home</a>
                <a href="/posts" className="hover:text-[#FB4F14] transition-colors">Film Room</a>
                <a href="/category/roster" className="hover:text-[#FB4F14] transition-colors">Roster Analysis</a>
                <a href="/category/injuries" className="hover:text-[#FB4F14] transition-colors">Injury Report</a>
              </nav>
            </div>

            {/* Right side: Search & Subscribe Action */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-500">
                <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search reports..." 
                  className="bg-transparent outline-none text-slate-800 placeholder-slate-400 w-28 lg:w-40"
                />
              </div>
              <a 
                href="/subscribe" 
                className="bg-[#FB4F14] hover:bg-[#e04310] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors shadow-xs"
              >
                Subscribe
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}