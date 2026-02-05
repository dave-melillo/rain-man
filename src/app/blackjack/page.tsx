import Link from "next/link";

const features = [
  {
    name: "Strategy Chart",
    description: "Interactive basic strategy lookup - tap your hand and dealer's card",
    href: "/blackjack/strategy",
    icon: "📊",
    primary: true,
  },
  {
    name: "Trainer",
    description: "Practice mode with flashcards - track your accuracy",
    href: "/blackjack/trainer",
    icon: "🎯",
    primary: false,
  },
  {
    name: "Card Counting",
    description: "Hi-Lo system introduction - coming soon",
    href: "#",
    icon: "🧮",
    primary: false,
    disabled: true,
  },
];

export default function BlackjackPage() {
  return (
    <main className="min-h-screen bg-casino-dark">
      {/* Header */}
      <div className="bg-casino-darker border-b border-casino-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-casino-gold hover:text-casino-gold-dark transition-colors">
            ← Back to Games
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-felt-texture opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-4">🃏</div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Blackjack
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master basic strategy and reduce the house edge to under 0.5%. 
            The mathematically correct play for every situation.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid gap-6">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.disabled ? "#" : feature.href}
              className={`group relative overflow-hidden rounded-xl p-6 transition-all ${
                feature.disabled 
                  ? "bg-casino-darker/50 cursor-not-allowed opacity-50" 
                  : feature.primary
                    ? "bg-gradient-to-r from-casino-felt to-casino-felt-light hover:shadow-casino hover:-translate-y-1"
                    : "bg-casino-darker hover:bg-casino-card hover:-translate-y-1"
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="text-4xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                    {feature.name}
                    {feature.disabled && (
                      <span className="text-xs bg-casino-card px-2 py-1 rounded text-gray-400">
                        Coming Soon
                      </span>
                    )}
                    {feature.primary && (
                      <span className="text-xs bg-casino-gold text-black px-2 py-1 rounded">
                        Start Here
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
                {!feature.disabled && (
                  <div className="text-casino-gold text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="max-w-4xl mx-auto px-6 py-12 border-t border-casino-card">
        <h2 className="text-2xl font-semibold text-white mb-6">Quick Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-casino-darker rounded-lg p-4">
            <h3 className="font-semibold text-casino-gold mb-2">Always Split</h3>
            <p className="text-gray-400 text-sm">Aces and 8s - no matter what the dealer shows.</p>
          </div>
          <div className="bg-casino-darker rounded-lg p-4">
            <h3 className="font-semibold text-casino-gold mb-2">Never Split</h3>
            <p className="text-gray-400 text-sm">10s and 5s - you already have a strong hand or starting double.</p>
          </div>
          <div className="bg-casino-darker rounded-lg p-4">
            <h3 className="font-semibold text-casino-red mb-2">Dealer 2-6</h3>
            <p className="text-gray-400 text-sm">Dealer is "weak" - they must hit and are likely to bust.</p>
          </div>
          <div className="bg-casino-darker rounded-lg p-4">
            <h3 className="font-semibold text-casino-blue mb-2">Dealer 7-A</h3>
            <p className="text-gray-400 text-sm">Dealer is "strong" - assume they have a 10 underneath.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
