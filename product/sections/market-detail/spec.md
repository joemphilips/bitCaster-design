# Market Detail Specification

## Overview
The Market Detail page provides a comprehensive view of a single prediction market, enabling users to analyze market data, execute trades, and track activity. Accessed by clicking on any market card from the discovery view, this page serves as the primary trading interface for all market types (Yes/No, Categorical, and 2D composite markets).

## User Flows

### Entry Points
- User clicks on a market card (outside of Yes/No buttons) in Market Discovery
- User clicks on a secondary market from an expanded 2D market list
- User follows a direct link to a market

### Trading Flow
1. User views current odds and order book depth
2. User selects outcome (Yes/No for binary, specific outcome for categorical, cell for 2D)
3. User enters trade amount in sats
4. System displays predicted odds after trade, potential payout, and fees
5. User confirms or cancels trade
6. Trade executes and activity feed updates

### Analysis Flow
- User views price history chart (default: 7 days)
- User switches chart timeframes (1h, 24h, 7d, 30d, All)
- User toggles between price chart and volume chart
- User views key statistics (volume, liquidity, trader count, etc.)

### Activity Flow
- User scrolls through recent trades in activity feed
- User views comments and discussions
- User can like the market (updates like count)

## UI Requirements

### Header Section
- Large market title/question prominently displayed
- Market image (if available) as header background with gradient overlay
- Category tags displayed below title
- Like button with count
- Share button
- Close date with countdown timer (if closing soon)

### Trading Panel (Right Sidebar on Desktop)
- Current odds display:
  - **Yes/No markets**: Two large buttons showing Yes % and No %
  - **Categorical markets**: Vertical list of outcomes with odds
  - **2D markets**: Grid layout matching discovery card, but larger
- Order amount input with sats denomination (₿ symbol)
- Quick amount buttons (100, 500, 1000, 5000 sats)
- Predicted odds after trade (shows price impact)
- Potential payout calculation
- Creator fee display (e.g., "0.5% creator fee")
- Confirm Trade button (primary blue)
- Cancel button to clear selection

### Order Book Section
- Depth visualization chart (bids vs asks)
- Buy orders list (green, sorted by price descending)
- Sell orders list (red, sorted by price ascending)
- Spread indicator

### Price Chart Section
- Line chart showing price history
- Timeframe selector: 1h | 24h | 7d | 30d | All
- Toggle: Price / Volume
- Hover to see exact values at timestamp
- For categorical markets: multi-line chart with legend
- For 2D markets: selector to view individual cell price history

### Market Statistics
- Total Volume (in sats with ₿ symbol)
- Liquidity
- Unique Traders
- Created Date
- Approved Date
- Time Remaining (countdown if < 7 days)

### Resolution Details Section
- Resolution criteria (how the market resolves)
- Resolution source (oracle, manual, etc.)
- Resolution date/time
- Current resolution status (Open, Pending Resolution, Resolved)
- For resolved markets: Final outcome displayed prominently

### Creator Info Section
- Creator avatar and name
- Creator reputation score (if available)
- Total markets created
- Creator fee percentage
- Link to creator's profile

### Activity Feed Section
- Tab navigation: Trades | Comments
- **Trades tab**: Recent trades showing user (anonymized), side, amount, price, timestamp
- **Comments tab**: Discussion thread with user comments
- Infinite scroll for both tabs

### Related Markets Section (Bottom)
- Horizontal scrollable list of related markets
- Based on same category tags
- Shows mini market cards with quick stats

## Market Type Variations

### Yes/No Markets
- Two large outcome buttons in trading panel
- Simple price chart with single line
- Order book shows Yes/No sides

### Categorical Markets
- Vertical list of outcomes in trading panel
- Each outcome has its own Buy Yes/Buy No option
- Multi-line price chart with color-coded outcomes
- Dropdown to select which outcome's order book to view

### Two-Dimensional (2D) Markets
- Grid layout in trading panel matching base market structure
- Shows base market question and secondary question
- Each cell clickable for trading
- Price chart has selector for viewing individual cells
- Displays link back to base market

## Responsive Behavior

### Desktop (>= 1024px)
- Two-column layout: Content (left), Trading Panel (right sticky)
- Chart and activity side by side below header
- Full order book visualization

### Tablet (768px - 1023px)
- Single column with trading panel at top (collapsible)
- Stacked layout: Header → Trading → Chart → Activity
- Condensed order book

### Mobile (< 768px)
- Single column, vertically stacked
- Trading panel becomes sticky bottom bar with "Trade" button
- Tapping "Trade" opens full-screen trading modal
- Simplified chart (touch-friendly)
- Activity feed in tabs below chart
- Bottom navigation bar visible (from shell)

## Configuration
- shell: true
