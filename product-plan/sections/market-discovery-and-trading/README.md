# Market Discovery & Trading

## Overview

The core marketplace where users discover and trade on prediction markets. This is the main landing page of bitCaster, designed for quick market browsing and frictionless trading.

## User Flows

### Browse Markets by Tag

1. User lands on page, sees Trending markets by default
2. Horizontal tag bar shows meta tags (Trending, Popular, New) and category tags (Sports, Politics, etc.)
3. User taps a tag to filter — single-select behavior (previous tag deselects)
4. Markets update to show filtered results

### Quick Trade (Yes/No Market)

1. User sees market card with current odds displayed (e.g., "65.2%")
2. User clicks "Buy YES" or "Buy NO" button
3. Card transforms to inline trading interface:
   - Shows predicted odds after purchase
   - Amount picker with preset buttons (500, 1K, 5K, 10K)
   - "BUY [amount] SATS" confirmation button
4. User confirms, trade executes, card returns to normal

### Quick Trade (Categorical Market)

1. User sees market with multiple outcomes listed vertically
2. Each outcome shows label, current odds, Yes/No buttons
3. User clicks Yes or No on specific outcome
4. Same trading interface appears
5. Trade executes for that specific outcome

### Apply Filters

1. User uses filter controls below tag bar
2. Available filters:
   - Market type (Yes/No, Categorical, Two-Dimensional)
   - Minimum volume (10K+, 100K+, 500K+, 1M+, 5M+)
   - Closing date (7 days, 30 days, 90 days, 6 months, 1 year)
3. Active filter count shown, "Clear all" to reset

### Navigate to Market Detail

1. User clicks anywhere on market card (except buttons/inputs)
2. Navigates to market detail page

## Design Decisions

### Single-Select Tag Navigation

Tags use single-select behavior (not multi-select) for simplicity. The amber-colored meta tags (Trending, Popular, New) provide quick access to curated lists, while category tags filter by topic.

### Inline Trading

Trading happens directly on the card without modal dialogs, reducing friction. The card "transforms" to show the trade interface when a buy button is clicked.

### Market Card Layout

- Hero image with gradient overlay
- Title prominently displayed
- For Yes/No: Single percentage badge + Buy YES/NO buttons
- For Categorical: Scrollable outcome list with individual Yes/No buttons
- Footer: Volume (BTC), Liquidity, Trader count, Like button

### Sticky Navigation

Search bar and tag bar are sticky, always accessible while scrolling through markets.

## Components Provided

- `MarketDiscovery` — Main page with all elements
- `TagBar` — Horizontal scrollable tag navigation
- `FilterControls` — Filter controls panel
- `MarketCard` — Individual market card with trading interface

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSearch` | Search query changed |
| `onTagSelect` | Tag clicked (single-select) |
| `onMarketTypeChange` | Market type filter changed |
| `onVolumeRangeChange` | Volume filter changed |
| `onClosingDateChange` | Closing date filter changed |
| `onBuyYes` | Buy YES on yes/no market |
| `onBuyNo` | Buy NO on yes/no market |
| `onBuyOutcomeYes` | Buy YES on categorical outcome |
| `onBuyOutcomeNo` | Buy NO on categorical outcome |
| `onViewMarket` | Card clicked (navigate to detail) |
| `onLoadMore` | Infinite scroll triggered |

## Visual Reference

See `screenshot.png` for the target UI design.
