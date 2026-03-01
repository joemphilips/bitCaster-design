# Wallet Setup — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — Create New Wallet (Success)
1. Render `WalletSetup` at `currentStep: 1`.
2. Verify "Welcome to bitCaster" heading and "Next" button are visible.
3. Click "Next" → `onWelcomeNext` fires.
4. Advance to `currentStep: 2`. Verify "Install PWA" heading. Click "Next" → `onPwaNext` fires.
5. Advance to `currentStep: 3`. Verify two choice cards: "Create New Wallet" and "Recover Wallet".
6. Click "Create New Wallet" → `onChoiceSelect('create')` fires.
7. Advance to `currentStep: 4`, `seedVerifyPhase: 'display'`. Verify 12 seed words in a 3x4 grid with indices 1-12.
8. Verify "Continue" button is disabled. Check "I have saved my seed phrase" → `onSeedSavedToggle(true)` fires.
9. With `seedSaved: true`, verify "Continue" button is enabled. Click it → `onContinue` fires.
10. Switch to `seedVerifyPhase: 'verify'`. Verify three input fields labeled "Word #3", "Word #7", "Word #12".
11. Enter correct words → each shows green check icon.
12. `onSeedVerifyComplete` fires after all three match. Advance to step 5.
13. At `currentStep: 5`, verify default mint URL is shown with connection status.
14. Click "Finish Setup" → `onFinishSetup` fires.

### Flow 1 — Create New Wallet (Failure: Incorrect Verification Word)
1. At `seedVerifyPhase: 'verify'`, enter an incorrect word for position #3.
2. Verify the field shows red highlight and "Incorrect word" error message.
3. Verify "Verify & Continue" button remains disabled.

### Flow 2 — Recover Wallet (Success)
1. At `currentStep: 3`, click "Recover Wallet" → `onChoiceSelect('recover')` fires.
2. At `currentStep: 4` with `choice: 'recover'`, verify 12 numbered input fields.
3. Enter 12 valid BIP-39 words. Verify "Recover" button becomes enabled.
4. Click "Recover" → `onRecover` fires.
5. Advance to step 5 (Mint Setup). Click "Finish Setup" → `onFinishSetup` fires.

### Flow 2 — Recover Wallet (Failure: Invalid BIP-39 Word)
1. Enter an invalid word (e.g., "xyzzy") into field #1.
2. Verify the field is highlighted in red with an error message.
3. Verify "Recover" button remains disabled.

---

## Empty State Tests

- **Mint connection list with no additional mints**: At step 5, only the default mint URL (from `VITE_MINT_URL`) is shown. "Add Another Mint" button is visible. No remove button on the default mint.

---

## Component Interaction Tests

- **Step indicator visibility**: Step indicator is hidden on steps 1 and 2. It is visible on steps 3, 4, and 5, showing labels "Choice", "Seed", "Mint Setup".
- **Step indicator state**: Current step is highlighted (blue), completed steps show checkmark (green), future steps are grey.
- **Background data loading**: When `backgroundDataLoad.status` is `'loading'`, a progress indicator shows "Loading markets..." with a spinner. When `status` is `'loaded'` with `conditionsLoaded: 5`, it shows "5 markets loaded" with a checkmark.
- **Back navigation**: At step 4, clicking Back → `onBack` fires. At step 5, clicking Back → `onBack` fires.
- **Seed phrase paste**: Pasting a 12-word phrase into any input field on the recover screen triggers `onSeedPhrasePaste` with the full phrase, auto-filling all 12 fields.
- **Terms of Service**: Clicking "Terms of Service" on step 1 triggers `onShowTerms`. When `showTerms: true`, a popup is visible. Closing it triggers `onCloseTerms`.

---

## Edge Cases

- **Finish Setup disabled**: At step 5, "Finish Setup" is disabled if no mint has `status: 'connected'`.
- **Connection test in progress**: A mint with `status: 'connecting'` shows a loading spinner, not a success or error state.
- **Connection test failure**: A mint with `status: 'failed'` shows the `errorMessage` and a red indicator.
- **Seed verify back**: At `seedVerifyPhase: 'verify'`, clicking Back triggers `onSeedVerifyBack` and returns to `seedVerifyPhase: 'display'`.

---

## Accessibility Checks

- All input fields have associated labels (e.g., "Word #3", "Word #7", "Word #12").
- "Continue", "Recover", and "Finish Setup" buttons have descriptive accessible names.
- Checkbox "I have saved my seed phrase" is keyboard-focusable and toggleable with Space/Enter.
- Step indicator uses `aria-current="step"` on the active step.
- Error messages on seed word inputs are announced via `aria-live="polite"`.

---

## Sample Test Data

```typescript
import type {
  WalletSetupProps,
  MintConnectionTest,
  BackgroundDataLoad,
} from './types'

const defaultMintConnection: MintConnectionTest = {
  url: 'https://mint.bitcaster.app',
  status: 'connected',
}

const backgroundDataLoading: BackgroundDataLoad = {
  mintUrl: 'https://mint.bitcaster.app',
  status: 'loading',
  conditionsLoaded: 0,
}

const backgroundDataLoaded: BackgroundDataLoad = {
  mintUrl: 'https://mint.bitcaster.app',
  status: 'loaded',
  conditionsLoaded: 5,
}

const sampleCreateFlowProps: WalletSetupProps = {
  currentStep: 4,
  showTerms: false,
  choice: 'create',
  seedWords: [
    'abandon', 'ability', 'able', 'about', 'above', 'absent',
    'absorb', 'abstract', 'absurd', 'abuse', 'access', 'accident',
  ],
  inputSeedWords: [],
  seedSaved: false,
  seedVerifyPhase: 'display',
  seedVerifyInputs: { word3: '', word7: '', word12: '' },
  mintConnections: [defaultMintConnection],
  backgroundDataLoad: backgroundDataLoaded,
}

const sampleRecoverFlowProps: WalletSetupProps = {
  currentStep: 4,
  showTerms: false,
  choice: 'recover',
  seedWords: [],
  inputSeedWords: Array(12).fill(''),
  seedSaved: false,
  seedVerifyPhase: 'display',
  seedVerifyInputs: { word3: '', word7: '', word12: '' },
  mintConnections: [defaultMintConnection],
  backgroundDataLoad: backgroundDataLoading,
}
```
