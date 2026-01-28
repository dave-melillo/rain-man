import Link from "next/link";
import StrategyChart from "@/components/StrategyChart";
import QuickLookup from "@/components/QuickLookup";

export default function StrategyPage() {
  return (
    <main className="min-h-screen bg-casino-dark">
      {/* Header */}
      <div className="bg-casino-darker border-b border-casino-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blackjack" className="text-casino-gold hover:text-casino-gold-dark transition-colors">
            ← Blackjack
          </Link>
          <h1 className="font-semibold text-white">Basic Strategy Chart</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-3">
            Blackjack Basic Strategy
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The mathematically optimal play for every hand. Use the quick lookup or tap any cell in the chart below.
          </p>
        </div>

        {/* Quick Lookup */}
        <div className="mb-12">
          <QuickLookup />
        </div>

        {/* Chart Component */}
        <StrategyChart />

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">📚 Understanding the Chart</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <strong className="text-white">Hard Totals:</strong> Hands without an Ace, or where the Ace counts as 1 to avoid busting.
              </li>
              <li>
                <strong className="text-white">Soft Totals:</strong> Hands with an Ace that counts as 11 (e.g., A-6 = soft 17).
              </li>
              <li>
                <strong className="text-white">Pairs:</strong> When you have two cards of the same value and can split.
              </li>
            </ul>
          </div>

          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🎯 Common Rules</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <strong className="text-white">Dealer stands on soft 17:</strong> This chart assumes standard rules.
              </li>
              <li>
                <strong className="text-white">Double after split allowed:</strong> You can double down after splitting.
              </li>
              <li>
                <strong className="text-white">Surrender available:</strong> "Rh" means surrender if offered, otherwise hit.
              </li>
            </ul>
          </div>
        </div>

        {/* House Edge Info */}
        <div className="mt-8 bg-gradient-to-r from-casino-felt to-casino-felt-light rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">House Edge with Perfect Basic Strategy</h3>
          <div className="text-4xl font-bold text-casino-gold mb-2">~0.5%</div>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Compared to 2-4% for casual players. Over time, this difference adds up to hundreds or thousands of dollars saved.
          </p>
        </div>
      </div>
    </main>
  );
}
