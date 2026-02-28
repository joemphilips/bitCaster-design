# Market Detail

## Overview
Comprehensive view of a single prediction market with trading panel, price charts, order book, activity, and comments. Supports Yes/No and Categorical markets. Trading panel supports Buy/Sell toggle and Market/Limit order types.

## User Flows
- View current odds, price history, market stats
- Select outcome and enter trade amount
- See predicted odds, payout, and fees
- Confirm trade with optional comment
- Toggle Buy/Sell mode and Market/Limit order types
- Switch chart timeframes (1H, 24H, 7D, 30D, All)
- Toggle price/volume chart
- View order book, recent trades, comments
- Like market and comments
- Browse related markets
- Resolved markets show single-column layout without trading panel

## Data Used
**Entities:** MarketDetail (YesNoMarketDetail, CategoricalMarketDetail), TradeSelection, TradePreview, OrderBook, PriceHistory, Trade, Comment, RelatedMarket, ResolutionDetails, MarketCreator
**From global model:** Bought, Sold, CommentPosted, MarketLiked, MarketResolved

## Components Provided
- `MarketDetail` — Main two-column layout
- `MarketHeader` — Title, image, tags, creator, metrics footer
- `MarketStats` — Key market metrics
- `PriceChart` — Line chart with timeframe selector and comment bubbles
- `TradingPanel` — Buy/Sell toggle, Market/Limit tabs, outcome selection, trade form
- `OrderBookSection` — Bid/ask visualization
- `CommentSection` — Comment list with likes
- `ActivityFeed` — Recent trades list
- `RelatedMarkets` — Horizontal scrollable related markets
- `ResolutionInfo` — Resolution criteria and status

## Callback Props

| Callback | Description |
|----------|-------------|
| `onTimeframeChange` | Change chart timeframe |
| `onChartTypeChange` | Toggle price/volume |
| `onTradeSelect` | Select outcome for trading |
| `onTradeClear` | Clear trade selection |
| `onAmountChange` | Change trade amount |
| `onTradeConfirm` | Confirm trade |
| `onTradeSideChange` | Toggle Buy/Sell |
| `onOrderTypeChange` | Toggle Market/Limit |
| `onLimitPriceChange` | Change limit price |
| `onLikeToggle` | Like/unlike market |
| `onShare` | Share market |
| `onCommentLike` | Like a comment |
| `onRelatedMarketClick` | Navigate to related market |
| `onCreatorClick` | View creator profile |
