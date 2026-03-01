# Portfolio

## Overview
Personal trading dashboard with positions, P/L chart, activity feed, funds, and created markets. Features a profile card with interactive P/L chart and quick-access deposit/withdraw buttons.

## Components
- `Portfolio` — Root component, conditionally renders dashboard or "Get Started" CTA
- `ProfileCard` — Avatar (clickable for upload), display name, joined date, view count, P/L chart
- `PLChart` — Interactive P/L line chart with 1D/1W/1M/ALL time range selectors
- `PositionsList` — Tabbed list (Active / Closed) of market positions
- `PositionRow` — Individual position with market info, side, shares, P/L, Sell/Claim actions
- `FundsList` — Base ecash fund balances per mint
- `FundRow` — Individual fund with unit, amount, mint URL
- `ActivityFeed` — Chronological feed of deposits, withdrawals, trades, payouts, creator fees
- `MyMarkets` — Collapsible section listing user-created markets with fee management
- `CreatedMarketRow` — Market row with status badge, volume, fees earned, Claim Fees action

## Conditional Entry
- `walletState: 'none'` → Centered "Get Started" CTA that navigates to wallet-setup
- `walletState: 'ready'` → Full portfolio dashboard

## Layout
- **Desktop**: Two-column profile card (left: profile info, right: P/L chart)
- **Mobile**: Stacked vertically (profile info on top, chart below)

### Stats Row
Three stat cards: Positions Value | Biggest Win | Predictions count

### Action Buttons
Side-by-side "Deposit" (primary) and "Withdraw" (secondary) buttons below stats.

### Tabs
- **Positions** — Active / Closed sub-tabs with Sell and Claim actions
- **Activity** — Chronological feed with type icons, descriptions, amounts, statuses

### My Markets (Collapsible)
Lists created markets with title, image, status badge, volume, fees earned. "Claim Fees" button on resolved markets with unclaimed fees.

## Configuration
- shell: true
