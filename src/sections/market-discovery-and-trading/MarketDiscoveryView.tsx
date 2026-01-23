import { useState } from 'react'
import data from '@/../product/sections/market-discovery-and-trading/data.json'
import { MarketDiscovery } from './components/MarketDiscovery'
import type { Market } from '@/../product/sections/market-discovery-and-trading/types'

export default function MarketDiscoveryPreview() {
  const [selectedTag, setSelectedTag] = useState<string | null>('trending')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <MarketDiscovery
      metaTags={data.metaTags}
      categoryTags={data.categoryTags}
      markets={data.markets as Market[]}
      selectedTag={selectedTag}
      searchQuery={searchQuery}
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
      onBuyYes={(marketId, amount) => console.log('Buy YES:', marketId, amount)}
      onBuyNo={(marketId, amount) => console.log('Buy NO:', marketId, amount)}
      onBuyOutcomeYes={(marketId, outcomeId, amount) =>
        console.log('Buy outcome YES:', marketId, outcomeId, amount)
      }
      onBuyOutcomeNo={(marketId, outcomeId, amount) =>
        console.log('Buy outcome NO:', marketId, outcomeId, amount)
      }
      onViewMarket={(marketId) => console.log('View market:', marketId)}
      onLoadMore={() => console.log('Load more markets')}
    />
  )
}
