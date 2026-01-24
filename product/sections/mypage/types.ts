// =============================================================================
// User Profile Types
// =============================================================================

export interface UserProfile {
  userId: string
  displayName: string
  avatarUrl: string | null
  registeredDate: string
}

// =============================================================================
// Profit/Loss Summary Types
// =============================================================================

export interface PLMetric {
  amountSats: number
  percentChange: number
}

export interface PLSummary {
  last24h: PLMetric
  last7d: PLMetric
  last30d: PLMetric
  allTime: PLMetric
}

// =============================================================================
// Position Types
// =============================================================================

export type PositionStatus = 'active' | 'closed'
export type PositionSide = 'yes' | 'no'

export interface Position {
  id: string
  marketId: string
  marketTitle: string
  marketImageUrl: string
  side: PositionSide
  outcomeId?: string // For categorical markets
  outcomeLabel?: string // For categorical markets
  shares: number
  avgBuyPrice: number // Price per share in sats when bought
  currentPrice: number // Current price per share in sats
  currentValueSats: number
  profitLossSats: number
  profitLossPercent: number
  status: PositionStatus
  closedDate?: string // Set when position is sold or market resolved
  acquiredDate: string
}

// =============================================================================
// Order History Types
// =============================================================================

export type OrderType = 'deposit' | 'withdrawal'
export type OrderStatus = 'pending' | 'completed' | 'failed'

export interface OrderHistoryItem {
  id: string
  type: OrderType
  amountSats: number
  date: string
  status: OrderStatus
  txId: string | null // Bitcoin transaction ID
  lightningInvoice: string | null // Lightning invoice (BOLT11)
  failureReason?: string // If status is 'failed'
}

// =============================================================================
// Created Market Types
// =============================================================================

export type CreatedMarketStatus = 'pending' | 'approved' | 'rejected' | 'resolved' | 'cancelled'

export interface CreatedMarket {
  id: string
  title: string
  imageUrl: string
  status: CreatedMarketStatus
  createdDate: string
  approvedDate?: string
  rejectedDate?: string
  rejectionReason?: string
  resolvedDate?: string
  cancelledDate?: string
  volume: number // Total trading volume in sats
  creatorFeesEarned: number // Fees earned by creator in sats
  creatorFeePercent: number
}

// =============================================================================
// Component Props
// =============================================================================

export interface MyPageProps {
  /** User profile information */
  profile: UserProfile

  /** Profit/Loss summary across time scales */
  plSummary: PLSummary

  /** User's positions in markets */
  positions: Position[]

  /** Order history (deposits and withdrawals) */
  orderHistory: OrderHistoryItem[]

  /** Markets created by the user */
  createdMarkets: CreatedMarket[]

  /** Currently selected positions tab */
  positionsTab: 'active' | 'closed'

  /** Called when user uploads a new avatar image (triggers UserProfileUpdated) */
  onAvatarUpload?: (file: File) => void

  /** Called when user clicks Sell on a position (triggers Sold) */
  onSellPosition?: (positionId: string) => void

  /** Called when user clicks to view position details */
  onViewPosition?: (positionId: string) => void

  /** Called when user clicks to view a market they created */
  onViewMarket?: (marketId: string) => void

  /** Called when user clicks to view order details */
  onViewOrder?: (orderId: string) => void

  /** Called when user switches positions tab */
  onPositionsTabChange?: (tab: 'active' | 'closed') => void

  /** Called when user claims creator fees from a resolved market (triggers CreatorFeeClaimed) */
  onClaimCreatorFees?: (marketId: string) => void

  /** Called when user claims payout from a winning position (triggers PayoutClaimed) */
  onClaimPayout?: (positionId: string) => void
}
