# Market Creation Flow — Test Plan

These tests are framework-agnostic. Adapt them to the selected UI test tool.

## User Flow Tests

### Flow 1 — Register a Yes/No market

1. Render `MarketCreationWizard` with `draft.currentStep: 1`.
2. Select an oracle path and continue.
3. Verify the Get Started indicator shows 1/4.
4. Select Yes/No. Verify `onOutcomeTypeSelect('yesno')` fires.
5. Complete Basic Info and verify only market metadata is collected.
6. Verify the Outcomes step shows canonical `Yes` and `No` outcomes.
7. Verify Review & Create shows metadata, outcomes, and description only.
8. Click Create Market and verify `onCreateMarket` fires.
9. Set `creationSucceeded: true` and verify the post-create funding handoff appears.
10. Verify the handoff offers No liquidity, Minimal (10,000 sats), Standard (100,000 sats), Deep (500,000 sats), and Custom.

### Flow 2 — Register a categorical market

1. Select Categorical on Get Started.
2. Add at least two outcomes and enter canonical labels.
3. Verify Review & Create lists the labels without price or funding fields.
4. Verify registration does not set a price.

### Flow 3 — Optional post-create funding

1. Render `PostCreateFundingHandoff` with a registered market ID.
2. Select No liquidity and continue. Verify the callback receives `none` and no amount.
3. Select a preset, choose an amount, and continue. Verify the callback receives `preset` and that amount.
4. Select Custom amount, enter a positive amount, and continue. Verify the callback receives `custom` and that amount.
5. Verify the handoff text says that the same durable flow can run again from market detail.

## Failure Tests

- An empty title prevents the flow from advancing.
- A categorical market with fewer than two labelled outcomes cannot advance.
- A preset or custom funding choice with no positive amount cannot continue.

## Component Interaction Tests

- The Oracle Check has no numbered indicator.
- The main indicator has four entries: Get Started, Basic Info, Outcomes, and Review & Create.
- Back navigation is available on steps 3-5.
- Review & Create has no probability, numeric, initial funding, or liquidity field.
- Registration callback receives metadata, oracle details, and outcomes only.
- A newly registered market is Open and displays No trades yet until a confirmed trade exists.
- Funding completion is a separate callback. It does not claim that registration created liquidity.

## Accessibility Checks

- The step indicator uses ordered-list semantics with `aria-current="step"` on the active step.
- Form inputs have associated labels.
- The Create Market button has a descriptive accessible name.
- Back and Next buttons have accessible names.
- Funding choices are keyboard-selectable radio controls.
- Funding amount input is labelled and has a positive-value validation state.

## Sample Test Data

```typescript
const emptyDraft: WizardDraft = {
  currentStep: 1,
  lastModified: '2026-03-01T10:00:00Z',
  stepOracleCheck: null,
  stepGetStarted: null,
  stepBasicInfo: null,
  stepOutcomes: null,
  stepReviewAndCreate: null,
}
```
