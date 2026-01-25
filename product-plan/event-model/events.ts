// Domain Events for bitCaster

// =============================================================================
// User Events
// =============================================================================

export interface UserRegistered {
  type: 'UserRegistered'
  userId: string
  displayName: string
  registeredDate: string // ISO 8601
}

export interface UserProfileUpdated {
  type: 'UserProfileUpdated'
  userId: string
  avatarUrl?: string
  displayName?: string
  updatedAt: string // ISO 8601
}

// =============================================================================
// Wallet Events
// =============================================================================

export interface DepositReceived {
  type: 'DepositReceived'
  depositId: string
  userId: string
  amountSats: number
  // One of these will be present depending on deposit method
  txId?: string // On-chain transaction ID
  lightningInvoice?: string // Lightning invoice
  receivedAt: string // ISO 8601
}

export interface WithdrawalRequested {
  type: 'WithdrawalRequested'
  withdrawalId: string
  userId: string
  amountSats: number
  destinationAddress?: string // On-chain address
  lightningInvoice?: string // Lightning invoice to pay
  requestedAt: string // ISO 8601
}

export interface WithdrawalCompleted {
  type: 'WithdrawalCompleted'
  withdrawalId: string
  userId: string
  amountSats: number
  txId?: string // On-chain transaction ID
  preimage?: string // Lightning payment preimage
  completedAt: string // ISO 8601
}

export interface WithdrawalFailed {
  type: 'WithdrawalFailed'
  withdrawalId: string
  userId: string
  reason: string
  failedAt: string // ISO 8601
}

// =============================================================================
// Market Lifecycle Events
// =============================================================================

export interface MarketCreated {
  type: 'MarketCreated'
  marketId: string
  creatorId: string
  title: string
  description: string
  imageUrl: string
  marketType: 'yesno' | 'categorical' | 'twodimensional'
  outcomes: {
    id: string
    label: string
    description?: string
  }[]
  categoryTags: string[]
  closingDate: string // ISO 8601
  creatorFeePercent: number // e.g., 2.0 for 2%
  initialLiquiditySats: number
  answerUrls?: string[] // Reference URLs for resolution
  createdAt: string // ISO 8601
}

export interface MarketApproved {
  type: 'MarketApproved'
  marketId: string
  approvedBy: string // Admin user ID
  approvedAt: string // ISO 8601
}

export interface MarketRejected {
  type: 'MarketRejected'
  marketId: string
  rejectedBy: string // Admin user ID
  reason: string
  rejectedAt: string // ISO 8601
}

export interface MarketResolved {
  type: 'MarketResolved'
  marketId: string
  winningOutcomeId: string // ID of winning outcome
  resolvedBy: string // Admin user ID or oracle
  resolutionEvidence?: string // URL or description of evidence
  resolvedAt: string // ISO 8601
}

export interface MarketCancelled {
  type: 'MarketCancelled'
  marketId: string
  cancelledBy: string // Creator or admin user ID
  reason: string
  refundAmountSats: number // Amount returned to liquidity providers
  cancelledAt: string // ISO 8601
}

// =============================================================================
// Trading Events
// =============================================================================

export interface Bought {
  type: 'Bought'
  orderId: string
  marketId: string
  userId: string
  outcomeId: string
  side: 'yes' | 'no' // Buying YES or NO on this outcome
  shares: number
  priceSats: number // Total cost in sats
  avgPricePerShare: number // Average price per share (0-100 cents)
  feeSats: number // Platform + creator fee
  executedAt: string // ISO 8601
}

export interface Sold {
  type: 'Sold'
  orderId: string
  marketId: string
  userId: string
  outcomeId: string
  side: 'yes' | 'no'
  shares: number
  priceSats: number // Total proceeds in sats
  avgPricePerShare: number
  feeSats: number
  executedAt: string // ISO 8601
}

export interface LiquidityDeposited {
  type: 'LiquidityDeposited'
  depositId: string
  marketId: string
  providerId: string
  amountSats: number
  depositedAt: string // ISO 8601
}

export interface LiquidityWithdrawn {
  type: 'LiquidityWithdrawn'
  withdrawalId: string
  marketId: string
  providerId: string
  amountSats: number
  withdrawnAt: string // ISO 8601
}

// =============================================================================
// Payout Events
// =============================================================================

export interface PayoutClaimed {
  type: 'PayoutClaimed'
  claimId: string
  marketId: string
  userId: string
  positionId: string
  amountSats: number
  claimedAt: string // ISO 8601
}

export interface CreatorFeeClaimed {
  type: 'CreatorFeeClaimed'
  claimId: string
  marketId: string
  creatorId: string
  amountSats: number
  claimedAt: string // ISO 8601
}

// =============================================================================
// Union Type
// =============================================================================

export type DomainEvent =
  | UserRegistered
  | UserProfileUpdated
  | DepositReceived
  | WithdrawalRequested
  | WithdrawalCompleted
  | WithdrawalFailed
  | MarketCreated
  | MarketApproved
  | MarketRejected
  | MarketResolved
  | MarketCancelled
  | Bought
  | Sold
  | LiquidityDeposited
  | LiquidityWithdrawn
  | PayoutClaimed
  | CreatorFeeClaimed
