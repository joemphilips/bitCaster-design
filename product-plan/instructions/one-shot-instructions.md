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

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

## Product Overview

### Summary

bitCaster is an open-source Cashu wallet with prediction market superpowers. It combines a full-featured ecash wallet — send, receive, and manage sats privately via Lightning — with a Bitcoin-native prediction market where users trade outcomes using Cashu conditional tokens (CTF). No accounts, no KYC, no bridging — just sats.

### Key Features
- Cashu ecash wallet — send, receive, and manage sats with full privacy
- Lightning deposit and withdrawal — no accounts, no bridging, no gas
- Prediction market trading — buy and sell outcome shares on a central limit order book
- Real-time price discovery — live odds, order book depth, and price charts via SignalR
- Portfolio tracking — positions, P/L charts, activity history, and fund management
- Open market creation — propose markets via Nostr + DLC oracle announcements (later phase)
- Seed phrase backup — recover wallet and positions from a BIP-39 mnemonic
- Multi-mint support — connect to any NUT-CTF compatible Cashu mint
- Brand motto: "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE"

### Planned Sections

1. **Wallet Setup** — First-time onboarding wizard for wallet creation or recovery
2. **Portfolio** — Positions, funds, P/L chart, activity feed, and created markets
3. **Deposit / Withdraw** — Fund the wallet or cash out via Ecash or Lightning
4. **Settings** — User preferences (currency, theme, connected mints, Nostr, seed backup)
5. **Market Discovery & Trading** — Core marketplace where users browse and trade prediction markets (default home view)
6. **Market Detail** — Detailed trading view with order book, charts, and trade panel
7. **Market Creation & Management** — Creator dashboard for managing and creating markets (later phase)
8. **Market Creation** — 7-step wizard for creating new prediction markets (later phase)

### Data Model

Core entities:
- **Condition** — A prediction question registered on a NUT-CTF compliant mint
- **Market** — A tradeable view combining protocol data from the mint with real-time trade data
- **Outcome** — A possible result within a condition (maps to NUT-CTF outcome collection)
- **Position** — A user's stake on a specific outcome (reconstructed from local ecash tokens)
- **Order** — A buy or sell order on the order book
- **Trade** — A completed transaction between a buyer and a seller
- **Fund** — Base ecash balance held in the wallet (not locked to any market)
- **Activity** — Ledger entry for deposits, withdrawals, buys, sells, and payouts
- **Mint** — A connected Cashu mint
- **Oracle** — A DLC oracle that announces events via Nostr
- **Comment** — A user comment on a market

### Design System

**Colors:**
- Primary: `blue`
- Secondary: `amber`
- Neutral: `slate`

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

### Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Wallet Setup** — First-time onboarding wizard (5-step flow)
3. **Portfolio** — Trading dashboard with positions, P/L, and activity feed
4. **Deposit / Withdraw** — Modal flows for Ecash and Lightning deposit/withdrawal
5. **Settings** — User preferences and configuration
6. **Market Discovery & Trading** — Core marketplace with tag navigation, filters, and quick trading
7. **Market Detail** — Comprehensive trading view with charts and order book
8. **Market Creation & Management** — Creator dashboard (later phase)
9. **Market Creation** — 7-step market creation wizard (later phase)

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

---

# Milestone 1: Foundation

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

---

# Milestone 2: Wallet Setup

## Goal
Implement the Wallet Setup section — first-time onboarding wizard for creating a new wallet or recovering from a seed phrase.

## Overview
A 5-step flow that guides new users through wallet creation or recovery. This is the entry point for all new users and must complete before any other section is accessible. No application shell is shown during setup.

**Key Functionality:**
- Welcome landing with Terms of Service popup
- PWA installation confirmation
- Choice between creating a new wallet or recovering an existing one
- Seed phrase display (3x4 grid) with verification (words #3, #7, #12)
- Seed phrase recovery with 12-word input and BIP-39 validation
- Mint connection setup with connection testing
- Background data loading from hard-coded mint during steps 3-5

## Recommended Approach: Test-Driven Development
See `product-plan/sections/wallet-setup/tests.md` for detailed test-writing instructions.

## What to Implement

### Components
Copy from `product-plan/sections/wallet-setup/components/`:
- `WalletSetup.tsx` — Main orchestrator component
- `WelcomeLanding.tsx` — Step 1: Welcome page
- `PwaConfirmation.tsx` — Step 2: PWA install confirmation
- `ChoiceCards.tsx` — Step 3: Create/Recover choice
- `SeedDisplay.tsx` — Step 4 (create): Seed phrase display
- `SeedInput.tsx` — Step 4 (recover): Seed phrase input
- `MintSetup.tsx` — Step 5: Mint connection setup
- `StepIndicator.tsx` — Progress indicator (steps 3-5)

### Data Layer
Key types: `SetupStep`, `SetupChoice`, `SeedVerifyPhase`, `MintConnectionTest`, `BackgroundDataLoad`

### Callbacks
- `onWelcomeNext` — Advance from welcome
- `onShowTerms` / `onCloseTerms` — Terms of Service popup
- `onPwaNext` — Advance from PWA step
- `onChoiceSelect` — Create/Recover selection
- `onSeedSavedToggle` — Seed phrase saved confirmation
- `onSeedVerifyInput` — Verification word input
- `onSeedVerifyComplete` — Verification success → advance
- `onSeedWordInput` / `onSeedPhrasePaste` — Recovery input
- `onRecover` — Trigger recovery
- `onAddMint` / `onRemoveMint` — Mint management
- `onFinishSetup` — Complete setup → navigate to Portfolio

## Expected User Flows

### Flow 1: Create New Wallet
1. User sees Welcome page, clicks "Next"
2. User sees PWA confirmation, clicks "Next"
3. User selects "Create New Wallet"
4. User sees 12 seed words, checks "I have saved", clicks Continue
5. User verifies words #3, #7, #12 correctly
6. User sees Mint Setup with pre-connected mint
7. User clicks "Finish Setup"
**Outcome:** Wallet created, navigates to Portfolio

### Flow 2: Recover Wallet
1. User sees Welcome → PWA → selects "Recover Wallet"
2. User enters 12 seed words (or pastes phrase)
3. User clicks "Recover"
4. User sees Mint Setup, clicks "Finish Setup"
**Outcome:** Wallet recovered, navigates to Portfolio

## Done When
- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] 5-step wizard completes for both create and recover paths
- [ ] Seed phrase verification validates words #3, #7, #12
- [ ] Mint connection testing works
- [ ] Background data loading starts at step 3
- [ ] No shell is displayed during setup
- [ ] Responsive on mobile

---

# Milestone 3: Portfolio

## Goal
Implement the Portfolio section — personal trading dashboard with positions, P/L, activity, and created markets.

## Overview
Users view their trading performance, manage positions, and track all wallet activity. Includes a profile card with interactive P/L chart and quick-access deposit/withdraw buttons.

**Key Functionality:**
- Conditional entry: "Get Started" CTA when no wallet, full dashboard when wallet ready
- Profile card with avatar (clickable upload), display name, joined date, view count
- Interactive P/L chart with time range selectors (1D/1W/1M/ALL)
- Stats row: Positions Value, Biggest Win, Predictions count
- Deposit/Withdraw action buttons
- Positions tab with Active/Closed sub-tabs
- Activity feed (deposits, withdrawals, buys, sells, payouts, creator fees)
- My Markets collapsible section
- Sell and Claim buttons on positions

## What to Implement

### Components
- `Portfolio.tsx` — Main dashboard layout
- `ProfileCard.tsx` — User profile with avatar
- `PLChart.tsx` — P/L chart with time range selector
- `PositionsList.tsx` — Positions with Active/Closed tabs
- `PositionRow.tsx` — Individual position row
- `FundsList.tsx` — Base ecash funds list
- `FundRow.tsx` — Individual fund row
- `ActivityFeed.tsx` — Activity history
- `MyMarkets.tsx` — Created markets collapsible section
- `CreatedMarketRow.tsx` — Created market row

### Key Callbacks
- `onGetStarted` — Navigate to wallet setup
- `onAvatarUpload` — Upload avatar
- `onTimeRangeChange` — P/L chart time range
- `onDeposit` / `onWithdraw` — Open deposit/withdraw modal
- `onSellPosition` — Sell a position
- `onClaimPayout` — Claim winning position payout
- `onClaimCreatorFees` — Claim creator fees
- `onViewPosition` / `onViewMarket` / `onViewActivity` — View details
- `onPositionsTabChange` — Active/Closed tab switch
- `onOpenSettings` — Settings gear icon

## Expected User Flows

### Flow 1: View Portfolio
1. User navigates to Portfolio
2. Sees profile card, P/L chart, stats row
3. Browses active positions
**Outcome:** Full portfolio overview displayed

### Flow 2: Sell a Position
1. User clicks "Sell" on an active position
**Outcome:** Sell flow initiated

### Flow 3: First-Time User (No Wallet)
1. User navigates to Portfolio without wallet setup
2. Sees "Get Started" CTA
3. Clicks "Get Started"
**Outcome:** Navigates to wallet setup

## Done When
- [ ] Tests written and passing
- [ ] "Get Started" CTA shown when no wallet
- [ ] Full dashboard when wallet ready
- [ ] P/L chart with time range switching
- [ ] Active/Closed position tabs work
- [ ] Activity feed displays all activity types
- [ ] My Markets section collapses/expands
- [ ] Deposit/Withdraw buttons trigger callbacks
- [ ] Responsive on mobile

---

# Milestone 4: Deposit / Withdraw

## Goal
Implement the Deposit/Withdraw flows — modal overlays for funding and cashing out via Ecash or Lightning.

## Overview
Modal overlay flows accessed from Portfolio deposit/withdraw buttons. Mirrors cashu.me's Receive/Send UX with bottom sheet method chooser and method-specific full-screen views.

**Key Functionality:**
- Method chooser bottom sheet (Ecash / Lightning)
- Deposit Ecash: Paste, Scan, Request actions
- Deposit Lightning: Mint selector, amount numpad, CREATE INVOICE
- Send Ecash: Mint selector, amount numpad, SEND
- Pay Lightning: Mint selector, invoice/address input, Scan QR

## What to Implement

### Components
- `DepositWithdraw.tsx` — Main orchestrator
- `MethodChooser.tsx` — Bottom sheet with Ecash/Lightning options
- `DepositEcash.tsx` — Deposit Ecash actions
- `DepositLightning.tsx` — Lightning deposit with numpad
- `SendEcash.tsx` — Send Ecash with numpad
- `PayLightning.tsx` — Pay Lightning invoice
- `MintSelector.tsx` — Mint dropdown with balance
- `Numpad.tsx` — Numeric keypad
- `AmountDisplay.tsx` — Amount with fiat conversion

### Key Callbacks
- `onSelectMethod` — Choose Ecash/Lightning
- `onNumpadPress` — Numpad key input
- `onMintChange` — Switch mint
- `onToggleCurrency` — Sats/fiat toggle
- `onCreateInvoice` — Generate Lightning invoice
- `onSendEcash` — Send ecash tokens
- `onPaste` / `onScan` / `onRequest` — Deposit ecash actions
- `onScanQR` — Scan QR for Lightning payment
- `onClose` / `onBack` — Navigation

## Expected User Flows

### Flow 1: Deposit via Lightning
1. User taps "Deposit" in Portfolio
2. Method chooser appears, user selects "Lightning"
3. User enters amount on numpad
4. User taps "CREATE INVOICE"
**Outcome:** Lightning invoice generated

### Flow 2: Withdraw via Ecash
1. User taps "Withdraw" in Portfolio
2. Method chooser appears, user selects "Ecash"
3. User enters amount, taps "SEND"
**Outcome:** Ecash token generated for sharing

## Done When
- [ ] Tests written and passing
- [ ] Method chooser bottom sheet works
- [ ] All 4 flow views render correctly
- [ ] Numpad accepts input and updates amount
- [ ] Fiat/sats toggle works
- [ ] Mint selector shows available mints
- [ ] No shell displayed (modal overlay)
- [ ] Responsive on mobile (bottom sheet)

---

# Milestone 5: Settings

## Goal
Implement the Settings section — user preferences organized into 4 collapsible category groups.

## Overview
Accessed via gear icon in Portfolio header or User dropdown menu. Manages general preferences, Cashu mint connections, Nostr identity, and oracle configuration.

**Key Functionality:**
- 4 collapsible categories (accordion, one expanded at a time)
- General: Base currency (BTC/USD/JPY), Language (en/ja), Theme (Light/Dark/System)
- Cashu: Connected mints list, add/remove mints, seed phrase backup
- Nostr: Signer mode (None/NIP-07/nsec), profile preview, relay management
- Oracle: Coming soon placeholder (visually muted)

## What to Implement

### Components
- `Settings.tsx` — Main settings page with collapsible groups

### Key Callbacks
- `onCategoryToggle` — Expand/collapse category
- `onBaseCurrencyChange`, `onLanguageChange`, `onThemeChange` — General
- `onAddMint`, `onRemoveMint`, `onViewSeedPhrase` — Cashu
- `onSignerModeChange`, `onNsecSubmit`, `onAddRelay`, `onRemoveRelay` — Nostr

## Expected User Flows

### Flow 1: Change Theme
1. User opens Settings, General expanded by default
2. User selects "Light" theme
**Outcome:** Theme changes to light mode

### Flow 2: Add a Mint
1. User expands Cashu section
2. User clicks "Add Mint", enters URL
3. Connection test runs
**Outcome:** Mint added to connected mints list

### Flow 3: Connect Nostr
1. User expands Nostr section
2. User selects "NIP-07 Extension"
3. Profile fetched and displayed
**Outcome:** Nostr identity connected

## Done When
- [ ] Tests written and passing
- [ ] 4 collapsible categories work (accordion behavior)
- [ ] General settings: currency, language, theme all functional
- [ ] Cashu: mint list, add/remove, seed backup
- [ ] Nostr: signer mode, profile preview, relay management
- [ ] Oracle: coming soon placeholder with muted styling
- [ ] Responsive on mobile

---

# Milestone 6: Market Discovery & Trading

## Goal
Implement the Market Discovery & Trading section — the core marketplace where users browse and trade prediction markets.

## Overview
The default home view after onboarding. Users browse markets through a single-select tag navigation system, filter markets, and execute quick trades directly from market cards.

**Key Functionality:**
- Single-select tag navigation (meta tags: Trending/Popular/New + category tags)
- Market filtering (Market Type, Volume range, Closing date)
- Yes/No market cards with inline trading (Buy Yes/Buy No)
- Categorical market cards with per-outcome Yes/No buttons
- Numeric markets are disabled until an authoritative trade representation exists.
- Inline card trade overlay (amount picker, predicted odds, BUY button)
- Like button on each market card
- Infinite scroll loading
- Refresh button with last-updated timestamp
- Background loading progress bar (after wallet setup)

## What to Implement

### Components
- `MarketDiscovery.tsx` — Main page component
- `TagBar.tsx` — Horizontal tag bar (meta + category tags)
- `FilterControls.tsx` — Filter row (market type, volume, closing date)
- `MarketCard.tsx` — Market card with trading overlay

### Callbacks
- `onTagSelect` — Single tag selection
- `onSearch` — Search query
- `onMarketTypeChange`, `onVolumeRangeChange`, `onClosingDateChange` — Filters
- `onBuyYes` / `onBuyNo` — Yes/No market trades
- `onBuyOutcomeYes` / `onBuyOutcomeNo` — Categorical market trades
- `onViewMarket` — Navigate to market detail
- `onLoadMore` — Infinite scroll
- `onRefreshConditions` — Refresh market data from mint

## Expected User Flows

### Flow 1: Browse and Quick Trade (Yes/No)
1. User lands on page, sees Trending markets
2. User clicks "Buy Yes" on a market card
3. Card transforms to trade overlay with amount picker
4. User selects amount, sees predicted odds, clicks "BUY"
**Outcome:** Trade executed, card returns to normal

### Flow 2: Navigate to Market Detail
1. User clicks on market card (outside buttons)
**Outcome:** Navigates to `/markets/:id`

### Flow 3: Filter Markets
1. User clicks filter icon, filter row appears
2. User selects "Categorical" market type
3. Markets update to show only categorical markets

## Done When
- [ ] Tests written and passing
- [ ] Tag navigation works (single-select)
- [ ] Yes/No and Categorical market types render correctly
- [ ] Inline trading overlay works for Yes/No and Categorical
- [ ] Filters work correctly
- [ ] Infinite scroll loads more markets
- [ ] Refresh button re-fetches conditions
- [ ] Background loading progress bar shows when applicable
- [ ] Responsive on mobile

---

# Milestone 7: Market Detail

## Goal
Implement the Market Detail page — comprehensive trading view with order book, charts, and trade panel.

## Overview
Accessed by clicking on a market card. Provides full market analysis and trading interface supporting market orders, limit orders, buy and sell operations, and Yes/No and Categorical markets.

**Key Functionality:**
- Market header with image, title, tags, countdown, creator info, metrics footer
- Trading panel with Buy/Sell toggle + Market/Limit sub-tabs
- Outcome selection (Yes/No buttons or categorical outcome list)
- Trade preview with predicted odds, price impact, payout, fees
- Optional trade comment (280 chars)
- Price chart with timeframe selector (1H/24H/7D/1M/ALL) and Price/Volume toggle
- Comment bubbles overlaid on price chart
- Order book visualization
- Resolution details section
- Recent trades feed
- Comments section (read-only, comments posted via trading)
- Related markets horizontal scroll
- Resolved market view (no trading panel, single-column layout)
- Numeric markets are disabled until an authoritative finite-bin or numeric-range trade representation exists.

## What to Implement

### Components
- `MarketDetail.tsx` — Main page layout
- `MarketHeader.tsx` — Header with image, title, metrics
- `TradingPanel.tsx` — Buy/Sell + Market/Limit trading interface
- `PriceChart.tsx` — Interactive price/volume chart
- `OrderBookSection.tsx` — Order book visualization
- `ResolutionInfo.tsx` — Resolution criteria and status
- `ActivityFeed.tsx` — Recent trades list
- `CommentSection.tsx` — Comments display
- `RelatedMarkets.tsx` — Horizontal related markets
- `MarketStats.tsx` — Market statistics

### Key Callbacks
- `onTradeSelect` / `onTradeClear` — Select/clear outcome
- `onAmountChange` — Trade amount input
- `onTradeConfirm` — Execute trade
- `onTradeSideChange` — Buy/Sell toggle
- `onOrderTypeChange` — Market/Limit toggle
- `onLimitPriceChange` — Limit order price
- `onTimeframeChange` / `onChartTypeChange` — Chart controls
- `onLikeToggle` — Like/unlike market
- `onCommentPost` / `onCommentLike` — Comments
- `onShare` — Share market

## Expected User Flows

### Flow 1: Place a Market Buy Order
1. User views market, selects "Yes" outcome
2. User enters amount (e.g., 1000 sats)
3. System shows predicted odds, payout, fees
4. User optionally adds a comment
5. User clicks "Buy YES for ₿1,000"
**Outcome:** Trade executed, activity updates

### Flow 2: Place a Limit Sell Order
1. User clicks "Sell" tab, then "Limit" sub-tab
2. User sets limit price and amount
3. User clicks "Place Sell Limit Order"
**Outcome:** Limit order placed

### Flow 3: View Resolved Market
1. User navigates to a resolved market
2. RESOLVED badge shown, no trading panel
3. Single-column layout, resolution details prominent

## Done When
- [ ] Tests written and passing
- [ ] Two-column layout (desktop), single-column (mobile)
- [ ] Buy/Sell + Market/Limit all work correctly
- [ ] Trade preview shows accurate calculations
- [ ] Price chart renders with timeframe switching
- [ ] Order book visualization works
- [ ] Resolved markets show correctly (no trading)
- [ ] Comments displayed, posted via trades only
- [ ] Responsive on mobile (sticky trade button)

---

# Milestone 8: Market Creation & Management (Later Phase)

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

---

# Milestone 9: Market Creation Wizard (Later Phase)

## Goal
Implement the Market Creation Wizard — 7-step wizard for creating new prediction markets.

## Overview
Accessed from the Market Creation & Management dashboard. Guides users through oracle configuration, market type, basic info, outcomes, fees, cost preview, and final review.

**Key Functionality:**
- Step 1: Oracle check (full-screen, no step indicator) — use existing announcement or become oracle
- Steps 2-7: Main wizard with 6-step progress indicator
- Step 2: Get Started — choose outcome type (Yes/No or Categorical)
- Step 3: Basic Info — thumbnail, title, categories, closing date, answer URLs
- Step 4: Outcomes — define outcomes with labels, descriptions, thumbnails, probabilities
- Step 5: Market Settings — sell/buy/win fee percentages
- Step 6: Market Preview — estimated cost and worst-case loss
- Step 7: Review & Create — rich text description, AI generation, submit

## What to Implement

### Components
- `MarketCreationWizard.tsx` — Wizard orchestrator
- `OracleCheck.tsx` — Step 1: Oracle selection
- `GetStarted.tsx` — Step 2: Outcome type
- `BasicInfo.tsx` — Step 3: Market details
- `OutcomesStep.tsx` — Step 4: Outcome definitions
- `MarketSettings.tsx` — Step 5: Fee configuration
- `MarketPreviewStep.tsx` — Step 6: Cost preview
- `ReviewAndCreate.tsx` — Step 7: Final review
- `StepIndicator.tsx` — 6-step progress indicator

### Key Callbacks
- `onOracleChoiceSelect` / `onAnnouncementSelect` — Oracle step
- `onOutcomeTypeSelect` — Market type
- `onTitleChange` / `onCategoryTagsChange` / `onClosingDateChange` — Basic info
- `onAddOutcome` / `onRemoveOutcome` / `onOutcomeLabelChange` — Outcomes
- `onSellFeeChange` / `onBuyFeeChange` / `onWinFeeChange` — Fees
- `onConfirmPreview` — Cost confirmation
- `onDescriptionChange` — Final description
- `onCreateMarket` — Submit market

## Done When
- [ ] Tests written and passing
- [ ] 7-step wizard navigates correctly
- [ ] Oracle check works with both paths
- [ ] Basic info validates required fields
- [ ] Outcomes can be added/removed
- [ ] Fee configuration works
- [ ] Cost preview calculates correctly
- [ ] Rich text description editor works
- [ ] Final submission creates market
- [ ] No shell displayed during wizard
- [ ] Responsive on mobile
