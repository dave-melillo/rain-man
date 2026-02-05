"use client";

import { useState } from "react";

// Basic Strategy Data
const DEALER_CARDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A"];
const HARD_TOTALS = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8];
const SOFT_TOTALS = [20, 19, 18, 17, 16, 15, 14, 13];
const PAIRS = ["A,A", "10,10", "9,9", "8,8", "7,7", "6,6", "5,5", "4,4", "3,3", "2,2"];

// Strategy data - H=Hit, S=Stand, D=Double, P=Split, Ds=Double/Stand, Rh=Surrender/Hit
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

const ACTION_COLORS: Record<string, string> = {
  H: "bg-red-600 hover:bg-red-500",
  S: "bg-green-600 hover:bg-green-500", 
  D: "bg-blue-600 hover:bg-blue-500",
  P: "bg-purple-600 hover:bg-purple-500",
  Ds: "bg-cyan-600 hover:bg-cyan-500",
  Rh: "bg-orange-600 hover:bg-orange-500",
};

const ACTION_NAMES: Record<string, string> = {
  H: "Hit",
  S: "Stand",
  D: "Double",
  P: "Split",
  Ds: "Double or Stand",
  Rh: "Surrender or Hit",
};

interface CellProps {
  action: string;
  playerHand: string | number;
  dealerCard: string | number;
  onSelect: (player: string, dealer: string, action: string) => void;
  isSelected: boolean;
}

function StrategyCell({ action, playerHand, dealerCard, onSelect, isSelected }: CellProps) {
  return (
    <button
      onClick={() => onSelect(String(playerHand), String(dealerCard), action)}
      className={`
        group relative w-11 h-11 md:w-12 md:h-12 rounded-lg font-bold text-white text-sm
        transition-all duration-200 ease-out
        ${ACTION_COLORS[action]}
        ${isSelected 
          ? "ring-4 ring-casino-gold ring-offset-2 ring-offset-casino-dark scale-110 z-10 shadow-xl shadow-casino-gold/50" 
          : "hover:scale-105 hover:shadow-lg active:scale-95"
        }
      `}
      aria-label={`${ACTION_NAMES[action]} for ${playerHand} vs dealer ${dealerCard}`}
    >
      {action}
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
    </button>
  );
}

interface Selection {
  playerHand: string;
  dealerCard: string;
  action: string;
}

export default function StrategyChart() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [activeTab, setActiveTab] = useState<"hard" | "soft" | "pairs">("hard");

  const handleSelect = (playerHand: string, dealerCard: string, action: string) => {
    setSelection({ playerHand, dealerCard, action });
  };

  const isSelected = (playerHand: string | number, dealerCard: string | number) => {
    return selection?.playerHand === String(playerHand) && selection?.dealerCard === String(dealerCard);
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(ACTION_NAMES).map(([code, name]) => (
          <div key={code} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded ${ACTION_COLORS[code]} shadow-sm`} />
            <span className="text-sm text-gray-300">
              <span className="font-semibold">{code}</span> = {name}
            </span>
          </div>
        ))}
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-center gap-2">
        {(["hard", "soft", "pairs"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all duration-200 active:scale-95 touch-target ${
              activeTab === tab
                ? "bg-casino-gold text-black shadow-md hover:shadow-lg hover:shadow-casino-gold/50"
                : "bg-casino-card text-gray-300 hover:bg-casino-felt hover:text-white border-2 border-casino-card hover:border-casino-felt-light"
            }`}
          >
            {tab === "hard" ? "Hard Totals" : tab === "soft" ? "Soft Totals" : "Pairs"}
          </button>
        ))}
      </div>

      {/* Selection Display */}
      {selection && (
        <div className="card-elevated p-6 text-center animate-fade-in">
          <div className="text-sm text-gray-400 mb-2 animate-fade-in">Your Play:</div>
          <div className="text-2xl font-bold text-white mb-3">
            {activeTab === "pairs" ? `Pair of ${selection.playerHand.split(",")[0]}s` : 
             activeTab === "soft" ? `Soft ${selection.playerHand}` : 
             `Hard ${selection.playerHand}`}
            {" "}vs Dealer {selection.dealerCard}
          </div>
          <div className={`inline-block px-8 py-4 rounded-xl text-2xl font-bold text-white ${ACTION_COLORS[selection.action]} shadow-lg animate-flip-in`}>
            {ACTION_NAMES[selection.action]}
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Hard Totals */}
          {activeTab === "hard" && (
            <table className="mx-auto">
              <thead>
                <tr>
                  <th className="p-2 text-gray-400 text-sm">Your Hand</th>
                  {DEALER_CARDS.map((card) => (
                    <th key={card} className="p-2 text-center">
                      <div className="w-11 h-11 md:w-12 md:h-12 bg-casino-card rounded-lg flex items-center justify-center text-white font-bold">
                        {card}
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="p-2 text-gray-500 text-xs">↓</th>
                  <th colSpan={10} className="text-center text-gray-500 text-xs pb-2">
                    Dealer's Up Card →
                  </th>
                </tr>
              </thead>
              <tbody>
                {HARD_TOTALS.map((total) => (
                  <tr key={total}>
                    <td className="p-2">
                      <div className="w-12 md:w-14 h-11 md:h-12 bg-casino-felt rounded-lg flex items-center justify-center text-white font-bold">
                        {total}
                      </div>
                    </td>
                    {DEALER_CARDS.map((dealerCard) => (
                      <td key={dealerCard} className="p-1">
                        <StrategyCell
                          action={HARD_STRATEGY[total][dealerCard]}
                          playerHand={total}
                          dealerCard={dealerCard}
                          onSelect={handleSelect}
                          isSelected={isSelected(total, dealerCard)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Soft Totals */}
          {activeTab === "soft" && (
            <table className="mx-auto">
              <thead>
                <tr>
                  <th className="p-2 text-gray-400 text-sm">Your Hand</th>
                  {DEALER_CARDS.map((card) => (
                    <th key={card} className="p-2 text-center">
                      <div className="w-11 h-11 md:w-12 md:h-12 bg-casino-card rounded-lg flex items-center justify-center text-white font-bold">
                        {card}
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="p-2 text-gray-500 text-xs">↓</th>
                  <th colSpan={10} className="text-center text-gray-500 text-xs pb-2">
                    Dealer's Up Card →
                  </th>
                </tr>
              </thead>
              <tbody>
                {SOFT_TOTALS.map((total) => (
                  <tr key={total}>
                    <td className="p-2">
                      <div className="w-12 md:w-14 h-11 md:h-12 bg-casino-felt rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        A,{total - 11}
                      </div>
                    </td>
                    {DEALER_CARDS.map((dealerCard) => (
                      <td key={dealerCard} className="p-1">
                        <StrategyCell
                          action={SOFT_STRATEGY[total][dealerCard]}
                          playerHand={total}
                          dealerCard={dealerCard}
                          onSelect={handleSelect}
                          isSelected={isSelected(total, dealerCard)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pairs */}
          {activeTab === "pairs" && (
            <table className="mx-auto">
              <thead>
                <tr>
                  <th className="p-2 text-gray-400 text-sm">Your Pair</th>
                  {DEALER_CARDS.map((card) => (
                    <th key={card} className="p-2 text-center">
                      <div className="w-11 h-11 md:w-12 md:h-12 bg-casino-card rounded-lg flex items-center justify-center text-white font-bold">
                        {card}
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="p-2 text-gray-500 text-xs">↓</th>
                  <th colSpan={10} className="text-center text-gray-500 text-xs pb-2">
                    Dealer's Up Card →
                  </th>
                </tr>
              </thead>
              <tbody>
                {PAIRS.map((pair) => (
                  <tr key={pair}>
                    <td className="p-2">
                      <div className="w-12 md:w-14 h-11 md:h-12 bg-casino-felt rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {pair}
                      </div>
                    </td>
                    {DEALER_CARDS.map((dealerCard) => (
                      <td key={dealerCard} className="p-1">
                        <StrategyCell
                          action={PAIR_STRATEGY[pair][dealerCard]}
                          playerHand={pair}
                          dealerCard={dealerCard}
                          onSelect={handleSelect}
                          isSelected={isSelected(pair, dealerCard)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="card-elevated p-6 mt-8">
        <h3 className="text-lg font-semibold text-casino-gold mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Pro Tips
        </h3>
        <ul className="space-y-2 text-gray-300 text-sm leading-relaxed">
          <li>• <strong className="text-white">Always split Aces and 8s</strong> — two chances to get 21 or escape a bad 16</li>
          <li>• <strong className="text-white">Never split 10s or 5s</strong> — 20 is great, and 10 is better for doubling</li>
          <li>• <strong className="text-white">Dealer 2-6 is "busting"</strong> — stand on more hands, let them bust</li>
          <li>• <strong className="text-white">Surrender saves money</strong> — giving up half is better than losing it all</li>
        </ul>
      </div>
    </div>
  );
}
