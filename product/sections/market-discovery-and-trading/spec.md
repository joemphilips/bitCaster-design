# Market Discovery & Trading Specification

## Overview
Core marketplace where users browse prediction markets through a single-select tag navigation system, filter and search markets, and execute quick trades directly from market cards. The default view shows Trending markets.

## User Flows
- User lands on page and sees Trending markets by default (Trending tag pre-selected)
- User taps a different tag to switch view (only one tag active at a time)
- User can apply filters to show only certain markets (Market Type, Volume range, Closing date).
- For Yes/No markets: User clicks Buy Yes/No button → card transforms to trade interface
- For categorical markets: User scrolls vertically through choices, clicks Yes/No on a specific choice → card transforms to trade interface
- User confirms trade or cancels with × button to return card to normal state
- User clicks anywhere else on market card → navigates to full market detail page
- User scrolls down → more markets load automatically (infinite scroll)

## UI Requirements
- Single horizontal tag bar with meta tags (Trending, Popular, New) and category tags (Sports, Politics, etc.) - only one tag can be selected at a time
- Three filter controls: Market Type dropdown, Volume range, Closing date slider
- Market cards showing: image, title/question, current odds, action buttons, and metrics footer
- Volume displayed with ₿ symbol (e.g., "₿0.05")
- Categorical market cards: vertical scrollable list of choices, each with its own Yes/No buttons
- Inline card transformation for quick trading with × cancel, predicted odds, amount picker, BUY button
- Market Card should not show tag information (tags are only for market detail page)
- Each market card includes a 'like' button with count in the metrics footer
- Market Card should not change size when user clicks Yes/No button to toggle trading mode
- Trading view overlay must cover the entire card (not just the content area)
- All market types (Yes/No, Categorical, 2D) must have the same fixed card size
- Metrics footer must always be visible when not in trading view overlay mode
- Infinite scroll loading

## Configuration
- shell: true
