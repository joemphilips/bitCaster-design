import type { Position } from '@/../product/sections/mypage/types'
import { ExpandableSection } from './ExpandableSection'
import { PositionRow } from './PositionRow'

interface PositionsSectionProps {
  positions: Position[]
  activeTab: 'active' | 'closed'
  onTabChange?: (tab: 'active' | 'closed') => void
  onViewPosition?: (positionId: string) => void
  onSellPosition?: (positionId: string) => void
  onClaimPayout?: (positionId: string) => void
}

export function PositionsSection({
  positions,
  activeTab,
  onTabChange,
  onViewPosition,
  onSellPosition,
  onClaimPayout
}: PositionsSectionProps) {
  const activePositions = positions.filter((p) => p.status === 'active')
  const closedPositions = positions.filter((p) => p.status === 'closed')
  const filteredPositions = activeTab === 'active' ? activePositions : closedPositions

  return (
    <ExpandableSection
      title="Positions"
      badge={positions.length}
    >
      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-100 px-4 pt-3 dark:border-slate-800">
        <button
          onClick={() => onTabChange?.('active')}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'active'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          Active
          <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
            {activePositions.length}
          </span>
          {activeTab === 'active' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>

        <button
          onClick={() => onTabChange?.('closed')}
          className={`relative px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'closed'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          Closed
          <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
            {closedPositions.length}
          </span>
          {activeTab === 'closed' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
      </div>

      {/* Position list */}
      <div>
        {filteredPositions.length > 0 ? (
          filteredPositions.map((position) => (
            <PositionRow
              key={position.id}
              position={position}
              onView={() => onViewPosition?.(position.id)}
              onSell={() => onSellPosition?.(position.id)}
              onClaimPayout={() => onClaimPayout?.(position.id)}
            />
          ))
        ) : (
          <div className="py-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {activeTab === 'active' ? 'No active positions' : 'No closed positions'}
            </p>
          </div>
        )}
      </div>
    </ExpandableSection>
  )
}
