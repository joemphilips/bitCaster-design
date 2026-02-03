# Market Detail

## Overview

Comprehensive view of a single prediction market, providing the full trading interface, price charts, activity feed, and related markets. This is the most feature-rich section, supporting all market types and special views for resolved markets.

## Design Intent

- **Trading-first**: Trading panel prominently placed (sidebar on desktop, modal on mobile)
- **Rich analysis**: Price charts with timeframe selection and comment overlays
- **2D visualization**: Grid with two-tone gradients and conditional probability toggle
- **Resolved markets**: Clean read-only view without trading clutter
- **Engagement**: Comments posted with trades encourage thoughtful trading

## Key Features

### Market Header
- Large title with optional background image
- Category tags, close date with countdown
- Creator info with avatar and reputation
- Metrics footer: Volume, Liquidity, Traders, Likes

### Trading Panel
- **Yes/No**: Two large percentage buttons
- **Categorical**: Vertical outcome list
- **2D**: Grid with two-tone gradient cells
  - Yes/Yes: solid emerald
  - Yes/No: emerald→rose gradient
  - No/Yes: rose→emerald gradient
  - No/No: solid red
- Trade form with amount, preview, optional comment

### Price Chart
- Current odds as section header (not "Price Chart")
- Line chart with timeframe selector (1H, 24H, 7D, 30D, ALL)
- Price/Volume toggle
- Comment speech bubbles overlaid on chart
- Categorical: multi-line with legend
- 2D: cell selector + conditional probability toggle

### 2D Conditional Probability
For Yes/No × Yes/No markets:
- Toggle buttons to fix one dimension
- Shows conditional probabilities as two lines
- "Conditional on [label]" subtitle
- Handles division by zero gracefully

### Resolved Market View
- RESOLVED badge at top
- No trading panel (desktop sidebar and mobile bar hidden)
- Single-column layout
- Resolution info moved above chart
- Comments read-only

### Responsive Layout
- Desktop: Two-column (content + sticky sidebar)
- Tablet: Single-column with collapsible trading
- Mobile: Sticky "Trade" button → full-screen modal

## Components

| Component | Description |
|-----------|-------------|
| `MarketDetail` | Main page container |
| `MarketHeader` | Title, image, tags, creator, metrics |
| `TradingPanel` | Outcome selection and trade form |
| `PriceChart` | Chart with timeframes, bubbles, toggles |
| `ResolutionInfo` | Resolution criteria and status |
| `ActivityFeed` | Recent trades list |
| `CommentSection` | Comments display (read-only) |
| `RelatedMarkets` | Horizontal carousel |

## Files

- `types.ts` — TypeScript interfaces (imports from market-discovery)
- `sample-data.json` — Sample markets of all types
- `tests.md` — Test requirements
- `components/` — Reference React implementations

## AMM Trading

Trading uses an Automated Market Maker model:
- No order book
- Price determined by formula
- Trades affect odds immediately
- Preview shows predicted odds after trade
