"""Craps strategy router"""
from fastapi import APIRouter

router = APIRouter()

# Craps bet house edges
CRAPS_BETS = {
    "pass_line": {
        "name": "Pass Line",
        "house_edge": 1.41,
        "description": "Bet with the shooter. Win on 7 or 11 on come-out, lose on 2, 3, or 12.",
        "recommendation": "excellent",
    },
    "dont_pass": {
        "name": "Don't Pass",
        "house_edge": 1.36,
        "description": "Bet against the shooter. Opposite of pass line (12 pushes).",
        "recommendation": "excellent",
    },
    "pass_odds": {
        "name": "Pass Line Odds",
        "house_edge": 0.0,
        "description": "Additional bet behind pass line after point is set. TRUE ODDS - no house edge!",
        "recommendation": "best",
    },
    "dont_pass_odds": {
        "name": "Don't Pass Odds",
        "house_edge": 0.0,
        "description": "Laying odds against the point. TRUE ODDS - no house edge!",
        "recommendation": "best",
    },
    "come": {
        "name": "Come",
        "house_edge": 1.41,
        "description": "Like a pass line bet made after the point is established.",
        "recommendation": "excellent",
    },
    "dont_come": {
        "name": "Don't Come",
        "house_edge": 1.36,
        "description": "Like don't pass but made after point is established.",
        "recommendation": "excellent",
    },
    "place_6": {
        "name": "Place 6",
        "house_edge": 1.52,
        "description": "Bet that 6 will be rolled before 7.",
        "recommendation": "good",
    },
    "place_8": {
        "name": "Place 8",
        "house_edge": 1.52,
        "description": "Bet that 8 will be rolled before 7.",
        "recommendation": "good",
    },
    "place_5": {
        "name": "Place 5",
        "house_edge": 4.0,
        "description": "Bet that 5 will be rolled before 7.",
        "recommendation": "avoid",
    },
    "place_9": {
        "name": "Place 9",
        "house_edge": 4.0,
        "description": "Bet that 9 will be rolled before 7.",
        "recommendation": "avoid",
    },
    "place_4": {
        "name": "Place 4",
        "house_edge": 6.67,
        "description": "Bet that 4 will be rolled before 7.",
        "recommendation": "sucker",
    },
    "place_10": {
        "name": "Place 10",
        "house_edge": 6.67,
        "description": "Bet that 10 will be rolled before 7.",
        "recommendation": "sucker",
    },
    "field": {
        "name": "Field",
        "house_edge": 5.56,
        "description": "One-roll bet on 2, 3, 4, 9, 10, 11, 12.",
        "recommendation": "avoid",
    },
    "any_7": {
        "name": "Any 7",
        "house_edge": 16.67,
        "description": "One-roll bet that next roll is 7.",
        "recommendation": "sucker",
    },
    "any_craps": {
        "name": "Any Craps",
        "house_edge": 11.11,
        "description": "One-roll bet on 2, 3, or 12.",
        "recommendation": "sucker",
    },
    "hardway_6": {
        "name": "Hard 6",
        "house_edge": 9.09,
        "description": "Bet that 3+3 is rolled before 7 or easy 6.",
        "recommendation": "sucker",
    },
    "hardway_8": {
        "name": "Hard 8",
        "house_edge": 9.09,
        "description": "Bet that 4+4 is rolled before 7 or easy 8.",
        "recommendation": "sucker",
    },
    "hardway_4": {
        "name": "Hard 4",
        "house_edge": 11.11,
        "description": "Bet that 2+2 is rolled before 7 or easy 4.",
        "recommendation": "sucker",
    },
    "hardway_10": {
        "name": "Hard 10",
        "house_edge": 11.11,
        "description": "Bet that 5+5 is rolled before 7 or easy 10.",
        "recommendation": "sucker",
    },
    "big_6": {
        "name": "Big 6",
        "house_edge": 9.09,
        "description": "Bet that 6 is rolled before 7. (Just place 6 instead!)",
        "recommendation": "sucker",
    },
    "big_8": {
        "name": "Big 8",
        "house_edge": 9.09,
        "description": "Bet that 8 is rolled before 7. (Just place 8 instead!)",
        "recommendation": "sucker",
    },
}


@router.get("/bets")
def get_all_bets():
    """Get all craps bets with house edges"""
    return CRAPS_BETS


@router.get("/bets/{bet_id}")
def get_bet(bet_id: str):
    """Get info for a specific bet"""
    if bet_id in CRAPS_BETS:
        return CRAPS_BETS[bet_id]
    return {"error": "Bet not found"}


@router.get("/optimal")
def get_optimal_strategy():
    """Get the optimal craps betting strategy"""
    return {
        "strategy": "Pass/Don't Pass + Maximum Odds",
        "steps": [
            "1. Bet pass line (or don't pass if you prefer)",
            "2. Once point is established, take maximum odds",
            "3. That's it. Don't make any other bets.",
        ],
        "why": "Pass line has 1.41% house edge. Odds bets have 0% house edge. By taking maximum odds, you dilute the house edge on your total action. With 3-4-5x odds, combined house edge drops to about 0.37%.",
        "avoid": [
            "Proposition bets (center of table)",
            "Hardways",
            "Big 6/8 (place 6/8 instead)",
            "Any craps/any seven",
        ],
    }
