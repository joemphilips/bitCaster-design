import type { CreatedMarket } from '@/../product/sections/mypage/types'

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
      color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
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
      className="group border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/30"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Market info */}
        <div className="flex min-w-0 flex-1 cursor-pointer gap-3" onClick={onView}>
          {/* Market image */}
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
            <img
              src={market.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <h3 className="flex-1 text-sm font-medium text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {market.title}
              </h3>
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
              <span className={`rounded px-1.5 py-0.5 font-medium ${statusColor}`}>
                {statusLabel}
              </span>

              <span className="text-slate-400">•</span>

              <span className="text-slate-500 dark:text-slate-400">
                Created {formatDate(market.createdDate)}
              </span>

              {market.rejectionReason && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-red-500 dark:text-red-400">
                    {market.rejectionReason}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats & actions */}
        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
          {/* Volume & fees */}
          <div className="text-right">
            {market.volume > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {formatSats(market.volume)}
                </span>
                {' '}sats volume
              </p>
            )}
            {market.creatorFeesEarned > 0 && (
              <p className="mt-0.5 text-xs">
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
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
              className="flex-shrink-0 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow active:scale-95"
            >
              Claim Fees
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
