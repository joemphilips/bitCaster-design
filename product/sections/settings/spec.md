# Settings Specification

## Overview
User preferences and configuration page. Accessed via the gear icon in the Portfolio header (mobile) or from the User dropdown menu (desktop).

## User Flows
- Select base currency for display (BTC, USD, JPY)
- Select theme preference (Light, Dark, System)
- View and manage connected mints
- Add a new mint URL
- Remove a non-default mint (swipe-to-delete on mobile, delete button on desktop)
- View seed phrase for wallet backup (with confirmation dialog)
- View app version and about information

## UI Requirements

### Base Currency
- Segmented control with three options: BTC | USD | JPY
- Default: BTC
- Affects how amounts are displayed throughout the app

### Theme
- Segmented control with three options: Light | Dark | System
- Default: Dark
- System follows OS preference

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

### About
- App version number
- Links to project repository, documentation, and support

## Configuration
- shell: true
