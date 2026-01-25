import React, { useState, useRef, useEffect } from 'react'
import { Users, Droplet, X, ChevronUp, ChevronDown, Heart } from 'lucide-react'
import type {
  Market,
  YesNoMarket,
  CategoricalMarket,
  TwoDimensionalMarket,
  Outcome,
} from '@/../product/sections/market-discovery-and-trading/types'

interface MarketCardProps {
  market: Market
  onBuyYes?: (marketId: string, amount: number) => void
  onBuyNo?: (marketId: string, amount: number) => void
  onBuyOutcomeYes?: (marketId: string, outcomeId: string, amount: number) => void
  onBuyOutcomeNo?: (marketId: string, outcomeId: string, amount: number) => void
  onViewMarket?: (marketId: string) => void
  onLike?: (marketId: string) => void
}

interface TradeState {
  side: 'yes' | 'no'
  outcomeId?: string
  outcomeLabel?: string
}

function formatVolume(sats: number): string {
  const btc = sats / 100_000_000
  if (btc >= 1) {
    return `₿${btc.toFixed(2)}`
  }
  if (btc >= 0.1) {
    return `₿${btc.toFixed(3)}`
  }
  if (btc >= 0.01) {
    return `₿${btc.toFixed(4)}`
  }
  return `₿${btc.toFixed(5)}`
}

function formatLiquidity(sats: number): string {
  if (sats >= 1_000_000) return `${(sats / 1_000_000).toFixed(1)}M`
  if (sats >= 1_000) return `${(sats / 1_000).toFixed(0)}K`
  return sats.toString()
}

function CategoricalOutcomes({
  outcomes,
  onYesClick,
  onNoClick,
}: {
  outcomes: Outcome[]
  onYesClick: (outcomeId: string, label: string) => void
  onNoClick: (outcomeId: string, label: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      setCanScrollUp(scrollTop > 2)
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 2)
    }
  }

  useEffect(() => {
    checkScroll()
    const resizeObserver = new ResizeObserver(checkScroll)
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [outcomes])

  const scroll = (direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation()
    if (scrollRef.current) {
      const scrollAmount = 100
      scrollRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative group/outcomes">
      {/* Up scroll button */}
      {canScrollUp && (
        <button
          onClick={(e) => scroll('up', e)}
          className="absolute left-1/2 -translate-x-1/2 -top-2 z-10 w-7 h-7 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover/outcomes:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Scrollable outcomes (vertical) */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex flex-col gap-2 overflow-y-auto max-h-48 scrollbar-hide -mx-1 px-1 py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {outcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="flex-shrink-0 bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">
                {outcome.label}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 ml-2">
                {outcome.odds.toFixed(1)}%
              </div>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onYesClick(outcome.id, outcome.label)
                }}
                className="flex-1 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 rounded text-emerald-600 dark:text-emerald-400 font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Yes
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onNoClick(outcome.id, outcome.label)
                }}
                className="flex-1 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 rounded text-rose-600 dark:text-rose-400 font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Down scroll button */}
      {canScrollDown && (
        <button
          onClick={(e) => scroll('down', e)}
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 z-10 w-7 h-7 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover/outcomes:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function MarketCard({
  market,
  onBuyYes,
  onBuyNo,
  onBuyOutcomeYes,
  onBuyOutcomeNo,
  onViewMarket,
  onLike,
}: MarketCardProps) {
  const [isTrading, setIsTrading] = useState(false)
  const [tradeState, setTradeState] = useState<TradeState | null>(null)
  const [amount, setAmount] = useState(1000)

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    if ((e.target as HTMLElement).closest('input')) return
    onViewMarket?.(market.id)
  }

  const handleYesNoClick = (e: React.MouseEvent, side: 'yes' | 'no') => {
    e.stopPropagation()
    setTradeState({ side })
    setIsTrading(true)
  }

  const handleOutcomeClick = (
    outcomeId: string,
    label: string,
    side: 'yes' | 'no'
  ) => {
    setTradeState({ side, outcomeId, outcomeLabel: label })
    setIsTrading(true)
  }

  const handleConfirmBuy = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!tradeState) return

    if (market.type === 'yesno') {
      if (tradeState.side === 'yes') {
        onBuyYes?.(market.id, amount)
      } else {
        onBuyNo?.(market.id, amount)
      }
    } else if (market.type === 'categorical' && tradeState.outcomeId) {
      if (tradeState.side === 'yes') {
        onBuyOutcomeYes?.(market.id, tradeState.outcomeId, amount)
      } else {
        onBuyOutcomeNo?.(market.id, tradeState.outcomeId, amount)
      }
    }
    setIsTrading(false)
    setTradeState(null)
    setAmount(1000)
  }

  const handleCancelTrade = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsTrading(false)
    setTradeState(null)
    setAmount(1000)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    onLike?.(market.id)
  }

  const getPredictedOdds = (currentOdd: number, buyAmount: number) => {
    const shift = (buyAmount / 10000) * 0.5
    return Math.min(99.9, Math.max(0.1, currentOdd + shift))
  }

  const getCurrentOdds = (): number => {
    if (!tradeState) return 50

    if (market.type === 'yesno') {
      const yesNoMarket = market as YesNoMarket
      return tradeState.side === 'yes'
        ? yesNoMarket.currentOdds.yes
        : yesNoMarket.currentOdds.no
    }

    if (market.type === 'categorical' && tradeState.outcomeId) {
      const categoricalMarket = market as CategoricalMarket
      const outcome = categoricalMarket.outcomes.find(
        (o) => o.id === tradeState.outcomeId
      )
      return tradeState.side === 'yes'
        ? outcome?.odds || 50
        : 100 - (outcome?.odds || 50)
    }

    return 50
  }

  const renderNormalView = () => {
    if (market.type === 'yesno') {
      const yesNoMarket = market as YesNoMarket
      return (
        <>
          {/* Odds Display */}
          <div className="absolute top-4 right-4 bg-blue-600/90 dark:bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {yesNoMarket.currentOdds.yes.toFixed(1)}%
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => handleYesNoClick(e, 'yes')}
              className="py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Buy YES
            </button>
            <button
              onClick={(e) => handleYesNoClick(e, 'no')}
              className="py-2.5 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Buy NO
            </button>
          </div>
        </>
      )
    } else if (market.type === 'categorical') {
      const categoricalMarket = market as CategoricalMarket
      return (
        <CategoricalOutcomes
          outcomes={categoricalMarket.outcomes}
          onYesClick={(id, label) => handleOutcomeClick(id, label, 'yes')}
          onNoClick={(id, label) => handleOutcomeClick(id, label, 'no')}
        />
      )
    } else if (market.type === 'twodimensional') {
      const twoDMarket = market as TwoDimensionalMarket
      return (
        <div className="bg-gradient-to-br from-blue-50 to-amber-50 dark:from-blue-950/30 dark:to-amber-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {twoDMarket.dimensions.x.label}
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {twoDMarket.dimensions.x.currentEstimate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {twoDMarket.dimensions.y.label}
              </span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                {twoDMarket.dimensions.y.currentEstimate.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderTradingView = () => {
    if (!tradeState) return null

    const currentOdds = getCurrentOdds()
    const predictedOdd = getPredictedOdds(currentOdds, amount)

    let tradeLabel = tradeState.side.toUpperCase()
    if (tradeState.outcomeLabel) {
      tradeLabel = `${tradeState.side.toUpperCase()} on "${tradeState.outcomeLabel}"`
    }

    return (
      <div className="flex flex-col h-full animate-in fade-in-0 duration-200">
        {/* Cancel Button */}
        <button
          onClick={handleCancelTrade}
          className="absolute top-4 right-4 p-1.5 bg-slate-200/90 hover:bg-slate-300/90 dark:bg-slate-700/90 dark:hover:bg-slate-600/90 rounded-full transition-colors z-10"
        >
          <X className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </button>

        {/* Market Title in Trading View */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2 mb-4 pr-8">
          {market.title}
        </h3>

        {/* Predicted Odds */}
        <div
          className={`rounded-lg p-4 text-center ${
            tradeState.side === 'yes'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400'
              : 'bg-gradient-to-r from-rose-600 to-rose-500 dark:from-rose-500 dark:to-rose-400'
          } text-white`}
        >
          <div className="text-xs font-medium opacity-90 mb-1">
            Predicted odds after purchase
          </div>
          <div className="text-3xl font-bold">{predictedOdd.toFixed(1)}%</div>
          <div className="text-xs font-medium opacity-75 mt-1">{tradeLabel}</div>
        </div>

        {/* Amount Picker */}
        <div className="space-y-2 mt-4 flex-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Amount (sats)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            onClick={(e) => e.stopPropagation()}
            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 font-mono font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="100"
          />
          <div className="flex gap-2">
            {[500, 1000, 5000, 10000].map((preset) => (
              <button
                key={preset}
                onClick={(e) => {
                  e.stopPropagation()
                  setAmount(preset)
                }}
                className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${
                  amount === preset
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
                }`}
              >
                {preset >= 1000 ? `${preset / 1000}K` : preset}
              </button>
            ))}
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={handleConfirmBuy}
          className={`w-full py-3 rounded-lg font-bold text-sm text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-4 ${
            tradeState.side === 'yes'
              ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600'
              : 'bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600'
          }`}
        >
          BUY {amount.toLocaleString()} SATS
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 h-[420px] flex flex-col ${
        isTrading
          ? 'shadow-2xl ring-2 ring-blue-500'
          : 'shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer'
      }`}
    >
      {/* Market Image */}
      <div className="relative h-40 sm:h-48 flex-shrink-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${market.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-2 min-h-[3rem]">
          {market.title}
        </h3>

        {/* Trading Area - Fixed height */}
        <div className="flex-1 flex flex-col justify-between mt-3">
          {renderNormalView()}
        </div>

        {/* Metrics Footer */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 mt-auto border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1 font-mono font-semibold text-amber-600 dark:text-amber-400" title="Volume">
            {formatVolume(market.volume)}
          </div>
          <div className="flex items-center gap-1" title="Liquidity">
            <Droplet className="w-3.5 h-3.5" />
            <span className="font-mono font-medium">{formatLiquidity(market.liquidity)}</span>
          </div>
          <div className="flex items-center gap-1" title="Traders">
            <Users className="w-3.5 h-3.5" />
            <span className="font-mono font-medium">{market.traderCount.toLocaleString()}</span>
          </div>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 cursor-pointer transition-colors ${
              market.isLiked
                ? 'text-rose-500'
                : 'hover:text-rose-500'
            }`}
            title="Like"
          >
            <Heart className="w-3.5 h-3.5" fill={market.isLiked ? 'currentColor' : 'none'} />
            <span className="font-mono font-medium">{market.likeCount}</span>
          </button>
        </div>
      </div>

      {/* Trading overlay - covers entire card when active */}
      {isTrading && (
        <div className="absolute inset-0 bg-white dark:bg-slate-900 z-20 p-6 flex flex-col rounded-xl">
          {renderTradingView()}
        </div>
      )}
    </div>
  )
}
