import type { OrderHistoryItem } from '../types'
import { ExpandableSection } from './ExpandableSection'
import { OrderHistoryRow } from './OrderHistoryRow'

interface OrderHistorySectionProps {
  orders: OrderHistoryItem[]
  onViewOrder?: (orderId: string) => void
}

export function OrderHistorySection({ orders, onViewOrder }: OrderHistorySectionProps) {
  // Sort by date descending (most recent first)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <ExpandableSection
      title="Order History"
      badge={orders.length}
      defaultExpanded={false}
    >
      {sortedOrders.length > 0 ? (
        <div>
          {sortedOrders.map((order) => (
            <OrderHistoryRow
              key={order.id}
              order={order}
              onView={() => onViewOrder?.(order.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No transactions yet
          </p>
        </div>
      )}
    </ExpandableSection>
  )
}
