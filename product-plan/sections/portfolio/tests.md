# Test Instructions: Portfolio

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the personal trading dashboard: conditional entry based on wallet state, profile card, P/L chart, positions, activity feed, and created markets.

## User Flow Tests

### Flow 1: No Wallet State
**Success Path:**
- Setup: walletState: 'none'
- Expected: Shows "Get Started" CTA, full dashboard not rendered
- Steps: Click "Get Started"
- Expected: onGetStarted called, navigation to wallet setup begins

### Flow 2: View Portfolio Dashboard
**Success Path:**
- Setup: walletState: 'ready', positions array populated, activity array populated
- Expected: Profile card visible, P/L chart visible, stats row visible, positions section visible, activity feed visible

### Flow 3: Switch P/L Time Range
**Success Path:**
- Steps: Click "1W" tab on P/L chart
- Expected: Chart data updates to 1-week range, onTimeRangeChange('1W') called, '1W' tab highlighted

### Flow 4: Sell Active Position
**Success Path:**
- Setup: Active yes/no position with shares held
- Steps: Go to Positions tab → Active sub-tab → click "Sell" on a position
- Expected: onSellPosition called with positionId

### Flow 5: Claim Payout
**Success Path:**
- Setup: Closed position in winning market with unclaimed payout
- Steps: Go to Positions tab → Closed sub-tab → click "Claim" on winning position
- Expected: onClaimPayout called with positionId, payout amount displayed on button

**Failure Path:**
- Setup: Closed position in losing market
- Expected: No "Claim" button shown, position shows "Lost" status

### Flow 6: View Activity Feed
**Success Path:**
- Steps: Switch to Activity tab → observe chronological feed
- Expected: All activity types displayed with correct icons and signed amounts (positive for buys, negative for sells/withdrawals)

### Flow 7: Deposit and Withdraw
**Success Path:**
- Steps: Click "Deposit" button in profile card
- Expected: onDeposit called
- Steps: Click "Withdraw" button
- Expected: onWithdraw called

### Flow 8: View Created Markets from Portfolio
**Success Path:**
- Steps: Scroll to "My Markets" section → click on a created market card
- Expected: onViewMarket called with marketId

## Empty State Tests
- No active positions → "No positions yet" message with link to browse markets
- No closed positions → "No closed positions" message
- No activity → "No activity yet" message with guidance
- No created markets → My Markets section shows "You haven't created any markets yet" with CTA

## Component Tests
- ProfileCard shows avatar (or initials placeholder), displayName, registeredDate, viewCount
- PLChart renders with correct color: green line when net positive, red line when net negative
- PLChart stats row shows totalProfitLoss, winRate, totalTrades, openPositions
- PositionCard shows market title, outcome label, shares held, current value, unrealized P/L
- PositionCard (closed/winning) shows payout amount and Claim button
- ActivityItem shows correct icon per type: trade=arrow, deposit=plus, withdrawal=minus, payout=trophy
- ActivityItem amounts color-coded: positive=green, negative=red

## Edge Cases
- Negative P/L: PLChart line red, stats show minus sign and red text
- Failed activity items: show error reason text in muted style
- Pending withdrawal: shows "Pending" badge, amount grayed out
- Categorical position: outcome label shown (not just "Yes"/"No")
- Very large portfolio value: sats formatted with thousands separator
- P/L chart with only one data point: renders single point, no line

## Accessibility
- Tab navigation between Overview, Positions, Activity tabs
- Positions Active/Closed sub-tabs keyboard accessible
- "Sell" and "Claim" buttons have descriptive aria-labels including market name
- P/L time range buttons have aria-pressed state

## Sample Test Data
```typescript
const mockProfile = {
  userId: "usr-a1b2",
  displayName: "SatoshiTrader",
  avatarUrl: null,
  registeredDate: "2025-08-15T09:30:00Z",
  viewCount: 1247,
  balanceSats: 1483200,
  totalDepositedSats: 1200000,
  totalWithdrawnSats: 0
};

const mockPLData = {
  timeRange: "1M" as const,
  dataPoints: [
    { date: "2026-01-22", valueSats: 1200000 },
    { date: "2026-01-29", valueSats: 1310000 },
    { date: "2026-02-05", valueSats: 1285000 },
    { date: "2026-02-12", valueSats: 1410000 },
    { date: "2026-02-19", valueSats: 1483200 }
  ],
  stats: {
    totalProfitLossSats: 283200,
    winRate: 68.5,
    totalTrades: 47,
    openPositions: 5
  }
};

const mockPositions = [
  {
    id: "pos-001",
    marketId: "mkt-001",
    marketTitle: "Will Bitcoin reach $100K?",
    outcome: "Yes",
    sharesHeld: 148,
    currentValueSats: 102120,
    costBasisSats: 74000,
    unrealizedPLSats: 28120,
    status: "active"
  },
  {
    id: "pos-002",
    marketId: "mkt-002",
    marketTitle: "NBA Finals 2026 winner",
    outcome: "Boston Celtics",
    sharesHeld: 0,
    currentValueSats: 0,
    costBasisSats: 50000,
    payoutSats: 147000,
    payoutClaimed: false,
    status: "closed-won"
  }
];

const mockActivity = [
  {
    id: "act-001",
    type: "trade" as const,
    marketTitle: "Will Bitcoin reach $100K?",
    side: "yes",
    amountSats: -74000,
    timestamp: "2026-02-10T14:22:00Z",
    status: "completed"
  },
  {
    id: "act-002",
    type: "deposit" as const,
    amountSats: 500000,
    timestamp: "2026-01-20T09:00:00Z",
    status: "completed"
  }
];

const mockEmptyPositions: typeof mockPositions = [];
const mockEmptyActivity: typeof mockActivity = [];
```
