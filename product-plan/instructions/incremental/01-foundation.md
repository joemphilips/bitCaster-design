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

Key values:
- Primary: Tailwind blue
- Secondary: Tailwind amber
- Neutral: Tailwind slate
- Accent: Bitcoin orange `#f7931a`
- Background: `#0a0a0a`
- Fonts: Inter (heading/body), JetBrains Mono (mono)

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/event-model/events.ts` for domain event definitions
- See `product-plan/event-model/README.md` for event flows and relationships
- Key entities: User, Market (YesNo/Categorical/2D), Position, Activity, Settings

### 3. Routing Structure

Create placeholder routes for each section:

- `/` or `/markets` — Market Discovery & Trading (default home)
- `/markets/:id` — Market Detail
- `/portfolio` — Portfolio
- `/creator` — Market Creation & Management
- `/creator/new` — Market Creation Wizard
- `/settings` — Settings
- `/setup` — Wallet Setup (first-time only)

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Top navigation with logo, Markets link, search, notification bell
- `UserMenu.tsx` — User dropdown with avatar, name, balance, menu items

**Wire Up Navigation:**

- Markets (TrendingUp icon) → `/markets`
- Search → inline search or `/markets?q=...`
- Notifications (Bell icon) → notification feed (with unread badge)
- Creator (Sparkles icon, via User Menu) → `/creator`
- Portfolio (Wallet icon, via User Menu) → `/portfolio`
- Settings (Gear icon, via User Menu) → `/settings`
- Logout → clear session

**Mobile Navigation:**
Bottom bar with 5 items: Markets, Search, Notifications, Creator, User (→ Portfolio)

**User Menu:**
- User avatar, name, balance in sats
- CreatorPage, Portfolio, Settings, Logout options

**Brand Motto:**
Background image from `product/brand_motto.png` at subtle opacity

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/event-model/` — Event definitions and flows
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, fonts, spacing)
- [ ] Data model types are defined
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Notification badge works
- [ ] Responsive on mobile (bottom nav bar)
