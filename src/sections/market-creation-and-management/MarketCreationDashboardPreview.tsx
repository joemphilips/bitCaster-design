import data from '@/../product/sections/market-creation-and-management/data.json'
import type { CreatorMarket, ActiveTab, TimeScale, ChartMode, WizardDraft } from '@/../product/sections/market-creation-and-management/types'
import { MarketCreationDashboard } from './components/MarketCreationDashboard'

export default function MarketCreationDashboardPreview() {
  return (
    <MarketCreationDashboard
      dashboardStats={data.dashboardStats}
      creatorMarkets={data.creatorMarkets as CreatorMarket[]}
      volumeChartData={data.volumeChartData}
      volumeByMarket={data.volumeByMarket}
      wizardDraft={data.wizardDraft as WizardDraft}
      categoryTags={data.categoryTags}
      pagination={data.pagination}
      activeTab={data.activeTab as ActiveTab}
      analyticsTimeScale={data.analyticsTimeScale as TimeScale}
      analyticsChartMode={data.analyticsChartMode as ChartMode}
      onViewDetails={(id) => console.log('View details:', id)}
      onTabChange={(tab) => console.log('Tab changed:', tab)}
      onCreateMarket={(draft) => console.log('Create market:', draft)}
      onCancelMarket={(id) => console.log('Cancel market:', id)}
      onClaimFees={(id) => console.log('Claim fees:', id)}
      onSaveDraft={(draft) => console.log('Save draft:', draft)}
      onDiscardDraft={() => console.log('Discard draft')}
      onTimeScaleChange={(scale) => console.log('Time scale:', scale)}
      onChartModeChange={(mode) => console.log('Chart mode:', mode)}
      onSelectMarketForChart={(id) => console.log('Select market for chart:', id)}
      onPageChange={(page) => console.log('Page changed:', page)}
      onPageSizeChange={(size) => console.log('Page size changed:', size)}
    />
  )
}
