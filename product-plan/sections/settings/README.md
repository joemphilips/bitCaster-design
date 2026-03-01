# Settings

## Overview
User preferences and configuration page organized into 4 collapsible category groups. Only one category is expanded at a time (accordion behavior). Accessed via the gear icon in the Portfolio header (mobile) or from the User dropdown menu (desktop).

## Components
- `Settings` — Single root component rendering all four category groups as collapsible cards

## Category Groups

| Category | Icon | Label | Status |
|----------|------|-------|--------|
| General | Settings2 | General Settings | Active |
| Cashu | Landmark | Cashu Settings | Active |
| Nostr | Radio | Nostr Settings | Active |
| Oracle | Eye | Oracle Settings | Coming Soon (disabled) |

### 1. General Settings
- **Base Currency**: Segmented control (BTC / USD / JPY), default BTC
- **Language**: Segmented control (English / Japanese), default English
- **Theme**: Segmented control (Light / Dark / System), default Dark
- **About**: App version, links to repo, docs, support

### 2. Cashu Settings
- **Connected Mints**: List with connection status indicators. Default mint has "Default" badge and cannot be removed. "Add Mint" button for new URLs with connection test.
- **Seed Backup**: "View Seed Phrase" button with confirmation dialog, displays 12 words, copy-to-clipboard with 60s auto-clear.

### 3. Nostr Settings
- **Signer Mode**: None / NIP-07 Extension / Private Key (nsec)
- **nsec Input**: Only visible when mode is `nsec`. Password field with show/hide toggle.
- **Profile Preview**: Auto-fetched after key provided. Shows avatar, display name, NIP-05 with verification badge, bio. Status: idle → fetching → found / not-found.
- **Relay Management**: List of relay URLs with connection status. Add/remove relays.

### 4. Oracle Settings (Placeholder)
- Visually muted/disabled section
- "Coming Soon" amber badge
- Description of future oracle capabilities
- No interactive controls

## Configuration
- shell: true
