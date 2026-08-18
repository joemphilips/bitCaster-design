# Event Model

## Domain Events

### UserRegistered

A user joins bitCaster.

### UserProfileUpdated

A user updates public profile information or preferences.

### DepositReceived

The wallet receives sats.

### WithdrawalRequested

The user requests a withdrawal.

### WithdrawalCompleted

The withdrawal completes.

### MarketCreated

A market registration completes. The event contains the market question, outcomes, resolution date, and fee settings. Registration does not fund the market and does not create a current price.

### MarketResolved

The oracle outcome closes the market. Resolution does not create a current-price point.

### MarketRefunded

The oracle does not attest in time. Eligible participants receive refunds.

### Bought

The user submits or completes a buy-side user flow. This event alone is not current-price authority.

### Sold

The user submits or completes a sell-side user flow. This event alone is not current-price authority.

### TradeSettlementConfirmed

A settlement fill completes for both sides. This is the only event that creates or changes the current price and price history. It contains the market, outcome, fill identity, execution price, settled amount, and confirmation time.

### LiquidityDeposited

The durable funding flow accepts funds for bot capacity. Funding does not itself create an order, guarantee executable liquidity, guarantee immediate depth, or create a confirmed price. Repeatable funding implementation remains Phase 9 work.

### PayoutClaimed

A winner claims a payout from a resolved market.

### CreatorFeeClaimed

A market creator claims fee earnings.

### MarketLiked

A user likes or bookmarks a market.

### CommentPosted

A user posts a market comment.

## Price State

- A market with no `TradeSettlementConfirmed` event has the valid `no-trades` state.
- A `no-trades` state has null current prices and displays `No trades yet`.
- An authority read failure has the distinct `unavailable` state.
- An `unavailable` state has null current prices and displays `Price unavailable`.
- Do not use `50%` or another fallback for either state.

## Event Flows

- `MarketCreated` makes the registered market discoverable when its lifecycle allows it.
- `MarketCreated` does not guarantee an executable order or order-book depth.
- `Bought` and `Sold` do not update the current price by themselves.
- `TradeSettlementConfirmed` updates volume, trader activity, current price, and price history.
- `LiquidityDeposited` adds bot capacity through the durable funding flow.
- `LiquidityDeposited` does not create a price or guarantee immediate execution.
- `MarketResolved` closes the market and removes trading and funding actions.
- `MarketResolved` enables `PayoutClaimed` and `CreatorFeeClaimed`.
- `MarketRefunded` returns eligible funds when the oracle does not attest.
- `WithdrawalRequested` leads to `WithdrawalCompleted`.
- `DepositReceived` increases wallet funds.
