# Test Instructions: Market Creation & Management

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the creator dashboard: stats, market list, volume analytics, and the 5-step market creation wizard.

## User Flow Tests

### Flow 1: View Dashboard Stats
**Success Path:**
- Setup: dashboardStats with activeMarketsCount: 3, totalVolumeSats: 1583100
- Expected: Stats cards display "3 Active", "₿0.01583100" volume

### Flow 2: Browse Market List
**Success Path:**
- Steps: View Overview tab → see paginated market list → click "View Details"
- Expected: onViewDetails called with marketId

### Flow 3: Claim Fees from Resolved Market
**Success Path:**
- Steps: Find resolved market with unclaimed fees → click "Claim Fees"
- Expected: onClaimFees called with marketId

### Flow 4: View Analytics
**Success Path:**
- Steps: Switch to Analytics tab → view aggregate chart → switch to per-market → change to weekly
- Expected: Chart updates, onTabChange/onChartModeChange/onTimeScaleChange called

### Flow 5: Create Market via Wizard
**Success Path:**
- Steps: Click "Add Market" → fill basic info → select outcome type → set fees → review → submit
- Expected: onCreateMarket called with wizard data

**Failure Path:**
- Empty title → validation error shown, Next button disabled

## Empty State Tests
- No created markets → "No markets yet. Create your first market!" with CTA
- No volume data → Chart shows empty state with guidance message

## Component Tests
- StatCard renders label and formatted value correctly
- MarketRow shows thumbnail, title, status badge, volume, end date, and fees
- Pagination disables Previous on page 1, Next on last page
- VolumeChart aggregate/per-market toggle changes chart mode
- Wizard step indicator highlights current step

## Edge Cases
- Market with very long title truncates correctly in MarketRow
- All market statuses display correctly: active, resolved, refunded
- Pagination with many markets shows correct page range
- Categorical outcome probabilities normalize automatically

## Accessibility
- Wizard steps navigable by keyboard
- Error messages associated with form fields via aria-describedby
- Status badges have text content (not color only) to convey meaning

## Sample Test Data
```typescript
const mockStats = {
  activeMarketsCount: 3,
  resolvedMarketsCount: 2,
  totalVolumeSats: 1583100,
  totalFeesEarnedSats: 30512
};

const mockEmptyStats = {
  activeMarketsCount: 0,
  resolvedMarketsCount: 0,
  totalVolumeSats: 0,
  totalFeesEarnedSats: 0
};

const mockMarkets = [
  {
    id: "mkt-001",
    title: "Will Bitcoin reach $100K by end of 2026?",
    status: "active",
    volumeSats: 847500,
    closingDate: "2026-12-31T23:59:59Z",
    creatorFeeSats: 16950,
    unclaimedFees: false
  },
  {
    id: "mkt-002",
    title: "NBA Finals 2026 winner",
    status: "resolved",
    volumeSats: 412300,
    closingDate: "2026-06-20T23:59:59Z",
    creatorFeeSats: 8246,
    unclaimedFees: true
  }
];

const mockWizardDraft = {
  basicInfo: {
    title: "Will Bitcoin exceed $150K by 2027?",
    categoryTags: ["crypto", "bitcoin"],
    closingDate: "2027-01-01T00:00:00Z",
    answerUrls: []
  },
  outcomes: { type: "yesno" },
  parameters: {
    initialLiquiditySats: 100000,
    creatorFeePercent: 2,
    platformFeePercent: 0.5
  }
};
```
