# Market Detail — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — Place Market Buy Order
1. Render `MarketDetail` with a Yes/No market, `tradeSide: 'buy'`, `orderType: 'market'`.
2. Verify "Buy" tab is active with emerald accent. Verify "Market" sub-tab is active.
3. Click "Yes" outcome button → `onTradeSelect` fires with `{ side: 'yes', tradeSide: 'buy', orderType: 'market' }`.
4. Enter amount 1000 → `onAmountChange(1000)` fires.
5. Verify trade preview shows predicted odds, potential payout, creator fee, and total cost.
6. Verify confirm button text is "Buy YES for B1,000".
7. Click confirm → `onTradeConfirm` fires.

### Flow 2 — Place Limit Order
1. Switch to "Limit" sub-tab → `onOrderTypeChange('limit')` fires.
2. Set limit price to 65 → `onLimitPriceChange(65)` fires.
3. Enter amount 1000 → `onAmountChange(1000)` fires.
4. Verify limit order preview shows: limit price, shares if filled, fees, total cost.
5. Verify confirm button text is "Place Limit Order for B1,000".
6. Click confirm → `onTradeConfirm` fires.

### Flow 3 — Sell Mode
1. Click "Sell" tab → `onTradeSideChange('sell')` fires.
2. Verify "Sell" tab has red accent styling.
3. Verify outcome buttons show "Sell Yes" / "Sell No" labels.
4. Verify amount label reads "Shares to sell".
5. Select "Sell Yes", enter amount, verify preview shows proceeds after fees.
6. Verify confirm button text is "Sell YES for BX".

### Flow 4 — Switch Chart Timeframe
1. Verify default chart timeframe is selected.
2. Click "7D" timeframe button → `onTimeframeChange('7d')` fires.
3. Verify the chart updates to show 7-day data (new `chartTimeframe` prop).

### Flow 5 — View Resolved Market
1. Render with market `resolution.status: 'resolved'` and `resolution.finalOutcome: 'Yes'`.
2. Verify "RESOLVED" badge is visible at the top with CheckCircle icon.
3. Verify "Resolved on [date]" replaces countdown timer.
4. Verify trading panel is not rendered (neither desktop sidebar nor mobile bottom bar).
5. Verify single-column layout (no right sidebar).
6. Verify Resolution Info section appears above the chart.

### Flow 6 — Numeric Market
1. Render with a numeric market (`type: 'numeric'`).
2. Verify implied price displays with unit (e.g., "$112,500") instead of percentage.
3. Verify trading panel shows "Buy Higher" and "Buy Lower" buttons.
4. Verify range bar visualization shows current price position within `[loBound, hiBound]`.

### Failure — Trade with 0 Amount
1. Select an outcome. Leave `tradeAmount` at 0.
2. Verify the confirm button is disabled (greyed out, not clickable).

---

## Empty State Tests

- **No trades**: When `recentTrades` is empty, display "No trades yet" message.
- **No comments**: When `comments` is empty, display "No comments yet. Place a trade to leave a comment!" message.
- **No related markets**: When `relatedMarkets` is empty, the related markets section is hidden or shows "No related markets".

---

## Component Interaction Tests

- **Comment posting via trade flow**: The comment textarea appears in the trading panel between trade preview and confirm button. Placeholder reads "Share your reasoning..." with a 280-character counter. Posting happens on trade confirm, not standalone.
- **No standalone comment input**: The Comments Section at the bottom has no text input — it is read-only.
- **Chart type toggle**: Clicking "Volume" → `onChartTypeChange('volume')` fires. Clicking "Price" → `onChartTypeChange('price')` fires.
- **Comment speech bubbles**: In price chart (price mode), comment bubbles are overlaid at their timestamp positions. Bubbles scale in size (24-40px) and opacity (0.4-1.0) based on like count. Tooltip shows username, content preview, like count on hover.
- **Like toggle**: Clicking the like button in the header metrics footer triggers `onLikeToggle`.
- **Share button**: Clicking share triggers `onShare`.
- **Creator click**: Clicking creator name/avatar triggers `onCreatorClick(creatorId)`.
- **Related market click**: Clicking a related market card triggers `onRelatedMarketClick(marketId)`.
- **Load more trades**: Scrolling to the end of recent trades triggers `onLoadMoreTrades`.
- **Load more comments**: Scrolling to the end of comments triggers `onLoadMoreComments`.

---

## Edge Cases

- **Categorical market outcome selection**: Each outcome in a categorical market has its own Buy Yes/No buttons. Selecting one sets `tradeSelection.outcomeId`.
- **Quick amount buttons**: Clicking 100, 500, 1000, or 5000 sets the trade amount accordingly.
- **Limit price range**: Limit price input should accept values 1-99 only.
- **Cancel trade selection**: Clicking cancel → `onTradeClear` fires, removing the trade selection.
- **User holdings for sell**: When `userHoldings` is provided, the sell form can show percentage-based amounts.

---

## Accessibility Checks

- Buy/Sell toggle is keyboard-navigable with clear `aria-selected` states.
- Market/Limit sub-tabs use `role="tablist"` and `role="tab"` with `aria-selected`.
- Trade amount input has associated label "Amount (sats)" or equivalent.
- Confirm button accessible name includes the full action (e.g., "Buy YES for 1000 sats").
- Chart timeframe buttons are keyboard-accessible.
- Comment speech bubbles on chart have `aria-label` with comment content summary.
- RESOLVED badge has `role="status"` for screen readers.

---

## Sample Test Data

```typescript
import type {
  MarketDetailProps,
  YesNoMarketDetail,
  TradePreview,
  LimitOrderPreview,
} from './types'

const sampleYesNoMarket: YesNoMarketDetail = {
  id: 'mkt-1',
  type: 'yesno',
  title: 'Will Bitcoin reach $200k by end of 2026?',
  imageUrl: '/images/btc.png',
  categoryTags: [{ id: 'crypto', label: 'Crypto', marketCount: 15 }],
  volume: 50000,
  liquidity: 25000,
  traderCount: 42,
  closingDate: '2026-12-31T23:59:59Z',
  createdDate: '2026-01-15T10:00:00Z',
  activeSince: '2026-01-15T10:00:00Z',
  likeCount: 18,
  isLiked: false,
  baseUnit: 'sats',
  currentOdds: { yes: 67.5, no: 32.5 },
  creator: {
    id: 'creator-1',
    name: 'SatoshiFan',
    avatarUrl: '/avatars/satoshi.png',
    reputationScore: 92,
    totalMarketsCreated: 15,
    feePercent: 0.5,
  },
  resolution: {
    criteria: 'Based on CoinGecko BTC/USD price at 2026-12-31T23:59:59Z',
    source: 'oracle',
    sourceDescription: 'DLC Oracle via Nostr kind 88',
    resolutionDate: '2026-12-31T23:59:59Z',
    status: 'open',
  },
  priceHistory: {
    data: [
      { timestamp: '2026-01-15T10:00:00Z', price: 50, volume: 1000 },
      { timestamp: '2026-02-01T10:00:00Z', price: 60, volume: 2000 },
      { timestamp: '2026-03-01T10:00:00Z', price: 67.5, volume: 1500 },
    ],
    timeframe: '30d',
  },
  orderBook: {
    bids: [
      { price: 66, amount: 5000, total: 5000 },
      { price: 65, amount: 3000, total: 8000 },
    ],
    asks: [
      { price: 68, amount: 4000, total: 4000 },
      { price: 70, amount: 6000, total: 10000 },
    ],
    spread: 2,
  },
  recentTrades: [
    {
      id: 'trade-1',
      userId: 'user-1',
      userDisplayName: 'Anon_42',
      side: 'yes',
      amount: 1000,
      price: 67,
      timestamp: '2026-03-01T09:50:00Z',
    },
  ],
  comments: [
    {
      id: 'comment-1',
      userId: 'user-2',
      userDisplayName: 'BTCBull',
      content: 'Strong fundamentals, buying more YES',
      timestamp: '2026-03-01T09:45:00Z',
      likeCount: 5,
      isLiked: false,
    },
  ],
  relatedMarkets: [
    {
      id: 'mkt-rel-1',
      title: 'Will ETH reach $10k?',
      currentOdds: { yes: 35, no: 65 },
      volume: 20000,
      closingDate: '2026-12-31T23:59:59Z',
    },
  ],
}

const sampleTradePreview: TradePreview = {
  amount: 1000,
  predictedOdds: 68.2,
  priceImpact: 0.7,
  potentialPayout: 1481,
  creatorFee: 5,
  platformFee: 0,
  totalCost: 1005,
}

const sampleLimitOrderPreview: LimitOrderPreview = {
  limitPrice: 65,
  amount: 1000,
  sharesIfFilled: 153,
  creatorFee: 5,
  platformFee: 0,
  totalCost: 1005,
}

const sampleProps: MarketDetailProps = {
  market: sampleYesNoMarket,
  chartTimeframe: '30d',
  chartType: 'price',
  tradeSelection: null,
  tradeAmount: 0,
  tradePreview: null,
  tradeSide: 'buy',
  orderType: 'market',
}
```
