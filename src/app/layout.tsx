import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// INDUSTRY-STANDARD SEO METADATA FOR GOOGLE RANKINGS
export const metadata: Metadata = {
  title: {
    default: "Havoc Shift | Fan Perspectives & Game Insights",
    template: "%s | Havoc Shift"
  },
  description: "Unfiltered Cincinnati Bengals fan perspectives, game reactions, roster thoughts, and community breakdowns.",
  keywords: ["Cincinnati Bengals", "Bengals blog", "NFL fan analysis", "Bengals game reactions"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://havocshift.com",
    siteName: "Havoc Shift",
    title: "Havoc Shift | Fan Perspectives & Game Insights",
    description: "Unfiltered Cincinnati Bengals fan perspectives, game reactions, and roster thoughts.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Verification Script */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4649018341887192" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col selection:bg-[#FB4F14] selection:text-white`}>

        {/* Sticky Professional Navigation */}
        <Header />

        {/* Main Content Blueprint Container */}
        <div className="grow">
          {children}
        </div>

        <Footer />

      </body>
    </html>
  );
}