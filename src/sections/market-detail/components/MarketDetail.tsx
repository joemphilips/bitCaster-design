import type { MarketDetailProps } from '@/../product/sections/market-detail/types'
import { MarketHeader } from './MarketHeader'
import { TradingPanel } from './TradingPanel'
import { OrderBookSection } from './OrderBookSection'
import { PriceChart } from './PriceChart'
import { MarketStats } from './MarketStats'
import { ResolutionInfo } from './ResolutionInfo'
import { ActivityFeed } from './ActivityFeed'
import { RelatedMarkets } from './RelatedMarkets'

export function MarketDetail({
  market,
  chartTimeframe,
  chartType,
  activityTab,
  tradeSelection,
  tradeAmount,
  tradePreview,
  onTimeframeChange,
  onChartTypeChange,
  onActivityTabChange,
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
  onOrderBookOutcomeChange,
  onChartCellChange,
}: MarketDetailProps) {
  // Get outcomes for categorical markets
  const outcomes = market.type === 'categorical' ? market.outcomes : undefined

  // Get outcome-specific data for categorical markets
  const outcomePriceHistories = market.type === 'categorical' ? market.outcomePriceHistories : undefined
  const outcomeOrderBooks = market.type === 'categorical' ? market.outcomeOrderBooks : undefined

  // Get cell-specific data for 2D markets
  const cellPriceHistories = market.type === 'twodimensional' ? market.cellPriceHistories : undefined
  const cellOrderBooks = market.type === 'twodimensional' ? market.cellOrderBooks : undefined

  // Default selected outcome/cell for charts
  const defaultOutcomeId = outcomes?.[0]?.id
  const defaultCellId = cellPriceHistories ? Object.keys(cellPriceHistories)[0] : undefined

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Desktop Layout: Two Columns */}
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-6 p-4 lg:p-6">
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

            {/* Mobile: Trading Panel (shown at top on mobile) */}
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
              />
            </div>

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
            />

            {/* Two Column Grid: Order Book + Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <OrderBookSection
                orderBook={market.orderBook}
                selectedOutcomeId={defaultOutcomeId}
                outcomeOrderBooks={outcomeOrderBooks}
                onOutcomeChange={onOrderBookOutcomeChange}
                outcomes={outcomes}
              />

              <MarketStats market={market} />
            </div>

            {/* Resolution Info */}
            <ResolutionInfo resolution={market.resolution} />

            {/* Activity Feed */}
            <ActivityFeed
              trades={market.recentTrades}
              comments={market.comments}
              activeTab={activityTab}
              onTabChange={onActivityTabChange}
              onCommentPost={onCommentPost}
              onCommentLike={onCommentLike}
              onLoadMoreTrades={onLoadMoreTrades}
              onLoadMoreComments={onLoadMoreComments}
            />

            {/* Related Markets */}
            <RelatedMarkets
              markets={market.relatedMarkets}
              onMarketClick={onRelatedMarketClick}
            />
          </div>

          {/* Right Column - Trading Panel (sticky on desktop) */}
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
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Sticky Bottom Trade Bar */}
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
                {tradeAmount > 0 ? `${tradeAmount.toLocaleString()} sats` : 'Enter amount'}
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
    </div>
  )
}
