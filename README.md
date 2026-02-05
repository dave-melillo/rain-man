# Rain Man 🃏

*"I'm an excellent driver. I'm also excellent at blackjack."*

A casino strategy app that teaches you to play smarter with math, not luck.

## Quick Start

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend (FastAPI)

```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload
```

API available at [http://localhost:8000](http://localhost:8000)

## Features

### 🃏 Blackjack
- **Interactive Strategy Chart** - Look up the correct play in seconds
- **Quick Lookup Tool** - Select your cards and get instant advice
- Hard totals, soft totals, and pairs all covered

### 🎲 Craps (Coming Soon)
- Bet guide with house edges
- Optimal strategy calculator

### ♠️ Poker (Coming Soon)
- Hand rankings
- Pot odds calculator

### 💰 Bankroll (Coming Soon)
- Session planning
- Risk management tools

## Tech Stack

- **Frontend:** Next.js 14 + React + TypeScript + Tailwind CSS
- **Backend:** FastAPI (Python)
- **Theme:** Dark casino aesthetic with green felt accents

## Design

The app uses a dark casino theme:
- Background: Deep navy/black (#0d0d1a, #1a1a2e)
- Accent: Casino felt green (#0f3d3e)
- Highlights: Gold (#ffc107)
- Strategy colors: Red (Hit), Green (Stand), Blue (Double), Purple (Split)

---

*"K-Mart sucks. But your casino strategy doesn't have to."*
