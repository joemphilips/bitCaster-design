# Portfolio

## Overview
Personal trading dashboard with positions, P/L chart, activity feed, and created markets. Features conditional entry: shows "Get Started" CTA if no wallet, full dashboard if wallet ready.

## User Flows
- View profile card with avatar, name, joined date, view count
- View interactive P/L chart with 1D/1W/1M/ALL selectors
- See stats: Positions Value, Biggest Win, Predictions count
- Deposit/withdraw sats
- Browse positions (Active/Closed tabs) with Sell/Claim actions
- View activity feed (deposits, withdrawals, trades, payouts, fees)
- Browse collapsible "My Markets" section

## Data Used
**Entities:** UserProfile, PLChartData, PortfolioStats, Position, ActivityItem, CreatedMarket
**From global model:** DepositReceived, WithdrawalRequested, Bought, Sold, PayoutClaimed, CreatorFeeClaimed

## Components Provided
- `Portfolio` — Main container with conditional rendering
- `ProfileCard` — User info + P/L chart
- `PLChart` — Interactive P/L chart
- `StatsRow` — Three stat cards
- `PositionsList` — Tabbed positions list
- `PositionRow` — Individual position
- `ActivityFeed` — Chronological activity
- `MyMarkets` — Collapsible created markets
- `CreatedMarketRow` — Individual created market

## Callback Props

| Callback | Description |
|----------|-------------|
| `onGetStarted` | Navigate to wallet setup |
| `onAvatarUpload` | Upload avatar image |
| `onTimeRangeChange` | Select P/L time range |
| `onDeposit` | Open deposit flow |
| `onWithdraw` | Open withdraw flow |
| `onSellPosition` | Sell a position |
| `onClaimPayout` | Claim winning payout |
| `onClaimCreatorFees` | Claim creator fees |
| `onViewMarket` | View created market |
| `onPositionsTabChange` | Switch Active/Closed |
| `onOpenSettings` | Open settings |
