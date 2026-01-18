import { useState } from 'react'
import data from '@/../product/sections/market-discovery-trading/data.json'
import { MarketDiscovery } from './components/MarketDiscovery'
import type { FilterState } from '@/../product/sections/market-discovery-trading/types'

export default function MarketDiscoveryPreview() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategoryTags: [],
    selectedMetaTags: ['popular'],
    marketTypes: [],
    volumeRange: {},
    closingInDays: undefined,
  })

  return (
    <MarketDiscovery
      metaTags={data.metaTags}
      categoryTags={data.categoryTags}
      markets={data.markets}
      filters={filters}
      onSearch={(query) => {
        console.log('Search:', query)
        setFilters({ ...filters, searchQuery: query })
      }}
      onMetaTagToggle={(tagId) => {
        console.log('Meta tag toggle:', tagId)
        const newTags = filters.selectedMetaTags.includes(tagId)
          ? filters.selectedMetaTags.filter((t) => t !== tagId)
          : [...filters.selectedMetaTags, tagId]
        setFilters({ ...filters, selectedMetaTags: newTags })
      }}
      onCategoryTagToggle={(tagId) => {
        console.log('Category tag toggle:', tagId)
        const newTags = filters.selectedCategoryTags.includes(tagId)
          ? filters.selectedCategoryTags.filter((t) => t !== tagId)
          : [...filters.selectedCategoryTags, tagId]
        setFilters({ ...filters, selectedCategoryTags: newTags })
      }}
      onMarketTypeChange={(types) => {
        console.log('Market types:', types)
        setFilters({ ...filters, marketTypes: types })
      }}
      onVolumeRangeChange={(range) => {
        console.log('Volume range:', range)
        setFilters({ ...filters, volumeRange: range })
      }}
      onClosingDateChange={(days) => {
        console.log('Closing in days:', days)
        setFilters({ ...filters, closingInDays: days })
      }}
      onBuyYes={(marketId, amount) => console.log('Buy YES:', marketId, amount)}
      onBuyNo={(marketId, amount) => console.log('Buy NO:', marketId, amount)}
      onBuyOutcome={(marketId, outcomeId, amount) =>
        console.log('Buy outcome:', marketId, outcomeId, amount)
      }
      onViewMarket={(marketId) => console.log('View market:', marketId)}
      onLoadMore={() => console.log('Load more markets')}
    />
  )
}
