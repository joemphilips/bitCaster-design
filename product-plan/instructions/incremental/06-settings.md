# Milestone 6: Settings

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

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
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Settings feature — user preferences organized into 4 collapsible category groups covering general display options, Cashu wallet configuration, Nostr identity, and oracle settings.

## Overview

The Settings page presents four accordion-style collapsible sections. Users can expand any section to configure its options; the accordion does not enforce single-open behavior. General settings cover currency, language, and theme. Cashu settings allow managing connected mints and viewing the seed phrase backup. Nostr settings configure the signer mode (none, NIP-07 browser extension, or raw nsec key), display the fetched Nostr profile, and manage relay list. The Oracle section is a placeholder for a future feature.

**Key Functionality:**
- 4 collapsible category groups (General, Cashu, Nostr, Oracle)
- Base currency selection (BTC / USD / JPY)
- Language selection (English / Japanese)
- Theme selection (Light / Dark / System)
- Connected mint management (add URL, remove, view connection status)
- Seed phrase backup view (with authentication gate)
- Nostr signer mode (None / NIP-07 / nsec key input)
- Nostr profile display (fetched from relay after signer configured)
- Nostr relay management (add URL, remove)

## Recommended Approach: Test-Driven Development

There is no dedicated `tests.md` for Settings yet. Write tests based on the behavior described in `product-plan/sections/settings/README.md` and the callback list below.

**TDD Workflow:**
1. Write failing tests for accordion toggle behavior, each settings field, and each save/remove action
2. Implement the `Settings` component wired to real data
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/settings/components/`:

- `Settings` — Main settings page with 4 collapsible category groups

### Data Layer

Key types (see `product-plan/sections/settings/types.ts`):
- `SettingsState`, `GeneralSettings`, `CashuSettings`, `NostrSettings`, `OracleSettings`
- `MintConfig`, `NostrProfile`, `RelayConfig`

API endpoints to implement:
- `GET /settings` — load current settings for the authenticated user
- `PUT /settings/general` — save general settings (currency, language, theme)
- `GET /settings/cashu/mints` — list connected mints with connection status
- `POST /settings/cashu/mints` — add a new mint by URL
- `DELETE /settings/cashu/mints/:mintUrl` — remove a mint
- `GET /settings/cashu/seed-phrase` — retrieve seed phrase (requires re-authentication or PIN)
- `PUT /settings/nostr/signer` — update signer mode and optional nsec
- `GET /settings/nostr/profile` — fetch Nostr profile from relays for current signer
- `GET /settings/nostr/relays` — list configured relays
- `POST /settings/nostr/relays` — add a relay
- `DELETE /settings/nostr/relays/:relayUrl` — remove a relay

Sample data at `product-plan/sections/settings/sample-data.json`.

### Callbacks

Wire up these props on the `Settings` component:

| Callback | What to do |
|----------|------------|
| `onCategoryToggle` | Toggle collapsed/expanded state for a category group |
| `onBaseCurrencyChange` | Call `PUT /settings/general` with updated currency |
| `onLanguageChange` | Call `PUT /settings/general` with updated language; update i18n context |
| `onThemeChange` | Apply theme class to document root; persist via `PUT /settings/general` |
| `onAddMint` | Validate URL format, call `POST /settings/cashu/mints`, refresh list |
| `onRemoveMint` | Confirm removal, call `DELETE /settings/cashu/mints/:mintUrl`, refresh list |
| `onViewSeedPhrase` | Trigger authentication gate, then call `GET /settings/cashu/seed-phrase` and display in modal |
| `onSignerModeChange` | Update local state; show/hide nsec input field accordingly |
| `onNsecSubmit` | Validate nsec format, call `PUT /settings/nostr/signer`, fetch profile |
| `onAddRelay` | Validate WebSocket URL, call `POST /settings/nostr/relays`, refresh list |
| `onRemoveRelay` | Call `DELETE /settings/nostr/relays/:relayUrl`, refresh list |

### Empty States

- No mints connected: "No mints connected — add a mint URL to get started"
- No Nostr relays: "No relays configured — add a relay URL"
- Nostr profile not available (no signer): prompt to configure signer first
- Oracle section: "Coming soon" placeholder

## Files to Reference

- `product-plan/sections/settings/README.md`
- `product-plan/sections/settings/components/`
- `product-plan/sections/settings/types.ts`
- `product-plan/sections/settings/sample-data.json`

## Expected User Flows

**Change theme:**
1. User navigates to `/settings` — all four category groups visible (some collapsed)
2. User expands "General" group
3. User selects "Dark" from theme options — theme applies immediately to entire app; preference persisted

**Add a Cashu mint:**
1. User expands "Cashu" group
2. User types a mint URL into the add-mint input and clicks Add
3. App validates URL format and calls the API
4. Mint appears in the list with a connection status indicator

**Configure Nostr signer (NIP-07):**
1. User expands "Nostr" group
2. User selects "NIP-07" signer mode
3. App detects browser extension and requests connection
4. Nostr profile (avatar, name, pubkey) fetched from relays and displayed

**Configure Nostr signer (nsec):**
1. User selects "nsec" signer mode — nsec text input appears
2. User pastes their nsec key and submits
3. App derives pubkey, fetches profile from relays, displays result

**View seed phrase backup:**
1. User expands "Cashu" group, clicks "View Seed Phrase"
2. Authentication gate appears (PIN or biometric)
3. After authentication, 12-word seed phrase displays in a modal
4. User acknowledges and modal closes

## Done When

- [ ] All four accordion groups toggle correctly
- [ ] General settings (currency, language, theme) persist and apply immediately
- [ ] Theme change updates the entire app appearance in real time
- [ ] Mint list loads, add and remove work end-to-end
- [ ] Seed phrase view is gated behind authentication
- [ ] Nostr signer mode switches correctly; nsec input appears only in nsec mode
- [ ] Nostr profile loads after signer configured
- [ ] Relay list loads, add and remove work end-to-end
- [ ] Oracle section shows "Coming soon" placeholder
- [ ] Empty states display when no mints or relays are configured
- [ ] Responsive on mobile (full-width accordion groups)
