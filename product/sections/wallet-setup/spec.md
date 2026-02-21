# Wallet Setup Specification

## Overview
First-time wallet onboarding wizard. A 3-step flow for creating a new wallet or recovering an existing one. Accessed from the Portfolio "Get Started" CTA (when no wallet exists) or from Settings.

## Step Indicator
- Horizontal step indicator at the top showing progress: Step 1 → Step 2 → Step 3
- Current step highlighted, completed steps show checkmark
- Steps labeled: Choice → Seed → Mint Setup

## Step 1: Choice
Two large card buttons presented side by side (desktop) or stacked (mobile):
- **Create New Wallet** — icon: PlusCircle, description: "Generate a fresh wallet with a new seed phrase"
- **Recover Wallet** — icon: RefreshCw, description: "Restore an existing wallet from your 12-word seed phrase"

## Step 2: Seed

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

## Step 3: Mint Setup
- Default mint URL pre-filled from VITE_MINT_URL environment variable
- Connection test indicator: shows connecting → connected/failed status
- "Add Another Mint" button to add additional mint URLs
- Each additional mint also gets a connection test
- "Finish Setup" button → creates wallet, saves configuration, navigates to Portfolio
- "Finish Setup" disabled until at least one mint is successfully connected

## Navigation
- Back button on steps 2 and 3 to return to previous step
- No back button on step 1 (use browser/app back navigation)
- Completing step 3 navigates to Portfolio

## Configuration
- shell: false
