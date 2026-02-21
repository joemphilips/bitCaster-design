# Test Instructions: Settings

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup.

## Overview
Test the 4 collapsible settings categories: General, Cashu, Nostr, and Oracle. Each category is an accordion group; only one expands at a time.

## User Flow Tests

### Flow 1: Toggle Category Groups (Accordion)
**Success Path:**
- Setup: General category open by default
- Steps: Click "Cashu Settings" header
- Expected: General collapses, Cashu expands; only one group is open at a time

### Flow 2: Change Base Currency
**Success Path:**
- Steps: Expand General → click "USD" in currency selector
- Expected: onBaseCurrencyChange('USD') called, USD option highlighted

### Flow 3: Change Theme
**Success Path:**
- Steps: Expand General → select "Light" theme
- Expected: onThemeChange('light') called, theme updates immediately across the UI

### Flow 4: Add Mint
**Success Path:**
- Steps: Expand Cashu → click "Add Mint" → enter valid URL "https://mint.example.com" → submit
- Expected: onAddMint called with URL, connection test runs automatically, status transitions connecting → connected

**Failure Path:**
- Steps: Enter malformed URL "not-a-url" → submit
- Expected: URL validation error shown, onAddMint not called

### Flow 5: Remove Non-Default Mint
**Success Path:**
- Steps: Expand Cashu → click delete icon on a non-default mint
- Expected: onRemoveMint called with mint URL, mint removed from list

**Failure Path:**
- Setup: Default mint row
- Expected: No delete icon visible, mint cannot be removed

### Flow 6: View Seed Phrase
**Success Path:**
- Steps: Expand Cashu → click "View Seed Phrase" → confirm security warning dialog
- Expected: onViewSeedPhrase called, seed phrase revealed

**Failure Path:**
- Steps: Dismiss security dialog without confirming
- Expected: Seed phrase not shown, onViewSeedPhrase not called

### Flow 7: Configure NIP-07 Nostr Signer
**Success Path:**
- Steps: Expand Nostr → select "NIP-07 Extension" from signer dropdown
- Expected: onSignerModeChange('nip07') called, profile fetches and preview displays npub, name, avatar

**Failure Path:**
- Setup: No NIP-07 extension installed in browser
- Expected: Error message "No NIP-07 extension detected", signer mode not changed

### Flow 8: Enter nsec Private Key
**Success Path:**
- Steps: Expand Nostr → select "Private Key (nsec)" → enter valid nsec value in password field
- Expected: onNsecSubmit called, profile derived and previewed, field shows dots (password mode)

**Failure Path:**
- Steps: Enter invalid string "notansec"
- Expected: Validation error "Invalid nsec key", onNsecSubmit not called

### Flow 9: Toggle nsec Visibility
- Steps: Click show/hide eye icon on nsec input
- Expected: Field toggles between type="password" and type="text"

### Flow 10: Manage Relays
**Success Path:**
- Steps: Expand Nostr → click "Add Relay" → enter "wss://relay.damus.io" → submit
- Expected: onAddRelay called, relay appears in list with connection status

**Failure Path:**
- Steps: Enter non-WSS URL "http://relay.example.com"
- Expected: Validation error "Relay URL must start with wss://", onAddRelay not called

## Empty State Tests
- No additional mints → only default mint shown with "Default" badge, no delete button
- No Nostr profile loaded → placeholder avatar, "Not connected" label shown in Nostr section
- No relays added → "No relays configured" message with "Add Relay" CTA

## Component Tests
- Accordion: only one category open at a time, chevron rotates on open/close
- CurrencySelector: BTC and USD options rendered, active one highlighted
- MintRow: shows URL, connection status dot (green=connected, yellow=connecting, red=failed), Default badge if applicable
- SignerSelector: none, nip07, nsec options; nsec shows password input when selected
- RelayRow: shows URL, connection status, remove button
- NostrProfilePreview: shows avatar (or initials), npub (truncated), display name, NIP-05 badge if verified
- Oracle category: visually disabled with "Coming Soon" badge, all controls non-interactive

## Edge Cases
- Oracle settings section is entirely non-interactive with "Coming Soon" overlay
- NIP-05 verification badge shown only when profile has verified nip05 field
- Relay connection status updates in real time (connecting animation while attempting)
- Very long mint URL truncates in display but stored in full
- App version displayed in General section (read-only)
- Language selector currently shows only "English (en)" with others grayed as coming soon

## Accessibility
- Accordion headers are buttons with aria-expanded reflecting state
- Category group content regions have aria-hidden when collapsed
- Password input for nsec has matching label, show/hide button has aria-label
- Error messages linked to their inputs via aria-describedby
- Delete buttons have aria-label including the mint URL or relay URL

## Sample Test Data
```typescript
const mockSettings = {
  general: {
    baseCurrency: "BTC" as const,
    language: "en",
    theme: "dark" as const,
    appVersion: "0.1.0"
  },
  cashu: {
    mints: [
      {
        url: "http://localhost:3338",
        isDefault: true,
        connectionStatus: "connected" as const,
        alias: "Local Dev Mint"
      },
      {
        url: "https://mint.minibits.cash/Bitcoin",
        isDefault: false,
        connectionStatus: "connected" as const,
        alias: "Minibits"
      }
    ]
  },
  nostr: {
    signerMode: "none" as const,
    profile: null,
    profileFetchStatus: "idle" as const,
    relays: []
  },
  oracle: {
    comingSoon: true
  }
};

const mockSettingsWithNostr = {
  ...mockSettings,
  nostr: {
    signerMode: "nip07" as const,
    profile: {
      npub: "npub1abc123...",
      displayName: "SatoshiTrader",
      avatarUrl: "https://example.com/avatar.png",
      nip05: "trader@example.com",
      nip05Verified: true
    },
    profileFetchStatus: "success" as const,
    relays: [
      { url: "wss://relay.damus.io", connectionStatus: "connected" as const },
      { url: "wss://nos.lol", connectionStatus: "connecting" as const }
    ]
  }
};

const mockSingleDefaultMint = {
  mints: [
    {
      url: "http://localhost:3338",
      isDefault: true,
      connectionStatus: "connected" as const,
      alias: "Local Dev Mint"
    }
  ]
};
```
