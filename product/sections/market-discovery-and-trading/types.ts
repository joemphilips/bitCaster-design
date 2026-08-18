// =============================================================================
// Tag Types
// =============================================================================

export interface MetaTag {
  id: string
  label: string
  description: string
}

export interface CategoryTag {
  id: string
  label: string
  marketCount: number
}

// Combined tag type for single-select behavior
export type Tag = MetaTag | CategoryTag

// =============================================================================
// Market Data Types
// =============================================================================

/** Price values are probability numerators from confirmed settlement fills. */
export interface CurrentOdds {
  yes: number | null
  no: number | null
}

/** Keep a valid empty market separate from a broken price authority. */
export type PriceAuthorityState = 'confirmed' | 'no-trades' | 'unavailable'

export interface PriceAuthority {
  state: PriceAuthorityState
  latestFillId?: string
}

export interface Outcome {
  id: string
  label: string
  odds: number | null
}

// Base market properties shared by all market types
interface BaseMarket {
  id: string
  title: string
  imageUrl: string
  categoryTags: string[]
  metaTags: string[]
  volume: number
  liquidity: number
  traderCount: number
  closingDate: string
  createdDate: string
  activeSince: string
  creatorFeePercent: number
  likeCount: number
  isLiked: boolean
  priceAuthority: PriceAuthority
}

// Yes/No market type
export interface YesNoMarket extends BaseMarket {
  type: 'yesno'
  currentOdds: CurrentOdds
}

// Categorical market type
export interface CategoricalMarket extends BaseMarket {
  type: 'categorical'
  outcomes: Outcome[]
}

// Union type for all market types
export type Market = YesNoMarket | CategoricalMarket

// =============================================================================
// Filter Types
// =============================================================================

export type MarketType = 'yesno' | 'categorical'

export interface VolumeRange {
  min?: number
  max?: number
}

export interface FilterState {
  searchQuery: string
  selectedTag: string | null // Single selected tag (meta or category)
  marketTypes: MarketType[]
  volumeRange: VolumeRange
  closingInDays?: number
}

// =============================================================================
// Trade Mode Types
// =============================================================================

export interface TradeState {
  marketId: string
  outcomeId?: string // For categorical markets
  side: 'yes' | 'no'
  amount: number
}

// =============================================================================
// Background Data Loading (re-exported from wallet-setup)
// =============================================================================

export type { BackgroundDataLoad } from '../wallet-setup/types'

// =============================================================================
// Component Props
// =============================================================================

export interface MarketDiscoveryProps {
  /** List of meta tags (Trending, Popular, New) */
  metaTags: MetaTag[]

  /** List of category tags for filtering */
  categoryTags: CategoryTag[]

  /** List of markets to display */
  markets: Market[]

  /** Currently selected tag ID (single-select) */
  selectedTag: string | null

  /** Search query */
  searchQuery?: string

  /** Called when user searches for markets */
  onSearch?: (query: string) => void

  /** Called when user selects a tag (single-select - only one active at a time) */
  onTagSelect?: (tagId: string) => void

  /** Called when user changes market type filter */
  onMarketTypeChange?: (types: MarketType[]) => void

  /** Called when user changes volume range filter */
  onVolumeRangeChange?: (range: VolumeRange) => void

  /** Called when user changes closing date filter */
  onClosingDateChange?: (days?: number) => void

  /** Called when user navigates to market detail page */
  onViewMarket?: (marketId: string) => void

  /** Called when user scrolls to bottom and more markets should be loaded */
  onLoadMore?: () => void

  /** Background data loading state (shown as footer progress bar if still loading after wallet setup) */
  backgroundDataLoad?: import('../wallet-setup/types').BackgroundDataLoad

  /** ISO timestamp of last successful condition sync */
  lastUpdatedAt?: string

  /** Triggers re-fetch of conditions from mint */
  onRefreshConditions?: () => void

  /** True while a refresh is in progress (spins the refresh icon) */
  isRefreshing?: boolean
}
