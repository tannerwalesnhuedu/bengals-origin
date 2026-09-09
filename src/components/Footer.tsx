export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Bengals Origins</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Dedicated analytical deep-dives, film study, and game reports for the Cincinnati Bengals fanbase.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/posts" className="hover:text-white transition-colors">Film Room</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Disclaimer</h4>
          <p className="text-xs leading-relaxed text-slate-500">
            This is an independent analysis publication not officially affiliated with or endorsed by the NFL or the Cincinnati Bengals.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Bengals Origins. All rights reserved.
      </div>
    </footer>
  );
}