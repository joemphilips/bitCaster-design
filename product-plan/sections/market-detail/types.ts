// =============================================================================
// Market Detail Types
// =============================================================================

// Import shared types from market discovery
import type {
  CurrentOdds,
  Outcome,
  CategoryTag,
} from '../market-discovery-and-trading/types'

// =============================================================================
// Resolution Types
// =============================================================================

export type ResolutionStatus = 'open' | 'pending_resolution' | 'resolved' | 'disputed'

export type ResolutionSource = 'oracle' | 'manual' | 'community' | 'smart_contract'

export interface ResolutionDetails {
  criteria: string
  source: ResolutionSource
  sourceDescription?: string
  resolutionDate: string
  status: ResolutionStatus
  finalOutcome?: string // Only set when resolved
  disputeDeadline?: string // For disputed markets
}

// =============================================================================
// Creator Types
// =============================================================================

export interface MarketCreator {
  id: string
  name: string
  avatarUrl?: string
  reputationScore?: number
  totalMarketsCreated: number
  feePercent: number
}

// =============================================================================
// Order Book Types
// =============================================================================

export interface Order {
  price: number // 0-100 representing percentage
  amount: number // in sats
  total: number // cumulative amount at this price level
}

export interface OrderBook {
  bids: Order[] // Buy orders, sorted by price descending
  asks: Order[] // Sell orders, sorted by price ascending
  spread: number // Difference between best bid and best ask
}

// =============================================================================
// Price History Types
// =============================================================================

export interface PricePoint {
  timestamp: string
  price: number // 0-100
  volume?: number
}

export interface PriceHistory {
  data: PricePoint[]
  timeframe: ChartTimeframe
}

export type ChartTimeframe = '1h' | '24h' | '7d' | '30d' | 'all'

export type ChartType = 'price' | 'volume'

// =============================================================================
// Activity Types
// =============================================================================

export interface Trade {
  id: string
  userId: string
  userDisplayName: string // Anonymized or partial name
  side: 'yes' | 'no'
  outcomeId?: string // For categorical markets
  amount: number // in sats
  price: number // 0-100
  timestamp: string
}

export interface Comment {
  id: string
  userId: string
  userDisplayName: string
  userAvatarUrl?: string
  content: string
  timestamp: string
  likeCount: number
  isLiked: boolean
}

// =============================================================================
// Related Market Types
// =============================================================================

export interface RelatedMarket {
  id: string
  title: string
  imageUrl?: string
  currentOdds?: CurrentOdds
  volume: number
  closingDate: string
}

// =============================================================================
// Market Detail Data Types (extends discovery types)
// =============================================================================

interface BaseMarketDetail {
  id: string
  title: string
  imageUrl?: string
  categoryTags: CategoryTag[]
  volume: number
  liquidity: number
  traderCount: number
  closingDate: string
  createdDate: string
  activeSince: string
  likeCount: number
  isLiked: boolean
  creator: MarketCreator
  resolution: ResolutionDetails
  priceHistory: PriceHistory
  orderBook: OrderBook
  recentTrades: Trade[]
  comments: Comment[]
  relatedMarkets: RelatedMarket[]
}

export interface YesNoMarketDetail extends BaseMarketDetail {
  type: 'yesno'
  currentOdds: CurrentOdds
}

export interface CategoricalMarketDetail extends BaseMarketDetail {
  type: 'categorical'
  outcomes: Outcome[]
  // Price history and order book per outcome
  outcomePriceHistories: Record<string, PriceHistory>
  outcomeOrderBooks: Record<string, OrderBook>
}

export type MarketDetail = YesNoMarketDetail | CategoricalMarketDetail

// =============================================================================
// Trade State Types
// =============================================================================

export interface TradeSelection {
  side: 'yes' | 'no'
  outcomeId?: string // For categorical
}

export interface TradePreview {
  amount: number
  predictedOdds: number // Odds after trade
  priceImpact: number // Change in odds
  potentialPayout: number
  creatorFee: number
  platformFee: number
  totalCost: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface MarketDetailProps {
  /** The market data to display */
  market: MarketDetail

  /** Current chart timeframe selection */
  chartTimeframe: ChartTimeframe

  /** Current chart type (price or volume) */
  chartType: ChartType

  /** Currently selected trade (null if none) */
  tradeSelection: TradeSelection | null

  /** Trade amount entered by user */
  tradeAmount: number

  /** Preview of trade outcome (null if no valid selection) */
  tradePreview: TradePreview | null

  /** Called when user changes chart timeframe */
  onTimeframeChange?: (timeframe: ChartTimeframe) => void

  /** Called when user toggles chart type */
  onChartTypeChange?: (type: ChartType) => void

  /** Called when user selects an outcome to trade */
  onTradeSelect?: (selection: TradeSelection) => void

  /** Called when user clears trade selection */
  onTradeClear?: () => void

  /** Called when user changes trade amount */
  onAmountChange?: (amount: number) => void

  /** Called when user confirms trade */
  onTradeConfirm?: () => void

  /** Called when user likes/unlikes the market */
  onLikeToggle?: () => void

  /** Called when user shares the market */
  onShare?: () => void

  /** Called when user posts a comment */
  onCommentPost?: (content: string) => void

  /** Called when user likes a comment */
  onCommentLike?: (commentId: string) => void

  /** Called when user scrolls to load more trades */
  onLoadMoreTrades?: () => void

  /** Called when user scrolls to load more comments */
  onLoadMoreComments?: () => void

  /** Called when user clicks on a related market */
  onRelatedMarketClick?: (marketId: string) => void

  /** Called when user clicks on creator profile */
  onCreatorClick?: (creatorId: string) => void

}
