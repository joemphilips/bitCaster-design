# Test Instructions: Deposit / Withdraw

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the deposit and withdraw modal flows: method chooser, ecash deposit actions, lightning deposit with numpad, ecash send with numpad, and lightning pay with invoice input.

## User Flow Tests

### Flow 1: Open Deposit Method Chooser
**Success Path:**
- Setup: mode: 'deposit', currentView: 'chooser'
- Expected: Modal renders with title "Deposit", Ecash and Lightning options visible
- Steps: Click Ecash option
- Expected: onSelectMethod called with 'ecash'

### Flow 2: Open Withdraw Method Chooser
**Success Path:**
- Setup: mode: 'withdraw', currentView: 'chooser'
- Expected: Modal renders with title "Withdrawal", Ecash and Lightning options visible
- Steps: Click Lightning option
- Expected: onSelectMethod called with 'lightning'

### Flow 3: Close Method Chooser
**Success Path:**
- Steps: Click X button or backdrop
- Expected: onClose called

### Flow 4: Deposit Ecash Actions
**Success Path:**
- Setup: currentView: 'deposit-ecash'
- Expected: "Deposit Ecash" title, Paste/Scan/Request options visible
- Steps: Click "Paste"
- Expected: onPaste called
- Steps: Click "Scan"
- Expected: onScan called
- Steps: Click "Request"
- Expected: onRequest called

### Flow 5: Navigate Back from Deposit Ecash
**Success Path:**
- Steps: Click back arrow
- Expected: onBack called

### Flow 6: Deposit Lightning — Enter Amount
**Success Path:**
- Setup: currentView: 'deposit-lightning', amountSats: 0
- Expected: Mint selector visible, amount shows ₿0, "CREATE INVOICE" button disabled
- Steps: Press numpad keys 1, 0, 0, 0
- Expected: onNumpadPress called with '1', '0', '0', '0'

### Flow 7: Deposit Lightning — Create Invoice
**Success Path:**
- Setup: currentView: 'deposit-lightning', amountSats: 5000
- Expected: Amount shows ₿5,000, "CREATE INVOICE" button enabled
- Steps: Click "CREATE INVOICE"
- Expected: onCreateInvoice called

### Flow 8: Send Ecash — Enter Amount and Send
**Success Path:**
- Setup: currentView: 'send-ecash', amountSats: 0
- Expected: Mint selector visible, amount shows ₿0, "SEND" button disabled
- Steps: Enter amount via numpad, then click "SEND"
- Expected: onSendEcash called when button enabled

### Flow 9: Pay Lightning — Enter Invoice
**Success Path:**
- Setup: currentView: 'pay-lightning'
- Expected: Mint selector, invoice textarea, "Scan QR Code" button visible
- Steps: Type lightning address into textarea
- Expected: onLightningInputChange called with the input value

### Flow 10: Pay Lightning — Paste Invoice
**Success Path:**
- Steps: Click "Paste" button in textarea area
- Expected: onPaste called

### Flow 11: Pay Lightning — Scan QR
**Success Path:**
- Steps: Click "Scan QR Code" card
- Expected: onScanQR called

### Flow 12: Toggle Currency Display
**Success Path:**
- Setup: currentView: 'deposit-lightning', showFiatPrimary: false
- Expected: Primary display shows sats (₿X,XXX), secondary shows fiat
- Steps: Click currency toggle
- Expected: onToggleCurrency called

### Flow 13: Change Selected Mint
**Success Path:**
- Setup: Two mints available, first selected
- Steps: Click mint selector
- Expected: onMintChange called with next mint's ID

## Component Tests
- MethodChooser shows correct title based on mode ('Deposit' vs 'Withdrawal')
- MintSelector displays mint name, balance in ₿ format, and initials avatar
- AmountDisplay shows primary/secondary amounts based on showFiatPrimary flag
- Numpad renders 3×4 grid with digits 0-9 and backspace
- DepositLightning disables "CREATE INVOICE" when amountSats is 0
- SendEcash disables "SEND" when amountSats is 0
- PayLightning renders textarea with placeholder and Paste button

## Edge Cases
- Empty mints array: MintSelector returns null
- Single mint: clicking MintSelector cycles back to same mint
- Zero amount: action buttons disabled with reduced opacity
- Long lightning input: textarea scrolls, no overflow
- Fullscreen toggle: onToggleFullscreen called on header button click

## Accessibility
- Modal has proper z-index layering (z-70)
- Backdrop click closes the modal
- Numpad buttons have minimum 48px touch targets
- Action buttons have clear disabled state
- Currency toggle has visible icon indicator

## Sample Test Data
```typescript
const mockMints = [
  {
    id: "mint-001",
    name: "bitCaster Mint",
    url: "https://mint.bitcaster.app",
    balanceSats: 4000
  },
  {
    id: "mint-002",
    name: "28MINT",
    url: "https://28mint.cash",
    balanceSats: 12500
  }
];

const mockDepositState = {
  mode: "deposit" as const,
  currentView: "chooser" as const,
  mints: mockMints,
  selectedMintId: "mint-001",
  amountSats: 0,
  amountFiat: "$0.00",
  fiatSymbol: "$",
  showFiatPrimary: false,
  lightningInput: ""
};

const mockWithdrawState = {
  ...mockDepositState,
  mode: "withdraw" as const
};

const mockLightningDepositState = {
  ...mockDepositState,
  currentView: "deposit-lightning" as const,
  amountSats: 5000,
  amountFiat: "$4.50"
};
```
