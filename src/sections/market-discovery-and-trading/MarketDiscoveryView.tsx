import { useState } from 'react'
import data from '@/../product/sections/market-discovery-and-trading/data.json'
import { MarketDiscovery } from './components/MarketDiscovery'
import type { Market } from '@/../product/sections/market-discovery-and-trading/types'
import type { BackgroundDataLoad } from '@/../product/sections/wallet-setup/types'

export default function MarketDiscoveryPreview() {
  const [selectedTag, setSelectedTag] = useState<string | null>('trending')
  const [searchQuery, setSearchQuery] = useState('')
  const [lastUpdatedAt, setLastUpdatedAt] = useState(data.lastUpdatedAt)
  const [isRefreshing, setIsRefreshing] = useState(data.isRefreshing)
  const [backgroundDataLoad, setBackgroundDataLoad] = useState<BackgroundDataLoad | undefined>(undefined)

  return (
    <div>
      {/* Preview Controls for BG Load */}
      <div className="sticky top-0 z-[60] bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
            BG Load:
          </span>
          {(['none', 'loading', 'loaded', 'failed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => {
                if (status === 'none') {
                  setBackgroundDataLoad(undefined)
                } else {
                  setBackgroundDataLoad({
                    mintUrl: 'http://localhost:3338',
                    status,
                    conditionsLoaded: status === 'loaded' ? 10 : 3,
                  })
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                (status === 'none' && !backgroundDataLoad) || backgroundDataLoad?.status === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <MarketDiscovery
        metaTags={data.metaTags}
        categoryTags={data.categoryTags}
        markets={data.markets as Market[]}
        selectedTag={selectedTag}
        searchQuery={searchQuery}
        lastUpdatedAt={lastUpdatedAt}
        isRefreshing={isRefreshing}
        backgroundDataLoad={backgroundDataLoad}
        onSearch={(query) => {
          console.log('Search:', query)
          setSearchQuery(query)
        }}
        onTagSelect={(tagId) => {
          console.log('Tag selected:', tagId)
          setSelectedTag(tagId)
        }}
        onMarketTypeChange={(types) => {
          console.log('Market types:', types)
        }}
        onVolumeRangeChange={(range) => {
          console.log('Volume range:', range)
        }}
        onClosingDateChange={(days) => {
          console.log('Closing in days:', days)
        }}
        onViewMarket={(marketId) => console.log('View market:', marketId)}
        onLoadMore={() => console.log('Load more markets')}
        onRefreshConditions={() => {
          console.log('Refresh conditions')
          setIsRefreshing(true)
          setTimeout(() => {
            setIsRefreshing(false)
            setLastUpdatedAt(new Date().toISOString())
          }, 2000)
        }}
      />
    </div>
  )
}
