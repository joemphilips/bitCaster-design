# Milestone 7: Wallet Setup

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

Implement the Wallet Setup feature — a first-time onboarding wizard that creates or recovers a Cashu wallet for new users.

## Overview

Wallet Setup is a 5-step full-screen wizard rendered **without the application shell** (no top nav, no bottom bar). It is shown only once: when a new user arrives and no wallet exists. The wizard guides the user through accepting terms, confirming PWA installation, choosing between creating a new wallet or recovering from seed, displaying or entering a 12-word BIP-39 seed phrase, and configuring initial mint connections. On completion the user is redirected to the main application.

**Key Functionality:**
- Full-screen wizard with no app shell (standalone layout)
- Step 1: Welcome page with Terms of Service link
- Step 2: PWA install confirmation with platform-specific instructions (iOS / Android / Desktop)
- Step 3: Choose Create New Wallet or Recover Existing Wallet
- Step 4a (Create): Display generated 12-word seed phrase in 3x4 grid; require confirmation checkbox before advancing
- Step 4b (Recover): 12 individual word input fields with BIP-39 validation; support paste of full phrase
- Step 5: Configure mint connections; finish setup
- Step indicator visible on steps 3–5

## Recommended Approach: Test-Driven Development

There is no dedicated `tests.md` for Wallet Setup yet. Write tests based on the behavior described in `product-plan/sections/wallet-setup/README.md` and the callback list below.

**TDD Workflow:**
1. Write failing tests for wizard step navigation, seed phrase display/input, BIP-39 validation, and mint setup
2. Implement the wizard to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/wallet-setup/components/`:

- `WalletSetup` — Main wizard container managing step state
- `WelcomeLanding` — Welcome page with logo and ToS link
- `PwaConfirmation` — PWA install instructions (platform-detected)
- `ChoiceCards` — Create New / Recover Wallet selection
- `SeedDisplay` — 3x4 grid of numbered seed words (create flow)
- `SeedInput` — 12 individual word input fields with paste support (recover flow)
- `MintSetup` — Mint URL configuration
- `StepIndicator` — Progress indicator visible on steps 3–5

### Data Layer

Key types (from `product-plan/sections/wallet-setup/README.md`):
- `SetupStep` — enum of wizard steps
- `SetupChoice` — "create" | "recover"
- `MintConnectionTest` — result of testing a mint URL

The wallet setup wizard is primarily client-side. The backend concerns are:

- `POST /wallet/create` — generate a new 12-word BIP-39 seed, store encrypted wallet, return seed words (shown once)
- `POST /wallet/recover` — accept 12-word phrase, derive wallet keys, store encrypted wallet
- `POST /wallet/mints/test` — test connectivity to a mint URL
- `POST /wallet/mints` — save selected mints to the user's wallet configuration
- `POST /wallet/complete` — mark wallet setup as complete; backend sets a flag that suppresses the setup wizard on future visits

### Callbacks

Wire up these props on the `WalletSetup` component:

| Callback | What to do |
|----------|------------|
| `onWelcomeNext` | Advance from Step 1 to Step 2 |
| `onShowTerms` | Open Terms of Service in a modal or new tab |
| `onCloseTerms` | Close the Terms of Service modal |
| `onPwaNext` | Advance from Step 2 to Step 3 |
| `onChoiceSelect` | Record "create" or "recover" choice; advance to Step 4 |
| `onSeedSavedToggle` | Toggle the "I have saved my seed phrase" confirmation checkbox |
| `onSeedWordInput` | Update individual word in recovery input state |
| `onSeedPhrasePaste` | Parse pasted phrase into 12 individual word fields |
| `onRecover` | Validate BIP-39 phrase, call `POST /wallet/recover`, advance to Step 5 on success |
| `onAddMint` | Call `POST /wallet/mints/test`, add mint to list if reachable |
| `onRemoveMint` | Remove mint from current list |
| `onContinue` | Advance from Step 4 to Step 5 |
| `onBack` | Go to previous step |
| `onFinishSetup` | Call `POST /wallet/mints` and `POST /wallet/complete`, redirect to `/markets` |

### Important: No App Shell

The Wallet Setup route (`/setup`) must render the wizard **without** `AppShell`. This is a standalone full-screen experience. Implement the route so that `AppShell` is not rendered for this path.

### Validation

- **BIP-39 validation** (Step 4b, Recover): each of the 12 words must be in the BIP-39 word list; show an inline error per invalid word
- **Seed confirmation** (Step 4a, Create): the "Next" button must be disabled until the user checks the confirmation checkbox
- **Mint URL** (Step 5): validate URL format before testing; show connection success/failure inline

## Files to Reference

- `product-plan/sections/wallet-setup/README.md`
- `product-plan/sections/wallet-setup/components/`

## Expected User Flows

**Create new wallet:**
1. New user visits the app — redirected to `/setup`
2. Step 1 (Welcome): user reads welcome message, clicks "Get Started"
3. Step 2 (PWA): platform-specific install instructions shown; user clicks "Continue"
4. Step 3 (Choice): user selects "Create New Wallet"
5. Step 4a (Seed Display): 12-word seed shown in 3x4 grid; user is instructed to write it down; checkbox required before Next is enabled
6. User checks checkbox, clicks Next
7. Step 5 (Mint Setup): user enters a mint URL, clicks Test — connection indicator turns green; user clicks "Finish"
8. Wallet created, redirect to `/markets`

**Recover existing wallet:**
1. New user visits `/setup`, navigates to Step 3, selects "Recover Wallet"
2. Step 4b (Seed Input): 12 input fields shown; user types or pastes their seed phrase
3. BIP-39 validation runs on each word — invalid words shown in red
4. User corrects errors, all words valid — "Recover" button enabled
5. User clicks Recover — wallet recovered, advance to Step 5
6. User configures mints and finishes setup

**Back navigation:**
1. User on Step 4 clicks Back — returns to Step 3 (Choice)
2. Step state is preserved (choice selection remembered)

## Done When

- [ ] Wizard renders without app shell on `/setup` route
- [ ] Step navigation (Next, Back) works correctly through all steps
- [ ] Step indicator visible on steps 3, 4, and 5
- [ ] Create flow: seed phrase displays in 3x4 grid; checkbox gates Next button
- [ ] Recover flow: 12 input fields accept words; paste populates all fields
- [ ] BIP-39 validation highlights invalid words inline
- [ ] Mint URL test shows success/failure inline
- [ ] Finish setup saves wallet and mints, redirects to `/markets`
- [ ] Terms of Service link opens correctly
- [ ] PWA instructions adapt to detected platform (iOS / Android / Desktop)
- [ ] Wizard is responsive on mobile (primary target platform)
