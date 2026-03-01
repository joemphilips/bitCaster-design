# Milestone 7: Settings

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1-6 complete

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
Implement the Settings section — user preferences organized into 4 collapsible category groups.

## Overview
Accessed via gear icon in Portfolio header or User dropdown menu. Manages general preferences, Cashu mint connections, Nostr identity, and oracle configuration.

**Key Functionality:**
- 4 collapsible categories (accordion, one expanded at a time)
- General: Base currency (BTC/USD/JPY), Language (en/ja), Theme (Light/Dark/System)
- Cashu: Connected mints list, add/remove mints, seed phrase backup
- Nostr: Signer mode (None/NIP-07/nsec), profile preview, relay management
- Oracle: Coming soon placeholder (visually muted)

## What to Implement

### Components
- `Settings.tsx` — Main settings page with collapsible groups

### Key Callbacks
- `onCategoryToggle` — Expand/collapse category
- `onBaseCurrencyChange`, `onLanguageChange`, `onThemeChange` — General
- `onAddMint`, `onRemoveMint`, `onViewSeedPhrase` — Cashu
- `onSignerModeChange`, `onNsecSubmit`, `onAddRelay`, `onRemoveRelay` — Nostr

## Expected User Flows

### Flow 1: Change Theme
1. User opens Settings, General expanded by default
2. User selects "Light" theme
**Outcome:** Theme changes to light mode

### Flow 2: Add a Mint
1. User expands Cashu section
2. User clicks "Add Mint", enters URL
3. Connection test runs
**Outcome:** Mint added to connected mints list

### Flow 3: Connect Nostr
1. User expands Nostr section
2. User selects "NIP-07 Extension"
3. Profile fetched and displayed
**Outcome:** Nostr identity connected

## Done When
- [ ] Tests written and passing
- [ ] 4 collapsible categories work (accordion behavior)
- [ ] General settings: currency, language, theme all functional
- [ ] Cashu: mint list, add/remove, seed backup
- [ ] Nostr: signer mode, profile preview, relay management
- [ ] Oracle: coming soon placeholder with muted styling
- [ ] Responsive on mobile
