# Market Creation & Management Specification

## Overview
A section for market creators to manage their prediction markets. Includes three tabbed views: Overview (dashboard with stats and market list), Analytics (volume charts over time), and Add Market (a CTA-styled button leading to a 5-step wizard for creating new markets).

## User Flows
- View dashboard with active/resolved market counts, total volumes, and creator fees earned
- Browse paginated list of created markets with thumbnail, title, status, volume, end date, fees earned, and "View Details" action
- Analyze market performance with time-series volume charts (combined or per-market toggle) at daily/weekly/monthly/yearly scales
- Create a new market via 5-step wizard with persistent state across navigation:
  1. **Basic Info**: Upload thumbnail, enter title, select category tags, set end datetime, add answer URLs (sources of truth)
  2. **Market Outcomes**: Choose Yes/No, Numeric, or Categorical. Add outcomes with description (required), thumbnail (optional), probability (optional). View normalized probability preview. Numeric outcomes auto-sort.
  3. **Market Parameters**: Set liquidity (sats to deposit) and fees (sell/buy/win)
  4. **Review**: Summary of all settings with "Initial Cost / Worst Case Loss" calculation (liquidity + 1000 for now)
  5. **Final Review**: Rich text description editor with "Generate with AI" button, then submit
- After successful submission, navigate to the newly created market's detail page
- If validation fails, display error summary banner at top

## UI Requirements
- Three-tab layout: Overview, Analytics, Add Market (styled as filled CTA button, not a standard tab)
- Rich market list items showing thumbnail, title, status, volume, end date, fees earned, View Details action
- Paginated market list
- Volume chart with aggregate/per-market toggle and time scale selector (daily/weekly/monthly/yearly)
- 5-step wizard with step indicator, back/forward navigation, state preservation
- File upload for thumbnails (market and outcomes)
- Tag selector for categories
- DateTime picker for end date
- Rich text editor for final description
- "Generate with AI" button for description auto-generation
- Error summary banner for validation failures

## Configuration
- shell: true
