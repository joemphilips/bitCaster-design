# Market Creation & Management

## Overview
Creator dashboard for managing prediction markets. Markets go live immediately after creation with no approval gate. Features dashboard stats, paginated market list, volume analytics, and a CTA to create new markets via the market-creation wizard.

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
- **Add Market** — Styled as a filled CTA button (not a standard tab), navigates to market-creation wizard

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
