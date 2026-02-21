# Settings

## Overview
User preferences organized into 4 collapsible category groups: General (currency, language, theme), Cashu (mints, seed backup), Nostr (signer, profile, relays), and Oracle (coming soon placeholder).

## User Flows
- Toggle category groups (accordion behavior)
- Change base currency (BTC/USD/JPY)
- Change language (English/Japanese)
- Change theme (Light/Dark/System)
- View and manage connected mints
- View seed phrase backup
- Configure Nostr signer (None/NIP-07/nsec)
- View fetched Nostr profile
- Manage Nostr relays

## Data Used
**Entities:** SettingsState, GeneralSettings, CashuSettings, NostrSettings, OracleSettings, MintConfig, NostrProfile, RelayConfig

## Components Provided
- `Settings` — Main settings page with collapsible categories

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCategoryToggle` | Toggle category group |
| `onBaseCurrencyChange` | Change currency |
| `onLanguageChange` | Change language |
| `onThemeChange` | Change theme |
| `onAddMint` | Add mint URL |
| `onRemoveMint` | Remove mint |
| `onViewSeedPhrase` | View seed phrase |
| `onSignerModeChange` | Change Nostr signer |
| `onNsecSubmit` | Submit nsec key |
| `onAddRelay` | Add Nostr relay |
| `onRemoveRelay` | Remove relay |
