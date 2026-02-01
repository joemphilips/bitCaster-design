import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { Trade } from '@/../product/sections/market-detail/types'

interface ActivityFeedProps {
  trades: Trade[]
  onLoadMoreTrades?: () => void
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatSats(sats: number): string {
  if (sats >= 1000) {
    return `${(sats / 1000).toFixed(1)}K`
  }
  return sats.toString()
}

function TradeRow({ trade }: { trade: Trade }) {
  const isYes = trade.side === 'yes'

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      {/* Side Icon */}
      <div className={`p-1.5 rounded-lg ${isYes ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
        {isYes ? (
          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
      </div>

      {/* Trade Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {trade.userDisplayName}
          </span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            isYes
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          }`}>
            {trade.side.toUpperCase()}
          </span>
          {trade.outcomeId && (
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              ({trade.outcomeId})
            </span>
          )}
          {trade.cellId && (
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              ({trade.cellId.replace('-', '/')})
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {formatSats(trade.amount)} sats @ {trade.price.toFixed(1)}%
        </p>
      </div>

      {/* Timestamp */}
      <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
        {formatTimeAgo(trade.timestamp)}
      </span>
    </div>
  )
}

export function ActivityFeed({
  trades,
  onLoadMoreTrades,
}: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          Recent Trades
          <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500 font-normal">
            ({trades.length})
          </span>
        </h3>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {trades.length === 0 ? (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
            No trades yet
          </p>
        ) : (
          <>
            {trades.map((trade) => (
              <TradeRow key={trade.id} trade={trade} />
            ))}
            {trades.length >= 5 && (
              <button
                onClick={onLoadMoreTrades}
                className="w-full py-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Load more trades
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
