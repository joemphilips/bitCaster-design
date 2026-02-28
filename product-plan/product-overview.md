# bitCaster — Product Overview

## Summary

bitCaster is a Bitcoin-native prediction market platform where anyone can create, trade, and monetize markets. All markets are denominated in sats, providing global accessibility without the barriers of traditional prediction market platforms. Built on Cashu (ecash), Nostr (social protocol), and DLC oracles (decentralized oracle attestation).

## Problems & Solutions

### Problem 1: High barriers to entry
Bitcoin-only deposits enable global accessibility — anyone with Bitcoin can participate regardless of geography, bank account, or KYC requirements. No complex token swaps or platform currencies.

### Problem 2: Centralized control over markets
Freedom of market creation with a hybrid approach — permissionless creation with quality controls and dispute resolution mechanisms to maintain integrity.

### Problem 3: Limited creator incentives
Market creators can monetize their insights by collecting fees from the markets they create, encouraging diverse and high-quality market offerings.

## Key Features
- Bitcoin-only deposits with sat denomination
- Open market creation for any user
- Fee collection system for market creators
- Automated market resolution and payout distribution
- Real-time trading with live price discovery
- Hybrid moderation (permissionless with quality controls)
- Cashu ecash for privacy-preserving transactions
- Nostr integration for decentralized identity and social features
- DLC oracle attestation for trustless market resolution

## Planned Sections

### 1. Market Discovery & Trading
Core marketplace where users browse active prediction markets, view odds, and place trades in real-time. Features tag-based navigation, inline trading from market cards, and support for Yes/No and Categorical markets.

### 2. Market Creation & Management
Tools for users to create new prediction markets via a 5-step wizard, configure parameters, set fees, and manage their markets through a dashboard with analytics.

### 3. Portfolio
Trading dashboard with positions, P/L chart, deposit/withdraw, activity feed, and created markets. Replaces the earlier "MyPage" concept.

### 4. Market Detail
Comprehensive view of a single prediction market with trading panel, price charts with comment overlays, resolution details, activity feed, and related markets. Supports all market types.

### 5. Settings
User preferences and configuration organized into 4 collapsible category groups: General (currency, language, theme), Cashu (connected mints, seed backup), Nostr (signer mode, profile, relays), and Oracle (coming soon).

### 6. Wallet Setup
First-time onboarding wizard for creating a new wallet or recovering an existing one from a seed phrase. Includes PWA installation confirmation.

### 7. Market Creation
Seven-step wizard for creating new prediction markets, starting with oracle announcement check, then market type, basic info, outcomes, fee settings, cost preview, and final review.

### 8. Deposit / Withdraw
Modal overlay flows for depositing and withdrawing sats via Ecash or Lightning. Features a method chooser bottom sheet, then method-specific full-screen views: Deposit Ecash (Paste/Scan/Request), Deposit Lightning (numpad + CREATE INVOICE), Send Ecash (numpad + SEND), and Pay Lightning (invoice input + QR scan). Includes mint selector with balance display and BTC/fiat currency toggle.

## Technology Stack
- **React 19** with **TypeScript** strict mode
- **Tailwind CSS** for styling (blue/amber/slate color scheme)
- **lucide-react** for icons
- Supports **light and dark mode**
- **AMM (Automated Market Maker)** trading model
- **Cashu** ecash protocol for token management
- **Nostr** (NDK) for decentralized identity and social features
- **DLC oracles** for trustless market resolution

## Design System
- **Primary**: Blue (actions, interactive elements)
- **Secondary**: Amber (highlights, volume indicators)
- **Neutral**: Slate (backgrounds, text)
- **Accent**: Bitcoin orange `#f7931a`
- **Typography**: Inter (headings, body), JetBrains Mono (balances, numbers)

## Currency Display
All values displayed in sats with the ₿ symbol prefix:
- `₿12,500` (not "12,500 sats")
- `₿12.5K` for thousands
- `₿1.2M` for millions

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Market Discovery & Trading** — Core marketplace with browsing and trading
3. **Market Creation & Management** — Creator dashboard and market management
4. **Portfolio** — Personal trading dashboard with positions, funds, and activity
5. **Market Detail** — Detailed market view with trading panel and charts
6. **Settings** — User preferences and configuration
7. **Wallet Setup** — First-time onboarding wizard
8. **Market Creation** — Seven-step market creation wizard
9. **Deposit / Withdraw** — Modal overlay flows for depositing and withdrawing sats

Each milestone has a dedicated instruction document in `instructions/incremental/`.
