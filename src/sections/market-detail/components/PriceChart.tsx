import type { PriceHistory, ChartTimeframe, ChartType } from '@/../product/sections/market-detail/types'

interface PriceChartProps {
  priceHistory: PriceHistory
  chartTimeframe: ChartTimeframe
  chartType: ChartType
  onTimeframeChange?: (timeframe: ChartTimeframe) => void
  onChartTypeChange?: (type: ChartType) => void
  // For categorical markets
  outcomePriceHistories?: Record<string, PriceHistory>
  outcomes?: Array<{ id: string; label: string; odds: number }>
  // For 2D markets
  cellPriceHistories?: Record<string, PriceHistory>
  selectedCellId?: string
  onCellChange?: (cellId: string) => void
}

const TIMEFRAMES: ChartTimeframe[] = ['1h', '24h', '7d', '30d', 'all']

const OUTCOME_COLORS = [
  'rgb(59, 130, 246)', // blue
  'rgb(16, 185, 129)', // emerald
  'rgb(245, 158, 11)', // amber
  'rgb(239, 68, 68)',  // red
  'rgb(139, 92, 246)', // violet
  'rgb(236, 72, 153)', // pink
]

export function PriceChart({
  priceHistory,
  chartTimeframe,
  chartType,
  onTimeframeChange,
  onChartTypeChange,
  outcomePriceHistories,
  outcomes,
  cellPriceHistories,
  selectedCellId,
  onCellChange,
}: PriceChartProps) {
  // Determine which data to show
  const isMultiLine = outcomePriceHistories && outcomes && outcomes.length > 0
  const is2D = cellPriceHistories && Object.keys(cellPriceHistories).length > 0

  // Get active price history
  let activeData = priceHistory.data
  if (is2D && selectedCellId && cellPriceHistories[selectedCellId]) {
    activeData = cellPriceHistories[selectedCellId].data
  }

  // Calculate chart bounds
  const prices = activeData.map((p) => chartType === 'volume' && p.volume ? p.volume : p.price)
  const minPrice = Math.min(...prices, 0)
  const maxPrice = Math.max(...prices, 100)
  const range = maxPrice - minPrice || 1

  // Generate SVG path
  function generatePath(data: typeof activeData): string {
    if (data.length === 0) return ''

    const width = 100
    const height = 100
    const padding = 5

    return data
      .map((point, i) => {
        const x = padding + ((width - 2 * padding) * i) / (data.length - 1 || 1)
        const value = chartType === 'volume' && point.volume ? point.volume : point.price
        const y = height - padding - ((value - minPrice) / range) * (height - 2 * padding)
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(' ')
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Price Chart
        </h3>

        <div className="flex items-center gap-2">
          {/* 2D Cell Selector */}
          {is2D && (
            <select
              value={selectedCellId || ''}
              onChange={(e) => onCellChange?.(e.target.value)}
              className="text-xs bg-slate-100 dark:bg-slate-700 border-0 rounded-lg px-2 py-1.5 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(cellPriceHistories).map((cellId) => (
                <option key={cellId} value={cellId}>
                  {cellId.replace('-', ' / ').toUpperCase()}
                </option>
              ))}
            </select>
          )}

          {/* Chart Type Toggle */}
          <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-0.5">
            <button
              onClick={() => onChartTypeChange?.('price')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                chartType === 'price'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Price
            </button>
            <button
              onClick={() => onChartTypeChange?.('volume')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                chartType === 'volume'
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Volume
            </button>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-48 mb-4 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden">
        {activeData.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
            No data available
          </div>
        ) : (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Grid Lines */}
            <line x1="5" y1="25" x2="95" y2="25" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="0.5" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="0.5" />
            <line x1="5" y1="75" x2="95" y2="75" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="0.5" />

            {/* Multi-line for categorical markets */}
            {isMultiLine && outcomePriceHistories && outcomes ? (
              outcomes.slice(0, 6).map((outcome, idx) => {
                const history = outcomePriceHistories[outcome.id]
                if (!history?.data?.length) return null
                return (
                  <path
                    key={outcome.id}
                    d={generatePath(history.data)}
                    fill="none"
                    stroke={OUTCOME_COLORS[idx % OUTCOME_COLORS.length]}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })
            ) : (
              <>
                {/* Area Fill */}
                <path
                  d={`${generatePath(activeData)} L 95 95 L 5 95 Z`}
                  fill="url(#areaGradient)"
                />

                {/* Line */}
                <path
                  d={generatePath(activeData)}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            )}

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Y-Axis Labels */}
        <div className="absolute inset-y-0 left-2 flex flex-col justify-between py-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>{maxPrice.toFixed(0)}{chartType === 'price' ? '%' : ''}</span>
          <span>{((maxPrice + minPrice) / 2).toFixed(0)}{chartType === 'price' ? '%' : ''}</span>
          <span>{minPrice.toFixed(0)}{chartType === 'price' ? '%' : ''}</span>
        </div>
      </div>

      {/* Legend for Categorical Markets */}
      {isMultiLine && outcomes && (
        <div className="flex flex-wrap gap-3 mb-4">
          {outcomes.slice(0, 6).map((outcome, idx) => (
            <div key={outcome.id} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: OUTCOME_COLORS[idx % OUTCOME_COLORS.length] }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">{outcome.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Timeframe Selector */}
      <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            onClick={() => onTimeframeChange?.(tf)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
              chartTimeframe === tf
                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tf.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
