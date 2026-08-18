# Product Roadmap

## Sections

### 1. Wallet Setup
First-time onboarding wizard for creating a new wallet or recovering an existing one from a seed phrase. This is the entry point for all new users and must complete before any other section is accessible.

### 2. Portfolio
Trading dashboard with positions (active and closed), base ecash funds, P/L chart, activity feed (deposits, withdrawals, trades, payouts), and created markets.

### 3. Deposit / Withdraw
Modal overlay flows for depositing and withdrawing sats via Ecash or Lightning. Mirrors cashu.me Receive/Send UX with method chooser bottom sheet and method-specific full-screen views.

### 4. Settings
User preferences including base currency, language, theme, connected Cashu mints, Nostr identity and relays, oracle configuration, and seed phrase backup.

### 5. Market Discovery & Trading
Core marketplace where users browse active prediction markets. Cards show confirmed, no-trade, or unavailable price states and open market detail. Cards do not contain inline trading.

### 6. Market Detail
Detailed view of a single prediction market. Open markets use BUY, SELL, and LIQUIDITY routes. Empty BUY and SELL routes show guidance without an order form. Closed markets show no trading or funding action.

### 7. Market Creation & Management
Dashboard for market creators to manage their prediction markets. Includes overview with stats and market list, analytics with volume charts, and an Add Market wizard for creating new markets via a 5-step flow. Later phase.

### 8. Market Creation
Seven-step wizard for creating new prediction markets, accessed from the Market Creation & Management dashboard. Starts with oracle announcement check, then market type, basic info, outcomes, fee settings, cost preview, and final review. Later phase.

### Phase 9 Dependency

Repeatable funding implementation remains Phase 9 work. Funding adds bot capacity but does not itself guarantee executable orders, immediate depth, or a confirmed price.
