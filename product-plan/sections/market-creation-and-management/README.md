# Market Creation & Management

## Overview

A comprehensive dashboard for market creators to manage their prediction markets, analyze performance, and create new markets through a guided wizard.

## Design Intent

- **Creator-focused**: Dashboard puts creator stats and markets front and center
- **Guided creation**: 5-step wizard reduces complexity of market creation
- **Data visibility**: Analytics tab provides insights into market performance
- **Progressive disclosure**: CTA-styled Add Market tab encourages creation

## Key Features

### Three-Tab Layout
1. **Overview**: Dashboard with stats and paginated market list
2. **Analytics**: Volume charts with time scale selection
3. **Add Market**: CTA-styled button that opens creation wizard

### Overview Dashboard
- Stat cards: Active Markets, Resolved Markets, Total Volume, Creator Fees
- Paginated market list with thumbnail, title, status, volume, end date, fees

### Analytics
- Volume chart (line/bar)
- Aggregate vs per-market toggle
- Time scales: Daily, Weekly, Monthly, Yearly

### 5-Step Creation Wizard
1. **Basic Info**: Thumbnail, title, category tags, end date, answer URLs
2. **Market Outcomes**: Type selection, outcome configuration
3. **Market Parameters**: Liquidity, fee percentages
4. **Review**: Summary with cost calculation
5. **Final Review**: Rich text description, AI generation option

## Components

| Component | Description |
|-----------|-------------|
| `MarketCreationDashboard` | Main container with tab navigation |
| `StatCard` | Individual stat display (count or amount) |
| `MarketRow` | Market list item with details and actions |
| `VolumeChart` | Analytics line/bar chart |
| `Pagination` | Page navigation controls |
| `WizardContainer` | Multi-step form wrapper |
| `StepIndicator` | Visual progress indicator |

## Files

- `types.ts` — TypeScript interfaces for dashboard and wizard
- `sample-data.json` — Sample creator data
- `tests.md` — Test requirements
- `components/` — Reference React implementations

## Wizard State

The wizard preserves state across step navigation:
- User can go back without losing data
- Validation occurs on step transition
- Final submission sends all collected data
