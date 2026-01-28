# Event Model

## Domain Events

### UserRegistered
A new user joins the bitCaster platform. Contains user identifier and basic registration information.

### UserProfileUpdated
User updates their profile information such as display name, bio, or preferences.

### DepositReceived
Bitcoin (sats) deposited into a user's wallet. Contains amount in sats and transaction details.

### WithdrawalRequested
User initiates a withdrawal of sats from their wallet. Contains amount and destination address.

### WithdrawalCompleted
Withdrawal finalized and sats successfully sent to user's external wallet.

### MarketCreated
User creates a new prediction market. Contains market question, outcomes, resolution date, fee structure, and other parameters.

### MarketApproved
Market passes quality controls and goes live for trading. All markets must be approved before trading begins.

### MarketRejected
Market fails quality controls and is rejected. Contains rejection reason.

### MarketResolved
Outcome determined and market closed. Contains the winning outcome and resolution details.

### MarketCancelled
Market cancelled before resolution. Funds returned to participants.

### Bought
User buys shares/positions in a market outcome. Contains market identifier, outcome, amount of sats, and number of shares purchased.

### Sold
User sells shares/positions in a market outcome. Contains market identifier, outcome, amount of sats, and number of shares sold.

### LiquidityDeposited
Liquidity provider adds funds to a market. Can occur at any time during the market's active period to improve market depth and trading. Contains market identifier and amount of liquidity added.

### PayoutClaimed
Winner claims their payout from a resolved market. Contains market identifier, user identifier, and payout amount in sats.

### CreatorFeeClaimed
Market creator claims their fee earnings from a resolved market. Contains market identifier and fee amount in sats.

### MarketLiked
User likes a market to show interest or bookmark it. Contains market identifier and user identifier.

### CommentPosted
User posts a comment on a market. Contains market identifier, user identifier, and comment content.

## Event Flows

- When **MarketCreated** occurs, it must go through **MarketApproved** or **MarketRejected** before trading begins
- **MarketApproved** enables **Bought**, **Sold**, and **LiquidityDeposited** events for that market
- **LiquidityDeposited** can occur anytime during a market's active period (not just at creation)
- **Bought** and **Sold** events occur during active market trading
- When **MarketResolved** occurs, it enables **PayoutClaimed** and **CreatorFeeClaimed** events
- **WithdrawalRequested** leads to **WithdrawalCompleted**
- **DepositReceived** increases user's available balance for trading and withdrawals
- **MarketLiked** and **CommentPosted** can occur on any approved market (after **MarketApproved**)
