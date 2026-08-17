# Milestone 6: Market Discovery & Trading

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-5 complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions

---

## Goal
Implement the Market Discovery & Trading section — the core marketplace where users browse and trade prediction markets.

## Overview
The default home view after onboarding. Users browse markets through a single-select tag navigation system, filter markets, and execute quick trades directly from market cards.

**Key Functionality:**
- Single-select tag navigation (meta tags: Trending/Popular/New + category tags)
- Market filtering (Market Type, Volume range, Closing date)
- Yes/No market cards with inline trading (Buy Yes/Buy No)
- Categorical market cards with per-outcome Yes/No buttons
- Numeric markets are disabled until an authoritative trade representation exists.
- Inline card trade overlay (amount picker, predicted odds, BUY button)
- Like button on each market card
- Infinite scroll loading
- Refresh button with last-updated timestamp
- Background loading progress bar (after wallet setup)

## What to Implement

### Components
- `MarketDiscovery.tsx` — Main page component
- `TagBar.tsx` — Horizontal tag bar (meta + category tags)
- `FilterControls.tsx` — Filter row (market type, volume, closing date)
- `MarketCard.tsx` — Market card with trading overlay

### Callbacks
- `onTagSelect` — Single tag selection
- `onSearch` — Search query
- `onMarketTypeChange`, `onVolumeRangeChange`, `onClosingDateChange` — Filters
- `onBuyYes` / `onBuyNo` — Yes/No market trades
- `onBuyOutcomeYes` / `onBuyOutcomeNo` — Categorical market trades
- `onViewMarket` — Navigate to market detail
- `onLoadMore` — Infinite scroll
- `onRefreshConditions` — Refresh market data from mint

## Expected User Flows

### Flow 1: Browse and Quick Trade (Yes/No)
1. User lands on page, sees Trending markets
2. User clicks "Buy Yes" on a market card
3. Card transforms to trade overlay with amount picker
4. User selects amount, sees predicted odds, clicks "BUY"
**Outcome:** Trade executed, card returns to normal

### Flow 2: Navigate to Market Detail
1. User clicks on market card (outside buttons)
**Outcome:** Navigates to `/markets/:id`

### Flow 3: Filter Markets
1. User clicks filter icon, filter row appears
2. User selects "Categorical" market type
3. Markets update to show only categorical markets

## Done When
- [ ] Tests written and passing
- [ ] Tag navigation works (single-select)
- [ ] Yes/No and Categorical market types render correctly
- [ ] Inline trading overlay works for Yes/No and Categorical
- [ ] Filters work correctly
- [ ] Infinite scroll loads more markets
- [ ] Refresh button re-fetches conditions
- [ ] Background loading progress bar shows when applicable
- [ ] Responsive on mobile
