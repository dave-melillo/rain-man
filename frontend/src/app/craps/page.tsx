"use client";

import { useState } from "react";
import Link from "next/link";

interface Bet {
  name: string;
  houseEdge: number;
  description: string;
  recommendation: "good" | "okay" | "bad";
  payout: string;
}

const CRAPS_BETS: Bet[] = [
  {
    name: "Pass Line",
    houseEdge: 1.41,
    description: "Bet the shooter will win. Best basic bet for beginners.",
    recommendation: "good",
    payout: "1:1",
  },
  {
    name: "Don't Pass",
    houseEdge: 1.36,
    description: "Bet against the shooter. Slightly better odds than Pass Line.",
    recommendation: "good",
    payout: "1:1",
  },
  {
    name: "Pass Line Odds",
    houseEdge: 0,
    description: "Additional bet behind Pass Line after point is set. ZERO house edge!",
    recommendation: "good",
    payout: "2:1, 3:2, 6:5",
  },
  {
    name: "Don't Pass Odds",
    houseEdge: 0,
    description: "Odds bet on Don't Pass. Also zero house edge.",
    recommendation: "good",
    payout: "1:2, 2:3, 5:6",
  },
  {
    name: "Come Bet",
    houseEdge: 1.41,
    description: "Like Pass Line but made after point is set.",
    recommendation: "good",
    payout: "1:1",
  },
  {
    name: "Don't Come",
    houseEdge: 1.36,
    description: "Like Don't Pass but made after point is set.",
    recommendation: "good",
    payout: "1:1",
  },
  {
    name: "Place 6 or 8",
    houseEdge: 1.52,
    description: "Bet that 6 or 8 will roll before 7. Decent house edge.",
    recommendation: "okay",
    payout: "7:6",
  },
  {
    name: "Place 5 or 9",
    houseEdge: 4.0,
    description: "Bet that 5 or 9 rolls before 7. Getting worse.",
    recommendation: "okay",
    payout: "7:5",
  },
  {
    name: "Place 4 or 10",
    houseEdge: 6.67,
    description: "Bet that 4 or 10 rolls before 7. Not great.",
    recommendation: "bad",
    payout: "9:5",
  },
  {
    name: "Field",
    houseEdge: 5.56,
    description: "One-roll bet on 2,3,4,9,10,11,12. Looks tempting, but not worth it.",
    recommendation: "bad",
    payout: "1:1 (2x or 3x on 2,12)",
  },
  {
    name: "Any 7",
    houseEdge: 16.67,
    description: "Bet that next roll is 7. TERRIBLE bet - avoid!",
    recommendation: "bad",
    payout: "4:1",
  },
  {
    name: "Hardways (6,8)",
    houseEdge: 9.09,
    description: "Bet on 3-3 or 4-4 before 7 or easy way. Sucker bet.",
    recommendation: "bad",
    payout: "9:1",
  },
  {
    name: "Hardways (4,10)",
    houseEdge: 11.11,
    description: "Bet on 2-2 or 5-5 before 7 or easy way. Worse sucker bet.",
    recommendation: "bad",
    payout: "7:1",
  },
  {
    name: "Any Craps",
    houseEdge: 11.11,
    description: "Bet on 2, 3, or 12 on next roll. Don't do it.",
    recommendation: "bad",
    payout: "7:1",
  },
  {
    name: "Big 6/8",
    houseEdge: 9.09,
    description: "Same as Place 6/8 but worse payout. Literally a trap for tourists.",
    recommendation: "bad",
    payout: "1:1",
  },
];

export default function CrapsPage() {
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [sortBy, setSortBy] = useState<"houseEdge" | "name">("houseEdge");

  const sortedBets = [...CRAPS_BETS].sort((a, b) => {
    if (sortBy === "houseEdge") {
      return a.houseEdge - b.houseEdge;
    }
    return a.name.localeCompare(b.name);
  });

  const getBadgeColor = (rec: string) => {
    switch (rec) {
      case "good": return "bg-green-600";
      case "okay": return "bg-yellow-600";
      case "bad": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getBadgeText = (rec: string) => {
    switch (rec) {
      case "good": return "✓ GOOD BET";
      case "okay": return "~ OKAY";
      case "bad": return "✗ AVOID";
      default: return "";
    }
  };

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
          <div className="text-6xl mb-4">🎲</div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Craps
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The most exciting game in the casino. Also the most confusing. 
            Here's which bets are smart and which are traps.
          </p>
        </div>
      </div>

      {/* Strategy Summary */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-casino-felt to-casino-felt-light rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🎯 Optimal Craps Strategy (TL;DR)
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">1️⃣</div>
              <div className="font-semibold text-white mb-1">Bet Pass Line</div>
              <div className="text-sm text-gray-300">Only 1.41% house edge</div>
            </div>
            <div>
              <div className="text-3xl mb-2">2️⃣</div>
              <div className="font-semibold text-white mb-1">Take Full Odds</div>
              <div className="text-sm text-gray-300">0% house edge - best bet in the casino</div>
            </div>
            <div>
              <div className="text-3xl mb-2">3️⃣</div>
              <div className="font-semibold text-white mb-1">Ignore Everything Else</div>
              <div className="text-sm text-gray-300">Center bets are sucker bets</div>
            </div>
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">All Craps Bets</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("houseEdge")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "houseEdge"
                  ? "bg-casino-gold text-black"
                  : "bg-casino-darker text-gray-300 hover:bg-casino-card"
              }`}
            >
              By House Edge
            </button>
            <button
              onClick={() => setSortBy("name")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "name"
                  ? "bg-casino-gold text-black"
                  : "bg-casino-darker text-gray-300 hover:bg-casino-card"
              }`}
            >
              Alphabetical
            </button>
          </div>
        </div>

        {/* Bets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {sortedBets.map((bet) => (
            <button
              key={bet.name}
              onClick={() => setSelectedBet(bet)}
              className={`text-left bg-casino-darker hover:bg-casino-card p-5 rounded-xl transition-all hover:-translate-y-1 border-2 ${
                selectedBet?.name === bet.name 
                  ? "border-casino-gold" 
                  : "border-transparent"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white text-lg">{bet.name}</h3>
                <span className={`text-xs px-2 py-1 rounded font-semibold ${getBadgeColor(bet.recommendation)}`}>
                  {getBadgeText(bet.recommendation)}
                </span>
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-400">House Edge</div>
                <div className={`text-2xl font-bold ${
                  bet.houseEdge === 0 
                    ? "text-green-400" 
                    : bet.houseEdge < 2 
                      ? "text-casino-gold" 
                      : bet.houseEdge < 7 
                        ? "text-orange-400" 
                        : "text-red-400"
                }`}>
                  {bet.houseEdge === 0 ? "0%" : `${bet.houseEdge}%`}
                </div>
              </div>
              <div className="text-sm text-gray-300 mb-2">
                Payout: <span className="font-semibold text-white">{bet.payout}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {bet.description}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Bet Detail */}
        {selectedBet && (
          <div className="bg-casino-card rounded-xl p-8 border-2 border-casino-gold">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedBet.name}</h3>
                <span className={`text-sm px-3 py-1 rounded font-semibold ${getBadgeColor(selectedBet.recommendation)}`}>
                  {getBadgeText(selectedBet.recommendation)}
                </span>
              </div>
              <button
                onClick={() => setSelectedBet(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">House Edge</div>
                <div className={`text-4xl font-bold ${
                  selectedBet.houseEdge === 0 
                    ? "text-green-400" 
                    : selectedBet.houseEdge < 2 
                      ? "text-casino-gold" 
                      : selectedBet.houseEdge < 7 
                        ? "text-orange-400" 
                        : "text-red-400"
                }`}>
                  {selectedBet.houseEdge === 0 ? "0%" : `${selectedBet.houseEdge}%`}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Payout</div>
                <div className="text-4xl font-bold text-white">{selectedBet.payout}</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {selectedBet.description}
            </p>
            
            {selectedBet.houseEdge === 0 && (
              <div className="mt-4 bg-green-900/30 border border-green-600 rounded-lg p-4">
                <div className="font-semibold text-green-400 mb-1">🎉 Zero House Edge!</div>
                <div className="text-sm text-gray-300">
                  This is the best bet in the entire casino. Always max out your odds when possible.
                </div>
              </div>
            )}
            
            {selectedBet.houseEdge > 10 && (
              <div className="mt-4 bg-red-900/30 border border-red-600 rounded-lg p-4">
                <div className="font-semibold text-red-400 mb-1">⚠️ Sucker Bet Warning</div>
                <div className="text-sm text-gray-300">
                  The casino loves when you make this bet. Skip it and stick to Pass/Don't Pass + Odds.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Craps 101 */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-casino-card">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">🎓 Craps 101</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">How the Game Works</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Shooter rolls two dice - you bet on the outcome</li>
              <li>• Come-out roll: 7 or 11 wins, 2, 3, or 12 loses (Pass Line)</li>
              <li>• Any other number becomes the "point"</li>
              <li>• Shooter tries to roll the point again before rolling a 7</li>
            </ul>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">Why Odds Bets Are Magic</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Only bet in the casino with 0% house edge</li>
              <li>• Made after the point is established</li>
              <li>• Pays true odds based on probability</li>
              <li>• Always bet max odds if your bankroll allows</li>
            </ul>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">Pass vs Don't Pass</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Pass Line: betting WITH the shooter (1.41% edge)</li>
              <li>• Don't Pass: betting AGAINST the shooter (1.36% edge)</li>
              <li>• Don't Pass is slightly better mathematically</li>
              <li>• But you'll look like a jerk when everyone loses</li>
            </ul>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">Avoid the Center</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Center table bets (hardways, any 7) are TRAPS</li>
              <li>• House edge ranges from 9% to 17% - absolutely terrible</li>
              <li>• They're designed to look exciting and pay big</li>
              <li>• Stick to the pass line and odds - you'll save hundreds</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
