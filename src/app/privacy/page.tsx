export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 text-slate-300 space-y-6">
      <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Last updated: October 24, 2026</p>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-300 bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">Information We Collect</h2>
          <p className="text-slate-300">
            Welcome to Bengals Origins. This Privacy Policy outlines how we handle information on our independent analytical publication.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">Google AdSense & Cookies</h2>
          <p className="text-slate-300 mb-2">
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
          </p>
          <p className="text-slate-300">
            Users may opt out of personalized advertising by visiting Ads Settings.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">Contact</h2>
          <p className="text-slate-300">
            If you have any questions about this Privacy Policy, you can reach out via our contact page.
          </p>
        </div>
      </div>
    </main>
  );
}