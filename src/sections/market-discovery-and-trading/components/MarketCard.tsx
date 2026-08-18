import React, { useRef, useState, useEffect } from 'react'
import { Users, Droplet, ChevronUp, ChevronDown, Heart } from 'lucide-react'
import type { Market, Outcome } from '@/../product/sections/market-discovery-and-trading/types'
import { formatBtc } from '@/lib/format'

interface MarketCardProps {
  market: Market
  onViewMarket?: (marketId: string) => void
  onLike?: (marketId: string) => void
}

function formatPrice(market: Market, price: number | null): string {
  if (market.priceAuthority.state === 'unavailable') return 'Price unavailable'
  if (price == null || market.priceAuthority.state === 'no-trades') return 'No trades yet'
  return `${price.toFixed(1)}%`
}

function CategoricalOutcomes({
  market,
  onViewMarket,
}: {
  market: Extract<Market, { type: 'categorical' }>
  onViewMarket?: (marketId: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    setCanScrollUp(scrollTop > 2)
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 2)
  }

  useEffect(() => {
    checkScroll()
    const resizeObserver = new ResizeObserver(checkScroll)
    if (scrollRef.current) resizeObserver.observe(scrollRef.current)
    return () => resizeObserver.disconnect()
  }, [market.outcomes])

  const scroll = (direction: 'up' | 'down', event: React.MouseEvent) => {
    event.stopPropagation()
    scrollRef.current?.scrollBy({ top: direction === 'up' ? -100 : 100, behavior: 'smooth' })
  }

  return (
    <div className="relative group/outcomes flex-1 flex flex-col min-h-0">
      {canScrollUp && (
        <button type="button" aria-label="Scroll outcomes up" onClick={(event) => scroll('up', event)} className="absolute left-1/2 -translate-x-1/2 -top-2 z-10 w-7 h-7 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover/outcomes:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700">
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
      <div ref={scrollRef} onScroll={checkScroll} className="flex flex-col gap-2 overflow-y-auto flex-1 scrollbar-hide -mx-1 px-1 py-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {market.outcomes.map((outcome: Outcome) => (
          <div key={outcome.id} className="flex-shrink-0 bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate">{outcome.label}</div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 ml-2">{formatPrice(market, outcome.odds)}</div>
            </div>
            <div className="flex gap-1.5">
              <button type="button" onClick={(event) => { event.stopPropagation(); onViewMarket?.(market.id) }} className="flex-1 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 rounded text-emerald-600 dark:text-emerald-400 font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]">View BUY</button>
              <button type="button" onClick={(event) => { event.stopPropagation(); onViewMarket?.(market.id) }} className="flex-1 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 rounded text-rose-600 dark:text-rose-400 font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]">View SELL</button>
            </div>
          </div>
        ))}
      </div>
      {canScrollDown && (
        <button type="button" aria-label="Scroll outcomes down" onClick={(event) => scroll('down', event)} className="absolute left-1/2 -translate-x-1/2 -bottom-2 z-10 w-7 h-7 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 opacity-0 group-hover/outcomes:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700">
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export function MarketCard({ market, onViewMarket, onLike }: MarketCardProps) {
  const handleCardClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('button, input, a')) return
    onViewMarket?.(market.id)
  }

  return (
    <div onClick={handleCardClick} className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer p-4 min-h-[280px]">
      <div className="flex items-start gap-3 pb-2 flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm font-bold uppercase overflow-hidden">
          {market.imageUrl ? <img src={market.imageUrl} alt="" className="w-full h-full object-cover" loading="lazy" /> : market.title.slice(0, 1)}
        </div>
        <h3 className="flex-1 min-w-0 text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-2">{market.title}</h3>
      </div>

      {market.type === 'yesno' ? (
        <div className="flex-1 flex flex-col justify-end">
          <div className="flex items-center justify-center gap-2 py-2 flex-1">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Current price</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatPrice(market, market.currentOdds.yes)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 flex-shrink-0">
            <button type="button" onClick={(event) => { event.stopPropagation(); onViewMarket?.(market.id) }} className="py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm transition-all">View BUY</button>
            <button type="button" onClick={(event) => { event.stopPropagation(); onViewMarket?.(market.id) }} className="py-2.5 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white rounded-lg font-semibold text-sm transition-all">View SELL</button>
          </div>
        </div>
      ) : (
        <CategoricalOutcomes market={market} onViewMarket={onViewMarket} />
      )}

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1"><Droplet className="w-3.5 h-3.5 text-cyan-500" />{formatBtc(market.liquidity)}</span>
        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{market.traderCount.toLocaleString()}</span>
        <button type="button" aria-label="Like market" onClick={(event) => { event.stopPropagation(); onLike?.(market.id) }} className="flex items-center gap-1 hover:text-rose-500 transition-colors"><Heart className={`w-3.5 h-3.5 ${market.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />{market.likeCount}</button>
      </div>
    </div>
  )
}
