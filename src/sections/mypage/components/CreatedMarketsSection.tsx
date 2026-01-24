import type { CreatedMarket } from '@/../product/sections/mypage/types'
import { ExpandableSection } from './ExpandableSection'
import { CreatedMarketRow } from './CreatedMarketRow'

interface CreatedMarketsSectionProps {
  markets: CreatedMarket[]
  onViewMarket?: (marketId: string) => void
  onClaimCreatorFees?: (marketId: string) => void
}

export function CreatedMarketsSection({
  markets,
  onViewMarket,
  onClaimCreatorFees
}: CreatedMarketsSectionProps) {
  // Sort by created date descending (most recent first)
  const sortedMarkets = [...markets].sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  )

  return (
    <ExpandableSection
      title="My Markets"
      badge={markets.length}
      defaultExpanded={false}
    >
      {sortedMarkets.length > 0 ? (
        <div>
          {sortedMarkets.map((market) => (
            <CreatedMarketRow
              key={market.id}
              market={market}
              onView={() => onViewMarket?.(market.id)}
              onClaimFees={() => onClaimCreatorFees?.(market.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You haven't created any markets yet
          </p>
        </div>
      )}
    </ExpandableSection>
  )
}
