import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-10 bg-[#fdfbf7] min-h-screen text-slate-900">
      
      {/* Header Section */}
      <section className="space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm text-xs font-extrabold text-[#FB4F14] uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#FB4F14]"></span>
          About Havoc Shift
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Unfiltered Fan Perspectives. Cincinnati Roots.
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Welcome to Havoc Shift—your go-to spot for honest Bengals breakdowns, massive league-wide storylines, game-day reactions, and real football passion.
        </p>
      </section>

      {/* Main Content Card */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
        
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-slate-900">Our Story</h2>
          <p className="text-slate-600 leading-relaxed">
            Football is better when the conversation is real. Havoc Shift started with a simple goal: to cut through the generic sports noise and deliver unfiltered, passionate football coverage straight from the fan perspective.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Rooted in Cincinnati and locked into the pulse of the entire league, we break down everything from Sunday-wide NFL reactions and AFC North rivalry clashes to roster moves, draft strategy, and the best gear to survive a freezing December game at Paycor Stadium.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-slate-900">What We Cover</h2>
          <ul className="space-y-2.5 text-slate-600 list-disc pl-5 leading-relaxed">
            <li>
              <strong className="text-slate-900">Bengals Jungle:</strong> Deep dives, game previews, trade rumors, and honest reactions to every snap in Cincinnati.
            </li>
            <li>
              <strong className="text-slate-900">AFC North:</strong> Keeping tabs on the toughest division in football—from Pittsburgh and Baltimore to Cleveland.
            </li>
            <li>
              <strong className="text-slate-900">Around the NFL:</strong> The biggest storylines, quarterback shakeups, and Sunday reactions from across the league.
            </li>
            <li>
              <strong className="text-slate-900">Fan Gear:</strong> Practical buying guides, jersey comparisons, and cold-weather stadium tips so you don&apos;t waste money on the wrong gear.
            </li>
            <li>
              <strong className="text-slate-900">The Fan Lounge:</strong> Unfiltered takes, tailgate culture, and the debates every football fan is having.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-slate-900">How We Operate (Transparency &amp; Disclosures)</h2>
          <p className="text-slate-600 leading-relaxed">
            Havoc Shift is an independent, fan-powered publication and is not officially affiliated with the NFL or the Cincinnati Bengals. To keep the lights on and the takes coming, some of our Fan Gear guides and articles include affiliate links. If you buy something through those links, we may earn a small commission at no extra cost to you—we only recommend gear we&apos;d actually wear on game day.
          </p>
        </div>

        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h2 className="text-2xl font-black text-slate-900">Get in Touch</h2>
          <p className="text-slate-600 leading-relaxed">
            Have a tip, a hot take, or a partnership inquiry? Reach out anytime via our Contact Us page.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-block font-extrabold text-xs text-white bg-[#FB4F14] hover:bg-orange-600 px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              Contact Us →
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}