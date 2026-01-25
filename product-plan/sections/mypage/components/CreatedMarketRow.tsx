import type { CreatedMarket } from '../types'

interface CreatedMarketRowProps {
  market: CreatedMarket
  onView?: () => void
  onClaimFees?: () => void
}

function formatSats(sats: number): string {
  if (sats >= 1_000_000) {
    return `${(sats / 1_000_000).toFixed(2)}M`
  }
  if (sats >= 1_000) {
    return `${(sats / 1_000).toFixed(1)}k`
  }
  return sats.toLocaleString()
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function CreatedMarketRow({ market, onView, onClaimFees }: CreatedMarketRowProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
    },
    approved: {
      label: 'Live',
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
    },
    resolved: {
      label: 'Resolved',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
    }
  }

  const { label: statusLabel, color: statusColor } = statusConfig[market.status]
  const canClaimFees = market.status === 'resolved' && market.creatorFeesEarned > 0

  return (
    <div
      onClick={onView}
      className="group cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex">
        {/* Market image */}
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 sm:h-28 sm:w-28">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${market.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Status badge overlaid on image */}
          <div className="absolute bottom-2 left-2">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold shadow-lg ${statusColor}`}>
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:text-base">
              {market.title}
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Created {formatDate(market.createdDate)}</span>

              {market.rejectionReason && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-rose-500 dark:text-rose-400">
                    {market.rejectionReason}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stats & Action */}
          <div className="mt-3 flex items-end justify-between">
            <div>
              {market.volume > 0 && (
                <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatSats(market.volume)}
                  </span>
                  {' '}sats volume
                </p>
              )}
              {market.creatorFeesEarned > 0 && (
                <p className="font-mono text-sm">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatSats(market.creatorFeesEarned)}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {' '}earned ({market.creatorFeePercent}%)
                  </span>
                </p>
              )}
            </div>

            {/* Claim fees button */}
            {canClaimFees && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClaimFees?.()
                }}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Claim Fees
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
