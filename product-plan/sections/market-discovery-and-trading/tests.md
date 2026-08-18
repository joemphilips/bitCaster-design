# Market Discovery & Trading Test Plan

These tests describe visible behavior and callbacks. Adapt them to the selected test framework.

## User Flow Tests

### Flow 1: Browse Trending Markets

1. Render `MarketDiscovery` with the Trending tag selected.
2. Verify that only Trending is selected.
3. Verify that every supplied market has a card.
4. Verify that each card shows its title, price state, and metrics.

### Flow 2: Open Market Detail

1. Select a market card.
2. Verify that `onViewMarket` receives the market ID.
3. Select a card action.
4. Verify that the same market-detail callback runs.
5. Verify that the card contains no amount input or trade-confirm action.

### Flow 3: Show A Confirmed Price

1. Render a market with `priceAuthority.state` set to `confirmed`.
2. Supply the latest confirmed settlement-fill price.
3. Verify that the card shows that percentage.

### Flow 4: Show A Valid No-Trade State

1. Render a market with `priceAuthority.state` set to `no-trades`.
2. Supply null price values.
3. Verify that the card shows `No trades yet`.
4. Verify that the card does not show `50%`.

### Flow 5: Show An Unavailable Authority State

1. Render a market with `priceAuthority.state` set to `unavailable`.
2. Supply null price values.
3. Verify that the card shows `Price unavailable`.
4. Verify that the card does not show `No trades yet` or `50%`.

### Flow 6: Browse A Categorical Market

1. Render a categorical market.
2. Verify that outcomes appear in canonical order.
3. Verify that null outcome prices use the market price-authority state.
4. Select an outcome action.
5. Verify that market detail opens.

### Flow 7: Reject Unsupported Numeric UI

1. Confirm that the supported data types exclude numeric markets.
2. Confirm that the page shows no synthetic numeric value or numeric trade control.

### Flow 8: Filter Markets

1. Open the filters.
2. Select Categorical.
3. Verify that `onMarketTypeChange` receives `['categorical']`.
4. Verify that the filtered list contains only categorical markets.

## Empty State Tests

- Show `No markets found` when no market matches the filters.
- Show a clear empty state when no markets exist.
- Keep `no-trades` distinct from `unavailable`.

## Component Interaction Tests

- Verify the like action and count.
- Verify the refresh callback and active animation.
- Verify the relative last-updated value.
- Verify loading, loaded, and failed background states.
- Verify that infinite scroll calls `onLoadMore`.
- Verify that all card actions navigate and never submit an order.

## Edge Cases

- Verify search callbacks.
- Verify volume and closing-date callbacks.
- Verify horizontal tag overflow.
- Verify the image placeholder.
- Verify that a funded market can still show `No trades yet`.
- Verify that funding data does not create a displayed price.

## Accessibility Checks

- Make the selected tag state available to assistive technology.
- Give each market card a descriptive accessible name.
- Make every card action keyboard accessible.
- Give the refresh action an accessible name.
- Expose `No trades yet` and `Price unavailable` as text.

## Sample Test Data

Use `sample-data.json`. It contains confirmed, no-trade, and unavailable price states.
