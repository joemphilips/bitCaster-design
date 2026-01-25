# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

### 2. Data Model Types

Create TypeScript interfaces for your core entities based on the event model:

**Domain Events:**
- `UserRegistered` — New user joins the platform
- `UserProfileUpdated` — User updates profile information
- `DepositReceived` — Bitcoin deposited into user's wallet
- `WithdrawalRequested` — User initiates withdrawal
- `WithdrawalCompleted` — Withdrawal finalized
- `MarketCreated` — User creates a new prediction market
- `MarketApproved` — Market passes quality controls
- `MarketRejected` — Market fails quality controls
- `MarketResolved` — Outcome determined and market closed
- `MarketCancelled` — Market cancelled before resolution
- `Bought` — User buys shares in a market outcome
- `Sold` — User sells shares in a market outcome
- `LiquidityDeposited` — Liquidity provider adds funds to a market
- `PayoutClaimed` — Winner claims payout from resolved market
- `CreatorFeeClaimed` — Market creator claims fee earnings

See `product-plan/event-model/` for detailed event definitions.

### 3. Routing Structure

Create routes for each section:

| Route | Description |
|-------|-------------|
| `/` or `/markets` | Market Discovery & Trading (default home) |
| `/markets/:id` | Individual market detail page |
| `/create` | Market Creation & Management dashboard |
| `/mypage` | Personal dashboard |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with top navigation (desktop) and bottom navigation (mobile)
- `MainNav.tsx` — Navigation with markets link and search box
- `UserMenu.tsx` — User menu with avatar, balance, and dropdown

**Wire Up Navigation:**

Connect navigation to your routing:

| Nav Item | Route | Icon |
|----------|-------|------|
| Markets | `/markets` | TrendingUp (lucide-react) |
| Create | `/create` | Primary button |
| MyPage | `/mypage` | In user menu dropdown |

**User Menu:**

The user menu expects:
- User display name
- Avatar URL (optional)
- Balance in sats
- Logout callback

**Responsive Behavior:**

Desktop/Tablet:
- Horizontal top navigation bar
- Logo on left, Markets link, search box in center, Create button, user menu on right

Mobile (< 768px):
- Simple top header with logo only
- Fixed bottom navigation bar with 4 items: Markets, Search, Create, User

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/event-model/` — Event definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, typography)
- [ ] Data model types are defined for all entities
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with top navigation (desktop) and bottom navigation (mobile)
- [ ] Navigation links to correct routes
- [ ] User menu shows user info and balance
- [ ] Create button navigates to market creation
- [ ] Search box is functional
- [ ] Responsive on mobile
