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

Key design decisions:
- Primary color: **blue** (buttons, links, active states)
- Secondary color: **amber** (tags, highlights, bitcoin-related, notification badges)
- Neutral color: **slate** (backgrounds, text, borders)
- Default theme: **dark** (slate-900/950 backgrounds)
- Heading & body font: **Inter**
- Monospace font: **JetBrains Mono** (used for sats amounts, prices, order book)

### 2. Data Model Types

Create TypeScript interfaces for your core entities. See `product-plan/data-model/` for:
- `data-shape.md` — Full entity definitions with field descriptions
- Each section's `types.ts` for component-level interfaces

Key entities to define: Condition, Market, Outcome, Position, Order, Trade, Fund, Activity, Mint, Oracle, Comment

### 3. Routing Structure

Create routes for each section:

| Route | Section | Shell |
|-------|---------|-------|
| `/setup` | Wallet Setup | No |
| `/` or `/markets` | Market Discovery & Trading | Yes |
| `/markets/:id` | Market Detail | Yes |
| `/portfolio` | Portfolio | Yes |
| `/deposit` | Deposit (modal overlay) | No |
| `/withdraw` | Withdraw (modal overlay) | No |
| `/settings` | Settings | Yes |
| `/creator` | Market Creation & Management | Yes |
| `/creator/new` | Market Creation Wizard | No |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with top navigation bar and mobile bottom navigation
- `MainNav.tsx` — Navigation component with Markets link and search
- `UserMenu.tsx` — User dropdown menu with avatar, balance, and menu items

**Wire Up Navigation:**

- **Markets** (TrendingUp icon) → `/markets` (default home view)
- **Search** → inline search input (desktop) / search interface (mobile)
- **Notifications** → Bell icon with unread badge (bitcoin orange `#f7931a`)
- **User Menu dropdown:**
  - CreatorPage (Sparkles icon) → `/creator`
  - Portfolio (Wallet icon) → `/portfolio`
  - Settings (Gear icon) → `/settings`
  - Logout

**Mobile Bottom Navigation (< 768px):**
1. Markets (TrendingUp icon)
2. Search (Search icon)
3. Notifications (Bell icon with badge)
4. Creator (Sparkles icon)
5. User (avatar → Portfolio)

**Brand Motto Background:**
- Static background image: `product/brand_motto.png`
- Fixed positioning, subtle opacity

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions (data-shape.md)
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, fonts, dark theme)
- [ ] Data model types are defined for all core entities
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with top navigation bar
- [ ] Markets link navigates to discovery page
- [ ] User menu dropdown shows CreatorPage, Portfolio, Settings, Logout
- [ ] Mobile bottom navigation bar with 5 items
- [ ] Notification bell with unread badge
- [ ] Brand motto background image displayed
- [ ] Responsive on mobile
