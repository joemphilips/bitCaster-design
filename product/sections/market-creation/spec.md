# Market Creation Wizard Specification

## Overview
A 7-step wizard for creating new prediction markets. Accessed from the "Create Market" button on the Market Creation & Management dashboard. The wizard guides the user through oracle configuration, market type selection, basic info, outcomes, fee settings, cost preview, and final review.

## User Flows

### Step 1: Oracle Check (full-screen, no step indicator)
- User chooses between using an existing oracle announcement or becoming their own oracle
- **"Yes, use existing"**: Shows list of oracle announcements (Nostr kind 88 events). Selecting one and clicking Continue shows a TBD placeholder.
- **"No / I want to be an oracle"**: Shows info card explaining oracle configuration. User can go to Settings or continue if already configured.

### Steps 2-7: Main Wizard (with 6-step indicator)
2. **Get Started** (display 1/6): Choose market outcome type (Yes/No or Categorical)
3. **Basic Info** (display 2/6): Upload thumbnail, enter title, select category tags, set closing date, add answer URLs
4. **Outcomes** (display 3/6): Define outcomes with labels, thumbnails, probabilities. Yes/No markets skip this step's outcome definition.
5. **Market Settings** (display 4/6): Configure sell/buy/win fees (no liquidity field)
6. **Market Preview** (display 5/6): Review estimated initial cost and worst-case loss
7. **Review & Create** (display 6/6): Write description, review full summary, submit

## UI Requirements
- Step 1 is a full-screen gate with no step indicator
- Steps 2-7 use a shared layout with back button and 6-step progress indicator
- Step indicator: completed=green checkmark, active=blue circle+number, future=grey
- Dark theme with slate backgrounds matching the design system
- Form inputs: dark fields with subtle borders and helper text
- Fees: split into Sell/Buy/Win with percentage display
- Outcomes: card rows with thumbnail upload, label, probability, delete button
- "Create Market" green primary button on the final step

## Navigation
- Back button available on steps 3-7
- Forward via "Next" or "Continue" buttons
- Step indicator shows progress but is not clickable

## Configuration
- shell: false
