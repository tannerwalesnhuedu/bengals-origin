import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NewsLetter from "@/components/NewsLetter";

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
        {/* Professional Header */}
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
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Custom Footer Component */}
        <Footer />
      </body>
    </html>
  );
}