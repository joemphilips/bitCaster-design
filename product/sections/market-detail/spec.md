# Market Detail Specification

## Overview

Market detail shows one prediction market. It is the only market screen that contains trading and funding actions. It supports Yes/No and categorical markets.

## Entry Points

- The user selects a market card.
- The user follows a direct market link.

## Price Authority

The page reads one explicit price-authority state.

- `confirmed` shows the latest confirmed settlement-fill price and its fill-backed history.
- `no-trades` shows `No trades yet` and an empty price history.
- `unavailable` shows `Price unavailable` and does not present the state as a valid empty market.

The current price and current odds are nullable. Do not derive them from an order, quote, midpoint, registration value, outcome target, funding result, or resolution outcome. Do not use a `50%` fallback.

## Trading And Funding Routes

Show one top-level route row for an open market:

`[BUY] [SELL] [LIQUIDITY]`

### BUY And SELL With Executable Liquidity

- Show the available order controls.
- Show market and limit controls when the market supports them.
- Label a pre-submit value as an execution quote.
- Do not label an execution quote as the current price.
- Update the current price only after a settlement fill is confirmed.

### Empty BUY And SELL

When the selected side has no executable liquidity, show guidance and an action that opens LIQUIDITY.

- Do not show an amount input.
- Do not show an outcome order form.
- Do not show a confirm-order action.
- Keep BUY, SELL, and LIQUIDITY selectable while the market is open.

### LIQUIDITY

LIQUIDITY opens the durable funding flow for the current market.

- Any authenticated user can use the funding flow.
- Accepted funding adds bot capacity.
- Funding does not itself create an order.
- Funding does not guarantee an executable order.
- Funding does not guarantee immediate order-book depth.
- Funding does not create a confirmed price.
- Repeatable funding implementation remains Phase 9 work.

### Closed Market

A closed market has no trading or funding action.

- Hide BUY, SELL, and LIQUIDITY.
- Hide desktop and mobile trade controls.
- Hide the funding action.
- Keep historical confirmed prices and activity available when their authority is available.
- Keep resolution information visible.

## Analysis

- Show confirmed fill-backed price history.
- Allow the user to select a supported timeframe.
- Allow the user to switch between price and volume.
- Show an empty chart for `no-trades`.
- Show an unavailable state for `unavailable`.
- Never insert a registration, funding, quote, or resolution point into price history.

## Header

- Show the market title.
- Show the image when available.
- Show category tags.
- Show the close date or resolution date.
- Show the share action.
- Show creator information.
- Show volume, accepted bot capacity, traders, and likes.

## Order Book

The order book can be empty even after funding is accepted. Display the observed bids and asks. Do not use the order-book midpoint as the current price.

## Activity And Comments

- Show only confirmed settlement fills in recent trade activity.
- Show comments as read-only market content.
- Allow a comment to accompany an order when the trading flow supports it.
- Do not let an unconfirmed order or fill candidate update the current price.

## Market Type Variations

### Yes/No Markets

Show nullable Yes and No current prices. Complementary prices must come from the same confirmed settlement fill.

### Categorical Markets

Show one nullable price per outcome. Do not select a synthetic leading outcome when price authority is empty or unavailable.

### Numeric Markets

Keep numeric markets disabled until an authoritative finite-bin or numeric-range trade representation exists.

## Responsive Behavior

- Use two columns on desktop when actions are available.
- Use one column on smaller screens.
- Use a mobile action surface only for an open market.
- Remove the action surface for a closed market.

## Configuration

- shell: true
