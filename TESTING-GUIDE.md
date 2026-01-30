# Rain Man PWA - Testing Guide

## Quick Start

```bash
# Install dependencies (if needed)
cd /home/clawdbot/clawd/rain-man/frontend
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## What to Test

### 1. PWA Manifest (Chrome DevTools)

**Steps:**
1. Open app in Chrome: `http://localhost:3000`
2. Open DevTools (F12)
3. Go to Application tab > Manifest

**Expected:**
- Name: "Rain Man Casino Strategy"
- Short name: "Rain Man"
- Theme color: #0f3d3e
- Icons: 192x192, 512x512
- Display: standalone
- Start URL: /

**Test Install:**
- Chrome should show install prompt (address bar icon)
- Click install → App opens in standalone window
- No browser chrome (address bar/tabs hidden)

---

### 2. Service Worker (Offline Functionality)

**Steps:**
1. Open DevTools > Application > Service Workers
2. Verify service worker is registered and active
3. Go to Network tab > Set throttling to "Offline"
4. Try navigating between pages

**Expected:**
- All core pages load from cache:
  - / (Home)
  - /blackjack, /blackjack/strategy, /blackjack/trainer
  - /craps
  - /poker, /poker/odds
  - /bankroll
- Uncached pages show `/offline.html` fallback

**Cache Inspection:**
1. DevTools > Application > Cache Storage
2. Open "rain-man-v1" cache
3. Verify cached resources listed

**Test Cache Update:**
1. Change cache version in `public/sw.js` (e.g., `rain-man-v2`)
2. Reload app
3. Old cache should be deleted automatically
4. New cache should be created

---

### 3. Bottom Navigation (Mobile)

**Desktop Test:**
```
Viewport: 1024px+ width
Expected: Bottom nav is hidden
```

**Mobile Test:**
```
Viewport: 375px width (iPhone SE)
Expected:
- Bottom nav visible at bottom of screen
- 4 tabs: 🃏 Blackjack, 🎲 Craps, ♠️ Poker, 💰 Bankroll
- Active tab has gold color + underline
- Clicking tab navigates to correct page
- Active state updates on navigation
- Content has padding at bottom (not covered by nav)
```

**Touch Target Test:**
```
Each tab should be min 44x44px
Test: Click each tab with finger (or use Chrome touch emulation)
Expected: All tabs respond to touch without misclicks
```

**Active State Test:**
```
1. Navigate to /blackjack
   Expected: Blackjack tab is gold with underline
2. Navigate to /blackjack/strategy
   Expected: Blackjack tab still active (startsWith match)
3. Navigate to /poker/odds
   Expected: Poker tab active
```

---

## Browser Compatibility Testing

### Chrome Android
- ✅ PWA install prompt works
- ✅ Service worker supported
- ✅ Bottom nav renders correctly

**Test Steps:**
1. Open on real Android device or emulator
2. Visit site over HTTPS (required for PWA)
3. Tap install prompt
4. Add to home screen
5. Open app from launcher
6. Verify standalone mode (no browser UI)

---

### Safari iOS
- ⚠️ No automatic install prompt (manual only)
- ✅ Service worker supported (iOS 11.3+)
- ✅ Bottom nav renders correctly

**Test Steps:**
1. Open on real iOS device
2. Tap Share button
3. Select "Add to Home Screen"
4. Open app from home screen
5. Verify standalone mode

**Known Issues:**
- iOS doesn't support `beforeinstallprompt` event
- Need to show manual instructions for "Add to Home Screen"
- This will be handled in US-103 (Install Prompt)

---

## Performance Testing

### Lighthouse Audit
```bash
# Run Lighthouse (in Chrome DevTools)
1. Open DevTools
2. Go to Lighthouse tab
3. Select "Mobile" + "Progressive Web App" + "Performance"
4. Click "Generate report"

Expected Scores:
- Performance: 90+
- PWA: 90+
- Accessibility: 80+ (will improve in US-111)
```

### Bundle Size Check
```bash
npm run build

# Check output for bundle sizes
Expected:
- Shared JS: <100 kB
- Per-route: <100 kB
- Total First Load: <200 kB
```

### Network Throttling Test
```bash
# DevTools > Network > Throttling > Fast 3G
1. Navigate to different pages
2. Measure load times

Expected:
- Cached pages: <100ms
- First visit: <2s (per PRD requirement)
```

---

## Known Issues / Limitations

### Icons
- ✅ Placeholder icons (1x1 transparent PNG)
- ⚠️ Need to replace with proper 192x192 and 512x512 PNG designs
- ✅ SVG icon (`/icon.svg`) available for visual testing

### Install Prompt
- ❌ No custom install prompt yet (US-103)
- ⚠️ iOS requires manual instructions (not yet implemented)
- ⚠️ No localStorage tracking for timing (deferred to US-103)

### Service Worker
- ✅ Basic offline support works
- ⚠️ No update notification (user must refresh manually)
- ⚠️ No background sync (future enhancement)

### Bottom Nav
- ✅ Basic navigation works
- ⚠️ No swipe gestures (deferred to US-105)
- ⚠️ No haptic feedback (deferred to US-106)

---

## Debugging Tips

### Service Worker Not Registering
```javascript
// Check browser console for errors
// Common issues:
// 1. Must be served over HTTPS (or localhost)
// 2. sw.js must be in /public directory
// 3. Check for syntax errors in sw.js
```

### Cache Not Working
```javascript
// DevTools > Application > Service Workers > Update on reload (disable)
// Hard refresh (Cmd+Shift+R) bypasses cache
// Use "Offline" mode to force cache-first
```

### Bottom Nav Not Showing
```javascript
// Check viewport width: must be <768px
// DevTools > Toggle device toolbar (Cmd+Shift+M)
// Select "iPhone SE" or resize to 375px
```

---

## Test Checklist

Before marking batch 1 complete:

- [ ] PWA manifest loads without errors
- [ ] Icons appear in manifest (even if placeholders)
- [ ] Service worker registers successfully
- [ ] Offline mode shows cached pages
- [ ] Offline fallback page displays correctly
- [ ] Bottom nav visible on mobile (<768px)
- [ ] Bottom nav hidden on desktop (>768px)
- [ ] Active state highlights correct tab
- [ ] Content has bottom padding on mobile
- [ ] Build succeeds without errors (`npm run build`)
- [ ] No console errors in browser
- [ ] Lighthouse PWA score >80

---

## Production Deployment Notes

**Before deploying to production:**

1. **Replace placeholder icons:**
   - Hire designer or use Figma to create proper 192x192 and 512x512 PNGs
   - Use casino chip + brain concept from PRD
   - Match casino theme colors (#0f3d3e, #ffc107)

2. **HTTPS required:**
   - PWA features require HTTPS
   - Vercel provides this automatically
   - Test on staging environment first

3. **Update cache version:**
   - Bump cache version in `sw.js` on each deployment
   - Format: `rain-man-vX` (e.g., v1, v2, v3)

4. **Test on real devices:**
   - Android: Chrome, Samsung Internet
   - iOS: Safari
   - Desktop: Chrome, Firefox, Edge

5. **Monitor install rate:**
   - Track install events (deferred to US-301: Analytics)
   - Target: 15% install rate per PRD

---

## Resources

- [Next.js PWA Guide](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
- [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)
- [PWA Builder](https://www.pwabuilder.com/) - Test your PWA

---

**Status:** Phase 1 Batch 1 complete. Ready for device testing and Batch 2 implementation.
