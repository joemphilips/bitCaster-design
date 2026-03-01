# Market Creation & Management — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — View Dashboard Stats
1. Render `MarketCreationDashboard` with `activeTab: 'overview'`.
2. Verify stat cards display: active markets count, resolved markets count, refunded markets count.
3. Verify total volume is shown formatted in sats (e.g., "B120,000").
4. Verify fees earned and unclaimed fees are displayed.

### Flow 2 — Browse Market List
1. Verify market list rows are rendered for each market in `creatorMarkets`.
2. Each row shows: thumbnail image, title, status badge, volume, end date, fees earned.
3. Verify "View Details" action is present on each row.
4. Click "View Details" on a market → `onViewDetails` fires with the market ID.

### Flow 3 — Switch to Analytics Tab
1. Click "Analytics" tab → `onTabChange('analytics')` fires.
2. Advance to `activeTab: 'analytics'`.
3. Verify volume chart is rendered.
4. Verify time scale selector is visible (daily/weekly/monthly).
5. Verify chart mode toggle is visible (aggregate/per-market).

### Flow 4 — Claim Fees
1. Locate a resolved market with unclaimed fees (`feesEarnedSats > feesClaimedSats`).
2. Verify "Claim Fees" button is visible on that market row.
3. Click "Claim Fees" → `onClaimFees` fires with the market ID.

### Flow 5 — Paginate Market List
1. With `pagination.totalPages > 1`, verify pagination controls are visible.
2. Click next page → `onPageChange` fires with the next page number.
3. Verify market list updates to show the next page of markets.

---

## Empty State Tests

- **No markets created**: When `creatorMarkets` is empty, display "Create your first market" message with a CTA linking to the market-creation wizard.
- **No analytics data**: When `volumeChartData` has empty arrays, the chart shows "No data available" or an empty chart area.

---

## Component Interaction Tests

- **Refunded market badge**: Markets with `status: 'refunded'` display a "Refunded" badge and show the `refundedSats` amount.
- **Volume chart time scale switching**: Clicking "weekly" → `onTimeScaleChange('weekly')` fires. Clicking "monthly" → `onTimeScaleChange('monthly')` fires.
- **Chart mode toggle**: Clicking "per-market" → `onChartModeChange('per-market')` fires. In per-market mode, individual market volumes are shown.
- **Add Market CTA**: The "Add Market" tab is styled as a filled button. Clicking it initiates the market-creation wizard flow.
- **Page size change**: Changing the page size dropdown → `onPageSizeChange` fires with the selected size.
- **Select market for chart**: In per-market mode, selecting a specific market → `onSelectMarketForChart` fires with the market ID.
- **Status badge colors**: Active = blue/green, Resolved = grey/white, Refunded = amber/orange.

---

## Edge Cases

- **Single page of markets**: When `pagination.totalPages === 1`, pagination controls are hidden or show page 1 of 1.
- **Market with zero fees**: A market with `feesEarnedSats: 0` does not show the "Claim Fees" button.
- **All fees claimed**: A resolved market with `feesClaimedSats === feesEarnedSats` does not show "Claim Fees" (fees fully claimed).
- **Cancel market**: Clicking cancel on an active market → `onCancelMarket` fires with the market ID.
- **Wizard draft resume**: When `wizardDraft` is not null, the Add Market flow resumes from the saved step.

---

## Accessibility Checks

- Tab navigation uses `role="tablist"` with `role="tab"` and `aria-selected`.
- Stat cards have descriptive labels (e.g., "Active Markets: 5").
- Market list rows are keyboard-navigable with `role="row"` or equivalent.
- Pagination controls have `aria-label="Pagination"` and individual page buttons have `aria-label="Page N"`.
- "Claim Fees" button has descriptive text (e.g., "Claim fees for [market title]").
- Chart has `role="img"` with `aria-label` describing the chart content.
- Status badges are announced by screen readers (e.g., "Status: Refunded").

---

## Sample Test Data

```typescript
import type {
  MarketCreationProps,
  DashboardStats,
  YesNoCreatorMarket,
  CategoricalCreatorMarket,
  VolumeChartData,
  PaginationState,
} from './types'

const sampleStats: DashboardStats = {
  activeMarketsCount: 3,
  resolvedMarketsCount: 5,
  refundedMarketsCount: 1,
  totalVolumeSats: 500000,
  totalFeesEarnedSats: 2500,
  totalFeesClaimedSats: 1500,
  totalFeesUnclaimedSats: 1000,
}

const sampleYesNoMarket: YesNoCreatorMarket = {
  id: 'cm-1',
  type: 'yesno',
  title: 'Will Bitcoin reach $200k by end of 2026?',
  description: 'Resolves based on CoinGecko BTC/USD price.',
  imageUrl: '/images/btc.png',
  categoryTags: ['crypto'],
  status: 'active',
  volume: 50000,
  liquidity: 25000,
  traderCount: 42,
  createdDate: '2026-01-15T10:00:00Z',
  closingDate: '2026-12-31T23:59:59Z',
  creatorFeePercent: 0.5,
  feesEarnedSats: 250,
  feesClaimedSats: 0,
  answerUrls: ['https://coingecko.com/btc'],
  currentOdds: { yes: 67.5, no: 32.5 },
}

const sampleCategoricalMarket: CategoricalCreatorMarket = {
  id: 'cm-2',
  type: 'categorical',
  title: 'Who will win the 2026 World Series?',
  description: 'Resolves based on MLB official results.',
  imageUrl: '/images/baseball.png',
  categoryTags: ['sports'],
  status: 'resolved',
  volume: 120000,
  liquidity: 0,
  traderCount: 87,
  createdDate: '2026-03-01T10:00:00Z',
  closingDate: '2026-10-31T23:59:59Z',
  creatorFeePercent: 1.0,
  feesEarnedSats: 1200,
  feesClaimedSats: 800,
  answerUrls: ['https://mlb.com'],
  resolvedDate: '2026-11-01T10:00:00Z',
  winningOutcomeId: 'o1',
  outcomes: [
    { id: 'o1', label: 'Yankees', odds: 100, isWinner: true },
    { id: 'o2', label: 'Dodgers', odds: 0 },
    { id: 'o3', label: 'Astros', odds: 0 },
  ],
}

const sampleVolumeChartData: VolumeChartData = {
  daily: [
    { date: '2026-02-27', volumeSats: 5000, feesSats: 25 },
    { date: '2026-02-28', volumeSats: 8000, feesSats: 40 },
    { date: '2026-03-01', volumeSats: 12000, feesSats: 60 },
  ],
  weekly: [
    { weekStart: '2026-02-17', volumeSats: 35000, feesSats: 175 },
    { weekStart: '2026-02-24', volumeSats: 45000, feesSats: 225 },
  ],
  monthly: [
    { month: '2026-01', volumeSats: 80000, feesSats: 400 },
    { month: '2026-02', volumeSats: 120000, feesSats: 600 },
  ],
}

const samplePagination: PaginationState = {
  currentPage: 1,
  pageSize: 10,
  totalItems: 9,
  totalPages: 1,
}

const sampleProps: MarketCreationProps = {
  dashboardStats: sampleStats,
  creatorMarkets: [sampleYesNoMarket, sampleCategoricalMarket],
  volumeChartData: sampleVolumeChartData,
  volumeByMarket: [],
  wizardDraft: null,
  categoryTags: [
    { id: 'crypto', label: 'Crypto' },
    { id: 'sports', label: 'Sports' },
    { id: 'politics', label: 'Politics' },
  ],
  pagination: samplePagination,
  activeTab: 'overview',
  analyticsTimeScale: 'daily',
  analyticsChartMode: 'aggregate',
}
```
