# Portfolio — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — View Portfolio
1. Render `Portfolio` with `walletState: 'ready'`.
2. Verify profile card displays avatar, display name, joined date, and view count.
3. Verify P/L chart is rendered with default time range selected.
4. Verify stats row shows Positions Value, Biggest Win, and Predictions count.
5. Verify Deposit and Withdraw buttons are visible.
6. Verify positions list is displayed with active positions.

### Flow 2 — Switch P/L Time Range
1. Verify the default time range selector is visible (1D, 1W, 1M, ALL).
2. Click "1W" → `onTimeRangeChange('1W')` fires.
3. Click "1M" → `onTimeRangeChange('1M')` fires.
4. Click "ALL" → `onTimeRangeChange('ALL')` fires.
5. Verify the P/L chart updates with corresponding data for each selection.

### Flow 3 — Switch Positions Tab
1. Verify "Active" sub-tab is selected by default.
2. Click "Closed" sub-tab → `onPositionsTabChange('closed')` fires.
3. Verify closed positions are displayed (with potential "Claim" buttons).
4. Click "Active" sub-tab → `onPositionsTabChange('active')` fires.

### Flow 4 — Sell Position
1. In the Active positions list, locate a position with a "Sell" button.
2. Click "Sell" → `onSellPosition` fires with the position ID.

### Flow 5 — Claim Payout
1. Switch to Closed positions tab.
2. Locate a winning position with a "Claim" button.
3. Click "Claim" → `onClaimPayout` fires with the position ID.

### Flow 6 — No Wallet State
1. Render `Portfolio` with `walletState: 'none'`.
2. Verify the full dashboard is hidden.
3. Verify a centered "Get Started" CTA button is displayed.
4. Click "Get Started" → `onGetStarted` fires (navigates to wallet-setup).

---

## Empty State Tests

- **No positions**: When `positions` is empty, display a helpful message (e.g., "You don't have any positions yet. Browse markets to start trading.").
- **No activity**: When `activity` is empty, display "No activity yet" message.
- **No created markets**: When `createdMarkets` is empty, My Markets section shows "No markets created" or is collapsed with "0 markets" indicator.

---

## Component Interaction Tests

- **My Markets collapsible**: Clicking the "My Markets" section header toggles expand/collapse.
- **Claim creator fees**: On a resolved created market with `creatorFeesEarned > creatorFeesClaimed` (unclaimed fees), clicking "Claim Fees" → `onClaimCreatorFees` fires with the market ID.
- **Avatar upload**: Clicking the avatar image opens a file picker. Selecting a file → `onAvatarUpload` fires with the File object.
- **Deposit button**: Clicking "Deposit" → `onDeposit` fires.
- **Withdraw button**: Clicking "Withdraw" → `onWithdraw` fires.
- **View position**: Clicking on a position row (not the Sell/Claim button) → `onViewPosition` fires with position ID.
- **View market**: Clicking on a created market row → `onViewMarket` fires with market ID.
- **View activity item**: Clicking an activity item → `onViewActivity` fires with activity ID.
- **View fund**: Clicking a fund row → `onViewFund` fires with fund ID.
- **Settings access**: Clicking the gear icon → `onOpenSettings` fires.

---

## Edge Cases

- **P/L chart with no data**: When `plChartData` for a time range is empty, chart shows a flat line at 0 or a "No data" message.
- **Large P/L amounts**: Amounts exceeding 1 BTC display correctly with proper formatting (e.g., "B1.23456789").
- **Negative P/L**: Negative amounts display in red with a minus sign.
- **Position with categorical outcome**: Position row shows the `outcomeLabel` alongside the market title.
- **Activity status**: Items with `status: 'pending'` show a pending indicator; `status: 'failed'` shows red with `failureReason`.

---

## Accessibility Checks

- Profile card has proper heading hierarchy (`h1` for display name or page title).
- P/L time range buttons use `role="tablist"` and `role="tab"` with `aria-selected`.
- Positions sub-tabs (Active/Closed) use `role="tablist"` with `aria-selected`.
- "Sell" and "Claim" buttons have descriptive accessible names (e.g., "Sell position in [market title]").
- "Get Started" CTA has focus styling and is keyboard-accessible.
- Activity feed items have descriptive `aria-label` (e.g., "Deposit of 5000 sats, completed").
- My Markets collapsible section uses `aria-expanded` on the header.

---

## Sample Test Data

```typescript
import type {
  PortfolioProps,
  UserProfile,
  Position,
  Fund,
  ActivityItem,
  CreatedMarket,
  PLChartData,
} from './types'

const sampleProfile: UserProfile = {
  userId: 'user-1',
  displayName: 'SatStacker',
  avatarUrl: '/avatars/default.png',
  registeredDate: '2026-01-01T00:00:00Z',
  viewCount: 1234,
}

const samplePositions: Position[] = [
  {
    id: 'pos-1',
    marketId: 'mkt-1',
    marketTitle: 'Will Bitcoin reach $200k by end of 2026?',
    marketImageUrl: '/images/btc.png',
    side: 'yes',
    shares: 100,
    avgBuyPrice: 65,
    currentPrice: 67.5,
    currentValueSats: 6750,
    profitLossSats: 250,
    profitLossPercent: 3.85,
    status: 'active',
    acquiredDate: '2026-02-15T10:00:00Z',
    mintUrl: 'https://mint.bitcaster.app',
  },
  {
    id: 'pos-2',
    marketId: 'mkt-2',
    marketTitle: 'Will ETH flip BTC?',
    marketImageUrl: '/images/eth.png',
    side: 'no',
    shares: 50,
    avgBuyPrice: 80,
    currentPrice: 85,
    currentValueSats: 4250,
    profitLossSats: 250,
    profitLossPercent: 6.25,
    status: 'closed',
    closedDate: '2026-02-28T10:00:00Z',
    acquiredDate: '2026-02-01T10:00:00Z',
    mintUrl: 'https://mint.bitcaster.app',
  },
]

const sampleFunds: Fund[] = [
  {
    id: 'fund-1',
    unit: 'sats',
    amount: 50000,
    mintUrl: 'https://mint.bitcaster.app',
  },
]

const sampleActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'deposit',
    amountSats: 10000,
    date: '2026-03-01T08:00:00Z',
    status: 'completed',
    txId: null,
    lightningInvoice: 'lnbc100u1p...',
  },
  {
    id: 'act-2',
    type: 'buy',
    amountSats: 5000,
    date: '2026-03-01T09:00:00Z',
    status: 'completed',
    txId: null,
    lightningInvoice: null,
    marketId: 'mkt-1',
    marketTitle: 'Will Bitcoin reach $200k by end of 2026?',
    positionId: 'pos-1',
  },
]

const sampleCreatedMarkets: CreatedMarket[] = [
  {
    id: 'cm-1',
    title: 'Will Nostr hit 10M users?',
    imageUrl: '/images/nostr.png',
    status: 'active',
    createdDate: '2026-02-01T10:00:00Z',
    volume: 30000,
    creatorFeesEarned: 150,
    creatorFeePercent: 0.5,
  },
  {
    id: 'cm-2',
    title: 'Lightning Network capacity > 10k BTC?',
    imageUrl: '/images/lightning.png',
    status: 'resolved',
    createdDate: '2026-01-01T10:00:00Z',
    resolvedDate: '2026-02-28T10:00:00Z',
    volume: 80000,
    creatorFeesEarned: 400,
    creatorFeePercent: 0.5,
  },
]

const samplePLChartData: PLChartData = {
  '1D': [
    { timestamp: '2026-03-01T00:00:00Z', cumulativePL: 0 },
    { timestamp: '2026-03-01T12:00:00Z', cumulativePL: 250 },
  ],
  '1W': [
    { timestamp: '2026-02-22T00:00:00Z', cumulativePL: -100 },
    { timestamp: '2026-03-01T00:00:00Z', cumulativePL: 250 },
  ],
  '1M': [
    { timestamp: '2026-02-01T00:00:00Z', cumulativePL: -500 },
    { timestamp: '2026-03-01T00:00:00Z', cumulativePL: 250 },
  ],
  ALL: [
    { timestamp: '2026-01-01T00:00:00Z', cumulativePL: 0 },
    { timestamp: '2026-03-01T00:00:00Z', cumulativePL: 250 },
  ],
}

const sampleProps: PortfolioProps = {
  walletState: 'ready',
  baseCurrency: 'BTC',
  selectedTimeRange: '1W',
  profile: sampleProfile,
  plChartData: samplePLChartData,
  totalBalanceSats: 61000,
  positions: samplePositions,
  funds: sampleFunds,
  activity: sampleActivity,
  createdMarkets: sampleCreatedMarkets,
  positionsTab: 'active',
}
```
