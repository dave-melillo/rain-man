"use client";

import { useState } from "react";
import Link from "next/link";

export default function PotOddsPage() {
  const [potSize, setPotSize] = useState<string>("100");
  const [callAmount, setCallAmount] = useState<string>("20");
  const [outs, setOuts] = useState<string>("9");
  const [street, setStreet] = useState<"flop" | "turn">("flop");

  const pot = parseFloat(potSize) || 0;
  const call = parseFloat(callAmount) || 0;
  const numOuts = parseInt(outs) || 0;

  // Calculate pot odds
  const totalPot = pot + call;
  const potOddsRatio = call > 0 ? totalPot / call : 0;
  const potOddsPercentage = call > 0 ? (call / totalPot) * 100 : 0;

  // Calculate hand odds (approximation using Rule of 2 and 4)
  // Flop to turn or turn to river: outs * 2
  // Flop to river: outs * 4
  const cardsToSee = street === "flop" ? 2 : 1;
  const handOddsPercentage = numOuts * cardsToSee * 2;
  
  // More accurate calculation
  const unknownCards = street === "flop" ? 47 : 46;
  const exactHandOdds = (numOuts / unknownCards) * 100;
  const exactHandOddsToRiver = street === "flop" 
    ? (1 - ((unknownCards - numOuts) / unknownCards) * ((unknownCards - 1 - numOuts) / (unknownCards - 1))) * 100
    : exactHandOdds;

  // Determine if call is profitable
  const isProfitable = exactHandOddsToRiver > potOddsPercentage;
  
  // Expected Value calculation
  const ev = isProfitable 
    ? ((exactHandOddsToRiver / 100) * totalPot) - call
    : ((exactHandOddsToRiver / 100) * totalPot) - call;

  // Common drawing hands
  const commonDraws = [
    { name: "Flush Draw", outs: 9, description: "4 cards to flush on flop" },
    { name: "Open-Ended Straight Draw", outs: 8, description: "8 cards complete straight" },
    { name: "Gutshot Straight Draw", outs: 4, description: "4 cards complete inside straight" },
    { name: "Two Overcards", outs: 6, description: "6 outs to top pair" },
    { name: "Flush + Straight Draw", outs: 15, description: "Monster draw combo" },
    { name: "Set to Full House", outs: 7, description: "On the turn with set" },
  ];

  return (
    <main className="min-h-screen bg-casino-dark">
      {/* Header */}
      <div className="bg-casino-darker border-b border-casino-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/poker" className="text-casino-gold hover:text-casino-gold-dark transition-colors">
            ← Poker
          </Link>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          Pot Odds Calculator
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Determine if your draw is profitable by comparing pot odds to hand odds.
        </p>
      </div>

      {/* Calculator */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-br from-casino-felt to-casino-felt-light rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pot Size ($)
                </label>
                <input
                  type="number"
                  value={potSize}
                  onChange={(e) => setPotSize(e.target.value)}
                  className="w-full bg-casino-dark text-white px-4 py-3 rounded-lg border-2 border-casino-card focus:border-casino-gold outline-none text-lg"
                  placeholder="100"
                  min="0"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount to Call ($)
                </label>
                <input
                  type="number"
                  value={callAmount}
                  onChange={(e) => setCallAmount(e.target.value)}
                  className="w-full bg-casino-dark text-white px-4 py-3 rounded-lg border-2 border-casino-card focus:border-casino-gold outline-none text-lg"
                  placeholder="20"
                  min="0"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Outs
                </label>
                <input
                  type="number"
                  value={outs}
                  onChange={(e) => setOuts(e.target.value)}
                  className="w-full bg-casino-dark text-white px-4 py-3 rounded-lg border-2 border-casino-card focus:border-casino-gold outline-none text-lg"
                  placeholder="9"
                  min="0"
                  max="47"
                  step="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Street
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStreet("flop")}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      street === "flop"
                        ? "bg-casino-gold text-black"
                        : "bg-casino-dark text-gray-300 hover:bg-casino-card"
                    }`}
                  >
                    Flop
                  </button>
                  <button
                    onClick={() => setStreet("turn")}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      street === "turn"
                        ? "bg-casino-gold text-black"
                        : "bg-casino-dark text-gray-300 hover:bg-casino-card"
                    }`}
                  >
                    Turn
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <div className="bg-casino-dark rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-2">Pot Odds</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {potOddsRatio.toFixed(1)}:1
                </div>
                <div className="text-sm text-gray-400">
                  ({potOddsPercentage.toFixed(1)}% of pot)
                </div>
              </div>

              <div className="bg-casino-dark rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-2">Hand Odds ({street === "flop" ? "to river" : "to river"})</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {exactHandOddsToRiver.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">
                  ~{((100 - exactHandOddsToRiver) / exactHandOddsToRiver).toFixed(1)}:1 against
                </div>
              </div>

              <div className={`rounded-xl p-6 border-2 ${
                isProfitable 
                  ? "bg-green-900/30 border-green-600" 
                  : "bg-red-900/30 border-red-600"
              }`}>
                <div className="text-sm text-gray-300 mb-2">Decision</div>
                <div className="text-2xl font-bold text-white mb-2">
                  {isProfitable ? "✅ CALL" : "❌ FOLD"}
                </div>
                <div className="text-sm text-gray-300">
                  Expected Value: <span className={isProfitable ? "text-green-400" : "text-red-400"}>
                    ${ev.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-casino-dark rounded-xl p-6 mt-6">
            <h3 className="font-semibold text-white mb-3">📖 What This Means</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <strong>Pot Odds:</strong> You need to call ${call.toFixed(0)} to win ${totalPot.toFixed(0)}. 
                That's {potOddsRatio.toFixed(1)}:1 pot odds.
              </p>
              <p>
                <strong>Hand Odds:</strong> With {numOuts} outs on the {street}, you have a {exactHandOddsToRiver.toFixed(1)}% 
                chance to hit your hand {street === "flop" ? "by the river" : "on the river"}.
              </p>
              <p>
                <strong>The Math:</strong> {isProfitable 
                  ? `Your ${exactHandOddsToRiver.toFixed(1)}% hand odds are BETTER than the ${potOddsPercentage.toFixed(1)}% pot odds require, making this call profitable long-term.`
                  : `Your ${exactHandOddsToRiver.toFixed(1)}% hand odds are WORSE than the ${potOddsPercentage.toFixed(1)}% pot odds require, making this call unprofitable long-term.`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Common Draws Reference */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Common Drawing Hands</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {commonDraws.map((draw) => (
              <button
                key={draw.name}
                onClick={() => setOuts(draw.outs.toString())}
                className="text-left bg-casino-darker hover:bg-casino-card p-5 rounded-xl transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{draw.name}</h3>
                  <span className="bg-casino-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                    {draw.outs} outs
                  </span>
                </div>
                <p className="text-sm text-gray-400">{draw.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Guide Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">🎯 How to Count Outs</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>Out:</strong> a card that will improve your hand to likely best</li>
              <li>• <strong>Flush draw:</strong> 9 remaining cards of your suit</li>
              <li>• <strong>Straight draw (open-ended):</strong> 8 cards complete it</li>
              <li>• <strong>Gutshot:</strong> only 4 cards fill the inside straight</li>
              <li>• Be careful of "dirty outs" that may give opponent a better hand</li>
            </ul>
          </div>

          <div className="bg-casino-darker rounded-xl p-6">
            <h3 className="font-semibold text-casino-gold mb-3">🧮 Quick Mental Math</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>Rule of 2:</strong> Multiply outs by 2 for one card (turn or river)</li>
              <li>• <strong>Rule of 4:</strong> Multiply outs by 4 from flop to river</li>
              <li>• <strong>Example:</strong> 9 outs × 4 = ~36% equity flop to river</li>
              <li>• This is slightly high for many outs, but close enough at the table</li>
            </ul>
          </div>
        </div>

        {/* Advanced Tip */}
        <div className="mt-6 bg-gradient-to-r from-casino-felt to-casino-felt-light rounded-xl p-6">
          <h3 className="font-semibold text-white mb-3">💡 Don't Forget Implied Odds</h3>
          <p className="text-gray-300 text-sm">
            This calculator uses <strong>pot odds</strong>, but in real games you should also consider <strong>implied odds</strong> — 
            the additional money you can win on future streets if you hit your hand. 
            If your opponent has a big stack and is likely to pay you off, you can sometimes call with 
            slightly worse immediate pot odds. Conversely, if the board is scary and you won't get paid, 
            your implied odds are reduced.
          </p>
        </div>
      </div>
    </main>
  );
}
