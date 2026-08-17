# Market Creation Wizard

## Overview
5-step creation flow for new prediction markets. Accessed from the "Create Market" / "Add Market" button on the Market Creation & Management dashboard. This section runs without the application shell (`shell: false`) and uses its own full-screen layouts.

## Steps
1. **Oracle Check** (full-screen, no step indicator) — Choose existing oracle announcement or become an oracle
2. **Get Started** (indicator: 1/4) — Select market outcome type: Yes/No or Categorical
3. **Basic Info** (indicator: 2/4) — Upload thumbnail, enter title, select category tags, and set closing date
4. **Outcomes** (indicator: 3/4) — Define canonical outcome labels and thumbnails
5. **Review & Create** (indicator: 4/4) — Write a description, review metadata and outcomes, and submit

After registration succeeds, show `PostCreateFundingHandoff` to the creator. It offers No liquidity, Minimal (10,000 sats), Standard (100,000 sats), Deep (500,000 sats), and Custom. It passes the selected action to the separate durable LIQUIDITY flow. It does not change market registration. Any user can repeat this flow from market detail. It is not restricted to the creator.

## Components
- `MarketCreationWizard` — Root component managing wizard state and step transitions
- `OracleCheck` — Step 1: Oracle selection gate
- `GetStarted` — Step 2: Outcome type selection
- `BasicInfo` — Step 3: Title, tags, dates, URLs, thumbnail upload
- `OutcomesStep` — Step 4: Outcome definition (Yes/No or categorical)
- `ReviewAndCreate` — Step 5: Description editor and final submission
- `PostCreateFundingHandoff` — Optional post-registration funding handoff
- `StepIndicator` — 4-step progress bar (visible on steps 2-5 only)

## Step Indicator
- Visible on steps 2-5 (step 1 is a full-screen gate)
- Completed steps: green checkmark
- Active step: blue circle with step number
- Future steps: grey circle with step number
- Not clickable (navigation via back/next buttons only)

## Navigation
- Step 1: Forward only (or exit to Settings)
- Steps 3-5: Back button available
- Forward via "Next" or "Continue" buttons
- Final step: "Create Market" green primary button

## Configuration
- shell: false
