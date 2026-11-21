import type { Metadata } from "next";
import Script from "next/script";
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
        <Script
          id="impact-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A8288692-1b33-4ad9-a510-c010451eac831.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`,
          }}
        />
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