import { useState } from 'react'
import data from '@/../product/sections/mypage/data.json'
import { MyPage } from './components/MyPage'
import type { MyPageProps } from '@/../product/sections/mypage/types'

export default function MyPagePreview() {
  const [positionsTab, setPositionsTab] = useState<'active' | 'closed'>(
    data.positionsTab as 'active' | 'closed'
  )

  return (
    <MyPage
      profile={data.profile as MyPageProps['profile']}
      plSummary={data.plSummary as MyPageProps['plSummary']}
      positions={data.positions as MyPageProps['positions']}
      orderHistory={data.orderHistory as MyPageProps['orderHistory']}
      createdMarkets={data.createdMarkets as MyPageProps['createdMarkets']}
      positionsTab={positionsTab}
      onAvatarUpload={(file) => console.log('Avatar upload:', file.name)}
      onSellPosition={(id) => console.log('Sell position:', id)}
      onViewPosition={(id) => console.log('View position:', id)}
      onViewMarket={(id) => console.log('View market:', id)}
      onViewOrder={(id) => console.log('View order:', id)}
      onPositionsTabChange={setPositionsTab}
      onClaimCreatorFees={(id) => console.log('Claim creator fees:', id)}
      onClaimPayout={(id) => console.log('Claim payout:', id)}
    />
  )
}
