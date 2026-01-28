# Claude Code Instructions

You are building Rain Man - a casino strategy app.

## Read First
- `PRD.md` - Full product requirements

## Tech Stack
- Frontend: Next.js 14 (App Router) + React + Tailwind CSS
- Backend: FastAPI (Python) - in `/api` folder
- Database: Supabase (we'll add later, start with static data)

## Project Structure
```
rain-man/
├── frontend/          # Next.js app
│   ├── app/          # App router pages
│   ├── components/   # React components
│   └── lib/          # Utilities
├── api/              # FastAPI backend
│   ├── main.py
│   └── routers/
├── PRD.md
└── README.md
```

## Phase 1 - Foundation
1. Set up Next.js frontend with Tailwind
2. Set up FastAPI backend
3. Create home page with game navigation
4. Build blackjack strategy chart (interactive)

## Design Notes
- Dark theme (#1a1a2e background, #16213e cards)
- Green felt accent (#0f3d3e)
- Gold highlights (#ffc107)
- Mobile-first, responsive

## Commands
- Frontend: `cd frontend && npm run dev`
- Backend: `cd api && uvicorn main:app --reload`

Start with Phase 1. Make it work, make it clean.
