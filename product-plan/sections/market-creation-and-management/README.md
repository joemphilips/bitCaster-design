# Market Creation & Management

## Overview
Creator dashboard for managing prediction markets. Markets go live as ordinary `Open` markets after registration with no approval gate. Features dashboard stats, paginated market list, volume analytics, and a CTA to create new markets via the market-creation flow.

If the oracle does not attest an outcome in time, the market is refunded.

## Components
- `MarketCreationDashboard` — Root component with tab layout
- `StatCard` — Individual stat display (active, resolved, refunded counts; volume; fees)
- `MarketRow` — Market list row with thumbnail, title, status badge, volume, end date, fees, "View Details" action
- `VolumeChart` — Time-series volume chart with aggregate/per-market toggle and time scale selector
- `Pagination` — Page navigation for market list

## Tabs
- **Overview** — Dashboard stats and paginated market list
- **Analytics** — Volume charts with time scale selector (daily/weekly/monthly)
- **Add Market** — Styled as a filled CTA button (not a standard tab), navigates to the market-creation flow

Market registration accepts metadata, oracle details, and canonical Yes/No or categorical outcomes. It does not include probability, numeric configuration, or funding. After registration succeeds, the market remains Open and the UI can offer the creator an optional post-create bot funding handoff. The same durable LIQUIDITY flow can run again from market detail for any user. It is not restricted to the creator.

## Dashboard Stats
- Active markets count
- Resolved markets count
- Refunded markets count
- Total volume (sats)
- Total fees earned / claimed / unclaimed (sats)

## Market List
- Paginated rows showing: thumbnail, title, description, status badge (active/resolved/refunded), volume, end date, fees earned, "View Details" action
- Resolved markets with unclaimed fees show "Claim Fees" button
- Refunded markets show "Refunded" badge and refunded amount

## Volume Analytics
- Aggregate mode: combined volume across all markets
- Per-market mode: individual market volume breakdown
- Time scales: daily, weekly, monthly

## Configuration
- shell: true
