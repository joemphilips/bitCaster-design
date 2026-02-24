import { useState } from 'react'
import data from '@/../product/sections/market-detail/data.json'
import { MarketDetail } from './components/MarketDetail'
import type {
  ChartTimeframe,
  ChartType,
  TradeSelection,
  TradePreview,
  LimitOrderPreview,
  TradeSide,
  OrderType,
  FixedDimension,
  MarketDetail as MarketDetailType,
} from '@/../product/sections/market-detail/types'

type MarketKey = 'yesNoMarket' | 'resolvedYesNoMarket' | 'categoricalMarket' | 'twoDimensionalMarket' | 'categorical2DMarket'

const marketLabels: Record<MarketKey, string> = {
  yesNoMarket: 'Yes/No Market',
  resolvedYesNoMarket: 'Resolved Market',
  categoricalMarket: 'Categorical Market',
  twoDimensionalMarket: 'Yes/No 2D Market',
  categorical2DMarket: 'Categorical 2D Market',
}

export function MarketDetailPreview() {
  // Market type selector (for preview only)
  const [selectedMarketKey, setSelectedMarketKey] = useState<MarketKey>('yesNoMarket')

  // UI State
  const [chartTimeframe, setChartTimeframe] = useState<ChartTimeframe>('7d')
  const [chartType, setChartType] = useState<ChartType>('price')
  const [tradeSelection, setTradeSelection] = useState<TradeSelection | null>(null)
  const [tradeAmount, setTradeAmount] = useState<number>(0)
  const [fixedDimension, setFixedDimension] = useState<FixedDimension | null>(null)
  const [tradeSide, setTradeSide] = useState<TradeSide>('buy')
  const [orderType, setOrderType] = useState<OrderType>('market')
  const [limitPrice, setLimitPrice] = useState<number>(6500)
  const userHoldings = 1000 // Mock: user holds 1000 shares

  // Get the selected market data
  const market = data[selectedMarketKey] as unknown as MarketDetailType

  // Generate trade preview when selection and amount are set
  const tradePreview: TradePreview | null = tradeSelection && tradeAmount > 0
    ? {
        amount: tradeAmount,
        predictedOdds: 68.2,
        priceImpact: 0.7,
        potentialPayout: Math.round(tradeAmount * (100 / 67.5)),
        creatorFee: Math.round(tradeAmount * (market.creator.feePercent / 100)),
        platformFee: 0,
        totalCost: tradeAmount,
      }
    : null

  // Generate limit order preview when limit mode is active
  const limitOrderPreview: LimitOrderPreview | null =
    orderType === 'limit' && tradeSelection && tradeAmount > 0
      ? {
          limitPrice,
          amount: tradeAmount,
          sharesIfFilled: Math.round(tradeAmount * 10000 / limitPrice),
          creatorFee: Math.round(tradeAmount * (market.creator.feePercent / 100)),
          platformFee: 0,
          totalCost: tradeAmount,
        }
      : null

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Market Type Selector (Preview Only) */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
              Preview:
            </span>
            {(Object.keys(marketLabels) as MarketKey[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedMarketKey(key)
                  setTradeSelection(null)
                  setTradeAmount(0)
                  setFixedDimension(null)
                  setTradeSide('buy')
                  setOrderType('market')
                  setLimitPrice(6500)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedMarketKey === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {marketLabels[key]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market Detail Component */}
      <MarketDetail
        market={market}
        chartTimeframe={chartTimeframe}
        chartType={chartType}
        tradeSelection={tradeSelection}
        tradeAmount={tradeAmount}
        tradePreview={tradePreview}
        tradeSide={tradeSide}
        orderType={orderType}
        limitOrderPreview={limitOrderPreview}
        limitPrice={limitPrice}
        userHoldings={userHoldings}
        onTradeSideChange={(side) => {
          console.log('Trade side changed:', side)
          setTradeSide(side)
        }}
        onOrderTypeChange={(type) => {
          console.log('Order type changed:', type)
          setOrderType(type)
        }}
        onLimitPriceChange={(price) => {
          console.log('Limit price changed:', price)
          setLimitPrice(price)
        }}
        onTimeframeChange={(tf) => {
          console.log('Timeframe changed:', tf)
          setChartTimeframe(tf)
        }}
        onChartTypeChange={(type) => {
          console.log('Chart type changed:', type)
          setChartType(type)
        }}
        onTradeSelect={(selection) => {
          console.log('Trade selected:', selection)
          setTradeSelection(selection)
        }}
        onTradeClear={() => {
          console.log('Trade cleared')
          setTradeSelection(null)
          setTradeAmount(0)
        }}
        onAmountChange={(amount) => {
          console.log('Amount changed:', amount)
          setTradeAmount(amount)
        }}
        onTradeConfirm={() => {
          console.log('Trade confirmed:', { tradeSelection, tradeAmount, tradePreview })
          alert(`Trade confirmed!\n\nSide: ${tradeSelection?.side}\nAmount: ₿${tradeAmount.toLocaleString()}\nPotential payout: ₿${tradePreview?.potentialPayout?.toLocaleString()}`)
          setTradeSelection(null)
          setTradeAmount(0)
        }}
        onLikeToggle={() => {
          console.log('Like toggled')
        }}
        onShare={() => {
          console.log('Share clicked')
          alert('Share functionality would open here')
        }}
        onCommentPost={(content) => {
          console.log('Comment posted:', content)
          alert(`Comment posted: "${content}"`)
        }}
        onCommentLike={(commentId) => {
          console.log('Comment liked:', commentId)
        }}
        onLoadMoreTrades={() => {
          console.log('Load more trades')
        }}
        onLoadMoreComments={() => {
          console.log('Load more comments')
        }}
        onRelatedMarketClick={(marketId) => {
          console.log('Related market clicked:', marketId)
          alert(`Navigate to market: ${marketId}`)
        }}
        onCreatorClick={(creatorId) => {
          console.log('Creator clicked:', creatorId)
          alert(`Navigate to creator profile: ${creatorId}`)
        }}
        onBaseMarketClick={(marketId) => {
          console.log('Base market clicked:', marketId)
          alert(`Navigate to base market: ${marketId}`)
        }}
        onChartCellChange={(cellId) => {
          console.log('Chart cell changed:', cellId)
        }}
        fixedDimension={fixedDimension}
        onFixDimension={(dim) => {
          console.log('Fixed dimension changed:', dim)
          setFixedDimension(dim)
        }}
      />
    </div>
  )
}

export default MarketDetailPreview
