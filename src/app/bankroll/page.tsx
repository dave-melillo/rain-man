"use client";

import { useState } from "react";
import Link from "next/link";

export default function BankrollPage() {
  const [totalBankroll, setTotalBankroll] = useState<string>("1000");
  const [gameType, setGameType] = useState<"blackjack" | "poker" | "craps">("blackjack");
  const [sessionLength, setSessionLength] = useState<string>("3");
  const [riskTolerance, setRiskTolerance] = useState<"conservative" | "moderate" | "aggressive">("moderate");

  const bankroll = parseFloat(totalBankroll) || 0;
  const hours = parseFloat(sessionLength) || 0;

  // Risk of Ruin parameters (simplified)
  const riskMultipliers = {
    conservative: 0.02, // 2% of bankroll per session
    moderate: 0.05,     // 5% of bankroll per session
    aggressive: 0.10,   // 10% of bankroll per session
  };

  const sessionBankroll = bankroll * riskMultipliers[riskTolerance];

  // Game-specific recommendations
  const gameParams: Record<string, { minBet: number; avgBet: number; handsPerHour: number; houseEdge: number }> = {
    blackjack: { minBet: 10, avgBet: 15, handsPerHour: 60, houseEdge: 0.5 },
    poker: { minBet: 20, avgBet: 50, handsPerHour: 30, houseEdge: 0 }, // Rake not included
    craps: { minBet: 10, avgBet: 15, handsPerHour: 100, houseEdge: 1.4 },
  };

  const params = gameParams[gameType];
  const recommendedMinBet = sessionBankroll / 100; // 100 bets per session
  const expectedHands = hours * params.handsPerHour;
  const expectedLoss = sessionBankroll * (params.houseEdge / 100);

  // Win/loss targets
  const winGoal = sessionBankroll * 0.5; // 50% profit target
  const stopLoss = sessionBankroll * 0.5; // Stop if down 50%

  // Variance calculations (simplified standard deviation)
  const stdDevPerBet = 1.1; // Rough estimate for casino games
  const sessionStdDev = Math.sqrt(expectedHands) * stdDevPerBet * params.avgBet;
  const likely95Range = sessionStdDev * 1.96; // 95% confidence interval

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
          <div className="text-6xl mb-4">💰</div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Bankroll Manager
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Calculate proper bet sizing and session limits to avoid going broke. 
            The math that keeps you in the game.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Sidebar - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-casino-darker rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Session Details</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Total Bankroll ($)
                  </label>
                  <input
                    type="number"
                    value={totalBankroll}
                    onChange={(e) => setTotalBankroll(e.target.value)}
                    className="w-full bg-casino-dark text-white px-4 py-3 rounded-lg border-2 border-casino-card focus:border-casino-gold outline-none text-lg"
                    placeholder="1000"
                    min="0"
                    step="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Money you can afford to lose gambling
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Game Type
                  </label>
                  <div className="space-y-2">
                    {(["blackjack", "poker", "craps"] as const).map((game) => (
                      <button
                        key={game}
                        onClick={() => setGameType(game)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                          gameType === game
                            ? "bg-casino-gold text-black"
                            : "bg-casino-card text-gray-300 hover:bg-casino-felt"
                        }`}
                      >
                        {game}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Session Length (hours)
                  </label>
                  <input
                    type="number"
                    value={sessionLength}
                    onChange={(e) => setSessionLength(e.target.value)}
                    className="w-full bg-casino-dark text-white px-4 py-3 rounded-lg border-2 border-casino-card focus:border-casino-gold outline-none text-lg"
                    placeholder="3"
                    min="0.5"
                    max="12"
                    step="0.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Risk Tolerance
                  </label>
                  <div className="space-y-2">
                    {(["conservative", "moderate", "aggressive"] as const).map((risk) => (
                      <button
                        key={risk}
                        onClick={() => setRiskTolerance(risk)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                          riskTolerance === risk
                            ? "bg-casino-gold text-black"
                            : "bg-casino-card text-gray-300 hover:bg-casino-felt"
                        }`}
                      >
                        {risk}
                        <span className="text-xs block opacity-75">
                          {risk === "conservative" && "2% per session"}
                          {risk === "moderate" && "5% per session"}
                          {risk === "aggressive" && "10% per session"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main - Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Session Bankroll */}
            <div className="bg-gradient-to-br from-casino-felt to-casino-felt-light rounded-2xl p-8 text-center">
              <div className="text-sm text-gray-300 mb-2">Recommended Session Bankroll</div>
              <div className="text-6xl font-bold text-white mb-4">
                ${sessionBankroll.toFixed(0)}
              </div>
              <p className="text-gray-300 text-sm">
                Bring this much to the casino for a {hours}-hour {gameType} session
              </p>
            </div>

            {/* Bet Sizing */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-casino-darker rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-2">Recommended Min Bet</div>
                <div className="text-4xl font-bold text-white mb-2">
                  ${recommendedMinBet.toFixed(0)}
                </div>
                <p className="text-xs text-gray-400">
                  Allows ~100 bets with your session bankroll
                </p>
              </div>

              <div className="bg-casino-darker rounded-xl p-6">
                <div className="text-sm text-gray-400 mb-2">Expected Hands/Rolls</div>
                <div className="text-4xl font-bold text-white mb-2">
                  {expectedHands.toFixed(0)}
                </div>
                <p className="text-xs text-gray-400">
                  At {params.handsPerHour} per hour for {hours} hours
                </p>
              </div>
            </div>

            {/* Win/Loss Targets */}
            <div className="bg-casino-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">🎯 Session Targets</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-green-400 mb-1">Win Goal</div>
                  <div className="text-3xl font-bold text-white">
                    +${winGoal.toFixed(0)}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Quit when up 50% (${(sessionBankroll + winGoal).toFixed(0)} total)
                  </p>
                </div>
                <div>
                  <div className="text-sm text-red-400 mb-1">Stop Loss</div>
                  <div className="text-3xl font-bold text-white">
                    -${stopLoss.toFixed(0)}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Quit when down 50% (${(sessionBankroll - stopLoss).toFixed(0)} left)
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Value */}
            <div className="bg-casino-darker rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">📊 Expected Results</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">House Edge</span>
                    <span className="text-red-400 font-semibold">{params.houseEdge}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Expected Loss (Math Average)</span>
                    <span className="text-red-400 font-bold">-${expectedLoss.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-casino-card">
                  <div className="text-sm text-gray-400 mb-2">Likely Range (95% confidence)</div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 font-semibold">
                      -${(expectedLoss + likely95Range).toFixed(0)}
                    </span>
                    <span className="text-gray-500">←→</span>
                    <span className="text-green-400 font-semibold">
                      +${(likely95Range - expectedLoss).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Due to variance, your actual result will likely fall in this range
                  </p>
                </div>
              </div>
            </div>

            {/* Kelly Criterion (if applicable) */}
            {gameType === "poker" && (
              <div className="bg-gradient-to-r from-casino-felt to-casino-felt-light rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">♠️ Poker Special: No House Edge</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Unlike casino games, poker has no house edge - you're playing against other players. 
                  Your expected value depends on your skill level.
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• <strong>Winning player:</strong> Positive expectation over time</li>
                  <li>• <strong>Rule of thumb:</strong> 20-30 buy-ins for cash games</li>
                  <li>• <strong>Tournaments:</strong> 100+ buy-ins due to higher variance</li>
                  <li>• <strong>Key:</strong> Move down stakes if you lose 25% of bankroll</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Educational Section */}
        <div className="mt-12 border-t border-casino-card pt-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            💡 Bankroll Management Principles
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-casino-darker rounded-xl p-6">
              <h3 className="font-semibold text-casino-gold mb-3">Risk of Ruin</h3>
              <p className="text-gray-300 text-sm">
                The probability of losing your entire bankroll. By limiting session bankroll to 2-10% 
                of your total, you ensure you can survive bad luck and come back another day.
              </p>
            </div>

            <div className="bg-casino-darker rounded-xl p-6">
              <h3 className="font-semibold text-casino-gold mb-3">The Long Run</h3>
              <p className="text-gray-300 text-sm">
                Casino games have negative expectation. Even with perfect play, you'll lose money 
                over time. Bankroll management extends how long you can play and enjoy the game.
              </p>
            </div>

            <div className="bg-casino-darker rounded-xl p-6">
              <h3 className="font-semibold text-casino-gold mb-3">Discipline Wins</h3>
              <p className="text-gray-300 text-sm">
                The best strategy in the world won't help if you chase losses or bet more than you 
                can afford. Stick to your limits, win or lose. That's the mark of a smart gambler.
              </p>
            </div>
          </div>
        </div>

        {/* The Golden Rules */}
        <div className="mt-8 bg-gradient-to-r from-casino-felt to-casino-felt-light rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4 text-center">🏆 The Golden Rules</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-200">
            <div>
              <strong className="text-white">✓ DO:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Set a bankroll you can afford to lose</li>
                <li>• Take breaks - time away reduces tilt</li>
                <li>• Quit when you hit win/loss limits</li>
                <li>• Track your results honestly</li>
              </ul>
            </div>
            <div>
              <strong className="text-white">✗ DON'T:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Chase losses with bigger bets</li>
                <li>• Gamble with rent/bill money</li>
                <li>• Drink heavily while playing</li>
                <li>• Lie to yourself about being "due"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
