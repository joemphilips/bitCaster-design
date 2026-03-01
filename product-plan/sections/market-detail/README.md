# Market Detail

## Overview
Comprehensive trading view with order book, price charts, trade panel, activity feed, and comments. Uses a two-column layout on desktop (content left, trading panel right) and single-column on mobile. Supports market and limit orders, both buy and sell sides.

## Components
- `MarketDetail` — Root component for the detail page
- `MarketHeader` — Title, image, tags, countdown, creator info, metrics footer
- `TradingPanel` — Buy/Sell toggle, Market/Limit tabs, outcome selection, amount input, trade preview, confirm
- `PriceChart` — Line chart with timeframe selector, chart type toggle, comment speech bubbles overlay
- `OrderBookSection` — Bids/asks display with spread
- `ResolutionInfo` — Resolution criteria, source, status, final outcome
- `ActivityFeed` — Recent trades list with infinite scroll
- `CommentSection` — Read-only comment display (posting via trade flow only)
- `RelatedMarkets` — Horizontal scrollable related market cards
- `MarketStats` — Volume, liquidity, traders, like count in header footer

## Market Type Variations

### Yes/No Markets
Two large outcome buttons (Yes % / No %). Single-line price chart. Current percentage shows yes odds.

### Categorical Markets
Vertical list of outcomes with per-outcome Buy Yes/No. Multi-line price chart. Leading outcome shown as current percentage.

### Numeric Markets
Implied price with unit (e.g., "$112,500") instead of percentage. "Buy Higher" / "Buy Lower" buttons. Range bar visualization. Price chart Y-axis in market unit.

## Trading Panel Layout
Buy/Sell toggle → Market/Limit sub-tabs → Outcome selection → Amount input → Quick amounts (100, 500, 1000, 5000) → Trade preview → Optional comment (280 chars) → Confirm button

## Resolved Market View
- RESOLVED badge with CheckCircle icon and final outcome
- No trading panel (hidden on both desktop and mobile)
- Single-column layout (sidebar removed)
- Resolution info moved above chart
- Comments section is read-only

## Responsive Behavior
- Desktop (>= 1024px): Two-column layout, trading panel sticky right sidebar
- Tablet (768-1023px): Single column, trading panel collapsible at top
- Mobile (< 768px): Single column, sticky bottom "Trade" bar opens full-screen modal

## Configuration
- shell: true
