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

// =============================================================================
// Market Data Types
// =============================================================================

export interface CurrentOdds {
  yes: number
  no: number
}

export interface Outcome {
  id: string
  label: string
  odds: number
}

export interface Dimension {
  label: string
  min: number
  max: number
  currentEstimate: number
}

export interface TwoDimensionalDimensions {
  x: Dimension
  y: Dimension
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
  approvedDate: string
  creatorFeePercent: number
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

// Two-dimensional market type
export interface TwoDimensionalMarket extends BaseMarket {
  type: 'twodimensional'
  dimensions: TwoDimensionalDimensions
}

// Union type for all market types
export type Market = YesNoMarket | CategoricalMarket | TwoDimensionalMarket

// =============================================================================
// Filter Types
// =============================================================================

export type MarketType = 'yesno' | 'categorical' | 'twodimensional'

export interface VolumeRange {
  min?: number
  max?: number
}

export interface FilterState {
  searchQuery: string
  selectedCategoryTags: string[]
  selectedMetaTags: string[]
  marketTypes: MarketType[]
  volumeRange: VolumeRange
  closingInDays?: number
}

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

  /** Current filter state */
  filters: FilterState

  /** Called when user searches for markets */
  onSearch?: (query: string) => void

  /** Called when user selects/deselects a meta tag */
  onMetaTagToggle?: (tagId: string) => void

  /** Called when user selects/deselects a category tag */
  onCategoryTagToggle?: (tagId: string) => void

  /** Called when user changes market type filter */
  onMarketTypeChange?: (types: MarketType[]) => void

  /** Called when user changes volume range filter */
  onVolumeRangeChange?: (range: VolumeRange) => void

  /** Called when user changes closing date filter */
  onClosingDateChange?: (days?: number) => void

  /** Called when user clicks Buy Yes on a yes/no market (triggers Bought event) */
  onBuyYes?: (marketId: string, amount: number) => void

  /** Called when user clicks Buy No on a yes/no market (triggers Bought event) */
  onBuyNo?: (marketId: string, amount: number) => void

  /** Called when user buys a specific outcome in a categorical market (triggers Bought event) */
  onBuyOutcome?: (marketId: string, outcomeId: string, amount: number) => void

  /** Called when user navigates to market detail page */
  onViewMarket?: (marketId: string) => void

  /** Called when user scrolls to bottom and more markets should be loaded */
  onLoadMore?: () => void
}
