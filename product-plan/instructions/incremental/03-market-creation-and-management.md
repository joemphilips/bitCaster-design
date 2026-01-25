# Milestone 3: Market Creation & Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and Milestone 2 (Market Discovery) complete

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

Implement the Market Creation & Management feature — a dashboard for market creators to view their markets, analyze performance, and create new markets.

## Overview

This section provides tools for market creators to manage their prediction markets. It includes an Overview tab with dashboard stats and market list, an Analytics tab with volume charts, and a prominent "Create Market" CTA button that leads to a 5-step creation wizard.

**Key Functionality:**
- View dashboard statistics: active/resolved market counts, total volume, fees earned
- Browse paginated list of created markets with status, volume, and actions
- Analyze market performance with time-series volume charts
- Create new markets via 5-step wizard with draft persistence
- Claim creator fees from resolved markets
- Cancel pending or active markets

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/market-creation-and-management/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/market-creation-and-management/components/`:

- `MarketCreationDashboard.tsx` — Main dashboard with tabs, stats, and market list
- `StatCard.tsx` — Individual stat card with icon and variant styling
- `MarketRow.tsx` — Market list item with thumbnail, status, actions
- `VolumeChart.tsx` — Analytics chart with time scale and mode toggles
- `Pagination.tsx` — Pagination controls for market list

### Data Layer

The components expect these data shapes:

```typescript
interface DashboardStats {
  activeMarketsCount: number
  resolvedMarketsCount: number
  pendingMarketsCount: number
  rejectedMarketsCount: number
  cancelledMarketsCount: number
  totalVolumeSats: number
  totalFeesEarnedSats: number
  totalFeesClaimedSats: number
  totalFeesUnclaimedSats: number
}

interface CreatorMarket {
  id: string
  title: string
  description: string
  imageUrl: string
  type: 'yesno' | 'categorical'
  categoryTags: string[]
  status: 'pending' | 'approved' | 'rejected' | 'resolved' | 'cancelled'
  volume: number
  liquidity: number
  traderCount: number
  closingDate: string
  creatorFeePercent: number
  feesEarnedSats: number
  feesClaimedSats: number
  // Type-specific fields...
}

interface VolumeChartData {
  daily: { date: string; volumeSats: number; feesSats: number }[]
  weekly: { weekStart: string; volumeSats: number; feesSats: number }[]
  monthly: { month: string; volumeSats: number; feesSats: number }[]
}
```

### Callbacks

Wire up these user actions:

| Callback | Description | Event Triggered |
|----------|-------------|-----------------|
| `onTabChange` | User switches between Overview/Analytics | UI state change |
| `onViewDetails` | User clicks to view market details | Navigate to market |
| `onCreateMarket` | User clicks Create Market or submits wizard | `MarketCreated` event |
| `onCancelMarket` | User cancels a pending/active market | `MarketCancelled` event |
| `onClaimFees` | User claims fees from resolved market | `CreatorFeeClaimed` event |
| `onSaveDraft` | Wizard progress is saved | Persist draft locally |
| `onDiscardDraft` | User discards wizard draft | Clear draft |
| `onTimeScaleChange` | User changes chart time scale | UI state change |
| `onChartModeChange` | User toggles aggregate/per-market | UI state change |
| `onPageChange` | User navigates pagination | Load page |
| `onPageSizeChange` | User changes page size | Reload with new size |

### Empty States

Implement empty state UI for when no records exist:

- **No markets created yet:** Show encouraging message with prominent "Create Market" CTA
- **No volume data:** Show placeholder in analytics tab

The provided components include empty state designs.

## Files to Reference

- `product-plan/sections/market-creation-and-management/README.md` — Feature overview
- `product-plan/sections/market-creation-and-management/tests.md` — Test-writing instructions
- `product-plan/sections/market-creation-and-management/components/` — React components
- `product-plan/sections/market-creation-and-management/types.ts` — TypeScript interfaces
- `product-plan/sections/market-creation-and-management/sample-data.json` — Test data

## Expected User Flows

### Flow 1: View Dashboard Statistics

1. User navigates to Market Creation page
2. User sees stat cards: Active Markets, Resolved, Total Volume, Fees Earned
3. User sees pending/rejected/cancelled counts if any exist
4. **Outcome:** User understands their creator performance at a glance

### Flow 2: Claim Creator Fees

1. User sees a resolved market with unclaimed fees
2. User clicks "Claim [amount] sats" button on the market row
3. **Outcome:** Fees are claimed, balance updates, button disappears

### Flow 3: Analyze Volume Performance

1. User clicks "Analytics" tab
2. User sees volume chart with daily data by default
3. User toggles to "Weekly" or "Monthly" time scale
4. User toggles to "Per Market" view to see breakdown
5. **Outcome:** User can analyze trading volume trends

### Flow 4: Create a New Market (5-Step Wizard)

1. User clicks "Create Market" button
2. **Step 1 - Basic Info:** User uploads thumbnail, enters title, selects category tags, sets end date, adds answer URLs
3. **Step 2 - Market Outcomes:** User selects Yes/No, Categorical, or Numeric type; adds outcomes with descriptions
4. **Step 3 - Market Parameters:** User sets liquidity amount and fee percentages
5. **Step 4 - Review:** User sees summary with cost calculation
6. **Step 5 - Final Review:** User writes/generates description, submits
7. **Outcome:** Market created, navigates to new market detail page

### Flow 5: Cancel a Market

1. User sees a pending or active market
2. User clicks "Cancel" button
3. User confirms cancellation
4. **Outcome:** Market status changes to cancelled, funds refunded

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Dashboard stats display correctly
- [ ] Market list renders with proper status badges
- [ ] Pagination works
- [ ] Tab switching works
- [ ] Analytics charts display with time scale options
- [ ] Create Market wizard saves draft progress
- [ ] Market creation submits successfully
- [ ] Fee claiming works
- [ ] Market cancellation works
- [ ] Empty states display when no markets
- [ ] Validation errors show in banner
- [ ] Responsive on mobile
