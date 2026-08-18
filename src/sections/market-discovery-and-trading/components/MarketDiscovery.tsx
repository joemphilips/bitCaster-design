import { useEffect, useRef, useState } from 'react'
import { Loader2, AlertCircle, RotateCcw } from 'lucide-react'
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
  onViewMarket,
  onLoadMore,
  backgroundDataLoad,
  lastUpdatedAt,
  onRefreshConditions,
  isRefreshing,
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
            lastUpdatedAt={lastUpdatedAt}
            isRefreshing={isRefreshing}
            onTagSelect={onTagSelect}
            onToggleFilters={() => setFiltersVisible(!filtersVisible)}
            onRefreshConditions={onRefreshConditions}
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

      {/* Background Data Loading Progress Bar */}
      {backgroundDataLoad && backgroundDataLoad.status === 'loading' && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-full bg-blue-500 dark:bg-blue-400 animate-[stripe_1s_linear_infinite] bg-[length:20px_20px] bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]" />
          </div>
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500 dark:text-blue-400" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Loading market data... ({backgroundDataLoad.conditionsLoaded} loaded)
            </span>
          </div>
        </div>
      )}

      {backgroundDataLoad && backgroundDataLoad.status === 'failed' && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-amber-50 dark:bg-amber-950/50 border-t border-amber-200 dark:border-amber-800/50 px-4 py-2 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span className="text-xs text-amber-700 dark:text-amber-300">
              Failed to load market data
            </span>
            <button
              onClick={() => onRefreshConditions?.()}
              className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
