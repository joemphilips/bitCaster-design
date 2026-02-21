# bitCaster — One-Shot Implementation Instructions

This document contains all 8 milestones for implementing bitCaster. Complete them in order.

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

For every milestone, follow this TDD workflow:

1. Read `tests.md` in the corresponding section folder
2. Write failing tests before writing any implementation code
3. Implement the minimum code to make tests pass
4. Refactor while keeping tests green

Test instructions are framework-agnostic. Adapt them to your chosen test runner (Vitest, Jest, Playwright, Cypress, etc.).

---

## Product Overview

### bitCaster

Bitcoin-native prediction market platform where anyone can create, trade, and monetize markets. All markets denominated in sats.

### Key Features
- Bitcoin-only deposits with sat denomination
- Open market creation for any user
- Fee collection system for market creators
- Automated market resolution and payout
- Real-time trading with live price discovery
- Supports Yes/No, Categorical, and 2D composite markets

### Planned Sections
1. Market Discovery & Trading — Core marketplace for browsing and trading
2. Market Creation & Management — Creator dashboard and analytics
3. Portfolio — Personal trading dashboard with positions and P/L
4. Market Detail — Comprehensive market view with trading panel
5. Settings — User preferences (currency, theme, mints, Nostr, oracle)
6. Wallet Setup — First-time onboarding wizard
7. Market Creation — 7-step market creation wizard

### Design System
- Primary: blue, Secondary: amber, Neutral: slate, Accent: #f7931a
- Fonts: Inter (heading/body), JetBrains Mono (mono)
- Dark theme, background #0a0a0a

### Implementation Sequence
Build in milestones:
1. Foundation — Design tokens, data model, routing, shell
2-8. Each section in order listed above

---

## Milestone 1: Foundation

> **Prerequisites:** None

### Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

### What to Implement

#### 1. Design Tokens

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

#### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/event-model/events.ts` for domain event definitions
- See `product-plan/event-model/README.md` for event flows and relationships
- Key entities: User, Market (YesNo/Categorical/2D), Position, Activity, Settings

#### 3. Routing Structure

Create placeholder routes for each section:

- `/` or `/markets` — Market Discovery & Trading (default home)
- `/markets/:id` — Market Detail
- `/portfolio` — Portfolio
- `/creator` — Market Creation & Management
- `/creator/new` — Market Creation Wizard (no shell)
- `/settings` — Settings
- `/setup` — Wallet Setup (no shell, first-time only)

#### 4. Application Shell

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

**Brand Motto:**
Background image from `product/brand_motto.png` at subtle opacity

### Done When

- [ ] Design tokens are configured (colors, fonts, spacing)
- [ ] Data model types are defined
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info
- [ ] Notification badge works
- [ ] Responsive on mobile (bottom nav bar)

---

## Milestone 2: Market Discovery & Trading

> **Prerequisites:** Milestone 1 complete

### Goal

Implement the core marketplace where users browse prediction markets and execute quick trades.

### Overview

Users land on a single-page marketplace showing active prediction markets organized by tags. They can filter by market type, volume, or closing date, then trade directly from a market card without navigating away. Markets come in three types: Yes/No, Categorical, and Two-Dimensional composite. New markets append via infinite scroll.

**Key Functionality:**
- Single-select horizontal tag bar (Trending, Popular, New, Sports, Politics, Crypto, etc.)
- Collapsible filter row (Market Type, Volume Range, Closing Date)
- Fixed-height (280px) market cards for all three market types
- Inline trading overlay that transforms the card without changing its size
- Expandable secondary market list for 2D composite markets ("and..." link)
- Infinite scroll for loading additional markets

### Components

Copy from `product-plan/sections/market-discovery-and-trading/components/`:

- `MarketDiscovery` — Main container with tag bar, filters, and market grid
- `MarketCard` — Individual market card (YesNo, Categorical, 2D)
- `FilterControls` — Market type, volume range, and closing date filters
- `TagBar` — Horizontal tag navigation (single-select)

### Data Layer

Key types: `YesNoMarket`, `CategoricalMarket`, `TwoDimensionalMarket`, `TradeState`, `FilterState`

API endpoints:
- `GET /markets?tag=&type=&minVolume=&maxVolume=&closingBefore=&page=`
- `POST /markets/:id/trade`

### Callbacks

| Callback | What to do |
|----------|------------|
| `onSearch` | Filter markets by query string |
| `onTagSelect` | Fetch markets filtered by tag |
| `onBuyYes` | Call trade API with `side: "yes"` |
| `onBuyNo` | Call trade API with `side: "no"` |
| `onBuyOutcomeYes` | Call trade API for a categorical outcome, yes side |
| `onBuyOutcomeNo` | Call trade API for a categorical outcome, no side |
| `onViewMarket` | Navigate to `/markets/:id` |
| `onLoadMore` | Fetch next page and append |
| `onBuy2DYesNoCombo` | Call trade API for 2D yes/no combination |
| `onBuy2DCategoricalCombo` | Call trade API for 2D categorical combination |
| `onViewSecondaryMarket` | Navigate to secondary market detail page |

### Files to Reference
- `product-plan/sections/market-discovery-and-trading/README.md`
- `product-plan/sections/market-discovery-and-trading/tests.md`
- `product-plan/sections/market-discovery-and-trading/components/`
- `product-plan/sections/market-discovery-and-trading/types.ts`
- `product-plan/sections/market-discovery-and-trading/sample-data.json`

### Done When

- [ ] Tests written and passing
- [ ] All three market card types render with real data
- [ ] Tag bar single-select works and fetches correct markets
- [ ] Filters apply and combine correctly
- [ ] Trading overlay opens and closes without resizing the card
- [ ] Trades execute via API and card odds update
- [ ] Empty states display for no results and network errors
- [ ] Infinite scroll loads additional pages
- [ ] "and..." expands 2D secondary market list
- [ ] Responsive on mobile

---

## Milestone 3: Market Creation & Management

> **Prerequisites:** Milestone 1 complete

### Goal

Implement the creator dashboard for monitoring, analyzing, and managing prediction markets.

### Overview

Authenticated market creators see a tabbed dashboard with aggregate stats, a paginated market list, and volume analytics. They can cancel markets, claim creator fees, and launch the Market Creation Wizard.

**Key Functionality:**
- Dashboard stats: active/resolved counts, total volume, total fees earned
- Paginated market list with status, volume, fees, and actions
- Volume chart with daily/weekly/monthly time scale and aggregate vs. per-market toggle
- Cancel market and claim fees actions
- "Add Market" CTA navigating to `/creator/new`

### Components

Copy from `product-plan/sections/market-creation-and-management/components/`:

- `MarketCreationDashboard` — Main tabbed container
- `MarketRow` — Individual market list item
- `StatCard` — Single stat display
- `VolumeChart` — Time-series volume chart
- `Pagination` — Page navigation

### Data Layer

Key types: `DashboardStats`, `CreatorMarket`, `VolumeChartData`, `PaginationState`

API endpoints:
- `GET /creator/stats`
- `GET /creator/markets?page=&limit=`
- `GET /creator/analytics?timeScale=&mode=`
- `POST /creator/markets/:id/cancel`
- `POST /creator/markets/:id/claim-fees`

### Callbacks

| Callback | What to do |
|----------|------------|
| `onViewDetails` | Navigate to `/markets/:id` |
| `onTabChange` | Switch between tabs |
| `onCreateMarket` | Navigate to `/creator/new` |
| `onCancelMarket` | Confirmation dialog, then cancel API |
| `onClaimFees` | Call claim-fees API |
| `onSaveDraft` | Persist wizard draft |
| `onTimeScaleChange` | Fetch analytics with updated time scale |
| `onChartModeChange` | Fetch analytics with updated mode |
| `onPageChange` | Fetch selected page |

### Files to Reference
- `product-plan/sections/market-creation-and-management/README.md`
- `product-plan/sections/market-creation-and-management/tests.md`
- `product-plan/sections/market-creation-and-management/components/`
- `product-plan/sections/market-creation-and-management/types.ts`
- `product-plan/sections/market-creation-and-management/sample-data.json`

### Done When

- [ ] Tests written and passing
- [ ] Stats load with real data
- [ ] Market list paginates correctly
- [ ] Volume chart responds to time scale and mode toggles
- [ ] Cancel and claim fees flows work end-to-end
- [ ] "Add Market" navigates to wizard
- [ ] Empty state for creators with no markets
- [ ] Responsive on mobile

---

## Milestone 4: Portfolio

> **Prerequisites:** Milestone 1 complete

### Goal

Implement the personal trading dashboard where users track positions, P/L, activity history, and created markets.

### Overview

Conditional entry: no-wallet users see a "Get Started" CTA; wallet users see the full dashboard with profile card, P/L chart, stats, positions, activity feed, and created markets list.

**Key Functionality:**
- Conditional rendering: no-wallet CTA vs. full dashboard
- Profile card with avatar upload and interactive P/L chart (1D/1W/1M/ALL)
- Stats row: Positions Value, Biggest Win, Predictions count
- Deposit and withdraw sats
- Tabbed positions list (Active with Sell, Closed with Claim Payout)
- Chronological activity feed
- Collapsible "My Markets" section

### Components

Copy from `product-plan/sections/portfolio/components/`:

- `Portfolio` — Main container with conditional rendering
- `ProfileCard` — User info plus P/L chart
- `PLChart` — Interactive P/L chart
- `StatsRow` — Three stat cards
- `PositionsList` — Tabbed positions list
- `PositionRow` — Individual position
- `ActivityFeed` — Chronological activity
- `MyMarkets` — Collapsible created markets
- `CreatedMarketRow` — Individual created market

### Data Layer

Key types: `UserProfile`, `PLChartData`, `PortfolioStats`, `Position`, `ActivityItem`, `CreatedMarket`

API endpoints:
- `GET /portfolio/profile`
- `GET /portfolio/pl?range=1D|1W|1M|ALL`
- `GET /portfolio/stats`
- `GET /portfolio/positions?tab=active|closed`
- `GET /portfolio/activity`
- `GET /portfolio/markets`
- `POST /portfolio/positions/:id/sell`
- `POST /portfolio/positions/:id/claim`
- `POST /portfolio/deposit`
- `POST /portfolio/withdraw`
- `POST /portfolio/avatar`

### Callbacks

| Callback | What to do |
|----------|------------|
| `onGetStarted` | Navigate to `/setup` |
| `onAvatarUpload` | Upload avatar via API |
| `onTimeRangeChange` | Fetch P/L for selected range |
| `onDeposit` | Open deposit flow |
| `onWithdraw` | Open withdraw flow |
| `onSellPosition` | Call sell API, refresh list |
| `onClaimPayout` | Call claim API, refresh list |
| `onClaimCreatorFees` | Claim creator fees API |
| `onViewMarket` | Navigate to `/markets/:id` |
| `onPositionsTabChange` | Fetch positions for tab |
| `onOpenSettings` | Navigate to `/settings` |

### Files to Reference
- `product-plan/sections/portfolio/README.md`
- `product-plan/sections/mypage/tests.md`
- `product-plan/sections/portfolio/components/`
- `product-plan/sections/portfolio/types.ts`
- `product-plan/sections/mypage/sample-data.json`

### Done When

- [ ] Tests written and passing
- [ ] No-wallet gate renders CTA; wallet users see dashboard
- [ ] P/L chart responds to time range selector
- [ ] Active and Closed positions load from API
- [ ] Sell and Claim Payout actions work end-to-end
- [ ] Activity feed loads chronologically
- [ ] My Markets collapses/expands and links correctly
- [ ] All empty states display properly
- [ ] Responsive on mobile

---

## Milestone 5: Market Detail

> **Prerequisites:** Milestone 1 complete

### Goal

Implement a comprehensive single-market view with trading panel, price charts, order book, activity feed, comments, and support for all market types including resolved markets.

### Overview

Two-column layout (desktop): left column has market header, price chart, resolution info, order book, activity, related markets, and comments. Right column is a sticky trading panel. Trading panel supports Buy/Sell toggle and Market/Limit order types. Resolved markets use single-column layout with no trading panel.

**Key Functionality:**
- Market header with image, tags, creator info, metrics, like, and share
- Trading panel with Buy/Sell toggle, Market/Limit tabs, outcome selection for all market types
- Price chart with 1H/24H/7D/30D/ALL timeframes, price/volume toggle, and comment bubble overlay
- 2D conditional probability chart with dimension-fixing toggle
- Order book (bid/ask visualization)
- Activity feed and comment section (read-only)
- Related markets horizontal scroll
- Resolved market state: single-column, no trading panel

### Components

Copy from `product-plan/sections/market-detail/components/`:

- `MarketDetail` — Main two-column layout
- `MarketHeader` — Title, image, tags, creator, metrics
- `MarketStats` — Key market metrics
- `TradingPanel` — Buy/Sell toggle, Market/Limit tabs, outcome selection, trade form
- `PriceChart` — Line chart with timeframe and type toggles
- `OrderBookSection` — Bid/ask depth visualization
- `ActivityFeed` — Recent trades with infinite scroll
- `CommentSection` — Comment list with likes
- `RelatedMarkets` — Horizontal scrollable related market cards
- `ResolutionInfo` — Resolution criteria, source, date, and status

### Data Layer

Key types: `YesNoMarketDetail`, `CategoricalMarketDetail`, `TwoDimensionalMarketDetail`, `TradeSelection`, `TradePreview`, `OrderBook`, `Comment`

API endpoints:
- `GET /markets/:id`
- `GET /markets/:id/price-history?timeframe=`
- `GET /markets/:id/order-book`
- `GET /markets/:id/trades?page=`
- `GET /markets/:id/comments?page=`
- `GET /markets/:id/related`
- `POST /markets/:id/trade`
- `POST /markets/:id/like`
- `POST /markets/:id/comments/:commentId/like`
- `POST /markets/:id/trade-preview`

### Callbacks

| Callback | What to do |
|----------|------------|
| `onTimeframeChange` | Fetch price history for timeframe |
| `onChartTypeChange` | Toggle price vs. volume chart |
| `onTradeSelect` | Set selected outcome in state |
| `onTradeClear` | Clear selected outcome |
| `onAmountChange` | Update amount, call trade-preview API |
| `onTradeConfirm` | Execute trade, post comment if entered |
| `onTradeSideChange` | Toggle Buy/Sell |
| `onOrderTypeChange` | Toggle Market/Limit |
| `onLimitPriceChange` | Update limit price in state |
| `onLikeToggle` | Like API, update optimistically |
| `onShare` | Copy URL or open share sheet |
| `onCommentLike` | Comment like API, update optimistically |
| `onRelatedMarketClick` | Navigate to `/markets/:id` |
| `onCreatorClick` | Navigate to creator profile |
| `onChartCellChange` | Update selected 2D cell for chart |
| `onFixDimension` | Update conditional probability dimension |

### Files to Reference
- `product-plan/sections/market-detail/README.md`
- `product-plan/sections/market-detail/tests.md`
- `product-plan/sections/market-detail/components/`
- `product-plan/sections/market-detail/types.ts`
- `product-plan/sections/market-detail/sample-data.json`

### Done When

- [ ] Tests written and passing
- [ ] All three market types load and display correctly
- [ ] Trading panel Buy/Sell toggle and Market/Limit tabs functional
- [ ] Trade preview recalculates on amount change
- [ ] Price chart renders with all timeframes and types
- [ ] Comment bubbles overlay chart at correct positions
- [ ] 2D conditional probability toggle works
- [ ] Order book renders
- [ ] Activity feed paginates via infinite scroll
- [ ] Resolved market: no trading panel, single column, outcome prominent
- [ ] Mobile sticky Trade button opens full-screen modal

---

## Milestone 6: Settings

> **Prerequisites:** Milestone 1 complete

### Goal

Implement user preferences organized into 4 collapsible category groups: General, Cashu, Nostr, and Oracle.

### Overview

Four accordion-style sections for configuring currency, language, theme, connected Cashu mints and seed backup, Nostr signer and relays, and a placeholder Oracle section.

**Key Functionality:**
- 4 collapsible category groups
- Base currency (BTC / USD / JPY), language (English / Japanese), theme (Light / Dark / System)
- Mint management: add URL, remove, view connection status
- Seed phrase backup view (authentication gated)
- Nostr signer mode (None / NIP-07 / nsec), profile display, relay management

### Components

Copy from `product-plan/sections/settings/components/`:

- `Settings` — Main settings page with 4 collapsible categories

### Data Layer

Key types: `SettingsState`, `GeneralSettings`, `CashuSettings`, `NostrSettings`, `OracleSettings`, `MintConfig`, `NostrProfile`, `RelayConfig`

API endpoints:
- `GET /settings`
- `PUT /settings/general`
- `GET /settings/cashu/mints`, `POST /settings/cashu/mints`, `DELETE /settings/cashu/mints/:mintUrl`
- `GET /settings/cashu/seed-phrase`
- `PUT /settings/nostr/signer`, `GET /settings/nostr/profile`
- `GET /settings/nostr/relays`, `POST /settings/nostr/relays`, `DELETE /settings/nostr/relays/:relayUrl`

### Callbacks

| Callback | What to do |
|----------|------------|
| `onCategoryToggle` | Toggle collapsed/expanded state |
| `onBaseCurrencyChange` | Save and apply currency preference |
| `onLanguageChange` | Save and apply language |
| `onThemeChange` | Apply theme to document root and persist |
| `onAddMint` | Validate URL, call add API, refresh list |
| `onRemoveMint` | Confirm removal, call delete API |
| `onViewSeedPhrase` | Auth gate, then display phrase in modal |
| `onSignerModeChange` | Update local state; show/hide nsec input |
| `onNsecSubmit` | Validate nsec, save signer, fetch profile |
| `onAddRelay` | Validate WebSocket URL, add relay |
| `onRemoveRelay` | Remove relay |

### Files to Reference
- `product-plan/sections/settings/README.md`
- `product-plan/sections/settings/components/`
- `product-plan/sections/settings/types.ts`
- `product-plan/sections/settings/sample-data.json`

### Done When

- [ ] All four accordion groups toggle correctly
- [ ] General settings persist and apply immediately (theme applies in real time)
- [ ] Mint list loads; add and remove work end-to-end
- [ ] Seed phrase view gated behind authentication
- [ ] Nostr signer mode switches; nsec input appears only in nsec mode
- [ ] Relay list loads; add and remove work
- [ ] Oracle section shows "Coming soon" placeholder
- [ ] Empty states for no mints or relays
- [ ] Responsive on mobile

---

## Milestone 7: Wallet Setup

> **Prerequisites:** Milestone 1 complete

### Goal

Implement a first-time onboarding wizard rendered without the app shell for creating or recovering a Cashu wallet.

### Overview

5-step full-screen wizard (no nav shell) shown only when no wallet exists. Steps: Welcome → PWA confirmation → Create or Recover → Seed phrase display or input → Mint configuration.

**Key Functionality:**
- No app shell on `/setup` route
- Step 1: Welcome with Terms of Service link
- Step 2: PWA install confirmation (platform-specific)
- Step 3: Choose Create New or Recover Wallet
- Step 4a (Create): 3x4 seed phrase grid; checkbox required before Next
- Step 4b (Recover): 12 word input fields with BIP-39 validation; paste support
- Step 5: Mint URL configuration; finish and redirect to `/markets`

### Components

Copy from `product-plan/sections/wallet-setup/components/`:

- `WalletSetup` — Main wizard container
- `WelcomeLanding` — Welcome page with logo and ToS
- `PwaConfirmation` — PWA install instructions
- `ChoiceCards` — Create/Recover selection
- `SeedDisplay` — 3x4 seed word grid
- `SeedInput` — 12 input fields with paste support
- `MintSetup` — Mint URL configuration
- `StepIndicator` — Progress indicator (steps 3–5)

### Data Layer

Key types: `SetupStep`, `SetupChoice`, `MintConnectionTest`

API endpoints:
- `POST /wallet/create` — generate seed, store wallet, return words
- `POST /wallet/recover` — derive wallet from phrase
- `POST /wallet/mints/test` — test mint connectivity
- `POST /wallet/mints` — save mint configuration
- `POST /wallet/complete` — mark setup complete

### Callbacks

| Callback | What to do |
|----------|------------|
| `onWelcomeNext` | Advance to Step 2 |
| `onShowTerms` | Open ToS |
| `onCloseTerms` | Close ToS |
| `onPwaNext` | Advance to Step 3 |
| `onChoiceSelect` | Record choice, advance to Step 4 |
| `onSeedSavedToggle` | Toggle seed confirmation checkbox |
| `onSeedWordInput` | Update individual word |
| `onSeedPhrasePaste` | Parse pasted phrase into 12 fields |
| `onRecover` | Validate BIP-39, call recover API |
| `onAddMint` | Test and add mint |
| `onRemoveMint` | Remove mint from list |
| `onContinue` | Advance Step 4 to Step 5 |
| `onBack` | Go to previous step |
| `onFinishSetup` | Save mints, complete, redirect to `/markets` |

### Files to Reference
- `product-plan/sections/wallet-setup/README.md`
- `product-plan/sections/wallet-setup/components/`

### Done When

- [ ] Wizard renders without app shell on `/setup`
- [ ] Step navigation works through all 5 steps
- [ ] Step indicator visible on steps 3–5
- [ ] Create flow: seed displays in 3x4 grid; checkbox gates Next
- [ ] Recover flow: 12 inputs accept words; paste populates all fields
- [ ] BIP-39 validation highlights invalid words inline
- [ ] Mint URL test shows success/failure inline
- [ ] Finish saves wallet and mints, redirects to `/markets`
- [ ] Responsive on mobile

---

## Milestone 8: Market Creation

> **Prerequisites:** Milestone 1 complete

### Goal

Implement a 7-step market creation wizard rendered without the app shell, starting with an oracle configuration gate.

### Overview

7-step full-screen wizard (no nav shell) at `/creator/new`. Step 1 is a full-screen oracle check gate before the main flow. Steps 2–7 cover market type, basic info, outcomes, fees, cost preview, and final review with submission.

**Key Functionality:**
- No app shell on `/creator/new` route
- Step 1 (Oracle Check): full-screen gate — select existing announcement or become oracle
- Step 2 (Get Started): Yes/No or Categorical outcome type selection
- Step 3 (Basic Info): thumbnail, title, categories, closing date, answer URLs
- Step 4 (Outcomes): labels, thumbnails, probabilities with normalization
- Step 5 (Market Settings): sell/buy/win fee configuration
- Step 6 (Market Preview): estimated cost and worst-case loss (must confirm before Next)
- Step 7 (Review & Create): description editor, full summary, submit

### Components

Copy from `product-plan/sections/market-creation/components/`:

- `MarketCreationWizard` — Main wizard container
- `OracleCheck` — Full-screen oracle gate (Step 1)
- `GetStarted` — Market type selection (Step 2)
- `BasicInfo` — Market details form (Step 3)
- `OutcomesStep` — Outcome definition (Step 4)
- `MarketSettings` — Fee configuration (Step 5)
- `MarketPreviewStep` — Cost/risk preview (Step 6)
- `ReviewAndCreate` — Description editor and final review (Step 7)
- `StepIndicator` — 6-step progress indicator (steps 2–7)

### Data Layer

Key types: `WizardDraft`, `OracleAnnouncement`, `WizardStepOracleCheck` through `WizardStepReviewAndCreate`

API endpoints:
- `GET /oracle/announcements`
- `POST /oracle/announcements`
- `POST /markets/draft`
- `POST /markets/preview`
- `POST /markets`
- `POST /markets/thumbnail`

### Callbacks

| Callback | What to do |
|----------|------------|
| `onOracleChoiceSelect` | Record oracle path choice |
| `onAnnouncementSelect` | Select oracle announcement |
| `onExit` | Confirm exit with warning, navigate to `/creator` |
| `onNext` | Validate step, save draft, advance |
| `onBack` | Go to previous step, preserve state |
| `onOutcomeTypeSelect` | Record market type |
| `onTitleChange` | Update title in draft |
| `onCategoryTagsChange` | Update category tags |
| `onClosingDateChange` | Update closing date |
| `onAnswerUrlsChange` | Update answer source URLs |
| `onThumbnailUpload` | Upload image, store URL in draft |
| `onAddOutcome` | Add outcome entry |
| `onRemoveOutcome` | Remove outcome |
| `onOutcomeLabelChange` | Update outcome label |
| `onOutcomeProbabilityChange` | Update probability, normalize others |
| `onSellFeeChange` | Update sell fee % |
| `onBuyFeeChange` | Update buy fee % |
| `onWinFeeChange` | Update win fee % |
| `onCalculatePreview` | Call preview API, display result |
| `onConfirmPreview` | Mark preview confirmed, advance |
| `onDescriptionChange` | Update description text |
| `onCreateMarket` | Submit market, navigate to new market detail |

### Files to Reference
- `product-plan/sections/market-creation/README.md`
- `product-plan/sections/market-creation-and-management/tests.md` (wizard section)
- `product-plan/sections/market-creation/components/`

### Done When

- [ ] Wizard renders without app shell on `/creator/new`
- [ ] Oracle check gate requires selection before advancing
- [ ] Step indicator visible on steps 2–7
- [ ] Back/Next navigation preserves draft state
- [ ] Step 3: thumbnail upload, title, categories, date, URLs functional
- [ ] Step 4: Yes/No advances cleanly; Categorical allows adding/removing outcomes with probability normalization
- [ ] Step 5 fee inputs validate numeric range
- [ ] Step 6 preview calculated and confirmed before Next
- [ ] Step 7 description editor functional; full summary shown
- [ ] Submit creates market and navigates to new market detail page
- [ ] Exit shows confirmation dialog
- [ ] Validation errors inline on each step
- [ ] Responsive on mobile

---

## Final Verification Checklist

After completing all milestones:

- [ ] All routes are navigable
- [ ] App shell is responsive on all viewports
- [ ] `/setup` and `/creator/new` routes render without app shell
- [ ] Market Discovery shows all three market types
- [ ] Inline trading works on market cards
- [ ] Portfolio conditional entry (no-wallet CTA vs. dashboard) works
- [ ] Market Detail displays all sections for all market types
- [ ] Trading panel functional with Buy/Sell and Market/Limit toggles
- [ ] Charts render with data and all interactive features
- [ ] Comment bubbles visible on price chart
- [ ] Resolved markets hide trading panel and use single-column layout
- [ ] Settings accordion groups work; changes persist and apply immediately
- [ ] Wallet Setup wizard creates and recovers wallets correctly
- [ ] Market Creation wizard publishes markets with oracle binding
- [ ] ₿ symbol used consistently (not "sats" text)
- [ ] Dark theme with #0a0a0a background applied globally
