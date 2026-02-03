# bitCaster — One-Shot Implementation Instructions

This document contains all 5 milestones for implementing bitCaster. Complete them in order.

---

## Milestone 1: Foundation

### Objective
Set up the project foundation including design tokens, routing, data model, and application shell.

### Tasks

#### 1.1 Design System Setup
- Create CSS custom properties from `design-system/tokens.css`
- Configure Tailwind with blue/amber/slate color palette (see `design-system/tailwind-colors.md`)
- Set up Google Fonts for Inter and JetBrains Mono (see `design-system/fonts.md`)
- Implement light/dark mode toggle support

#### 1.2 Data Model
- Review domain events in `event-model/events.ts`
- Define TypeScript interfaces for core entities:
  - User (id, name, avatar, balance)
  - Market (id, title, type, outcomes, odds, status, volume, etc.)
  - Position (market, shares, avgPrice, currentValue, pnl)
  - Order (type, amount, timestamp, status)
- Set up mock data store or API client

#### 1.3 Routing
- Configure routes:
  - `/` → Market Discovery & Trading (home)
  - `/create` → Market Creation & Management
  - `/mypage` → MyPage (personal dashboard)
  - `/market/:id` → Market Detail

#### 1.4 Application Shell
- Implement shell components from `shell/components/`:
  - `AppShell.tsx` — Main layout wrapper
  - `MainNav.tsx` — Top navigation bar
  - `UserMenu.tsx` — User dropdown menu
- Desktop: Horizontal top nav with logo, Markets link, search, user menu
- Mobile: Simplified top header + bottom navigation bar (4 items)
- Include brand motto background image

#### Deliverables
- [ ] Design tokens applied globally
- [ ] Tailwind configured with custom colors
- [ ] Font imports working
- [ ] Routes defined and navigable
- [ ] Shell renders on all pages
- [ ] Responsive behavior (desktop/tablet/mobile)

---

## Milestone 2: Market Discovery & Trading

### Objective
Build the core marketplace where users browse and trade prediction markets.

### Reference Files
- `sections/market-discovery-and-trading/README.md`
- `sections/market-discovery-and-trading/types.ts`
- `sections/market-discovery-and-trading/sample-data.json`
- `sections/market-discovery-and-trading/components/`

### Tasks

#### 2.1 Tag Navigation
- Horizontal scrollable tag bar
- Meta tags: Trending (default), Popular, New
- Category tags: Sports, Politics, Crypto, Entertainment, Science, etc.
- Single-select behavior (only one tag active)

#### 2.2 Filter Controls
- Hidden by default, toggle with filter icon
- Market Type dropdown (Yes/No, Categorical, 2D)
- Volume range filter
- Closing date filter

#### 2.3 Market Cards
- Fixed card height (280px) for all market types
- Components: image, title, odds display, action buttons, metrics footer
- Metrics footer: volume (₿ prefix), liquidity, traders, like button
- Yes/No cards: Display chance percentage, Buy Yes/Buy No buttons
- Categorical cards: Vertical scrollable outcome list, each with Yes/No
- 2D cards: Grid layout showing composite odds

#### 2.4 Inline Trading
- Card transforms to trading overlay on Buy click
- Shows: predicted odds, amount input, quick amount buttons
- Cancel (×) returns to normal view
- Card size must NOT change during transformation

#### 2.5 Secondary Markets (2D)
- "and..." link on markets with secondary markets
- Expands to show secondary market list
- Each secondary market clickable → navigates to detail

#### 2.6 Infinite Scroll
- Load more markets on scroll
- Loading indicator

#### Deliverables
- [ ] Tag bar with single-select behavior
- [ ] Collapsible filter row
- [ ] Market cards for all three types
- [ ] Inline trading transformation
- [ ] 2D market grid display
- [ ] Secondary markets expansion
- [ ] Infinite scroll pagination

---

## Milestone 3: Market Creation & Management

### Objective
Build the creator dashboard with analytics and market creation wizard.

### Reference Files
- `sections/market-creation-and-management/README.md`
- `sections/market-creation-and-management/types.ts`
- `sections/market-creation-and-management/sample-data.json`
- `sections/market-creation-and-management/components/`

### Tasks

#### 3.1 Three-Tab Layout
- Overview tab (default): Stats and market list
- Analytics tab: Volume charts
- Add Market: Styled as CTA button, opens wizard

#### 3.2 Overview Dashboard
- Stat cards: Active markets, Resolved markets, Total volume, Creator fees
- Paginated market list with: thumbnail, title, status, volume, end date, fees, "View Details"

#### 3.3 Analytics
- Volume chart (line or bar)
- Toggle: Aggregate vs Per-market
- Time scale selector: Daily, Weekly, Monthly, Yearly

#### 3.4 Market Creation Wizard (5 Steps)
1. **Basic Info**: Thumbnail upload, title, category tags, end date, answer URLs
2. **Market Outcomes**: Type selection (Yes/No, Numeric, Categorical), outcome configuration
3. **Market Parameters**: Liquidity deposit, fee configuration (sell/buy/win)
4. **Review**: Summary with "Initial Cost / Worst Case Loss" calculation
5. **Final Review**: Rich text description editor with "Generate with AI" button

#### 3.5 Wizard Behavior
- Step indicator showing progress
- Back/Forward navigation
- State preservation across steps
- Validation with error summary banner
- On success: Navigate to new market detail page

#### Deliverables
- [ ] Three-tab layout with CTA-style Add Market button
- [ ] Overview stats and paginated market list
- [ ] Analytics chart with toggles
- [ ] 5-step wizard with all fields
- [ ] Validation and error handling
- [ ] Success navigation

---

## Milestone 4: MyPage

### Objective
Build the personal dashboard with positions, orders, and created markets.

### Reference Files
- `sections/mypage/README.md`
- `sections/mypage/types.ts`
- `sections/mypage/sample-data.json`
- `sections/mypage/components/`

### Tasks

#### 4.1 Profile Header
- User avatar (clickable to upload new image)
- Display name
- P/L summary cards with time scale toggle (24h, 7d, 30d, All-time)

#### 4.2 Positions Section
- Expandable section
- Sub-tabs: Active, Closed
- Each position shows: market title, shares, current value, P/L, Sell button (active only)

#### 4.3 Order History Section
- Expandable section
- Shows deposits/withdrawals
- Each row: date, type, amount, TX ID, status, Lightning invoice (if applicable)

#### 4.4 My Markets Section
- Expandable section
- List of markets the user created
- Links to market detail or creator dashboard

#### Deliverables
- [ ] Profile header with P/L cards
- [ ] Avatar upload functionality
- [ ] Positions with Active/Closed tabs
- [ ] Sell button on active positions
- [ ] Order history with full details
- [ ] My Markets list

---

## Milestone 5: Market Detail

### Objective
Build the comprehensive market detail page with trading, charts, and activity.

### Reference Files
- `sections/market-detail/README.md`
- `sections/market-detail/types.ts`
- `sections/market-detail/sample-data.json`
- `sections/market-detail/components/`

### Tasks

#### 5.1 Market Header
- Large title/question
- Market image as header background (if available)
- Category tags below title
- Close date with countdown (if closing soon)
- Share button
- Creator info (avatar, name, reputation, markets created)
- Metrics footer: Volume, Liquidity, Traders, Like button with count

#### 5.2 Trading Panel (Right Sidebar on Desktop)
- **Yes/No markets**: Two large buttons showing percentages
- **Categorical markets**: Vertical outcome list with odds
- **2D markets**: Grid layout with two-tone gradient cells
  - Yes/Yes: solid emerald
  - Yes/No: diagonal gradient emerald → rose
  - No/Yes: diagonal gradient rose → emerald
  - No/No: solid red
- Amount input with quick buttons (100, 500, 1000, 5000 sats)
- Trade preview: predicted odds, price impact, potential payout, fees
- Optional comment textarea (280 char limit, placeholder "Share your reasoning...")
- Confirm Trade button
- Cancel button

#### 5.3 Price Chart
- Current percentage as section header (not "Price Chart" text)
  - Yes/No: shows yes odds (e.g., "67.5%")
  - Categorical: shows leading outcome (e.g., "Chiefs 28.5%")
  - 2D: shows leading cell odds
  - Resolved: shows "Resolved: [outcome]"
- Line chart with price history
- Timeframe selector: 1H | 24H | 7D | 30D | ALL
- Toggle: Price / Volume
- **Comment speech bubbles** on chart (price mode):
  - Positioned by timestamp
  - Size 24-40px based on like count
  - Opacity 0.4-1.0 based on like count
  - Tooltip on hover
- Categorical: Multi-line chart with legend
- 2D: Cell selector dropdown
- **2D Conditional Probability Toggle** (Yes/No + Yes/No markets):
  - Buttons: [All] [Dim1=Yes] [Dim1=No] [Dim2=Yes] [Dim2=No]
  - Fixing dimension shows conditional probability lines
  - "Conditional on [label]" subtitle

#### 5.4 Resolution Info
- Resolution criteria
- Source (oracle, manual, community, smart_contract)
- Resolution date
- Status (Open, Pending Resolution, Resolved, Disputed)
- For resolved: Final outcome prominently displayed

#### 5.5 Recent Trades
- Trade list (no tabs)
- Each trade: user (anonymized), side, amount, price, timestamp
- Infinite scroll with "Load more"

#### 5.6 Related Markets
- Horizontal scrollable list
- Mini market cards with quick stats
- Based on same category tags

#### 5.7 Comments Section (Bottom)
- Read-only display (comments posted via trade flow only)
- User avatar, name, timestamp, content
- Like button per comment
- Infinite scroll
- Empty state: "No comments yet. Place a trade to leave a comment!"

#### 5.8 Resolved Market View
- RESOLVED badge with CheckCircle icon at top of header
- "Resolved on [date]" replaces countdown
- **No trading panel** (desktop sidebar and mobile sticky bar hidden)
- **Single-column layout** (no sidebar grid)
- Resolution Info moved above chart
- Comments section read-only

#### 5.9 Responsive Behavior
- Desktop (≥1024px): Two-column (content + sticky trading sidebar)
- Tablet (768-1023px): Single column, trading panel at top (collapsible)
- Mobile (<768px): Single column, sticky bottom "Trade" button → opens modal

#### Deliverables
- [ ] Market header with all elements
- [ ] Trading panel for all market types
- [ ] 2D grid with two-tone gradients
- [ ] Price chart with timeframe/type toggles
- [ ] Comment bubbles on chart
- [ ] 2D conditional probability toggle
- [ ] Resolution info section
- [ ] Recent trades with infinite scroll
- [ ] Related markets carousel
- [ ] Comments section
- [ ] Resolved market view (no trading)
- [ ] Responsive layout (desktop/tablet/mobile)

---

## Verification Checklist

After completing all milestones:

- [ ] All routes navigable
- [ ] Shell responsive on all viewports
- [ ] Market Discovery shows all market types
- [ ] Inline trading works on cards
- [ ] Market Creation wizard completes successfully
- [ ] MyPage shows positions and orders
- [ ] Market Detail displays all sections
- [ ] Trading panel functional for all market types
- [ ] Charts render with data
- [ ] Comment bubbles visible on price chart
- [ ] Resolved markets hide trading panel
- [ ] Light/dark mode working
- [ ] ₿ symbol used consistently (not "sats")
