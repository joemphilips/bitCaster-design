# Market Creation Wizard

## Overview
7-step wizard for creating new prediction markets. Accessed from the "Create Market" / "Add Market" button on the Market Creation & Management dashboard. This section runs without the application shell (`shell: false`) and uses its own full-screen layouts.

## Steps
1. **Oracle Check** (full-screen, no step indicator) — Choose existing oracle announcement or become an oracle
2. **Get Started** (indicator: 1/6) — Select market outcome type: Yes/No or Categorical
3. **Basic Info** (indicator: 2/6) — Upload thumbnail, enter title, select category tags, set closing date, add answer URLs
4. **Outcomes** (indicator: 3/6) — Define outcome labels and thumbnails
5. **Market Settings** (indicator: 4/6) — Configure sell/buy/win fee percentages
6. **Market Preview** (indicator: 5/6) — Review estimated initial cost and worst-case loss
7. **Review & Create** (indicator: 6/6) — Write description with optional AI generation, review summary, submit

## Components
- `MarketCreationWizard` — Root component managing wizard state and step transitions
- `OracleCheck` — Step 1: Oracle selection gate
- `GetStarted` — Step 2: Outcome type selection
- `BasicInfo` — Step 3: Title, tags, dates, URLs, thumbnail upload
- `OutcomesStep` — Step 4: Outcome definition (categorical only)
- `MarketSettings` — Step 5: Fee configuration
- `MarketPreviewStep` — Step 6: Cost preview and confirmation
- `ReviewAndCreate` — Step 7: Description editor and final submission
- `StepIndicator` — 6-step progress bar (visible on steps 2-7 only)

## Step Indicator
- Visible on steps 2-7 (step 1 is a full-screen gate)
- Completed steps: green checkmark
- Active step: blue circle with step number
- Future steps: grey circle with step number
- Not clickable (navigation via back/next buttons only)

## Navigation
- Step 1: Forward only (or exit to Settings)
- Steps 3-7: Back button available
- Forward via "Next" or "Continue" buttons
- Final step: "Create Market" green primary button

## Configuration
- shell: false
