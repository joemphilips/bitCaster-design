# Market Detail Test Plan

These tests describe visible behavior and callbacks. Adapt them to the selected test framework.

## Price Authority Tests

### Confirmed Price

1. Render a market with `priceAuthority.state` set to `confirmed`.
2. Supply a latest confirmed fill ID and current price.
3. Verify that the page shows that price.
4. Verify that the chart uses confirmed fill-backed points only.

### Valid No-Trade State

1. Render a market with `priceAuthority.state` set to `no-trades`.
2. Supply null current prices and an empty history.
3. Verify that the page shows `No trades yet`.
4. Verify that it does not show `50%`.

### Unavailable Authority State

1. Render a market with `priceAuthority.state` set to `unavailable`.
2. Supply null current prices.
3. Verify that the page shows `Price unavailable`.
4. Verify that it does not show `No trades yet` or `50%`.

## Open Market Action Tests

### Route Selection

1. Render an open market.
2. Verify that BUY, SELL, and LIQUIDITY are available.
3. Select each route.
4. Verify that `onTradeTabChange` receives the selected route.

### BUY With Executable Liquidity

1. Select BUY on a market with executable liquidity.
2. Select an outcome and enter an amount.
3. Verify that the preview labels the value as an execution quote.
4. Submit the order.
5. Verify that the displayed current price does not change before a settlement fill is confirmed.

### Empty BUY And SELL

1. Select BUY on a market without executable liquidity.
2. Verify that guidance and an action to open LIQUIDITY appear.
3. Verify that no amount input, outcome form, or confirm action appears.
4. Repeat the checks for SELL.

### LIQUIDITY

1. Select LIQUIDITY.
2. Complete the durable funding handoff.
3. Verify that the UI reports added bot capacity.
4. Verify that it does not promise an order, immediate depth, or a confirmed price.
5. Verify that the current price remains unchanged until a settlement fill is confirmed.

## Closed Market Tests

1. Render a closed or resolved market.
2. Verify that BUY, SELL, and LIQUIDITY are absent.
3. Verify that the trade form is absent.
4. Verify that every funding action is absent.
5. Verify that resolution details remain visible.
6. Verify that historical confirmed prices remain visible when authority is available.

## Other Interaction Tests

- Verify timeframe and chart-type callbacks.
- Verify like and share callbacks.
- Verify creator and related-market navigation.
- Verify pagination for trades and comments.
- Verify that recent trade activity contains confirmed settlement fills only.
- Verify that an order-book midpoint never becomes the current price.
- Verify that funding can exist with an empty order book and `No trades yet`.

## Unsupported Numeric Market

1. Confirm that the supported detail types exclude numeric markets.
2. Confirm that the page shows no synthetic numeric value or numeric trade control.

## Accessibility Checks

- Make BUY, SELL, and LIQUIDITY keyboard accessible.
- Expose the selected route state.
- Give amount inputs and confirmation actions clear names when they exist.
- Expose `No trades yet` and `Price unavailable` as text.
- Remove hidden closed-market actions from the accessibility tree.

## Sample Test Data

Use `sample-data.json`. It contains confirmed, no-trade, unavailable, and closed examples.
