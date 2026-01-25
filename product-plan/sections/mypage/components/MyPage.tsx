import type { MyPageProps } from '../types'
import { ProfileHeader } from './ProfileHeader'
import { PositionsSection } from './PositionsSection'
import { OrderHistorySection } from './OrderHistorySection'
import { CreatedMarketsSection } from './CreatedMarketsSection'

export function MyPage({
  profile,
  plSummary,
  positions,
  orderHistory,
  createdMarkets,
  positionsTab,
  onAvatarUpload,
  onSellPosition,
  onViewPosition,
  onViewMarket,
  onViewOrder,
  onPositionsTabChange,
  onClaimCreatorFees,
  onClaimPayout
}: MyPageProps) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Profile header with avatar and P/L summary */}
        <ProfileHeader
          profile={profile}
          plSummary={plSummary}
          onAvatarUpload={onAvatarUpload}
        />

        {/* Expandable sections */}
        <div className="space-y-4">
          <PositionsSection
            positions={positions}
            activeTab={positionsTab}
            onTabChange={onPositionsTabChange}
            onViewPosition={onViewPosition}
            onSellPosition={onSellPosition}
            onClaimPayout={onClaimPayout}
          />

          <OrderHistorySection
            orders={orderHistory}
            onViewOrder={onViewOrder}
          />

          <CreatedMarketsSection
            markets={createdMarkets}
            onViewMarket={onViewMarket}
            onClaimCreatorFees={onClaimCreatorFees}
          />
        </div>
      </div>
    </div>
  )
}
