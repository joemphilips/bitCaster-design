# Milestone 3: Portfolio

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-2 complete

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
Implement the Portfolio section — personal trading dashboard with positions, P/L, activity, and created markets.

## Overview
Users view their trading performance, manage positions, and track all wallet activity. Includes a profile card with interactive P/L chart and quick-access deposit/withdraw buttons.

**Key Functionality:**
- Conditional entry: "Get Started" CTA when no wallet, full dashboard when wallet ready
- Profile card with avatar (clickable upload), display name, joined date, view count
- Interactive P/L chart with time range selectors (1D/1W/1M/ALL)
- Stats row: Positions Value, Biggest Win, Predictions count
- Deposit/Withdraw action buttons
- Positions tab with Active/Closed sub-tabs
- Activity feed (deposits, withdrawals, buys, sells, payouts, creator fees)
- My Markets collapsible section
- Sell and Claim buttons on positions

## What to Implement

### Components
- `Portfolio.tsx` — Main dashboard layout
- `ProfileCard.tsx` — User profile with avatar
- `PLChart.tsx` — P/L chart with time range selector
- `PositionsList.tsx` — Positions with Active/Closed tabs
- `PositionRow.tsx` — Individual position row
- `FundsList.tsx` — Base ecash funds list
- `FundRow.tsx` — Individual fund row
- `ActivityFeed.tsx` — Activity history
- `MyMarkets.tsx` — Created markets collapsible section
- `CreatedMarketRow.tsx` — Created market row

### Key Callbacks
- `onGetStarted` — Navigate to wallet setup
- `onAvatarUpload` — Upload avatar
- `onTimeRangeChange` — P/L chart time range
- `onDeposit` / `onWithdraw` — Open deposit/withdraw modal
- `onSellPosition` — Sell a position
- `onClaimPayout` — Claim winning position payout
- `onClaimCreatorFees` — Claim creator fees
- `onViewPosition` / `onViewMarket` / `onViewActivity` — View details
- `onPositionsTabChange` — Active/Closed tab switch
- `onOpenSettings` — Settings gear icon

## Expected User Flows

### Flow 1: View Portfolio
1. User navigates to Portfolio
2. Sees profile card, P/L chart, stats row
3. Browses active positions
**Outcome:** Full portfolio overview displayed

### Flow 2: Sell a Position
1. User clicks "Sell" on an active position
**Outcome:** Sell flow initiated

### Flow 3: First-Time User (No Wallet)
1. User navigates to Portfolio without wallet setup
2. Sees "Get Started" CTA
3. Clicks "Get Started"
**Outcome:** Navigates to wallet setup

## Done When
- [ ] Tests written and passing
- [ ] "Get Started" CTA shown when no wallet
- [ ] Full dashboard when wallet ready
- [ ] P/L chart with time range switching
- [ ] Active/Closed position tabs work
- [ ] Activity feed displays all activity types
- [ ] My Markets section collapses/expands
- [ ] Deposit/Withdraw buttons trigger callbacks
- [ ] Responsive on mobile
