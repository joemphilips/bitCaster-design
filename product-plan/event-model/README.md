# Event Model

The bitCaster event model describes the domain events that occur throughout the platform lifecycle, from user onboarding through market creation, trading, and settlement.

## Domain Events

### User Events

**UserRegistered**
A new user joins the platform. Triggered on account creation.
- `userId`: Unique user identifier
- `registeredDate`: ISO 8601 timestamp

**UserProfileUpdated**
User updates profile information (display name, avatar, etc.).
- `userId`: User identifier
- `displayName`: Optional display name
- `avatarUrl`: Optional avatar URL

### Wallet Events

**DepositReceived**
Bitcoin (sats) deposited into user wallet. Can be via Lightning invoice or on-chain.
- `userId`: User identifier
- `amountSats`: Deposit amount in satoshis
- `txId`: Optional blockchain transaction ID
- `lightningInvoice`: Optional Lightning invoice reference
- `date`: ISO 8601 timestamp

**WithdrawalRequested**
User initiates a withdrawal from their wallet.
- `userId`: User identifier
- `amountSats`: Withdrawal amount in satoshis
- `destinationAddress`: Optional blockchain address
- `lightningInvoice`: Optional Lightning invoice
- `date`: ISO 8601 timestamp

**WithdrawalCompleted**
Withdrawal transaction finalized and sent to user.
- `userId`: User identifier
- `amountSats`: Withdrawal amount in satoshis
- `txId`: Blockchain or settlement transaction ID
- `date`: ISO 8601 timestamp

### Market Events

**MarketCreated**
User creates a new prediction market with outcomes, closing date, and fee configuration.
- `marketId`: Unique market identifier
- `creatorId`: User ID of market creator
- `title`: Market question or title
- `description`: Detailed market description
- `type`: Market type (`yesno` for binary, `categorical` for multi-outcome)
- `outcomes`: Array of outcome objects with `id` and `label`
- `closingDate`: ISO 8601 timestamp when market stops accepting trades
- `creatorFeePercent`: Creator fee percentage (e.g., 2.0 for 2%)
- `initialLiquiditySats`: Initial seed liquidity in satoshis
- `categoryTags`: Array of category tags for discovery
- `date`: ISO 8601 timestamp

**MarketApproved**
Market passes quality control checks and becomes tradeable.
- `marketId`: Market identifier
- `approvedDate`: ISO 8601 timestamp

**MarketRejected**
Market fails quality control checks and is not listed.
- `marketId`: Market identifier
- `rejectedDate`: ISO 8601 timestamp
- `rejectionReason`: Reason for rejection

**MarketResolved**
Market closing date reached and outcome is determined. Winning position holders can claim payouts.
- `marketId`: Market identifier
- `winningOutcomeId`: ID of the winning outcome
- `resolvedDate`: ISO 8601 timestamp

**MarketCancelled**
Market is cancelled and funds are refunded to position holders and liquidity providers.
- `marketId`: Market identifier
- `cancelledDate`: ISO 8601 timestamp
- `cancellationReason`: Reason for cancellation
- `refundedSats`: Total amount refunded in satoshis

### Trading Events

**Bought**
User purchases shares in a market outcome (bet on a position).
- `tradeId`: Unique trade identifier
- `userId`: User identifier
- `marketId`: Market identifier
- `outcomeId`: Optional outcome identifier (for categorical markets)
- `side`: Trade side (`yes` or `no`)
- `amountSats`: Amount spent in satoshis
- `price`: Price per share
- `shares`: Number of shares purchased
- `date`: ISO 8601 timestamp

**Sold**
User sells shares in a market outcome (closes or reduces position).
- `tradeId`: Unique trade identifier
- `userId`: User identifier
- `marketId`: Market identifier
- `outcomeId`: Optional outcome identifier (for categorical markets)
- `side`: Trade side (`yes` or `no`)
- `amountSats`: Amount received in satoshis
- `price`: Price per share
- `shares`: Number of shares sold
- `date`: ISO 8601 timestamp

### Liquidity Events

**LiquidityDeposited**
Liquidity provider deposits funds into an automated market maker (AMM).
- `userId`: User identifier
- `marketId`: Market identifier
- `amountSats`: Deposit amount in satoshis
- `date`: ISO 8601 timestamp

### Settlement Events

**PayoutClaimed**
Winner claims their payout after market resolves.
- `userId`: User identifier
- `marketId`: Market identifier
- `positionId`: User's position identifier
- `amountSats`: Payout amount in satoshis
- `date`: ISO 8601 timestamp

**CreatorFeeClaimed**
Market creator claims accumulated fees.
- `userId`: User identifier (creator)
- `marketId`: Market identifier
- `amountSats`: Fee amount in satoshis
- `date`: ISO 8601 timestamp

### Social Events

**MarketLiked**
User marks a market as liked (favorites/bookmarks).
- `userId`: User identifier
- `marketId`: Market identifier
- `date`: ISO 8601 timestamp

**CommentPosted**
User posts a comment on a market discussion thread.
- `commentId`: Unique comment identifier
- `userId`: User identifier
- `marketId`: Market identifier
- `content`: Comment text
- `date`: ISO 8601 timestamp

## Event Flows

### Market Lifecycle

```
MarketCreated
  ↓
  └─→ MarketApproved (quality check passes)
  │     ↓
  │     ├─→ Bought (users buy shares)
  │     ├─→ Sold (users sell shares)
  │     ├─→ LiquidityDeposited (liquidity providers stake)
  │     ├─→ MarketLiked (users bookmark)
  │     ├─→ CommentPosted (discussion)
  │     ↓
  │     MarketResolved (outcome determined)
  │       ↓
  │       ├─→ PayoutClaimed (winners claim winnings)
  │       └─→ CreatorFeeClaimed (creator claims fees)
  │
  └─→ MarketRejected (quality check fails)

  OR

  └─→ MarketCancelled (cancelled before resolution)
```

### User Wallet Lifecycle

```
UserRegistered
  ↓
  ├─→ DepositReceived (user funds account)
  │     ↓
  │     └─→ Bought / Sold / LiquidityDeposited (market participation)
  │           ↓
  │           └─→ PayoutClaimed (settlement)
  │                 ↓
  │                 └─→ WithdrawalRequested
  │                       ↓
  │                       └─→ WithdrawalCompleted
  │
  └─→ UserProfileUpdated (anytime after registration)
```

## Event Sourcing Notes

- Events are immutable and timestamped
- Events represent facts about what happened, not requests or commands
- Event order matters; apply events sequentially to reconstruct state
- Market state transitions are deterministic based on events
- User balance is computed from DepositReceived, WithdrawalRequested, and settlement events
- Payout amounts are determined by market resolution and user position history
