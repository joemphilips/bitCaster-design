import { Search, Filter } from 'lucide-react'
import type { MarketType, VolumeRange } from '../types'

interface FilterControlsProps {
  searchQuery: string
  selectedMarketTypes: MarketType[]
  volumeRange: VolumeRange
  closingInDays?: number
  onSearch?: (query: string) => void
  onMarketTypeChange?: (types: MarketType[]) => void
  onVolumeRangeChange?: (range: VolumeRange) => void
  onClosingDateChange?: (days?: number) => void
}

const MARKET_TYPE_OPTIONS: { value: MarketType; label: string }[] = [
  { value: 'yesno', label: 'Yes/No' },
  { value: 'categorical', label: 'Categorical' },
  { value: 'twodimensional', label: 'Two-Dimensional' },
]

const VOLUME_OPTIONS = [
  { value: undefined, label: 'Any' },
  { value: 10000, label: '10K+' },
  { value: 100000, label: '100K+' },
  { value: 500000, label: '500K+' },
  { value: 1000000, label: '1M+' },
  { value: 5000000, label: '5M+' },
]

const CLOSING_DATE_OPTIONS = [
  { value: undefined, label: 'Any time' },
  { value: 7, label: 'Within 7 days' },
  { value: 30, label: 'Within 30 days' },
  { value: 90, label: 'Within 90 days' },
  { value: 180, label: 'Within 6 months' },
  { value: 365, label: 'Within 1 year' },
]

export function FilterControls({
  searchQuery,
  selectedMarketTypes,
  volumeRange,
  closingInDays,
  onSearch,
  onMarketTypeChange,
  onVolumeRangeChange,
  onClosingDateChange,
}: FilterControlsProps) {
  const handleMarketTypeToggle = (type: MarketType) => {
    const newTypes = selectedMarketTypes.includes(type)
      ? selectedMarketTypes.filter((t) => t !== type)
      : [...selectedMarketTypes, type]
    onMarketTypeChange?.(newTypes)
  }

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-[9.5rem] md:top-[9.5rem] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search markets by keyword..."
              className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-semibold">Filters:</span>
          </div>

          {/* Market Type Filter */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {MARKET_TYPE_OPTIONS.map((option) => {
              const isSelected = selectedMarketTypes.includes(option.value)
              return (
                <button
                  key={option.value}
                  onClick={() => handleMarketTypeToggle(option.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                      : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>

          {/* Volume Range Filter */}
          <select
            value={volumeRange.min || ''}
            onChange={(e) =>
              onVolumeRangeChange?.({
                ...volumeRange,
                min: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {VOLUME_OPTIONS.map((option) => (
              <option key={option.value || 'any'} value={option.value || ''}>
                Vol: {option.label}
              </option>
            ))}
          </select>

          {/* Closing Date Filter */}
          <select
            value={closingInDays || ''}
            onChange={(e) =>
              onClosingDateChange?.(e.target.value ? parseInt(e.target.value) : undefined)
            }
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {CLOSING_DATE_OPTIONS.map((option) => (
              <option key={option.value || 'any'} value={option.value || ''}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Active Filter Count */}
          {(selectedMarketTypes.length > 0 ||
            volumeRange.min !== undefined ||
            closingInDays !== undefined ||
            searchQuery.length > 0) && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {[
                  selectedMarketTypes.length > 0 ? 1 : 0,
                  volumeRange.min !== undefined ? 1 : 0,
                  closingInDays !== undefined ? 1 : 0,
                  searchQuery.length > 0 ? 1 : 0,
                ].reduce((a, b) => a + b, 0)}{' '}
                active
              </span>
              <button
                onClick={() => {
                  onSearch?.('')
                  onMarketTypeChange?.([])
                  onVolumeRangeChange?.({})
                  onClosingDateChange?.(undefined)
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
