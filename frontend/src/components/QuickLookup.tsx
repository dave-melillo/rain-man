"use client";

import { useState } from "react";
import Spinner from "./Spinner";

const CARDS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const DEALER_CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];

// Strategy lookup functions
function getCardValue(card: string): number {
  if (card === "A") return 11;
  if (["K", "Q", "J", "10"].includes(card)) return 10;
  return parseInt(card);
}

function getStrategy(card1: string, card2: string, dealerCard: string): { action: string; explanation: string; type: string } {
  const val1 = getCardValue(card1);
  const val2 = getCardValue(card2);
  const dealer = dealerCard === "A" ? "A" : parseInt(dealerCard);
  
  // Check for pair
  if (card1 === card2 || (val1 === 10 && val2 === 10)) {
    return getPairStrategy(card1, dealer);
  }
  
  // Check for soft hand (has ace counting as 11)
  const hasAce = card1 === "A" || card2 === "A";
  const total = val1 + val2;
  
  if (hasAce && total <= 21) {
    return getSoftStrategy(total, dealer);
  }
  
  // Hard hand
  // If we had A that would bust us, count it as 1
  const hardTotal = total > 21 ? total - 10 : total;
  return getHardStrategy(hardTotal, dealer);
}

function getHardStrategy(total: number, dealer: number | string): { action: string; explanation: string; type: string } {
  const HARD: Record<number, Record<number | string, string>> = {
    21: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    20: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    19: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    18: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
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
    7: { 2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    6: { 2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    5: { 2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    4: { 2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  };
  
  const action = HARD[total]?.[dealer] || "H";
  return {
    action,
    explanation: `Hard ${total} vs dealer ${dealer}`,
    type: "hard"
  };
}

function getSoftStrategy(total: number, dealer: number | string): { action: string; explanation: string; type: string } {
  const SOFT: Record<number, Record<number | string, string>> = {
    21: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    20: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    19: { 2: "S", 3: "S", 4: "S", 5: "S", 6: "Ds", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    18: { 2: "Ds", 3: "Ds", 4: "Ds", 5: "Ds", 6: "Ds", 7: "S", 8: "S", 9: "H", 10: "H", A: "H" },
    17: { 2: "H", 3: "D", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    16: { 2: "H", 3: "H", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    15: { 2: "H", 3: "H", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    14: { 2: "H", 3: "H", 4: "H", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    13: { 2: "H", 3: "H", 4: "H", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    12: { 2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
  };
  
  const action = SOFT[total]?.[dealer] || "H";
  return {
    action,
    explanation: `Soft ${total} vs dealer ${dealer}`,
    type: "soft"
  };
}

function getPairStrategy(card: string, dealer: number | string): { action: string; explanation: string; type: string } {
  const PAIRS: Record<string, Record<number | string, string>> = {
    "A": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "P", 9: "P", 10: "P", A: "P" },
    "K": { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    "Q": { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    "J": { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    "10": { 2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", A: "S" },
    "9": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "S", 8: "P", 9: "P", 10: "S", A: "S" },
    "8": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "P", 9: "P", 10: "P", A: "P" },
    "7": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", A: "H" },
    "6": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    "5": { 2: "D", 3: "D", 4: "D", 5: "D", 6: "D", 7: "D", 8: "D", 9: "D", 10: "H", A: "H" },
    "4": { 2: "H", 3: "H", 4: "H", 5: "P", 6: "P", 7: "H", 8: "H", 9: "H", 10: "H", A: "H" },
    "3": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", A: "H" },
    "2": { 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", A: "H" },
  };
  
  const action = PAIRS[card]?.[dealer] || "H";
  return {
    action,
    explanation: `Pair of ${card}s vs dealer ${dealer}`,
    type: "pair"
  };
}

const ACTION_COLORS: Record<string, string> = {
  H: "bg-red-600",
  S: "bg-green-600", 
  D: "bg-blue-600",
  P: "bg-purple-600",
  Ds: "bg-cyan-600",
  Rh: "bg-orange-600",
};

const ACTION_NAMES: Record<string, string> = {
  H: "HIT",
  S: "STAND",
  D: "DOUBLE DOWN",
  P: "SPLIT",
  Ds: "DOUBLE or STAND",
  Rh: "SURRENDER or HIT",
};

export default function QuickLookup() {
  const [card1, setCard1] = useState<string | null>(null);
  const [card2, setCard2] = useState<string | null>(null);
  const [dealerCard, setDealerCard] = useState<string | null>(null);
  const [result, setResult] = useState<{ action: string; explanation: string; type: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCardSelect = (card: string, position: "card1" | "card2" | "dealer") => {
    if (position === "card1") {
      setCard1(card);
    } else if (position === "card2") {
      setCard2(card);
    } else {
      setDealerCard(card);
    }
    // Reset result when changing cards
    setResult(null);
  };

  const calculateStrategy = () => {
    if (card1 && card2 && dealerCard) {
      setIsCalculating(true);
      
      // Simulate brief calculation time for visual feedback
      setTimeout(() => {
        const strategy = getStrategy(card1, card2, dealerCard);
        setResult(strategy);
        setIsCalculating(false);
      }, 200);
    }
  };

  const reset = () => {
    setCard1(null);
    setCard2(null);
    setDealerCard(null);
    setResult(null);
    setIsCalculating(false);
  };

  // Auto-calculate when all cards selected
  if (card1 && card2 && dealerCard && !result && !isCalculating) {
    calculateStrategy();
  }

  return (
    <div className="card-elevated p-6">
      <h3 className="text-xl font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-2xl">🔍</span>
        Quick Lookup
      </h3>
      
      {/* Card Selection */}
      <div className="space-y-6">
        {/* Your Cards */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Your First Card</label>
          <div className="flex flex-wrap gap-2">
            {CARDS.map((card) => (
              <button
                key={`c1-${card}`}
                onClick={() => handleCardSelect(card, "card1")}
                className={`w-11 h-12 rounded-lg font-bold transition-all duration-200 touch-target hover-scale active:scale-95 ${
                  card1 === card
                    ? "bg-casino-gold text-black shadow-md shadow-casino-gold/50"
                    : "bg-casino-card text-white hover:bg-casino-felt"
                }`}
                aria-label={`Select ${card} as first card`}
              >
                {card}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Your Second Card</label>
          <div className="flex flex-wrap gap-2">
            {CARDS.map((card) => (
              <button
                key={`c2-${card}`}
                onClick={() => handleCardSelect(card, "card2")}
                className={`w-11 h-12 rounded-lg font-bold transition-all duration-200 touch-target hover-scale active:scale-95 ${
                  card2 === card
                    ? "bg-casino-gold text-black shadow-md shadow-casino-gold/50"
                    : "bg-casino-card text-white hover:bg-casino-felt"
                }`}
                aria-label={`Select ${card} as second card`}
              >
                {card}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Dealer's Up Card</label>
          <div className="flex flex-wrap gap-2">
            {DEALER_CARDS.map((card) => (
              <button
                key={`d-${card}`}
                onClick={() => handleCardSelect(card, "dealer")}
                className={`w-11 h-12 rounded-lg font-bold transition-all duration-200 touch-target hover-scale active:scale-95 ${
                  dealerCard === card
                    ? "bg-casino-felt-light text-white ring-2 ring-casino-gold shadow-lg"
                    : "bg-casino-card text-white hover:bg-casino-felt"
                }`}
                aria-label={`Select dealer ${card}`}
              >
                {card}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isCalculating && (
        <div className="mt-6 flex justify-center">
          <Spinner />
        </div>
      )}

      {/* Result */}
      {result && !isCalculating && (
        <div className="mt-6 text-center animate-fade-in">
          <div className="text-sm text-gray-400 mb-2 animate-fade-in">
            {result.explanation}
          </div>
          <div className={`inline-block px-8 py-4 rounded-xl text-2xl font-bold text-white ${ACTION_COLORS[result.action]} shadow-lg animate-flip-in`}>
            {ACTION_NAMES[result.action]}
          </div>
          <button
            onClick={reset}
            className="block mx-auto mt-4 text-sm text-gray-400 hover:text-casino-gold transition-colors duration-200 hover:scale-105 active:scale-95"
          >
            ↻ Reset
          </button>
        </div>
      )}

      {/* Selected Cards Display */}
      {(card1 || card2 || dealerCard) && !result && (
        <div className="mt-6 flex justify-center gap-4 items-center">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Your Hand</div>
            <div className="flex gap-1">
              <div className={`w-11 h-14 rounded-lg flex items-center justify-center font-bold ${card1 ? "bg-casino-gold text-black" : "bg-casino-card text-gray-600"}`}>
                {card1 || "?"}
              </div>
              <div className={`w-11 h-14 rounded-lg flex items-center justify-center font-bold ${card2 ? "bg-casino-gold text-black" : "bg-casino-card text-gray-600"}`}>
                {card2 || "?"}
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-2xl">vs</div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Dealer</div>
            <div className={`w-11 h-14 rounded-lg flex items-center justify-center font-bold ${dealerCard ? "bg-casino-felt text-white" : "bg-casino-card text-gray-600"}`}>
              {dealerCard || "?"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
