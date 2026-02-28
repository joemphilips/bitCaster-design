# Test Instructions: Market Detail

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the full market detail page: trading (buy/sell, market/limit), charts, order book, activity, comments, and resolved state.

## User Flow Tests

### Flow 1: Buy Market Order on Yes/No Market
**Success Path:**
- Setup: Open Yes/No market with currentOdds {yes: 67.5, no: 32.5}
- Steps: Select "Yes" outcome → enter 1000 sats → see predicted odds and payout → click "Buy YES for ₿..."
- Expected: onTradeConfirm called, trade preview shows correct values

**Failure Path:**
- Setup: Amount left at 0
- Expected: Confirm button disabled, no preview displayed

### Flow 2: Sell Position
**Success Path:**
- Setup: User has active Yes position with 150 shares
- Steps: Toggle to "Sell" → select Yes outcome → enter share amount → see proceeds → confirm
- Expected: onTradeSideChange('sell') and onTradeConfirm called with correct params

### Flow 3: Place Limit Order
**Success Path:**
- Steps: Select "Limit" tab → set limit price to 65% → enter 1000 sats → see preview → confirm
- Expected: onOrderTypeChange('limit'), onLimitPriceChange(65), onTradeConfirm called
- Preview shows: shares if filled, fees, total cost, disclaimer about order not guaranteed to fill

**Failure Path:**
- Limit price set to 0 or above 100 → validation error, Confirm disabled

### Flow 4: Switch Chart Timeframes
- Steps: Click "24H" → click "Volume" toggle
- Expected: onTimeframeChange('24h') called, then onChartTypeChange('volume') called, chart re-renders

### Flow 5: Like Market
- Steps: Click heart icon in metrics footer
- Expected: onLikeToggle called, like count increments by 1, icon fills

### Flow 6: View Resolved Market
- Setup: Market with resolution.status === 'resolved', outcome: 'Yes'
- Expected: RESOLVED badge visible, no trading panel shown, single-column layout, resolution info displayed prominently

### Flow 7: Comment via Trade
- Steps: Enter trade amount → type comment in textarea (max 280 chars) → confirm trade
- Expected: Comment text included in onTradeConfirm payload, comment appears in CommentSection after trade

## Empty State Tests
- No comments → "No comments yet. Place a trade to leave a comment!" message, no input field
- No recent trades in ActivityFeed → "No trades yet" message
- No related markets → Related Markets section hidden entirely

## Component Tests
- TradingPanel Yes button shows percentage, highlights on selection
- TradingPanel Sell toggle switches form to sell mode
- PriceChart renders line with Y-axis 0-100%
- PriceChart timeframe buttons highlight active selection
- ActivityFeed shows side color-coded (yes=green, no=red)
- CommentSection has no direct input field (trade-gated)
- MarketHeader like button toggles filled/outline state

## Edge Cases
- Very long market titles wrap gracefully in header
- Comment character limit (280): input blocks further typing, character counter shown
- Quick amount buttons (100, 500, 1000, 5000) correctly set input value
- Order book with no liquidity displays empty state, not an error

## Accessibility
- Trading panel outcome buttons keyboard navigable with clear focus state
- Buy/Sell toggle accessible via keyboard
- Chart timeframe buttons have aria-pressed reflecting active state
- Modal trading panel on mobile closeable with Escape key
- Like button has aria-label reflecting current state ("Like market" / "Unlike market")

## Sample Test Data
```typescript
const mockOpenYesNoMarket = {
  id: "mkt-001",
  type: "yesno",
  title: "Will Bitcoin reach $100K by end of 2026?",
  currentOdds: { yes: 67.5, no: 32.5 },
  volume: 2847500,
  liquidity: 450000,
  traderCount: 1823,
  likeCount: 342,
  isLiked: false,
  closingDate: "2026-12-31T23:59:59Z",
  resolution: { status: "open", criteria: "CoinGecko BTC/USD closing price", source: "oracle" }
};

const mockResolvedMarket = {
  ...mockOpenYesNoMarket,
  id: "mkt-resolved",
  resolution: {
    status: "resolved",
    outcome: "Yes",
    resolvedAt: "2026-06-15T14:30:00Z",
    criteria: "CoinGecko BTC/USD closing price",
    source: "oracle"
  }
};

const mockTradePreview = {
  amount: 1000,
  predictedOdds: 68.2,
  priceImpact: 0.7,
  potentialPayout: 1481,
  creatorFee: 5,
  platformFee: 0,
  totalCost: 1000
};

const mockLimitOrderPreview = {
  amount: 1000,
  limitPrice: 65,
  sharesIfFilled: 1538,
  creatorFee: 5,
  platformFee: 0,
  totalCost: 1000,
  disclaimer: "Order will only execute if market reaches 65%"
};

const mockComments = [
  {
    id: "cmt-001",
    userId: "usr-a1b2",
    displayName: "SatoshiTrader",
    avatarUrl: null,
    content: "Strong fundamentals support this.",
    likeCount: 12,
    timestamp: "2026-02-20T10:15:00Z",
    tradeContext: { side: "yes", amountSats: 5000 }
  }
];

const mockEmptyComments: typeof mockComments = [];

const mockActivityItems = [
  {
    id: "act-001",
    userId: "usr-a1b2",
    displayName: "SatoshiTrader",
    side: "yes",
    amountSats: 5000,
    pricePercent: 67.3,
    timestamp: "2026-02-20T10:15:00Z"
  }
];
```
