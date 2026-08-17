# Milestone 7: Market Detail

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-6 complete

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
Implement the Market Detail page — comprehensive trading view with order book, charts, and trade panel.

## Overview
Accessed by clicking on a market card. Provides full market analysis and trading interface supporting market orders, limit orders, buy and sell operations, and Yes/No and Categorical markets.

**Key Functionality:**
- Market header with image, title, tags, countdown, creator info, metrics footer
- Trading panel with Buy/Sell toggle + Market/Limit sub-tabs
- Outcome selection (Yes/No buttons or categorical outcome list)
- Trade preview with predicted odds, price impact, payout, fees
- Optional trade comment (280 chars)
- Price chart with timeframe selector (1H/24H/7D/1M/ALL) and Price/Volume toggle
- Comment bubbles overlaid on price chart
- Order book visualization
- Resolution details section
- Recent trades feed
- Comments section (read-only, comments posted via trading)
- Related markets horizontal scroll
- Resolved market view (no trading panel, single-column layout)
- Numeric markets are disabled until an authoritative finite-bin or numeric-range trade representation exists.

## What to Implement

### Components
- `MarketDetail.tsx` — Main page layout
- `MarketHeader.tsx` — Header with image, title, metrics
- `TradingPanel.tsx` — Buy/Sell + Market/Limit trading interface
- `PriceChart.tsx` — Interactive price/volume chart
- `OrderBookSection.tsx` — Order book visualization
- `ResolutionInfo.tsx` — Resolution criteria and status
- `ActivityFeed.tsx` — Recent trades list
- `CommentSection.tsx` — Comments display
- `RelatedMarkets.tsx` — Horizontal related markets
- `MarketStats.tsx` — Market statistics

### Key Callbacks
- `onTradeSelect` / `onTradeClear` — Select/clear outcome
- `onAmountChange` — Trade amount input
- `onTradeConfirm` — Execute trade
- `onTradeSideChange` — Buy/Sell toggle
- `onOrderTypeChange` — Market/Limit toggle
- `onLimitPriceChange` — Limit order price
- `onTimeframeChange` / `onChartTypeChange` — Chart controls
- `onLikeToggle` — Like/unlike market
- `onCommentPost` / `onCommentLike` — Comments
- `onShare` — Share market

## Expected User Flows

### Flow 1: Place a Market Buy Order
1. User views market, selects "Yes" outcome
2. User enters amount (e.g., 1000 sats)
3. System shows predicted odds, payout, fees
4. User optionally adds a comment
5. User clicks "Buy YES for ₿1,000"
**Outcome:** Trade executed, activity updates

### Flow 2: Place a Limit Sell Order
1. User clicks "Sell" tab, then "Limit" sub-tab
2. User sets limit price and amount
3. User clicks "Place Sell Limit Order"
**Outcome:** Limit order placed

### Flow 3: View Resolved Market
1. User navigates to a resolved market
2. RESOLVED badge shown, no trading panel
3. Single-column layout, resolution details prominent

## Done When
- [ ] Tests written and passing
- [ ] Two-column layout (desktop), single-column (mobile)
- [ ] Buy/Sell + Market/Limit all work correctly
- [ ] Trade preview shows accurate calculations
- [ ] Price chart renders with timeframe switching
- [ ] Order book visualization works
- [ ] Resolved markets show correctly (no trading)
- [ ] Comments displayed, posted via trades only
- [ ] Responsive on mobile (sticky trade button)
