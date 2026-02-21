# Test Instructions: Wallet Setup

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the 5-step onboarding wizard: Welcome Landing, PWA Confirmation, Wallet Choice, Seed Phrase (create or recover), and Mint Setup.

## User Flow Tests

### Flow 1: Complete Create New Wallet Flow
**Success Path:**
- Steps:
  1. Welcome step → click "Get Started"
  2. PWA step → click "Continue"
  3. Choice step → click "Create New Wallet"
  4. Seed Phrase step → view 12 words → check "I have saved my seed phrase" → click "Continue"
  5. Mint Setup step → verify default mint connected → click "Finish Setup"
- Expected: onFinishSetup called, user navigated to main app

### Flow 2: Complete Recover Wallet Flow
**Success Path:**
- Steps:
  1. Welcome step → "Get Started"
  2. PWA step → "Continue"
  3. Choice step → click "Recover Wallet"
  4. Recovery step → enter all 12 valid BIP-39 words → click "Recover"
  5. Mint Setup step → "Finish Setup"
- Expected: onRecover called with the 12 words array, flow completes, onFinishSetup called

**Failure Path:**
- Steps: Enter 11 valid words + 1 invalid word (e.g., "zzzzzzz")
- Expected: Invalid word highlighted red, error message shown, "Recover" button disabled

### Flow 3: View Terms of Service
**Success Path:**
- Steps: On Welcome step → click "Terms of Service" hyperlink
- Expected: onShowTerms called, bottom sheet/modal opens with ToS content

### Flow 4: Paste Seed Phrase
**Success Path:**
- Steps: On Recovery step → paste "word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12" into first input field
- Expected: All 12 input fields auto-fill with respective words, onSeedPhrasePaste called

### Flow 5: Mint Connection Test
**Success Path:**
- Steps: On Mint Setup step → observe default mint "http://localhost:3338" auto-connecting
- Expected: Status shows connecting animation → transitions to "connected" with green indicator

**Failure Path:**
- Steps: Add custom mint URL "https://bad.mint.example" → submit
- Expected: Status shows "failed" with red indicator and error message "Connection refused"

### Flow 6: Add Additional Mint on Mint Setup Step
**Success Path:**
- Steps: On Mint Setup step → click "Add Mint" → enter "https://mint.minibits.cash/Bitcoin" → submit
- Expected: New mint row appears, connection test runs, status eventually shows connected

### Flow 7: Back Navigation Preserves State
**Success Path:**
- Steps: Navigate to Seed Phrase step (step 4) → click "Back" to Choice step → click "Back" to PWA step
- Expected: Returns to PWA step, all previously entered state in later steps is preserved

## Empty State Tests
- Welcome step (step 1) has no "Back" button
- Step indicator (dots or numbers) only shown on steps 3-5, not on Welcome or PWA steps
- Mint Setup with zero connected mints → "Finish Setup" button disabled with tooltip explaining requirement

## Component Tests
- StepIndicator shows correct active step (steps 3-5 only)
- SeedPhraseGrid shows 12 numbered cells in a grid layout
- SeedPhraseGrid (create mode) shows words, checkbox starts unchecked, Continue disabled until checked
- SeedPhraseGrid (recover mode) shows 12 empty inputs, Recover button disabled until all valid
- WordInput highlights red on blur with invalid BIP-39 word
- MintRow shows URL, connection status indicator, and remove button for non-default mints
- "Finish Setup" enabled only when at least one mint has status "connected"

## Edge Cases
- Seed phrase checkbox must be explicitly checked before Continue is enabled in create flow
- All 12 words must be non-empty and valid BIP-39 to enable Recover button
- Pasting a seed phrase with extra spaces between words still parses correctly
- Pasting fewer than 12 words fills only available fields, leaves rest empty
- Back navigation from step 5 (Mint Setup) returns to step 4 (Seed/Recovery) with seed still visible
- PWA step: if already installed as PWA, step may auto-advance or show confirmation message

## Accessibility
- All step inputs keyboard navigable; Tab moves between word fields in order
- Seed phrase grid: word count progress announced to screen reader (e.g., "6 of 12 words entered")
- "Finish Setup" button aria-disabled with descriptive message when no mint connected
- Bottom sheet ToS dismissible with Escape key and has focus trap while open
- Back button has aria-label "Go back to previous step"

## Sample Test Data
```typescript
const mockValidSeedWords = [
  "abandon", "ability", "able", "about", "above",
  "absent", "absorb", "abstract", "absurd", "abuse",
  "access", "accident"
];

const mockInvalidSeedWords = [
  "abandon", "ability", "able", "about", "above",
  "absent", "absorb", "abstract", "absurd", "abuse",
  "access", "zzzzzzz"  // invalid BIP-39 word
];

const mockMintConnections = [
  { url: "http://localhost:3338", status: "connected" as const, isDefault: true }
];

const mockFailedMint = {
  url: "https://bad.mint.example",
  status: "failed" as const,
  errorMessage: "Connection refused",
  isDefault: false
};

const mockConnectingMint = {
  url: "https://mint.minibits.cash/Bitcoin",
  status: "connecting" as const,
  isDefault: false
};

const mockWizardState = {
  currentStep: 1 as const,
  createMode: true,
  seedWords: mockValidSeedWords,
  seedConfirmed: false,
  mints: mockMintConnections
};
```
