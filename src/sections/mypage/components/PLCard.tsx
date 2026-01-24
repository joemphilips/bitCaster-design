import type { PLMetric } from '@/../product/sections/mypage/types'

interface PLCardProps {
  label: string
  metric: PLMetric
  isHighlighted?: boolean
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

export function PLCard({ label, metric, isHighlighted = false }: PLCardProps) {
  const isPositive = metric.amountSats >= 0

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl p-4 transition-all duration-200
        ${isHighlighted
          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-400/30'
          : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
        }
      `}
    >
      {/* Subtle pattern overlay */}
      <div
        className={`absolute inset-0 opacity-[0.03] ${isHighlighted ? 'opacity-[0.08]' : ''}`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative">
        <p className={`text-xs font-medium uppercase tracking-wider ${
          isHighlighted ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
        }`}>
          {label}
        </p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className={`font-mono text-2xl font-bold tracking-tight ${
            isHighlighted
              ? 'text-white'
              : isPositive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? '+' : ''}{formatSats(metric.amountSats)}
          </span>
          <span className={`font-mono text-sm ${
            isHighlighted ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
          }`}>
            sats
          </span>
        </div>

        <div className={`mt-1 flex items-center gap-1 text-sm ${
          isHighlighted
            ? 'text-blue-100'
            : isPositive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-red-600 dark:text-red-400'
        }`}>
          <span className="text-lg">
            {isPositive ? '↑' : '↓'}
          </span>
          <span className="font-medium">
            {isPositive ? '+' : ''}{metric.percentChange.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}
