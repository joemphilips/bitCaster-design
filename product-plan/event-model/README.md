# Event Model

## Domain Events

| Event | Description |
|---|---|
| UserRegistered | A user joins the platform |
| UserProfileUpdated | A user updates public profile data |
| DepositReceived | The wallet receives sats |
| WithdrawalRequested | The user requests a withdrawal |
| WithdrawalCompleted | The withdrawal completes |
| MarketCreated | A market registration completes without funding or a price |
| MarketResolved | The oracle outcome closes the market without creating a price point |
| MarketRefunded | Eligible participants receive refunds after oracle expiry |
| Bought | A buy-side user flow occurs; this is not price authority |
| Sold | A sell-side user flow occurs; this is not price authority |
| TradeSettlementConfirmed | A settled fill creates or updates the current price |
| LiquidityDeposited | Durable funding adds bot capacity without an execution or price guarantee |
| PayoutClaimed | A winner claims a payout |
| CreatorFeeClaimed | A creator claims fee earnings |
| MarketLiked | A user likes a market |
| CommentPosted | A user posts a market comment |

## Price State

- `confirmed` uses the latest `TradeSettlementConfirmed` event.
- `no-trades` has null prices and displays `No trades yet`.
- `unavailable` has null prices and displays `Price unavailable`.
- `no-trades` and `unavailable` are different states.
- Neither state uses a `50%` fallback.

## Event Flows

- `MarketCreated` makes a registered market discoverable when its lifecycle allows it.
- Registration does not guarantee orders, immediate depth, or a current price.
- `Bought` and `Sold` do not update the current price by themselves.
- `TradeSettlementConfirmed` updates the current price and fill-backed history.
- `LiquidityDeposited` adds bot capacity through the durable funding flow.
- Funding does not guarantee orders, immediate depth, or a current price.
- Repeatable funding implementation remains Phase 9 work.
- `MarketResolved` removes every trading and funding action.
- `MarketResolved` enables `PayoutClaimed` and `CreatorFeeClaimed`.
- `MarketRefunded` returns eligible funds after oracle expiry.
- `WithdrawalRequested` leads to `WithdrawalCompleted`.
