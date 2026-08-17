# Market Discovery & Trading — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — Browse Trending Markets
1. Render `MarketDiscovery` with `selectedTag` set to the "trending" meta tag ID.
2. Verify the "Trending" tag is visually selected (highlighted).
3. Verify market cards are displayed for all markets in the `markets` array.
4. Verify each card shows title, odds/price, and metrics footer (volume, liquidity, traders, likes).

### Flow 2 — Switch Tags
1. Click a different tag (e.g., "Sports").
2. Verify `onTagSelect` is called with the "Sports" tag ID.
3. Verify only the clicked tag is selected (single-select behavior -- previous tag deselects).

### Flow 3 — Quick Trade on Yes/No Market
1. Locate a Yes/No market card. Verify "Buy Yes" and "Buy No" buttons are visible.
2. Click "Buy Yes" → card transforms to trading overlay covering the entire card.
3. Verify trading overlay shows: predicted odds, amount input, and "BUY" button.
4. Enter amount 500 → verify amount displays as 500.
5. Click "BUY" → `onBuyYes` fires with `(marketId, 500)`.

### Flow 4 — Quick Trade on Categorical Market
1. Locate a Categorical market card. Verify outcomes are listed vertically with Yes/No buttons per outcome.
2. Scroll through outcomes if list is longer than card height.
3. Click "Yes" on a specific outcome → card transforms to trading overlay.
4. Enter amount and click "BUY" → `onBuyOutcomeYes` fires with `(marketId, outcomeId, amount)`.

### Flow 5 — Unsupported numeric market
1. Confirm the supported market data types do not include numeric markets.
2. Confirm the discovery UI does not display a synthetic numeric current value or numeric trading controls.

### Flow 6 — Filter by Market Type
1. Open filter controls (click filter icon in tag bar).
2. Select "Categorical" from the Market Type dropdown.
3. Verify `onMarketTypeChange` is called with `['categorical']`.
4. With filtered data, verify only categorical market cards are displayed.

### Failure — Trade with 0 Amount
1. Open a Yes/No market trading overlay.
2. Leave amount at 0.
3. Verify the "BUY" button is disabled.

---

## Empty State Tests

- **No markets match filter**: When `markets` array is empty after filtering, display "No markets found" message.
- **No markets at all**: When `markets` is empty with no filters applied, display an appropriate empty state.

---

## Component Interaction Tests

- **Like button**: Clicking the like button on a market card toggles `isLiked` state. The `likeCount` increments when liked, decrements when unliked.
- **Refresh button**: Clicking the refresh icon triggers `onRefreshConditions`. While `isRefreshing` is `true`, the RefreshCw icon has a spinning animation.
- **Last updated timestamp**: When `lastUpdatedAt` is set, displays relative time (e.g., "Updated 2 min ago").
- **Background loading progress bar**: When `backgroundDataLoad.status` is `'loading'`, a thin progress bar appears at the bottom of the viewport. When `status` is `'loaded'`, the bar fades out. When `status` is `'failed'`, the bar turns amber with "Failed to load market data" and a Retry button.
- **Cancel trading overlay**: Clicking the X button on the trading overlay returns the card to its normal state.
- **Card size consistency**: All market cards (Yes/No, Categorical) maintain the same fixed height regardless of content or trading mode.
- **Infinite scroll**: Scrolling to the bottom triggers `onLoadMore`.

---

## Edge Cases

- **Search query**: Typing in the search box triggers `onSearch` with the query string.
- **Volume range filter**: Adjusting volume range triggers `onVolumeRangeChange` with `{ min, max }`.
- **Closing date filter**: Adjusting closing date slider triggers `onClosingDateChange` with days value.
- **Tag bar overflow**: When there are more tags than fit horizontally, the tag bar scrolls.
- **Market card without image**: Card renders gracefully without an image (fallback or placeholder).

---

## Accessibility Checks

- Tag bar items are keyboard-navigable and announce selected state via `aria-selected`.
- Market cards have descriptive `aria-label` including market title.
- Trading overlay traps focus within the overlay and can be dismissed with Escape.
- "BUY" button has accessible name including the side (e.g., "Buy Yes for market X").
- Filter controls are labeled and keyboard-accessible.
- Like button announces toggle state ("Liked" / "Not liked").
- Refresh button has `aria-label="Refresh market data"`.

---

## Sample Test Data

```typescript
import type {
  MarketDiscoveryProps,
  MetaTag,
  CategoryTag,
  YesNoMarket,
  CategoricalMarket,
} from './types'
import type { BackgroundDataLoad } from '../wallet-setup/types'

const metaTags: MetaTag[] = [
  { id: 'trending', label: 'Trending', description: 'Most active markets' },
  { id: 'popular', label: 'Popular', description: 'Highest volume' },
  { id: 'new', label: 'New', description: 'Recently created' },
]

const categoryTags: CategoryTag[] = [
  { id: 'sports', label: 'Sports', marketCount: 12 },
  { id: 'politics', label: 'Politics', marketCount: 8 },
  { id: 'crypto', label: 'Crypto', marketCount: 15 },
]

const sampleYesNoMarket: YesNoMarket = {
  id: 'mkt-1',
  type: 'yesno',
  title: 'Will Bitcoin reach $200k by end of 2026?',
  imageUrl: '/images/btc.png',
  categoryTags: ['crypto'],
  metaTags: ['trending'],
  volume: 50000,
  liquidity: 25000,
  traderCount: 42,
  closingDate: '2026-12-31T23:59:59Z',
  createdDate: '2026-01-15T10:00:00Z',
  activeSince: '2026-01-15T10:00:00Z',
  creatorFeePercent: 0.5,
  likeCount: 18,
  isLiked: false,
  currentOdds: { yes: 67.5, no: 32.5 },
}

const sampleCategoricalMarket: CategoricalMarket = {
  id: 'mkt-2',
  type: 'categorical',
  title: 'Who will win the 2026 World Series?',
  imageUrl: '/images/baseball.png',
  categoryTags: ['sports'],
  metaTags: ['popular'],
  volume: 120000,
  liquidity: 60000,
  traderCount: 87,
  closingDate: '2026-10-31T23:59:59Z',
  createdDate: '2026-03-01T10:00:00Z',
  activeSince: '2026-03-01T10:00:00Z',
  creatorFeePercent: 1.0,
  likeCount: 34,
  isLiked: true,
  outcomes: [
    { id: 'o1', label: 'Yankees', odds: 28.5 },
    { id: 'o2', label: 'Dodgers', odds: 22.0 },
    { id: 'o3', label: 'Astros', odds: 15.5 },
  ],
}

const backgroundDataLoad: BackgroundDataLoad = {
  mintUrl: 'https://mint.bitcaster.app',
  status: 'loaded',
  conditionsLoaded: 5,
}

const sampleProps: MarketDiscoveryProps = {
  metaTags,
  categoryTags,
  markets: [sampleYesNoMarket, sampleCategoricalMarket],
  selectedTag: 'trending',
  backgroundDataLoad,
  lastUpdatedAt: '2026-03-01T09:58:00Z',
  isRefreshing: false,
}
```
