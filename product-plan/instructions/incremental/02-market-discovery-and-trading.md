# Milestone 2: Market Discovery & Trading

## Objective
Build the core marketplace where users browse and trade prediction markets.

## Prerequisites
- Milestone 1 (Foundation) complete
- Design tokens and shell in place
- Routing configured

## Reference Files
- `sections/market-discovery-and-trading/README.md` — Overview and design intent
- `sections/market-discovery-and-trading/types.ts` — TypeScript interfaces
- `sections/market-discovery-and-trading/sample-data.json` — Sample markets data
- `sections/market-discovery-and-trading/tests.md` — Test requirements
- `sections/market-discovery-and-trading/components/` — Reference implementations

---

## Tasks

### 2.1 Tag Navigation

Create a horizontal scrollable tag bar at the top of the page.

**Tags:**
- Meta tags: `Trending` (default selected), `Popular`, `New`
- Category tags: `Sports`, `Politics`, `Crypto`, `Entertainment`, `Science`, `Business`, `Weather`

**Behavior:**
- Single-select only (clicking a tag deselects others)
- Trending is pre-selected on page load
- Horizontal scroll with overflow on narrow viewports
- Visual indicator for selected tag (filled background)

### 2.2 Filter Controls

Add a collapsible filter row below the tag bar.

**Toggle:**
- Filter icon button in the tag bar area
- Clicking reveals/hides filter row

**Filters:**
- **Market Type**: Dropdown with "All", "Yes/No", "Categorical", "2D"
- **Volume Range**: Min/max inputs or slider
- **Closing Date**: Date range or "Closing Soon" toggle

### 2.3 Market Cards

Implement cards for all three market types. **Critical:** All cards must be exactly 280px tall.

#### Yes/No Market Card
```
┌─────────────────────────────┐
│  [Image]                    │
│  Title/Question             │
│  Chance: 67.5%              │
│  [Buy Yes] [Buy No]         │
│  ──────────────────────     │
│  ₿0.05  💧 120  👥 45  ♡ 12 │
└─────────────────────────────┘
```

#### Categorical Market Card
```
┌─────────────────────────────┐
│  [Image]                    │
│  Title/Question             │
│  ┌─────────────────────┐    │
│  │ Chiefs   28%  [Y][N]│    │
│  │ 49ers    25%  [Y][N]│    │
│  │ Ravens   22%  [Y][N]│    │
│  │ Bills    15%  [Y][N]│    │
│  └── scrollable ───────┘    │
│  ──────────────────────     │
│  ₿0.12  💧 250  👥 89  ♡ 34 │
└─────────────────────────────┘
```

#### 2D Market Card
```
┌─────────────────────────────┐
│  Base Question              │
│  and...                     │
│  Secondary Question         │
│  ┌─────┬─────┬─────┐        │
│  │     │ Yes │ No  │        │
│  ├─────┼─────┼─────┤        │
│  │ Yes │ 35% │ 15% │        │
│  │ No  │ 20% │ 30% │        │
│  └─────┴─────┴─────┘        │
│  ──────────────────────     │
│  ₿0.08  💧 180  👥 67  ♡ 23 │
└─────────────────────────────┘
```

#### Metrics Footer
Always visible at bottom of card:
- Volume: ₿ prefix with amber color
- Liquidity: droplet icon
- Traders: users icon
- Like: heart icon with count

### 2.4 Inline Trading

When user clicks Buy Yes/No button, card transforms to trading overlay.

**Trading Overlay:**
- Covers entire card (not just content area)
- Shows: selected outcome, current odds
- Predicted odds after trade
- Amount input
- Quick amount buttons: 100, 500, 1000, 5000 sats
- BUY button (primary)
- × Cancel button (returns to normal)

**Critical:** Card size must NOT change during transformation.

### 2.5 Secondary Markets (2D)

Markets with `secondaryMarkets` array show an "and..." link.

**Behavior:**
- Clicking "and..." expands card height
- Shows list of secondary markets
- Each secondary market shows its question
- Clicking a secondary → navigates to that market's detail page
- Expanded height: 280px + 40px per secondary market

### 2.6 Infinite Scroll

- Load initial batch of markets (e.g., 12)
- On scroll near bottom, load more
- Show loading indicator during fetch
- Handle empty state when no more markets

---

## Component Checklist

- [ ] `TagBar` — Horizontal tag navigation
- [ ] `FilterControls` — Collapsible filter row
- [ ] `MarketCard` — Unified card component handling all types
- [ ] `TradingOverlay` — Inline trading transformation
- [ ] `MetricsFooter` — Volume, liquidity, traders, likes
- [ ] `SecondaryMarketsList` — Expandable 2D market list
- [ ] `MarketGrid` — Grid layout with infinite scroll

---

## Test Points

See `tests.md` for detailed test requirements. Key scenarios:
- Tag selection changes displayed markets
- Filter controls filter correctly
- All market types render at 280px height
- Trading overlay covers entire card
- Cancel returns card to normal state
- Secondary markets expand correctly
- Infinite scroll loads more markets

---

## Next Steps

After completing Market Discovery, proceed to:
→ `03-market-creation-and-management.md`
