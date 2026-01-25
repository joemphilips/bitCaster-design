# Event Model

bitCaster uses an event-sourced architecture where domain events are the source of truth. All state changes are captured as immutable events.

## Domain Events

### User Events

| Event | Description | Key Fields |
|-------|-------------|------------|
| `UserRegistered` | New user joins platform | userId, displayName, registeredDate |
| `UserProfileUpdated` | Profile information changed | userId, avatarUrl?, displayName? |

### Wallet Events

| Event | Description | Key Fields |
|-------|-------------|------------|
| `DepositReceived` | Bitcoin deposited | userId, amountSats, txId?, lightningInvoice? |
| `WithdrawalRequested` | Withdrawal initiated | userId, amountSats, destinationAddress |
| `WithdrawalCompleted` | Withdrawal finalized | userId, amountSats, txId |

### Market Lifecycle Events

| Event | Description | Key Fields |
|-------|-------------|------------|
| `MarketCreated` | New market created | marketId, creatorId, title, type, outcomes, closingDate, creatorFeePercent |
| `MarketApproved` | Market passes quality review | marketId, approvedBy, approvedAt |
| `MarketRejected` | Market fails quality review | marketId, rejectedBy, reason |
| `MarketResolved` | Outcome determined | marketId, winningOutcomeId, resolvedBy, resolvedAt |
| `MarketCancelled` | Market cancelled | marketId, cancelledBy, reason, refundAmount |

### Trading Events

| Event | Description | Key Fields |
|-------|-------------|------------|
| `Bought` | Shares purchased | orderId, marketId, userId, outcomeId, side, shares, priceSats |
| `Sold` | Shares sold | orderId, marketId, userId, outcomeId, side, shares, priceSats |
| `LiquidityDeposited` | LP adds to market | marketId, providerId, amountSats |

### Payout Events

| Event | Description | Key Fields |
|-------|-------------|------------|
| `PayoutClaimed` | Winner claims payout | marketId, userId, positionId, amountSats |
| `CreatorFeeClaimed` | Creator claims fees | marketId, creatorId, amountSats |

## Entity Relationships

```
User ──────────────────┬───────────────────────────────────────┐
  │                    │                                       │
  │ creates            │ holds                                 │ receives
  ▼                    ▼                                       ▼
Market ◄──────────── Position                               Order
  │                    │                                    (deposit/
  │ has                │ belongs to                         withdrawal)
  ▼                    │
Outcome ◄──────────────┘
```

## Aggregates

### User Aggregate
- User profile and identity
- Wallet balance (derived from deposit/withdrawal events)
- Authentication state

### Market Aggregate
- Market definition and parameters
- Lifecycle state (pending → approved/rejected → resolved/cancelled)
- Outcomes and odds (AMM-calculated)

### Position Aggregate
- User's holdings in a specific market outcome
- Entry price and current value
- P/L tracking

## Event Store Considerations

When implementing, consider:
- Events are immutable and append-only
- State is derived by projecting events
- Projections can be rebuilt from events
- Use optimistic concurrency for writes
