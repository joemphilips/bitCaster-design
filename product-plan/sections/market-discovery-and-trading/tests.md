# Test Instructions: Market Discovery & Trading

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the core marketplace: browsing markets, tag filtering, search, and quick trading from market cards.

## User Flow Tests

### Flow 1: Browse Markets by Tag
**Success Path:**
- Setup: Multiple markets with different meta/category tags
- Steps: Navigate to Markets page → see Trending tag pre-selected → click "Sports" tag
- Expected: Only sports markets shown, Trending tag deselected, Sports tag highlighted

### Flow 2: Quick Trade on Yes/No Market
**Success Path:**
- Setup: Yes/No market with currentOdds {yes: 67.5, no: 32.5}
- Steps: Click "Buy Yes" on card → card transforms to trade view → enter 1000 sats → click "BUY"
- Expected: onBuyYes called with (marketId, 1000), card returns to normal state

**Failure Path:**
- Setup: Trade amount is 0 or negative
- Expected: BUY button disabled

### Flow 3: Quick Trade on Categorical Market
**Success Path:**
- Steps: Scroll through outcomes, click "Yes" on "LA Lakers" → enter amount → confirm
- Expected: onBuyOutcomeYes called with (marketId, "lakers", amount)

### Flow 4: Navigate to Market Detail
- Steps: Click anywhere on market card except Yes/No buttons
- Expected: onViewMarket called with marketId

### Flow 5: Apply Filters
- Steps: Click filter icon → select "Yes/No" market type → set volume range
- Expected: Market list filters in real-time

### Flow 6: 2D Market Interaction
- Steps: View 2D Yes/No market → click Yes/Yes cell → confirm trade
- Expected: onBuy2DYesNoCombo called with correct parameters

## Empty State Tests
- No markets match current filters → "No markets found" message with "Clear filters" link
- No markets at all → helpful empty state with guidance

## Component Tests
- MarketCard renders title, odds, volume, like count correctly
- TagBar shows only one tag selected at a time
- FilterControls toggle visibility with filter icon
- Trading overlay covers entire card at same card size

## Edge Cases
- Very long market titles truncate properly
- Markets with 0 volume display correctly
- Infinite scroll triggers onLoadMore at bottom
- 2D market "and..." link expands card height correctly

## Accessibility
- All interactive elements keyboard accessible
- Trading overlay dismissible with Escape
- Screen reader announces tag selection changes

## Sample Test Data
```typescript
const mockYesNoMarket = {
  id: "mkt-001",
  type: "yesno",
  title: "Will Bitcoin reach $100K?",
  currentOdds: { yes: 67.5, no: 32.5 },
  volume: 2847500,
  liquidity: 450000,
  traderCount: 1823,
  likeCount: 342,
  isLiked: false,
  closingDate: "2026-06-30T23:59:59Z",
  baseMarket: "sats"
};

const mockCategoricalMarket = {
  id: "mkt-002",
  type: "categorical",
  title: "Which team will win the NBA Finals?",
  outcomes: [
    { id: "lakers", label: "LA Lakers", odds: 28.5 },
    { id: "celtics", label: "Boston Celtics", odds: 34.1 },
    { id: "warriors", label: "Golden State Warriors", odds: 19.7 },
    { id: "other", label: "Other", odds: 17.7 }
  ],
  volume: 1203400,
  liquidity: 200000,
  traderCount: 641,
  likeCount: 89,
  isLiked: true,
  closingDate: "2026-06-15T23:59:59Z",
  baseMarket: "sats"
};

const mock2DMarket = {
  id: "mkt-003",
  type: "2d-yesno",
  title: "Bitcoin > $100K AND Ethereum > $5K by end of 2026?",
  axes: {
    x: { label: "BTC > $100K", yes: 67.5, no: 32.5 },
    y: { label: "ETH > $5K", yes: 54.0, no: 46.0 }
  },
  cells: {
    "yes-yes": { odds: 36.5 },
    "yes-no": { odds: 31.0 },
    "no-yes": { odds: 17.5 },
    "no-no": { odds: 15.0 }
  },
  volume: 589200,
  likeCount: 57,
  isLiked: false,
  closingDate: "2026-12-31T23:59:59Z",
  baseMarket: "sats"
};

const mockTags = [
  { id: "trending", label: "Trending", isSelected: true },
  { id: "sports", label: "Sports", isSelected: false },
  { id: "crypto", label: "Crypto", isSelected: false },
  { id: "politics", label: "Politics", isSelected: false },
  { id: "entertainment", label: "Entertainment", isSelected: false }
];

const mockEmptyMarkets: typeof mockYesNoMarket[] = [];
```
