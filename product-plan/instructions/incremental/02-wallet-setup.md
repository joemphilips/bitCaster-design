# Milestone 2: Wallet Setup

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
- **DO** implement empty states when no records exist
- **DO** use test-driven development — write tests first using `tests.md` instructions

---

## Goal
Implement the Wallet Setup section — first-time onboarding wizard for creating a new wallet or recovering from a seed phrase.

## Overview
A 5-step flow that guides new users through wallet creation or recovery. This is the entry point for all new users and must complete before any other section is accessible. No application shell is shown during setup.

**Key Functionality:**
- Welcome landing with Terms of Service popup
- PWA installation confirmation
- Choice between creating a new wallet or recovering an existing one
- Seed phrase display (3x4 grid) with verification (words #3, #7, #12)
- Seed phrase recovery with 12-word input and BIP-39 validation
- Mint connection setup with connection testing
- Background data loading from hard-coded mint during steps 3-5

## Recommended Approach: Test-Driven Development
See `product-plan/sections/wallet-setup/tests.md` for detailed test-writing instructions.

## What to Implement

### Components
Copy from `product-plan/sections/wallet-setup/components/`:
- `WalletSetup.tsx` — Main orchestrator component
- `WelcomeLanding.tsx` — Step 1: Welcome page
- `PwaConfirmation.tsx` — Step 2: PWA install confirmation
- `ChoiceCards.tsx` — Step 3: Create/Recover choice
- `SeedDisplay.tsx` — Step 4 (create): Seed phrase display
- `SeedInput.tsx` — Step 4 (recover): Seed phrase input
- `MintSetup.tsx` — Step 5: Mint connection setup
- `StepIndicator.tsx` — Progress indicator (steps 3-5)

### Data Layer
Key types: `SetupStep`, `SetupChoice`, `SeedVerifyPhase`, `MintConnectionTest`, `BackgroundDataLoad`

### Callbacks
- `onWelcomeNext` — Advance from welcome
- `onShowTerms` / `onCloseTerms` — Terms of Service popup
- `onPwaNext` — Advance from PWA step
- `onChoiceSelect` — Create/Recover selection
- `onSeedSavedToggle` — Seed phrase saved confirmation
- `onSeedVerifyInput` — Verification word input
- `onSeedVerifyComplete` — Verification success → advance
- `onSeedWordInput` / `onSeedPhrasePaste` — Recovery input
- `onRecover` — Trigger recovery
- `onAddMint` / `onRemoveMint` — Mint management
- `onFinishSetup` — Complete setup → navigate to Portfolio

## Expected User Flows

### Flow 1: Create New Wallet
1. User sees Welcome page, clicks "Next"
2. User sees PWA confirmation, clicks "Next"
3. User selects "Create New Wallet"
4. User sees 12 seed words, checks "I have saved", clicks Continue
5. User verifies words #3, #7, #12 correctly
6. User sees Mint Setup with pre-connected mint
7. User clicks "Finish Setup"
**Outcome:** Wallet created, navigates to Portfolio

### Flow 2: Recover Wallet
1. User sees Welcome → PWA → selects "Recover Wallet"
2. User enters 12 seed words (or pastes phrase)
3. User clicks "Recover"
4. User sees Mint Setup, clicks "Finish Setup"
**Outcome:** Wallet recovered, navigates to Portfolio

## Done When
- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] 5-step wizard completes for both create and recover paths
- [ ] Seed phrase verification validates words #3, #7, #12
- [ ] Mint connection testing works
- [ ] Background data loading starts at step 3
- [ ] No shell is displayed during setup
- [ ] Responsive on mobile
