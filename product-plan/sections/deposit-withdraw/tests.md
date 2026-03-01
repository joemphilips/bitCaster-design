# Deposit & Withdraw — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — Deposit Lightning
1. Render `DepositWithdraw` with `mode: 'deposit'`, `currentView: 'chooser'`.
2. Verify bottom sheet title reads "Deposit".
3. Verify two options are visible: "Ecash" and "Lightning".
4. Click "Lightning" → `onSelectMethod('lightning')` fires.
5. Advance to `currentView: 'deposit-lightning'`. Verify "Deposit Lightning" title.
6. Verify mint selector shows the selected mint name and balance (e.g., "B5,000 available").
7. Verify amount display shows "B0" with fiat equivalent "$0.00".
8. Press numpad keys 1, 0, 0, 0 → amount updates to B1,000.
9. Verify "CREATE INVOICE" button is enabled.
10. Click "CREATE INVOICE" → `onCreateInvoice` fires.

### Flow 2 — Deposit Ecash
1. From `currentView: 'chooser'`, click "Ecash" → `onSelectMethod('ecash')` fires.
2. Advance to `currentView: 'deposit-ecash'`. Verify "Deposit Ecash" title.
3. Verify three action rows: "Paste" (clipboard icon), "Scan" (QR icon), "Request" (document icon).
4. Click "Paste" → `onPaste` fires.
5. Click "Scan" → `onScan` fires.
6. Click "Request" → `onRequest` fires.

### Flow 3 — Withdraw Ecash (Send Ecash)
1. Render with `mode: 'withdraw'`, `currentView: 'chooser'`.
2. Verify bottom sheet title reads "Withdrawal".
3. Click "Ecash" → `onSelectMethod('ecash')` fires.
4. Advance to `currentView: 'send-ecash'`. Verify "Send Ecash" title.
5. Verify mint selector, amount display, and numpad are shown.
6. Enter amount 500 via numpad.
7. Verify "SEND" button is enabled.
8. Click "SEND" → `onSendEcash` fires.

### Flow 4 — Withdraw Lightning (Pay Lightning)
1. From `currentView: 'chooser'` with `mode: 'withdraw'`, click "Lightning".
2. Advance to `currentView: 'pay-lightning'`. Verify "Pay Lightning" title.
3. Verify mint selector is shown.
4. Verify Lightning address/invoice text area with placeholder "Lightning address or invoice".
5. Verify "Paste" button is visible.
6. Click "Paste" → `onPaste` fires.
7. Verify "Scan QR Code" card row with QR icon and subtitle "Tap to scan an address".
8. Click "Scan QR Code" → `onScanQR` fires.

### Failure — CREATE INVOICE Disabled When Amount Is 0
1. At `currentView: 'deposit-lightning'` with `amountSats: 0`.
2. Verify "CREATE INVOICE" button is disabled (greyed out, not clickable).

### Failure — SEND Disabled When Amount Is 0
1. At `currentView: 'send-ecash'` with `amountSats: 0`.
2. Verify "SEND" button is disabled (greyed out, not clickable).

---

## Empty State Tests

- **Mint selector with single mint**: When `mints` has only one entry, the mint selector shows that mint without a dropdown indicator.

---

## Component Interaction Tests

- **Numpad input**: Pressing keys 1, 0, 0 sequentially updates the display to "B100". Pressing backspace removes the last digit.
- **Currency toggle**: Clicking the currency toggle icon switches between sats display ("B100") and fiat display (e.g., "$0.10"). `onToggleCurrency` fires on click.
- **Mint selector**: Clicking the mint dropdown → `onMintChange` fires with the selected mint ID. Selected mint shows name and balance.
- **Close button**: Clicking X (close) on any view → `onClose` fires, dismissing the entire modal.
- **Back button**: Clicking back arrow on method-specific views → `onBack` fires, returning to the method chooser.
- **Fullscreen toggle**: Clicking the fullscreen icon → `onToggleFullscreen` fires.
- **Lightning input change**: Typing into the Lightning address/invoice field → `onLightningInputChange` fires with the entered value.
- **Fiat conversion display**: When `amountSats` changes, `amountFiat` updates to reflect the converted value.

---

## Edge Cases

- **Numpad backspace on empty**: Pressing backspace when amount is 0 does nothing (amount stays at 0).
- **Large amounts**: Entering amounts exceeding 1 BTC displays correctly with proper formatting.
- **Multiple mints**: When `mints` has multiple entries, the dropdown shows all mints with their respective balances.
- **Backdrop dismiss**: Clicking the backdrop (outside the modal) on the method chooser → `onClose` fires.
- **Keyboard numpad input (desktop)**: On desktop, keyboard number keys also trigger `onNumpadPress`.

---

## Accessibility Checks

- Method chooser options have `role="button"` with descriptive labels (e.g., "Deposit via Ecash", "Deposit via Lightning").
- Close button has `aria-label="Close"`.
- Back button has `aria-label="Go back"`.
- Amount display is announced as a live region (`aria-live="polite"`) when value changes.
- Numpad keys have `aria-label` for each digit and backspace.
- "CREATE INVOICE" and "SEND" buttons have `aria-disabled="true"` when amount is 0.
- Lightning address input has associated label.
- Mint selector dropdown is keyboard-navigable.

---

## Sample Test Data

```typescript
import type {
  DepositWithdrawProps,
  MintInfo,
} from './types'

const sampleMints: MintInfo[] = [
  {
    id: 'mint-1',
    name: 'bitCaster Mint',
    url: 'https://mint.bitcaster.app',
    balanceSats: 50000,
  },
  {
    id: 'mint-2',
    name: 'Secondary Mint',
    url: 'https://mint2.example.com',
    balanceSats: 12000,
  },
]

const sampleDepositLightningProps: DepositWithdrawProps = {
  mode: 'deposit',
  currentView: 'deposit-lightning',
  mints: sampleMints,
  selectedMintId: 'mint-1',
  amountSats: 0,
  amountFiat: '$0.00',
  fiatSymbol: '$',
  showFiatPrimary: false,
  lightningInput: '',
}

const sampleWithdrawEcashProps: DepositWithdrawProps = {
  mode: 'withdraw',
  currentView: 'send-ecash',
  mints: sampleMints,
  selectedMintId: 'mint-1',
  amountSats: 0,
  amountFiat: '$0.00',
  fiatSymbol: '$',
  showFiatPrimary: false,
  lightningInput: '',
}

const samplePayLightningProps: DepositWithdrawProps = {
  mode: 'withdraw',
  currentView: 'pay-lightning',
  mints: sampleMints,
  selectedMintId: 'mint-1',
  amountSats: 0,
  amountFiat: '$0.00',
  fiatSymbol: '$',
  showFiatPrimary: false,
  lightningInput: '',
}
```
