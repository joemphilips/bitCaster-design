# Deposit / Withdraw Specification

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

## UI Requirements

### Method Chooser (Bottom Sheet)
- Slides up from bottom as a dark overlay modal
- Header: X close button (left), title centered ("Deposit" or "Withdrawal"), fullscreen icon (right)
- Two large row options with icons:
  - **Ecash** — chain link icon, dark card background, full-width tap target
  - **Lightning** — lightning bolt icon, dark card background, full-width tap target
- Tapping a row navigates to the corresponding full-screen view
- Tapping X or backdrop closes the sheet

### Deposit Ecash
- Header: back arrow (left), "Deposit Ecash" title centered, fullscreen icon (right)
- Three large row options:
  - **Paste** — clipboard icon, "Paste a cashu token from clipboard"
  - **Scan** — QR scan icon, "Scan a QR code"
  - **Request** — document icon, "Request ecash from another user"
- Each row is a full-width dark card with icon + label

### Deposit Lightning
- Full-screen dark view
- Header: X close (left), "Deposit Lightning" title centered, ₿ icon (right)
- **Mint selector**: dropdown card showing mint name + "₿X,XXX available" balance, chevron down
- **Amount display**: large centered ₿0 amount, fiat conversion below (e.g., "$0.00"), currency toggle icon
- **Numeric keypad**: 3×4 grid (1-9, empty, 0, backspace ‹)
- **Action button**: full-width "CREATE INVOICE" button at bottom (disabled when amount is 0)

### Send Ecash (Withdraw Ecash)
- Full-screen dark view
- Header: X close (left), "Send Ecash" title centered, lock icon + ₿ icon (right)
- **Mint selector**: same as Deposit Lightning
- **Amount display**: same as Deposit Lightning
- **Numeric keypad**: same as Deposit Lightning
- **Action button**: full-width "SEND" button at bottom (disabled when amount is 0)

### Pay Lightning (Withdraw Lightning)
- Full-screen dark view
- Header: X close (left), "Pay Lightning" title centered, ₿ icon (right)
- **Mint selector**: same as above
- **Invoice input**: text area with placeholder "Lightning address or invoice", "Paste" button aligned right
- **Scan QR**: card row with QR scan icon + "Scan QR Code" label + "Tap to scan an address" subtitle

### Common Elements
- All full-screen views use a dark background (slate-900/950)
- Mint selector shows the active mint with its balance
- ₿ amounts use monospace font (JetBrains Mono)
- Fiat conversion updates in real-time as amount changes
- Currency toggle switches between BTC and fiat display

## Responsive Behavior

### Mobile
- Method chooser is a bottom sheet (slides up from bottom)
- Full-screen views take over the entire viewport
- Numpad keys are large touch targets (min 48px)

### Desktop
- Method chooser appears as a centered modal overlay
- Full-screen views appear as a centered modal (max-width ~480px)
- Numpad can also accept keyboard input

## Configuration
- shell: false
