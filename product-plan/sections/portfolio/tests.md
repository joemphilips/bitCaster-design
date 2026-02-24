# Test Instructions: Portfolio

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the personal trading dashboard: conditional entry based on wallet state, profile card, P/L chart, positions, funds, activity feed, and created markets.

## User Flow Tests

### Flow 1: No Wallet State
**Success Path:**
- Setup: walletState: 'none'
- Expected: Shows "Get Started" CTA, full dashboard not rendered
- Steps: Click "Get Started"
- Expected: onGetStarted called, navigation to wallet setup begins

### Flow 2: View Portfolio Dashboard
**Success Path:**
- Setup: walletState: 'ready', positions array populated, funds array populated, activity array populated
- Expected: Profile card visible, P/L chart visible, stats row visible, positions section visible, funds section visible, activity feed visible

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
- Steps: Expand Activity section → observe chronological feed
- Expected: All activity types displayed with correct icons and signed amounts (positive for buys, negative for sells/withdrawals)

### Flow 7: Deposit and Withdraw
**Success Path:**
- Steps: Click "Deposit" button in profile card
- Expected: onDeposit called (opens Deposit/Withdraw modal in deposit mode)
- Steps: Click "Withdraw" button
- Expected: onWithdraw called (opens Deposit/Withdraw modal in withdraw mode)

### Flow 8: View Created Markets from Portfolio
**Success Path:**
- Steps: Scroll to "My Markets" section → click on a created market card
- Expected: onViewMarket called with marketId

### Flow 9: View Funds Tab
**Success Path:**
- Setup: funds array populated with sats and USD funds from different mints
- Steps: Switch to Funds tab
- Expected: FundsList renders with FundRow for each fund, showing unit (Sats/USD), mint hostname, and amount
- Steps: Click on a fund row
- Expected: onViewFund called with fundId

### Flow 10: Empty Funds
**Success Path:**
- Setup: funds array is empty
- Steps: Switch to Funds tab
- Expected: "No funds" empty state message displayed

## Empty State Tests
- No active positions → "No positions yet" message with link to browse markets
- No closed positions → "No closed positions" message
- No funds → "No funds" message
- No activity → "No activity yet" message with guidance
- No created markets → My Markets section shows "You haven't created any markets yet" with CTA

## Component Tests
- ProfileCard shows avatar (or initials placeholder), displayName, registeredDate, viewCount
- PLChart renders with correct color: green line when net positive, red line when net negative
- PLChart stats row shows totalProfitLoss, winRate, totalTrades, openPositions
- PositionCard shows market title, outcome label, shares held, current value, unrealized P/L
- PositionCard (closed/winning) shows payout amount and Claim button
- FundRow shows correct icon (Coins for sats, DollarSign for USD)
- FundRow displays mint hostname extracted from mintUrl
- FundRow formats sats with formatBtc and USD with dollar formatting
- ActivityItem shows correct icon per type: trade=arrow, deposit=plus, withdrawal=minus, payout=trophy
- ActivityItem amounts color-coded: positive=green, negative=red

## Edge Cases
- Negative P/L: PLChart line red, stats show minus sign and red text
- Failed activity items: show error reason text in muted style
- Pending withdrawal: shows "Pending" badge, amount grayed out
- Categorical position: outcome label shown (not just "Yes"/"No")
- Very large portfolio value: sats formatted with thousands separator
- P/L chart with only one data point: renders single point, no line
- Fund with invalid mintUrl: graceful handling (show raw URL or fallback)

## Accessibility
- Tab navigation between Positions, Funds tabs
- Positions Active/Closed sub-tabs keyboard accessible
- "Sell" and "Claim" buttons have descriptive aria-labels including market name
- P/L time range buttons have aria-pressed state
- Fund rows are clickable buttons with appropriate semantics

## Sample Test Data
```typescript
const mockProfile = {
  userId: "usr-a1b2",
  displayName: "SatoshiTrader",
  avatarUrl: null,
  registeredDate: "2025-08-15T09:30:00Z",
  viewCount: 1247
};

const mockPLData = {
  "1D": [
    { timestamp: "2026-01-22T00:00:00Z", cumulativePL: 220000 },
    { timestamp: "2026-01-23T00:00:00Z", cumulativePL: 234580 }
  ],
  "1W": [
    { timestamp: "2026-01-16T00:00:00Z", cumulativePL: 242780 },
    { timestamp: "2026-01-22T00:00:00Z", cumulativePL: 234580 }
  ],
  "1M": [
    { timestamp: "2025-12-23T00:00:00Z", cumulativePL: 147230 },
    { timestamp: "2026-01-22T00:00:00Z", cumulativePL: 234580 }
  ],
  "ALL": [
    { timestamp: "2025-08-15T00:00:00Z", cumulativePL: 0 },
    { timestamp: "2026-01-22T00:00:00Z", cumulativePL: 234580 }
  ]
};

const mockPositions = [
  {
    id: "pos-001",
    marketId: "mkt-001",
    marketTitle: "Will Bitcoin reach $100K?",
    marketImageUrl: "/images/markets/bitcoin-100k.jpg",
    mintUrl: "https://mint.bitcaster.io",
    side: "yes" as const,
    shares: 150,
    avgBuyPrice: 620,
    currentPrice: 675,
    currentValueSats: 101250,
    profitLossSats: 8250,
    profitLossPercent: 8.87,
    status: "active" as const,
    acquiredDate: "2025-12-10T14:22:00Z"
  }
];

const mockFunds = [
  {
    id: "fund-001",
    unit: "sats" as const,
    amount: 125000,
    mintUrl: "https://mint.bitcaster.io"
  },
  {
    id: "fund-002",
    unit: "sats" as const,
    amount: 48000,
    mintUrl: "https://testnut.cashu.space"
  },
  {
    id: "fund-003",
    unit: "usd" as const,
    amount: 2500,
    mintUrl: "https://mint.bitcaster.io"
  }
];

const mockActivity = [
  {
    id: "act-001",
    type: "deposit" as const,
    amountSats: 500000,
    date: "2025-08-15T09:35:00Z",
    status: "completed" as const,
    txId: "a1b2c3d4e5f6789012345678901234567890abcd",
    lightningInvoice: null
  },
  {
    id: "act-002",
    type: "buy" as const,
    amountSats: 93600,
    date: "2025-09-20T10:30:00Z",
    status: "completed" as const,
    txId: null,
    lightningInvoice: null,
    marketId: "mkt-resolved-001",
    marketTitle: "Will Ethereum merge to PoS?",
    positionId: "pos-005"
  }
];

const mockEmptyPositions: typeof mockPositions = [];
const mockEmptyFunds: typeof mockFunds = [];
const mockEmptyActivity: typeof mockActivity = [];
```
