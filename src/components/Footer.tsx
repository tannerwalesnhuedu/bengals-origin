export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Bengals Origins</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Dedicated analytical deep-dives, film study, and game reports for the Cincinnati Bengals fanbase.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Sections</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home Reports</a></li>
            <li><a href="/posts" className="hover:text-white transition-colors">Film Room</a></li>
            <li><a href="/category/roster" className="hover:text-white transition-colors">Roster Analysis</a></li>
            <li><a href="/category/injuries" className="hover:text-white transition-colors">Injury Reports</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Connect & Feed</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X (Twitter)</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube Channel</a></li>
            <li><a href="https://substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Substack Profile</a></li>
            <li><a href="/rss.xml" className="hover:text-white transition-colors">RSS Feed</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Legal & Terms</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
          <p className="text-xs leading-relaxed text-slate-500">
            Independent analysis publication not officially affiliated with the NFL or Cincinnati Bengals.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Bengals Origins. All rights reserved.
      </div>
    </footer>
  );
}