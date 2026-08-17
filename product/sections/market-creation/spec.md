# Market Creation Wizard Specification

## Overview
A 5-step creation flow for new prediction markets. Accessed from the "Create Market" button on the Market Creation & Management dashboard. The flow registers market metadata, oracle details, and canonical outcomes. Funding is an optional handoff after registration.

## User Flows

### Step 1: Oracle Check (full-screen, no step indicator)
- User chooses between using an existing oracle announcement or becoming their own oracle
- **"Yes, use existing"**: Shows list of oracle announcements (Nostr kind 88 events). Selecting one and clicking Continue shows a TBD placeholder.
- **"No / I want to be an oracle"**: Shows info card explaining oracle configuration. User can go to Settings or continue if already configured.

### Steps 2-5: Main Wizard (with 4-step indicator)
2. **Get Started** (display 1/4): Choose market outcome type (Yes/No or Categorical)
3. **Basic Info** (display 2/4): Upload thumbnail, enter title, select category tags, set closing date
4. **Outcomes** (display 3/4): Define canonical Yes/No or categorical outcome labels.
5. **Review & Create** (display 4/4): Write description, review metadata and outcomes, submit

After registration succeeds, show the creator an optional post-create bot funding handoff. It offers No liquidity, Minimal (10,000 sats), Standard (100,000 sats), Deep (500,000 sats), and Custom. The handoff uses the separate durable LIQUIDITY flow. Any user can repeat this flow from market detail. It is not restricted to the creator.

## UI Requirements
- Step 1 is a full-screen gate with no step indicator
- Steps 2-5 use a shared layout with back button and 4-step progress indicator
- Step indicator: completed=green checkmark, active=blue circle+number, future=grey
- Dark theme with slate backgrounds matching the design system
- Form inputs: dark fields with subtle borders and helper text
- Yes/No outcomes use canonical outcome names. Registration does not set a price.
- Outcomes: card rows with thumbnail upload, label, and delete button
- A newly registered market is Open and shows No trades yet until a confirmed trade exists.
- "Create Market" green primary button on the final step

## Navigation
- Back button available on steps 3-5
- Forward via "Next" or "Continue" buttons
- Step indicator shows progress but is not clickable

## Configuration
- shell: false
