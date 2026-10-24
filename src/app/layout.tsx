import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bengals Origins | Film & Game Breakdowns",
  description: "Deep-dive analysis and film study on the Cincinnati Bengals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-slate-800 min-h-screen flex flex-col`}>
        
        {/* Softer, Professional Navy Header */}
        <header className="bg-slate-900 border-b border-slate-200/60 text-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-lg tracking-wider flex items-center gap-2">
              <span className="text-[#FB4F14]">BENGALS</span> ORIGINS
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link 
                href="/admin/login" 
                className="text-[11px] font-extrabold text-slate-300 hover:text-[#FB4F14] bg-slate-800 border border-slate-700/60 px-3.5 py-1.5 rounded-xl transition-all"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="grow">
            {children}
        </div>

        {/* Softer Footer */}
        <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800 mt-20">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Bengals Origins. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}