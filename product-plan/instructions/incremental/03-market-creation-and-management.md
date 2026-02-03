# Milestone 3: Market Creation & Management

## Objective
Build the creator dashboard with analytics and market creation wizard.

## Prerequisites
- Milestone 1 (Foundation) complete
- Milestone 2 (Market Discovery) complete (recommended, not required)

## Reference Files
- `sections/market-creation-and-management/README.md` — Overview and design intent
- `sections/market-creation-and-management/types.ts` — TypeScript interfaces
- `sections/market-creation-and-management/sample-data.json` — Sample data
- `sections/market-creation-and-management/tests.md` — Test requirements
- `sections/market-creation-and-management/components/` — Reference implementations

---

## Tasks

### 3.1 Three-Tab Layout

Create a tabbed interface with a special CTA-styled third tab.

**Tabs:**
1. **Overview** (default) — Dashboard with stats and market list
2. **Analytics** — Volume charts over time
3. **Add Market** — Styled as a filled CTA button, not a standard tab

The "Add Market" tab should visually stand out (e.g., filled primary color, "+" icon).

### 3.2 Overview Tab

#### Stat Cards Row
Display 4 summary cards:
- **Active Markets**: Count of live markets
- **Resolved Markets**: Count of completed markets
- **Total Volume**: Sum of all trading volume (₿ format)
- **Creator Fees**: Total fees earned (₿ format)

#### Market List
Paginated table/list of user's markets:

| Thumbnail | Title | Status | Volume | End Date | Fees | Action |
|-----------|-------|--------|--------|----------|------|--------|
| [img] | Will BTC... | Active | ₿0.5K | Jan 31 | ₿125 | View Details |

- Pagination controls (Previous, page numbers, Next)
- "View Details" navigates to market detail page

### 3.3 Analytics Tab

#### Volume Chart
- Line or bar chart showing volume over time
- Y-axis: Volume in sats
- X-axis: Time periods

#### Controls
- **Aggregate/Per-market toggle**: Show combined volume or separate lines per market
- **Time scale selector**: Daily | Weekly | Monthly | Yearly

### 3.4 Market Creation Wizard

5-step wizard with persistent state. User can navigate back/forward without losing data.

#### Step 1: Basic Info
- **Thumbnail upload**: Image file picker with preview
- **Title**: Text input (required, max 200 chars)
- **Category tags**: Multi-select from predefined categories
- **End date/time**: DateTime picker (must be in future)
- **Answer URLs**: List of URLs for resolution sources (add/remove)

#### Step 2: Market Outcomes
- **Type selection**: Radio buttons for Yes/No, Numeric, Categorical

**Yes/No:**
- No additional configuration needed
- Shows preview: Yes vs No

**Numeric:**
- Min/max range inputs
- Outcomes auto-generated and sorted

**Categorical:**
- Add outcomes dynamically
- Each outcome has:
  - Description (required)
  - Thumbnail (optional)
  - Initial probability (optional, default: even distribution)
- Show normalized probability preview (must sum to 100%)

#### Step 3: Market Parameters
- **Liquidity**: Number input for initial sats deposit
- **Sell fee %**: Fee on sell transactions
- **Buy fee %**: Fee on buy transactions
- **Win fee %**: Fee on winnings at resolution

#### Step 4: Review
Summary of all settings:
- Title, category, end date
- Market type and outcomes
- Liquidity and fee structure
- **Initial Cost / Worst Case Loss**: `liquidity + 1000` sats (placeholder calculation)

Edit buttons to jump back to specific steps.

#### Step 5: Final Review
- **Rich text editor**: Description field with formatting (bold, italic, lists, links)
- **"Generate with AI" button**: Placeholder for AI description generation
- **Submit button**: Creates market

#### Wizard Navigation
- Step indicator showing current position (1-2-3-4-5)
- "Back" button (disabled on step 1)
- "Next" button (validates current step)
- "Submit" button on final step

#### Error Handling
- Per-field validation with inline errors
- On submit failure: Error summary banner at top
- Preserve form state on error

#### Success Flow
On successful creation:
1. Show success message
2. Navigate to the new market's detail page

---

## Component Checklist

- [ ] `MarketCreationDashboard` — Main container with tabs
- [ ] `StatCard` — Individual stat display
- [ ] `MarketRow` / `MarketTable` — Market list item
- [ ] `Pagination` — Page navigation controls
- [ ] `VolumeChart` — Analytics chart component
- [ ] `WizardContainer` — Multi-step form wrapper
- [ ] `StepIndicator` — Progress visualization
- [ ] `BasicInfoStep` — Step 1 form
- [ ] `OutcomesStep` — Step 2 form
- [ ] `ParametersStep` — Step 3 form
- [ ] `ReviewStep` — Step 4 summary
- [ ] `FinalReviewStep` — Step 5 with rich editor

---

## Test Points

See `tests.md` for detailed requirements. Key scenarios:
- Tab switching works correctly
- Stats display correct values
- Market list paginates properly
- Wizard state persists across navigation
- Validation blocks progression on invalid data
- Successful submission navigates to detail

---

## Next Steps

After completing Market Creation, proceed to:
→ `04-mypage.md`
