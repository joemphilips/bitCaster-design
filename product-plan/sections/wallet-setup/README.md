# Wallet Setup

## Overview
5-step onboarding wizard for wallet creation or recovery. This section runs without the application shell (`shell: false`) and uses its own full-screen layouts.

Accessed from the Portfolio "Get Started" CTA (when no wallet exists) or from Settings.

## Steps
1. **Welcome Landing** — Logo, welcome message, Terms of Service link, Next button
2. **PWA Confirmation** — Device illustrations, install instructions, skip option
3. **Choice** — Two large cards: Create New Wallet / Recover Wallet
4. **Seed** — Create path: display 12 words then verify #3, #7, #12. Recover path: enter 12 words with BIP-39 validation
5. **Mint Setup** — Default mint pre-filled, connection test, add additional mints, Finish Setup

## Components
- `WalletSetup` — Root component for the entire flow
- `WelcomeLanding` — Step 1 full-screen page
- `PwaConfirmation` — Step 2 PWA install guidance
- `ChoiceCards` — Step 3 create/recover selection
- `SeedDisplay` — Step 4 seed phrase display (3x4 grid)
- `SeedInput` — Step 4 recover flow (12 input fields)
- `MintSetup` — Step 5 mint connection management
- `StepIndicator` — Horizontal progress bar (steps 3-5 only)

## Key Callbacks
- `onWelcomeNext` — Advance from welcome landing
- `onChoiceSelect` — User picks create or recover
- `onSeedSavedToggle` — Checkbox for confirming seed saved
- `onSeedVerifyInput` — Word entry during verification (positions 3, 7, 12)
- `onSeedVerifyComplete` — All verification words correct
- `onSeedWordInput` — Individual word entry in recover flow
- `onSeedPhrasePaste` — Paste detection for full 12-word phrase
- `onRecover` — Submit recovered seed
- `onAddMint` / `onRemoveMint` — Manage mint connections
- `onFinishSetup` — Complete onboarding, navigate to Portfolio

## Background Data Loading
After step 2, the app silently begins downloading condition data from the hard-coded mint via `GET /v1/conditions`. A subtle progress indicator appears in the bottom-left during steps 3-4. States: "Loading markets..." → "5 markets loaded" → or "Failed to load markets" with retry.

## Configuration
- shell: false
