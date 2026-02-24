# Portfolio

## Overview
Personal trading dashboard with positions, funds, P/L chart, activity feed, and created markets. Features conditional entry: shows "Get Started" CTA if no wallet, full dashboard if wallet ready.

## User Flows
- View profile card with avatar, name, joined date, view count
- View interactive P/L chart with 1D/1W/1M/ALL selectors
- View total balance across positions and funds
- Deposit/withdraw sats (opens Deposit/Withdraw modal)
- Browse Positions tab (Active/Closed sub-tabs) with Sell/Claim actions
- Browse Funds tab showing base ecash assets per mint
- View collapsible activity feed (deposits, withdrawals, trades, payouts, fees)
- Browse collapsible "My Markets" section

## Data Used
**Entities:** UserProfile, PLChartData, Position, Fund, ActivityItem, CreatedMarket
**From global model:** DepositReceived, WithdrawalRequested, Bought, Sold, PayoutClaimed, CreatorFeeClaimed

## Components Provided
- `Portfolio` — Main container with conditional rendering
- `ProfileCard` — User info + P/L chart
- `PLChart` — Interactive P/L chart
- `StatsRow` — Three stat cards
- `PositionsList` — Tabbed positions list (Active/Closed)
- `PositionRow` — Individual position
- `FundsList` — List of base ecash funds
- `FundRow` — Individual fund row (sats/USD per mint)
- `ActivityFeed` — Chronological activity
- `MyMarkets` — Collapsible created markets
- `CreatedMarketRow` — Individual created market

## Callback Props

| Callback | Description |
|----------|-------------|
| `onGetStarted` | Navigate to wallet setup |
| `onAvatarUpload` | Upload avatar image |
| `onTimeRangeChange` | Select P/L time range |
| `onDeposit` | Open deposit flow (→ Deposit/Withdraw modal) |
| `onWithdraw` | Open withdraw flow (→ Deposit/Withdraw modal) |
| `onSellPosition` | Sell a position |
| `onClaimPayout` | Claim winning payout |
| `onClaimCreatorFees` | Claim creator fees |
| `onViewPosition` | View position details |
| `onViewFund` | View fund details |
| `onViewMarket` | View created market |
| `onViewActivity` | View activity item details |
| `onPositionsTabChange` | Switch Active/Closed |
| `onOpenSettings` | Open settings |
