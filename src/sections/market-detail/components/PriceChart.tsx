import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import type { PriceHistory, ChartTimeframe, ChartType, Comment, FixedDimension, YesNoCompositeOdds } from '@/../product/sections/market-detail/types'

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
  // Current display: percentage or resolved outcome text
  currentDisplay?: string
  // Comments to display as bubbles on the chart
  comments?: Comment[]
  // 2D conditional probability
  fixedDimension?: FixedDimension | null
  onFixDimension?: (dim: FixedDimension | null) => void
  compositeOdds?: YesNoCompositeOdds
}

const TIMEFRAMES: ChartTimeframe[] = ['1h', '24h', '7d', '30d', 'all']

const TIMEFRAME_LABELS: Record<ChartTimeframe, string> = {
  '1h': '1H',
  '24h': '24H',
  '7d': '7D',
  '30d': '1 Month',
  'all': 'ALL',
}

const OUTCOME_COLORS = [
  'rgb(59, 130, 246)', // blue
  'rgb(16, 185, 129)', // emerald
  'rgb(245, 158, 11)', // amber
  'rgb(239, 68, 68)',  // red
  'rgb(139, 92, 246)', // violet
  'rgb(236, 72, 153)', // pink
]

// Labels for dimension-fixing toggle buttons
const DIMENSION_BUTTONS: Array<{ dim: FixedDimension | null; label: string }> = [
  { dim: null, label: 'All' },
  { dim: { dimension: 'base', value: 'yes', label: 'BTC=Yes' }, label: 'BTC=Yes' },
  { dim: { dimension: 'base', value: 'no', label: 'BTC=No' }, label: 'BTC=No' },
  { dim: { dimension: 'secondary', value: 'yes', label: 'ETH=Yes' }, label: 'ETH=Yes' },
  { dim: { dimension: 'secondary', value: 'no', label: 'ETH=No' }, label: 'ETH=No' },
]

/**
 * Compute conditional probability lines when a dimension is fixed.
 * E.g., fix base=yes → show two lines:
 *   P(secondary=Yes | base=Yes) = yesyes / (yesyes + yesno)
 *   P(secondary=No  | base=Yes) = yesno  / (yesyes + yesno)
 */
function computeConditionalLines(
  cellPriceHistories: Record<string, PriceHistory>,
  fixedDimension: FixedDimension,
): Array<{ id: string; label: string; data: Array<{ timestamp: string; price: number }> }> {
  const yy = cellPriceHistories['yes-yes']?.data || []
  const yn = cellPriceHistories['yes-no']?.data || []
  const ny = cellPriceHistories['no-yes']?.data || []
  const nn = cellPriceHistories['no-no']?.data || []

  // All histories should have same length/timestamps
  const len = Math.min(yy.length, yn.length, ny.length, nn.length)
  if (len === 0) return []

  if (fixedDimension.dimension === 'base' && fixedDimension.value === 'yes') {
    // Fix base=Yes → P(sec=Yes|base=Yes), P(sec=No|base=Yes)
    const line1: Array<{ timestamp: string; price: number }> = []
    const line2: Array<{ timestamp: string; price: number }> = []
    for (let i = 0; i < len; i++) {
      const sum = yy[i].price + yn[i].price
      if (sum > 0) {
        line1.push({ timestamp: yy[i].timestamp, price: (yy[i].price / sum) * 100 })
        line2.push({ timestamp: yn[i].timestamp, price: (yn[i].price / sum) * 100 })
      }
    }
    return [
      { id: 'sec-yes', label: 'ETH=Yes', data: line1 },
      { id: 'sec-no', label: 'ETH=No', data: line2 },
    ]
  }

  if (fixedDimension.dimension === 'base' && fixedDimension.value === 'no') {
    const line1: Array<{ timestamp: string; price: number }> = []
    const line2: Array<{ timestamp: string; price: number }> = []
    for (let i = 0; i < len; i++) {
      const sum = ny[i].price + nn[i].price
      if (sum > 0) {
        line1.push({ timestamp: ny[i].timestamp, price: (ny[i].price / sum) * 100 })
        line2.push({ timestamp: nn[i].timestamp, price: (nn[i].price / sum) * 100 })
      }
    }
    return [
      { id: 'sec-yes', label: 'ETH=Yes', data: line1 },
      { id: 'sec-no', label: 'ETH=No', data: line2 },
    ]
  }

  if (fixedDimension.dimension === 'secondary' && fixedDimension.value === 'yes') {
    const line1: Array<{ timestamp: string; price: number }> = []
    const line2: Array<{ timestamp: string; price: number }> = []
    for (let i = 0; i < len; i++) {
      const sum = yy[i].price + ny[i].price
      if (sum > 0) {
        line1.push({ timestamp: yy[i].timestamp, price: (yy[i].price / sum) * 100 })
        line2.push({ timestamp: ny[i].timestamp, price: (ny[i].price / sum) * 100 })
      }
    }
    return [
      { id: 'base-yes', label: 'BTC=Yes', data: line1 },
      { id: 'base-no', label: 'BTC=No', data: line2 },
    ]
  }

  if (fixedDimension.dimension === 'secondary' && fixedDimension.value === 'no') {
    const line1: Array<{ timestamp: string; price: number }> = []
    const line2: Array<{ timestamp: string; price: number }> = []
    for (let i = 0; i < len; i++) {
      const sum = yn[i].price + nn[i].price
      if (sum > 0) {
        line1.push({ timestamp: yn[i].timestamp, price: (yn[i].price / sum) * 100 })
        line2.push({ timestamp: nn[i].timestamp, price: (nn[i].price / sum) * 100 })
      }
    }
    return [
      { id: 'base-yes', label: 'BTC=Yes', data: line1 },
      { id: 'base-no', label: 'BTC=No', data: line2 },
    ]
  }

  return []
}

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
  currentDisplay,
  comments,
  fixedDimension,
  onFixDimension,
  compositeOdds,
}: PriceChartProps) {
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null)

  // Determine which data to show
  const isMultiLine = outcomePriceHistories && outcomes && outcomes.length > 0
  const is2D = cellPriceHistories && Object.keys(cellPriceHistories).length > 0
  const hasAllCells = is2D && cellPriceHistories['yes-yes'] && cellPriceHistories['yes-no'] && cellPriceHistories['no-yes'] && cellPriceHistories['no-no']

  // Compute conditional probability lines if a dimension is fixed
  const conditionalLines = (hasAllCells && fixedDimension)
    ? computeConditionalLines(cellPriceHistories, fixedDimension)
    : []
  const showConditional = conditionalLines.length > 0

  // Get active price history
  let activeData = priceHistory.data
  if (is2D && !showConditional && selectedCellId && cellPriceHistories[selectedCellId]) {
    activeData = cellPriceHistories[selectedCellId].data
  } else if (showConditional && conditionalLines[0]?.data.length) {
    // Use first conditional line data for bounds computation
    activeData = conditionalLines[0].data
  }

  // Calculate chart bounds
  let allPrices: number[]
  if (showConditional) {
    allPrices = conditionalLines.flatMap(line => line.data.map(p => p.price))
  } else {
    allPrices = activeData.map((p) => chartType === 'volume' && p.volume ? p.volume : p.price)
  }
  const minPrice = Math.min(...allPrices, 0)
  const maxPrice = Math.max(...allPrices, 100)
  const range = maxPrice - minPrice || 1

  // Generate SVG path
  function generatePath(data: Array<{ price: number; volume?: number }>): string {
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

  // Check if current fixedDimension matches a button
  function isDimMatch(a: FixedDimension | null | undefined, b: FixedDimension | null): boolean {
    if (!a && !b) return true
    if (!a || !b) return false
    return a.dimension === b.dimension && a.value === b.value
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* Current Display: percentage or resolved outcome */}
        <div>
          {currentDisplay ? (
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {currentDisplay}
            </div>
          ) : (
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Price Chart
            </h3>
          )}
          {showConditional && fixedDimension && (
            <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
              Conditional on {fixedDimension.label}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* 2D Cell Selector (hidden when showing conditional lines) */}
          {is2D && !showConditional && (
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

      {/* 2D Dimension-Fixing Toggle */}
      {hasAllCells && onFixDimension && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {DIMENSION_BUTTONS.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => onFixDimension(btn.dim)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                isDimMatch(fixedDimension, btn.dim)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Chart Area */}
      <div className="relative h-48 mb-4 bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden">
        {activeData.length === 0 && !showConditional ? (
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

            {/* Conditional probability multi-line for 2D markets */}
            {showConditional ? (
              conditionalLines.map((line, idx) => (
                <path
                  key={line.id}
                  d={generatePath(line.data)}
                  fill="none"
                  stroke={OUTCOME_COLORS[idx % OUTCOME_COLORS.length]}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              ))
            ) : isMultiLine && outcomePriceHistories && outcomes ? (
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

        {/* Comment Bubbles (only on price chart) */}
        {chartType === 'price' && comments && comments.length > 0 && activeData.length >= 2 && (() => {
          const timestamps = activeData.map(p => new Date(p.timestamp).getTime())
          const timeMin = Math.min(...timestamps)
          const timeMax = Math.max(...timestamps)
          const timeRange = timeMax - timeMin || 1
          const maxLikes = Math.max(...comments.map(c => c.likeCount), 1)

          const visibleComments = comments.filter(c => {
            const t = new Date(c.timestamp).getTime()
            return t >= timeMin && t <= timeMax
          })

          return visibleComments.map((comment) => {
            const commentTime = new Date(comment.timestamp).getTime()
            const xPercent = ((commentTime - timeMin) / timeRange) * 90 + 5
            const size = 24 + 16 * (comment.likeCount / maxLikes)
            const opacity = 0.4 + 0.6 * (comment.likeCount / maxLikes)
            const isHovered = hoveredCommentId === comment.id

            return (
              <div
                key={comment.id}
                className="absolute group"
                style={{
                  left: `${xPercent}%`,
                  bottom: '8px',
                  transform: 'translateX(-50%)',
                }}
                onMouseEnter={() => setHoveredCommentId(comment.id)}
                onMouseLeave={() => setHoveredCommentId(null)}
              >
                <div
                  className="flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer transition-transform hover:scale-125"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity,
                  }}
                >
                  <MessageCircle className="w-3 h-3" />
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded-lg p-2.5 shadow-lg z-10 pointer-events-none">
                    <p className="font-medium mb-0.5">{comment.userDisplayName}</p>
                    <p className="text-slate-300 line-clamp-2">{comment.content}</p>
                    <p className="text-slate-400 mt-1">{comment.likeCount} likes</p>
                  </div>
                )}
              </div>
            )
          })
        })()}
      </div>

      {/* Legend for Conditional Lines */}
      {showConditional && (
        <div className="flex flex-wrap gap-3 mb-4">
          {conditionalLines.map((line, idx) => (
            <div key={line.id} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: OUTCOME_COLORS[idx % OUTCOME_COLORS.length] }}
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">{line.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Legend for Categorical Markets */}
      {!showConditional && isMultiLine && outcomes && (
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
            {TIMEFRAME_LABELS[tf]}
          </button>
        ))}
      </div>
    </div>
  )
}
