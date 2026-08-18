# Market Discovery & Trading Specification

## Overview

The marketplace lets users browse and filter prediction markets. Each market card opens market detail. The default view shows Trending markets.

## User Flows

- The user lands on the page and sees Trending markets.
- The user selects one tag at a time.
- The user can filter by market type, volume range, and closing date.
- The user selects a Yes/No or categorical action on a card and opens market detail.
- The user can select the rest of a card and open market detail.
- Numeric markets remain disabled until an authoritative trade representation exists.
- The user scrolls down to load more markets.

Market cards do not contain an inline trade form. They do not show a predicted price. All order entry occurs on market detail.

## Price Display

The card reads an explicit price-authority state.

- `confirmed` shows the latest price from a confirmed settlement fill.
- `no-trades` shows `No trades yet` and a null price.
- `unavailable` shows `Price unavailable` and a null price.

Do not derive the current price from an order, quote, registration value, funding result, or outcome metadata. Do not use `50%` or another synthetic fallback when the price is null.

## UI Requirements

- Show one horizontal tag bar.
- Allow only one selected tag.
- Hide the filter row by default.
- Show filters for market type, volume range, and closing date.
- Show the image, title, current-price state, and metrics on each card.
- Show confirmed Yes/No prices as percentages.
- Show the explicit empty or unavailable text when the price is null.
- Show categorical outcomes in a vertical scroll area.
- Let every card and card action navigate to market detail.
- Do not show an inline amount input or confirmation control.
- Do not show tag information on a card.
- Show a like button and count in the metrics footer.
- Keep one fixed card size for Yes/No and categorical markets.
- Keep the metrics footer visible.
- Support infinite scroll.

## Background Loading Progress Bar

Show a thin progress bar at the page footer while condition data loads after wallet setup.

- Show text such as `Loading market data... (3/10)`.
- Remove the bar after loading completes.
- Show an amber error state and a Retry action after loading fails.

## Refresh Button And Last Updated Timestamp

Show the refresh action and last-updated value in the sticky tag area.

- Display relative time such as `Updated 2 min ago`.
- Call `onRefreshConditions` when the user selects refresh.
- Animate the refresh icon while refresh is active.

## Configuration

- shell: true
