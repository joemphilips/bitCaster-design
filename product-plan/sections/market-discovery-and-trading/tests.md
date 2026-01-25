# Test Instructions: Market Discovery & Trading

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Test the core marketplace functionality: tag navigation, filtering, quick trading on market cards, and navigation to market details.

---

## User Flow Tests

### Flow 1: Browse Markets by Tag

**Scenario:** User filters markets by selecting a tag

#### Success Path

**Setup:**
- Page loaded with markets
- "Trending" tag is selected by default
- Multiple tags available (meta tags: Trending, Popular, New; category tags: Sports, Politics, etc.)

**Steps:**
1. User sees tag bar with "Trending" highlighted
2. User clicks "Sports" tag
3. Markets update to show Sports markets only

**Expected Results:**
- [ ] "Sports" tag becomes highlighted (blue background)
- [ ] "Trending" tag becomes unhighlighted
- [ ] Market grid updates to show only Sports-tagged markets
- [ ] If no Sports markets exist, empty state shows "No markets found"

#### Single-Select Behavior

**Scenario:** Only one tag can be selected at a time

**Steps:**
1. User clicks "Trending" tag
2. User clicks "Politics" tag
3. User clicks "Sports" tag

**Expected Results:**
- [ ] Only one tag is highlighted at any time
- [ ] Each click deselects previous tag and selects new one

---

### Flow 2: Execute Quick Trade (Yes/No Market)

**Scenario:** User buys YES shares on a Yes/No market

#### Success Path

**Setup:**
- Yes/No market card displayed with title "Will Bitcoin reach $100K?"
- Current odds displayed: "65.2%"
- "Buy YES" and "Buy NO" buttons visible

**Steps:**
1. User clicks "Buy YES" button
2. Trade interface appears on card:
   - Shows predicted odds after purchase
   - Shows "YES" label indicating side
   - Amount picker with presets: 500, 1K, 5K, 10K
   - Default amount: 1000
3. User clicks "5K" preset button
4. Amount updates to 5000
5. User clicks "BUY 5,000 SATS" button

**Expected Results:**
- [ ] Card transforms to show trade interface (not a modal)
- [ ] "X" close button appears in top right
- [ ] Predicted odds shown (slightly higher than current for YES buy)
- [ ] Amount input shows "5000"
- [ ] `onBuyYes` callback called with `(marketId, 5000)`
- [ ] Card returns to normal state after trade
- [ ] User balance decreases by trade amount

#### Cancel Trade

**Steps:**
1. User clicks "Buy YES"
2. Trade interface opens
3. User clicks "X" close button

**Expected Results:**
- [ ] Trade interface closes
- [ ] Card returns to normal state
- [ ] No trade executed

#### Failure Path: Insufficient Balance

**Setup:**
- User balance: 1000 sats
- User tries to buy 5000 sats

**Expected Results:**
- [ ] Error message shown (implementation-specific)
- [ ] Trade not executed
- [ ] User informed of insufficient balance

---

### Flow 3: Execute Quick Trade (Categorical Market)

**Scenario:** User buys YES on a specific outcome in a categorical market

#### Success Path

**Setup:**
- Categorical market: "Who will win the NBA Championship?"
- Outcomes: "Boston Celtics" (32.5%), "Denver Nuggets" (28.1%), "Lakers" (15.2%), etc.

**Steps:**
1. User scrolls through outcomes on the card
2. User clicks "Yes" button on "Boston Celtics" row
3. Trade interface appears showing:
   - "YES on 'Boston Celtics'" label
   - Predicted odds
   - Amount picker
4. User selects amount and clicks buy button

**Expected Results:**
- [ ] Trade interface shows correct outcome label
- [ ] `onBuyOutcomeYes` callback called with `(marketId, outcomeId, amount)`
- [ ] Card returns to normal after trade

#### Scroll Through Outcomes

**Setup:**
- Market has more than 3 outcomes (requires scrolling)

**Steps:**
1. User hovers over outcome list
2. Scroll indicators appear if content overflows
3. User scrolls to see more outcomes

**Expected Results:**
- [ ] Scroll up/down buttons appear on hover when needed
- [ ] All outcomes are accessible via scrolling
- [ ] Smooth scroll behavior

---

### Flow 4: Apply Filters

**Scenario:** User applies multiple filters to narrow results

#### Success Path

**Setup:**
- Markets of various types, volumes, and closing dates available

**Steps:**
1. User clicks "Yes/No" in market type filter
2. User selects "100K+" in volume dropdown
3. User selects "Within 30 days" in closing date dropdown

**Expected Results:**
- [ ] "Yes/No" button highlighted in market type filter
- [ ] Volume dropdown shows "Vol: 100K+"
- [ ] Closing date dropdown shows "Within 30 days"
- [ ] Active filter count shows "3 active"
- [ ] Markets update to match all filter criteria
- [ ] "Clear all" link is visible

#### Clear All Filters

**Steps:**
1. With filters applied, user clicks "Clear all"

**Expected Results:**
- [ ] All filters reset to default (any/any/any)
- [ ] Active filter count disappears
- [ ] Full market list restored

---

## Empty State Tests

### No Markets Found

**Scenario:** Search or filters return no results

**Setup:**
- Apply filters that match no markets

**Expected Results:**
- [ ] Shows search emoji icon (🔍)
- [ ] Shows heading "No markets found"
- [ ] Shows text "Try adjusting your filters or search query"
- [ ] No blank screen or broken layout

### Platform Empty (No Markets at All)

**Scenario:** New platform with no markets created yet

**Setup:**
- Empty markets array passed to component

**Expected Results:**
- [ ] Appropriate empty state UI (not blank screen)
- [ ] Guidance to create first market or check back later

---

## Component Interaction Tests

### MarketCard Renders Correctly

**Yes/No Market:**
- [ ] Displays market image
- [ ] Displays market title (line-clamp-2)
- [ ] Displays odds percentage badge (e.g., "65.2%")
- [ ] Shows "Buy YES" and "Buy NO" buttons
- [ ] Footer shows: Volume (BTC format), Liquidity, Trader count, Like count

**Categorical Market:**
- [ ] Displays market image and title
- [ ] Shows scrollable outcome list
- [ ] Each outcome row shows: label, odds %, Yes/No buttons

### TagBar Interaction

- [ ] Meta tags (Trending, Popular, New) styled with amber color
- [ ] Category tags styled with slate/blue color
- [ ] Selected tag has scale effect and different background
- [ ] Horizontal scroll works on mobile
- [ ] Tags show market count badge

### Card Click vs Button Click

- [ ] Clicking card background calls `onViewMarket`
- [ ] Clicking buy buttons does NOT call `onViewMarket`
- [ ] Clicking input fields does NOT call `onViewMarket`

---

## Edge Cases

- [ ] Market with very long title truncates with ellipsis
- [ ] Works with 1 market, 10 markets, 100+ markets
- [ ] Infinite scroll loads more markets at page bottom
- [ ] Handles markets with no image gracefully
- [ ] Like button toggles state and calls `onLike`
- [ ] Two-dimensional markets show dimension estimates (no Yes/No buttons)

---

## Accessibility Checks

- [ ] All buttons are keyboard accessible
- [ ] Tag selection works with keyboard
- [ ] Filter controls have proper labels
- [ ] Focus management after trade completion
- [ ] Screen reader announces filter changes

---

## Sample Test Data

```typescript
const mockMetaTags = [
  { id: 'trending', label: '🔥 Trending', description: 'Hot markets' },
  { id: 'popular', label: '👑 Popular', description: 'Most traded' },
  { id: 'new', label: '✨ New', description: 'Recently created' },
]

const mockCategoryTags = [
  { id: 'sports', label: 'Sports', marketCount: 45 },
  { id: 'politics', label: 'Politics', marketCount: 23 },
  { id: 'crypto', label: 'Crypto', marketCount: 67 },
]

const mockYesNoMarket = {
  id: 'market-1',
  type: 'yesno',
  title: 'Will Bitcoin reach $100K by end of 2025?',
  imageUrl: '/images/btc.jpg',
  currentOdds: { yes: 65.2, no: 34.8 },
  volume: 25000000, // 25M sats
  liquidity: 5000000,
  traderCount: 1234,
  closingDate: '2025-12-31T23:59:59Z',
  likeCount: 89,
  isLiked: false,
}

const mockCategoricalMarket = {
  id: 'market-2',
  type: 'categorical',
  title: 'Who will win the 2025 NBA Championship?',
  imageUrl: '/images/nba.jpg',
  outcomes: [
    { id: 'celtics', label: 'Boston Celtics', odds: 32.5 },
    { id: 'nuggets', label: 'Denver Nuggets', odds: 28.1 },
    { id: 'lakers', label: 'Los Angeles Lakers', odds: 15.2 },
    { id: 'warriors', label: 'Golden State Warriors', odds: 12.8 },
    { id: 'other', label: 'Other', odds: 11.4 },
  ],
  volume: 50000000,
  liquidity: 10000000,
  traderCount: 2567,
  closingDate: '2025-06-30T23:59:59Z',
  likeCount: 156,
  isLiked: true,
}

// Empty states
const mockEmptyMarkets = []

const mockNoMatchFilters = {
  markets: [],
  hasFiltersApplied: true,
}
```

---

## Notes for Test Implementation

- Mock the callback functions to verify they're called with correct arguments
- Test card transformation animation (trade interface appearing)
- Verify amount presets work correctly (500, 1000, 5000, 10000)
- Test responsive behavior (tag bar scroll on mobile, bottom padding for nav)
- **Always test empty states** — Pass empty arrays, apply impossible filters
- Test transitions: first market appears after empty, last market deleted
