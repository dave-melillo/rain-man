# Rain Man - PRD v2
*"I'm an excellent driver. I'm also excellent at blackjack."*

---

## Executive Summary

Rain Man is a **mobile-first PWA** that teaches casino strategy using math, not luck. Target: casual casino-goers who want to play smarter. Monetization: freemium model (free charts/tools, paid premium features) + affiliate revenue from casino/sportsbook partners.

**Current State:** MVP is live with 8 core pages. Next phase: PWA conversion, polish, and premium features.

---

## What's Already Built ✅

### Pages (Complete)
- **Home** (`/`) - Game selector with casino aesthetic
- **Blackjack Hub** (`/blackjack`) - Navigation to blackjack tools
- **Blackjack Strategy** (`/blackjack/strategy`) - Interactive strategy chart with quick lookup
- **Blackjack Trainer** (`/blackjack/trainer`) - Flashcard practice with accuracy tracking
- **Craps** (`/craps`) - Bet explainer with house edge breakdowns
- **Poker Hub** (`/poker`) - Hand rankings with visual guide
- **Poker Odds** (`/poker/odds`) - Pot odds calculator
- **Bankroll** (`/bankroll`) - Session calculator with stop-loss recommendations

### Tech Stack (Complete)
- **Frontend:** Next.js 14 (App Router) + React + Tailwind CSS
- **Design System:** Dark casino theme (`#0d0d1a` bg, `#0f3d3e` felt, `#ffc107` gold)
- **Deployment:** Ready for Vercel

### Design Philosophy (Established)
- Mobile-first (80%+ of casino-goers use phones)
- Casino floor aesthetic (dark theme, green felt, gold accents)
- Math-driven, not gambling-glorifying
- Sub-3-second lookup for any strategy decision

---

## What's Next 🎯

### Phase 1: PWA Foundation + Polish (Launch Blocker)
**Goal:** Ship a production-ready PWA that users can install and use offline.

#### 1.1 PWA Infrastructure
- **Web App Manifest** (`manifest.json`)
  - Name: "Rain Man Casino Strategy"
  - Short name: "Rain Man"
  - Icons: 192x192, 512x512 (casino chip with brain logo)
  - Theme color: `#0f3d3e` (felt green)
  - Background color: `#0d0d1a` (dark)
  - Display mode: `standalone`
  - Start URL: `/`
  
- **Service Worker**
  - Cache-first strategy for all pages/assets
  - Offline fallback page with cached strategy charts
  - Network-first for dynamic content (future: user progress)
  - Cache versioning for updates
  
- **Install Prompt**
  - Trigger after 2+ visits or 30+ seconds on site
  - Dismissible (save preference in localStorage)
  - iOS Safari "Add to Home Screen" instructions (manual)
  - Track install events (analytics)

#### 1.2 Mobile-First Enhancements
- **Bottom Navigation Bar**
  - Fixed position on mobile (hidden on desktop)
  - Icons: 🃏 Blackjack | 🎲 Craps | ♠️ Poker | 💰 Bankroll
  - Active state highlighting (gold underline)
  
- **Touch Gestures**
  - Swipe left/right to navigate between sections (within game hubs)
  - Pull-to-refresh on strategy pages (refresh cache)
  - Long-press on strategy chart cells for detailed explanation modal
  
- **Haptic Feedback (Web Vibration API)**
  - Subtle vibration on correct answer in trainer mode
  - Different pattern on incorrect answer
  - Tap feedback on navigation buttons
  - Disable toggle in settings
  
- **Performance Optimizations**
  - Lazy load images below the fold
  - Code-split by route
  - Preload critical fonts
  - Target: <2s initial load on 4G

#### 1.3 Polish Existing Features
- **Blackjack Trainer Improvements**
  - Add difficulty modes: Beginner (hard totals only), Intermediate (+ soft totals), Advanced (+ pairs)
  - Show running stats: accuracy by hand type, problem areas
  - Add "Review Mistakes" mode (only show hands you've missed)
  - Export session summary (screenshot-friendly)
  
- **Responsive Design Audit**
  - Test all pages on iPhone SE (375px), standard (390px), and Max (430px)
  - Test landscape mode (rotate blackjack chart)
  - Ensure all interactive elements are 44x44px minimum (touch targets)
  
- **Accessibility**
  - Add ARIA labels to all interactive charts
  - Ensure 4.5:1 contrast ratio for all text
  - Keyboard navigation for strategy charts (tab + arrow keys)
  - Screen reader announcements for trainer feedback

---

### Phase 2: Premium Features + Monetization (Revenue Driver)

#### 2.1 Freemium Model
**Free Tier (Core Value Props):**
- ✅ Blackjack basic strategy chart (interactive + quick lookup)
- ✅ Craps bet guide with house edges
- ✅ Poker hand rankings
- ✅ Pot odds calculator
- ✅ Bankroll session calculator

**Premium Tier ($4.99/month or $29.99/year):**
- 🔒 **Blackjack Trainer** (unlimited practice, progress tracking)
- 🔒 **Card Counting Intro** (Hi-Lo system guide + drills)
- 🔒 **Advanced Tools:**
  - Craps optimal betting calculator (bankroll-based bet sizing)
  - Poker preflop ranges (position-based hand charts)
  - Bankroll "Risk of Ruin" calculator (variance-based survival probability)
- 🔒 **Offline Mode** (full app functionality without network)
- 🔒 **Ad-free experience**

**Paywall Implementation:**
- Soft gate: Allow 3 trainer sessions before requiring premium
- "Upgrade to Premium" modal with feature comparison
- Payment: Stripe Checkout (one-time setup, recurring billing)
- Trial: 7-day free trial for annual plan

#### 2.2 New Premium Features

**Card Counting Intro** (`/blackjack/counting`)
- Hi-Lo system explainer (simple, visual)
- Running count vs True count breakdown
- Interactive drill: Show cards, track count
- True count conversion calculator (decks remaining)
- When to bet big chart (true count → bet multiplier)
- Disclaimers: "This is educational. Casinos will kick you out."

**Craps Optimal Betting** (`/craps/calculator`)
- Input: Bankroll, risk tolerance (conservative/moderate/aggressive)
- Output: Optimal bet sizing for pass line + odds
- Show variance charts (95% confidence intervals for win/loss)
- Comparison: Your strategy vs house edge over 100 rolls

**Poker Preflop Ranges** (`/poker/ranges`)
- Charts for each position (UTG, MP, CO, BTN, SB, BB)
- Hand matrix (color-coded: Raise, Call, Fold)
- Stack depth adjustments (deep stack vs short stack)
- Exportable as image for study

**Risk of Ruin Explainer** (`/bankroll/risk-of-ruin`)
- Input: Bankroll, game type, edge, variance
- Output: Probability of going broke over N sessions
- Visual: Monte Carlo simulation graph (1000 trials)
- Recommendations: "Your bankroll is too small for $25 tables. Try $10 or increase bankroll to $X."

#### 2.3 House Edge Database (`/info`)
- Searchable table of every common casino bet
- Columns: Game, Bet Type, House Edge, Notes
- Examples:
  - Blackjack (basic strategy, 6 decks, S17): 0.43%
  - Craps Pass Line: 1.41%
  - Roulette (double-zero): 5.26%
  - Slots (average): 4-10%
  - Keno: 25-40% (avoid)
- Filter by game, sort by house edge
- "Sucker Bets" highlight (>5% house edge in red)

---

### Phase 3: Launch Prep + Growth (Distribution)

#### 3.1 Marketing Assets
- Landing page copy (SEO-optimized for "blackjack strategy app", "casino math")
- App Store listing (if we decide to wrap PWA)
- Social proof: Reddit posts on r/blackjack, r/poker (organic, not spammy)
- Demo video (30s): "Look up any hand in 2 seconds, practice until perfect."

#### 3.2 Analytics & Tracking
- PostHog or Mixpanel for event tracking:
  - Page views by route
  - Strategy chart lookups (game + hand type)
  - Trainer session completions
  - Premium conversion funnel
  - Install prompt impressions/accepts
- Heatmaps for mobile interactions (Hotjar)

#### 3.3 Affiliate Partnerships
- Integrate affiliate links for:
  - Online sportsbooks (DraftKings, FanDuel)
  - Casino apps (BetMGM, Caesars)
- Placement: Footer of each page, "Recommended Casinos" section
- Disclaimers: "We may earn a commission. Gamble responsibly."

#### 3.4 App Store Submission (Optional)
- Wrap PWA with Capacitor or Turbo Native
- Submit to Apple App Store + Google Play Store
- Pros: Better discoverability, push notifications
- Cons: 30% revenue cut, review delays
- Decision: Validate with PWA first, then consider app store

---

## User Experience Enhancements (Killer Features)

### Scenario-Based Learning
**Example: "First Trip to Vegas" Guide**
- Step-by-step walkthrough: "You sit at a $15 blackjack table with $500. Here's what to do."
- Covers: Buy-in, betting strategy, when to walk away, tipping dealers
- Integrates with bankroll calculator

### Daily Challenge
- One random scenario per day (blackjack hand, craps roll, poker decision)
- Free users get results, premium users get streak tracking
- Gamification: 7-day streak = badge, 30-day = "Expert" badge

### Compare Yourself to Optimal
**Trainer Mode Enhancement:**
- After each session, show: "You made X optimal plays, Y suboptimal plays."
- Highlight: "If you'd played perfectly, you'd save $Z per hour (on average)."

### Dark Pattern Warnings
**On craps page:**
- "The 'Any 7' bet has a 16.7% house edge. For every $100 you bet, you lose $16.70 on average. Don't do it."
- Show side-by-side: $100 on pass line (lose $1.41 average) vs $100 on Any 7 (lose $16.70)

---

## Monetization Strategy

### Revenue Streams (Prioritized)
1. **Premium Subscriptions** (Primary)
   - Target: 2-5% conversion from free to paid
   - Price: $4.99/month or $29.99/year (50% savings)
   - Projected: 10k DAU → 200-500 premium subs → $1k-$2.5k MRR

2. **Affiliate Revenue** (Secondary, Long-Term)
   - Casino/sportsbook sign-up bonuses (CPA: $100-$300 per user)
   - Poker room affiliates (RevShare: 25-35%)
   - Target: 1-2% click-through, 10% conversion → $500-$2k/month at scale

3. **Ads (Fallback, Only if Needed)**
   - Display ads on free tier (Google AdSense or EthicalAds)
   - Non-intrusive: Bottom banner on mobile, sidebar on desktop
   - Revenue: ~$1-3 RPM → Requires high volume to matter

### Why Freemium Works Here
- **Low-friction onboarding:** Users can verify value (strategy chart) before paying.
- **High perceived value:** Trainer mode + card counting are worth $5/month to serious players.
- **Recurring revenue:** Unlike one-time app purchases, subscriptions scale.
- **Network effects:** Free users share charts on Reddit/forums → drive premium conversions.

---

## Technical Architecture (Updated)

### Stack (No Changes)
- **Frontend:** Next.js 14, React, Tailwind
- **Backend (Future):** FastAPI for user accounts, progress tracking
- **Database (Future):** Supabase (Postgres) for user data, subscription state
- **Payments:** Stripe Checkout + Billing Portal
- **Deployment:** Vercel (frontend), Railway (backend if needed)

### Data Flow (Premium Features)
```
User → PWA → Check Premium Status (localStorage or API call)
      ↓
   Premium?
      ↓ No → Show Paywall Modal
      ↓ Yes → Unlock Feature
```

**Phase 1:** Client-side only (localStorage flag for "premium" after Stripe checkout)
**Phase 2:** Backend verification (JWT token from Stripe webhook → Supabase user record)

---

## Phased Rollout Plan

### Phase 1: PWA Foundation (2 weeks)
- [ ] Week 1: Service worker, manifest, install prompt
- [ ] Week 1: Bottom nav, touch gestures, haptic feedback
- [ ] Week 2: Trainer improvements (difficulty modes, stats, review mistakes)
- [ ] Week 2: Responsive design audit + accessibility fixes
- **Deliverable:** Production PWA ready for soft launch

### Phase 2: Premium Features (3 weeks)
- [ ] Week 3: Stripe integration + paywall modals
- [ ] Week 4: Card counting intro (guide + drill)
- [ ] Week 5: Craps calculator, poker ranges, risk of ruin
- [ ] Week 5: House edge database (/info page)
- **Deliverable:** Full freemium app with 5+ premium features

### Phase 3: Launch Prep (1 week)
- [ ] Week 6: Analytics setup (PostHog/Mixpanel)
- [ ] Week 6: Affiliate links integration
- [ ] Week 6: Marketing assets (landing page copy, demo video)
- [ ] Week 6: Soft launch to r/blackjack for feedback
- **Deliverable:** Public launch-ready app

---

## Success Metrics (6 Months Post-Launch)

### Acquisition
- 50k total users (organic + Reddit + SEO)
- 10k monthly active users (DAU/MAU ratio: 30%)
- Install rate: 15% of visitors (web → PWA)

### Engagement
- Average session duration: 3+ minutes
- Strategy chart lookups: 5+ per session
- Trainer completions: 20% of premium users daily

### Revenue
- Premium conversion: 3% (300 paying users at 10k MAU)
- MRR: $1,500 ($4.99 × 300 subs)
- Affiliate revenue: $500/month (50 sign-ups × $10 avg)
- **Total: $2k MRR by Month 6**

### Retention
- 7-day retention: 40% (users return within a week)
- Premium churn: <10%/month
- Net Promoter Score (NPS): 50+ (users recommend to friends)

---

## Open Questions / Decisions Needed

1. **App Store or PWA-only?**
   - Recommendation: PWA-only for Phase 1-3. Re-evaluate after 10k users.

2. **Backend timing?**
   - Recommendation: Client-side auth (Stripe → localStorage flag) for Phase 2. Build backend in Phase 4 if we need cross-device sync.

3. **Free trial length?**
   - Recommendation: 7 days for annual plan, no trial for monthly (too easy to game).

4. **Affiliate casino partners?**
   - Recommendation: Start with 2-3 reputable brands (DraftKings, BetMGM). Avoid sketchy offshore casinos.

5. **Ads on free tier?**
   - Recommendation: No ads initially. Let free tier be genuinely useful (builds trust). Add only if premium conversion is <1%.

---

## Out of Scope (For Now)

- Video content (requires production time, hosting costs)
- Social features (leaderboards, friend challenges)
- Multi-language support (target: English-speaking US market first)
- Slots RTP database (data is hard to source, high variance)
- Comp optimization (niche, low value)

---

## Design Philosophy (Reinforced)

**Mobile-First:** 
- Every feature must work perfectly on iPhone SE (375px width).
- Desktop is a bonus, not the priority.

**Math-Driven:**
- No "get rich quick" promises.
- No gamification that encourages reckless betting.
- Every recommendation backed by expected value calculations.

**Respect the User:**
- No dark patterns.
- No hiding the unsubscribe button.
- Transparent about house edge (even when it's bad news).

**Casino Aesthetic:**
- Dark, sleek, felt green.
- Gold accents for CTAs.
- Feels like you're at the table, not in a spreadsheet.

---

## Appendix: Competitive Analysis

**Existing Apps:**
- **Blackjack Strategy Trainer (iOS):** Good trainer, but ugly UI. No PWA. $2.99 one-time.
- **Wizard of Odds (Web):** Comprehensive but desktop-first, text-heavy, no mobile app.
- **CardCounter (iOS):** Card counting only, $9.99, banned in some app stores.

**Our Edge:**
- **Best mobile UX** (PWA, offline, fast)
- **Freemium model** (lower barrier to entry)
- **Multi-game** (blackjack + craps + poker in one app)
- **Math education** (not just lookup tools, but explanations)

---

## Final Notes

This is a **developer-ready PRD**. Every feature has acceptance criteria. Every phase has a deadline. No fluff.

If something in this doc is unclear, it's a bug in the spec—not your fault. Fix it by asking Dave.

Now go build this thing.

*— Wolverine*
