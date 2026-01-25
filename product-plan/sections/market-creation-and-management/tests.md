# Test Instructions: Market Creation & Management

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview

Test the creator dashboard: statistics display, market list management, analytics charts, fee claiming, market cancellation, and create wizard integration.

---

## User Flow Tests

### Flow 1: View Dashboard Statistics

**Scenario:** Creator views their dashboard stats

#### Success Path

**Setup:**
- User has created markets with various statuses
- Stats data: 5 active, 3 resolved, 2 pending, 150M volume, 75k fees earned

**Steps:**
1. User navigates to Market Creation page
2. User sees Overview tab selected by default

**Expected Results:**
- [ ] "Active Markets" card shows "5" with green accent
- [ ] "Resolved" card shows "3" with blue accent
- [ ] "Total Volume" card shows formatted volume (e.g., "150.00M sats")
- [ ] "Fees Earned" card shows "+75.0k" with green accent
- [ ] Pending badge shows "2 pending review" with amber pulse
- [ ] All stat cards have appropriate icons

---

### Flow 2: Claim Creator Fees

**Scenario:** Creator claims fees from a resolved market

#### Success Path

**Setup:**
- Resolved market with 25,000 sats unclaimed fees

**Steps:**
1. User finds resolved market in list
2. User sees "Claim 25k sats" button with shimmer animation
3. User clicks the claim button

**Expected Results:**
- [ ] Button shows "Claim 25k sats" text
- [ ] Button has emerald/green gradient background
- [ ] Shimmer animation visible on button
- [ ] `onClaimFees` callback called with `marketId`
- [ ] After claiming, button should disappear (re-render with claimed state)

#### Edge Case: All Fees Already Claimed

**Setup:**
- Resolved market with feesEarned = feesClaimedSats

**Expected Results:**
- [ ] No claim button shown
- [ ] "View Details" button still present

---

### Flow 3: Analyze Volume Performance

**Scenario:** Creator views analytics charts

#### Success Path

**Steps:**
1. User clicks "Analytics" tab
2. User sees volume chart with daily data
3. User clicks "Weekly" time scale button
4. User clicks "Per Market" mode toggle

**Expected Results:**
- [ ] Analytics tab becomes active
- [ ] Overview content hides, chart appears
- [ ] "Volume Analytics" heading visible
- [ ] Summary stats show: Total Volume, Total Fees, Avg Per Day, Active Markets
- [ ] Bar chart displays with tooltips on hover
- [ ] "Weekly" button becomes highlighted when clicked
- [ ] Per-Market breakdown shows list of markets with progress bars
- [ ] `onTimeScaleChange` called with 'weekly'
- [ ] `onChartModeChange` called with 'per-market'

---

### Flow 4: Create New Market

**Scenario:** Creator starts market creation

#### Success Path

**Steps:**
1. User clicks "Create Market" button (top right, prominent blue)
2. Wizard opens/navigates

**Expected Results:**
- [ ] "Create Market" button visible with plus icon
- [ ] Button has gradient blue background with shadow
- [ ] If draft exists, shows "Draft saved" badge
- [ ] `onCreateMarket` callback called with current draft (or undefined)

#### Draft Recovery

**Setup:**
- wizardDraft exists with step1.title = "Bitcoin Price Market", currentStep = 3

**Expected Results:**
- [ ] Draft recovery banner appears at bottom of Overview
- [ ] Shows "Draft in progress" heading
- [ ] Shows "Bitcoin Price Market • Step 3 of 5"
- [ ] "Discard" and "Continue Editing" buttons visible
- [ ] "Continue Editing" calls `onCreateMarket` with draft
- [ ] "Discard" calls `onDiscardDraft`

---

### Flow 5: Cancel a Market

**Scenario:** Creator cancels a pending or active market

#### Success Path

**Setup:**
- Market with status "pending" or "approved"

**Steps:**
1. User finds market with "Cancel" button visible
2. User clicks "Cancel" button

**Expected Results:**
- [ ] "Cancel" button visible for pending/approved markets
- [ ] Button has slate border, turns rose on hover
- [ ] `onCancelMarket` callback called with `marketId`
- [ ] (After implementation) Market status changes to "cancelled"

#### Cannot Cancel Resolved/Cancelled Markets

**Setup:**
- Market with status "resolved" or "cancelled"

**Expected Results:**
- [ ] No "Cancel" button shown for these markets

---

### Flow 6: Pagination

**Scenario:** Creator navigates through paginated market list

**Setup:**
- 25 total markets, page size 10

**Steps:**
1. User sees pagination showing "1 to 10 of 25 markets"
2. User clicks page 2 button
3. User changes page size to 20

**Expected Results:**
- [ ] Page numbers shown with current page highlighted
- [ ] Ellipsis shown if many pages
- [ ] Previous/Next arrows work
- [ ] `onPageChange` called with page number
- [ ] Page size dropdown shows options: 5, 10, 20, 50
- [ ] `onPageSizeChange` called with selected size

---

## Empty State Tests

### No Markets Created Yet

**Scenario:** New creator with no markets

**Setup:**
- creatorMarkets = []

**Expected Results:**
- [ ] Empty state card with dashed border appears
- [ ] Shows plus icon in blue circle
- [ ] Shows heading "Create your first market"
- [ ] Shows description about earning fees
- [ ] Shows "Create Market" button
- [ ] No pagination shown

### No Analytics Data

**Scenario:** Creator has no volume yet

**Setup:**
- volumeChartData with all zeros

**Expected Results:**
- [ ] Chart area displays (may show flat line or placeholder)
- [ ] Summary stats show "0" appropriately
- [ ] No broken layout

---

## Component Interaction Tests

### StatCard Renders Correctly

- [ ] Label displays in uppercase tracking-wider style
- [ ] Value displays in large mono font
- [ ] SubValue displays below value
- [ ] Icon displays in colored background circle
- [ ] Variant changes border and icon background color
- [ ] Hover adds shadow

### MarketRow Renders Correctly

- [ ] Market thumbnail image displays with hover scale effect
- [ ] Status badge shows correct label and color:
  - Pending: amber with pulse dot
  - Live (approved): emerald with pulse dot
  - Rejected: rose
  - Resolved: blue
  - Cancelled: slate
- [ ] Title displays with line-clamp-2
- [ ] Category tags display (max 2)
- [ ] Closing date shows formatted
- [ ] Volume and fees display in mono font
- [ ] Rejection reason shows if status is rejected
- [ ] Clicking row (not buttons) calls `onViewDetails`

### VolumeChart Renders Correctly

- [ ] Header shows title and description
- [ ] Mode toggle (Aggregate/Per Market) works
- [ ] Time scale buttons (Daily/Weekly/Monthly) work
- [ ] Summary stats grid displays 4 cards
- [ ] Bar chart shows up to 15 data points
- [ ] Tooltip appears on bar hover with sats and fees
- [ ] Legend shows Volume and Fees indicators
- [ ] Per-market breakdown shows when mode is 'per-market'

---

## Edge Cases

- [ ] Market with very long title truncates properly
- [ ] Works with 0, 1, 100+ markets
- [ ] Large numbers format correctly (1M+, 1k, etc.)
- [ ] Dates format correctly across timezones
- [ ] Validation errors banner shows when errors present
- [ ] Multiple pending/rejected/cancelled status badges can appear together

---

## Accessibility Checks

- [ ] Tab navigation works between Overview and Analytics
- [ ] Buttons are keyboard accessible
- [ ] Pagination is keyboard navigable
- [ ] Screen reader announces tab changes
- [ ] Focus management after actions

---

## Sample Test Data

```typescript
const mockDashboardStats = {
  activeMarketsCount: 5,
  resolvedMarketsCount: 3,
  pendingMarketsCount: 2,
  rejectedMarketsCount: 1,
  cancelledMarketsCount: 0,
  totalVolumeSats: 150000000,
  totalFeesEarnedSats: 75000,
  totalFeesClaimedSats: 50000,
  totalFeesUnclaimedSats: 25000,
}

const mockCreatorMarket = {
  id: 'market-1',
  title: 'Will Bitcoin reach $100K by end of 2025?',
  description: 'Market description',
  imageUrl: '/images/btc.jpg',
  type: 'yesno',
  categoryTags: ['Crypto', 'Bitcoin'],
  status: 'approved',
  volume: 50000000,
  liquidity: 10000000,
  traderCount: 234,
  closingDate: '2025-12-31T23:59:59Z',
  creatorFeePercent: 2.0,
  feesEarnedSats: 25000,
  feesClaimedSats: 0,
}

const mockWizardDraft = {
  currentStep: 3,
  step1: { title: 'Bitcoin Price Market', categoryTags: ['Crypto'] },
  step2: { type: 'yesno' },
  step3: null,
}

// Empty states
const mockEmptyMarkets = []
const mockEmptyStats = {
  activeMarketsCount: 0,
  resolvedMarketsCount: 0,
  pendingMarketsCount: 0,
  rejectedMarketsCount: 0,
  cancelledMarketsCount: 0,
  totalVolumeSats: 0,
  totalFeesEarnedSats: 0,
  totalFeesClaimedSats: 0,
  totalFeesUnclaimedSats: 0,
}
```

---

## Notes for Test Implementation

- Mock callbacks to verify correct arguments
- Test tab switching preserves state
- Verify pagination resets when filters change
- Test shimmer animation renders (CSS class present)
- **Always test empty states** — No markets, no volume data
- Test validation errors banner displays correctly
