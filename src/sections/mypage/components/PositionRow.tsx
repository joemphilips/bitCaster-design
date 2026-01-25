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
      onClick={onView}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg hover:scale-[1.01] dark:border-slate-700 dark:bg-slate-900 ${
        isClosed ? 'opacity-80' : ''
      }`}
    >
      <div className="flex">
        {/* Market image */}
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 sm:h-32 sm:w-32">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${position.marketImageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Side badge overlaid on image */}
          <div className="absolute bottom-2 left-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase shadow-lg ${
                position.side === 'yes'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-500 text-white'
              }`}
            >
              {position.side}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400 sm:text-base">
              {position.marketTitle}
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {/* Outcome label for categorical markets */}
              {position.outcomeLabel && (
                <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {position.outcomeLabel}
                </span>
              )}

              <span className="font-mono">{position.shares} shares</span>

              {isClosed && (
                <span className="rounded bg-slate-200 px-2 py-0.5 font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                  Closed
                </span>
              )}
            </div>
          </div>

          {/* Value & Action */}
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="font-mono text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                {formatSats(position.currentValueSats)}
                <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">sats</span>
              </p>
              <p
                className={`font-mono text-sm font-semibold ${
                  isPositive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
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
                className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-rose-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] dark:bg-rose-500 dark:hover:bg-rose-600"
              >
                Sell
              </button>
            ) : canClaimPayout ? (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClaimPayout?.()
                }}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Claim
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
