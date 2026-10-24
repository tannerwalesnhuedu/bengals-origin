export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-slate-900 font-bold text-lg mb-3">Bengals Origins</h3>
          <p className="text-sm leading-relaxed text-slate-500">
            Dedicated analytical deep-dives, film study, and game reports for the Cincinnati Bengals fanbase.
          </p>
        </div>
        <div>
          <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-3">Sections</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#FB4F14] transition-colors">Home Reports</a></li>
            <li><a href="/posts" className="hover:text-[#FB4F14] transition-colors">Film Room</a></li>
            <li><a href="/category/roster" className="hover:text-[#FB4F14] transition-colors">Roster Analysis</a></li>
            <li><a href="/category/injuries" className="hover:text-[#FB4F14] transition-colors">Injury Reports</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-3">Connect & Feed</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FB4F14] transition-colors">X (Twitter)</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FB4F14] transition-colors">YouTube Channel</a></li>
            <li><a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FB4F14] transition-colors">Substack Profile</a></li>
            <li><a href="/rss.xml" className="hover:text-[#FB4F14] transition-colors">RSS Feed</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 font-semibold text-sm uppercase tracking-wider mb-3">Legal & Terms</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="/privacy" className="hover:text-[#FB4F14] transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-[#FB4F14] transition-colors">Terms of Service</a></li>
          </ul>
          <p className="text-xs leading-relaxed text-slate-400">
            Independent analysis publication not officially affiliated with the NFL or Cincinnati Bengals.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Bengals Origins. All rights reserved.
      </div>
    </footer>
  );
}