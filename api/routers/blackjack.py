"""Blackjack strategy router"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Literal

router = APIRouter()


# Basic Strategy Chart Data
# Key format: "player_hand:dealer_upcard" -> action
# Actions: H=Hit, S=Stand, D=Double, P=Split, Ds=Double or Stand, Rh=Surrender or Hit

BASIC_STRATEGY = {
    # Hard totals (no ace or ace counts as 1)
    # Format: player_total -> {dealer_card: action}
    "hard": {
        5: {2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        6: {2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        7: {2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        8: {2: "H", 3: "H", 4: "H", 5: "H", 6: "H", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        9: {2: "H", 3: "D", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        10: {2: "D", 3: "D", 4: "D", 5: "D", 6: "D", 7: "D", 8: "D", 9: "D", 10: "H", 11: "H"},
        11: {2: "D", 3: "D", 4: "D", 5: "D", 6: "D", 7: "D", 8: "D", 9: "D", 10: "D", 11: "D"},
        12: {2: "H", 3: "H", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        13: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        14: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},
        15: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "H", 10: "Rh", 11: "Rh"},
        16: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "H", 8: "H", 9: "Rh", 10: "Rh", 11: "Rh"},
        17: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},
        18: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},
        19: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},
        20: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},
        21: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},
    },
    # Soft totals (ace counts as 11)
    "soft": {
        13: {2: "H", 3: "H", 4: "H", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},  # A,2
        14: {2: "H", 3: "H", 4: "H", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},  # A,3
        15: {2: "H", 3: "H", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},  # A,4
        16: {2: "H", 3: "H", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},  # A,5
        17: {2: "H", 3: "D", 4: "D", 5: "D", 6: "D", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},  # A,6
        18: {2: "Ds", 3: "Ds", 4: "Ds", 5: "Ds", 6: "Ds", 7: "S", 8: "S", 9: "H", 10: "H", 11: "H"},  # A,7
        19: {2: "S", 3: "S", 4: "S", 5: "S", 6: "Ds", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},  # A,8
        20: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},  # A,9
    },
    # Pairs
    "pairs": {
        2: {2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", 11: "H"},   # 2,2
        3: {2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", 11: "H"},   # 3,3
        4: {2: "H", 3: "H", 4: "H", 5: "P", 6: "P", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},   # 4,4
        5: {2: "D", 3: "D", 4: "D", 5: "D", 6: "D", 7: "D", 8: "D", 9: "D", 10: "H", 11: "H"},   # 5,5 (never split)
        6: {2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "H", 8: "H", 9: "H", 10: "H", 11: "H"},   # 6,6
        7: {2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "H", 9: "H", 10: "H", 11: "H"},   # 7,7
        8: {2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "P", 9: "P", 10: "P", 11: "P"},   # 8,8 (always split)
        9: {2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "S", 8: "P", 9: "P", 10: "S", 11: "S"},   # 9,9
        10: {2: "S", 3: "S", 4: "S", 5: "S", 6: "S", 7: "S", 8: "S", 9: "S", 10: "S", 11: "S"},  # 10,10 (never split)
        11: {2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "P", 9: "P", 10: "P", 11: "P"},  # A,A (always split)
    },
}

ACTION_NAMES = {
    "H": "Hit",
    "S": "Stand",
    "D": "Double Down",
    "P": "Split",
    "Ds": "Double if allowed, otherwise Stand",
    "Rh": "Surrender if allowed, otherwise Hit",
}


class StrategyRequest(BaseModel):
    player_total: int
    dealer_upcard: int
    is_soft: bool = False
    is_pair: bool = False
    pair_value: int | None = None


class StrategyResponse(BaseModel):
    action: str
    action_code: str
    explanation: str
    hand_type: str


@router.get("/strategy")
def get_full_strategy():
    """Get the complete basic strategy chart"""
    return {
        "hard": BASIC_STRATEGY["hard"],
        "soft": BASIC_STRATEGY["soft"],
        "pairs": BASIC_STRATEGY["pairs"],
        "action_names": ACTION_NAMES,
    }


@router.post("/lookup")
def lookup_strategy(req: StrategyRequest) -> StrategyResponse:
    """Look up the correct play for a specific hand"""
    dealer = req.dealer_upcard
    
    # Normalize dealer ace to 11
    if dealer == 1:
        dealer = 11
    
    if req.is_pair and req.pair_value:
        # Pair lookup
        pair_val = req.pair_value if req.pair_value != 1 else 11
        if pair_val in BASIC_STRATEGY["pairs"]:
            action_code = BASIC_STRATEGY["pairs"][pair_val].get(dealer, "H")
            return StrategyResponse(
                action=ACTION_NAMES.get(action_code, action_code),
                action_code=action_code,
                explanation=f"With a pair of {pair_val}s against dealer {dealer}",
                hand_type="pair"
            )
    
    if req.is_soft:
        # Soft hand lookup
        total = req.player_total
        if total in BASIC_STRATEGY["soft"]:
            action_code = BASIC_STRATEGY["soft"][total].get(dealer, "H")
            return StrategyResponse(
                action=ACTION_NAMES.get(action_code, action_code),
                action_code=action_code,
                explanation=f"With soft {total} against dealer {dealer}",
                hand_type="soft"
            )
    
    # Hard hand lookup
    total = min(max(req.player_total, 5), 21)  # Clamp to valid range
    if total in BASIC_STRATEGY["hard"]:
        action_code = BASIC_STRATEGY["hard"][total].get(dealer, "H")
        return StrategyResponse(
            action=ACTION_NAMES.get(action_code, action_code),
            action_code=action_code,
            explanation=f"With hard {total} against dealer {dealer}",
            hand_type="hard"
        )
    
    return StrategyResponse(
        action="Stand",
        action_code="S",
        explanation="Default to stand",
        hand_type="hard"
    )
