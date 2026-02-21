// =============================================================================
// Setup Flow Types
// =============================================================================

export type SetupChoice = 'create' | 'recover'
export type SetupStep = 1 | 2 | 3

// =============================================================================
// Mint Connection Types
// =============================================================================

export type MintConnectionTestStatus = 'idle' | 'connecting' | 'connected' | 'failed'

export interface MintConnectionTest {
  url: string
  status: MintConnectionTestStatus
  errorMessage?: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface WalletSetupProps {
  /** Current step in the setup flow */
  currentStep: SetupStep

  /** User's choice: create new or recover existing */
  choice: SetupChoice | null

  /** Generated seed words (for create flow) */
  seedWords: string[]

  /** User-entered seed words (for recover flow) */
  inputSeedWords: string[]

  /** Whether user has confirmed saving their seed phrase */
  seedSaved: boolean

  /** Mint connection tests */
  mintConnections: MintConnectionTest[]

  /** Called when user selects create or recover */
  onChoiceSelect?: (choice: SetupChoice) => void

  /** Called when user checks "I have saved my seed phrase" */
  onSeedSavedToggle?: (saved: boolean) => void

  /** Called when user enters a seed word in recover flow */
  onSeedWordInput?: (index: number, word: string) => void

  /** Called when user pastes a full seed phrase */
  onSeedPhrasePaste?: (phrase: string) => void

  /** Called when user clicks Recover */
  onRecover?: () => void

  /** Called when user adds a mint URL */
  onAddMint?: (url: string) => void

  /** Called when user removes a mint */
  onRemoveMint?: (url: string) => void

  /** Called when user clicks Continue (step 2 → step 3) */
  onContinue?: () => void

  /** Called when user clicks Back */
  onBack?: () => void

  /** Called when user clicks Finish Setup */
  onFinishSetup?: () => void
}
