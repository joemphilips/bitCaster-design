import type { CreatorMarket, MarketStatus } from '../types'

interface MarketRowProps {
  market: CreatorMarket
  onViewDetails?: () => void
  onClaimFees?: () => void
  onCancelMarket?: () => void
}

function formatSats(sats: number): string {
  const abs = Math.abs(sats)
  if (abs >= 1_000_000) return `₿${(sats / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `₿${(sats / 1_000).toFixed(1)}K`
  return `₿${sats.toLocaleString()}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const statusConfig: Record<MarketStatus, { label: string; color: string; dotColor: string }> = {
  pending: {
    label: 'Pending Review',
    color: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:ring-amber-800',
    dotColor: 'bg-amber-500'
  },
  approved: {
    label: 'Live',
    color: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-800',
    dotColor: 'bg-emerald-500 animate-pulse'
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-800',
    dotColor: 'bg-rose-500'
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-800',
    dotColor: 'bg-blue-500'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700',
    dotColor: 'bg-slate-400'
  }
}

export function MarketRow({ market, onViewDetails, onClaimFees, onCancelMarket }: MarketRowProps) {
  const { label: statusLabel, color: statusColor, dotColor } = statusConfig[market.status]
  const hasUnclaimedFees = market.status === 'resolved' && market.feesEarnedSats > market.feesClaimedSats
  const unclaimedFees = market.feesEarnedSats - market.feesClaimedSats
  const canCancel = market.status === 'pending' || market.status === 'approved'

  return (
    <div
      onClick={onViewDetails}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-700"
    >
      {/* Decorative gradient bar on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex flex-col sm:flex-row">
        {/* Market thumbnail */}
        <div className="relative h-40 w-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 sm:h-36 sm:w-40 md:w-48">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${market.imageUrl})` }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

          {/* Status badge */}
          <div className="absolute bottom-3 left-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 shadow-lg ${statusColor}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
              {statusLabel}
            </span>
          </div>

          {/* Category tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {market.categoryTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex-1">
            <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:text-lg">
              {market.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Closes {formatDate(market.closingDate)}
              </span>
              {market.type === 'categorical' && (
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  {market.outcomes.length} outcomes
                </span>
              )}
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {market.traderCount.toLocaleString()} traders
              </span>
            </div>

            {/* Rejection reason if rejected */}
            {market.status === 'rejected' && market.rejectionReason && (
              <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-400">
                <span className="font-semibold">Reason:</span> {market.rejectionReason}
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4">
              {/* Volume */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Volume
                </p>
                <p className="font-mono text-lg font-bold text-slate-900 dark:text-white">
                  {formatSats(market.volume)}
                </p>
              </div>

              {/* Fees earned */}
              {market.feesEarnedSats > 0 && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Fees Earned
                  </p>
                  <p className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatSats(market.feesEarnedSats)} <span className="text-sm font-normal">({market.creatorFeePercent}%)</span>
                  </p>
                </div>
              )}

              {/* Liquidity */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Liquidity
                </p>
                <p className="font-mono text-lg font-bold text-slate-700 dark:text-slate-300">
                  {formatSats(market.liquidity)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {hasUnclaimedFees && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onClaimFees?.()
                  }}
                  className="relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
                >
                  <span className="relative z-10">
                    Claim {formatSats(unclaimedFees)}
                  </span>
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              )}

              {canCancel && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onCancelMarket?.()
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-rose-700 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails?.()
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
