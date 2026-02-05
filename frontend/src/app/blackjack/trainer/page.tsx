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

interface TypeStats {
  correct: number;
  total: number;
}

interface Mistake {
  question: Question;
  userAction: string;
}

function generateQuestion(mistakes?: Mistake[]): Question {
  // If in review mode and we have mistakes, pick one
  if (mistakes && mistakes.length > 0) {
    const randomMistake = mistakes[Math.floor(Math.random() * mistakes.length)];
    return randomMistake.question;
  }
  
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
  const [reviewMode, setReviewMode] = useState(false);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [question, setQuestion] = useState<Question>(() => generateQuestion());
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [typeStats, setTypeStats] = useState<Record<string, TypeStats>>({
    hard: { correct: 0, total: 0 },
    soft: { correct: 0, total: 0 },
    pair: { correct: 0, total: 0 },
  });
  const [showSummary, setShowSummary] = useState(false);

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
    
    // Update type-specific stats
    setTypeStats(prev => ({
      ...prev,
      [question.type]: {
        correct: prev[question.type].correct + (isCorrect ? 1 : 0),
        total: prev[question.type].total + 1,
      }
    }));
    
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
      
      // If in review mode and answered correctly, remove this mistake
      if (reviewMode) {
        setMistakes(prev => prev.filter(m => 
          !(m.question.displayHand === question.displayHand && 
            m.question.dealerCard === question.dealerCard)
        ));
      }
    } else {
      setStreak(0);
      
      // Add to mistakes if not already there
      if (!reviewMode) {
        const mistakeExists = mistakes.some(m => 
          m.question.displayHand === question.displayHand && 
          m.question.dealerCard === question.dealerCard
        );
        
        if (!mistakeExists) {
          setMistakes(prev => [...prev, { question, userAction: action }]);
        }
      }
    }
  };

  const nextQuestion = () => {
    setQuestion(generateQuestion(reviewMode ? mistakes : undefined));
    setSelectedAction(null);
    setShowResult(false);
  };

  const resetSession = () => {
    setScore({ correct: 0, total: 0 });
    setStreak(0);
    setMaxStreak(0);
    setTypeStats({
      hard: { correct: 0, total: 0 },
      soft: { correct: 0, total: 0 },
      pair: { correct: 0, total: 0 },
    });
    setMistakes([]);
    setReviewMode(false);
    setShowSummary(false);
    setQuestion(generateQuestion());
    setSelectedAction(null);
    setShowResult(false);
  };

  const toggleReviewMode = () => {
    if (mistakes.length === 0 && !reviewMode) {
      alert("No mistakes to review yet! Keep practicing.");
      return;
    }
    
    const newReviewMode = !reviewMode;
    setReviewMode(newReviewMode);
    setQuestion(generateQuestion(newReviewMode ? mistakes : undefined));
    setSelectedAction(null);
    setShowResult(false);
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const getTypeAccuracy = (type: string) => {
    const stats = typeStats[type];
    return stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  };

  // Auto-show summary after 20 questions
  useEffect(() => {
    if (score.total >= 20 && score.total % 20 === 0 && !showSummary) {
      setShowSummary(true);
    }
  }, [score.total, showSummary]);

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
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-casino-gold">{streak}</div>
              <div className="text-xs text-gray-400">Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{maxStreak}</div>
              <div className="text-xs text-gray-400">Best Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{score.correct}/{score.total}</div>
              <div className="text-xs text-gray-400">Correct/Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Toggle & Actions */}
      <div className="max-w-4xl mx-auto px-6 py-4 flex gap-3 flex-wrap">
        <button
          onClick={toggleReviewMode}
          disabled={mistakes.length === 0 && !reviewMode}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            reviewMode 
              ? "bg-orange-600 text-white" 
              : mistakes.length > 0
                ? "bg-casino-card text-white hover:bg-casino-darker"
                : "bg-casino-card/50 text-gray-500 cursor-not-allowed"
          }`}
        >
          {reviewMode ? "📝 Review Mode ON" : `🔍 Review Mistakes (${mistakes.length})`}
        </button>
        
        <button
          onClick={() => setShowSummary(true)}
          disabled={score.total === 0}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            score.total > 0
              ? "bg-casino-card text-white hover:bg-casino-darker"
              : "bg-casino-card/50 text-gray-500 cursor-not-allowed"
          }`}
        >
          📊 View Summary
        </button>
        
        <button
          onClick={resetSession}
          className="px-4 py-2 rounded-lg font-medium text-sm bg-red-900/50 text-red-400 hover:bg-red-900 transition-all"
        >
          🔄 Reset Session
        </button>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-casino-darker rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-casino-card flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Session Summary</h2>
              <button
                onClick={() => setShowSummary(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Overall Stats */}
              <div className="bg-casino-felt rounded-xl p-6">
                <h3 className="text-lg font-semibold text-casino-gold mb-4">Overall Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">{accuracy}%</div>
                    <div className="text-sm text-gray-400">Total Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-casino-gold mb-1">{maxStreak}</div>
                    <div className="text-sm text-gray-400">Best Streak</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">{score.correct}</div>
                    <div className="text-sm text-gray-400">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">{score.total}</div>
                    <div className="text-sm text-gray-400">Total Questions</div>
                  </div>
                </div>
              </div>

              {/* Type Breakdown */}
              <div className="bg-casino-felt rounded-xl p-6">
                <h3 className="text-lg font-semibold text-casino-gold mb-4">Accuracy by Hand Type</h3>
                <div className="space-y-4">
                  {["hard", "soft", "pair"].map(type => {
                    const stats = typeStats[type];
                    const acc = getTypeAccuracy(type);
                    const color = acc >= 90 ? "green" : acc >= 70 ? "yellow" : "red";
                    
                    return (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white capitalize font-medium">
                            {type === "pair" ? "Pairs" : `${type} Totals`}
                          </span>
                          <span className={`text-${color}-400 font-bold`}>
                            {acc}% ({stats.correct}/{stats.total})
                          </span>
                        </div>
                        <div className="h-2 bg-casino-darker rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-${color}-500 transition-all duration-500`}
                            style={{ width: `${acc}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mistakes */}
              {mistakes.length > 0 && (
                <div className="bg-casino-felt rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-casino-gold mb-4">
                    Mistakes to Review ({mistakes.length})
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {mistakes.map((mistake, idx) => (
                      <div key={idx} className="bg-casino-darker rounded p-3 text-sm">
                        <div className="text-white">
                          <span className="font-medium">{mistake.question.displayHand}</span>
                          {" vs "}
                          <span className="font-medium">Dealer {mistake.question.dealerCard}</span>
                        </div>
                        <div className="text-gray-400 mt-1">
                          You chose: <span className="text-red-400">{ACTION_NAMES[mistake.userAction]}</span>
                          {" • "}
                          Correct: <span className="text-green-400">{ACTION_NAMES[mistake.question.correctAction]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="bg-orange-900/30 border border-orange-600 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">💡 Recommendations</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  {accuracy >= 90 && <li>• Excellent! You're ready for the casino floor.</li>}
                  {accuracy >= 70 && accuracy < 90 && <li>• Good progress! Keep practicing to hit 90%+.</li>}
                  {accuracy < 70 && <li>• Keep practicing! Aim for 70% before moving up.</li>}
                  {getTypeAccuracy("soft") < 70 && <li>• Focus on soft hands - they're tricky!</li>}
                  {getTypeAccuracy("pair") < 70 && <li>• Review pair splitting strategy.</li>}
                  {mistakes.length > 5 && <li>• Use Review Mode to practice your {mistakes.length} mistakes.</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {reviewMode && (
          <div className="bg-orange-900/30 border border-orange-600 rounded-xl p-4 mb-6 text-center">
            <div className="text-orange-400 font-bold">📝 Review Mode Active</div>
            <div className="text-sm text-gray-300 mt-1">
              Practicing your {mistakes.length} mistake{mistakes.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}

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
              <div className="text-xs text-gray-500 mt-1 capitalize">{question.type} total</div>
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
          <li>• Use Review Mode to practice hands you've gotten wrong</li>
        </ul>
      </div>
    </main>
  );
}
