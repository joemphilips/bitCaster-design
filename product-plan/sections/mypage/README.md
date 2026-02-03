# MyPage

## Overview

Personal dashboard where users view their trading positions, transaction history, and created markets. Provides a comprehensive view of user's activity and portfolio.

## Design Intent

- **At-a-glance P/L**: Profile header immediately shows performance across time scales
- **Organized sections**: Expandable sections prevent overwhelming the user
- **Quick actions**: Sell buttons on positions, copy buttons on transactions
- **Personalization**: Avatar upload for identity

## Key Features

### Profile Header
- User avatar (clickable to upload new image)
- Display name
- P/L summary cards with time scale toggle (24h, 7d, 30d, All-time)

### Positions Section
- Expandable container
- Sub-tabs: Active (open markets) and Closed (resolved)
- Each position shows: market title, shares, value, P/L, Sell button

### Order History Section
- Expandable container
- Deposits and withdrawals
- Full details: date, type, amount, TX ID, status, Lightning invoice

### My Markets Section
- Expandable container
- List of user's created markets
- Links to market detail and creator dashboard

## Components

| Component | Description |
|-----------|-------------|
| `MyPage` | Main page container |
| `ProfileHeader` | Avatar, name, P/L cards |
| `PLCard` | Single time-scale P/L display |
| `ExpandableSection` | Collapsible container |
| `PositionsSection` | Positions with Active/Closed tabs |
| `PositionItem` | Single position row |
| `OrderHistorySection` | Transaction list |
| `OrderItem` | Single transaction row |
| `MyMarketsSection` | Created markets list |

## Files

- `types.ts` — TypeScript interfaces for user data
- `sample-data.json` — Sample user profile and data
- `tests.md` — Test requirements
- `components/` — Reference React implementations

## P/L Display

- Positive P/L: Green color, + prefix
- Negative P/L: Red color, - prefix
- All values in ₿ format
