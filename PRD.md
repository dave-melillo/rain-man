# Rain Man - Product Requirements Document
*"I'm an excellent driver. I'm also excellent at blackjack."*

## What Is This?
An app that teaches casino game strategies. Users learn to make smarter bets using math, not luck.

## Who Is This For?
- People who go to casinos and want to lose less money
- People who want to understand the math behind games
- Poker players wanting strategy refreshers
- Anyone who watched Rain Man and thought "I want to do that"

## Core Features (MVP)

### 1. Blackjack Basic Strategy
- Interactive chart: tap your hand + dealer's upcard → get the play
- Training mode: flash cards, tracks your accuracy
- Card counting intro (Hi-Lo system)

### 2. Craps Strategy Guide
- Explain the bets (pass line, don't pass, odds, etc.)
- Show the house edge for each bet (spoiler: some are terrible)
- Optimal betting strategy calculator

### 3. Poker Basics
- Hand rankings (with quiz mode)
- Position explanation
- Pot odds calculator
- Basic preflop ranges

### 4. Bankroll Management
- Session bankroll calculator
- Stop-loss / win-goal recommendations
- "Risk of Ruin" explainer

### 5. Game Info Database
- House edge for every common casino bet
- RTP info for understanding slots
- Which bets are sucker bets (most of them)

## Tech Stack
- **Frontend:** Next.js + React + Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** Supabase (Postgres)
- **Deployment:** Vercel (frontend) + Railway (backend)

## Design Vibes
- Dark theme (casino floor aesthetic)
- Green felt accents
- Clean, mobile-first
- No gambling glorification - this is about smart play

## Pages (MVP)

```
/                   → Home (game selector)
/blackjack          → Blackjack hub
/blackjack/strategy → Interactive strategy chart
/blackjack/trainer  → Practice mode
/craps              → Craps hub
/craps/bets         → Bet explainer with EV
/poker              → Poker hub
/poker/hands        → Hand rankings + quiz
/poker/odds         → Pot odds calculator
/bankroll           → Bankroll tools
/info               → House edge database
```

## Success Metrics
- User can look up correct blackjack play in <3 seconds
- User understands why pass line + odds is the best craps bet
- User stops making sucker bets

## Future Ideas (Post-MVP)
- User accounts to track training progress
- Video strategy breakdowns (Casino Quest style)
- Slot RTP database with search
- Advanced poker ranges
- Comp optimization calculator

---

*"K-Mart sucks. But your casino strategy doesn't have to."*
