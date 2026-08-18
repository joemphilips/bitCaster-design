# Milestone 6: Market Discovery & Trading

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-5 complete

## Goal

Implement the marketplace where users browse markets and open market detail.

## Required Semantics

- Market cards navigate to market detail.
- Market cards do not contain inline trading.
- `confirmed` shows the latest confirmed settlement-fill price.
- `no-trades` shows `No trades yet` with null prices.
- `unavailable` shows `Price unavailable` with null prices.
- Do not use `50%` or another synthetic fallback.
- Do not derive current price from an order, quote, midpoint, registration value, or funding result.
- Numeric markets remain disabled until an authoritative trade representation exists.

## Key Functionality

- Single-select tags
- Market filters
- Yes/No and categorical cards
- Market-detail navigation
- Explicit confirmed, no-trade, and unavailable price states
- Like action
- Infinite scroll
- Refresh action and last-updated value
- Background loading status

## Components

- `MarketDiscovery.tsx`
- `TagBar.tsx`
- `FilterControls.tsx`
- `MarketCard.tsx`

## Callbacks

- `onTagSelect`
- `onSearch`
- `onMarketTypeChange`
- `onVolumeRangeChange`
- `onClosingDateChange`
- `onViewMarket`
- `onLoadMore`
- `onRefreshConditions`

## Expected User Flows

### Browse And Open A Market

1. The user lands on Trending.
2. The user sees each market's explicit price state.
3. The user selects a card or card action.
4. The app opens `/markets/:id`.

### Filter Markets

1. The user opens the filters.
2. The user selects a market type.
3. The market list updates.

## Done When

- [ ] Tests pass.
- [ ] Tags and filters work.
- [ ] Yes/No and categorical cards render.
- [ ] Confirmed, no-trade, and unavailable states remain distinct.
- [ ] Null prices never become `50%`.
- [ ] Every card action navigates to market detail.
- [ ] No card contains an order form.
- [ ] Infinite scroll and refresh work.
- [ ] The view is responsive.
