import type { MarketDetailProps } from '@/../product/sections/market-detail/types'
import { formatBtc } from '@/lib/format'
import { MarketHeader } from './MarketHeader'
import { TradingPanel } from './TradingPanel'
import { PriceChart } from './PriceChart'
import { ResolutionInfo } from './ResolutionInfo'
import { ActivityFeed } from './ActivityFeed'
import { RelatedMarkets } from './RelatedMarkets'
import { CommentSection } from './CommentSection'

function computeCurrentDisplay(market: MarketDetailProps['market']): string {
  const isResolved = market.resolution.status === 'resolved'

  if (isResolved && market.resolution.finalOutcome) {
    return `Resolved: ${market.resolution.finalOutcome}`
  }

  if (market.type === 'yesno') {
    return `${market.currentOdds.yes.toFixed(1)}%`
  }

  if (market.type === 'categorical') {
    const sorted = [...market.outcomes].sort((a, b) => b.odds - a.odds)
    const leader = sorted[0]
    if (leader) {
      return `${leader.label} ${leader.odds.toFixed(1)}%`
    }
    return ''
  }

  if (market.type === 'twodimensional') {
    if (market.compositeOdds) {
      const cells = [
        { label: 'Yes/Yes', odds: market.compositeOdds.yesYes },
        { label: 'Yes/No', odds: market.compositeOdds.yesNo },
        { label: 'No/Yes', odds: market.compositeOdds.noYes },
        { label: 'No/No', odds: market.compositeOdds.noNo },
      ]
      const leader = cells.sort((a, b) => b.odds - a.odds)[0]
      return `${leader.label} ${leader.odds.toFixed(1)}%`
    }
    if (market.categoricalCompositeOdds && market.baseOutcomes) {
      let maxOdds = 0
      let maxLabel = ''
      for (const outcome of market.baseOutcomes) {
        const odds = market.categoricalCompositeOdds[outcome.id]
        if (odds) {
          if (odds.yes > maxOdds) {
            maxOdds = odds.yes
            maxLabel = `${outcome.label}/Yes`
          }
          if (odds.no > maxOdds) {
            maxOdds = odds.no
            maxLabel = `${outcome.label}/No`
          }
        }
      }
      if (maxLabel) return `${maxLabel} ${maxOdds.toFixed(1)}%`
    }
  }

  return ''
}

export function MarketDetail({
  market,
  chartTimeframe,
  chartType,
  tradeSelection,
  tradeAmount,
  tradePreview,
  onTimeframeChange,
  onChartTypeChange,
  onTradeSelect,
  onTradeClear,
  onAmountChange,
  onTradeConfirm,
  onLikeToggle,
  onShare,
  onCommentPost,
  onCommentLike,
  onLoadMoreTrades,
  onLoadMoreComments,
  onRelatedMarketClick,
  onCreatorClick,
  onBaseMarketClick,
  onChartCellChange,
  onFixDimension,
  fixedDimension,
}: MarketDetailProps) {
  // Get outcomes for categorical markets
  const outcomes = market.type === 'categorical' ? market.outcomes : undefined

  // Get outcome-specific data for categorical markets
  const outcomePriceHistories = market.type === 'categorical' ? market.outcomePriceHistories : undefined

  // Get cell-specific data for 2D markets
  const cellPriceHistories = market.type === 'twodimensional' ? market.cellPriceHistories : undefined
  const compositeOdds = market.type === 'twodimensional' ? market.compositeOdds : undefined

  // Default selected cell for charts
  const defaultCellId = cellPriceHistories ? Object.keys(cellPriceHistories)[0] : undefined

  // Compute current display for price chart
  const currentDisplay = computeCurrentDisplay(market)

  // Determine if market is resolved and if trading is enabled
  const isResolved = market.resolution.status === 'resolved'
  const isTradingEnabled = market.resolution.status === 'open'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Desktop Layout: Two Columns (single column when resolved) */}
      <div className="max-w-7xl mx-auto">
        <div className={`${isTradingEnabled ? 'lg:grid lg:grid-cols-[1fr_380px] lg:gap-6' : ''} p-4 lg:p-6`}>
          {/* Left Column - Main Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <MarketHeader
                market={market}
                onLikeToggle={onLikeToggle}
                onShare={onShare}
                onCreatorClick={onCreatorClick}
              />
            </div>

            {/* Resolution Info (shown immediately after header for resolved markets) */}
            {isResolved && (
              <ResolutionInfo resolution={market.resolution} />
            )}

            {/* Mobile: Trading Panel (shown at top on mobile, only for open markets) */}
            {isTradingEnabled && (
              <div className="lg:hidden">
                <TradingPanel
                  market={market}
                  tradeSelection={tradeSelection}
                  tradeAmount={tradeAmount}
                  tradePreview={tradePreview}
                  onTradeSelect={onTradeSelect}
                  onTradeClear={onTradeClear}
                  onAmountChange={onAmountChange}
                  onTradeConfirm={onTradeConfirm}
                  onCommentPost={onCommentPost}
                />
              </div>
            )}

            {/* Price Chart */}
            <PriceChart
              priceHistory={market.priceHistory}
              chartTimeframe={chartTimeframe}
              chartType={chartType}
              onTimeframeChange={onTimeframeChange}
              onChartTypeChange={onChartTypeChange}
              outcomePriceHistories={outcomePriceHistories}
              outcomes={outcomes}
              cellPriceHistories={cellPriceHistories}
              selectedCellId={defaultCellId}
              onCellChange={onChartCellChange}
              currentDisplay={currentDisplay}
              comments={market.comments}
              fixedDimension={fixedDimension}
              onFixDimension={onFixDimension}
              compositeOdds={compositeOdds}
            />

            {/* Resolution Info (in normal position for open markets) */}
            {!isResolved && (
              <ResolutionInfo resolution={market.resolution} />
            )}

            {/* Activity Feed (Trades only) */}
            <ActivityFeed
              trades={market.recentTrades}
              onLoadMoreTrades={onLoadMoreTrades}
            />

            {/* Related Markets */}
            <RelatedMarkets
              markets={market.relatedMarkets}
              onMarketClick={onRelatedMarketClick}
            />

            {/* Comments */}
            <CommentSection
              comments={market.comments}
              onCommentLike={onCommentLike}
              onLoadMoreComments={onLoadMoreComments}
            />
          </div>

          {/* Right Column - Trading Panel (sticky on desktop, only for open markets) */}
          {isTradingEnabled && (
            <div className="hidden lg:block">
              <div className="sticky top-6">
                <TradingPanel
                  market={market}
                  tradeSelection={tradeSelection}
                  tradeAmount={tradeAmount}
                  tradePreview={tradePreview}
                  onTradeSelect={onTradeSelect}
                  onTradeClear={onTradeClear}
                  onAmountChange={onAmountChange}
                  onTradeConfirm={onTradeConfirm}
                  onCommentPost={onCommentPost}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Sticky Bottom Trade Bar (only for open markets) */}
      {isTradingEnabled && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 safe-area-pb">
          {tradeSelection ? (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {tradeSelection.side.toUpperCase()}
                  {tradeSelection.outcomeId && ` - ${tradeSelection.outcomeId}`}
                  {tradeSelection.cellId && ` - ${tradeSelection.cellId.replace('-', '/')}`}
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {tradeAmount > 0 ? formatBtc(tradeAmount) : 'Enter amount'}
                </p>
              </div>
              <button
                onClick={onTradeClear}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={onTradeConfirm}
                disabled={!tradeAmount || tradeAmount <= 0}
                className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold transition-colors disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                // Scroll to trading panel or open modal
                const panel = document.querySelector('[data-trading-panel]')
                panel?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Trade
            </button>
          )}
        </div>
      )}
    </div>
  )
}
