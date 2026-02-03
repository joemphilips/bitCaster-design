# bitCaster — Product Overview

## Description
bitCaster is a Bitcoin-native prediction market platform where anyone can create, trade, and monetize markets. All markets are denominated in sats, providing global accessibility without the barriers of traditional prediction market platforms.

## Problems & Solutions

### Problem 1: High barriers to entry
Bitcoin-only deposits enable global accessibility - anyone with Bitcoin can participate regardless of geography, bank account, or KYC requirements. No complex token swaps or platform currencies.

### Problem 2: Centralized control over markets
Freedom of market creation with a hybrid approach - permissionless creation with quality controls and dispute resolution mechanisms to maintain integrity.

### Problem 3: Limited creator incentives
Market creators can monetize their insights by collecting fees from the markets they create, encouraging diverse and high-quality market offerings.

## Key Features
- Bitcoin-only deposits with sat denomination
- Open market creation for any user
- Fee collection system for market creators
- Automated market resolution and payout distribution
- Real-time trading with live price discovery
- Hybrid moderation (permissionless with quality controls)
- Brand motto display: "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE"

## Sections Overview

### 1. Market Discovery & Trading
Core marketplace where users browse active prediction markets, view odds, and place trades in real-time. Features tag-based navigation, inline trading from market cards, and support for Yes/No, Categorical, and 2D composite markets.

### 2. Market Creation & Management
Tools for users to create new prediction markets via a 5-step wizard, configure parameters, set fees, and manage their markets through a dashboard with analytics.

### 3. MyPage
Personal dashboard with profile summary, positions tracking (active and closed), order history with deposits/withdrawals, and a list of created markets.

### 4. Market Detail
Comprehensive view of a single prediction market with trading panel, price charts with comment overlays, resolution details, activity feed, and related markets. Supports all market types including 2D conditional probability visualization.

## Technology Stack
- **React** with **TypeScript** for components
- **Tailwind CSS** for styling (blue/amber/slate color scheme)
- **lucide-react** for icons
- Supports **light and dark mode**
- **AMM (Automated Market Maker)** trading model

## Design System
- **Primary**: Blue (actions, interactive elements)
- **Secondary**: Amber (highlights, volume indicators)
- **Neutral**: Slate (backgrounds, text)
- **Typography**: Inter (headings, body), JetBrains Mono (balances, numbers)

## Currency Display
All values displayed in sats with the ₿ symbol prefix:
- `₿12,500` (not "12,500 sats")
- `₿12.5K` for thousands
- `₿1.2M` for millions
