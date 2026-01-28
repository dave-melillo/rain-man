"""Poker strategy router"""
from fastapi import APIRouter

router = APIRouter()

HAND_RANKINGS = [
    {
        "rank": 1,
        "name": "Royal Flush",
        "description": "A, K, Q, J, 10 all of the same suit",
        "example": "A♠ K♠ Q♠ J♠ 10♠",
        "probability": "0.000154%",
    },
    {
        "rank": 2,
        "name": "Straight Flush",
        "description": "Five consecutive cards of the same suit",
        "example": "9♥ 8♥ 7♥ 6♥ 5♥",
        "probability": "0.00139%",
    },
    {
        "rank": 3,
        "name": "Four of a Kind",
        "description": "Four cards of the same rank",
        "example": "K♠ K♥ K♦ K♣ 7♠",
        "probability": "0.0240%",
    },
    {
        "rank": 4,
        "name": "Full House",
        "description": "Three of a kind plus a pair",
        "example": "J♠ J♥ J♦ 8♣ 8♠",
        "probability": "0.1441%",
    },
    {
        "rank": 5,
        "name": "Flush",
        "description": "Five cards of the same suit, not in sequence",
        "example": "A♦ J♦ 8♦ 6♦ 2♦",
        "probability": "0.1965%",
    },
    {
        "rank": 6,
        "name": "Straight",
        "description": "Five consecutive cards of mixed suits",
        "example": "10♠ 9♦ 8♣ 7♥ 6♠",
        "probability": "0.3925%",
    },
    {
        "rank": 7,
        "name": "Three of a Kind",
        "description": "Three cards of the same rank",
        "example": "7♠ 7♥ 7♦ K♣ 2♠",
        "probability": "2.1128%",
    },
    {
        "rank": 8,
        "name": "Two Pair",
        "description": "Two different pairs",
        "example": "A♠ A♥ 9♦ 9♣ 4♠",
        "probability": "4.7539%",
    },
    {
        "rank": 9,
        "name": "One Pair",
        "description": "Two cards of the same rank",
        "example": "Q♠ Q♥ 7♦ 4♣ 2♠",
        "probability": "42.2569%",
    },
    {
        "rank": 10,
        "name": "High Card",
        "description": "No matching cards, highest card plays",
        "example": "A♠ J♦ 8♣ 6♥ 2♠",
        "probability": "50.1177%",
    },
]


@router.get("/hands")
def get_hand_rankings():
    """Get poker hand rankings"""
    return HAND_RANKINGS


@router.get("/odds")
def calculate_pot_odds(pot_size: float, bet_to_call: float):
    """Calculate pot odds"""
    if bet_to_call <= 0:
        return {"error": "Bet must be greater than 0"}
    
    pot_odds = bet_to_call / (pot_size + bet_to_call)
    pot_odds_percent = pot_odds * 100
    pot_odds_ratio = (pot_size + bet_to_call) / bet_to_call
    
    return {
        "pot_size": pot_size,
        "bet_to_call": bet_to_call,
        "pot_odds_percent": round(pot_odds_percent, 2),
        "pot_odds_ratio": f"{round(pot_odds_ratio, 1)}:1",
        "explanation": f"You need {round(pot_odds_percent, 1)}% equity to call profitably",
        "common_draws": {
            "flush_draw": {"outs": 9, "turn_odds": 19.1, "river_odds": 19.6, "both": 35.0},
            "open_ended_straight": {"outs": 8, "turn_odds": 17.0, "river_odds": 17.4, "both": 31.5},
            "gutshot": {"outs": 4, "turn_odds": 8.5, "river_odds": 8.7, "both": 16.5},
            "two_overcards": {"outs": 6, "turn_odds": 12.8, "river_odds": 13.0, "both": 24.1},
        }
    }
