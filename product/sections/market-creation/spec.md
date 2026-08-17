# Market Creation Wizard Specification

## Overview
A 6-step wizard for creating new prediction markets. Accessed from the "Create Market" button on the Market Creation & Management dashboard. The wizard guides the user through oracle configuration, market type selection, basic info, outcomes, initial liquidity, and final review.

## User Flows

### Step 1: Oracle Check (full-screen, no step indicator)
- User chooses between using an existing oracle announcement or becoming their own oracle
- **"Yes, use existing"**: Shows list of oracle announcements (Nostr kind 88 events). Selecting one and clicking Continue shows a TBD placeholder.
- **"No / I want to be an oracle"**: Shows info card explaining oracle configuration. User can go to Settings or continue if already configured.

### Steps 2-6: Main Wizard (with 5-step indicator)
2. **Get Started** (display 1/5): Choose market outcome type (Yes/No, Categorical, or Numeric)
3. **Basic Info** (display 2/5): Upload thumbnail, enter title, select category tags, set closing date
4. **Outcomes** (display 3/5): Define outcome labels. Numeric markets configure LO bound, HI bound, unit, and precision.
5. **Initial Liquidity** (display 4/5): Set initial liquidity in sats to seed the market (quick-amount buttons: 1k, 5k, 10k, 50k)
6. **Review & Create** (display 5/5): Write description, review full summary including liquidity, submit

## UI Requirements
- Step 1 is a full-screen gate with no step indicator
- Steps 2-6 use a shared layout with back button and 5-step progress indicator
- Step indicator: completed=green checkmark, active=blue circle+number, future=grey
- Dark theme with slate backgrounds matching the design system
- Form inputs: dark fields with subtle borders and helper text
- Yes/No outcomes use canonical outcome names. Registration does not set a price.
- Outcomes: card rows with thumbnail upload, label, and delete button
- "Create Market" green primary button on the final step

## Navigation
- Back button available on steps 3-6
- Forward via "Next" or "Continue" buttons
- Step indicator shows progress but is not clickable

## Configuration
- shell: false
