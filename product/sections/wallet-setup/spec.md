# Wallet Setup Specification

## Overview
First-time wallet onboarding wizard. A 5-step flow for creating a new wallet or recovering an existing one. Accessed from the Portfolio "Get Started" CTA (when no wallet exists) or from Settings.

## Step 1: Welcome Landing
Full-screen dark page with:
- bitCaster logo (₿ symbol)
- "Welcome to bitCaster" heading
- Description: "You must set up your Cashu wallet before you can start trading on prediction markets."
- "Next" button (full width, rounded pill)
- "By continuing you agree to the Terms of Service" — clicking "Terms of Service" opens a bottom-sheet popup with the full ToS text
- No back button (first step)

## Step 2: PWA Confirmation
Full-screen dark page with:
- Device mockup illustrations (phone + desktop)
- "Install PWA" heading
- Description explaining PWA benefits
- Platform-specific install instructions (Android/Chrome and iOS/Safari)
- "You can also skip this step" note
- Previous / Next navigation buttons

## Step 3: Choice
Two large card buttons presented side by side (desktop) or stacked (mobile):
- **Create New Wallet** — icon: PlusCircle, description: "Generate a fresh wallet with a new seed phrase"
- **Recover Wallet** — icon: RefreshCw, description: "Restore an existing wallet from your 12-word seed phrase"

## Step 4: Seed

### Create New Wallet path
- Display 12 seed words in a 3×4 grid (3 columns, 4 rows)
- Each word shown with its index number (1-12)
- "I have saved my seed phrase" checkbox — must be checked to enable Continue
- Warning text: "Write down these words in order. You will need them to recover your wallet. Never share your seed phrase."
- Continue button (disabled until checkbox is checked)

### Recover Wallet path
- 12 numbered input fields for entering seed words
- Paste detection: if user pastes a full 12-word phrase, auto-fill all fields
- Input validation: each word checked against BIP-39 wordlist
- Invalid words highlighted in red with error message
- Recover button (disabled until all 12 fields are valid)

## Step 5: Mint Setup
- Default mint URL pre-filled from VITE_MINT_URL environment variable
- Connection test indicator: shows connecting → connected/failed status
- "Add Another Mint" button to add additional mint URLs
- Each additional mint also gets a connection test
- "Finish Setup" button → creates wallet, saves configuration, navigates to Portfolio
- "Finish Setup" disabled until at least one mint is successfully connected

## Background Data Loading
On app launch (step 1), the app begins downloading condition data from the hard-coded mint (`VITE_MINT_URL`) via `GET /v1/conditions`. This happens silently in the background throughout the onboarding flow.

- A subtle loading indicator (small progress text or spinner in the bottom-left corner) shows download status during steps 1–4. Non-blocking — the user can proceed through steps freely.
- States: "Loading markets..." (with spinner) → "5 markets loaded" (with checkmark) → or "Failed to load markets" (with retry option).
- By step 5 (Mint Setup), the hard-coded mint should already appear pre-connected with data loaded. If the download is still in progress, the mint card shows loading status.
- This is a UX optimization — the user never waits for data. Even if the background load fails, the user can still proceed through setup and retry on the Mint Setup step.

## Step Indicator
- Shown on steps 3-5 only (steps 1-2 are full-screen standalone)
- Horizontal step indicator at the top showing progress: Step 1 → Step 2 → Step 3
- Current step highlighted, completed steps show checkmark
- Steps labeled: Choice → Seed → Mint Setup

## Navigation
- Back button on steps 4 and 5 to return to previous step
- Steps 1-2 have their own Previous/Next navigation
- No back button on step 1 (first page)
- Completing step 5 navigates to Portfolio

## Configuration
- shell: false
