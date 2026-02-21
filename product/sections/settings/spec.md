# Settings Specification

## Overview
User preferences and configuration page organized into 4 collapsible category groups. Accessed via the gear icon in the Portfolio header (mobile) or from the User dropdown menu (desktop).

## Category Groups

Each group is a collapsible card with an icon + label + chevron in the header. Clicking the header toggles expand/collapse with animation. Only one category is expanded at a time (tracked by `activeCategory`, defaults to `general`).

| Category | Icon (lucide-react) | Label |
|----------|---------------------|-------|
| General | Settings2 | General Settings |
| Cashu | Landmark | Cashu Settings |
| Nostr | Radio | Nostr Settings |
| Oracle | Eye | Oracle Settings |

---

## 1. General Settings

### Base Currency
- Segmented control with three options: BTC | USD | JPY
- Default: BTC
- Affects how amounts are displayed throughout the app

### Language
- Segmented control with two options: English | Japanese
- Default: English (`en`)
- Values: `en` | `ja`

### Theme
- Segmented control with three options: Light | Dark | System
- Default: Dark
- System follows OS preference

### About
- App version number
- Links to project repository, documentation, and support

---

## 2. Cashu Settings

### Connected Mints
- List of mint URLs with connection status indicator (connected/disconnected/error)
- Default mint (from VITE_MINT_URL) shown with "Default" badge and cannot be removed
- Each non-default mint has a delete action (swipe on mobile, icon button on desktop)
- "Add Mint" button at bottom of list opens input field for new mint URL
- Connection test runs when adding a new mint

### Seed Backup
- "View Seed Phrase" button
- Clicking opens a confirmation dialog warning the user about security
- After confirmation, displays the 12-word seed phrase in a secure view
- "Copy to Clipboard" option with auto-clear after 60 seconds

---

## 3. Nostr Settings

### Signer Mode
- Segmented control or radio group with three options: None | NIP-07 Extension | Private Key (nsec)
- Default: None
- Determines how the user authenticates with Nostr

### nsec Input
- Only visible when signer mode is `nsec`
- Password-style text field with show/hide toggle
- Validates nsec format on input

### Profile Preview
- Auto-fetched after a key is provided (either via NIP-07 or nsec)
- Displays: avatar, display name, NIP-05 identifier with verification badge, bio
- Fetch status indicator: idle → fetching → found / not-found
- When `not-found`: shows placeholder with message "Profile not found on connected relays"

### Relay Management
- List of relay URLs with connection status (connected/disconnected)
- Each relay has a delete action
- "Add Relay" button at bottom of list opens input field for new relay URL (wss://)

---

## 4. Oracle Settings (Placeholder)

### Coming Soon
- Section header displays "Become an Oracle" with an amber "Coming Soon" badge
- Description text explaining future oracle capabilities:
  - Run a DLC oracle and publish kind-88 announcements on Nostr
  - Create and resolve prediction markets
- Entire section is visually muted/disabled — no interactive controls
- Uses reduced opacity and disabled pointer events

---

## User Flows

### General
- Select base currency for display (BTC, USD, JPY)
- Select display language (English, Japanese)
- Select theme preference (Light, Dark, System)
- View app version and about information

### Cashu
- View and manage connected mints
- Add a new mint URL
- Remove a non-default mint (swipe-to-delete on mobile, delete button on desktop)
- View seed phrase for wallet backup (with confirmation dialog)

### Nostr
- Select signer mode (None, NIP-07, nsec)
- Connect via NIP-07 browser extension
- Enter nsec private key manually
- View fetched Nostr profile after connecting
- Add and remove Nostr relays

### Oracle
- View placeholder information about future oracle features

### Category Navigation
- Toggle category groups by clicking headers
- Expanding one group collapses the previously expanded group

## Configuration
- shell: true
