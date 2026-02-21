# Market Discovery & Trading

## Overview
Core marketplace where users browse prediction markets through a single-select tag navigation system, filter and search markets, and execute quick trades directly from market cards. The default view shows Trending markets.

## User Flows
- User lands on page and sees Trending markets by default
- User taps a tag to switch view (single-select)
- User applies filters (Market Type, Volume range, Closing date)
- For Yes/No markets: clicks Buy Yes/No → card transforms to trade interface
- For categorical markets: scrolls through choices, clicks Yes/No on a choice
- User confirms trade or cancels with × button
- Clicking anywhere else on card navigates to market detail page
- Infinite scroll for loading more markets

## Design Decisions
- Single horizontal tag bar with meta tags (Trending, Popular, New) and category tags
- Three market types: Yes/No, Categorical, Two-Dimensional (2D composite)
- 2D markets show composite probability grids
- Markets with secondaryMarkets show expandable "and..." link
- Fixed card height of 280px for all types
- Trading overlay covers entire card

## Data Used
**Entities:** Market (YesNoMarket, CategoricalMarket, TwoDimensionalMarket), MetaTag, CategoryTag, TradeState, FilterState
**From global model:** Bought, Sold events update market odds and volume

## Components Provided
- `MarketDiscovery` — Main container with tag bar, filters, and market grid
- `MarketCard` — Individual market card with trading overlay
- `FilterControls` — Market type, volume range, and closing date filters
- `TagBar` — Horizontal tag navigation (single-select)

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSearch` | Called when user searches for markets |
| `onTagSelect` | Called when user selects a tag |
| `onBuyYes` | Called when user buys Yes on a yes/no market |
| `onBuyNo` | Called when user buys No on a yes/no market |
| `onBuyOutcomeYes` | Called when user buys Yes on a categorical outcome |
| `onBuyOutcomeNo` | Called when user buys No on a categorical outcome |
| `onViewMarket` | Called when user navigates to market detail |
| `onLoadMore` | Called for infinite scroll |
| `onBuy2DYesNoCombo` | Called when user buys a 2D yes/no combo |
| `onBuy2DCategoricalCombo` | Called when user buys a 2D categorical combo |
| `onViewSecondaryMarket` | Called when user clicks a secondary market |
