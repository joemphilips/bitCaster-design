# Market Detail — Test Instructions

These test instructions are **framework-agnostic**. Adapt them to your testing setup.

---

## Unit Tests

### MarketHeader Component

**Display:**
- Title renders prominently
- Background image with gradient (if imageUrl present)
- Category tags displayed as pills
- Close date with countdown (if within 7 days)
- Creator avatar, name, reputation visible

**Metrics footer:**
- Volume in ₿ format (amber color)
- Liquidity with droplet icon
- Traders with users icon
- Like button with count

**Interaction:**
- Share button calls `onShare`
- Like button toggles like state
- Creator click calls `onCreatorClick`

### TradingPanel Component

**Yes/No markets:**
- Two large buttons showing percentages
- Clicking Yes selects it with visual highlight
- Clicking No selects it with visual highlight
- Selection clears when Cancel clicked

**Categorical markets:**
- Vertical list of all outcomes with odds
- Yes/No buttons per outcome
- Clicking selects that outcome + side

**2D markets:**
- Grid layout with all cells
- Yes/Yes cell: solid emerald background
- Yes/No cell: diagonal gradient emerald→rose
- No/Yes cell: diagonal gradient rose→emerald
- No/No cell: solid red background
- Clicking cell selects it

**Trade form (after selection):**
- Amount input accepts numbers
- Quick buttons (100, 500, 1000, 5000) set amount
- Trade preview shows:
  - Predicted odds
  - Price impact
  - Potential payout
  - Fees
- Comment textarea optional, 280 char limit
- Confirm Trade calls `onTradeConfirm`
- Cancel calls `onTradeClear`

### PriceChart Component

**Header:**
- Shows current percentage (Yes/No: yes odds)
- Categorical: shows leading outcome
- Resolved: shows "Resolved: [outcome]"

**Chart:**
- Renders line chart with data
- Y-axis 0-100%
- Data points connected

**Timeframe selector:**
- 1H, 24H, 7D, 30D, ALL buttons
- Clicking changes timeframe
- Active button highlighted
- Calls `onTimeframeChange`

**Price/Volume toggle:**
- Defaults to Price
- Toggle switches chart type
- Volume shows bar chart

**Comment bubbles (price mode):**
- Bubbles positioned by timestamp
- Size 24-40px based on like count
- Opacity 0.4-1.0 based on like count
- Tooltip on hover shows username, content, likes
- Only visible in price mode, not volume

**Categorical multi-line:**
- Multiple lines, one per outcome
- Color-coded legend
- Legend toggleable

**2D cell selector:**
- Dropdown with cell options
- Changing selection updates chart
- Calls `onChartCellChange`

**Conditional probability toggle (Yes/No × Yes/No):**
- Buttons: All, Dim1=Yes, Dim1=No, Dim2=Yes, Dim2=No
- "All" shows cell selector dropdown
- Fixing dimension shows two conditional probability lines
- "Conditional on [label]" subtitle appears
- Calls `onFixDimension`

**Division by zero:**
- Points where denominator is 0 are skipped
- Chart renders without those points

### ResolutionInfo Component

**Display:**
- Resolution criteria text
- Source (oracle, manual, etc.)
- Resolution date
- Status badge

**Resolved state:**
- Final outcome prominently displayed
- Status shows "Resolved"

### ActivityFeed Component

**Trade items:**
- User (anonymized), side, amount, price, timestamp
- Relative time format ("2 min ago")
- Side color-coded (yes=green, no=red)

**Infinite scroll:**
- "Load more" button or scroll trigger
- Loading indicator during fetch
- Calls `onLoadMoreTrades`

### CommentSection Component

**Display:**
- Comments sorted by timestamp
- Each shows avatar, username, content, timestamp
- Like button per comment with count

**Empty state:**
- "No comments yet. Place a trade to leave a comment!"

**Read-only:**
- No comment input field
- Comments posted via trading panel only

**Infinite scroll:**
- Load more behavior
- Calls `onLoadMoreComments`

### RelatedMarkets Component

**Display:**
- Horizontal scrollable list
- Mini cards with title, odds, volume

**Interaction:**
- Clicking card calls `onRelatedMarketClick`

---

## Integration Tests

### Open Market Flow

**Page load:**
- Header displays correctly
- Trading panel visible (desktop sidebar)
- Chart renders with data
- Comments and trades load

**Trading flow:**
1. Select outcome (Yes/No)
2. Enter amount
3. Preview updates
4. Add optional comment
5. Confirm trade
6. Trade posts, comment appears in section

### Resolved Market View

**Visual changes:**
- RESOLVED badge visible at top
- Trading panel hidden
- Single-column layout
- Resolution info above chart

**Behavior:**
- No Trade button on mobile
- Comments section read-only
- Chart still functional

### 2D Market Flow

**Grid display:**
- All 4 cells visible with correct gradients
- Odds displayed in each cell

**Trading:**
- Click cell to select
- Trade form appears
- Confirm completes trade

**Conditional probability:**
- Click "BTC=Yes" button
- Chart shows two lines (ETH outcomes)
- "Conditional on BTC=Yes" subtitle appears
- Click "All" to return to normal

### Responsive Behavior

**Desktop:**
- Two-column layout
- Sidebar sticky on scroll

**Tablet:**
- Single column
- Trading panel collapsible

**Mobile:**
- Sticky "Trade" button at bottom
- Tapping opens full-screen modal
- Modal contains full trading panel
- Close modal returns to page

---

## Edge Cases

**Empty states:**
- No trades: "No trades yet"
- No comments: "No comments yet. Place a trade..."
- No related markets: Section hidden or "No related markets"

**Error handling:**
- Trade failure: Error message, form state preserved
- Chart data load failure: Retry option

**Data variations:**
- Very long title: Truncates appropriately
- No market image: Default background
- Many categorical outcomes: Scrollable
- 2D with categorical base: Larger grid renders

**Conditional probability edge cases:**
- All probability in one cell: Other cells show 0%
- Division by zero: Points skipped gracefully
- Toggle while loading: Handles correctly
