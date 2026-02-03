# Market Discovery & Trading

## Overview

Core marketplace where users browse active prediction markets, view odds, and place trades in real-time. This is the default home view of bitCaster.

## Design Intent

- **Discoverability**: Tag-based navigation lets users quickly find markets by interest
- **Low friction**: Inline trading means users can trade without leaving the browse view
- **Unified cards**: All market types (Yes/No, Categorical, 2D) use consistent 280px card height
- **Information density**: Metrics footer provides key stats at a glance

## Key Features

### Tag Navigation
- Single-select horizontal tag bar
- Meta tags (Trending, Popular, New) + category tags
- Trending is default selection

### Filter Controls
- Hidden by default to keep interface clean
- Toggle with filter icon
- Market Type, Volume range, Closing date filters

### Market Cards
- Fixed 280px height for visual consistency
- Yes/No: Chance percentage with Buy Yes/No buttons
- Categorical: Scrollable outcome list with individual Yes/No
- 2D: Grid layout showing composite odds

### Inline Trading
- Card transforms to trading overlay on Buy click
- Amount input with quick buttons (100, 500, 1000, 5000)
- Predicted odds and cancel option
- Card size does NOT change during transformation

### Secondary Markets (2D)
- "and..." link expands to show secondary markets
- Each secondary market navigates to its detail page
- Expanded height: 280px + 40px per secondary

## Components

| Component | Description |
|-----------|-------------|
| `MarketDiscovery` | Main page container with tag bar, filters, and grid |
| `TagBar` | Horizontal tag navigation with single-select |
| `FilterControls` | Collapsible filter row |
| `MarketCard` | Unified card handling all market types |
| `TradingOverlay` | Inline trading transformation |
| `MetricsFooter` | Volume, liquidity, traders, likes |

## Files

- `types.ts` — TypeScript interfaces for markets, tags, and filters
- `sample-data.json` — Sample markets for development
- `tests.md` — Test requirements
- `components/` — Reference React implementations

## Currency Display

All values use ₿ prefix (not "sats" suffix):
- `₿12,500` for exact amounts
- `₿12.5K` for thousands
- `₿1.2M` for millions
