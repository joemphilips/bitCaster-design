# bitCaster — Product Overview

## Summary

bitCaster is an open-source Cashu wallet with prediction market superpowers. It combines a full-featured ecash wallet — send, receive, and manage sats privately via Lightning — with a Bitcoin-native prediction market where users trade outcomes using Cashu conditional tokens (CTF). No accounts, no KYC, no bridging — just sats.

## Key Features
- Cashu ecash wallet — send, receive, and manage sats with full privacy
- Lightning deposit and withdrawal — no accounts, no bridging, no gas
- Prediction market trading — buy and sell outcome shares on a central limit order book
- Confirmed price discovery — nullable current prices and history come only from confirmed settlement fills
- Portfolio tracking — positions, P/L charts, activity history, and fund management
- Open market creation — propose markets via Nostr + DLC oracle announcements (later phase)
- Seed phrase backup — recover wallet and positions from a BIP-39 mnemonic
- Multi-mint support — connect to any NUT-CTF compatible Cashu mint
- Brand motto: "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE"

## Planned Sections

1. **Wallet Setup** — First-time onboarding wizard for wallet creation or recovery
2. **Portfolio** — Positions, funds, P/L chart, activity feed, and created markets
3. **Deposit / Withdraw** — Fund the wallet or cash out via Ecash or Lightning
4. **Settings** — User preferences (currency, theme, connected mints, Nostr, seed backup)
5. **Market Discovery & Trading** — Core marketplace with cards that open market detail (default home view)
6. **Market Detail** — BUY, SELL, and LIQUIDITY routes with explicit empty, unavailable, and closed states
7. **Market Creation & Management** — Creator dashboard for managing and creating markets (later phase)
8. **Market Creation** — 7-step wizard for creating new prediction markets (later phase)

## Data Model

Core entities:
- **Condition** — A prediction question registered on a NUT-CTF compliant mint
- **Market** — A tradeable view combining protocol data from the mint with real-time trade data
- **Outcome** — A possible result within a condition (maps to NUT-CTF outcome collection)
- **Position** — A user's stake on a specific outcome (reconstructed from local ecash tokens)
- **Order** — A buy or sell order on the order book
- **Trade** — A completed transaction between a buyer and a seller
- **Fund** — Base ecash balance held in the wallet (not locked to any market)
- **Activity** — Ledger entry for deposits, withdrawals, buys, sells, and payouts
- **Mint** — A connected Cashu mint
- **Oracle** — A DLC oracle that announces events via Nostr
- **Comment** — A user comment on a market

## Design System

**Colors:**
- Primary: `blue`
- Secondary: `amber`
- Neutral: `slate`

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Wallet Setup** — First-time onboarding wizard (5-step flow)
3. **Portfolio** — Trading dashboard with positions, P/L, and activity feed
4. **Deposit / Withdraw** — Modal flows for Ecash and Lightning deposit/withdrawal
5. **Settings** — User preferences and configuration
6. **Market Discovery & Trading** — Core marketplace with tag navigation, filters, price states, and market-detail navigation
7. **Market Detail** — BUY, SELL, and LIQUIDITY routes with charts and order book
8. **Market Creation & Management** — Creator dashboard (later phase)
9. **Market Creation** — 7-step market creation wizard (later phase)

Each milestone has a dedicated instruction document in `product-plan/instructions/`.

Funding adds bot capacity. It does not itself guarantee executable orders, immediate order-book depth, or a confirmed price. Repeatable funding implementation remains Phase 9 work.
