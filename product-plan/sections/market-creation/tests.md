# Market Creation Wizard — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — Full Wizard (Success)
1. Render `MarketCreationWizard` with `draft.currentStep: 1`.
2. **Step 1 (Oracle Check)**: Verify oracle check options are shown. Select "Yes, use existing" → select an oracle announcement → click Continue → `onNext` fires.
3. **Step 2 (Get Started)**: Verify step indicator shows 1/6. Select "Yes/No" outcome type → `onOutcomeTypeSelect('yesno')` fires. Click Next → `onNext` fires.
4. **Step 3 (Basic Info)**: Verify step indicator shows 2/6. Enter title "Will BTC hit $200k?" → `onTitleChange` fires. Select category tags → `onCategoryTagsChange` fires. Set closing date → `onClosingDateChange` fires. Click Next → `onNext` fires.
5. **Step 4 (Outcomes)**: For Yes/No, this step may be simplified. Click Next → `onNext` fires.
6. **Step 5 (Market Settings)**: Verify step indicator shows 4/6. Set buy fee to 1% → `onBuyFeeChange(1)` fires. Click Next → `onNext` fires.
7. **Step 6 (Market Preview)**: Verify estimated initial cost and worst-case loss are displayed. Confirm → `onConfirmPreview(true)` fires. Click Next → `onNext` fires.
8. **Step 7 (Review & Create)**: Verify step indicator shows 6/6. Enter description → `onDescriptionChange` fires. Click "Create Market" → `onCreateMarket` fires.

### Flow 2 — Oracle Check: Use Existing Announcement
1. At step 1, verify oracle announcements list is displayed.
2. Select an announcement → `onAnnouncementSelect` fires with the announcement ID.
3. Click Continue → `onNext` fires.

### Flow 3 — Oracle Check: Become Oracle
1. At step 1, select "No / I want to be an oracle" → `onOracleChoiceSelect('become-oracle')` fires.
2. Verify info card explaining oracle configuration is displayed.
3. Verify "Go to Settings" option is available.
4. Click "Go to Settings" → `onExit` fires.
5. Alternatively, click Continue if already configured → `onNext` fires.

### Flow 4 — Categorical Outcomes
1. At step 2, select "Categorical" → `onOutcomeTypeSelect('categorical')` fires.
2. At step 4 (Outcomes), verify outcome list is rendered.
3. Click "Add Outcome" → `onAddOutcome` fires. A new outcome row appears.
4. Enter label "Yankees" → `onOutcomeLabelChange(outcomeId, 'Yankees')` fires.
5. Set probability to 30 → `onOutcomeProbabilityChange(outcomeId, 30)` fires.
6. Add another outcome. Verify normalized probability preview updates.
7. Click remove on an outcome → `onRemoveOutcome(outcomeId)` fires.

### Failure — Submit with Empty Title
1. At step 3, leave title field empty.
2. Click Next → validation error appears for the title field.
3. Verify error message indicates title is required.

### Failure — No Outcomes Defined for Categorical
1. At step 4 with `outcomeType: 'categorical'`, ensure no outcomes are added.
2. Click Next → validation error appears indicating at least one outcome is required.

---

## Empty State Tests

- **No oracle announcements**: When `oracleAnnouncements` is empty, show a message indicating no announcements are available, with the "become oracle" option still accessible.

---

## Component Interaction Tests

- **Step indicator rendering**: Step indicator shows steps 1-6 (mapped from wizard steps 2-7). Completed steps display green checkmark. Active step displays blue circle with number. Future steps display grey circle with number.
- **Back navigation**: At step 3, clicking Back → `onBack` fires, returning to step 2. Step indicator updates to show step 1/6 as active.
- **Description: "Generate with AI" button**: On step 7, clicking "Generate with AI" → `onGenerateDescription` fires with context object containing `{ title, categoryTags, outcomeType }`. The response populates the description editor.
- **Thumbnail upload**: At step 3, clicking the thumbnail upload area → `onThumbnailUpload` fires.
- **Answer URLs**: At step 3, adding/removing answer URLs → `onAnswerUrlsChange` fires with the updated URL array.
- **Category tags**: At step 3, selecting/deselecting category tags → `onCategoryTagsChange` fires with the updated tag array.
- **Fee inputs**: At step 5, changing sell/buy/win fees fires `onSellFeeChange`, `onBuyFeeChange`, `onWinFeeChange` respectively with the percentage value.
- **Calculate preview**: At step 6, clicking "Calculate Preview" → `onCalculatePreview` fires, populating estimated initial cost and worst-case loss.

---

## Edge Cases

- **Step 1 is not numbered**: The Oracle Check step has no step indicator. The 6-step indicator begins at wizard step 2.
- **Yes/No market skips detailed outcomes**: When outcome type is `yesno`, step 4 may show simplified content (no outcome definition cards).
- **Probability normalization**: When multiple outcomes are defined, probabilities should sum to 100%. The UI shows a normalized preview.
- **Wizard draft persistence**: When `draft` has pre-filled steps, the wizard resumes from `draft.currentStep` with all previous step data intact.
- **Exit from oracle check**: Clicking "Go to Settings" exits the wizard entirely via `onExit`.

---

## Accessibility Checks

- Step indicator uses ordered list semantics with `aria-current="step"` on the active step.
- Form inputs (title, description, fees) have associated labels.
- "Create Market" button has descriptive accessible name.
- Back and Next buttons have `aria-label="Go back"` and `aria-label="Continue to next step"`.
- Oracle announcement list items are keyboard-selectable with `aria-selected`.
- Outcome rows have remove buttons with `aria-label="Remove outcome [label]"`.
- "Generate with AI" button has descriptive label.
- Validation errors are linked to their fields via `aria-describedby` and announced via `aria-live="polite"`.

---

## Sample Test Data

```typescript
import type {
  MarketCreationWizardProps,
  WizardDraft,
  OracleAnnouncement,
} from './types'

const sampleAnnouncements: OracleAnnouncement[] = [
  {
    id: 'ann-1',
    eventId: 'abc123hex',
    oraclePubkey: 'npub1oracle...',
    description: 'BTC price on 2026-12-31',
    resolutionDate: '2026-12-31T23:59:59Z',
    outcomes: ['Above $200k', 'Below $200k'],
  },
  {
    id: 'ann-2',
    eventId: 'def456hex',
    oraclePubkey: 'npub1oracle...',
    description: '2026 World Series winner',
    resolutionDate: '2026-11-01T00:00:00Z',
    outcomes: ['Yankees', 'Dodgers', 'Astros', 'Other'],
  },
]

const emptyDraft: WizardDraft = {
  currentStep: 1,
  lastModified: '2026-03-01T10:00:00Z',
  stepOracleCheck: null,
  stepGetStarted: null,
  stepBasicInfo: null,
  stepOutcomes: null,
  stepMarketSettings: null,
  stepMarketPreview: null,
  stepReviewAndCreate: null,
}

const midWizardDraft: WizardDraft = {
  currentStep: 3,
  lastModified: '2026-03-01T10:05:00Z',
  stepOracleCheck: {
    choice: 'existing',
    selectedAnnouncementId: 'ann-1',
  },
  stepGetStarted: {
    outcomeType: 'yesno',
  },
  stepBasicInfo: null,
  stepOutcomes: null,
  stepMarketSettings: null,
  stepMarketPreview: null,
  stepReviewAndCreate: null,
}

const sampleCategoryTags = ['crypto', 'sports', 'politics', 'entertainment']

const sampleProps: MarketCreationWizardProps = {
  draft: emptyDraft,
  oracleAnnouncements: sampleAnnouncements,
  categoryTags: sampleCategoryTags,
}

const sampleMidWizardProps: MarketCreationWizardProps = {
  draft: midWizardDraft,
  oracleAnnouncements: sampleAnnouncements,
  categoryTags: sampleCategoryTags,
}
```
