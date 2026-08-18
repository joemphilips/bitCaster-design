# Market Detail

## Overview

Market detail shows one prediction market. It contains the trading and funding actions for an open market.

## Components

- `MarketDetail` is the page root.
- `MarketHeader` shows identity and metrics.
- `TradingPanel` shows BUY, SELL, or LIQUIDITY.
- `PriceChart` shows confirmed settlement-fill history.
- `OrderBookSection` shows observed bids and asks.
- `ResolutionInfo` shows resolution details.
- `ActivityFeed` shows confirmed settlement fills.
- `CommentSection` shows comments.
- `RelatedMarkets` opens other market-detail pages.
- `MarketStats` shows volume, capacity, traders, and likes.

## Price States

- `confirmed` shows a nullable value backed by the latest confirmed settlement fill.
- `no-trades` shows `No trades yet` and an empty history.
- `unavailable` shows `Price unavailable`.

Do not use a quote, order-book midpoint, registration value, funding result, resolution result, or `50%` fallback as the current price.

## Action Routes

An open market shows `[BUY] [SELL] [LIQUIDITY]`.

- BUY and SELL show an order form only when executable liquidity exists.
- Empty BUY and SELL show guidance and an action that opens LIQUIDITY.
- Empty BUY and SELL contain no amount input, outcome form, or confirm action.
- LIQUIDITY uses the durable funding flow.
- Funding adds bot capacity.
- Funding does not guarantee orders, immediate depth, or a confirmed price.
- Repeatable funding implementation remains Phase 9 work.

A closed market hides all three routes and every funding action.

## Market Type Variations

### Yes/No Markets

Use nullable complementary prices from the same confirmed settlement fill.

### Categorical Markets

Use nullable per-outcome prices. Do not invent a leading outcome for an empty or unavailable state.

### Future Market Types

Keep numeric markets disabled until an authoritative trade representation exists.

## Responsive Behavior

- Use a two-column layout on desktop when actions are available.
- Use a single-column layout on smaller screens.
- Show mobile actions only while the market is open.
- Remove all action surfaces after close.

## Configuration

- shell: true
