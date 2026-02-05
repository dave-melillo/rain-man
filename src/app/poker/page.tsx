"use client";

import { useState } from "react";
import Link from "next/link";

interface PokerHand {
  rank: number;
  name: string;
  description: string;
  example: string;
  probability: string;
  cards: string[];
}

const POKER_HANDS: PokerHand[] = [
  {
    rank: 1,
    name: "Royal Flush",
    description: "A, K, Q, J, 10, all the same suit",
    example: "A♠ K♠ Q♠ J♠ 10♠",
    probability: "0.00015% (1 in 649,740)",
    cards: ["A♠", "K♠", "Q♠", "J♠", "10♠"],
  },
  {
    rank: 2,
    name: "Straight Flush",
    description: "Five cards in sequence, all of the same suit",
    example: "9♥ 8♥ 7♥ 6♥ 5♥",
    probability: "0.00139% (1 in 72,193)",
    cards: ["9♥", "8♥", "7♥", "6♥", "5♥"],
  },
  {
    rank: 3,
    name: "Four of a Kind",
    description: "Four cards of the same rank",
    example: "Q♣ Q♦ Q♥ Q♠ 3♦",
    probability: "0.024% (1 in 4,165)",
    cards: ["Q♣", "Q♦", "Q♥", "Q♠", "3♦"],
  },
  {
    rank: 4,
    name: "Full House",
    description: "Three of a kind plus a pair",
    example: "8♠ 8♦ 8♣ K♥ K♦",
    probability: "0.144% (1 in 694)",
    cards: ["8♠", "8♦", "8♣", "K♥", "K♦"],
  },
  {
    rank: 5,
    name: "Flush",
    description: "Five cards of the same suit, not in sequence",
    example: "K♦ J♦ 8♦ 5♦ 3♦",
    probability: "0.197% (1 in 508)",
    cards: ["K♦", "J♦", "8♦", "5♦", "3♦"],
  },
  {
    rank: 6,
    name: "Straight",
    description: "Five cards in sequence, different suits",
    example: "7♣ 6♠ 5♥ 4♦ 3♣",
    probability: "0.392% (1 in 255)",
    cards: ["7♣", "6♠", "5♥", "4♦", "3♣"],
  },
  {
    rank: 7,
    name: "Three of a Kind",
    description: "Three cards of the same rank",
    example: "J♥ J♣ J♦ 7♠ 4♣",
    probability: "2.11% (1 in 47)",
    cards: ["J♥", "J♣", "J♦", "7♠", "4♣"],
  },
  {
    rank: 8,
    name: "Two Pair",
    description: "Two different pairs",
    example: "10♠ 10♥ 6♣ 6♦ A♠",
    probability: "4.75% (1 in 21)",
    cards: ["10♠", "10♥", "6♣", "6♦", "A♠"],
  },
  {
    rank: 9,
    name: "One Pair",
    description: "Two cards of the same rank",
    example: "9♦ 9♠ A♣ J♥ 4♦",
    probability: "42.26% (1 in 2.4)",
    cards: ["9♦", "9♠", "A♣", "J♥", "4♦"],
  },
  {
    rank: 10,
    name: "High Card",
    description: "No matching cards - highest card plays",
    example: "A♣ K♦ 8♠ 5♥ 2♣",
    probability: "50.12% (1 in 2)",
    cards: ["A♣", "K♦", "8♠", "5♥", "2♣"],
  },
];

function CardDisplay({ cards }: { cards: string[] }) {
  const getSuitColor = (card: string) => {
    if (card.includes("♥") || card.includes("♦")) return "text-red-500";
    return "text-gray-900";
  };

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg px-3 py-4 shadow-lg min-w-[3rem] text-center"
        >
          <div className={`text-2xl font-bold ${getSuitColor(card)}`}>
            {card}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PokerPage() {
  const [selectedHand, setSelectedHand] = useState<PokerHand | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  return (
    <main className="min-h-screen bg-casino-dark">
      {/* Header */}
      <div className="bg-casino-darker border-b border-casino-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-casino-gold hover:text-casino-gold-dark transition-colors">
            ← Back to Games
          </Link>
          <div className="flex gap-3">
            <Link
              href="/poker/odds"
              className="bg-casino-gold hover:bg-casino-gold-dark text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Pot Odds Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-felt-texture opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-4">♠️</div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Poker
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master hand rankings, position strategy, and pot odds. 
            More skill than luck.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="#rankings"
            className="bg-gradient-to-r from-casino-felt to-casino-felt-light hover:shadow-casino p-6 rounded-xl transition-all hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">🃏</div>
            <h3 className="text-xl font-semibold text-white mb-2">Hand Rankings</h3>
            <p className="text-gray-300 text-sm">
              Learn the 10 poker hands from Royal Flush to High Card
            </p>
          </Link>
          
          <Link
            href="/poker/odds"
            className="bg-casino-darker hover:bg-casino-card p-6 rounded-xl transition-all hover:-translate-y-1 border-2 border-casino-gold"
          >
            <div className="text-3xl mb-3">🧮</div>
            <h3 className="text-xl font-semibold text-white mb-2">Pot Odds Calculator</h3>
            <p className="text-gray-300 text-sm">
              Calculate if a call is profitable based on pot odds vs hand equity
            </p>
          </Link>
        </div>
      </div>

      {/* Hand Rankings */}
      <div id="rankings" className="max-w-6xl mx-auto px-6 py-12 border-t border-casino-card">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Poker Hand Rankings
        </h2>
        
        <div className="space-y-4">
          {POKER_HANDS.map((hand) => (
            <button
              key={hand.rank}
              onClick={() => setSelectedHand(selectedHand?.rank === hand.rank ? null : hand)}
              className={`w-full text-left bg-casino-darker hover:bg-casino-card p-6 rounded-xl transition-all border-2 ${
                selectedHand?.rank === hand.rank 
                  ? "border-casino-gold" 
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-casino-gold text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
                    {hand.rank}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{hand.name}</h3>
                    <p className="text-sm text-gray-400">{hand.description}</p>
                  </div>
                </div>
                <div className="text-casino-gold text-2xl">
                  {selectedHand?.rank === hand.rank ? "−" : "+"}
                </div>
              </div>
              
              {selectedHand?.rank === hand.rank && (
                <div className="mt-6 pt-6 border-t border-casino-card space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-3">Example Hand:</div>
                    <CardDisplay cards={hand.cards} />
                  </div>
                  
                  <div className="bg-casino-card rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Probability</div>
                    <div className="text-lg font-semibold text-white">{hand.probability}</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Position Guide */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-casino-card">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🎯 Position is Power
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-red-400 mb-3 text-lg">Early Position</h3>
            <p className="text-gray-300 text-sm mb-4">
              First to act. Play tight - only premium hands (AA, KK, QQ, AK).
            </p>
            <div className="text-xs text-gray-500">
              Seats: UTG, UTG+1
            </div>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-yellow-400 mb-3 text-lg">Middle Position</h3>
            <p className="text-gray-300 text-sm mb-4">
              Moderate action. Expand range slightly - add suited connectors, pairs 8+.
            </p>
            <div className="text-xs text-gray-500">
              Seats: MP, MP+1
            </div>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-green-400 mb-3 text-lg">Late Position</h3>
            <p className="text-gray-300 text-sm mb-4">
              Last to act. Play wider - you have information advantage. Steal blinds.
            </p>
            <div className="text-xs text-gray-500">
              Seats: CO, Button, SB, BB
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-casino-card">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          🧠 Key Poker Concepts
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">Pot Odds</h3>
            <p className="text-gray-300 text-sm">
              Ratio of pot size to call amount. If pot is $100 and you need to call $20, 
              you're getting 5:1 pot odds. Compare to your hand odds to decide if calling is profitable.
            </p>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">Implied Odds</h3>
            <p className="text-gray-300 text-sm">
              Future money you can win if you hit your hand. If you're drawing to a flush, 
              consider how much more you can extract from opponents on later streets.
            </p>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">Expected Value (EV)</h3>
            <p className="text-gray-300 text-sm">
              Average amount you win/lose per decision over time. +EV decisions make money long-term, 
              even if individual hands lose. Always choose the +EV play.
            </p>
          </div>
          
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">Tight-Aggressive (TAG)</h3>
            <p className="text-gray-300 text-sm">
              The winning strategy for most players. Play fewer hands (tight) but bet/raise 
              aggressively when you do play. Avoid passive calling.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-casino-card mb-12">
        <h3 className="text-xl font-semibold text-white mb-6 text-center">💡 Pro Tips</h3>
        <div className="bg-gradient-to-r from-casino-felt to-casino-felt-light rounded-xl p-6">
          <ul className="space-y-3 text-gray-200">
            <li>• <strong className="text-white">Fold most hands</strong> - even pros fold 70-80% of hands</li>
            <li>• <strong className="text-white">Position &gt; Cards</strong> - a mediocre hand in position beats a good hand out of position</li>
            <li>• <strong className="text-white">Bet for value or bluff</strong> - passive calling is usually -EV</li>
            <li>• <strong className="text-white">Don't chase draws without odds</strong> - math doesn't lie</li>
            <li>• <strong className="text-white">Study GTO (Game Theory Optimal)</strong> - but exploit weak opponents when you spot them</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
