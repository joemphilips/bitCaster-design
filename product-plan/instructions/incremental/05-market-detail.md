# Milestone 5: Market Detail

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Market Detail feature — a comprehensive single-market view with trading panel, price charts, order book, activity feed, comments, and support for all market types including resolved markets and 2D conditional probability visualization.

## Overview

The market detail page is a two-column layout (desktop) where the left column contains the market header, price chart, resolution info, order book, activity feed, related markets, and comments, while the right column is a sticky trading panel. On mobile the trading panel is replaced by a sticky "Trade" button that opens a full-screen modal. Resolved markets collapse to a single-column layout and hide the trading panel entirely. The trading panel supports both Buy and Sell sides, and both Market and Limit order types.

**Key Functionality:**
- Market header with image, tags, creator info, metrics, like, and share
- Trading panel with Buy/Sell toggle, Market/Limit order tabs, and outcome selection
- Price chart with 1H/24H/7D/30D/ALL timeframes, price/volume toggle, and comment bubble overlay
- 2D conditional probability chart with dimension-fixing toggle
- Order book (bid/ask visualization)
- Activity feed (recent trades with infinite scroll)
- Comment section (read-only; comments posted via trading panel only)
- Related markets horizontal scroll
- Resolved market state: single-column, no trading panel, outcome displayed prominently

## Recommended Approach: Test-Driven Development

See `product-plan/sections/market-detail/tests.md` for detailed test instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for MarketHeader, TradingPanel, PriceChart, CommentSection, and resolved-market layout
2. Implement each component to make the tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/market-detail/components/`:

- `MarketDetail` — Main two-column layout container
- `MarketHeader` — Title, background image, tags, creator info, metrics footer
- `MarketStats` — Key market metrics (volume, liquidity, traders, like count)
- `TradingPanel` — Buy/Sell toggle, Market/Limit tabs, outcome selection, trade form
- `PriceChart` — Line chart with timeframe selector, price/volume toggle, and comment bubbles
- `OrderBookSection` — Bid/ask depth visualization
- `ActivityFeed` — Recent trades list with infinite scroll
- `CommentSection` — Comment list with likes (read-only; no input field)
- `RelatedMarkets` — Horizontal scrollable related market cards
- `ResolutionInfo` — Resolution criteria, source, date, and status

### Data Layer

Key types (see `product-plan/sections/market-detail/types.ts`):
- `YesNoMarketDetail`, `CategoricalMarketDetail`, `TwoDimensionalMarketDetail`
- `TradeSelection`, `TradePreview`, `OrderBook`, `PriceHistory`, `Trade`, `Comment`, `RelatedMarket`, `ResolutionDetails`

API endpoints to implement:
- `GET /markets/:id` — full market detail including current odds, stats, resolution info
- `GET /markets/:id/price-history?timeframe=1H|24H|7D|30D|ALL` — price/volume time series
- `GET /markets/:id/order-book` — current bid/ask depth
- `GET /markets/:id/trades?page=` — paginated recent trades
- `GET /markets/:id/comments?page=` — paginated comments
- `GET /markets/:id/related` — related markets list
- `POST /markets/:id/trade` — execute trade (buy or sell, market or limit order)
- `POST /markets/:id/like` — toggle market like
- `POST /markets/:id/comments/:commentId/like` — toggle comment like
- `POST /markets/:id/trade-preview` — calculate predicted odds, payout, and fees for a proposed trade

Sample data at `product-plan/sections/market-detail/sample-data.json`.

### Callbacks

Wire up these props on the `MarketDetail` component:

| Callback | What to do |
|----------|------------|
| `onTimeframeChange` | Fetch price history for selected timeframe |
| `onChartTypeChange` | Toggle price vs. volume chart |
| `onTradeSelect` | Set selected outcome in local state |
| `onTradeClear` | Clear selected outcome |
| `onAmountChange` | Update amount, call trade-preview API |
| `onTradeConfirm` | Call trade API, post comment if text entered, refresh data |
| `onTradeSideChange` | Toggle Buy/Sell mode |
| `onOrderTypeChange` | Toggle Market/Limit order type |
| `onLimitPriceChange` | Update limit price in trade form state |
| `onLikeToggle` | Call like API, update like count optimistically |
| `onShare` | Copy market URL to clipboard or open share sheet |
| `onCommentLike` | Call comment like API, update count optimistically |
| `onRelatedMarketClick` | Navigate to `/markets/:id` for related market |
| `onCreatorClick` | Navigate to creator profile or portfolio |
| `onChartCellChange` | Update selected 2D cell for chart display |
| `onFixDimension` | Update conditional probability dimension for 2D chart |

### Empty States

- No trades yet: "No trades yet" in activity feed
- No comments yet: "No comments yet. Place a trade to leave a comment!"
- No related markets: hide related markets section or show "No related markets"
- Chart data load failure: show retry button

## Files to Reference

- `product-plan/sections/market-detail/README.md`
- `product-plan/sections/market-detail/tests.md`
- `product-plan/sections/market-detail/components/`
- `product-plan/sections/market-detail/types.ts`
- `product-plan/sections/market-detail/sample-data.json`

## Expected User Flows

**Standard trade (Yes/No market):**
1. User navigates to `/markets/:id` — two-column layout loads, trading panel visible on right
2. User clicks "YES" button — outcome highlighted, trade form expands below
3. User enters 500 sats — trade preview shows predicted odds, price impact, payout, and fees
4. User adds optional comment, clicks "Confirm Trade" — trade executes, comment appears in comment section, odds update in header and chart

**Buy/Sell toggle:**
1. User already holds a position; navigates to market detail
2. User clicks "SELL" toggle in trading panel — panel switches to sell mode
3. User selects outcome and amount — preview shows estimated proceeds
4. User confirms — position reduced or closed

**Limit order:**
1. User clicks "Limit" tab in trading panel
2. Limit price input appears; user enters target price
3. User confirms — limit order created, visible in order book

**Conditional probability (2D market):**
1. User views a 2D (Yes/No x Yes/No) market detail
2. Chart shows probability grid by default
3. User clicks "BTC=Yes" dimension toggle — chart shows two conditional probability lines (ETH=Yes|BTC=Yes and ETH=No|BTC=Yes)
4. User clicks "All" — chart returns to standard view

**Resolved market:**
1. User navigates to a resolved market
2. RESOLVED badge visible in header; trading panel not rendered
3. Single-column layout; resolution info shows final outcome above chart
4. Comments section read-only

## Done When

- [ ] Tests written and passing
- [ ] Market detail loads for all three market types (Yes/No, Categorical, 2D)
- [ ] Trading panel shows correct outcomes for each type
- [ ] Buy/Sell toggle and Market/Limit tabs both functional
- [ ] Trade preview recalculates on amount change
- [ ] Trade executes and page data refreshes
- [ ] Price chart renders with timeframe and type toggles
- [ ] Comment bubbles overlay chart at correct positions
- [ ] 2D conditional probability toggle works
- [ ] Order book renders bid/ask depth
- [ ] Activity feed paginates via infinite scroll
- [ ] Comments load and comment likes work
- [ ] Related markets scroll horizontally and navigate
- [ ] Resolved market layout: no trading panel, single column, outcome prominent
- [ ] Mobile: sticky Trade button opens full-screen modal
- [ ] Responsive on tablet and desktop
