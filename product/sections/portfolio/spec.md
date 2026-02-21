# Portfolio Specification

## Overview
Personal trading dashboard where users view their positions, profit/loss performance, transaction activity, and created markets. Features a profile card with interactive P/L chart and quick-access deposit/withdraw buttons.

## Conditional Entry
- If no wallet is configured (`walletState: 'none'`), show a centered "Get Started" call-to-action button that navigates to the wallet-setup section.
- If wallet is ready (`walletState: 'ready'`), show the full portfolio dashboard.

## User Flows
- View profile card with avatar, display name, joined date, and view count
- View interactive P/L chart with time range selectors (1D, 1W, 1M, ALL)
- See large P/L amount display that updates with selected time range
- View stats row: Positions Value | Biggest Win | Predictions count
- Deposit or withdraw sats using side-by-side action buttons
- Upload/change avatar by clicking the avatar image
- Browse positions in two sub-tabs: Active and Closed
- Sell a position using the "Sell" button on active positions
- Claim payout from winning positions using "Claim" button
- View activity feed (deposits, withdrawals, buys, sells, payouts, creator fees)
- Browse collapsible "My Markets" section for markets the user created
- Access Settings via gear icon in header

## UI Requirements

### Profile Card (Top Section)
- **Desktop**: Two-column layout
  - Left: avatar (clickable for upload), display name, joined date, view count
  - Right: P/L chart with 1D/1W/1M/ALL time selector buttons, large P/L amount display
- **Mobile**: Stacked vertically — profile info on top, chart below

### Stats Row
Three stat cards in a horizontal row with dividers:
- **Positions Value** — total value of all active positions in sats
- **Biggest Win** — largest single P/L gain in sats
- **Predictions** — total number of predictions made

### Deposit / Withdraw Buttons
- Two buttons side by side below the stats row
- "Deposit" (primary) and "Withdraw" (secondary)
- Full width on mobile, comfortable width on desktop

### Tabs: Positions | Activity
- **Positions** tab with sub-tabs: Active | Closed
  - Each position row shows: market title, market image, side (YES/NO), shares owned, current value, P/L amount and percent
  - Active positions have "Sell" button
  - Closed winning positions have "Claim" button (if payout not yet claimed)
  - Categorical positions show outcome label
- **Activity** tab
  - Chronological feed of all activity types: deposit, withdrawal, buy, sell, payout_claimed, creator_fee_claimed
  - Each item shows: type icon, description, amount, date, status
  - Buy/sell items include market title and position details
  - Deposit/withdrawal items include TX ID or Lightning invoice when applicable

### My Markets (Collapsible)
- Collapsible section below the main tabs
- Lists markets created by the user with: title, image, status badge, volume, fees earned
- "Claim Fees" button on resolved markets with unclaimed fees

## Configuration
- shell: true
