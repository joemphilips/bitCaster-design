# bitCaster — Product Overview

## Summary

bitCaster is a Bitcoin-native prediction market platform where anyone can create, trade, and monetize markets. All markets are denominated in sats, providing global accessibility without the barriers of traditional prediction market platforms.

### Problems & Solutions

1. **High barriers to entry** — Bitcoin-only deposits enable global accessibility - anyone with Bitcoin can participate regardless of geography, bank account, or KYC requirements. No complex token swaps or platform currencies.

2. **Centralized control over markets** — Freedom of market creation with a hybrid approach - permissionless creation with quality controls and dispute resolution mechanisms to maintain integrity.

3. **Limited creator incentives** — Market creators can monetize their insights by collecting fees from the markets they create, encouraging diverse and high-quality market offerings.

## Key Features

- Bitcoin-only deposits with sat denomination
- Open market creation for any user
- Fee collection system for market creators
- Automated market resolution and payout distribution
- Real-time trading with live price discovery
- Hybrid moderation (permissionless with quality controls)
- Brand motto display: "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE"

## Planned Sections

1. **Market Discovery & Trading** — Core marketplace where users browse active prediction markets, view odds, and place trades in real-time.

2. **Market Creation & Management** — Tools for users to create new prediction markets, configure parameters, set fees, and manage their markets.

3. **MyPage** — Personal dashboard with Bitcoin wallet, deposits/withdrawals in sats, transaction history, and balance management.

## Data Model

The platform uses the following core entities:

- **User** — Platform participants with profiles and balances
- **Market** — Prediction markets with outcomes, odds, and trading activity
- **Position** — User holdings in specific market outcomes
- **Order** — Deposits and withdrawals (Lightning and on-chain)
- **Tags** — Categories for organizing and discovering markets

## Design System

**Colors:**
- Primary: `blue` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, secondary elements
- Neutral: `slate` — Used for backgrounds, text, borders

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Market Discovery & Trading** — Core marketplace browsing and trading interface
3. **Market Creation & Management** — Creator dashboard and market creation wizard
4. **MyPage** — Personal dashboard with positions, orders, and created markets

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
