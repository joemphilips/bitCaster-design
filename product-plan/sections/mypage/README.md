# MyPage

## Overview

Personal dashboard where users view their trading positions, transaction history, and created markets. Features a profile header with P/L summary and expandable sections for different data categories.

## User Flows

### View P/L Summary

1. User lands on MyPage
2. Profile header shows avatar and display name
3. P/L cards show performance: 24h, 7 days, 30 days, All Time
4. All-Time card is highlighted with blue gradient

### Upload Avatar

1. User clicks on avatar image
2. File picker opens (accepts PNG, JPEG, WebP)
3. User selects image
4. Avatar updates

### Manage Positions

1. Positions section shows with badge count
2. Tabs: Active and Closed
3. Active positions show current value, P/L, and "Sell" button
4. Closed positions show final value, P/L, and "Claim" button if winning

### Sell Active Position

1. User finds active position
2. Clicks "Sell" button
3. Position sold, balance updated

### Claim Payout

1. User switches to Closed tab
2. Finds winning position with value > 0
3. Clicks "Claim" button
4. Payout received

### Review Order History

1. User expands Order History section (collapsed by default)
2. Sees list of deposits and withdrawals
3. Each shows: type icon, status badge, date, amount
4. Details show TX ID or Lightning invoice

### Manage Created Markets

1. User expands My Markets section (collapsed by default)
2. Sees list of created markets with status
3. Can claim fees from resolved markets

## Design Decisions

### P/L Cards First

The profile header immediately shows trading performance to give users quick insight into their activity.

### Expandable Sections

Sections collapse to reduce visual clutter. Positions expanded by default (most important), others collapsed.

### Active/Closed Position Tabs

Separating positions by status helps users focus on actionable items (active positions to sell) vs historical (closed).

### Compact Order History

Order history uses a dense list format since it's primarily for reference, not frequent interaction.

## Components Provided

- `MyPage` — Main page with all sections
- `ProfileHeader` — Avatar and P/L cards
- `PLCard` — Individual P/L metric card
- `ExpandableSection` — Collapsible section wrapper
- `PositionsSection` — Positions with tabs
- `PositionRow` — Individual position row
- `OrderHistorySection` — Order history list
- `OrderHistoryRow` — Individual order row
- `CreatedMarketsSection` — Created markets list
- `CreatedMarketRow` — Individual created market row

## Callback Props

| Callback | Description |
|----------|-------------|
| `onAvatarUpload` | Avatar image selected |
| `onSellPosition` | Sell button clicked |
| `onViewPosition` | Position row clicked |
| `onClaimPayout` | Claim button clicked (winning position) |
| `onPositionsTabChange` | Active/Closed tab switched |
| `onViewMarket` | Created market row clicked |
| `onClaimCreatorFees` | Claim fees button clicked |
| `onViewOrder` | Order history row clicked |

## Visual Reference

See `screenshot.png` for the target UI design.
