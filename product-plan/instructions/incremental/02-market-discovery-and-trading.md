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

Implement the Market Discovery & Trading feature — the core marketplace where users browse prediction markets and execute quick trades.

## Overview

Users land on a single-page marketplace showing active prediction markets organized by tags. They can filter by market type, volume, or closing date, then trade directly from a market card without navigating away. Markets come in three types: Yes/No, Categorical, and Two-Dimensional composite. Clicking outside the trading overlay navigates to the full market detail page. New markets append via infinite scroll as the user reaches the bottom.

**Key Functionality:**
- Single-select horizontal tag bar (Trending, Popular, New, Sports, Politics, Crypto, etc.)
- Collapsible filter row (Market Type, Volume Range, Closing Date)
- Fixed-height (280px) market cards for all three market types
- Inline trading overlay that transforms the card without changing its size
- Expandable secondary market list for 2D composite markets ("and..." link)
- Infinite scroll for loading additional markets

## Recommended Approach: Test-Driven Development

See `product-plan/sections/market-discovery-and-trading/tests.md` for detailed test instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for TagBar, FilterControls, MarketCard, TradingOverlay, and SecondaryMarketsList
2. Implement each component to make the tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/market-discovery-and-trading/components/`:

- `MarketDiscovery` — Main container with tag bar, filters, and market grid
- `MarketCard` — Individual market card handling YesNo, Categorical, and 2D types
- `FilterControls` — Market type, volume range, and closing date filters
- `TagBar` — Horizontal tag navigation (single-select)

### Data Layer

Key types (see `product-plan/sections/market-discovery-and-trading/types.ts`):
- `YesNoMarket`, `CategoricalMarket`, `TwoDimensionalMarket`
- `MetaTag`, `CategoryTag`
- `TradeState`, `FilterState`

API endpoints to implement:
- `GET /markets?tag=&type=&minVolume=&maxVolume=&closingBefore=&page=` — paginated market list
- `POST /markets/:id/trade` — execute a quick trade (buy yes/no on a specific outcome)

Sample data available at `product-plan/sections/market-discovery-and-trading/sample-data.json`.

### Callbacks

Wire up these props on the `MarketDiscovery` component:

| Callback | What to do |
|----------|------------|
| `onSearch` | Filter markets by query string; update URL params |
| `onTagSelect` | Fetch markets filtered by selected tag |
| `onBuyYes` | Call trade API with `side: "yes"` for a YesNo market |
| `onBuyNo` | Call trade API with `side: "no"` for a YesNo market |
| `onBuyOutcomeYes` | Call trade API for a categorical outcome, side yes |
| `onBuyOutcomeNo` | Call trade API for a categorical outcome, side no |
| `onViewMarket` | Navigate to `/markets/:id` |
| `onLoadMore` | Fetch next page and append to list |
| `onBuy2DYesNoCombo` | Call trade API for a 2D yes/no combination |
| `onBuy2DCategoricalCombo` | Call trade API for a 2D categorical combination |
| `onViewSecondaryMarket` | Navigate to secondary market detail page |

### Empty States

- No markets match the selected tag: "No markets found for this tag"
- No markets match applied filters: "No markets found — try adjusting your filters"
- Network error during load: error message with retry button

## Files to Reference

- `product-plan/sections/market-discovery-and-trading/README.md`
- `product-plan/sections/market-discovery-and-trading/tests.md`
- `product-plan/sections/market-discovery-and-trading/components/`
- `product-plan/sections/market-discovery-and-trading/types.ts`
- `product-plan/sections/market-discovery-and-trading/sample-data.json`

## Expected User Flows

**Browse and trade (Yes/No):**
1. User lands on `/markets` — Trending tag selected, markets grid visible
2. User clicks "Sports" tag — grid refreshes with sports markets only
3. User clicks "Buy Yes" on a market card — card transforms to trading overlay showing current odds
4. User enters amount (or taps quick button), clicks BUY — trade executes, overlay closes, card odds update

**Browse and trade (Categorical):**
1. User sees categorical card with scrollable outcome list
2. User scrolls to preferred outcome, clicks "Yes" next to it — overlay opens with that outcome pre-selected
3. User confirms trade

**Browse 2D markets:**
1. User sees 2D card with base and secondary questions and probability grid
2. User clicks a cell (e.g., Yes/Yes) — trading overlay opens for that combination
3. User clicks "and..." link — card expands to show list of secondary markets; clicking one navigates to its detail

**Infinite scroll:**
1. User scrolls to bottom of market grid
2. Loading indicator appears, next page fetches
3. New market cards append below existing ones

## Done When

- [ ] Tests written and passing
- [ ] All three market card types render with real data
- [ ] Tag bar single-select works and fetches correct markets
- [ ] Filters apply and combine correctly
- [ ] Trading overlay opens and closes without resizing the card
- [ ] Trades execute via API and card odds reflect the new state
- [ ] Empty states display for no results and network errors
- [ ] Infinite scroll loads additional pages
- [ ] "and..." expands 2D secondary market list
- [ ] Responsive on mobile (tag bar scrolls horizontally, cards stack to single column)
