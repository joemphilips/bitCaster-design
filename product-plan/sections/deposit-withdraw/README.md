# Deposit / Withdraw

## Overview
Modal overlay flows for depositing and withdrawing sats. Accessed from the Deposit and Withdraw buttons in the Portfolio section. Mirrors cashu.me's Receive/Send UX — a bottom sheet method chooser followed by method-specific full-screen views.

## User Flows

### Deposit
1. User taps "Deposit" in Portfolio
2. Bottom sheet slides up with title "Deposit" and two options: **Ecash** and **Lightning**
3a. **Ecash** → "Deposit Ecash" screen with three actions: Paste, Scan, Request
3b. **Lightning** → "Deposit Lightning" full-screen with mint selector, amount numpad, and "CREATE INVOICE" button

### Withdraw
1. User taps "Withdraw" in Portfolio
2. Bottom sheet slides up with title "Withdrawal" and two options: **Ecash** and **Lightning**
3a. **Ecash** → "Send Ecash" full-screen with mint selector, amount numpad, and "SEND" button
3b. **Lightning** → "Pay Lightning" full-screen with mint selector, Lightning address/invoice input, and QR scan option

## Data Used
**Entities:** MintInfo, DepositWithdrawProps
**From global model:** DepositReceived, WithdrawalRequested, WithdrawalCompleted

## Components Provided
- `DepositWithdraw` — Main router component (switches on `currentView`)
- `MethodChooser` — Bottom sheet with Ecash / Lightning options
- `DepositEcash` — Paste, Scan, Request actions
- `DepositLightning` — Mint selector + amount numpad + CREATE INVOICE
- `SendEcash` — Mint selector + amount numpad + SEND
- `PayLightning` — Mint selector + invoice/address input + QR scan
- `MintSelector` — Dropdown showing selected mint with balance
- `AmountDisplay` — Large centered amount with currency toggle
- `Numpad` — 3×4 numeric keypad

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSelectMethod` | User selects Ecash or Lightning method |
| `onNumpadPress` | User taps a numpad key |
| `onMintChange` | User changes selected mint |
| `onToggleCurrency` | Toggle between fiat and sats display |
| `onCreateInvoice` | Tap "CREATE INVOICE" (deposit lightning) |
| `onSendEcash` | Tap "SEND" (send ecash) |
| `onPaste` | Tap "Paste" (deposit ecash or pay lightning) |
| `onScan` | Tap "Scan" (deposit ecash) |
| `onRequest` | Tap "Request" (deposit ecash) |
| `onScanQR` | Tap "Scan QR Code" (pay lightning) |
| `onLightningInputChange` | Lightning input text changes |
| `onBack` | Navigate back within flow |
| `onClose` | Close the entire modal |
| `onToggleFullscreen` | Toggle fullscreen mode |

## Responsive Behavior
- **Mobile**: Method chooser is a bottom sheet; full-screen views take over the viewport
- **Desktop**: Method chooser as centered modal; full-screen views centered (max-width ~480px)

## Configuration
- shell: false (rendered as modal overlay, not part of main app shell)
