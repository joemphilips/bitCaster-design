# Event Model

## Domain Events

| Event | Description |
|-------|-------------|
| UserRegistered | A new user joins the platform |
| UserProfileUpdated | User updates profile info |
| DepositReceived | Sats deposited into wallet |
| WithdrawalRequested | User initiates withdrawal |
| WithdrawalCompleted | Withdrawal finalized |
| MarketCreated | New prediction market created |
| MarketResolved | Outcome determined, market closed |
| MarketRefunded | Oracle didn't attest in time, participants refunded |
| Bought | User buys shares in a market outcome |
| Sold | User sells shares in a market outcome |
| LiquidityDeposited | Liquidity added to a market |
| PayoutClaimed | Winner claims payout |
| CreatorFeeClaimed | Creator claims fee earnings |
| MarketLiked | User likes/bookmarks a market |
| CommentPosted | User posts a comment on a market |

## Event Flows

- **MarketCreated** → market immediately active for trading
- **Bought**, **Sold**, **LiquidityDeposited** occur during active trading
- **MarketResolved** enables **PayoutClaimed** and **CreatorFeeClaimed**
- **MarketRefunded** returns funds when oracle doesn't attest
- **WithdrawalRequested** → **WithdrawalCompleted**
- **DepositReceived** increases available balance
