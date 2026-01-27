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
- Filter row is hidden by default; user clicks a slider/filter icon in the tag bar to reveal/collapse it
- Three filter controls: Market Type dropdown, Volume range, Closing date slider
- Market cards showing: image, title/question, current odds, action buttons, and metrics footer
- Volume displayed with ₿ symbol (e.g., "₿0.05")
- Yes/No market cards: display order must be title/question → chance (odds shown inline, e.g., "Chance 67.5%") → Buy Yes/Buy No buttons
- Categorical market cards: vertical scrollable list of choices, each with its own Yes/No buttons
- Inline card transformation for quick trading with × cancel, predicted odds, amount picker, BUY button
- Market Card should not show tag information (tags are only for market detail page)
- Each market card includes a 'like' button with count in the metrics footer
- Market Card should not change size when user clicks Yes/No button to toggle trading mode
- Trading view overlay must cover the entire card (not just the content area)
- All market types (Yes/No, Categorical, 2D) must have the same fixed card size
- Metrics footer must always be visible when not in trading view overlay mode
- Infinite scroll loading

## Two Dimensional Markets

Markets can reference another market as their "base market" (default: "sats"). When baseMarket is another market ID, it creates a composite 2D market with outcomes spanning both markets.

### Terminology
- **Base Market**: The primary market being referenced (e.g., "Will Bitcoin reach $100K?")
- **Secondary Market**: A market that uses another market as its base, creating 2D outcomes
- **Secondary Markets Array**: On base markets, lists all markets that reference it

### Display Rules

**Yes/No + Yes/No (2x2 Grid):**
- Card shows base market question, then "and...", then secondary market question
- 2x2 grid layout: Yes/Yes, Yes/No, No/Yes, No/No cells
- Each cell displays probability and is clickable for trading
- Cells colored by outcome (green tint for Yes outcomes, red for No)

**Categorical + Yes/No (Grid Layout):**
- Rows represent categorical outcomes from base market
- Columns are Yes/No for the secondary question
- Each cell shows probability and is clickable for trading
- Scrollable if many categorical outcomes

**Categorical + Categorical:**
- Too complex for inline display
- Shows "Buy" button only, which navigates to detail page

### Secondary Markets Indicator
- Markets that have secondaryMarkets show "and..." link after their question
- Clicking "and..." expands card height inline to show secondary market list
- Each secondary market in the list shows its question
- Clicking a secondary market navigates to that 2D market's detail page (not the base market)

### Card Height Behavior
- Base height: 280px for all market cards
- When secondary markets expanded: 280px + 40px per secondary market listed

## Configuration
- shell: true
