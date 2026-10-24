import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// INDUSTRY-STANDARD SEO METADATA FOR GOOGLE RANKINGS
export const metadata: Metadata = {
  title: {
    default: "Bengals Origins | Fan Perspectives & Game Insights",
    template: "%s | Bengals Origins"
  },
  description: "Unfiltered Cincinnati Bengals fan perspectives, game reactions, roster thoughts, and community breakdowns.",
  keywords: ["Cincinnati Bengals", "Bengals blog", "NFL fan analysis", "Bengals game reactions"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bengalsorigins.com",
    siteName: "Bengals Origins",
    title: "Bengals Origins | Fan Perspectives & Game Insights",
    description: "Unfiltered Cincinnati Bengals fan perspectives, game reactions, and roster thoughts.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col selection:bg-[#FB4F14] selection:text-white`}>
        
        {/* Sticky Professional Navigation */}
        <header className="bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-lg tracking-wider flex items-center gap-2">
              <span className="text-[#FB4F14]">BENGALS</span> ORIGINS
            </Link>

            <nav className="flex items-center gap-6">
              <Link href="/" className="text-xs font-bold text-slate-300 hover:text-white transition-colors">
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
        <footer className="bg-[#070a12] text-slate-400 text-xs py-12 border-t border-slate-800/80 mt-20">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="font-bold text-slate-200">Bengals Origins — Fan-Powered Insights</p>
              <p className="text-slate-500 mt-1">© {new Date().getFullYear()} All rights reserved. Not officially affiliated with the NFL or Cincinnati Bengals.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}