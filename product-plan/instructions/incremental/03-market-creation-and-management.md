# Milestone 3: Market Creation & Management

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

Implement the Market Creation & Management feature — the creator dashboard for monitoring, analyzing, and managing prediction markets.

## Overview

Authenticated market creators land on a tabbed dashboard showing aggregate stats, a paginated list of their markets, and volume analytics charts. From the dashboard they can cancel active markets, claim accumulated creator fees, and launch the Market Creation Wizard (Milestone 8) to publish new markets. The Analytics tab presents time-series volume data togglable between aggregate and per-market views.

**Key Functionality:**
- Dashboard stats: active market count, resolved count, total volume, total fees earned
- Paginated market list with status badges, per-market volume, and per-market fees
- Volume chart with daily/weekly/monthly time scale and aggregate vs. per-market toggle
- Cancel market action (with confirmation)
- Claim creator fees action
- "Add Market" CTA that launches the Market Creation Wizard at `/creator/new`

## Recommended Approach: Test-Driven Development

See `product-plan/sections/market-creation-and-management/tests.md` for detailed test instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for StatCard, MarketRow, VolumeChart, Pagination, and tab navigation
2. Implement each component to make the tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/market-creation-and-management/components/`:

- `MarketCreationDashboard` — Main tabbed container (Overview / Analytics / Add Market)
- `MarketRow` — Individual market list item with status, volume, fees, and actions
- `StatCard` — Single stat display (label, value, icon)
- `VolumeChart` — Time-series volume chart with aggregate/per-market toggle
- `Pagination` — Page navigation (previous, numbered pages, next)

### Data Layer

Key types (see `product-plan/sections/market-creation-and-management/types.ts`):
- `DashboardStats`, `CreatorMarket`, `VolumeChartData`, `MarketVolumeData`, `PaginationState`

API endpoints to implement:
- `GET /creator/stats` — aggregate dashboard stats for the authenticated creator
- `GET /creator/markets?page=&limit=` — paginated list of creator's markets
- `GET /creator/analytics?timeScale=daily|weekly|monthly&mode=aggregate|per-market` — volume chart data
- `POST /creator/markets/:id/cancel` — cancel a market
- `POST /creator/markets/:id/claim-fees` — claim accumulated fees for a market

Sample data available at `product-plan/sections/market-creation-and-management/sample-data.json`.

### Callbacks

Wire up these props on the `MarketCreationDashboard` component:

| Callback | What to do |
|----------|------------|
| `onViewDetails` | Navigate to `/markets/:id` |
| `onTabChange` | Switch between Overview, Analytics, and Add Market tabs |
| `onCreateMarket` | Navigate to `/creator/new` (Market Creation Wizard) |
| `onCancelMarket` | Show confirmation dialog, then call cancel API |
| `onClaimFees` | Call claim-fees API for the given market |
| `onSaveDraft` | Persist wizard draft to backend |
| `onTimeScaleChange` | Fetch analytics with updated `timeScale` parameter |
| `onChartModeChange` | Fetch analytics with updated `mode` parameter |
| `onPageChange` | Fetch the selected page of creator markets |

### Empty States

- No markets created yet: "You haven't created any markets yet" with CTA to create first market
- Analytics tab with no data: empty chart with "No trading data yet" message
- Fees of zero: show ₿0 rather than hiding the fee column

## Files to Reference

- `product-plan/sections/market-creation-and-management/README.md`
- `product-plan/sections/market-creation-and-management/tests.md`
- `product-plan/sections/market-creation-and-management/components/`
- `product-plan/sections/market-creation-and-management/types.ts`
- `product-plan/sections/market-creation-and-management/sample-data.json`

## Expected User Flows

**Review dashboard:**
1. Creator navigates to `/creator` — Overview tab loads with stats and first page of markets
2. Creator sees aggregate stats: active count, resolved count, total volume, total fees
3. Creator browses paginated market list; clicks page 2 to see older markets

**Analyze volume:**
1. Creator clicks Analytics tab — volume chart renders with daily data in aggregate mode
2. Creator clicks "Weekly" — chart x-axis updates to weekly buckets
3. Creator clicks "Per Market" toggle — chart splits into individual colored lines per market

**Claim fees:**
1. Creator sees a market with unclaimed fees in the list
2. Creator clicks "Claim Fees" on that row — confirmation dialog appears
3. Creator confirms — API call executes, fee value resets to ₿0 and success toast appears

**Create a new market:**
1. Creator clicks the "Add Market" tab or CTA button
2. User is navigated to `/creator/new` (Market Creation Wizard — see Milestone 8)

## Done When

- [ ] Tests written and passing
- [ ] Stats load with real data from API
- [ ] Market list paginates correctly
- [ ] Volume chart renders and responds to time scale and mode toggles
- [ ] Cancel market flow works end-to-end with confirmation
- [ ] Claim fees flow works end-to-end
- [ ] "Add Market" navigates to wizard route
- [ ] Empty state shows for creators with no markets
- [ ] Responsive on mobile (stats stack, chart scrollable)
