export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-black text-white">Terms of Service</h1>
      <p className="text-xs text-slate-400">Last updated: October 24, 2026</p>
      
      <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6 text-sm leading-relaxed text-slate-300">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">1. Introduction</h2>
          <p>
            Our aim is to keep this Agreement as readable as possible, but in some cases for legal reasons, some of the language is required "legalese". This document governs your access to and use of Bengals Origins.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">2. User Submissions & Conduct</h2>
          <p>
            You are responsible for your use of the website and any content you provide. You agree not to post inappropriate, offensive, or harmful material.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property</h2>
          <p>
            The website and its entire contents are owned by Bengals Origins and protected by intellectual property laws.
          </p>
        </div>
      </div>
    </main>
  );
}