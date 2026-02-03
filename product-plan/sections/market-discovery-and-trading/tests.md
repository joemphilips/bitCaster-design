# Market Discovery & Trading — Test Instructions

These test instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, etc.).

---

## Unit Tests

### TagBar Component

**Selection behavior:**
- Renders all meta tags and category tags
- Clicking a tag selects it and deselects others
- "Trending" is selected by default on initial render
- Selected tag has visual indicator (e.g., filled background)
- Calls `onTagChange` callback with selected tag

**Accessibility:**
- Tags are keyboard navigable
- Active tag has appropriate aria attributes

### FilterControls Component

**Toggle behavior:**
- Filter row is hidden by default
- Clicking filter icon reveals filter row
- Clicking again hides filter row

**Filter functionality:**
- Market Type dropdown shows all options
- Volume range accepts min/max values
- Filters call `onFilterChange` with filter state

### MarketCard Component

**Card types:**
- Renders Yes/No market with chance percentage and buttons
- Renders Categorical market with scrollable outcome list
- Renders 2D market with grid layout
- All card types maintain 280px height

**Yes/No markets:**
- Displays title, chance percentage, Yes/No buttons
- Clicking Buy Yes opens trading overlay with "Yes" selected
- Clicking Buy No opens trading overlay with "No" selected

**Categorical markets:**
- Displays all outcomes in scrollable list
- Each outcome shows name and percentage
- Clicking Yes/No on outcome opens trading overlay

**2D markets:**
- Displays base and secondary questions
- Grid shows all cells with percentages
- Cells have correct gradient colors
- Clicking cell opens trading overlay

**Metrics footer:**
- Always visible when not in trading mode
- Shows volume with ₿ prefix
- Shows liquidity, traders, likes

### TradingOverlay Component

**Display:**
- Covers entire card area
- Shows selected outcome
- Shows current odds and predicted odds

**Interaction:**
- Amount input accepts numbers
- Quick buttons (100, 500, 1000, 5000) set amount
- BUY button calls `onTrade` callback
- Cancel (×) returns card to normal view

**Size constraint:**
- Card dimensions do not change when overlay is shown

### SecondaryMarketsList

**Expansion:**
- "and..." link visible on markets with secondaryMarkets
- Clicking expands card to show secondary list
- Expanded height equals 280px + 40px × number of secondaries
- Clicking again collapses

**Navigation:**
- Clicking secondary market calls `onSecondaryClick`

---

## Integration Tests

### Market Discovery Page

**Initial load:**
- Page loads with Trending tag selected
- Markets grid displays markets
- Filter row is hidden

**Tag navigation:**
- Selecting "Sports" shows only sports markets
- Selecting "Popular" shows popular markets
- Markets update when tag changes

**Filtering:**
- Opening filter row shows controls
- Setting "Yes/No" type filter shows only Yes/No markets
- Multiple filters combine correctly

**Trading flow:**
- Clicking Buy Yes on a market shows trading overlay
- Entering amount and clicking BUY executes trade
- After trade, overlay closes and card updates

**Infinite scroll:**
- Scrolling to bottom loads more markets
- Loading indicator visible during fetch
- New markets append to existing list

---

## Visual/Snapshot Tests

**Card consistency:**
- All three market types at exactly 280px height
- Trading overlay covers full card
- Gradient colors correct on 2D cells

**Responsive:**
- Tag bar scrolls horizontally on narrow viewport
- Cards resize appropriately
- Filter row adapts to screen width

---

## Edge Cases

**Empty states:**
- No markets match filter: "No markets found"
- No markets in category: Appropriate message

**Error handling:**
- Trade failure shows error message
- Network error during load shows retry option

**Data variations:**
- Very long market titles truncate correctly
- Markets with no image show placeholder
- Categorical with many outcomes scrolls correctly
