export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 text-slate-300 space-y-6">
      <h1 className="text-3xl font-black text-white">Terms of Service</h1>
      
      <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl min-h-400">
        {/* Enzuzo Embed Script Container */}
        <div id="__enzuzo-root"></div>
        <script 
          id="__enzuzo-root-script" 
          src="https://app.enzuzo.com/scripts/tos/a1bc0cd4-cff3-11f1-8fcb-23754500e546" 
          async
        ></script>
      </div>
    </main>
  );
}