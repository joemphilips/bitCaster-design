import type { PaginationState } from '../types'

interface PaginationProps {
  pagination: PaginationState
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function Pagination({ pagination, onPageChange, onPageSizeChange }: PaginationProps) {
  const { currentPage, pageSize, totalItems, totalPages } = pagination

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const delta = 1 // Number of pages to show on each side of current

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== 'ellipsis') {
        pages.push('ellipsis')
      }
    }

    return pages
  }

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>Showing {totalItems} {totalItems === 1 ? 'market' : 'markets'}</span>
      </div>
    )
  }

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Item count */}
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{startItem}</span> to{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{endItem}</span> of{' '}
        <span className="font-semibold text-slate-700 dark:text-slate-300">{totalItems}</span> markets
      </div>

      <div className="flex items-center gap-4">
        {/* Page size selector */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500 dark:text-slate-400">Show:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Page navigation */}
        <nav className="flex items-center gap-1">
          {/* Previous button */}
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((page, i) =>
            page === 'ellipsis' ? (
              <span
                key={`ellipsis-${i}`}
                className="flex h-9 w-9 items-center justify-center text-slate-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  page === currentPage
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next button */}
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  )
}
