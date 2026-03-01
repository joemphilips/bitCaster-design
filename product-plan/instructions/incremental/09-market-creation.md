# Milestone 9: Market Creation Wizard (Later Phase)

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-8 complete

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
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions

---

## Goal
Implement the Market Creation Wizard — 7-step wizard for creating new prediction markets.

## Overview
Accessed from the Market Creation & Management dashboard. Guides users through oracle configuration, market type, basic info, outcomes, fees, cost preview, and final review.

**Key Functionality:**
- Step 1: Oracle check (full-screen, no step indicator) — use existing announcement or become oracle
- Steps 2-7: Main wizard with 6-step progress indicator
- Step 2: Get Started — choose outcome type (Yes/No or Categorical)
- Step 3: Basic Info — thumbnail, title, categories, closing date, answer URLs
- Step 4: Outcomes — define outcomes with labels, descriptions, thumbnails, probabilities
- Step 5: Market Settings — sell/buy/win fee percentages
- Step 6: Market Preview — estimated cost and worst-case loss
- Step 7: Review & Create — rich text description, AI generation, submit

## What to Implement

### Components
- `MarketCreationWizard.tsx` — Wizard orchestrator
- `OracleCheck.tsx` — Step 1: Oracle selection
- `GetStarted.tsx` — Step 2: Outcome type
- `BasicInfo.tsx` — Step 3: Market details
- `OutcomesStep.tsx` — Step 4: Outcome definitions
- `MarketSettings.tsx` — Step 5: Fee configuration
- `MarketPreviewStep.tsx` — Step 6: Cost preview
- `ReviewAndCreate.tsx` — Step 7: Final review
- `StepIndicator.tsx` — 6-step progress indicator

### Key Callbacks
- `onOracleChoiceSelect` / `onAnnouncementSelect` — Oracle step
- `onOutcomeTypeSelect` — Market type
- `onTitleChange` / `onCategoryTagsChange` / `onClosingDateChange` — Basic info
- `onAddOutcome` / `onRemoveOutcome` / `onOutcomeLabelChange` — Outcomes
- `onSellFeeChange` / `onBuyFeeChange` / `onWinFeeChange` — Fees
- `onConfirmPreview` — Cost confirmation
- `onDescriptionChange` — Final description
- `onCreateMarket` — Submit market

## Done When
- [ ] Tests written and passing
- [ ] 7-step wizard navigates correctly
- [ ] Oracle check works with both paths
- [ ] Basic info validates required fields
- [ ] Outcomes can be added/removed
- [ ] Fee configuration works
- [ ] Cost preview calculates correctly
- [ ] Rich text description editor works
- [ ] Final submission creates market
- [ ] No shell displayed during wizard
- [ ] Responsive on mobile
