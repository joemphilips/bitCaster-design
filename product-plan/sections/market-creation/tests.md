# Test Instructions: Market Creation Wizard

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the 7-step wizard: Oracle Check (full-screen gate), Get Started, Basic Info, Outcomes, Market Settings, Market Preview, and Review & Create. Steps 2-7 show the step indicator (6 visible steps); step 1 is a standalone full-screen decision gate.

## User Flow Tests

### Flow 1: Create Yes/No Market (No Existing Oracle)
**Success Path:**
- Steps:
  1. Oracle Check → select "No / I want to be an oracle" → click "Continue"
  2. Get Started → confirm intent → click "Continue"
  3. Basic Info → enter title "Will Bitcoin exceed $150K by 2027?" → add tags "crypto", "bitcoin" → set closing date → click "Continue"
  4. Outcomes → select "Yes/No" type → click "Continue" (no additional fields for Yes/No)
  5. Market Settings → set creator fee 2% → set initial liquidity 100,000 sats → click "Continue"
  6. Market Preview → review cost calculation → click "Continue"
  7. Review & Create → write description → click "Create Market"
- Expected: onCreateMarket called with all wizard state captured

**Failure Path:**
- Step 3: Submit with empty title
- Expected: Validation error "Title is required" shown, Continue button disabled

### Flow 2: Create Categorical Market
**Success Path:**
- Steps: Proceed through Oracle Check and Get Started → Basic Info → select "Categorical" in Outcomes step → add at least 2 outcome labels → optionally set initial probabilities → Continue
- Expected: Outcomes saved with labels and normalized probabilities, flow continues to Market Settings

**Failure Path:**
- Add only 1 outcome to categorical market → click Continue
- Expected: Validation error "Add at least 2 outcomes", Continue disabled

### Flow 3: Use Existing Oracle Announcement
**Success Path:**
- Steps: Oracle Check → select "Yes, use existing oracle" → pick an announcement from the list → click "Continue"
- Expected: onAnnouncementSelect called with announcement id, wizard continues to Get Started with oracle locked in

**Failure Path:**
- Setup: No oracle announcements exist
- Expected: Announcement list shows empty state message, Cannot continue without selecting one

### Flow 4: Oracle Check - Exit to Settings
- Steps: Oracle Check → select "No / I want to be an oracle" → click "Go to Settings" link
- Expected: onExit called, user navigated to Settings page (Nostr/Oracle section)

### Flow 5: Back Navigation Preserves State
**Success Path:**
- Steps: Complete steps 2-5 → click Back from step 5 → Back → Back
- Expected: Returns to step 2, all data entered in steps 2-5 is still present

### Flow 6: Market Preview Cost Calculation
**Success Path:**
- Setup: Initial liquidity 100,000 sats, creator fee 2%
- Steps: Navigate to Market Preview step → observe cost breakdown
- Expected: Displayed cost reflects liquidity amount plus any platform fees, onCalculatePreview called

### Flow 7: Review & Create with AI Description
**Success Path:**
- Steps: On Review & Create → click "Generate with AI" button
- Expected: onGenerateDescription called, textarea fills with AI-generated text (or loading state shown)

## Empty State Tests
- No oracle announcements available when "Yes, use existing" selected → empty list with explanatory message, Continue blocked
- Outcomes step with categorical type and 0 outcomes added → "Add at least 2 outcomes" validation, Continue disabled
- Market Preview with 0 liquidity → cost shows 0, warning that market needs liquidity to be tradeable

## Component Tests
- OracleCheckGate: two radio-style options, Continue disabled until one selected
- StepIndicator: shows steps 2-7 as 6 steps (step 1 is not counted in indicator), active step highlighted
- BasicInfoForm: title input has max length counter, tag multi-select, date picker rejects past dates
- OutcomesForm: radio group for market type, categorical shows "Add Outcome" button and sortable outcome list
- OutcomeRow: label input, probability input (optional), delete button; at least 2 rows required
- ProbabilityNormalizer: when sum != 100%, "Normalize" button appears and redistributes evenly
- MarketSettingsForm: fee input accepts 0-100 with step 0.1, liquidity input accepts positive integers
- ReviewAndCreate: rich text editor functional, "Generate with AI" button visible, "Create Market" button

## Edge Cases
- Step 1 (Oracle Check) is full-screen with no step indicator shown
- Step indicator numbers 1-6 map to wizard steps 2-7
- Probabilities auto-normalize on clicking Normalize: e.g., {60, 60} becomes {50, 50}
- Fee validation: entering 101 shows error "Fee cannot exceed 100%", entering negative shows error
- Very long market title (>100 chars) shows character count warning
- Closing date set to today shows warning "Market will close very soon"
- Back from step 2 (Get Started) returns to step 1 (Oracle Check)
- Wizard draft auto-saved to local storage between steps

## Accessibility
- Step indicator announces current step to screen reader ("Step 2 of 6: Get Started")
- All form inputs have labels
- Date picker keyboard navigable
- "Add Outcome" button and outcome delete buttons have descriptive aria-labels
- Rich text editor in Review step is keyboard accessible
- "Create Market" button shows loading state with aria-busy during submission

## Sample Test Data
```typescript
const mockWizardDraft = {
  currentStep: 1 as const,
  lastModified: "2026-02-21T10:00:00Z",
  stepOracleCheck: null,
  stepGetStarted: null,
  stepBasicInfo: null,
  stepOutcomes: null,
  stepMarketSettings: null,
  stepMarketPreview: null,
  stepReviewAndCreate: null
};

const mockCompletedDraft = {
  currentStep: 7 as const,
  lastModified: "2026-02-21T10:30:00Z",
  stepOracleCheck: { selection: "no-existing-oracle" as const },
  stepGetStarted: { confirmed: true },
  stepBasicInfo: {
    title: "Will Bitcoin exceed $150K by 2027?",
    categoryTags: ["crypto", "bitcoin"],
    closingDate: "2027-01-01T00:00:00Z",
    answerUrls: ["https://coinmarketcap.com/currencies/bitcoin/"]
  },
  stepOutcomes: { type: "yesno" as const },
  stepMarketSettings: {
    creatorFeePercent: 2,
    initialLiquiditySats: 100000
  },
  stepMarketPreview: {
    estimatedCostSats: 100000,
    platformFeeSats: 0
  },
  stepReviewAndCreate: {
    description: "This market resolves YES if Bitcoin's USD price exceeds $150,000 at any point before January 1, 2027, as reported by CoinMarketCap."
  }
};

const mockCategoricalDraft = {
  ...mockWizardDraft,
  stepOutcomes: {
    type: "categorical" as const,
    outcomes: [
      { id: "lakers", label: "LA Lakers", initialProbability: 25 },
      { id: "celtics", label: "Boston Celtics", initialProbability: 35 },
      { id: "warriors", label: "Golden State Warriors", initialProbability: 20 },
      { id: "other", label: "Other", initialProbability: 20 }
    ]
  }
};

const mockAnnouncements = [
  {
    id: "ann-1",
    eventId: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    oraclePubkey: "npub1satoshi000000000000000000000000000000000000000000000000000000",
    description: "Will Bitcoin exceed $150K?",
    resolutionDate: "2026-06-30T23:59:59Z",
    outcomes: ["Yes", "No"]
  },
  {
    id: "ann-2",
    eventId: "b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3",
    oraclePubkey: "npub1satoshi000000000000000000000000000000000000000000000000000000",
    description: "2026 NBA Finals winner",
    resolutionDate: "2026-06-25T23:59:59Z",
    outcomes: ["Lakers", "Celtics", "Warriors", "Other"]
  }
];

const mockEmptyAnnouncements: typeof mockAnnouncements = [];
```
