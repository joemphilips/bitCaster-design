// =============================================================================
// Domain Events
// =============================================================================

export interface UserRegistered {
  type: 'UserRegistered'
  userId: string
  timestamp: string
}

export interface UserProfileUpdated {
  type: 'UserProfileUpdated'
  userId: string
  displayName?: string
  avatarUrl?: string
  timestamp: string
}

export interface DepositReceived {
  type: 'DepositReceived'
  userId: string
  amountSats: number
  txId?: string
  lightningInvoice?: string
  timestamp: string
}

export interface WithdrawalRequested {
  type: 'WithdrawalRequested'
  userId: string
  amountSats: number
  destination: string
  timestamp: string
}

export interface WithdrawalCompleted {
  type: 'WithdrawalCompleted'
  userId: string
  amountSats: number
  txId: string
  timestamp: string
}

export interface MarketCreated {
  type: 'MarketCreated'
  marketId: string
  creatorId: string
  title: string
  outcomes: string[]
  closingDate: string
  creatorFeePercent: number
  timestamp: string
}

export interface MarketResolved {
  type: 'MarketResolved'
  marketId: string
  winningOutcome: string
  timestamp: string
}

export interface MarketRefunded {
  type: 'MarketRefunded'
  marketId: string
  refundedSats: number
  timestamp: string
}

export interface Bought {
  type: 'Bought'
  userId: string
  marketId: string
  outcomeId: string
  side: 'yes' | 'no'
  amountSats: number
  shares: number
  price: number
  timestamp: string
}

export interface Sold {
  type: 'Sold'
  userId: string
  marketId: string
  outcomeId: string
  side: 'yes' | 'no'
  amountSats: number
  shares: number
  price: number
  timestamp: string
}

export interface LiquidityDeposited {
  type: 'LiquidityDeposited'
  userId: string
  marketId: string
  amountSats: number
  timestamp: string
}

export interface PayoutClaimed {
  type: 'PayoutClaimed'
  userId: string
  marketId: string
  amountSats: number
  timestamp: string
}

export interface CreatorFeeClaimed {
  type: 'CreatorFeeClaimed'
  creatorId: string
  marketId: string
  amountSats: number
  timestamp: string
}

export interface MarketLiked {
  type: 'MarketLiked'
  userId: string
  marketId: string
  timestamp: string
}

export interface CommentPosted {
  type: 'CommentPosted'
  userId: string
  marketId: string
  content: string
  timestamp: string
}

export type DomainEvent =
  | UserRegistered
  | UserProfileUpdated
  | DepositReceived
  | WithdrawalRequested
  | WithdrawalCompleted
  | MarketCreated
  | MarketResolved
  | MarketRefunded
  | Bought
  | Sold
  | LiquidityDeposited
  | PayoutClaimed
  | CreatorFeeClaimed
  | MarketLiked
  | CommentPosted
