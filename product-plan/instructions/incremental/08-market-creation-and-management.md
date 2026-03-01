# Milestone 8: Market Creation & Management (Later Phase)

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-7 complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions

---

## Goal
Implement the Market Creation & Management dashboard — creator tools for managing prediction markets.

## Overview
A dashboard for market creators with three tabbed views: Overview (stats + market list), Analytics (volume charts), and Add Market (CTA leading to creation wizard).

**Key Functionality:**
- Dashboard stats: active/resolved/refunded counts, total volume, fees earned/claimed
- Paginated market list with status badges, volume, fees
- Volume charts (daily/weekly/monthly) with aggregate/per-market toggle
- 5-step creation wizard with persistent draft state
- Claim fees on resolved markets
- View market details navigation

## What to Implement

### Components
- `MarketCreationDashboard.tsx` — Main dashboard with tabs
- `StatCard.tsx` — Dashboard stat card
- `MarketRow.tsx` — Market list row
- `VolumeChart.tsx` — Time-series volume chart
- `Pagination.tsx` — Paginated list controls

### Key Callbacks
- `onTabChange` — Overview/Analytics switch
- `onViewDetails` — Navigate to market detail
- `onCreateMarket` — Submit new market
- `onClaimFees` — Claim creator fees
- `onWizardStepChange` / `onSaveDraft` / `onDiscardDraft` — Wizard
- `onTimeScaleChange` / `onChartModeChange` — Analytics
- `onPageChange` — Pagination

## Done When
- [ ] Tests written and passing
- [ ] Dashboard stats display correctly
- [ ] Market list paginates correctly
- [ ] Volume charts render with time scale switching
- [ ] Add Market CTA navigates to creation wizard
- [ ] Claim fees works on resolved markets
- [ ] Responsive on mobile
