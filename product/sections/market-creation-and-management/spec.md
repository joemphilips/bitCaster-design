# Market Creation & Management Specification

## Overview
A section for market creators to manage their prediction markets. Markets go live as ordinary `Open` markets after registration. There is no approval or review gate. Includes three tabbed views: Overview (dashboard with stats and market list), Analytics (volume charts over time), and Add Market (a CTA-styled button leading to the market-creation flow). If the oracle does not attest an outcome in time, the market is refunded.

## User Flows
- View dashboard with active/resolved market counts, total volumes, and creator fees earned
- Browse paginated list of created markets with thumbnail, title, status, volume, end date, fees earned, and "View Details" action
- Analyze market performance with time-series volume charts (combined or per-market toggle) at daily/weekly/monthly/yearly scales
- Create a new market via a five-stage flow with persistent state across navigation:
  1. **Basic Info**: Upload thumbnail, enter title, select category tags, set end datetime, add answer URLs (sources of truth)
  2. **Market Outcomes**: Choose Yes/No or Categorical. Add outcomes with description (required) and thumbnail (optional).
  3. **Market Parameters**: Set fees (sell/buy/win)
  4. **Review**: Summary of metadata and outcomes
  5. **Final Review**: Rich text description editor with "Generate with AI" button, then submit
- After successful registration, keep the market Open and show the creator an optional post-create bot funding handoff. The handoff uses the separate durable LIQUIDITY flow. Any user can run this flow again from market detail. It is not restricted to the creator.
- If validation fails, display error summary banner at top

## UI Requirements
- Three-tab layout: Overview, Analytics, Add Market (styled as filled CTA button, not a standard tab)
- Rich market list items showing thumbnail, title, status, volume, end date, fees earned, View Details action
- Paginated market list
- Volume chart with aggregate/per-market toggle and time scale selector (daily/weekly/monthly/yearly)
- Creation flow with step indicator, back/forward navigation, and state preservation
- File upload for thumbnails (market and outcomes)
- Tag selector for categories
- DateTime picker for end date
- Rich text editor for final description
- "Generate with AI" button for description auto-generation
- Error summary banner for validation failures

## Configuration
- shell: true
