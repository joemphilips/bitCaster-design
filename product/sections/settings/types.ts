// =============================================================================
// Currency & Theme Types
// =============================================================================

export type BaseCurrency = 'BTC' | 'USD' | 'JPY'
export type ThemeOption = 'light' | 'dark' | 'system'

// =============================================================================
// Mint Configuration Types
// =============================================================================

export type MintConnectionStatus = 'connected' | 'disconnected' | 'error'

export interface MintConfig {
  url: string
  isDefault: boolean
  connectionStatus: MintConnectionStatus
  addedDate: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface SettingsProps {
  /** User's preferred base currency */
  baseCurrency: BaseCurrency

  /** User's theme preference */
  theme: ThemeOption

  /** List of connected mints */
  mints: MintConfig[]

  /** App version string */
  appVersion: string

  /** Called when user changes base currency */
  onBaseCurrencyChange?: (currency: BaseCurrency) => void

  /** Called when user changes theme */
  onThemeChange?: (theme: ThemeOption) => void

  /** Called when user adds a new mint */
  onAddMint?: (url: string) => void

  /** Called when user removes a mint */
  onRemoveMint?: (url: string) => void

  /** Called when user requests to view seed phrase */
  onViewSeedPhrase?: () => void
}
