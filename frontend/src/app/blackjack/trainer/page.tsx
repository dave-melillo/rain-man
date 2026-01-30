"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Basic Strategy Data (reusing from StrategyChart)
const DEALER_CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A"];

const HARD_STRATEGY: Record<number, Record<number | string, string>> = {
  17: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
  16: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "Rh", 10: "Rh", A: "Rh" },
  15: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "Rh", A: "Rh" },
  14: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  13: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  12: { 2: "H", 3: "H", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  11: { 2: "D", 3: "D", 4: "D", 5: "D", 6: "D", 7: "D", 8: "D", 9: "D", 10: "D", A: "D" },
  10: { 2: "D", 3: "D", 4: "D", 5: "D", 6: "D", 7: "D", 8: "D", 9: "D", 10: "H", A: "H" },
  9: { 2: "H", 3: "D", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  8: { 2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
};

const SOFT_STRATEGY: Record<number, Record<number | string, string>> = {
  20: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
  19: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "Ds", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
  18: { 2: "Ds", 3: "Ds", 4: "Ds", 5: "Ds", 6: "Ds", 7: "S", 8: "S", 9: "H", 10: "H", A: "H" },
  17: { 2: "H", 3: "D", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  16: { 2: "H", 3: "H", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  15: { 2: "H", 3: "H", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  14: { 2: "H", 3: "H", 4: "H", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  13: { 2: "H", 3: "H", 4: "H", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
};

const PAIR_STRATEGY: Record<string, Record<number | string, string>> = {
  "A,A": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "P", 9: "P", 10: "P", A: "P" },
  "10,10": { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
  "9,9": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "S", 8: "P", 9: "P", 10: "S", A: "S" },
  "8,8": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "P", 9: "P", 10: "P", A: "P" },
  "7,7": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", A: "H" },
  "6,6": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  "5,5": { 2: "D", 3: "D", 4: "D", 5: "D", 6: "D", 7: "D", 8: "D", 9: "D", 10: "H", A: "H" },
  "4,4": { 2: "H", 3: "H", 4: "H", 5: "P", 6: "P", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  "3,3": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", A: "H" },
  "2,2": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", A: "H" },
};

const ACTION_NAMES: Record<string, string> = {
  H: "Hit",
  S: "Stand",
  D: "Double Down",
  P: "Split",
  Ds: "Double or Stand",
  Rh: "Surrender or Hit",
};

interface Question {
  type: "hard" | "soft" | "pair";
  playerHand: number | string;
  dealerCard: number | string;
  correctAction: string;
  displayHand: string;
}

function generateQuestion(): Question {
  const types: Array<"hard" | "soft" | "pair"> = ["hard", "soft", "pair"];
  const type = types[Math.floor(Math.random() * types.length)];
  
  let playerHand: number | string;
  let dealerCard: number | string = DEALER_CARDS[Math.floor(Math.random() * DEALER_CARDS.length)];
  let correctAction: string;
  let displayHand: string;
  
  if (type === "hard") {
    const hands = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8];
    playerHand = hands[Math.floor(Math.random() * hands.length)];
    correctAction = HARD_STRATEGY[playerHand][dealerCard];
    displayHand = `Hard ${playerHand}`;
  } else if (type === "soft") {
    const hands = [20, 19, 18, 17, 16, 15, 14, 13];
    playerHand = hands[Math.floor(Math.random() * hands.length)];
    correctAction = SOFT_STRATEGY[playerHand][dealerCard];
    displayHand = `Soft ${playerHand} (A,${playerHand - 11})`;
  } else {
    const pairs = ["A,A", "10,10", "9,9", "8,8", "7,7", "6,6", "5,5", "4,4", "3,3", "2,2"];
    playerHand = pairs[Math.floor(Math.random() * pairs.length)];
    correctAction = PAIR_STRATEGY[playerHand][dealerCard];
    const pairValue = playerHand.split(",")[0];
    displayHand = `Pair of ${pairValue}s`;
  }
  
  return { type, playerHand, dealerCard, correctAction, displayHand };
}

export default function TrainerPage() {
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const actions = ["H", "S", "D", "P", "Ds", "Rh"];

  const handleAnswer = (action: string) => {
    if (showResult) return;
    
    setSelectedAction(action);
    setShowResult(true);
    
    const isCorrect = action === question.correctAction;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setQuestion(generateQuestion());
    setSelectedAction(null);
    setShowResult(false);
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <main className="min-h-screen bg-casino-dark">
      {/* Header */}
      <div className="bg-casino-darker border-b border-casino-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/blackjack" className="text-casino-gold hover:text-casino-gold-dark transition-colors">
            ← Blackjack
          </Link>
          <h1 className="font-semibold text-white">Basic Strategy Trainer</h1>
          <div className="w-20" />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-casino-card border-b border-casino-darker">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-casino-gold">{streak}</div>
              <div className="text-xs text-gray-400">Current Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{score.correct}/{score.total}</div>
              <div className="text-xs text-gray-400">Correct/Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Question Card */}
        <div className="bg-gradient-to-br from-casino-felt to-casino-felt-light rounded-2xl p-8 mb-8 shadow-casino">
          <div className="text-center mb-8">
            <div className="text-sm text-gray-300 mb-4">What's the correct play?</div>
            
            {/* Player Hand */}
            <div className="mb-6">
              <div className="text-gray-400 text-xs mb-2">Your Hand</div>
              <div className="text-4xl font-bold text-white">
                {question.displayHand}
              </div>
            </div>
            
            {/* VS */}
            <div className="text-casino-gold text-xl mb-6">vs</div>
            
            {/* Dealer Card */}
            <div>
              <div className="text-gray-400 text-xs mb-2">Dealer Shows</div>
              <div className="inline-block bg-white rounded-xl px-8 py-6 shadow-lg">
                <div className="text-6xl font-bold text-black">{question.dealerCard}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {actions.map((action) => {
            const isSelected = selectedAction === action;
            const isCorrect = action === question.correctAction;
            const isWrong = showResult && isSelected && !isCorrect;
            const shouldHighlight = showResult && isCorrect;
            
            return (
              <button
                key={action}
                onClick={() => handleAnswer(action)}
                disabled={showResult}
                className={`
                  p-6 rounded-xl font-bold text-lg transition-all
                  ${showResult ? "cursor-not-allowed" : "hover:scale-105 active:scale-95"}
                  ${isWrong 
                    ? "bg-red-600 ring-4 ring-red-400" 
                    : shouldHighlight 
                      ? "bg-green-600 ring-4 ring-green-400" 
                      : isSelected 
                        ? "bg-casino-gold text-black" 
                        : "bg-casino-darker text-white hover:bg-casino-card"}
                `}
              >
                <div className="text-3xl mb-2">
                  {isWrong ? "❌" : shouldHighlight ? "✅" : action}
                </div>
                <div className="text-sm opacity-90">
                  {ACTION_NAMES[action]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className={`rounded-xl p-6 mb-6 ${
            selectedAction === question.correctAction 
              ? "bg-green-900/30 border border-green-600" 
              : "bg-red-900/30 border border-red-600"
          }`}>
            <div className="text-center">
              <div className="text-2xl mb-2">
                {selectedAction === question.correctAction ? "✅ Correct!" : "❌ Not Quite"}
              </div>
              <div className="text-white">
                The correct play is <strong>{ACTION_NAMES[question.correctAction]}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {showResult && (
          <button
            onClick={nextQuestion}
            className="w-full bg-casino-gold hover:bg-casino-gold-dark text-black font-bold py-4 rounded-xl text-lg transition-all hover:shadow-gold"
          >
            Next Question →
          </button>
        )}

        {/* Help Text */}
        {!showResult && (
          <div className="text-center text-gray-400 text-sm">
            Select the mathematically correct action based on basic strategy
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="max-w-2xl mx-auto px-6 py-12 border-t border-casino-card">
        <h3 className="text-lg font-semibold text-white mb-4">💡 Training Tips</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Aim for 90%+ accuracy before hitting the casino floor</li>
          <li>• Focus on dealer up-cards 2-6 (dealer busting range)</li>
          <li>• Soft hands are tricky - remember you can't bust hitting a soft total</li>
          <li>• Always split Aces and 8s, never split 10s and 5s</li>
        </ul>
      </div>
    </main>
  );
}
