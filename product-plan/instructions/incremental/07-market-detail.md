# Milestone 7: Market Detail

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-6 complete

## Goal

Implement market detail with BUY, SELL, and LIQUIDITY routes.

## Required Semantics

- Only a confirmed settlement fill creates or changes the current price.
- `no-trades` and `unavailable` are different states.
- Both states use null prices.
- Do not use a `50%` fallback.
- An open market shows BUY, SELL, and LIQUIDITY.
- Empty BUY and SELL show guidance and an action to open LIQUIDITY.
- Empty BUY and SELL contain no form.
- A closed market shows no trading or funding action.
- Funding adds bot capacity.
- Funding does not guarantee an order, immediate depth, or a confirmed price.
- Repeatable funding implementation remains Phase 9 work.

## Key Functionality

- Market header and metrics
- Explicit price-authority state
- BUY, SELL, and LIQUIDITY routes
- Order controls only when executable liquidity exists
- Confirmed fill-backed price history
- Order-book display
- Resolution details
- Confirmed trade activity
- Comments and related markets
- Closed-market action suppression
- Numeric-market fail-closed behavior

## Components

- `MarketDetail.tsx`
- `MarketHeader.tsx`
- `TradingPanel.tsx`
- `PriceChart.tsx`
- `OrderBookSection.tsx`
- `ResolutionInfo.tsx`
- `ActivityFeed.tsx`
- `CommentSection.tsx`
- `RelatedMarkets.tsx`
- `MarketStats.tsx`

## Expected User Flows

### Submit An Order

1. The user selects BUY or SELL.
2. The page verifies executable liquidity.
3. The user enters the order details.
4. The page labels pre-submit pricing as an execution quote.
5. The current price stays unchanged until a settlement fill confirms.

### Add Capacity

1. The user selects LIQUIDITY.
2. The user completes the durable funding flow.
3. The page reports added bot capacity without an execution or price promise.

### View An Empty Market

1. The user selects BUY or SELL.
2. The page shows guidance without an order form.
3. The user can open LIQUIDITY.

### View A Closed Market

1. The user opens a closed market.
2. The page hides BUY, SELL, LIQUIDITY, and funding actions.
3. The page keeps historical and resolution information.

## Done When

- [ ] Tests pass.
- [ ] Confirmed, no-trade, and unavailable price states remain distinct.
- [ ] BUY, SELL, and LIQUIDITY route correctly.
- [ ] Empty BUY and SELL contain no order form.
- [ ] Closed markets contain no trading or funding action.
- [ ] Funding copy makes no order, depth, or price guarantee.
- [ ] Charts contain confirmed fill-backed prices only.
- [ ] The view is responsive.
