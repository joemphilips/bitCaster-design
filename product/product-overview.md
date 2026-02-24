# bitCaster

## Description
bitCaster is an open-source Cashu wallet with prediction market superpowers. It combines a full-featured ecash wallet — send, receive, and manage sats privately via Lightning — with a Bitcoin-native prediction market where users trade outcomes using Cashu conditional tokens (CTF). No accounts, no KYC, no bridging — just sats.

## Problems & Solutions

### Problem 1: Privacy & anonymity are afterthoughts
Existing prediction markets require accounts, KYC, or on-chain transactions that expose trading activity. bitCaster uses Cashu ecash bearer tokens — anonymous by default, with no accounts and no on-chain trace. Users hold their own tokens client-side; even the mint cannot link trades to identities.

### Problem 2: Markets are controlled by platforms
Centralized platforms decide which markets exist and who can participate. bitCaster enables open market creation via Nostr event announcements and DLC oracle attestations — anyone can propose events, and any compatible oracle can resolve them, making censorship structurally difficult.

### Problem 3: Bitcoin users face unnecessary friction
Other platforms require altcoin bridging, gas fees, or platform-specific tokens. bitCaster is Bitcoin-native end to end: deposit via Lightning, trade in sats, withdraw to any Lightning wallet. Zero token overhead, zero bridging.

### Problem 4: Prediction market protocols are closed
Polymarket and Predyx run proprietary systems that lock users into a single platform. bitCaster is built on open specifications — NUT-CTF for conditional tokens, Nostr kind 88 for oracle announcements, and DLC for attestation. Any developer can build a compatible mint, client, or oracle.

## Key Features
- Cashu ecash wallet — send, receive, and manage sats with full privacy
- Lightning deposit and withdrawal — no accounts, no bridging, no gas
- Prediction market trading — buy and sell outcome shares on a central limit order book
- Real-time price discovery — live odds, order book depth, and price charts via SignalR
- Portfolio tracking — positions, P/L charts, activity history, and fund management
- Open market creation — propose markets via Nostr + DLC oracle announcements (later phase)
- Seed phrase backup — recover wallet and positions from a BIP-39 mnemonic
- Multi-mint support — connect to any NUT-CTF compatible Cashu mint
- Brand motto: "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE"

## Sections
- **Wallet Setup** — First-time onboarding wizard for wallet creation or recovery
- **Markets** — Market discovery and trading (default home view)
- **Market Detail** — Detailed trading view with order book, charts, and trade panel
- **Portfolio** — Positions, funds, P/L chart, activity feed, and created markets
- **Deposit / Withdraw** — Fund the wallet or cash out via Ecash or Lightning
- **Settings** — User preferences (currency, theme, connected mints, Nostr, seed backup)
- **Market Creation & Management** — Creator dashboard for managing and creating markets (later phase)
- **Market Creation** — 7-step wizard for creating new prediction markets (later phase)
