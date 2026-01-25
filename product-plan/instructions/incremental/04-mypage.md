# Milestone 4: MyPage

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-3 complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the MyPage feature — a personal dashboard where users view their trading positions, transaction history, and created markets.

## Overview

MyPage is the user's personal hub showing their trading activity and account information. It features a profile header with avatar and profit/loss summary, plus expandable sections for positions, order history, and created markets.

**Key Functionality:**
- View profile with avatar and P/L metrics across time scales (24h, 7d, 30d, All-time)
- Upload/change avatar image
- Browse trading positions with Active/Closed tabs
- Sell active positions or claim payouts from winning closed positions
- View order history showing deposits and withdrawals
- Browse markets the user has created
- Claim creator fees from resolved markets

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/mypage/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/mypage/components/`:

- `MyPage.tsx` — Main page with profile header and expandable sections
- `ProfileHeader.tsx` — Avatar and P/L summary cards
- `PLCard.tsx` — Individual P/L metric card
- `ExpandableSection.tsx` — Collapsible section wrapper
- `PositionsSection.tsx` — Positions with Active/Closed tabs
- `PositionRow.tsx` — Individual position row with Sell/Claim actions
- `OrderHistorySection.tsx` — Deposit/withdrawal history
- `OrderHistoryRow.tsx` — Individual order row
- `CreatedMarketsSection.tsx` — Markets created by user
- `CreatedMarketRow.tsx` — Individual created market row

### Data Layer

The components expect these data shapes:

```typescript
interface UserProfile {
  userId: string
  displayName: string
  avatarUrl: string | null
  registeredDate: string
}

interface PLSummary {
  last24h: { amountSats: number; percentChange: number }
  last7d: { amountSats: number; percentChange: number }
  last30d: { amountSats: number; percentChange: number }
  allTime: { amountSats: number; percentChange: number }
}

interface Position {
  id: string
  marketId: string
  marketTitle: string
  marketImageUrl: string
  side: 'yes' | 'no'
  outcomeId?: string
  outcomeLabel?: string
  shares: number
  avgBuyPrice: number
  currentPrice: number
  currentValueSats: number
  profitLossSats: number
  profitLossPercent: number
  status: 'active' | 'closed'
  closedDate?: string
  acquiredDate: string
}

interface OrderHistoryItem {
  id: string
  type: 'deposit' | 'withdrawal'
  amountSats: number
  date: string
  status: 'pending' | 'completed' | 'failed'
  txId: string | null
  lightningInvoice: string | null
  failureReason?: string
}

interface CreatedMarket {
  id: string
  title: string
  imageUrl: string
  status: 'pending' | 'approved' | 'rejected' | 'resolved' | 'cancelled'
  createdDate: string
  volume: number
  creatorFeesEarned: number
  creatorFeePercent: number
}
```

### Callbacks

Wire up these user actions:

| Callback | Description | Event Triggered |
|----------|-------------|-----------------|
| `onAvatarUpload` | User uploads new avatar | `UserProfileUpdated` event |
| `onSellPosition` | User sells an active position | `Sold` event |
| `onViewPosition` | User clicks position row | Navigate to market |
| `onClaimPayout` | User claims from winning position | `PayoutClaimed` event |
| `onPositionsTabChange` | User switches Active/Closed | UI state change |
| `onViewMarket` | User clicks created market | Navigate to market |
| `onClaimCreatorFees` | User claims creator fees | `CreatorFeeClaimed` event |
| `onViewOrder` | User clicks order row | Show order details |

### Empty States

Implement empty state UI for when no records exist:

- **No positions:** Show message "No active positions" or "No closed positions" with icon
- **No order history:** Show message "No transactions yet"
- **No created markets:** Show message "You haven't created any markets yet"

The provided components include empty state designs.

## Files to Reference

- `product-plan/sections/mypage/README.md` — Feature overview
- `product-plan/sections/mypage/tests.md` — Test-writing instructions
- `product-plan/sections/mypage/components/` — React components
- `product-plan/sections/mypage/types.ts` — TypeScript interfaces
- `product-plan/sections/mypage/sample-data.json` — Test data
- `product-plan/sections/mypage/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: View P/L Summary

1. User navigates to MyPage
2. User sees profile header with avatar and name
3. User sees P/L cards: 24h, 7 days, 30 days, All Time
4. **Outcome:** User understands their trading performance at a glance

### Flow 2: Upload Avatar

1. User clicks on their avatar image
2. File picker opens
3. User selects a PNG/JPEG image
4. **Outcome:** Avatar updates, profile shows new image

### Flow 3: Sell an Active Position

1. User expands Positions section
2. User sees Active tab with their open positions
3. User clicks "Sell" button on a position
4. **Outcome:** Position sold, balance updates, position moves to Closed tab

### Flow 4: Claim Payout from Winning Position

1. User clicks Closed tab in Positions section
2. User sees a closed position with positive value
3. User clicks "Claim" button
4. **Outcome:** Payout claimed, balance updates

### Flow 5: Review Order History

1. User expands Order History section (collapsed by default)
2. User sees list of deposits and withdrawals
3. User sees status badges (completed, pending, failed)
4. User sees Lightning invoice for relevant transactions
5. **Outcome:** User can audit their transaction history

### Flow 6: Manage Created Markets

1. User expands My Markets section (collapsed by default)
2. User sees their created markets with status badges
3. For resolved markets with fees, user clicks "Claim Fees"
4. **Outcome:** Creator fees claimed, balance updates

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Profile header displays with correct P/L metrics
- [ ] Avatar upload works
- [ ] Positions section shows Active/Closed tabs
- [ ] Selling positions works
- [ ] Claiming payouts works
- [ ] Order history displays with status and details
- [ ] Created markets section displays
- [ ] Claiming creator fees works
- [ ] Empty states display when no data
- [ ] Expandable sections collapse/expand properly
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile
