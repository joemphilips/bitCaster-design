import type { MarketCreationProps, ActiveTab } from '../types'
import { StatCard } from './StatCard'
import { MarketRow } from './MarketRow'
import { VolumeChart } from './VolumeChart'
import { Pagination } from './Pagination'

function formatSats(sats: number): string {
  const abs = Math.abs(sats)
  if (abs >= 1_000_000) return `₿${(sats / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `₿${(sats / 1_000).toFixed(1)}K`
  return `₿${sats.toLocaleString()}`
}

export function MarketCreationDashboard({
  dashboardStats,
  creatorMarkets,
  volumeChartData,
  volumeByMarket,
  wizardDraft,
  pagination,
  activeTab,
  analyticsTimeScale,
  analyticsChartMode,
  validationErrors,
  onViewDetails,
  onTabChange,
  onCreateMarket,
  onCancelMarket,
  onClaimFees,
  onSaveDraft,
  onDiscardDraft,
  onTimeScaleChange,
  onChartModeChange,
  onSelectMarketForChart,
  onPageChange,
  onPageSizeChange
}: MarketCreationProps) {
  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Your Markets
              </h1>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Create and manage your prediction markets
              </p>
            </div>

            {/* Add Market CTA Button */}
            <button
              onClick={() => onCreateMarket?.(wizardDraft!)}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="relative">Create Market</span>

              {/* Draft indicator */}
              {wizardDraft && (
                <span className="relative ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium">
                  Draft saved
                </span>
              )}
            </button>
          </div>

          {/* Validation errors banner */}
          {validationErrors && validationErrors.length > 0 && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-800 dark:bg-rose-950/50">
              <div className="flex gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-rose-800 dark:text-rose-300">
                    Please fix the following errors:
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-rose-700 dark:text-rose-400">
                    {validationErrors.map((error, i) => (
                      <li key={i}>
                        <span className="font-medium">{error.field}:</span> {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab navigation */}
        <div className="mb-6 flex items-center gap-1 rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all sm:flex-none ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard
                label="Active Markets"
                value={dashboardStats.activeMarketsCount}
                subValue="Currently trading"
                variant="success"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
              />
              <StatCard
                label="Resolved"
                value={dashboardStats.resolvedMarketsCount}
                subValue="Completed markets"
                variant="info"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatCard
                label="Total Volume"
                value={formatSats(dashboardStats.totalVolumeSats)}
                subValue="traded"
                variant="default"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              />
              <StatCard
                label="Fees Earned"
                value={`+${formatSats(dashboardStats.totalFeesEarnedSats)}`}
                subValue={dashboardStats.totalFeesUnclaimedSats > 0
                  ? `${formatSats(dashboardStats.totalFeesUnclaimedSats)} unclaimed`
                  : 'All claimed'
                }
                variant="success"
                icon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
            </div>

            {/* Additional stats for pending/rejected/cancelled */}
            {(dashboardStats.pendingMarketsCount > 0 || dashboardStats.rejectedMarketsCount > 0 || dashboardStats.cancelledMarketsCount > 0) && (
              <div className="flex flex-wrap gap-3">
                {dashboardStats.pendingMarketsCount > 0 && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    {dashboardStats.pendingMarketsCount} pending review
                  </div>
                )}
                {dashboardStats.rejectedMarketsCount > 0 && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 dark:bg-rose-900/40 dark:text-rose-400">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    {dashboardStats.rejectedMarketsCount} rejected
                  </div>
                )}
                {dashboardStats.cancelledMarketsCount > 0 && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    {dashboardStats.cancelledMarketsCount} cancelled
                  </div>
                )}
              </div>
            )}

            {/* Market list */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                Your Markets
              </h2>

              {creatorMarkets.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 p-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Create your first market
                  </h3>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Start earning fees by creating prediction markets for others to trade.
                  </p>
                  <button
                    onClick={() => onCreateMarket?.(wizardDraft!)}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Market
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {creatorMarkets.map((market) => (
                    <MarketRow
                      key={market.id}
                      market={market}
                      onViewDetails={() => onViewDetails?.(market.id)}
                      onClaimFees={() => onClaimFees?.(market.id)}
                      onCancelMarket={() => onCancelMarket?.(market.id)}
                    />
                  ))}

                  {/* Pagination */}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Pagination
                      pagination={pagination}
                      onPageChange={onPageChange}
                      onPageSizeChange={onPageSizeChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Draft recovery banner */}
            {wizardDraft && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/50">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                        Draft in progress
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        {wizardDraft.step1?.title || 'Untitled market'} • Step {wizardDraft.currentStep} of 5
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={onDiscardDraft}
                      className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    >
                      Discard
                    </button>
                    <button
                      onClick={() => onCreateMarket?.(wizardDraft)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-blue-700"
                    >
                      Continue Editing
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <VolumeChart
            volumeChartData={volumeChartData}
            volumeByMarket={volumeByMarket}
            timeScale={analyticsTimeScale}
            chartMode={analyticsChartMode}
            onTimeScaleChange={onTimeScaleChange}
            onChartModeChange={onChartModeChange}
            onSelectMarketForChart={onSelectMarketForChart}
          />
        )}
      </div>
    </div>
  )
}
