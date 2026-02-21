# Milestone 4: Portfolio

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Portfolio feature — the personal trading dashboard where users track their positions, P/L, activity history, and created markets.

## Overview

The Portfolio page has a conditional entry point: users without a connected wallet see a "Get Started" CTA that leads to Wallet Setup; users with a wallet see their full dashboard. The dashboard shows a profile card with an interactive P/L chart, aggregate stats, a tabbed positions list (Active/Closed) with Sell/Claim actions, a chronological activity feed, and a collapsible section listing the user's created markets.

**Key Functionality:**
- Conditional rendering: no-wallet CTA vs. full dashboard
- Profile card with avatar upload and interactive P/L chart (1D/1W/1M/ALL time ranges)
- Stats row: Positions Value, Biggest Win, Predictions count
- Deposit and withdraw sats actions
- Tabbed positions list (Active with Sell, Closed with Claim Payout)
- Activity feed showing deposits, withdrawals, trades, payouts, and creator fees
- Collapsible "My Markets" section linking to market detail and creator dashboard

## Recommended Approach: Test-Driven Development

See `product-plan/sections/mypage/tests.md` for detailed test instructions (the `mypage` folder contains the prior design; `portfolio` folder contains the updated design).

**TDD Workflow:**
1. Read `tests.md` and write failing tests for ProfileCard, PLChart, PositionRow, ActivityFeed, and the no-wallet gate
2. Implement each component to make the tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/portfolio/components/`:

- `Portfolio` — Main container with conditional rendering (no-wallet vs. full dashboard)
- `ProfileCard` — User info (avatar, name, joined date, view count) plus P/L chart
- `PLChart` — Interactive P/L line chart with 1D/1W/1M/ALL selector
- `StatsRow` — Three stat cards (Positions Value, Biggest Win, Predictions)
- `PositionsList` — Tabbed list of positions (Active / Closed)
- `PositionRow` — Individual position with market title, shares, value, P/L, and Sell/Claim button
- `ActivityFeed` — Chronological list of activity items
- `MyMarkets` — Collapsible section listing created markets
- `CreatedMarketRow` — Individual created market with status, volume, fees

### Data Layer

Key types (see `product-plan/sections/portfolio/types.ts`):
- `UserProfile`, `PLChartData`, `PortfolioStats`, `Position`, `ActivityItem`, `CreatedMarket`

API endpoints to implement:
- `GET /portfolio/profile` — user profile and P/L chart data for default time range
- `GET /portfolio/pl?range=1D|1W|1M|ALL` — P/L time-series data for chart
- `GET /portfolio/stats` — Positions Value, Biggest Win, Predictions count
- `GET /portfolio/positions?tab=active|closed` — list of positions
- `GET /portfolio/activity` — activity feed items
- `GET /portfolio/markets` — markets created by the user
- `POST /portfolio/positions/:id/sell` — sell an active position
- `POST /portfolio/positions/:id/claim` — claim payout on a closed winning position
- `POST /portfolio/deposit` — initiate deposit (returns Lightning invoice or on-chain address)
- `POST /portfolio/withdraw` — initiate withdrawal
- `POST /portfolio/avatar` — upload new avatar image

### Callbacks

Wire up these props on the `Portfolio` component:

| Callback | What to do |
|----------|------------|
| `onGetStarted` | Navigate to `/setup` (Wallet Setup wizard) |
| `onAvatarUpload` | Upload avatar image file via `POST /portfolio/avatar` |
| `onTimeRangeChange` | Fetch P/L data for selected range and update chart |
| `onDeposit` | Open deposit modal or navigate to deposit flow |
| `onWithdraw` | Open withdraw modal or navigate to withdraw flow |
| `onSellPosition` | Call sell API for the position, refresh positions list |
| `onClaimPayout` | Call claim API for the position, refresh positions list |
| `onClaimCreatorFees` | Call creator fees claim API, refresh My Markets section |
| `onViewMarket` | Navigate to `/markets/:id` |
| `onPositionsTabChange` | Fetch positions for selected tab (active/closed) |
| `onOpenSettings` | Navigate to `/settings` |

### Empty States

- No wallet connected: full-screen "Get Started" CTA (rendered by `Portfolio` component automatically)
- No active positions: "You don't have any open positions yet"
- No closed positions: "You don't have any closed positions yet"
- No activity: "No transaction history yet"
- No created markets: "You haven't created any markets — go to the Creator dashboard to get started"

## Files to Reference

- `product-plan/sections/portfolio/README.md`
- `product-plan/sections/mypage/tests.md`
- `product-plan/sections/portfolio/components/`
- `product-plan/sections/portfolio/types.ts`
- `product-plan/sections/mypage/sample-data.json`

## Expected User Flows

**No-wallet user:**
1. Unauthenticated user navigates to `/portfolio`
2. Portfolio renders a "Get Started" CTA instead of the dashboard
3. User clicks "Get Started" — navigates to `/setup` (Wallet Setup wizard)

**View P/L chart:**
1. Authenticated user lands on `/portfolio` — dashboard loads with 1D P/L chart by default
2. User clicks "1W" button — chart fetches weekly data and redraws
3. User clicks "ALL" — full history renders; P/L amount updates to all-time figure

**Sell a position:**
1. User expands Positions section, Active tab is shown by default
2. User sees an active position with Sell button
3. User clicks Sell — confirmation dialog appears showing current value
4. User confirms — position moves from Active to Closed, stats update

**Deposit sats:**
1. User clicks Deposit button in dashboard header
2. Deposit modal opens with Lightning invoice and QR code
3. User pays invoice — activity feed gains a "Deposit" entry, balance updates

## Done When

- [ ] Tests written and passing
- [ ] No-wallet gate renders CTA; authenticated user sees dashboard
- [ ] P/L chart renders with real data and responds to time range selector
- [ ] Stats row shows real values
- [ ] Active and Closed positions load from API
- [ ] Sell and Claim Payout actions work end-to-end
- [ ] Activity feed loads chronologically
- [ ] My Markets section collapses/expands and links correctly
- [ ] Avatar upload works
- [ ] Deposit and withdraw flows initiate correctly
- [ ] All empty states display properly
- [ ] Responsive on mobile (single-column layout, stats stack)
