# bitCaster — Complete Implementation Instructions

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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

## Product Overview

bitCaster is a Bitcoin-native prediction market platform where anyone can create, trade, and monetize markets. All markets are denominated in sats, providing global accessibility without the barriers of traditional prediction market platforms.

### Key Features

- Bitcoin-only deposits with sat denomination
- Open market creation for any user
- Fee collection system for market creators
- Automated market resolution and payout distribution
- Real-time trading with live price discovery
- Hybrid moderation (permissionless with quality controls)

### Sections

1. **Market Discovery & Trading** — Core marketplace for browsing and trading
2. **Market Creation & Management** — Creator dashboard and market wizard
3. **MyPage** — Personal dashboard with positions and history

### Design System

- **Primary:** blue (buttons, links, accents)
- **Secondary:** amber (tags, highlights)
- **Neutral:** slate (backgrounds, text, borders)
- **Fonts:** Inter (heading/body), JetBrains Mono (monospace)

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with tokens from `product-plan/design-system/`:

- CSS custom properties for colors
- Tailwind color configuration
- Google Fonts setup (Inter, JetBrains Mono)

### 2. Data Model Types

Create TypeScript interfaces based on the event model in `product-plan/event-model/`:

**Domain Events:**
- `UserRegistered`, `UserProfileUpdated`
- `DepositReceived`, `WithdrawalRequested`, `WithdrawalCompleted`
- `MarketCreated`, `MarketApproved`, `MarketRejected`, `MarketResolved`, `MarketCancelled`
- `Bought`, `Sold`, `LiquidityDeposited`
- `PayoutClaimed`, `CreatorFeeClaimed`

### 3. Routing Structure

| Route | Description |
|-------|-------------|
| `/` or `/markets` | Market Discovery & Trading (default home) |
| `/markets/:id` | Individual market detail page |
| `/create` | Market Creation & Management dashboard |
| `/mypage` | Personal dashboard |

### 4. Application Shell

Copy shell components from `product-plan/shell/components/`:

- `AppShell.tsx` — Main layout with top nav (desktop) and bottom nav (mobile)
- `MainNav.tsx` — Navigation with markets link and search
- `UserMenu.tsx` — User menu with avatar, balance, dropdown

**Navigation Structure:**
- Markets link → `/markets` (TrendingUp icon)
- Create button → `/create` (primary CTA)
- User menu → MyPage, Logout

**Responsive Behavior:**
- Desktop: Horizontal top navigation bar
- Mobile: Simple header + fixed bottom nav bar

## Done When

- [ ] Design tokens configured
- [ ] Data model types defined
- [ ] Routes exist for all sections
- [ ] Shell renders with navigation
- [ ] User menu works
- [ ] Responsive on mobile

---

# Milestone 2: Market Discovery & Trading

## Goal

Implement the core marketplace where users browse markets, filter by tags, and execute quick trades.

## Overview

The main landing page with:
- Responsive market card grid
- Single-select tag navigation (Trending/Popular/New + categories)
- Filter controls (market type, volume, closing date)
- Inline trading interface on market cards
- Infinite scroll

## Components

From `product-plan/sections/market-discovery-and-trading/components/`:
- `MarketDiscovery.tsx` — Main page
- `TagBar.tsx` — Tag navigation
- `FilterControls.tsx` — Filter controls
- `MarketCard.tsx` — Market card with trading

## Key Callbacks

- `onTagSelect` — Single-select tag filtering
- `onBuyYes/onBuyNo` — Trade execution for Yes/No markets
- `onBuyOutcomeYes/onBuyOutcomeNo` — Trade execution for categorical
- `onViewMarket` — Navigate to market detail
- `onLoadMore` — Infinite scroll

## User Flows

1. Browse by tag (single-select navigation)
2. Quick trade on Yes/No market
3. Quick trade on categorical market
4. Apply filters

## Done When

- [ ] Tag navigation works (single-select)
- [ ] Filters work
- [ ] Quick trading works
- [ ] Infinite scroll works
- [ ] Empty states display
- [ ] Responsive on mobile

---

# Milestone 3: Market Creation & Management

## Goal

Implement the creator dashboard for managing markets and creating new ones.

## Overview

Dashboard with:
- Overview tab: Stats cards + paginated market list
- Analytics tab: Volume charts with time scale options
- Create Market CTA → 5-step wizard
- Draft persistence
- Fee claiming

## Components

From `product-plan/sections/market-creation-and-management/components/`:
- `MarketCreationDashboard.tsx` — Main dashboard
- `StatCard.tsx` — Stat card
- `MarketRow.tsx` — Market list item
- `VolumeChart.tsx` — Analytics chart
- `Pagination.tsx` — Pagination controls

## Key Callbacks

- `onCreateMarket` — Submit market wizard
- `onClaimFees` — Claim creator fees
- `onCancelMarket` — Cancel market
- `onTabChange` — Switch tabs
- `onTimeScaleChange` — Chart time scale

## User Flows

1. View dashboard statistics
2. Claim creator fees from resolved market
3. Analyze volume performance
4. Create new market (5-step wizard)
5. Cancel a market

## Done When

- [ ] Dashboard stats display
- [ ] Market list with pagination
- [ ] Analytics charts work
- [ ] Create wizard works with draft persistence
- [ ] Fee claiming works
- [ ] Market cancellation works
- [ ] Empty states display
- [ ] Responsive on mobile

---

# Milestone 4: MyPage

## Goal

Implement the personal dashboard for viewing positions, orders, and created markets.

## Overview

Personal hub with:
- Profile header: Avatar + P/L summary (24h, 7d, 30d, All-time)
- Positions section: Active/Closed tabs with Sell/Claim actions
- Order History section: Deposits/withdrawals with status
- Created Markets section: User's markets with fee claiming

## Components

From `product-plan/sections/mypage/components/`:
- `MyPage.tsx` — Main page
- `ProfileHeader.tsx` — Avatar and P/L cards
- `PLCard.tsx` — P/L metric card
- `ExpandableSection.tsx` — Collapsible section
- `PositionsSection.tsx` — Positions with tabs
- `PositionRow.tsx` — Position row
- `OrderHistorySection.tsx` — Order history
- `OrderHistoryRow.tsx` — Order row
- `CreatedMarketsSection.tsx` — Created markets
- `CreatedMarketRow.tsx` — Created market row

## Key Callbacks

- `onAvatarUpload` — Upload avatar
- `onSellPosition` — Sell active position
- `onClaimPayout` — Claim winning payout
- `onClaimCreatorFees` — Claim creator fees
- `onPositionsTabChange` — Switch Active/Closed

## User Flows

1. View P/L summary
2. Upload avatar
3. Sell active position
4. Claim payout from winning position
5. Review order history
6. Manage created markets

## Done When

- [ ] Profile header with P/L metrics
- [ ] Avatar upload works
- [ ] Positions with Active/Closed tabs
- [ ] Selling and claiming work
- [ ] Order history displays
- [ ] Created markets section works
- [ ] Empty states display
- [ ] Expandable sections work
- [ ] Responsive on mobile
