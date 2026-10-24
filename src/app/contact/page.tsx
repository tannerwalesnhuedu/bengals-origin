export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto py-16 px-4 text-slate-300 space-y-6 text-center">
      <h1 className="text-3xl font-black text-white">Contact Us</h1>
      <p className="text-sm text-slate-400">
        Have questions, feedback, or corrections regarding our Bengals breakdowns? Reach out to us directly!
      </p>
      
      <div className="bg-[#0b0f19] border border-slate-800 p-8 rounded-2xl shadow-xl space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-[#FB4F14]">Direct Support Email</p>
        <p className="text-lg font-bold text-white">support@bengalsorigins.com</p>
      </div>
    </main>
  );
}