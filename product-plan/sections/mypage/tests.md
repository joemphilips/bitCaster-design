# MyPage — Test Instructions

These test instructions are **framework-agnostic**. Adapt them to your testing setup.

---

## Unit Tests

### ProfileHeader Component

**Avatar display:**
- Shows user avatar image
- Shows default avatar if none set
- Avatar is clickable

**Avatar upload:**
- Clicking avatar opens file picker
- Accepts image files only
- Shows preview after selection
- Calls `onAvatarChange` with file

### PLCard Component

**Display:**
- Shows time scale label (24h, 7d, etc.)
- Shows P/L amount with ₿ prefix
- Positive P/L has green color
- Negative P/L has red color
- Zero shows neutral color

**Format:**
- Large values abbreviated (₿12.5K)
- Includes + or - prefix

### ExpandableSection Component

**Toggle behavior:**
- Initially collapsed or expanded per prop
- Clicking header toggles state
- Chevron icon rotates on expand
- Content hidden when collapsed

**Header:**
- Shows section title
- Shows count badge if provided

### PositionsSection Component

**Tabs:**
- Active and Closed tabs visible
- Active is default
- Clicking tab switches view
- Active tab has visual indicator

**Positions list:**
- Shows positions matching current tab
- Empty state when no positions

### PositionItem Component

**Display:**
- Shows market title (truncated if long)
- Shows shares count and side
- Shows current value in ₿
- Shows P/L amount and percentage

**Sell button:**
- Visible only for Active positions
- Calls `onSell` with position data
- Hidden for Closed positions

### OrderItem Component

**Display:**
- Date formatted correctly
- Type (Deposit/Withdrawal) with icon
- Amount in ₿ format
- Status badge (Pending, Completed, Failed)

**TX ID:**
- Truncated with ellipsis
- Copy button visible
- Clicking copy → clipboard

**Lightning invoice:**
- Only shown if present
- Truncated with ellipsis
- Copy button works

### MyMarketsSection Component

**Market items:**
- Shows thumbnail and title
- Shows status badge
- Shows volume and fees earned

**Actions:**
- View button navigates to detail
- Manage button navigates to creator dashboard

---

## Integration Tests

### Page Load

**Initial state:**
- Profile header displays user info
- P/L cards show correct values
- Sections collapsed or expanded per default

### Positions Flow

**Viewing positions:**
- Active tab shows active positions
- Switching to Closed shows resolved positions
- Position count matches data

**Sell action:**
- Clicking Sell on active position opens confirmation
- Confirming executes sell
- Position updates after sell

### Order History

**Viewing orders:**
- Orders listed in chronological order
- Copy buttons work correctly
- Status badges reflect actual status

### My Markets

**Navigation:**
- View navigates to market detail page
- Manage navigates to creator dashboard
- Links work correctly

---

## Edge Cases

**Empty states:**
- No positions: "You don't have any positions yet"
- No orders: "No transaction history"
- No created markets: "You haven't created any markets"

**Data variations:**
- Very long market titles truncate
- Very large P/L values format correctly
- Multiple Lightning invoices display correctly

**Upload:**
- Invalid file type rejected
- Large file handled (or rejected with message)
- Upload failure shows error
