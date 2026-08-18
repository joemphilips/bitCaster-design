import React, { useState, useRef, useEffect } from 'react'
import { X, ChevronUp, ChevronDown } from 'lucide-react'
import type {
  MarketDetail,
  TradeSelection,
  TradePreview,
  LimitOrderPreview,
  TradeSide,
  TradeTab,
  OrderType,
  YesNoMarketDetail,
  CategoricalMarketDetail,
} from '../types'
import { formatBtc } from './format'
import { PostCreateFundingHandoff } from '../../market-creation/components/PostCreateFundingHandoff'

interface TradingPanelProps {
  market: MarketDetail
  tradeSelection: TradeSelection | null
  tradeAmount: number
  tradePreview: TradePreview | null
  tradeSide: TradeSide
  tradeTab?: TradeTab
  hasExecutableLiquidity?: boolean
  orderType: OrderType
  limitOrderPreview?: LimitOrderPreview | null
  limitPrice?: number
  userHoldings?: number
  onTradeSelect?: (selection: TradeSelection) => void
  onTradeClear?: () => void
  onAmountChange?: (amount: number) => void
  onTradeConfirm?: () => void
  onCommentPost?: (content: string) => void
  onTradeSideChange?: (side: TradeSide) => void
  onTradeTabChange?: (tab: TradeTab) => void
  onFundingComplete?: (choice: string, amountSats?: number) => void
  onOrderTypeChange?: (type: OrderType) => void
  onLimitPriceChange?: (price: number) => void
}

const QUICK_AMOUNTS = [100, 500, 1000, 5000]
const QUICK_SELL_PERCENTAGES = [25, 50, 75, 100]

const TRADE_ROUTES: Array<{ id: TradeTab; label: string }> = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'liquidity', label: 'Liquidity' },
]

/**
 * Only a confirmed settlement fill produces a market price. Keep `no-trades`
 * and `unavailable` separate. Never substitute a midpoint or a synthetic value.
 */
function formatNullablePrice(
  authority: MarketDetail['priceAuthority'],
  price: number | null,
): string {
  if (authority.state === 'unavailable') return 'Price unavailable'
  if (price == null || authority.state === 'no-trades') return 'No trades yet'
  return `${price.toFixed(1)}%`
}

// Custom scrollable container with chevron buttons
function ScrollableContainer({
  children,
  className,
  groupName = 'scroll',
}: {
  children: React.ReactNode
  className?: string
  groupName?: string
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
  }, [children])

  const scroll = (direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation()
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: direction === 'up' ? -100 : 100,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={`relative group/${groupName}`}>
      {canScrollUp && (
        <button
          onClick={(e) => scroll('up', e)}
          className="absolute left-1/2 -translate-x-1/2 -top-2 z-10 w-7 h-7 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={className}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {canScrollDown && (
        <button
          onClick={(e) => scroll('down', e)}
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 z-10 w-7 h-7 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover/scroll:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

function YesNoOutcomes({
  market,
  tradeSelection,
  tradeSide,
  onTradeSelect,
}: {
  market: YesNoMarketDetail
  tradeSelection: TradeSelection | null
  tradeSide: TradeSide
  onTradeSelect?: (selection: TradeSelection) => void
}) {
  const isSell = tradeSide === 'sell'
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
          {isSell ? 'Sell Yes' : 'Yes'}
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {formatNullablePrice(market.priceAuthority, market.currentOdds.yes)}
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
          {isSell ? 'Sell No' : 'No'}
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {formatNullablePrice(market.priceAuthority, market.currentOdds.no)}
        </div>
      </button>
    </div>
  )
}

function CategoricalOutcomes({
  market,
  tradeSelection,
  tradeSide,
  onTradeSelect,
}: {
  market: CategoricalMarketDetail
  tradeSelection: TradeSelection | null
  tradeSide: TradeSide
  onTradeSelect?: (selection: TradeSelection) => void
}) {
  const isSell = tradeSide === 'sell'
  return (
    <ScrollableContainer className="space-y-2 max-h-64 overflow-y-auto pr-1 scrollbar-hide">
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
                {formatNullablePrice(market.priceAuthority, outcome.odds)}
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
                {isSell ? 'Sell Yes' : 'Buy Yes'}
              </button>
              <button
                onClick={() => onTradeSelect?.({ side: 'no', outcomeId: outcome.id })}
                className={`py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                  isSelected && tradeSelection?.side === 'no'
                    ? 'bg-red-500 text-white'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20'
                }`}
              >
                {isSell ? 'Sell No' : 'Buy No'}
              </button>
            </div>
          </div>
        )
      })}
    </ScrollableContainer>
  )
}

function TradeRouteTabs({
  tradeTab,
  onSelect,
}: {
  tradeTab: TradeTab
  onSelect: (tab: TradeTab) => void
}) {
  return (
    <div role="tablist" aria-label="Trade route" className="grid grid-cols-3 mb-3">
      {TRADE_ROUTES.map((route) => (
        <button
          key={route.id}
          type="button"
          role="tab"
          aria-selected={tradeTab === route.id}
          onClick={() => onSelect(route.id)}
          className={`py-2.5 text-sm font-semibold transition-colors border-b-2 ${
            tradeTab === route.id
              ? 'text-slate-900 dark:text-white border-slate-900 dark:border-white'
              : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          {route.label}
        </button>
      ))}
    </div>
  )
}

function MarketLimitToggle({
  orderType,
  onOrderTypeChange,
}: {
  orderType: OrderType
  onOrderTypeChange?: (type: OrderType) => void
}) {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1 mb-4">
      <button
        onClick={() => onOrderTypeChange?.('market')}
        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
          orderType === 'market'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Market
      </button>
      <button
        onClick={() => onOrderTypeChange?.('limit')}
        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
          orderType === 'limit'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Limit
      </button>
    </div>
  )
}

function LimitPriceInput({
  limitPrice,
  baseUnit,
  onLimitPriceChange,
}: {
  limitPrice: number
  baseUnit: string
  onLimitPriceChange?: (price: number) => void
}) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">
        Limit Price
      </label>
      <div className="relative">
        <input
          type="number"
          value={limitPrice}
          onChange={(e) => {
            const val = Math.max(1, Number(e.target.value))
            onLimitPriceChange?.(val)
          }}
          min={1}
          className="w-full pr-14 pl-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
          {baseUnit}
        </span>
      </div>
    </div>
  )
}

function LimitOrderPreviewSection({
  preview,
  feePercent,
  baseUnit,
}: {
  preview: LimitOrderPreview
  feePercent: number
  baseUnit: string
}) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 space-y-2 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">Limit price</span>
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {preview.limitPrice.toLocaleString()} {baseUnit}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">Shares if filled</span>
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {preview.sharesIfFilled.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">Creator fee ({feePercent}%)</span>
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {formatBtc(preview.creatorFee)}
        </span>
      </div>
      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
        <span className="text-slate-700 dark:text-slate-300 font-medium">Total cost</span>
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {formatBtc(preview.totalCost)}
        </span>
      </div>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 pt-1">
        Order will fill when market price reaches your specified level
      </p>
    </div>
  )
}

export function TradingPanel({
  market,
  tradeSelection,
  tradeAmount,
  tradePreview,
  tradeSide,
  tradeTab,
  hasExecutableLiquidity = true,
  orderType,
  limitOrderPreview,
  limitPrice = 50,
  onTradeSelect,
  onTradeClear,
  onAmountChange,
  onTradeConfirm,
  onCommentPost,
  userHoldings,
  onTradeSideChange,
  onTradeTabChange,
  onFundingComplete,
  onOrderTypeChange,
  onLimitPriceChange,
}: TradingPanelProps) {
  const [tradeComment, setTradeComment] = useState('')
  // Uncontrolled fallback. BUY and SELL follow `tradeSide`; only LIQUIDITY is
  // held locally, so no effect has to mirror a prop into state.
  const [liquiditySelected, setLiquiditySelected] = useState(false)
  const activeTab: TradeTab = tradeTab ?? (liquiditySelected ? 'liquidity' : tradeSide)
  const activeTradeSide: TradeSide = activeTab === 'sell' ? 'sell' : 'buy'
  const isSell = activeTradeSide === 'sell'
  const isLimit = orderType === 'limit'
  const baseUnit = market.baseUnit ?? 'sats'

  const selectTradeTab = (tab: TradeTab) => {
    setLiquiditySelected(tab === 'liquidity')
    onTradeTabChange?.(tab)
    if (tab !== 'liquidity') onTradeSideChange?.(tab)
  }

  // Build confirm button text
  const getConfirmText = () => {
    if (!tradeAmount || tradeAmount <= 0) return 'Enter amount'
    const sideLabel = tradeSelection?.side.toUpperCase() ?? ''
    const amountLabel = formatBtc(tradeAmount)

    if (isSell && isLimit) return `Place Sell Limit Order for ${amountLabel}`
    if (isSell) return `Sell ${sideLabel} for ${amountLabel}`
    if (isLimit) return `Place Limit Order for ${amountLabel}`
    return `Buy ${sideLabel} for ${amountLabel}`
  }

  return (
    <div data-trading-panel className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Trade
      </h3>

      {/* BUY / SELL / LIQUIDITY routes */}
      <TradeRouteTabs tradeTab={activeTab} onSelect={selectTradeTab} />

      {activeTab === 'liquidity' ? (
        /* LIQUIDITY reuses the durable funding handoff. Funding adds capacity
           only. It does not create an order, depth, or a confirmed price. */
        <PostCreateFundingHandoff
          marketId={market.id}
          context="liquidity"
          onComplete={onFundingComplete}
        />
      ) : !hasExecutableLiquidity ? (
        /* Empty book. The route carries guidance and one action, no order form. */
        <div className="space-y-3 py-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No executable liquidity is available for this route. Add liquidity to enable trading.
          </p>
          <button
            type="button"
            onClick={() => selectTradeTab('liquidity')}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            Liquidity
          </button>
        </div>
      ) : (
        <>
          {/* Market/Limit Sub-tabs */}
          <MarketLimitToggle orderType={orderType} onOrderTypeChange={onOrderTypeChange} />

          {/* Outcomes based on market type */}
          {market.type === 'yesno' && (
            <YesNoOutcomes
              market={market}
              tradeSelection={tradeSelection}
              tradeSide={activeTradeSide}
              onTradeSelect={onTradeSelect}
            />
          )}
          {market.type === 'categorical' && (
            <CategoricalOutcomes
              market={market}
              tradeSelection={tradeSelection}
              tradeSide={activeTradeSide}
              onTradeSelect={onTradeSelect}
            />
          )}
        </>
      )}

      {/* Trade Form (only on a route that has executable liquidity) */}
      {tradeSelection && activeTab !== 'liquidity' && hasExecutableLiquidity && (
        <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {isSell ? 'Shares to sell' : 'Amount (₿)'}
            </span>
            <button
              onClick={onTradeClear}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Balance hint when selling */}
          {isSell && userHoldings != null && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
              Balance: {userHoldings.toLocaleString()} shares
            </p>
          )}

          {/* Amount Input */}
          <div className="relative mb-3">
            {!isSell && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                ₿
              </span>
            )}
            <input
              type="number"
              value={tradeAmount || ''}
              onChange={(e) => onAmountChange?.(Number(e.target.value))}
              placeholder="0"
              className={`w-full ${isSell ? 'pl-4' : 'pl-8'} pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Quick Amount / Percentage Buttons */}
          <div className="flex gap-2 mb-4">
            {isSell ? (
              QUICK_SELL_PERCENTAGES.map((pct) => {
                const calculatedAmount = userHoldings ? Math.round(userHoldings * pct / 100) : 0
                return (
                  <button
                    key={pct}
                    onClick={() => onAmountChange?.(calculatedAmount)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                      tradeAmount === calculatedAmount && calculatedAmount > 0
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {pct}%
                  </button>
                )
              })
            ) : (
              QUICK_AMOUNTS.map((amount) => (
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
              ))
            )}
          </div>

          {/* Limit Price Input (shown for limit orders, below amount) */}
          {isLimit && (
            <LimitPriceInput
              limitPrice={limitPrice}
              baseUnit={baseUnit}
              onLimitPriceChange={onLimitPriceChange}
            />
          )}

          {/* Market Order Preview */}
          {!isLimit && tradePreview && tradeAmount > 0 && (
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
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {isSell ? 'Proceeds' : 'Potential payout'}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {formatBtc(isSell ? tradePreview.totalCost : tradePreview.potentialPayout)}
                </span>
              </div>
            </div>
          )}

          {/* Limit Order Preview */}
          {isLimit && limitOrderPreview && tradeAmount > 0 && (
            <LimitOrderPreviewSection
              preview={limitOrderPreview}
              feePercent={market.creator.feePercent}
              baseUnit={baseUnit}
            />
          )}

          {/* Optional Comment with Trade */}
          <div className="mb-4">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 block">
              Add a comment (optional)
            </label>
            <textarea
              value={tradeComment}
              onChange={(e) => setTradeComment(e.target.value.slice(0, 280))}
              placeholder="Share your reasoning..."
              rows={2}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="text-right text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              {tradeComment.length}/280
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={() => {
              onTradeConfirm?.()
              if (tradeComment.trim()) {
                onCommentPost?.(tradeComment.trim())
                setTradeComment('')
              }
            }}
            disabled={!tradeAmount || tradeAmount <= 0}
            className="w-full py-3 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white"
          >
            {getConfirmText()}
          </button>
        </div>
      )}
    </div>
  )
}
