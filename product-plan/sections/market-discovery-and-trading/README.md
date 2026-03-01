# Market Discovery & Trading

## Overview
Core marketplace where users browse prediction markets through a single-select tag navigation system, filter and search markets, and execute quick trades directly from market cards. This is the default home view when the user opens the app.

## Screenshot
See `MarketDiscoveryView.png` in the product spec directory.

## Components
- `MarketDiscovery` — Root component for the marketplace view
- `TagBar` — Horizontal tag navigation (meta tags + category tags, single-select)
- `FilterControls` — Collapsible filter row (Market Type, Volume range, Closing date)
- `MarketCard` — Individual market card with trading overlay capability

## Market Card Types

### Yes/No Markets
Display order: title/question → chance percentage (e.g., "Chance 67.5%") → Buy Yes / Buy No buttons. Clicking a buy button transforms the card into a trading overlay with amount picker and BUY confirmation.

### Categorical Markets
Vertical scrollable list of outcomes, each with its own Yes/No buttons. Same trading overlay behavior on click.

### Numeric Markets
Large implied price with unit (e.g., "$112,500"), range context as secondary text (e.g., "Range: $0 - $200,000"). No buy buttons on the card. Entire card is clickable and navigates to the market detail page.

## Key Features
- Single-select tag bar (only one tag active at a time, defaults to "Trending")
- Filter row hidden by default, toggled via filter icon in tag bar
- Fixed card sizes across all market types
- Trading overlay covers entire card (not just content area)
- Metrics footer always visible when not in trading overlay mode
- Infinite scroll loading
- Like button with count in metrics footer
- Refresh button with spinning icon during refresh
- "Updated X min ago" timestamp
- Background loading progress bar (footer, full-width) when post-setup data load is in progress

## Configuration
- shell: true
