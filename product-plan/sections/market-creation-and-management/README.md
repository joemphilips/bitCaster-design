# Market Creation & Management

## Overview
Dashboard for market creators to manage their prediction markets. Includes tabbed views: Overview (stats + market list), Analytics (volume charts), and Add Market (CTA to creation wizard).

## User Flows
- View dashboard stats (active/resolved counts, volumes, fees)
- Browse paginated market list with status, volume, fees earned
- Analyze volume charts (aggregate or per-market, daily/weekly/monthly)
- Create new markets via 5-step wizard
- Cancel markets, claim fees

## Data Used
**Entities:** DashboardStats, CreatorMarket, VolumeChartData, MarketVolumeData, WizardDraft, PaginationState
**From global model:** MarketCreated, MarketResolved, MarketRefunded, CreatorFeeClaimed

## Components Provided
- `MarketCreationDashboard` — Main tabbed container
- `MarketRow` — Individual market list item
- `StatCard` — Dashboard stat display
- `VolumeChart` — Time-series volume chart
- `Pagination` — Page navigation

## Callback Props

| Callback | Description |
|----------|-------------|
| `onViewDetails` | Navigate to market detail page |
| `onTabChange` | Switch between Overview/Analytics tabs |
| `onCreateMarket` | Submit new market |
| `onCancelMarket` | Cancel a market |
| `onClaimFees` | Claim creator fees |
| `onSaveDraft` | Save wizard draft |
| `onTimeScaleChange` | Change chart time scale |
| `onChartModeChange` | Toggle aggregate/per-market |
| `onPageChange` | Navigate pages |
