# Market Creation Wizard

## Overview
7-step wizard for creating new prediction markets. Starts with oracle configuration, then guides through market type, basic info, outcomes, fees, cost preview, and final review with description.

## User Flows
- Step 1: Oracle Check — choose existing oracle announcement or become oracle
- Step 2: Get Started — select Yes/No or Categorical outcome type
- Step 3: Basic Info — thumbnail, title, categories, closing date, answer URLs
- Step 4: Outcomes — define outcomes with labels, thumbnails, probabilities
- Step 5: Market Settings — configure sell/buy/win fees
- Step 6: Market Preview — review estimated cost and worst-case loss
- Step 7: Review & Create — write description, review summary, submit

## Data Used
**Entities:** WizardDraft, OracleAnnouncement, WizardStepOracleCheck, WizardStepGetStarted, WizardStepBasicInfo, WizardStepOutcomes, WizardStepMarketSettings, WizardStepMarketPreview, WizardStepReviewAndCreate

## Components Provided
- `MarketCreationWizard` — Main wizard container
- `OracleCheck` — Oracle configuration (full-screen gate)
- `GetStarted` — Market type selection
- `BasicInfo` — Market details form
- `OutcomesStep` — Outcome definition
- `MarketSettings` — Fee configuration
- `MarketPreviewStep` — Cost/risk preview
- `ReviewAndCreate` — Description + final review
- `StepIndicator` — 6-step progress (steps 2-7)

## Callback Props

| Callback | Description |
|----------|-------------|
| `onOracleChoiceSelect` | Select oracle check path |
| `onAnnouncementSelect` | Select oracle announcement |
| `onExit` | Exit wizard |
| `onNext` | Advance to next step |
| `onBack` | Go to previous step |
| `onOutcomeTypeSelect` | Select market type |
| `onTitleChange` | Update title |
| `onCategoryTagsChange` | Update categories |
| `onClosingDateChange` | Update closing date |
| `onAnswerUrlsChange` | Update answer URLs |
| `onThumbnailUpload` | Upload thumbnail |
| `onAddOutcome` | Add outcome |
| `onRemoveOutcome` | Remove outcome |
| `onOutcomeLabelChange` | Update outcome label |
| `onOutcomeProbabilityChange` | Update probability |
| `onSellFeeChange` | Update sell fee |
| `onBuyFeeChange` | Update buy fee |
| `onWinFeeChange` | Update win fee |
| `onCalculatePreview` | Calculate cost preview |
| `onConfirmPreview` | Confirm preview |
| `onDescriptionChange` | Update description |
| `onCreateMarket` | Submit market |
