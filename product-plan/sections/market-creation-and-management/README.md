# Market Creation & Management

## Overview

Dashboard for market creators to view, analyze, and manage their prediction markets. Includes overview statistics, market list with actions, analytics charts, and access to the market creation wizard.

## User Flows

### View Dashboard Statistics

1. User lands on page, sees Overview tab by default
2. Stat cards show: Active Markets, Resolved, Total Volume, Fees Earned
3. Badge pills show pending/rejected/cancelled counts if any

### Manage Markets

1. Paginated list shows all user's created markets
2. Each row displays: thumbnail, title, status badge, closing date, volume, fees
3. Available actions depend on status:
   - Pending/Approved: "Cancel" button
   - Resolved with unclaimed fees: "Claim [amount] sats" button
   - All: "View Details" button

### Claim Creator Fees

1. User sees resolved market with unclaimed fees
2. Clicks "Claim [amount] sats" shimmer button
3. Fees transferred to wallet balance

### Analyze Performance

1. User clicks Analytics tab
2. Volume chart shows aggregate volume over time
3. User can toggle time scale: Daily, Weekly, Monthly
4. User can toggle view mode: Aggregate vs Per-Market
5. Per-Market mode shows breakdown with progress bars

### Create New Market

1. User clicks "Create Market" button
2. Wizard opens with 5 steps:
   - Step 1: Basic info (thumbnail, title, category, dates, answer URLs)
   - Step 2: Market type and outcomes
   - Step 3: Parameters (liquidity, fees)
   - Step 4: Cost review
   - Step 5: Description and submit
3. Draft is auto-saved, can be recovered later

## Design Decisions

### Dashboard-First Approach

The page opens to an overview dashboard rather than a market list, emphasizing the creator's business metrics.

### Prominent Create CTA

Large animated "Create Market" button with shimmer effect encourages market creation.

### Tab-Based Navigation

Overview and Analytics are separate tabs to keep the interface clean while providing depth.

### Visual Analytics

Bar chart with tooltips provides intuitive volume visualization. Per-market breakdown helps identify top performers.

## Components Provided

- `MarketCreationDashboard` — Main dashboard with tabs
- `StatCard` — Individual stat card with icon and variant
- `MarketRow` — Market list item with actions
- `VolumeChart` — Analytics chart component
- `Pagination` — Pagination controls

## Callback Props

| Callback | Description |
|----------|-------------|
| `onTabChange` | Tab switched (overview/analytics) |
| `onViewDetails` | Market row clicked |
| `onCreateMarket` | Create button clicked or wizard submitted |
| `onCancelMarket` | Cancel button clicked |
| `onClaimFees` | Claim fees button clicked |
| `onSaveDraft` | Wizard draft saved |
| `onDiscardDraft` | Discard draft clicked |
| `onTimeScaleChange` | Chart time scale changed |
| `onChartModeChange` | Chart mode toggled |
| `onPageChange` | Pagination page changed |
| `onPageSizeChange` | Page size changed |
