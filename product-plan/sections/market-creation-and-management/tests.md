# Market Creation & Management — Test Instructions

These test instructions are **framework-agnostic**. Adapt them to your testing setup.

---

## Unit Tests

### Tab Navigation

**Display:**
- Renders Overview, Analytics, and Add Market tabs
- Add Market styled differently (CTA appearance)
- Overview is default active tab

**Interaction:**
- Clicking Analytics switches to analytics view
- Clicking Add Market opens creation wizard
- Active tab has visual indicator

### StatCard Component

**Rendering:**
- Displays label and value
- Formats large numbers correctly (₿12.5K)
- Shows appropriate icon

### MarketRow Component

**Display:**
- Shows thumbnail, title, status, volume, end date, fees
- Status has appropriate color/badge
- "View Details" button visible

**Interaction:**
- Clicking View Details calls `onViewDetails`
- Clicking row navigates to market detail

### Pagination Component

**Display:**
- Shows current page indicator
- Previous/Next buttons
- Page number buttons (limited range)

**Interaction:**
- Previous disabled on page 1
- Next disabled on last page
- Clicking page number navigates

### VolumeChart Component

**Rendering:**
- Displays chart with data
- Shows legend when per-market mode
- Time scale selector visible

**Toggles:**
- Aggregate/Per-market toggle changes chart mode
- Time scale buttons change x-axis

### Creation Wizard

**Step 1 - Basic Info:**
- Thumbnail upload accepts images
- Title input has max length validation
- Category tag selector allows multi-select
- End date picker requires future date
- Answer URLs can be added/removed

**Step 2 - Market Outcomes:**
- Type selection (Yes/No, Numeric, Categorical)
- Yes/No shows no additional fields
- Numeric shows min/max inputs
- Categorical allows adding outcomes
- Probability preview updates and normalizes

**Step 3 - Market Parameters:**
- Liquidity input accepts positive numbers
- Fee inputs accept percentages (0-100)
- Validation on reasonable ranges

**Step 4 - Review:**
- Summary shows all entered data
- Cost calculation displayed
- Edit buttons jump to respective steps

**Step 5 - Final Review:**
- Rich text editor functional
- "Generate with AI" button visible
- Submit button enabled when valid

**Wizard Navigation:**
- Step indicator shows current step
- Back button goes to previous step
- Next validates and advances
- State preserved on navigation

---

## Integration Tests

### Overview Tab

**Initial load:**
- Stats display correct values
- Market list shows first page
- Pagination reflects total count

**Market list:**
- Changing page updates displayed markets
- View Details navigates correctly

### Analytics Tab

**Chart display:**
- Chart renders with data
- Toggle changes chart mode
- Time scale changes update chart

### Creation Flow

**Full wizard completion:**
1. Fill Basic Info → Next succeeds
2. Configure outcomes → Next succeeds
3. Set parameters → Next succeeds
4. Review shows correct summary → Next succeeds
5. Add description → Submit succeeds
6. Redirects to new market detail page

**Validation flow:**
- Missing required field shows error
- Invalid date shows error
- Errors clear on correction

**State preservation:**
- Go forward to step 3
- Go back to step 1
- Data in steps 1-3 preserved

---

## Edge Cases

**Empty states:**
- No markets created: "You haven't created any markets yet"
- Analytics with no data: Appropriate empty chart

**Validation:**
- End date in past: Blocked with error
- Negative liquidity: Blocked with error
- Probabilities don't sum to 100: Warning shown

**Error handling:**
- Submit failure: Error banner with retry
- Network error: Appropriate feedback

**Large data:**
- Many markets: Pagination handles correctly
- Many outcomes: Scrollable list
