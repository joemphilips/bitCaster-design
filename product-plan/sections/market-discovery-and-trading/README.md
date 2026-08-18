# Market Discovery & Trading

## Overview

The marketplace lets users browse and filter prediction markets. Each market card opens market detail. This section is the default home view after onboarding.

## Screenshot

See `MarketDiscoveryView.png` in the product specification directory.

## Components

- `MarketDiscovery` is the marketplace root.
- `TagBar` provides single-select tag navigation.
- `FilterControls` provides the market filters.
- `MarketCard` shows one market and navigates to market detail.

## Price Display

Use the explicit `priceAuthority.state` value.

- `confirmed` shows the latest confirmed settlement-fill price.
- `no-trades` shows `No trades yet` with null odds.
- `unavailable` shows `Price unavailable` with null odds.

Do not use a quote, order-book midpoint, registration value, funding result, or `50%` fallback as the current price.

## Market Card Types

### Yes/No Markets

Show the title, current-price state, navigation actions, and metrics. Each action opens market detail. The card does not contain an order form.

### Categorical Markets

Show a vertical outcome list. Each outcome uses the same explicit price-authority state. Each action opens market detail.

### Future Market Types

Numeric markets remain disabled until an authoritative trade representation exists.

## Key Features

- Single-select tags
- Collapsible filters
- Fixed card sizes
- Market-detail navigation
- Explicit confirmed, no-trade, and unavailable price states
- Infinite scroll
- Like action and count
- Refresh action and last-updated value
- Background condition-loading status

## Configuration

- shell: true
