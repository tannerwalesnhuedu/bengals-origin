import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0b0f19] text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Top Grid: 4 Distinct Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3">
            <Link href="/" className="text-xl font-black tracking-tight inline-flex items-center gap-1.5">
              <span className="text-[#FB4F14]">Havoc</span>
              <span className="text-white">Shift</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Unfiltered fan perspectives, honest Bengals breakdowns, AFC North rivalry coverage, and real football passion rooted in Cincinnati.
            </p>
          </div>

          {/* Column 2: Article Categories */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Coverage &amp; Beats
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/category/bengals-jungle" className="hover:text-[#FB4F14] transition-colors">
                  Bengals Jungle
                </Link>
              </li>
              <li>
                <Link href="/category/afc-north" className="hover:text-[#FB4F14] transition-colors">
                  AFC North
                </Link>
              </li>
              <li>
                <Link href="/category/around-the-nfl" className="hover:text-[#FB4F14] transition-colors">
                  Around the NFL
                </Link>
              </li>
              <li>
                <Link href="/category/fan-gear" className="hover:text-[#FB4F14] transition-colors">
                  Fan Gear
                </Link>
              </li>
              <li>
                <Link href="/category/the-fan-lounge" className="hover:text-[#FB4F14] transition-colors">
                  The Fan Lounge
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Publication */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Publication
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/" className="hover:text-[#FB4F14] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FB4F14] transition-colors">
                  About Havoc Shift
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FB4F14] transition-colors">
                  Contact &amp; Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Transparency */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
              Transparency &amp; Legal
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-[#FB4F14] transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FB4F14] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FB4F14] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Havoc Shift — Fan-Powered Insights. All rights reserved.</p>
          <p>Not officially affiliated with the NFL or the Cincinnati Bengals.</p>
        </div>
      </div>
    </footer>
  );
}