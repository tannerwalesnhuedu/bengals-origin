export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last updated: October 24, 2026</p>
      
      <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6 text-sm leading-relaxed text-slate-300">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">Information We Collect</h2>
          <p>
            Welcome to Bengals Origins. This Privacy Policy outlines how we handle information on our independent analytical publication.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">Google AdSense & Cookies</h2>
          <p className="mb-3">
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Ads Settings.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, you can reach out via our contact page.
          </p>
        </div>
      </div>
    </main>
  );
}