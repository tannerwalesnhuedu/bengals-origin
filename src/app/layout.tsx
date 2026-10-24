import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#fdfbf7] text-slate-900 min-h-screen flex flex-col selection:bg-[#FB4F14] selection:text-white">

        {/* Professional Navigation */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 text-slate-900 sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-lg tracking-wider flex items-center gap-2">
              <span className="text-[#FB4F14]">BENGALS</span> ORIGINS
            </Link>

            <nav className="flex items-center gap-6">
              <Link href="/" className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Blueprint Container */}
        <div className="grow">
          {children}
        </div>

        {/* Professional Footer */}
        <footer className="bg-white text-slate-500 text-xs py-12 border-t border-slate-200 mt-20">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="font-bold text-slate-800">Bengals Origins — Fan-Powered Insights</p>
              <p className="text-slate-500 mt-1">© {new Date().getFullYear()} All rights reserved. Not officially affiliated with the NFL or Cincinnati Bengals.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact Us</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}