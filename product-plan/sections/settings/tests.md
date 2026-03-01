# Settings — Test Plan

> These tests are framework-agnostic. They describe expected behavior in terms of user actions, visible UI elements, and callback invocations. Adapt to your testing framework (Playwright, Testing Library, Cypress, etc.).

---

## User Flow Tests

### Flow 1 — Change Base Currency
1. Render `Settings` with `activeCategory: 'general'`.
2. Verify General Settings section is expanded.
3. Verify Base Currency segmented control shows BTC, USD, JPY with current selection highlighted.
4. Click "USD" → `onBaseCurrencyChange('USD')` fires.

### Flow 2 — Add Mint
1. Expand Cashu section → `onCategoryToggle('cashu')` fires.
2. Verify the connected mints list is visible with the default mint showing a "Default" badge.
3. Click "Add Mint" → an input field for a new mint URL appears.
4. Enter a mint URL (e.g., "https://mint2.example.com").
5. Connection test runs automatically (shows connecting indicator).
6. On success, `onAddMint` fires with the URL.

### Flow 3 — Connect Nostr via NIP-07
1. Expand Nostr section → `onCategoryToggle('nostr')` fires.
2. Verify Signer Mode options: None, NIP-07 Extension, Private Key (nsec).
3. Select "NIP-07 Extension" → `onSignerModeChange('nip07')` fires.
4. Profile fetch begins (`profileFetchStatus: 'fetching'`).
5. When `profileFetchStatus: 'found'`, verify profile preview shows avatar, display name, NIP-05 with verification badge.

### Flow 4 — View Seed Phrase
1. Expand Cashu section.
2. Click "View Seed Phrase" → a confirmation dialog appears warning about security.
3. Confirm → `onViewSeedPhrase` fires.
4. Verify 12 seed words are displayed in a secure view.

---

## Empty State Tests

- **No additional mints**: Only the default mint is shown. "Add Mint" button is visible below it.
- **No Nostr profile (not-found)**: When `profileFetchStatus: 'not-found'`, a placeholder message reads "Profile not found on connected relays".
- **No relays**: Relay list is empty with only the "Add Relay" button visible.

---

## Component Interaction Tests

- **Accordion behavior**: Expanding "Cashu" collapses "General" (previously expanded). Only one category is expanded at a time.
- **Oracle section disabled**: The Oracle section has "Coming Soon" amber badge. The entire section is visually muted (reduced opacity, disabled pointer events). No interactive controls are rendered.
- **Default mint protection**: The default mint has a "Default" badge and no remove/delete button. It cannot be removed.
- **Nostr nsec input visibility**: The nsec input field is only visible when `signerMode` is `'nsec'`. It is hidden for `'none'` and `'nip07'`.
- **Profile preview fields**: When profile is found, verify avatar image, display name text, NIP-05 identifier, verification badge (checkmark if `nip05verified` is true), and bio text.
- **Theme change**: Clicking "Light", "Dark", or "System" → `onThemeChange` fires with the selected value.
- **Language change**: Clicking "English" or "Japanese" → `onLanguageChange` fires with `'en'` or `'ja'`.
- **Remove mint**: Clicking delete on a non-default mint → `onRemoveMint` fires with the mint URL.
- **Add relay**: Clicking "Add Relay" → input field appears. Entering a wss:// URL and confirming → `onAddRelay` fires.
- **Remove relay**: Clicking delete on a relay → `onRemoveRelay` fires with the relay URL.
- **nsec submit**: Entering a valid nsec and submitting → `onNsecSubmit` fires with the nsec string.

---

## Edge Cases

- **Invalid mint URL**: Entering an invalid URL for "Add Mint" shows a connection test failure.
- **Mint connection error**: A mint with `connectionStatus: 'error'` shows a red indicator.
- **NIP-05 not verified**: Profile preview shows NIP-05 without the verification badge when `nip05verified` is false.
- **Relay connection status**: Each relay shows its connection status (connected = green, disconnected = grey).
- **Category toggle idempotent**: Clicking an already-expanded category header collapses it (all categories closed).

---

## Accessibility Checks

- Category group headers use `role="button"` with `aria-expanded` attribute.
- Segmented controls use `role="radiogroup"` with individual `role="radio"` and `aria-checked`.
- nsec input has `type="password"` with a show/hide toggle that has `aria-label="Show password"` / `aria-label="Hide password"`.
- "View Seed Phrase" confirmation dialog is modal with proper focus trap.
- Mint and relay list items have descriptive labels including connection status.
- "Coming Soon" badge on Oracle section is announced by screen readers.
- Remove buttons have `aria-label="Remove [item name]"`.

---

## Sample Test Data

```typescript
import type {
  SettingsProps,
  SettingsState,
  MintConfig,
  NostrProfile,
  RelayConfig,
} from './types'

const defaultMint: MintConfig = {
  url: 'https://mint.bitcaster.app',
  isDefault: true,
  connectionStatus: 'connected',
  addedDate: '2026-01-01T00:00:00Z',
}

const additionalMint: MintConfig = {
  url: 'https://mint2.example.com',
  isDefault: false,
  connectionStatus: 'connected',
  addedDate: '2026-02-15T10:00:00Z',
}

const sampleNostrProfile: NostrProfile = {
  pubkey: 'npub1abc123...',
  displayName: 'SatoshiFan',
  avatar: '/avatars/satoshi.png',
  nip05: 'satoshi@bitcaster.app',
  nip05verified: true,
  bio: 'Bitcoin maximalist and prediction market enthusiast.',
}

const sampleRelays: RelayConfig[] = [
  { url: 'wss://relay.damus.io', connectionStatus: 'connected' },
  { url: 'wss://relay.nostr.info', connectionStatus: 'disconnected' },
]

const sampleSettings: SettingsState = {
  general: {
    baseCurrency: 'BTC',
    language: 'en',
    theme: 'dark',
    appVersion: '0.1.0',
  },
  cashu: {
    mints: [defaultMint, additionalMint],
  },
  nostr: {
    signerMode: 'nip07',
    profile: sampleNostrProfile,
    profileFetchStatus: 'found',
    relays: sampleRelays,
  },
  oracle: {
    comingSoon: true,
  },
}

const sampleProps: SettingsProps = {
  activeCategory: 'general',
  settings: sampleSettings,
}
```
