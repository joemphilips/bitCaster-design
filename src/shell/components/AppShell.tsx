interface AppShellProps {
  children: React.ReactNode
  navigationItems: Array<{ label: string; href: string; icon: React.ReactNode; isActive?: boolean }>
  user?: { name: string; avatarUrl?: string; isGuest?: boolean }
  walletBalance?: number
  onNavigate?: (href: string) => void
  onDeposit?: () => void
  onWithdraw?: () => void
  onLogout?: () => void
  onLogin?: () => void
}

export function AppShell({
  children,
  navigationItems,
  user,
  walletBalance,
  onNavigate,
  onDeposit,
  onWithdraw,
  onLogout,
  onLogin,
}: AppShellProps) {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">FreeCast</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate?.(item.href)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${item.isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {/* Wallet Balance */}
            {walletBalance !== undefined && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <span className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                  {walletBalance.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">sats</span>
              </div>
            )}

            {/* User Avatar/Guest */}
            {user?.isGuest ? (
              <button
                onClick={onLogin}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
              >
                Sign In
              </button>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium text-slate-900 dark:text-white">
                    {user?.name || 'User'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="py-1">
                    {onDeposit && (
                      <button
                        onClick={onDeposit}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        Deposit
                      </button>
                    )}
                    {onWithdraw && (
                      <button
                        onClick={onWithdraw}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        Withdraw
                      </button>
                    )}
                    <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                    {onLogout && (
                      <button
                        onClick={onLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-40">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={`
                flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg flex-1 max-w-[80px]
                ${item.isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400'
                }
              `}
            >
              <span className={item.isActive ? 'scale-110 transition-transform' : ''}>
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
