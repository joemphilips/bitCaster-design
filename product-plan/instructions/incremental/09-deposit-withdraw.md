# Milestone 9: Deposit / Withdraw

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 4 (Portfolio) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints for deposit and withdrawal operations
- Cashu ecash token handling (paste, scan, request)
- Lightning invoice generation and payment
- Mint selection and balance management
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Deposit/Withdraw feature — modal overlay flows for depositing and withdrawing sats via Ecash or Lightning, triggered from the Portfolio section.

## Overview

The Deposit/Withdraw feature is a modal overlay system accessed from the Portfolio's Deposit and Withdraw buttons. It provides two methods for each direction: Ecash (peer-to-peer bearer tokens) and Lightning (network payments). The flow starts with a method chooser bottom sheet, then navigates to method-specific full-screen views.

**Key Functionality:**
- Method chooser bottom sheet (Ecash vs. Lightning)
- Deposit Ecash: Paste, Scan QR, or Request token
- Deposit Lightning: Select mint, enter amount via numpad, create invoice
- Send Ecash: Select mint, enter amount via numpad, send token
- Pay Lightning: Select mint, enter/paste/scan Lightning address or invoice
- Mint selector with balance display
- Currency toggle (BTC ↔ fiat) on amount displays
- Responsive: bottom sheet on mobile, centered modal on desktop

## Recommended Approach: Test-Driven Development

See `product-plan/sections/deposit-withdraw/tests.md` for detailed test instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for MethodChooser, DepositLightning numpad flow, and PayLightning invoice input
2. Implement each component to make the tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/deposit-withdraw/components/`:

- `DepositWithdraw` — Main router component (switches on `currentView`)
- `MethodChooser` — Bottom sheet with Ecash / Lightning options
- `DepositEcash` — Paste, Scan, Request actions for depositing ecash tokens
- `DepositLightning` — Full-screen with mint selector, amount numpad, CREATE INVOICE
- `SendEcash` — Full-screen with mint selector, amount numpad, SEND
- `PayLightning` — Full-screen with mint selector, invoice/address input, QR scan
- `MintSelector` — Dropdown showing selected mint name and balance
- `AmountDisplay` — Large centered amount with BTC/fiat currency toggle
- `Numpad` — 3×4 numeric keypad for amount entry

### Data Layer

Key types (see `product-plan/sections/deposit-withdraw/types.ts`):
- `DepositWithdrawMode`, `MethodType`, `DepositWithdrawView`, `MintInfo`, `DepositWithdrawProps`

API endpoints to implement:
- `GET /wallet/mints` — list available mints with balances
- `POST /wallet/deposit/ecash/paste` — redeem a pasted Cashu token
- `POST /wallet/deposit/ecash/request` — generate a token request
- `POST /wallet/deposit/lightning/invoice` — create a Lightning invoice for the selected mint and amount
- `POST /wallet/withdraw/ecash/send` — create a Cashu token for the specified amount
- `POST /wallet/withdraw/lightning/pay` — pay a Lightning invoice or address from the selected mint

### Callbacks

Wire up these props on the `DepositWithdraw` component:

| Callback | What to do |
|----------|------------|
| `onSelectMethod` | Navigate to the method-specific view (deposit-ecash, deposit-lightning, send-ecash, pay-lightning) |
| `onNumpadPress` | Update amount state: append digit or handle backspace |
| `onMintChange` | Update selected mint in state |
| `onToggleCurrency` | Toggle `showFiatPrimary` flag, recalculate display amounts |
| `onCreateInvoice` | Call invoice API with selected mint and amount, display QR/invoice to user |
| `onSendEcash` | Call send API, display the generated Cashu token for copying/sharing |
| `onPaste` | Read clipboard, call paste/redeem API with token content |
| `onScan` | Open camera/QR scanner, process scanned content |
| `onRequest` | Generate token request for sharing with another user |
| `onScanQR` | Open camera/QR scanner for Lightning address/invoice |
| `onLightningInputChange` | Update lightning input text in state |
| `onBack` | Navigate back to method chooser |
| `onClose` | Close modal, return to Portfolio |
| `onToggleFullscreen` | Toggle fullscreen display mode |

### Integration with Portfolio

The Deposit/Withdraw modal is triggered by Portfolio callbacks:
- `Portfolio.onDeposit` → opens DepositWithdraw with `mode: 'deposit'`, `currentView: 'chooser'`
- `Portfolio.onWithdraw` → opens DepositWithdraw with `mode: 'withdraw'`, `currentView: 'chooser'`

After a successful deposit or withdrawal:
- Refresh Portfolio balance, activity feed, and funds list
- Close the modal and return to Portfolio

### State Management

The parent component manages all state and passes it as props:
- `mode` — set when opening (deposit or withdraw)
- `currentView` — updated as user navigates through the flow
- `selectedMintId` — updated via onMintChange
- `amountSats` — built up via onNumpadPress (append digits, handle backspace)
- `amountFiat` — recalculated whenever amountSats changes (using exchange rate)
- `showFiatPrimary` — toggled via onToggleCurrency
- `lightningInput` — updated via onLightningInputChange

## Files to Reference

- `product-plan/sections/deposit-withdraw/README.md`
- `product-plan/sections/deposit-withdraw/tests.md`
- `product-plan/sections/deposit-withdraw/components/`
- `product-plan/sections/deposit-withdraw/types.ts`
- `product-plan/sections/deposit-withdraw/sample-data.json`

## Expected User Flows

**Deposit via Lightning:**
1. User clicks "Deposit" in Portfolio → method chooser opens
2. User selects "Lightning" → Deposit Lightning view opens
3. User selects mint, enters amount via numpad
4. User taps "CREATE INVOICE" → Lightning invoice generated and displayed
5. User pays invoice externally → deposit confirmed, balance updates

**Withdraw via Ecash:**
1. User clicks "Withdraw" in Portfolio → method chooser opens
2. User selects "Ecash" → Send Ecash view opens
3. User selects mint, enters amount via numpad
4. User taps "SEND" → Cashu token generated for sharing

**Pay Lightning:**
1. User clicks "Withdraw" → method chooser → selects "Lightning"
2. User pastes or scans a Lightning invoice/address
3. Payment executes from selected mint

## Done When

- [ ] Tests written and passing
- [ ] Method chooser renders correctly for both deposit and withdraw modes
- [ ] Deposit Ecash: Paste, Scan, and Request actions trigger correct callbacks
- [ ] Deposit Lightning: numpad builds amount, CREATE INVOICE generates real invoice
- [ ] Send Ecash: numpad builds amount, SEND creates and displays Cashu token
- [ ] Pay Lightning: invoice input accepts text/paste, QR scan opens camera
- [ ] Mint selector shows real mints with balances, cycling works
- [ ] Currency toggle switches between BTC and fiat display
- [ ] Modal closes properly and returns to Portfolio
- [ ] Balance and activity update after successful deposit/withdrawal
- [ ] Responsive: bottom sheet on mobile, centered modal on desktop
