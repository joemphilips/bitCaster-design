# Deposit & Withdraw

## Overview
Modal overlay flows for depositing and withdrawing sats via Ecash and Lightning. Mirrors cashu.me's Receive/Send UX with a bottom sheet method chooser followed by method-specific full-screen views.

Accessed from the Deposit and Withdraw buttons in the Portfolio section.

## Components
- `DepositWithdraw` — Root component managing modal state and view transitions
- `MethodChooser` — Bottom sheet with Ecash / Lightning options
- `DepositEcash` — Three action rows: Paste, Scan, Request
- `DepositLightning` — Mint selector, amount numpad, CREATE INVOICE button
- `SendEcash` — Mint selector, amount numpad, SEND button
- `PayLightning` — Mint selector, Lightning address/invoice input, QR scan option
- `MintSelector` — Dropdown card showing mint name and available balance
- `Numpad` — 3x4 numeric keypad (1-9, empty, 0, backspace)
- `AmountDisplay` — Large centered amount with fiat conversion and currency toggle

## Flows

### Deposit
1. Tap "Deposit" in Portfolio → bottom sheet with Ecash / Lightning
2. **Ecash**: Paste, Scan, or Request actions
3. **Lightning**: Enter amount via numpad → CREATE INVOICE

### Withdraw
1. Tap "Withdraw" in Portfolio → bottom sheet with Ecash / Lightning
2. **Ecash**: Enter amount via numpad → SEND
3. **Lightning**: Paste or scan Lightning invoice/address

## Responsive Behavior
- Mobile: Method chooser is a bottom sheet; views take full viewport; large touch targets (48px min)
- Desktop: Method chooser is a centered modal overlay; views are centered modal (max-width ~480px); numpad accepts keyboard input

## Configuration
- shell: false
