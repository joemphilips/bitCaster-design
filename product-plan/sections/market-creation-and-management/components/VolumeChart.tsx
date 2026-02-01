import type {
  VolumeChartData,
  MarketVolumeData,
  TimeScale,
  ChartMode
} from '../types'

interface VolumeChartProps {
  volumeChartData: VolumeChartData
  volumeByMarket: MarketVolumeData[]
  timeScale: TimeScale
  chartMode: ChartMode
  onTimeScaleChange?: (scale: TimeScale) => void
  onChartModeChange?: (mode: ChartMode) => void
  onSelectMarketForChart?: (marketId: string) => void
}

function formatSats(sats: number): string {
  const abs = Math.abs(sats)
  if (abs >= 1_000_000) return `₿${(sats / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `₿${(sats / 1_000).toFixed(1)}K`
  return `₿${sats.toLocaleString()}`
}

function formatDateLabel(dateStr: string, scale: TimeScale): string {
  const date = new Date(dateStr)
  switch (scale) {
    case 'daily':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    case 'weekly':
      return `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    case 'monthly':
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    default:
      return dateStr
  }
}

export function VolumeChart({
  volumeChartData,
  volumeByMarket,
  timeScale,
  chartMode,
  onTimeScaleChange,
  onChartModeChange
}: VolumeChartProps) {
  // Get data based on time scale
  const getData = () => {
    switch (timeScale) {
      case 'daily':
        return volumeChartData.daily.map(d => ({
          label: formatDateLabel(d.date, 'daily'),
          volume: d.volumeSats,
          fees: d.feesSats
        }))
      case 'weekly':
        return volumeChartData.weekly.map(d => ({
          label: formatDateLabel(d.weekStart, 'weekly'),
          volume: d.volumeSats,
          fees: d.feesSats
        }))
      case 'monthly':
        return volumeChartData.monthly.map(d => ({
          label: formatDateLabel(d.month, 'monthly'),
          volume: d.volumeSats,
          fees: d.feesSats
        }))
    }
  }

  const data = getData()
  const maxVolume = Math.max(...data.map(d => d.volume))

  // Calculate totals
  const totalVolume = data.reduce((sum, d) => sum + d.volume, 0)
  const totalFees = data.reduce((sum, d) => sum + d.fees, 0)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Volume Analytics
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track trading activity across your markets
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart mode toggle */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => onChartModeChange?.('aggregate')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                chartMode === 'aggregate'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Aggregate
            </button>
            <button
              onClick={() => onChartModeChange?.('per-market')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                chartMode === 'per-market'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Per Market
            </button>
          </div>

          {/* Time scale selector */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            {(['daily', 'weekly', 'monthly'] as TimeScale[]).map((scale) => (
              <button
                key={scale}
                onClick={() => onTimeScaleChange?.(scale)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-all ${
                  timeScale === scale
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {scale}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 dark:from-blue-950/50 dark:to-blue-900/30">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Total Volume
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-blue-700 dark:text-blue-300">
            {formatSats(totalVolume)}
          </p>
          <p className="text-sm text-blue-600/70 dark:text-blue-400/70">volume</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 dark:from-emerald-950/50 dark:to-emerald-900/30">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Total Fees
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-emerald-700 dark:text-emerald-300">
            +{formatSats(totalFees)}
          </p>
          <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70">earned</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 dark:from-amber-950/50 dark:to-amber-900/30">
          <p className="text-xs font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Avg Per {timeScale === 'daily' ? 'Day' : timeScale === 'weekly' ? 'Week' : 'Month'}
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-amber-700 dark:text-amber-300">
            {formatSats(Math.round(totalVolume / data.length))}
          </p>
          <p className="text-sm text-amber-600/70 dark:text-amber-400/70">average</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 p-4 dark:from-slate-800/50 dark:to-slate-700/30">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Active Markets
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-slate-700 dark:text-slate-300">
            {volumeByMarket.length}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">with volume</p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute -left-2 top-0 bottom-8 flex flex-col justify-between text-xs text-slate-400">
          <span>{formatSats(maxVolume)}</span>
          <span>{formatSats(maxVolume / 2)}</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 overflow-x-auto">
          <div className="flex h-48 items-end gap-1 min-w-fit">
            {data.slice(-15).map((d, i) => {
              const height = maxVolume > 0 ? (d.volume / maxVolume) * 100 : 0
              return (
                <div key={i} className="group relative flex-1 min-w-[40px]">
                  {/* Tooltip */}
                  <div className="absolute -top-16 left-1/2 z-10 -translate-x-1/2 scale-0 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-xl transition-transform group-hover:scale-100 dark:bg-slate-700">
                    <p className="font-bold">{formatSats(d.volume)}</p>
                    <p className="text-slate-300">+{formatSats(d.fees)} fees</p>
                    <p className="text-xs text-slate-400">{d.label}</p>
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-900 dark:bg-slate-700" />
                  </div>

                  {/* Bar */}
                  <div
                    className="mx-auto w-8 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-300 hover:from-blue-700 hover:to-blue-500 dark:from-blue-700 dark:to-blue-500"
                    style={{ height: `${height}%`, minHeight: d.volume > 0 ? '4px' : '0' }}
                  >
                    {/* Fee indicator */}
                    <div
                      className="absolute bottom-0 left-1/2 w-6 -translate-x-1/2 rounded-t bg-emerald-500/40"
                      style={{ height: `${maxVolume > 0 ? (d.fees / maxVolume) * 100 : 0}%` }}
                    />
                  </div>

                  {/* X-axis label */}
                  <div className="mt-2 text-center">
                    <span className="block text-[10px] text-slate-400 whitespace-nowrap">
                      {d.label.split(' ').slice(-1)[0]}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-gradient-to-t from-blue-600 to-blue-400" />
            <span className="text-slate-600 dark:text-slate-400">Volume</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-emerald-500/60" />
            <span className="text-slate-600 dark:text-slate-400">Fees</span>
          </div>
        </div>
      </div>

      {/* Per-market breakdown */}
      {chartMode === 'per-market' && volumeByMarket.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Volume by Market
          </h4>
          <div className="space-y-3">
            {volumeByMarket.map((market) => {
              const marketTotal = market.daily.reduce((sum, d) => sum + d.volumeSats, 0)
              const percentage = totalVolume > 0 ? (marketTotal / totalVolume) * 100 : 0

              return (
                <div key={market.marketId} className="group">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 line-clamp-1 dark:text-slate-300">
                      {market.marketTitle}
                    </span>
                    <span className="ml-2 flex-shrink-0 font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {formatSats(marketTotal)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {percentage.toFixed(1)}% of total volume
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
