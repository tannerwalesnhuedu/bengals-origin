import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from '@/components/Footer';
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
  title: 'Bengals Origins | Game Reports & Practice Analysis',
  description: 'In-depth Bengals practice breakdowns, game analysis, and roster news.',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-between antialiased">
  <div className="grow">{children}</div>
  <Footer />
</body>
    </html>
  );
}
