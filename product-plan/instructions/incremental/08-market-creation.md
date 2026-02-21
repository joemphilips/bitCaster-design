# Milestone 8: Market Creation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Market Creation feature — a 7-step wizard for publishing new prediction markets, beginning with an oracle configuration gate.

## Overview

The Market Creation Wizard is rendered **without the application shell** (no top nav, no bottom bar). It is reached from `/creator/new`. Step 1 is a full-screen oracle check gate: the user must either select an existing oracle announcement or commit to acting as the oracle before proceeding. Steps 2–7 guide the user through market type selection, basic info, outcome definition, fee configuration, cost preview, and a final description and review before submission. A 6-step progress indicator is visible on steps 2–7. The wizard preserves all state when navigating back.

**Key Functionality:**
- Full-screen wizard without app shell
- Step 1 (Oracle Check): full-screen gate — select existing announcement or become oracle
- Step 2 (Get Started): choose Yes/No or Categorical outcome type
- Step 3 (Basic Info): thumbnail upload, title, categories, closing date, answer URLs
- Step 4 (Outcomes): define outcomes with labels, optional thumbnails, and initial probabilities
- Step 5 (Market Settings): configure sell fee %, buy fee %, win fee %
- Step 6 (Market Preview): review estimated cost and worst-case loss before committing
- Step 7 (Review & Create): write description, review full summary, submit

## Recommended Approach: Test-Driven Development

There is no dedicated `tests.md` for Market Creation yet. Write tests based on the behavior described in `product-plan/sections/market-creation/README.md` and the callback list below.

**TDD Workflow:**
1. Write failing tests for each wizard step's form validation, back/next navigation, and oracle check gate behavior
2. Implement each step to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/market-creation/components/` (check if the wizard components exist; if not, they may be inlined in the section design spec):

- `MarketCreationWizard` — Main wizard container managing step state and draft
- `OracleCheck` — Full-screen gate (Step 1): select announcement or become oracle
- `GetStarted` — Market type selection (Step 2)
- `BasicInfo` — Market details form (Step 3)
- `OutcomesStep` — Outcome definition with probability preview (Step 4)
- `MarketSettings` — Fee configuration (Step 5)
- `MarketPreviewStep` — Cost/risk preview (Step 6)
- `ReviewAndCreate` — Description editor and final review (Step 7)
- `StepIndicator` — 6-step progress indicator (shown on steps 2–7)

### Data Layer

Key types (from `product-plan/sections/market-creation/README.md`):
- `WizardDraft` — all wizard state accumulated across steps
- `OracleAnnouncement` — an existing oracle announcement available for selection
- `WizardStepOracleCheck`, `WizardStepGetStarted`, `WizardStepBasicInfo`
- `WizardStepOutcomes`, `WizardStepMarketSettings`, `WizardStepMarketPreview`, `WizardStepReviewAndCreate`

API endpoints to implement:
- `GET /oracle/announcements` — list available oracle announcements the user can select
- `POST /oracle/announcements` — create a new oracle announcement (become oracle path)
- `POST /markets/draft` — save or update a wizard draft (called on each Next)
- `POST /markets/preview` — calculate estimated cost and worst-case loss given current draft
- `POST /markets` — publish the market (final submission)
- `POST /markets/thumbnail` — upload thumbnail image; returns URL

### Callbacks

Wire up these props on the `MarketCreationWizard` component:

| Callback | What to do |
|----------|------------|
| `onOracleChoiceSelect` | Record oracle path choice (existing announcement vs. become oracle) |
| `onAnnouncementSelect` | Select a specific oracle announcement from the list |
| `onExit` | Confirm exit with unsaved changes warning, navigate to `/creator` |
| `onNext` | Validate current step, save draft via `POST /markets/draft`, advance step |
| `onBack` | Go to previous step; preserve all state |
| `onOutcomeTypeSelect` | Record selected outcome type (Yes/No or Categorical) |
| `onTitleChange` | Update title in draft state |
| `onCategoryTagsChange` | Update selected category tags |
| `onClosingDateChange` | Update closing date; validate it is in the future |
| `onAnswerUrlsChange` | Update list of answer source URLs |
| `onThumbnailUpload` | Upload image via `POST /markets/thumbnail`, store returned URL in draft |
| `onAddOutcome` | Add a new outcome entry to draft |
| `onRemoveOutcome` | Remove an outcome from draft |
| `onOutcomeLabelChange` | Update label for a specific outcome |
| `onOutcomeProbabilityChange` | Update initial probability for an outcome; normalize remaining |
| `onSellFeeChange` | Update sell fee percentage |
| `onBuyFeeChange` | Update buy fee percentage |
| `onWinFeeChange` | Update win fee percentage |
| `onCalculatePreview` | Call `POST /markets/preview` with current draft; display result in Step 6 |
| `onConfirmPreview` | Mark preview confirmed; advance to Step 7 |
| `onDescriptionChange` | Update description text in draft |
| `onCreateMarket` | Call `POST /markets` with finalized draft; navigate to new market detail page on success |

### Important: No App Shell

The Market Creation Wizard route (`/creator/new`) must render **without** `AppShell`. Like Wallet Setup, this is a standalone full-screen experience. Implement the route exclusion so that `AppShell` is not rendered for this path.

### Validation Rules

- **Step 1**: Oracle choice must be selected before advancing; if "existing announcement" chosen, an announcement must be selected from the list
- **Step 3**: Title required (max 200 chars); closing date must be in the future; at least one answer URL required
- **Step 4**: All outcome labels required; probabilities must be positive; if all outcomes provided, probabilities should sum to 100% (show warning, not hard block)
- **Step 5**: Fees must be numeric between 0 and 100
- **Step 6**: Preview must be calculated (call `onCalculatePreview`) and confirmed before advancing
- **Step 7**: Description optional; submission requires all prior steps valid

### Oracle Check Gate (Step 1)

This step is a full-screen overlay before the main wizard begins:

- **Option A — Select Existing Announcement**: loads a list of oracle announcements via `GET /oracle/announcements`; user selects one; this binds the market to an existing DLC oracle event
- **Option B — Become Oracle**: user commits to acting as the oracle themselves; creates a new announcement via `POST /oracle/announcements`
- The gate cannot be skipped — no step indicator is shown on Step 1
- The "Exit" action (X button) navigates back to `/creator`

## Files to Reference

- `product-plan/sections/market-creation/README.md`
- `product-plan/sections/market-creation-and-management/tests.md` (wizard test section)
- `product-plan/sections/market-creation/components/` (if available)

## Expected User Flows

**Create a Yes/No market (full flow):**
1. Creator navigates to `/creator/new` — oracle check gate loads, no app shell visible
2. Creator selects "Select Existing Announcement", picks one from the list, clicks Next
3. Step 2 (Get Started): Creator selects "Yes/No" outcome type
4. Step 3 (Basic Info): Creator uploads thumbnail, enters title, picks categories, sets closing date, adds answer URL
5. Step 4 (Outcomes): Yes/No type — no additional outcomes to define; step shows summary
6. Step 5 (Market Settings): Creator sets sell fee 1%, buy fee 0.5%, win fee 2%
7. Step 6 (Market Preview): Creator clicks "Calculate" — estimated cost and worst-case loss displayed; Creator confirms
8. Step 7 (Review & Create): Creator writes description, reviews summary, clicks "Create Market"
9. Market published — wizard exits, creator navigated to new market detail page at `/markets/:newId`

**Back navigation with state preservation:**
1. Creator reaches Step 5 (Market Settings)
2. Creator clicks Back — returns to Step 4 (Outcomes) with all outcome data intact
3. Creator clicks Back again — returns to Step 3 (Basic Info) with form fields intact

**Exit with warning:**
1. Creator has filled in Step 3 data
2. Creator clicks Exit (X button) — confirmation dialog: "Are you sure you want to exit? Your progress will be lost."
3. Creator confirms — navigated to `/creator`

**Become oracle path:**
1. Creator selects "Become Oracle" on Step 1
2. App calls `POST /oracle/announcements` to register the creator as oracle for this market
3. Creator proceeds through remaining steps

## Done When

- [ ] Wizard renders without app shell on `/creator/new` route
- [ ] Oracle check gate (Step 1) loads available announcements; both oracle paths work
- [ ] Step indicator visible on steps 2–7 with correct active state
- [ ] Back/Next navigation works and preserves draft state
- [ ] Step 3 form: thumbnail upload, title, categories, date, URLs all functional
- [ ] Step 4: Yes/No outcome type advances cleanly; Categorical type allows adding/removing outcomes with probability normalization
- [ ] Step 5 fee inputs validate numeric range
- [ ] Step 6 preview calculates via API and displays cost/risk; confirm required before Next
- [ ] Step 7 description editor functional; full summary shown
- [ ] Submit creates market via API and navigates to new market detail page
- [ ] Exit shows confirmation before discarding draft
- [ ] Validation errors shown inline on each step
- [ ] Responsive on mobile (form fields stack, wizard usable on small screens)
