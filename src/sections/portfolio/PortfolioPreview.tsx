import { useState } from 'react'
import data from '@/../product/sections/portfolio/data.json'
import { Portfolio } from './components/Portfolio'
import type {
  PLTimeSelector,
  PortfolioProps,
  WalletState,
} from '@/../product/sections/portfolio/types'

export function PortfolioPreview() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<PLTimeSelector>(
    data.selectedTimeRange as PLTimeSelector
  )
  const [positionsTab, setPositionsTab] = useState<'active' | 'closed'>(
    data.positionsTab as 'active' | 'closed'
  )
  const [walletState, setWalletState] = useState<WalletState>(
    data.walletState as WalletState
  )

  const props: PortfolioProps = {
    walletState,
    baseCurrency: data.baseCurrency as PortfolioProps['baseCurrency'],
    selectedTimeRange,
    profile: data.profile as PortfolioProps['profile'],
    plChartData: data.plChartData as PortfolioProps['plChartData'],
    totalBalanceSats: data.totalBalanceSats,
    positions: data.positions as PortfolioProps['positions'],
    funds: data.funds as PortfolioProps['funds'],
    activity: data.activity as PortfolioProps['activity'],
    createdMarkets: data.createdMarkets as PortfolioProps['createdMarkets'],
    positionsTab,
    onGetStarted: () => {
      alert('Navigate to Wallet Setup')
    },
    onAvatarUpload: (file) => {
      console.log('Avatar upload:', file.name)
    },
    onTimeRangeChange: (range) => {
      console.log('Time range changed:', range)
      setSelectedTimeRange(range)
    },
    onDeposit: () => {
      console.log('Deposit clicked')
      alert('Deposit flow would open here')
    },
    onWithdraw: () => {
      console.log('Withdraw clicked')
      alert('Withdraw flow would open here')
    },
    onSellPosition: (positionId) => {
      console.log('Sell position:', positionId)
      alert(`Sell position: ${positionId}`)
    },
    onViewPosition: (positionId) => {
      console.log('View position:', positionId)
    },
    onViewMarket: (marketId) => {
      console.log('View market:', marketId)
    },
    onViewActivity: (activityId) => {
      console.log('View activity:', activityId)
    },
    onViewFund: (fundId) => {
      console.log('View fund:', fundId)
    },
    onPositionsTabChange: (tab) => {
      console.log('Positions tab changed:', tab)
      setPositionsTab(tab)
    },
    onClaimCreatorFees: (marketId) => {
      console.log('Claim creator fees:', marketId)
      alert(`Claim fees for market: ${marketId}`)
    },
    onClaimPayout: (positionId) => {
      console.log('Claim payout:', positionId)
      alert(`Claim payout for position: ${positionId}`)
    },
    onOpenSettings: () => {
      console.log('Open settings')
    },
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Preview Controls */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
              Preview:
            </span>
            <button
              onClick={() => {
                alert('Navigate to Wallet Setup')
                setWalletState('none')
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                walletState === 'none'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              No Wallet
            </button>
            <button
              onClick={() => setWalletState('ready')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                walletState === 'ready'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Full Dashboard
            </button>
          </div>
        </div>
      </div>

      <Portfolio {...props} />
    </div>
  )
}

export default PortfolioPreview
