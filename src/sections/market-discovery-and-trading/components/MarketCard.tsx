import React, { useState } from 'react'
import { TrendingUp, Users, Droplet, X } from 'lucide-react'
import type { Market, YesNoMarket, CategoricalMarket, TwoDimensionalMarket } from '@/../product/sections/market-discovery-and-trading/types'

interface MarketCardProps {
  market: Market
  onBuyYes?: (marketId: string, amount: number) => void
  onBuyNo?: (marketId: string, amount: number) => void
  onBuyOutcome?: (marketId: string, outcomeId: string, amount: number) => void
  onViewMarket?: (marketId: string) => void
}

export function MarketCard({ market, onBuyYes, onBuyNo, onBuyOutcome, onViewMarket }: MarketCardProps) {
  const [isTrading, setIsTrading] = useState(false)
  const [amount, setAmount] = useState(1000)
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null)

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if clicking on the card itself, not buttons
    if ((e.target as HTMLElement).closest('button')) return
    onViewMarket?.(market.id)
  }

  const handleBuyClick = (e: React.MouseEvent, type: 'yes' | 'no' | string) => {
    e.stopPropagation()
    if (market.type === 'yesno') {
      setSelectedOutcome(type)
      setIsTrading(true)
    } else if (market.type === 'categorical') {
      setSelectedOutcome(type)
      setIsTrading(true)
    }
  }

  const handleConfirmBuy = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (market.type === 'yesno') {
      if (selectedOutcome === 'yes') {
        onBuyYes?.(market.id, amount)
      } else {
        onBuyNo?.(market.id, amount)
      }
    } else if (market.type === 'categorical' && selectedOutcome) {
      onBuyOutcome?.(market.id, selectedOutcome, amount)
    }
    setIsTrading(false)
    setAmount(1000)
  }

  const handleCancelTrade = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsTrading(false)
    setSelectedOutcome(null)
    setAmount(1000)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`
    return volume.toString()
  }

  const formatLiquidity = (liquidity: number) => {
    if (liquidity >= 1000000) return `${(liquidity / 1000000).toFixed(1)}M`
    if (liquidity >= 1000) return `${(liquidity / 1000).toFixed(0)}K`
    return liquidity.toString()
  }

  const getPredictedOdds = (currentOdd: number, buyAmount: number) => {
    // Simple simulation: odds shift by 0.5% per 10K sats
    const shift = (buyAmount / 10000) * 0.5
    return Math.min(100, currentOdd + shift)
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
              onClick={(e) => handleBuyClick(e, 'yes')}
              className="py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Buy YES
            </button>
            <button
              onClick={(e) => handleBuyClick(e, 'no')}
              className="py-2.5 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white rounded-lg font-semibold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              Buy NO
            </button>
          </div>
        </>
      )
    } else if (market.type === 'categorical') {
      const categoricalMarket = market as CategoricalMarket
      const topOutcomes = categoricalMarket.outcomes.slice(0, 3)
      return (
        <div className="space-y-1.5">
          {topOutcomes.map((outcome) => (
            <button
              key={outcome.id}
              onClick={(e) => handleBuyClick(e, outcome.id)}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-100 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-blue-900/30 rounded-lg transition-all group"
            >
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {outcome.label}
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                {outcome.odds.toFixed(1)}%
              </span>
            </button>
          ))}
        </div>
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
                {twoDMarket.dimensions.x.currentEstimate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {twoDMarket.dimensions.y.label}
              </span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                {twoDMarket.dimensions.y.currentEstimate}
              </span>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderTradingView = () => {
    if (!selectedOutcome) return null

    let oddValue = 0
    let oddLabel = ''

    if (market.type === 'yesno') {
      const yesNoMarket = market as YesNoMarket
      oddValue = selectedOutcome === 'yes' ? yesNoMarket.currentOdds.yes : yesNoMarket.currentOdds.no
      oddLabel = selectedOutcome === 'yes' ? 'YES' : 'NO'
    } else if (market.type === 'categorical') {
      const categoricalMarket = market as CategoricalMarket
      const outcome = categoricalMarket.outcomes.find((o) => o.id === selectedOutcome)
      if (outcome) {
        oddValue = outcome.odds
        oddLabel = outcome.label
      }
    }

    const predictedOdd = getPredictedOdds(oddValue, amount)

    return (
      <div className="space-y-4 animate-in fade-in-0 duration-200">
        {/* Cancel Button */}
        <button
          onClick={handleCancelTrade}
          className="absolute top-4 right-4 p-1.5 bg-slate-200/90 hover:bg-slate-300/90 dark:bg-slate-700/90 dark:hover:bg-slate-600/90 rounded-full transition-colors z-10"
        >
          <X className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </button>

        {/* Predicted Odds */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white rounded-lg p-4 text-center">
          <div className="text-xs font-medium opacity-90 mb-1">Predicted odds after purchase</div>
          <div className="text-3xl font-bold">{predictedOdd.toFixed(1)}%</div>
          <div className="text-xs font-medium opacity-75 mt-1">{oddLabel}</div>
        </div>

        {/* Amount Picker */}
        <div className="space-y-2">
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
                className="flex-1 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors"
              >
                {formatVolume(preset)}
              </button>
            ))}
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={handleConfirmBuy}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-bold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          BUY {amount.toLocaleString()} SATS
        </button>
      </div>
    )
  }

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 ${
        isTrading
          ? 'shadow-2xl scale-[1.02] ring-2 ring-blue-500'
          : 'shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer'
      }`}
    >
      {/* Market Image */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${market.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Meta Tags */}
        {market.metaTags.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2">
            {market.metaTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-amber-500/90 dark:bg-amber-400/90 backdrop-blur-sm text-white text-xs font-bold rounded shadow-md uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-2 min-h-[3rem]">
          {market.title}
        </h3>

        {/* Trading Area */}
        {isTrading ? renderTradingView() : renderNormalView()}

        {/* Metrics Footer */}
        {!isTrading && (
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1" title="Volume">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-mono font-medium">{formatVolume(market.volume)}</span>
            </div>
            <div className="flex items-center gap-1" title="Liquidity">
              <Droplet className="w-3.5 h-3.5" />
              <span className="font-mono font-medium">{formatLiquidity(market.liquidity)}</span>
            </div>
            <div className="flex items-center gap-1" title="Traders">
              <Users className="w-3.5 h-3.5" />
              <span className="font-mono font-medium">{market.traderCount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
