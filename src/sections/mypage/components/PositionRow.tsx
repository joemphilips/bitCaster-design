import type { Position } from '@/../product/sections/mypage/types'

interface PositionRowProps {
  position: Position
  onView?: () => void
  onSell?: () => void
  onClaimPayout?: () => void
}

function formatSats(sats: number): string {
  const abs = Math.abs(sats)
  if (abs >= 1_000_000) {
    return `${(sats / 1_000_000).toFixed(2)}M`
  }
  if (abs >= 1_000) {
    return `${(sats / 1_000).toFixed(1)}k`
  }
  return sats.toLocaleString()
}

export function PositionRow({ position, onView, onSell, onClaimPayout }: PositionRowProps) {
  const isPositive = position.profitLossSats >= 0
  const isClosed = position.status === 'closed'
  const canClaimPayout = isClosed && position.currentValueSats > 0

  return (
    <div
      className={`group flex flex-col gap-4 border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/30 sm:flex-row sm:items-center ${
        isClosed ? 'opacity-75' : ''
      }`}
    >
      {/* Market info */}
      <div className="flex min-w-0 flex-1 cursor-pointer items-center gap-3" onClick={onView}>
        {/* Market image */}
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
          <img
            src={position.marketImageUrl}
            alt=""
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {position.marketTitle}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
            {/* Side badge */}
            <span
              className={`inline-flex items-center rounded px-1.5 py-0.5 font-medium uppercase ${
                position.side === 'yes'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
              }`}
            >
              {position.side}
            </span>

            {/* Outcome label for categorical markets */}
            {position.outcomeLabel && (
              <span className="text-slate-500 dark:text-slate-400">
                {position.outcomeLabel}
              </span>
            )}

            {/* Shares */}
            <span className="text-slate-500 dark:text-slate-400">
              {position.shares} shares
            </span>

            {/* Status badge for closed */}
            {isClosed && (
              <span className="rounded bg-slate-200 px-1.5 py-0.5 font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                Closed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Value & P/L */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="text-right">
          <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
            {formatSats(position.currentValueSats)} sats
          </p>
          <p
            className={`font-mono text-xs ${
              isPositive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? '+' : ''}{formatSats(position.profitLossSats)} ({isPositive ? '+' : ''}{position.profitLossPercent.toFixed(1)}%)
          </p>
        </div>

        {/* Action button */}
        {!isClosed ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSell?.()
            }}
            className="flex-shrink-0 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow active:scale-95"
          >
            Sell
          </button>
        ) : canClaimPayout ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClaimPayout?.()
            }}
            className="flex-shrink-0 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow active:scale-95"
          >
            Claim
          </button>
        ) : (
          <div className="w-[72px]" /> // Spacer to maintain alignment
        )}
      </div>
    </div>
  )
}
