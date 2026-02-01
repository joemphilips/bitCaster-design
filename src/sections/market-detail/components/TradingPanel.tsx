import { X } from 'lucide-react'
import type {
  MarketDetail,
  TradeSelection,
  TradePreview,
  YesNoMarketDetail,
  CategoricalMarketDetail,
  TwoDimensionalMarketDetail,
} from '@/../product/sections/market-detail/types'
import { formatBtc } from '@/lib/format'

interface TradingPanelProps {
  market: MarketDetail
  tradeSelection: TradeSelection | null
  tradeAmount: number
  tradePreview: TradePreview | null
  onTradeSelect?: (selection: TradeSelection) => void
  onTradeClear?: () => void
  onAmountChange?: (amount: number) => void
  onTradeConfirm?: () => void
}

const QUICK_AMOUNTS = [100, 500, 1000, 5000]

function YesNoOutcomes({
  market,
  tradeSelection,
  onTradeSelect,
}: {
  market: YesNoMarketDetail
  tradeSelection: TradeSelection | null
  onTradeSelect?: (selection: TradeSelection) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => onTradeSelect?.({ side: 'yes' })}
        className={`relative p-4 rounded-xl border-2 transition-all ${
          tradeSelection?.side === 'yes'
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5'
        }`}
      >
        <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
          Yes
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {market.currentOdds.yes.toFixed(1)}%
        </div>
      </button>

      <button
        onClick={() => onTradeSelect?.({ side: 'no' })}
        className={`relative p-4 rounded-xl border-2 transition-all ${
          tradeSelection?.side === 'no'
            ? 'border-red-500 bg-red-500/10'
            : 'border-slate-200 dark:border-slate-700 hover:border-red-500/50 hover:bg-red-500/5'
        }`}
      >
        <div className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
          No
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {market.currentOdds.no.toFixed(1)}%
        </div>
      </button>
    </div>
  )
}

function CategoricalOutcomes({
  market,
  tradeSelection,
  onTradeSelect,
}: {
  market: CategoricalMarketDetail
  tradeSelection: TradeSelection | null
  onTradeSelect?: (selection: TradeSelection) => void
}) {
  return (
    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
      {market.outcomes.map((outcome) => {
        const isSelected = tradeSelection?.outcomeId === outcome.id
        return (
          <div
            key={outcome.id}
            className={`p-3 rounded-xl border transition-all ${
              isSelected
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-900 dark:text-white truncate mr-2">
                {outcome.label}
              </span>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {outcome.odds.toFixed(1)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onTradeSelect?.({ side: 'yes', outcomeId: outcome.id })}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                  isSelected && tradeSelection?.side === 'yes'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                }`}
              >
                Buy Yes
              </button>
              <button
                onClick={() => onTradeSelect?.({ side: 'no', outcomeId: outcome.id })}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                  isSelected && tradeSelection?.side === 'no'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20'
                }`}
              >
                Buy No
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TwoDimensionalOutcomes({
  market,
  tradeSelection,
  onTradeSelect,
}: {
  market: TwoDimensionalMarketDetail
  tradeSelection: TradeSelection | null
  onTradeSelect?: (selection: TradeSelection) => void
}) {
  if (market.compositeOdds) {
    // Yes/No + Yes/No 2x2 grid
    const cells = [
      { id: 'yes-yes', label: 'Yes / Yes', odds: market.compositeOdds.yesYes, color: 'emerald' },
      { id: 'yes-no', label: 'Yes / No', odds: market.compositeOdds.yesNo, color: 'amber' },
      { id: 'no-yes', label: 'No / Yes', odds: market.compositeOdds.noYes, color: 'amber' },
      { id: 'no-no', label: 'No / No', odds: market.compositeOdds.noNo, color: 'red' },
    ]

    return (
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          Base: {market.baseMarketTitle}
          <br />
          Secondary: {market.secondaryQuestion}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {cells.map((cell) => {
            const isSelected = tradeSelection?.cellId === cell.id
            const colorClasses = {
              emerald: isSelected
                ? 'border-emerald-500 bg-emerald-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 bg-emerald-500/5',
              amber: isSelected
                ? 'border-amber-500 bg-amber-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-amber-500/50 bg-amber-500/5',
              red: isSelected
                ? 'border-red-500 bg-red-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-red-500/50 bg-red-500/5',
            }

            return (
              <button
                key={cell.id}
                onClick={() => onTradeSelect?.({ side: 'yes', cellId: cell.id })}
                className={`p-3 rounded-xl border-2 transition-all ${colorClasses[cell.color as keyof typeof colorClasses]}`}
              >
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                  {cell.label}
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {cell.odds.toFixed(1)}%
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
      Complex 2D market - click cells to trade
    </p>
  )
}

export function TradingPanel({
  market,
  tradeSelection,
  tradeAmount,
  tradePreview,
  onTradeSelect,
  onTradeClear,
  onAmountChange,
  onTradeConfirm,
}: TradingPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Trade
      </h3>

      {/* Outcomes based on market type */}
      {market.type === 'yesno' && (
        <YesNoOutcomes
          market={market}
          tradeSelection={tradeSelection}
          onTradeSelect={onTradeSelect}
        />
      )}
      {market.type === 'categorical' && (
        <CategoricalOutcomes
          market={market}
          tradeSelection={tradeSelection}
          onTradeSelect={onTradeSelect}
        />
      )}
      {market.type === 'twodimensional' && (
        <TwoDimensionalOutcomes
          market={market}
          tradeSelection={tradeSelection}
          onTradeSelect={onTradeSelect}
        />
      )}

      {/* Trade Form (shown when outcome selected) */}
      {tradeSelection && (
        <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Amount (₿)
            </span>
            <button
              onClick={onTradeClear}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Amount Input */}
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
              ₿
            </span>
            <input
              type="number"
              value={tradeAmount || ''}
              onChange={(e) => onAmountChange?.(Number(e.target.value))}
              placeholder="0"
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex gap-2 mb-4">
            {QUICK_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => onAmountChange?.(amount)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                  tradeAmount === amount
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {amount.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Trade Preview */}
          {tradePreview && tradeAmount > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Price impact</span>
                <span className={`font-medium ${tradePreview.priceImpact > 0 ? 'text-amber-500' : 'text-slate-600 dark:text-slate-300'}`}>
                  {tradePreview.priceImpact > 0 ? '+' : ''}{tradePreview.priceImpact.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Predicted odds</span>
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {tradePreview.predictedOdds.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Creator fee ({market.creator.feePercent}%)</span>
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {formatBtc(tradePreview.creatorFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Potential payout</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatBtc(tradePreview.potentialPayout)}
                </span>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={onTradeConfirm}
            disabled={!tradeAmount || tradeAmount <= 0}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-semibold transition-colors disabled:cursor-not-allowed"
          >
            {tradeAmount > 0 ? `Buy ${tradeSelection.side.toUpperCase()} for ${formatBtc(tradeAmount)}` : 'Enter amount'}
          </button>
        </div>
      )}
    </div>
  )
}
