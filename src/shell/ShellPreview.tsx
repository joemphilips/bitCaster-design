import { TrendingUp, Wallet, User, Plus, ArrowLeftRight } from 'lucide-react'
import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    {
      label: 'Markets',
      href: '/markets',
      icon: <TrendingUp className="w-5 h-5" />,
      isActive: true,
    },
    {
      label: 'Wallet',
      href: '/wallet',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      label: 'Account',
      href: '/account',
      icon: <User className="w-5 h-5" />,
    },
    {
      label: 'Create',
      href: '/create',
      icon: <Plus className="w-5 h-5" />,
    },
    {
      label: 'Trade',
      href: '/trade',
      icon: <ArrowLeftRight className="w-5 h-5" />,
    },
  ]

  const user = {
    name: 'Satoshi',
    isGuest: false,
  }

  const walletBalance = 250000

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      walletBalance={walletBalance}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onDeposit={() => console.log('Deposit clicked')}
      onWithdraw={() => console.log('Withdraw clicked')}
      onLogout={() => console.log('Logout clicked')}
      onLogin={() => console.log('Login clicked')}
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Market Discovery & Trading
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Browse active prediction markets and execute trades using Cashu e-cash tokens
          </p>
        </div>

        {/* Sample Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Sample Market {i}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Will this prediction come true by the deadline?
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mb-1">Current odds</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {45 + i * 5}%
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mottos Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-lg">
          <div className="bg-amber-100 dark:bg-amber-950 p-12 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 dark:text-amber-100 text-center leading-tight">
              FINANCE WANTS TO BE FREE
            </h2>
          </div>
          <div className="bg-slate-900 dark:bg-slate-950 p-12 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center leading-tight">
              FAKE MUST BE EXPENSIVE
            </h2>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
