# Milestone 6: Deposit / Withdraw

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-5 complete

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
Implement the Deposit/Withdraw flows — modal overlays for funding and cashing out via Ecash or Lightning.

## Overview
Modal overlay flows accessed from Portfolio deposit/withdraw buttons. Mirrors cashu.me's Receive/Send UX with bottom sheet method chooser and method-specific full-screen views.

**Key Functionality:**
- Method chooser bottom sheet (Ecash / Lightning)
- Deposit Ecash: Paste, Scan, Request actions
- Deposit Lightning: Mint selector, amount numpad, CREATE INVOICE
- Send Ecash: Mint selector, amount numpad, SEND
- Pay Lightning: Mint selector, invoice/address input, Scan QR

## What to Implement

### Components
- `DepositWithdraw.tsx` — Main orchestrator
- `MethodChooser.tsx` — Bottom sheet with Ecash/Lightning options
- `DepositEcash.tsx` — Deposit Ecash actions
- `DepositLightning.tsx` — Lightning deposit with numpad
- `SendEcash.tsx` — Send Ecash with numpad
- `PayLightning.tsx` — Pay Lightning invoice
- `MintSelector.tsx` — Mint dropdown with balance
- `Numpad.tsx` — Numeric keypad
- `AmountDisplay.tsx` — Amount with fiat conversion

### Key Callbacks
- `onSelectMethod` — Choose Ecash/Lightning
- `onNumpadPress` — Numpad key input
- `onMintChange` — Switch mint
- `onToggleCurrency` — Sats/fiat toggle
- `onCreateInvoice` — Generate Lightning invoice
- `onSendEcash` — Send ecash tokens
- `onPaste` / `onScan` / `onRequest` — Deposit ecash actions
- `onScanQR` — Scan QR for Lightning payment
- `onClose` / `onBack` — Navigation

## Expected User Flows

### Flow 1: Deposit via Lightning
1. User taps "Deposit" in Portfolio
2. Method chooser appears, user selects "Lightning"
3. User enters amount on numpad
4. User taps "CREATE INVOICE"
**Outcome:** Lightning invoice generated

### Flow 2: Withdraw via Ecash
1. User taps "Withdraw" in Portfolio
2. Method chooser appears, user selects "Ecash"
3. User enters amount, taps "SEND"
**Outcome:** Ecash token generated for sharing

## Done When
- [ ] Tests written and passing
- [ ] Method chooser bottom sheet works
- [ ] All 4 flow views render correctly
- [ ] Numpad accepts input and updates amount
- [ ] Fiat/sats toggle works
- [ ] Mint selector shows available mints
- [ ] No shell displayed (modal overlay)
- [ ] Responsive on mobile (bottom sheet)
