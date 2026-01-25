# Milestone 2: Market Discovery & Trading

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

Implement the Market Discovery & Trading feature — the core marketplace where users browse prediction markets, filter by tags, and execute quick trades.

## Overview

This is the main landing page of bitCaster where users discover active prediction markets. Users can browse markets through a single-select tag navigation system (Trending, Popular, New, or category tags like Sports, Politics, etc.), apply filters, and execute quick trades directly from market cards.

**Key Functionality:**
- Browse active prediction markets in a responsive grid layout
- Single-select tag navigation (meta tags: Trending/Popular/New, category tags)
- Filter markets by type (Yes/No, Categorical, Two-Dimensional), volume range, and closing date
- Execute quick trades directly from market cards without leaving the page
- View market details by clicking anywhere on a card (except buttons)
- Infinite scroll for loading more markets

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/market-discovery-and-trading/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

The test instructions are framework-agnostic — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, etc.).

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/market-discovery-and-trading/components/`:

- `MarketDiscovery.tsx` — Main page component with search, tags, filters, and market grid
- `TagBar.tsx` — Horizontal scrollable tag bar (single-select)
- `FilterControls.tsx` — Filter controls for market type, volume, and closing date
- `MarketCard.tsx` — Individual market card with trading interface

### Data Layer

The components expect these data shapes:

```typescript
// Tags
interface MetaTag {
  id: string
  label: string
  description: string
}

interface CategoryTag {
  id: string
  label: string
  marketCount: number
}

// Markets
interface YesNoMarket {
  id: string
  type: 'yesno'
  title: string
  imageUrl: string
  currentOdds: { yes: number; no: number }
  volume: number
  liquidity: number
  traderCount: number
  closingDate: string
  likeCount: number
  isLiked: boolean
}

interface CategoricalMarket {
  id: string
  type: 'categorical'
  title: string
  imageUrl: string
  outcomes: { id: string; label: string; odds: number }[]
  volume: number
  liquidity: number
  traderCount: number
  closingDate: string
  likeCount: number
  isLiked: boolean
}
```

You'll need to:
- Create API endpoints to fetch markets with filtering/pagination
- Implement real-time odds updates
- Handle trade execution

### Callbacks

Wire up these user actions:

| Callback | Description | Event Triggered |
|----------|-------------|-----------------|
| `onSearch` | User enters search query | Filter markets |
| `onTagSelect` | User clicks a tag | Filter by tag (single-select) |
| `onMarketTypeChange` | User toggles market type filter | Filter markets |
| `onVolumeRangeChange` | User changes volume filter | Filter markets |
| `onClosingDateChange` | User changes closing date filter | Filter markets |
| `onBuyYes` | User buys YES on yes/no market | `Bought` event |
| `onBuyNo` | User buys NO on yes/no market | `Bought` event |
| `onBuyOutcomeYes` | User buys YES on categorical outcome | `Bought` event |
| `onBuyOutcomeNo` | User buys NO on categorical outcome | `Bought` event |
| `onViewMarket` | User clicks market card | Navigate to detail |
| `onLoadMore` | User scrolls to bottom | Load more markets |

### Empty States

Implement empty state UI for when no records exist:

- **No markets found:** Show a helpful message when search/filters return no results with a "Try adjusting your filters" prompt
- **First-time experience:** If the platform is new with no markets, show messaging about creating the first market

The provided components include empty state designs — make sure to render them when data is empty rather than showing blank screens.

## Files to Reference

- `product-plan/sections/market-discovery-and-trading/README.md` — Feature overview and design intent
- `product-plan/sections/market-discovery-and-trading/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/market-discovery-and-trading/components/` — React components
- `product-plan/sections/market-discovery-and-trading/types.ts` — TypeScript interfaces
- `product-plan/sections/market-discovery-and-trading/sample-data.json` — Test data
- `product-plan/sections/market-discovery-and-trading/screenshot.png` — Visual reference

## Expected User Flows

When fully implemented, users should be able to complete these flows:

### Flow 1: Browse Markets by Tag

1. User lands on page and sees Trending markets by default (Trending tag pre-selected)
2. User taps a different tag (e.g., "Sports")
3. **Outcome:** Markets filter to show only Sports markets, previous tag deselects

### Flow 2: Execute a Quick Trade (Yes/No Market)

1. User sees a Yes/No market card with current odds displayed
2. User clicks "Buy YES" button
3. Card transforms to show trade interface with amount picker
4. User selects amount (preset buttons: 500, 1K, 5K, 10K)
5. User clicks "BUY [amount] SATS" button
6. **Outcome:** Trade executes, card returns to normal state, balance updates

### Flow 3: Execute a Quick Trade (Categorical Market)

1. User sees a categorical market card with multiple outcomes
2. User scrolls through outcomes to find their pick
3. User clicks "Yes" on a specific outcome (e.g., "Boston Celtics")
4. Card transforms to show trade interface
5. User confirms the trade
6. **Outcome:** Trade executes successfully

### Flow 4: Apply Filters

1. User clicks filter controls
2. User selects "Yes/No" market type only
3. User sets minimum volume to "100K+"
4. User sets closing date to "Within 30 days"
5. **Outcome:** Markets filter to match criteria, active filter count shows

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Components render with real data from backend
- [ ] Tag navigation works (single-select)
- [ ] Filter controls work
- [ ] Quick trading works for Yes/No markets
- [ ] Quick trading works for categorical markets
- [ ] Market card click navigates to detail page
- [ ] Infinite scroll loads more markets
- [ ] Empty states display properly when no markets match filters
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile
