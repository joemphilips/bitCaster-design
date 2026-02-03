import type { OrderHistoryItem } from '../types'

function formatBtc(sats: number): string {
  const abs = Math.abs(sats)
  if (abs >= 1_000_000) return `₿${(sats / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `₿${(sats / 1_000).toFixed(1)}K`
  return `₿${sats.toLocaleString()}`
}

interface OrderHistoryRowProps {
  order: OrderHistoryItem
  onView?: () => void
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function truncateMiddle(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str
  const half = Math.floor((maxLen - 3) / 2)
  return `${str.slice(0, half)}...${str.slice(-half)}`
}

export function OrderHistoryRow({ order, onView }: OrderHistoryRowProps) {
  const isDeposit = order.type === 'deposit'

  const statusColors = {
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    failed: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400'
  }

  return (
    <div
      onClick={onView}
      className="group cursor-pointer border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/30"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Type, date, status */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
              isDeposit
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
            }`}
          >
            {isDeposit ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium capitalize text-slate-900 dark:text-white">
                {order.type}
              </span>
              <span className={`rounded px-1.5 py-0.5 text-xs font-medium capitalize ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {formatDate(order.date)}
            </p>
          </div>
        </div>

        {/* Right: Amount */}
        <div className="text-right sm:text-left">
          <p
            className={`font-mono text-lg font-bold ${
              isDeposit
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {isDeposit ? '+' : '-'}{formatBtc(order.amountSats)}
          </p>
        </div>
      </div>

      {/* Details row */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {/* TX ID */}
        {order.txId && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 dark:text-slate-500">TX:</span>
            <code className="font-mono text-slate-600 dark:text-slate-400">
              {truncateMiddle(order.txId, 20)}
            </code>
          </div>
        )}

        {/* Lightning invoice */}
        {order.lightningInvoice && (
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500">⚡</span>
            <code className="font-mono text-slate-600 dark:text-slate-400">
              {truncateMiddle(order.lightningInvoice, 24)}
            </code>
          </div>
        )}

        {/* Failure reason */}
        {order.failureReason && (
          <div className="w-full">
            <span className="text-rose-500 dark:text-rose-400">
              {order.failureReason}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
