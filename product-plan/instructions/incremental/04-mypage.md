# Milestone 4: MyPage

## Objective
Build the personal dashboard with positions, orders, and created markets.

## Prerequisites
- Milestone 1 (Foundation) complete
- Milestone 2 (Market Discovery) recommended for context

## Reference Files
- `sections/mypage/README.md` — Overview and design intent
- `sections/mypage/types.ts` — TypeScript interfaces
- `sections/mypage/sample-data.json` — Sample data
- `sections/mypage/tests.md` — Test requirements
- `sections/mypage/components/` — Reference implementations

---

## Tasks

### 4.1 Profile Header

Top section with user info and P/L summary.

#### Avatar
- Displays user avatar image
- Clickable to upload new image (PNG)
- Shows upload progress/success feedback
- Default avatar if none set

#### P/L Summary Cards
Row of cards showing profit/loss at different time scales:

| Time Scale | P/L Amount |
|------------|------------|
| 24h | +₿1,250 |
| 7d | +₿8,500 |
| 30d | -₿2,100 |
| All-time | +₿45,000 |

- Green for positive P/L
- Red for negative P/L
- Cards are selectable to toggle the active view (optional)

### 4.2 Positions Section

Expandable section showing trading positions.

#### Section Header
- "Positions" title
- Expand/collapse chevron
- Count badge (e.g., "12")

#### Sub-tabs
- **Active**: Positions in open markets
- **Closed**: Positions in resolved markets

#### Position Item
```
┌─────────────────────────────────────────────────┐
│ [Market Image] Title: Will Bitcoin reach $100K? │
│ Shares: 150 Yes                                 │
│ Value: ₿12,500   P/L: +₿2,300 (+18%)           │
│                                        [Sell]   │
└─────────────────────────────────────────────────┘
```

- Market title (links to detail)
- Shares owned and side (Yes/No)
- Current value in sats
- P/L amount and percentage
- **Sell button** (Active tab only)

### 4.3 Order History Section

Expandable section showing deposits and withdrawals.

#### Section Header
- "Order History" title
- Expand/collapse chevron

#### Order Item
```
┌─────────────────────────────────────────────────────────┐
│ Dec 15, 2024  Deposit   ₿50,000   Completed             │
│ TX: abc123...def789                                     │
│ Lightning: lnbc500u1p3...                               │
└─────────────────────────────────────────────────────────┘
```

- Date and time
- Type: Deposit or Withdrawal
- Amount (₿ format)
- Status: Pending, Completed, Failed
- Transaction ID (truncated with copy button)
- Lightning invoice (if applicable, truncated with copy button)

### 4.4 My Markets Section

Expandable section listing markets created by the user.

#### Section Header
- "My Markets" title
- Expand/collapse chevron
- Count badge

#### Market Item
```
┌─────────────────────────────────────────────────┐
│ [Thumbnail] Super Bowl Winner 2025              │
│ Status: Active   Volume: ₿12.5K   Fees: ₿650   │
│                              [View] [Manage]    │
└─────────────────────────────────────────────────┘
```

- Thumbnail and title
- Status badge (Active, Pending, Resolved)
- Volume (₿ format)
- Fees earned (₿ format)
- View → navigates to market detail
- Manage → navigates to creator dashboard

---

## Component Checklist

- [ ] `MyPage` — Main container
- [ ] `ProfileHeader` — Avatar and name
- [ ] `PLCard` — Single P/L time scale card
- [ ] `PLSummary` — Row of P/L cards
- [ ] `ExpandableSection` — Collapsible container
- [ ] `PositionsSection` — Positions with tabs
- [ ] `PositionItem` — Single position row
- [ ] `OrderHistorySection` — Orders list
- [ ] `OrderItem` — Single order row
- [ ] `MyMarketsSection` — Created markets list
- [ ] `MyMarketItem` — Single market row

---

## Test Points

See `tests.md` for detailed requirements. Key scenarios:
- Avatar upload changes image
- P/L cards display correct values with colors
- Sections expand and collapse
- Active/Closed tabs filter positions
- Sell button only on Active positions
- Order details display correctly
- Copy buttons work for TX ID and invoice
- My Markets links navigate correctly

---

## Next Steps

After completing MyPage, proceed to:
→ `05-market-detail.md`
