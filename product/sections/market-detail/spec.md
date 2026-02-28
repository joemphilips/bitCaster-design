# Market Detail Specification

## Overview
The Market Detail page provides a comprehensive view of a single prediction market, enabling users to analyze market data, execute trades, and track activity. Accessed by clicking on any market card from the discovery view, this page serves as the primary trading interface for all market types (Yes/No and Categorical). The trading panel supports both AMM-based market orders (instant execution with price impact) and order book limit orders (placed at a specific price, filled when the market reaches that level).

## User Flows

### Entry Points
- User clicks on a market card (outside of Yes/No buttons) in Market Discovery
- User follows a direct link to a market

### Trading Flow
1. User views current odds displayed as a prominent percentage in the chart header
2. User selects outcome (Yes/No for binary, specific outcome for categorical)
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

#### Buy/Sell Toggle
- Top-level tab row spanning full width: `[Buy] [Sell]`
- Buy active: emerald accent (`bg-emerald-500/10 text-emerald-600 border-b-2 border-emerald-500`)
- Sell active: red accent (`bg-red-500/10 text-red-600 border-b-2 border-red-500`)
- When Sell is active, outcome buttons change context (e.g., "Sell Yes" / "Sell No")
- Sell mode: amount label changes to "Shares to sell", preview shows proceeds after fees

#### Market/Limit Sub-tabs
- Segmented control below Buy/Sell: `[Market] [Limit]` pill toggle
- Active state: `bg-blue-600 text-white`, inactive: transparent
- Matches PriceChart timeframe selector style

#### Layout Order
Buy/Sell toggle → Market/Limit sub-tabs → Outcome selection → Trade form

#### Buy + Market (Default)
- Current odds display:
  - **Yes/No markets**: Two large buttons showing Yes % and No %
  - **Categorical markets**: Vertical list of outcomes with odds
- Order amount input with sats denomination
- Quick amount buttons (100, 500, 1000, 5000 sats)
- Predicted odds after trade (shows price impact)
- Potential payout calculation
- Creator fee display (e.g., "0.5% creator fee")
- Confirm button: "Buy YES for ₿X"

#### Buy + Limit
- Set limit price (1-99%) with number input and range slider
- Amount input (same as market order)
- Preview shows: limit price, shares if filled, fees, total cost
- Disclaimer: "Order will fill when market price reaches your specified level"
- Confirm button: "Place Limit Order for ₿X"

#### Sell + Market
- Select shares to sell (outcome buttons show "Sell Yes" / "Sell No")
- Amount label: "Shares to sell"
- Preview shows proceeds after fees (not potential payout)
- Confirm button: "Sell YES for ₿X"

#### Sell + Limit
- Set limit price + amount
- Preview shows limit sell details
- Confirm button: "Place Sell Limit Order for ₿X"

#### Common Elements
- Optional comment textarea (280 character limit) between trade preview and confirm button
  - Placeholder: "Share your reasoning..."
  - Character counter shown below textarea
  - Comment is posted alongside the trade on confirm
- Cancel button to clear selection

### Price Chart Section
- **Current percentage** displayed prominently as the section header (replaces "Price Chart" text):
  - Yes/No markets: shows current yes odds (e.g., "67.5%")
  - Categorical markets: shows leading outcome with odds (e.g., "Chiefs 28.5%")
  - Resolved markets: shows final outcome text (e.g., "Resolved: Yes")
- Line chart showing price history
- Timeframe selector: 1H | 24H | 7D | 1 Month | ALL
- Toggle: Price / Volume
- **Comment speech bubbles** overlaid on price chart (price mode only):
  - Positioned horizontally by comment timestamp relative to visible time range
  - Size: 24–40px based on like count (more likes = larger bubble)
  - Opacity: 0.4–1.0 based on like count (more likes = more opaque)
  - Tooltip on hover showing username, content preview, and like count
  - Only comments within the visible timeframe are shown
- For categorical markets: multi-line chart with legend

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
- Read-only display section at the bottom of the page (no standalone comment input)
- Comment list with user avatar, name, timestamp
- Like button per comment
- Infinite scroll with "Load more" button
- Empty state: "No comments yet. Place a trade to leave a comment!"
- Comments are posted exclusively through the Trading Panel trade flow

### Resolved Market View
- **RESOLVED badge** displayed prominently at the top of the header with a CheckCircle icon and the final outcome
- "Resolved on [date]" replaces the countdown timer in the meta row
- **No trading panel**: Both desktop sidebar and mobile sticky bottom bar are hidden
- **Single-column layout**: The right sidebar grid is removed; content fills full width
- **Resolution Info** is moved immediately after the header (above chart)
- Comments section becomes read-only (no comment input)
- Activity feed and related markets remain visible for historical reference

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

### Numeric Markets
- Price display shows current implied price with unit instead of a percentage (e.g., "$112,500" not "56.3%")
- Implied price formula: `loBound + (hiTokenPrice / 100) * (hiBound - loBound)`
- Trading panel shows two buttons: **"Buy Higher"** and **"Buy Lower"** (not "Buy Yes" / "Buy No" or "HI" / "LO")
- Range bar visualization below the price display showing current implied price position within `[loBound, hiBound]`
- Price chart Y-axis is denominated in the market's unit (e.g., USD) rather than 0–100%
- Resolution displays the oracle-attested value (e.g., "Resolved: $98,450") and the proportional payout per token

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
