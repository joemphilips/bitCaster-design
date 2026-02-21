# Wallet Setup

## Overview
First-time onboarding wizard for creating a new wallet or recovering from seed phrase. 5-step flow: Welcome Landing → PWA Confirmation → Choice (Create/Recover) → Seed → Mint Setup.

## User Flows
- Step 1: Welcome page with Terms of Service link
- Step 2: PWA install confirmation with platform-specific instructions
- Step 3: Choose Create New or Recover Wallet
- Step 4a (Create): View 12-word seed phrase, confirm saved
- Step 4b (Recover): Enter 12 seed words with BIP-39 validation
- Step 5: Configure mint connections, finish setup

## Data Used
**Entities:** WalletSetupProps (SetupStep, SetupChoice, MintConnectionTest)

## Components Provided
- `WalletSetup` — Main wizard container
- `WelcomeLanding` — Welcome page with logo and ToS
- `PwaConfirmation` — PWA install instructions
- `ChoiceCards` — Create/Recover selection
- `SeedDisplay` — 3×4 seed word grid (create flow)
- `SeedInput` — 12 input fields (recover flow)
- `MintSetup` — Mint URL configuration
- `StepIndicator` — Progress indicator (steps 3-5)

## Callback Props

| Callback | Description |
|----------|-------------|
| `onWelcomeNext` | Advance from welcome |
| `onShowTerms` | Open ToS popup |
| `onCloseTerms` | Close ToS popup |
| `onPwaNext` | Advance from PWA step |
| `onChoiceSelect` | Select create/recover |
| `onSeedSavedToggle` | Confirm seed saved |
| `onSeedWordInput` | Enter seed word |
| `onSeedPhrasePaste` | Paste full phrase |
| `onRecover` | Submit recovery |
| `onAddMint` | Add mint URL |
| `onRemoveMint` | Remove mint |
| `onContinue` | Continue (step 4→5) |
| `onBack` | Go back |
| `onFinishSetup` | Complete setup |
