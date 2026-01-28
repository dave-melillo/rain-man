import Link from "next/link";

const games = [
  {
    name: "Blackjack",
    description: "Basic strategy chart & card counting intro",
    href: "/blackjack",
    icon: "🃏",
    color: "from-casino-felt to-emerald-800",
  },
  {
    name: "Craps",
    description: "Bet guide & house edge calculator",
    href: "/craps",
    icon: "🎲",
    color: "from-red-900 to-red-800",
  },
  {
    name: "Poker",
    description: "Hand rankings & pot odds calculator",
    href: "/poker",
    icon: "♠️",
    color: "from-casino-card to-blue-900",
  },
  {
    name: "Bankroll",
    description: "Session planning & risk management",
    href: "/bankroll",
    icon: "💰",
    color: "from-casino-gold/30 to-amber-900",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-casino-dark via-casino-darker to-casino-card" />
        <div className="absolute inset-0 bg-felt-texture opacity-5" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold mb-4">
            <span className="text-gold-gradient">Rain Man</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-2 italic">
            "I'm an excellent driver. I'm also excellent at blackjack."
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Learn to play smarter with math, not luck.
          </p>
          
          {/* Quick access to main feature */}
          <Link
            href="/blackjack/strategy"
            className="inline-flex items-center gap-3 bg-casino-gold hover:bg-casino-gold-dark text-black font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:shadow-gold transform hover:-translate-y-1"
          >
            <span className="text-2xl">🃏</span>
            Blackjack Strategy Chart
            <span className="text-sm opacity-75">→</span>
          </Link>
        </div>
      </div>

      {/* Game Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-white mb-8 text-center">
          Choose Your Game
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <Link
              key={game.name}
              href={game.href}
              className="group relative overflow-hidden rounded-xl bg-casino-darker p-6 transition-all hover:shadow-casino hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative">
                <div className="text-4xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {game.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {game.description}
                </p>
              </div>
              
              <div className="absolute bottom-4 right-4 text-casino-gold opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 border-t border-casino-card">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">Math, Not Luck</h3>
            <p className="text-gray-400 text-sm">
              Every strategy is backed by probability and expected value calculations.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Lookup</h3>
            <p className="text-gray-400 text-sm">
              Find the correct play in under 3 seconds with our interactive charts.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-lg font-semibold text-white mb-2">Learn Why</h3>
            <p className="text-gray-400 text-sm">
              Understand the reasoning behind each decision, not just memorize.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
        <p>"K-Mart sucks. But your casino strategy doesn't have to."</p>
      </footer>
    </main>
  );
}
