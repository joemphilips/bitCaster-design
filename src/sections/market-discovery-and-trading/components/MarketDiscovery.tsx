import { useEffect, useRef } from 'react'
import { TagBar } from './TagBar'
import { FilterControls } from './FilterControls'
import { MarketCard } from './MarketCard'
import type { MarketDiscoveryProps } from '@/../product/sections/market-discovery-and-trading/types'

export function MarketDiscovery({
  metaTags,
  categoryTags,
  markets,
  filters,
  onSearch,
  onMetaTagToggle,
  onCategoryTagToggle,
  onMarketTypeChange,
  onVolumeRangeChange,
  onClosingDateChange,
  onBuyYes,
  onBuyNo,
  onBuyOutcome,
  onViewMarket,
  onLoadMore,
}: MarketDiscoveryProps) {
  const observerTarget = useRef<HTMLDivElement>(null)

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore?.()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [onLoadMore])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Tag Bar */}
      <TagBar
        metaTags={metaTags}
        categoryTags={categoryTags}
        selectedMetaTags={filters.selectedMetaTags}
        selectedCategoryTags={filters.selectedCategoryTags}
        onMetaTagToggle={onMetaTagToggle}
        onCategoryTagToggle={onCategoryTagToggle}
      />

      {/* Filter Controls */}
      <FilterControls
        searchQuery={filters.searchQuery}
        selectedMarketTypes={filters.marketTypes}
        volumeRange={filters.volumeRange}
        closingInDays={filters.closingInDays}
        onSearch={onSearch}
        onMarketTypeChange={onMarketTypeChange}
        onVolumeRangeChange={onVolumeRangeChange}
        onClosingDateChange={onClosingDateChange}
      />

      {/* Market Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {markets.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              No markets found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market) => (
              <MarketCard
                key={market.id}
                market={market}
                onBuyYes={onBuyYes}
                onBuyNo={onBuyNo}
                onBuyOutcome={onBuyOutcome}
                onViewMarket={onViewMarket}
              />
            ))}
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={observerTarget} className="h-20 flex items-center justify-center">
          {markets.length > 0 && (
            <div className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
              Loading more markets...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
