# Market Discovery & Trading Specification

## Overview
Core marketplace where users browse prediction markets through a single-select tag navigation system, filter and search markets, and execute quick trades directly from market cards. The default view shows Trending markets.

## User Flows
- User lands on page and sees Trending markets by default (Trending tag pre-selected)
- User taps a different tag to switch view (only one tag active at a time)
- User can apply filters to show only certain markets (Market Type, Volume range, Closing date).
- For Yes/No markets: User clicks Buy Yes/No button → card transforms to trade interface
- For categorical markets: User scrolls vertically through choices, clicks Yes/No on a specific choice → card transforms to trade interface
- For numeric markets: Card is click-only (no Buy buttons on card) → user clicks card → navigates to full market detail page where trading happens
- User confirms trade or cancels with × button to return card to normal state
- User clicks anywhere else on market card → navigates to full market detail page
- User scrolls down → more markets load automatically (infinite scroll)

## UI Requirements
- Single horizontal tag bar with meta tags (Trending, Popular, New) and category tags (Sports, Politics, etc.) - only one tag can be selected at a time
- Filter row is hidden by default; user clicks a slider/filter icon in the tag bar to reveal/collapse it
- Three filter controls: Market Type dropdown (Yes/No, Categorical, Numeric), Volume range, Closing date slider
- Market cards showing: image, title/question, current odds, action buttons, and metrics footer
- Volume displayed with ₿ symbol (e.g., "₿0.05")
- Yes/No market cards: display order must be title/question → chance (odds shown inline, e.g., "Chance 67.5%") → Buy Yes/Buy No buttons
- Categorical market cards: vertical scrollable list of choices, each with its own Yes/No buttons
- Numeric market cards: large current implied price with unit displayed prominently (e.g., "$112,500"), range context shown as secondary text (e.g., "Range: $0 – $200,000"), no Buy buttons — entire card is clickable to navigate to detail page
- Inline card transformation for quick trading with × cancel, predicted odds, amount picker, BUY button
- Market Card should not show tag information (tags are only for market detail page)
- Each market card includes a 'like' button with count in the metrics footer
- Market Card should not change size when user clicks Yes/No button to toggle trading mode
- Trading view overlay must cover the entire card (not just the content area)
- All market types (Yes/No, Categorical) must have the same fixed card size
- Metrics footer must always be visible when not in trading view overlay mode
- Infinite scroll loading

## Background Loading Progress Bar
If the user finishes wallet setup but condition data download is still in progress, a thin progress bar appears fixed to the **page footer** (full-width, bottom of viewport).
- The bar shows a subtle animated stripe pattern (indeterminate) with text like "Loading market data... (3/10)"
- Once loading completes, the bar fades out and disappears
- If loading failed, the bar turns amber and shows "Failed to load market data" with a Retry button

## Refresh Button & Last Updated Timestamp
Next to the filter controls row (right-aligned, visible whether filters are expanded or collapsed):
1. **Last updated timestamp** — e.g., "Updated 2 min ago" in subtle text
2. **Refresh button** — circular `RefreshCw` icon button; clicking triggers `onRefreshConditions` callback which queries the mint for new/updated conditions and loads them into client-side DB
- These appear in the sticky tag bar area (always visible), right side, next to the filter icon
- The RefreshCw icon spins while refresh is in progress
- Timestamp formatted as relative time ("just now", "2 min ago", "1 hour ago")

## Configuration
- shell: true
