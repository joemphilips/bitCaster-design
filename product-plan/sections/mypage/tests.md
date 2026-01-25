# Test Instructions: MyPage

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the personal dashboard: P/L summary display, avatar upload, positions management (sell/claim), order history, and created markets with fee claiming.

---

## User Flow Tests

### Flow 1: View P/L Summary

**Scenario:** User views their trading performance

#### Success Path

**Setup:**
- User profile with avatar and display name "satoshi"
- P/L data: 24h +5000 sats (+12.5%), 7d +12000 sats (+8.3%), 30d -3000 sats (-2.1%), All-time +125000 sats (+45.2%)

**Steps:**
1. User navigates to MyPage

**Expected Results:**
- [ ] Avatar displays (or initial letter if no avatar)
- [ ] Display name "satoshi" shown
- [ ] "Member since [date]" shown
- [ ] 4 P/L cards in a row
- [ ] 24h card shows "+5.0k sats" with green color and up arrow
- [ ] 7 days card shows "+12.0k sats" with green color
- [ ] 30 days card shows "-3.0k sats" with red color and down arrow
- [ ] All Time card has blue gradient highlight
- [ ] All Time shows "+125.0k sats"

---

### Flow 2: Upload Avatar

**Scenario:** User uploads a new avatar image

#### Success Path

**Steps:**
1. User clicks on avatar area
2. File picker opens
3. User selects image file

**Expected Results:**
- [ ] Avatar area is clickable (button element)
- [ ] Hover shows camera icon overlay
- [ ] File input accepts: image/png, image/jpeg, image/webp
- [ ] `onAvatarUpload` callback called with File object
- [ ] (After implementation) Avatar image updates

---

### Flow 3: Sell Active Position

**Scenario:** User sells an active position

#### Success Path

**Setup:**
- Active position in "Bitcoin $100K" market
- Side: YES, 500 shares
- Current value: 75,000 sats, P/L: +25,000 sats (+50%)

**Steps:**
1. User sees Positions section (expanded by default)
2. User sees Active tab selected
3. User finds position row
4. User clicks "Sell" button

**Expected Results:**
- [ ] Position row shows market thumbnail
- [ ] "YES" badge overlaid on image (emerald color)
- [ ] Market title displayed
- [ ] "500 shares" shown
- [ ] "75,000 sats" current value in large font
- [ ] "+25,000 (+50.0%)" P/L in green
- [ ] "Sell" button visible (rose/red color)
- [ ] `onSellPosition` callback called with positionId
- [ ] Clicking row (not button) calls `onViewPosition`

---

### Flow 4: Claim Payout from Winning Position

**Scenario:** User claims payout from a closed winning position

#### Success Path

**Setup:**
- Closed position with currentValueSats > 0 (user won)

**Steps:**
1. User clicks "Closed" tab
2. User finds winning position
3. User clicks "Claim" button

**Expected Results:**
- [ ] Closed tab shows count badge
- [ ] "Closed" tab highlighted when active
- [ ] Position row shows "Closed" badge
- [ ] Row has slightly faded opacity (0.8)
- [ ] "Claim" button visible (emerald/green)
- [ ] `onClaimPayout` callback called with positionId

#### Losing Position (No Claim)

**Setup:**
- Closed position with currentValueSats = 0 (user lost)

**Expected Results:**
- [ ] No "Claim" button shown
- [ ] Position still displays with P/L info

---

### Flow 5: Review Order History

**Scenario:** User views their transaction history

#### Success Path

**Setup:**
- Orders: 2 deposits (completed, pending), 1 withdrawal (completed)

**Steps:**
1. User clicks "Order History" section header
2. Section expands
3. User sees list of transactions

**Expected Results:**
- [ ] Section collapsed by default
- [ ] Badge shows order count
- [ ] Click header expands section
- [ ] Chevron rotates on expand
- [ ] Deposit rows show:
  - Down arrow icon in green circle
  - "Deposit" label
  - Status badge (completed = green, pending = amber)
  - Date formatted (e.g., "Jan 15, 2025")
  - Amount in green "+25,000 sats"
- [ ] Withdrawal rows show:
  - Up arrow icon in red circle
  - "Withdrawal" label
  - Amount in red "-10,000 sats"
- [ ] TX ID shown (truncated middle)
- [ ] Lightning invoice shown with ⚡ icon if applicable
- [ ] Clicking row calls `onViewOrder`

---

### Flow 6: Claim Creator Fees

**Scenario:** User claims fees from a resolved market they created

#### Success Path

**Setup:**
- Created market with status "resolved"
- creatorFeesEarned: 15,000 sats

**Steps:**
1. User expands "My Markets" section
2. User finds resolved market with fees
3. User clicks "Claim Fees" button

**Expected Results:**
- [ ] Section collapsed by default
- [ ] Market row shows thumbnail with status badge ("Resolved" = blue)
- [ ] Shows "Created [date]"
- [ ] Shows volume and fee percentage
- [ ] "+15.0k earned (2%)" displayed
- [ ] "Claim Fees" button visible (emerald)
- [ ] `onClaimCreatorFees` callback called with marketId

---

## Empty State Tests

### No Active Positions

**Scenario:** User has no active positions

**Setup:**
- positions array has only closed items

**Steps:**
1. User views Active tab

**Expected Results:**
- [ ] Shows centered empty state
- [ ] Chart icon in gray circle
- [ ] "No active positions" text
- [ ] No blank screen

### No Closed Positions

**Setup:**
- positions array has only active items

**Expected Results:**
- [ ] Closed tab shows "No closed positions"

### No Order History

**Setup:**
- orderHistory = []

**Expected Results:**
- [ ] Clock icon in gray circle
- [ ] "No transactions yet" text

### No Created Markets

**Setup:**
- createdMarkets = []

**Expected Results:**
- [ ] Plus icon in gray circle
- [ ] "You haven't created any markets yet" text

---

## Component Interaction Tests

### PLCard Renders Correctly

- [ ] Label displays in uppercase
- [ ] Amount displays in mono font with sign (+/-)
- [ ] "sats" unit label displays
- [ ] Arrow shows direction (up for positive, down for negative)
- [ ] Percent change displays with sign
- [ ] isHighlighted applies blue gradient background
- [ ] Non-highlighted uses appropriate text colors (green/red based on value)

### ExpandableSection Works

- [ ] Title displays
- [ ] Badge displays count
- [ ] Click toggles expanded state
- [ ] Chevron animates (rotates 180°)
- [ ] Content animates in/out smoothly
- [ ] defaultExpanded prop respected

### PositionRow Renders Correctly

- [ ] Market thumbnail with gradient overlay
- [ ] Side badge (YES = emerald, NO = rose) positioned on image
- [ ] Outcome label shown for categorical markets
- [ ] Share count displayed
- [ ] Current value in large font
- [ ] P/L with color coding
- [ ] Appropriate action button (Sell for active, Claim for winning closed)
- [ ] Click on row calls onView (not on buttons)

---

## Edge Cases

- [ ] Position with very long market title truncates
- [ ] Position without outcome label (Yes/No market) works
- [ ] Order with failed status shows failure reason
- [ ] Order without TX ID (pending) handles gracefully
- [ ] Large sats values format correctly (1M+)
- [ ] Negative P/L displays correctly with minus sign
- [ ] Tab switching preserves scroll position
- [ ] Created market with rejection reason shows it

---

## Accessibility Checks

- [ ] Avatar upload has aria-label
- [ ] Tab buttons are keyboard accessible
- [ ] Expandable sections work with keyboard
- [ ] Focus moves appropriately after actions
- [ ] Screen reader announces section expand/collapse

---

## Sample Test Data

```typescript
const mockProfile = {
  userId: 'user-1',
  displayName: 'satoshi',
  avatarUrl: null,
  registeredDate: '2024-06-15T00:00:00Z',
}

const mockPLSummary = {
  last24h: { amountSats: 5000, percentChange: 12.5 },
  last7d: { amountSats: 12000, percentChange: 8.3 },
  last30d: { amountSats: -3000, percentChange: -2.1 },
  allTime: { amountSats: 125000, percentChange: 45.2 },
}

const mockActivePosition = {
  id: 'pos-1',
  marketId: 'market-1',
  marketTitle: 'Will Bitcoin reach $100K by end of 2025?',
  marketImageUrl: '/images/btc.jpg',
  side: 'yes',
  shares: 500,
  avgBuyPrice: 50,
  currentPrice: 75,
  currentValueSats: 75000,
  profitLossSats: 25000,
  profitLossPercent: 50.0,
  status: 'active',
  acquiredDate: '2024-12-01T00:00:00Z',
}

const mockClosedWinningPosition = {
  ...mockActivePosition,
  id: 'pos-2',
  status: 'closed',
  closedDate: '2025-01-10T00:00:00Z',
}

const mockClosedLosingPosition = {
  ...mockActivePosition,
  id: 'pos-3',
  status: 'closed',
  currentValueSats: 0,
  profitLossSats: -25000,
  profitLossPercent: -100,
}

const mockDepositOrder = {
  id: 'order-1',
  type: 'deposit',
  amountSats: 50000,
  date: '2025-01-15T10:30:00Z',
  status: 'completed',
  txId: 'abc123def456...',
  lightningInvoice: null,
}

// Empty states
const mockEmptyPositions = []
const mockEmptyOrders = []
const mockEmptyCreatedMarkets = []
```

---

## Notes for Test Implementation

- Mock file input for avatar upload testing
- Test tab persistence when switching between sections
- Verify collapsed sections don't render hidden content (performance)
- Test P/L color logic thoroughly (positive green, negative red)
- **Always test empty states** — No positions, no orders, no markets
- Test transitions between states (last position sold → empty state appears)
