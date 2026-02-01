# Market Detail Specification

## Overview
The Market Detail page provides a comprehensive view of a single prediction market, enabling users to analyze market data, execute trades, and track activity. Accessed by clicking on any market card from the discovery view, this page serves as the primary trading interface for all market types (Yes/No, Categorical, and 2D composite markets). Trading uses an AMM (Automated Market Maker) model; there is no order book.

## User Flows

### Entry Points
- User clicks on a market card (outside of Yes/No buttons) in Market Discovery
- User clicks on a secondary market from an expanded 2D market list
- User follows a direct link to a market

### Trading Flow
1. User views current odds displayed as a prominent percentage in the chart header
2. User selects outcome (Yes/No for binary, specific outcome for categorical, cell for 2D)
3. User enters trade amount in sats
4. System displays predicted odds after trade, potential payout, and fees
5. User confirms or cancels trade
6. Trade executes and activity feed updates

### Analysis Flow
- User views price history chart with current percentage displayed prominently
- User switches chart timeframes (1h, 24h, 7d, 30d, All)
- User toggles between price chart and volume chart
- Key metrics (volume, liquidity, traders, like count) are displayed in the header footer

### Activity Flow
- User scrolls through recent trades in the trades section
- User views and posts comments in the standalone comments section at the bottom
- User can like the market via the header metrics footer

## UI Requirements

### Header Section
- Large market title/question prominently displayed
- Market image (if available) as header background with gradient overlay
- Category tags displayed below title
- Close date with countdown timer (if closing soon)
- Share button
- Creator info (avatar, name, reputation, markets created)
- **Metrics footer bar** at the bottom of the header matching MarketCard footer style:
  - Volume (BTC format, amber color)
  - Liquidity (droplet icon)
  - Traders (users icon)
  - Like button with count (heart icon)

### Trading Panel (Right Sidebar on Desktop)
- Current odds display:
  - **Yes/No markets**: Two large buttons showing Yes % and No %
  - **Categorical markets**: Vertical list of outcomes with odds
  - **2D markets**: Grid layout matching discovery card, but larger
- Order amount input with sats denomination
- Quick amount buttons (100, 500, 1000, 5000 sats)
- Predicted odds after trade (shows price impact)
- Potential payout calculation
- Creator fee display (e.g., "0.5% creator fee")
- Confirm Trade button (primary blue)
- Cancel button to clear selection

### Price Chart Section
- **Current percentage** displayed prominently as the section header (replaces "Price Chart" text):
  - Yes/No markets: shows current yes odds (e.g., "67.5%")
  - Categorical markets: shows leading outcome with odds (e.g., "Chiefs 28.5%")
  - 2D markets: shows the leading cell odds
  - Resolved markets: shows final outcome text (e.g., "Resolved: Yes")
- Line chart showing price history
- Timeframe selector: 1h | 24h | 7d | 30d | All
- Toggle: Price / Volume
- For categorical markets: multi-line chart with legend
- For 2D markets: selector to view individual cell price history

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

### Recent Trades Section
- Shows recent trades without tab navigation (trades only)
- Each trade shows: user (anonymized), side, amount, price, timestamp
- Infinite scroll with "Load more" button

### Related Markets Section
- Horizontal scrollable list of related markets
- Based on same category tags
- Shows mini market cards with quick stats

### Comments Section (Bottom)
- Standalone section at the bottom of the page
- Comment input with send button
- Comment list with user avatar, name, timestamp
- Like button per comment
- Infinite scroll with "Load more" button

## Market Type Variations

### Yes/No Markets
- Two large outcome buttons in trading panel
- Simple price chart with single line
- Current percentage shows yes odds

### Categorical Markets
- Vertical list of outcomes in trading panel
- Each outcome has its own Buy Yes/Buy No option
- Multi-line price chart with color-coded outcomes
- Current percentage shows leading outcome

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

### Tablet (768px - 1023px)
- Single column with trading panel at top (collapsible)
- Stacked layout: Header -> Trading -> Chart -> Activity

### Mobile (< 768px)
- Single column, vertically stacked
- Trading panel becomes sticky bottom bar with "Trade" button
- Tapping "Trade" opens full-screen trading modal
- Simplified chart (touch-friendly)
- Activity feed below chart
- Bottom navigation bar visible (from shell)

## Configuration
- shell: true
