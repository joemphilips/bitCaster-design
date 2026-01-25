interface StatCardProps {
  label: string
  value: string | number
  subValue?: string
  icon: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info'
}

export function StatCard({ label, value, subValue, icon, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'border-slate-200 dark:border-slate-700',
    success: 'border-emerald-200 dark:border-emerald-800',
    warning: 'border-amber-200 dark:border-amber-800',
    info: 'border-blue-200 dark:border-blue-800'
  }

  const iconBgStyles = {
    default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    success: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
    info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
  }

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm
        transition-all duration-200 hover:shadow-md
        dark:bg-slate-900 ${variantStyles[variant]}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-50/50 dark:to-slate-800/30" />

      <div className="relative flex items-start gap-3">
        <div className={`rounded-lg p-2.5 ${iconBgStyles[variant]}`}>
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
          {subValue && (
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {subValue}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
