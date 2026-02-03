# Milestone 5: Market Detail

## Objective
Build the comprehensive market detail page with trading panel, price charts, activity feed, and support for all market types including resolved markets and 2D conditional probability visualization.

## Prerequisites
- Milestone 1 (Foundation) complete
- Milestone 2 (Market Discovery) recommended
- Understanding of AMM trading model

## Reference Files
- `sections/market-detail/README.md` — Overview and design intent
- `sections/market-detail/types.ts` — TypeScript interfaces
- `sections/market-detail/sample-data.json` — Sample data for all market types
- `sections/market-detail/tests.md` — Test requirements
- `sections/market-detail/components/` — Reference implementations

---

## Tasks

### 5.1 Market Header

Top section with market info and key metrics.

#### Elements
- **Title/Question**: Large, prominent text
- **Image**: Header background with gradient overlay (if imageUrl exists)
- **Category tags**: Below title, styled pills
- **Close date**: With countdown timer if closing within 7 days
- **Share button**: Copy link or open share dialog
- **Creator info**: Avatar, name, reputation score, markets created

#### Metrics Footer (matching MarketCard style)
Horizontal bar at bottom of header:
- Volume: ₿ format with amber color
- Liquidity: droplet icon
- Traders: users icon
- Like button: heart icon with count, clickable

### 5.2 Trading Panel

**Desktop**: Right sidebar (sticky)
**Tablet**: Top of content (collapsible)
**Mobile**: Sticky bottom bar with "Trade" button → opens full-screen modal

#### Yes/No Markets
Two large buttons side by side:
```
┌─────────────┐ ┌─────────────┐
│    YES      │ │     NO      │
│   67.5%     │ │   32.5%     │
└─────────────┘ └─────────────┘
```
Selected button highlighted with border/background.

#### Categorical Markets
Vertical list of outcomes:
```
┌─────────────────────────────────┐
│ Chiefs         28.5%   [Yes][No]│
│ 49ers          24.2%   [Yes][No]│
│ Ravens         22.1%   [Yes][No]│
│ Bills          15.3%   [Yes][No]│
│ Other           9.9%   [Yes][No]│
└─────────────────────────────────┘
```

#### 2D Markets
Grid layout with two-tone gradient cells:

```
         │   Yes    │    No    │
─────────┼──────────┼──────────┤
   Yes   │   35%    │   15%    │
         │ (green)  │ (g→r)    │
─────────┼──────────┼──────────┤
   No    │   20%    │   30%    │
         │ (r→g)    │  (red)   │
─────────┴──────────┴──────────┘
```

**Cell colors:**
- Yes/Yes: solid emerald (`bg-emerald-500`)
- Yes/No: diagonal gradient emerald → rose (135deg)
- No/Yes: diagonal gradient rose → emerald (135deg)
- No/No: solid red (`bg-red-500`)
- Selected state: increased intensity + border

#### Trade Form
After selecting an outcome:
- **Amount input**: Number field for sats
- **Quick buttons**: 100, 500, 1000, 5000
- **Trade preview**:
  - Predicted odds after trade
  - Price impact percentage
  - Potential payout
  - Creator fee
  - Platform fee
  - Total cost
- **Comment textarea**: Optional, 280 char limit, placeholder "Share your reasoning..."
- **Confirm Trade**: Primary button
- **Cancel**: Secondary/text button

### 5.3 Price Chart

#### Header
Display current odds as the section header (NOT "Price Chart"):
- Yes/No: `67.5%`
- Categorical: `Chiefs 28.5%` (leading outcome)
- 2D: Leading cell percentage
- Resolved: `Resolved: Yes` (or winning outcome)

#### Chart
- Line chart with price history data
- Y-axis: 0-100%
- X-axis: Time based on selected timeframe

#### Timeframe Selector
Horizontal button group: `1H` | `24H` | `7D` | `30D` | `ALL`

#### Chart Type Toggle
Toggle button: `Price` / `Volume`

#### Comment Bubbles (Price mode only)
Speech bubble icons overlaid on chart:
- **Position**: X = timestamp relative to visible range
- **Size**: 24-40px based on like count (more likes = larger)
- **Opacity**: 0.4-1.0 based on like count
- **Tooltip on hover**: Username, content preview, like count
- Only show comments within visible timeframe

#### Categorical Multi-line
For categorical markets:
- Multiple lines, one per outcome
- Color-coded legend
- Toggleable legend items

#### 2D Cell Selector
For 2D markets:
- Dropdown to select which cell's history to display
- Options: "Yes-Yes", "Yes-No", "No-Yes", "No-No"

#### 2D Conditional Probability Toggle
For Yes/No × Yes/No markets only:

Toggle buttons: `[All]` `[Dim1=Yes]` `[Dim1=No]` `[Dim2=Yes]` `[Dim2=No]`

- **All**: Standard cell selector dropdown
- **Fixing a dimension**: Shows conditional probability chart
  - E.g., fixing "BTC=Yes" shows P(ETH=Yes|BTC=Yes) and P(ETH=No|BTC=Yes)
  - Two lines on chart with legend
- **Subtitle**: "Conditional on [label]" displayed below current percentage
- **Handle division by zero**: Skip points where denominator is zero

### 5.4 Resolution Info

Section showing resolution details.

```
┌─────────────────────────────────────────────┐
│ Resolution Details                          │
├─────────────────────────────────────────────┤
│ Criteria: BTC price on Coinbase at 12:00 UTC│
│ Source: Oracle (Chainlink)                  │
│ Resolution Date: January 31, 2025           │
│ Status: Open                                │
└─────────────────────────────────────────────┘
```

For resolved markets, also show:
- **Final Outcome**: Prominently displayed
- Status shows "Resolved"

### 5.5 Recent Trades

Activity section showing trade history.

#### Trade Item
```
User123  bought Yes  ₿500  @67%  2 min ago
```

- Anonymized username
- Side (Yes/No or outcome name)
- Amount in sats
- Price at execution
- Relative timestamp

#### Infinite Scroll
- Load more on scroll or "Load more" button
- Loading indicator

### 5.6 Related Markets

Horizontal scrollable carousel of related markets.

- Based on shared category tags
- Mini cards with: title, current odds, volume
- Clicking navigates to that market

### 5.7 Comments Section

**Bottom of page**, read-only display.

Comments are posted ONLY through the Trading Panel (with a trade).

#### Comment Item
```
┌─────────────────────────────────────────────┐
│ [Avatar] Username            Dec 15, 2:30pm │
│ This is my analysis of why I think...       │
│                                    ♡ 12     │
└─────────────────────────────────────────────┘
```

- User avatar and name
- Timestamp
- Content
- Like button with count

#### Empty State
"No comments yet. Place a trade to leave a comment!"

#### Infinite Scroll
- Load more on scroll
- Loading indicator

### 5.8 Resolved Market View

When `market.resolution.status === 'resolved'`:

#### Visual Changes
- **RESOLVED badge**: Top of header with CheckCircle icon
- **Final outcome text**: E.g., "Resolved: Yes" prominently displayed
- **Date display**: "Resolved on [date]" replaces countdown timer

#### Layout Changes
- **No Trading Panel**: Hide both desktop sidebar and mobile sticky bar
- **Single-column layout**: Remove sidebar grid, content fills width
- **Resolution Info**: Move to immediately after header (above chart)

#### Behavior Changes
- Comments section read-only (no comment textarea anywhere)
- Activity feed and related markets remain visible

### 5.9 Responsive Layout

#### Desktop (≥ 1024px)
```
┌─────────────────────────────────────────────────┐
│                    Header                       │
├────────────────────────────┬────────────────────┤
│        Chart               │   Trading Panel    │
│        Resolution          │   (sticky)         │
│        Trades              │                    │
│        Related             │                    │
│        Comments            │                    │
└────────────────────────────┴────────────────────┘
```

#### Tablet (768-1023px)
```
┌─────────────────────────────────────────────────┐
│                    Header                       │
├─────────────────────────────────────────────────┤
│          Trading Panel (collapsible)            │
├─────────────────────────────────────────────────┤
│                    Chart                        │
│                    Resolution                   │
│                    Trades                       │
│                    Related                      │
│                    Comments                     │
└─────────────────────────────────────────────────┘
```

#### Mobile (< 768px)
```
┌─────────────────────────────────────────────────┐
│                    Header                       │
├─────────────────────────────────────────────────┤
│                    Chart                        │
│                    Resolution                   │
│                    Trades                       │
│                    Related                      │
│                    Comments                     │
├─────────────────────────────────────────────────┤
│               [Trade Button]                    │  ← Sticky bottom
└─────────────────────────────────────────────────┘

Tapping "Trade" opens full-screen modal with Trading Panel
```

---

## Component Checklist

- [ ] `MarketDetail` — Main page container
- [ ] `MarketHeader` — Title, image, tags, metrics
- [ ] `TradingPanel` — Outcome selection and trade form
- [ ] `TradingModal` — Mobile full-screen trading
- [ ] `PriceChart` — Line chart with timeframe/type toggles
- [ ] `CommentBubbles` — Chart overlay component
- [ ] `ConditionalProbabilityToggle` — 2D dimension fixing
- [ ] `ResolutionInfo` — Resolution details section
- [ ] `ActivityFeed` — Recent trades list
- [ ] `RelatedMarkets` — Horizontal carousel
- [ ] `CommentSection` — Comments display
- [ ] `CommentItem` — Single comment

---

## Test Points

See `tests.md` for detailed requirements. Key scenarios:

**Trading:**
- Yes/No button selection works
- Categorical outcome selection works
- 2D cell selection works with gradients
- Amount input validates correctly
- Trade preview calculates correctly
- Confirm posts trade and optional comment
- Cancel clears selection

**Charts:**
- Timeframe changes update chart data
- Price/Volume toggle switches chart type
- Comment bubbles positioned correctly
- Categorical shows multi-line with legend
- 2D cell selector changes displayed history
- Conditional probability toggle works
- Division by zero handled gracefully

**Resolved Markets:**
- RESOLVED badge visible
- Trading panel hidden
- Single-column layout
- Resolution info above chart
- Comments read-only

**Responsive:**
- Desktop shows two-column layout
- Tablet shows collapsible trading panel
- Mobile shows sticky Trade button
- Trade modal opens on mobile tap

---

## Completion

After completing Market Detail, all 5 milestones are complete. Verify:

- [ ] All routes navigable
- [ ] All market types display correctly
- [ ] Trading works for all types
- [ ] Charts render with all features
- [ ] Resolved markets handled correctly
- [ ] Responsive on all viewports
