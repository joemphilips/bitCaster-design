import { useEffect, useRef, useState } from 'react'
import { TagBar } from './TagBar'
import { FilterControls } from './FilterControls'
import { MarketCard } from './MarketCard'
import type { MarketDiscoveryProps, MarketType, VolumeRange } from '@/../product/sections/market-discovery-and-trading/types'

export function MarketDiscovery({
  metaTags,
  categoryTags,
  markets,
  selectedTag,
  searchQuery: _searchQuery = '',
  onSearch: _onSearch,
  onTagSelect,
  onMarketTypeChange,
  onVolumeRangeChange,
  onClosingDateChange,
  onBuyYes,
  onBuyNo,
  onBuyOutcomeYes,
  onBuyOutcomeNo,
  onViewMarket,
  onLoadMore,
}: MarketDiscoveryProps) {
  const observerTarget = useRef<HTMLDivElement>(null)
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [selectedMarketTypes, setSelectedMarketTypes] = useState<MarketType[]>([])
  const [volumeRange, setVolumeRange] = useState<VolumeRange>({})
  const [closingInDays, setClosingInDays] = useState<number | undefined>(undefined)

  // Calculate active filter count
  const activeFilterCount = [
    selectedMarketTypes.length > 0 ? 1 : 0,
    volumeRange.min !== undefined ? 1 : 0,
    closingInDays !== undefined ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

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
      {/* Sticky Header: Tags */}
      <div className="sticky top-14 md:top-16 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <TagBar
            metaTags={metaTags}
            categoryTags={categoryTags}
            selectedTag={selectedTag}
            filtersVisible={filtersVisible}
            activeFilterCount={activeFilterCount}
            onTagSelect={onTagSelect}
            onToggleFilters={() => setFiltersVisible(!filtersVisible)}
          />
        </div>
      </div>

      {/* Filter Controls */}
      <FilterControls
        isVisible={filtersVisible}
        selectedMarketTypes={selectedMarketTypes}
        volumeRange={volumeRange}
        closingInDays={closingInDays}
        onMarketTypeChange={(types) => {
          setSelectedMarketTypes(types)
          onMarketTypeChange?.(types)
        }}
        onVolumeRangeChange={(range) => {
          setVolumeRange(range)
          onVolumeRangeChange?.(range)
        }}
        onClosingDateChange={(days) => {
          setClosingInDays(days)
          onClosingDateChange?.(days)
        }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
            {markets.map((market) => (
              <MarketCard
                key={market.id}
                market={market}
                onBuyYes={onBuyYes}
                onBuyNo={onBuyNo}
                onBuyOutcomeYes={onBuyOutcomeYes}
                onBuyOutcomeNo={onBuyOutcomeNo}
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
