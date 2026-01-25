import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const navigationItems = [
    { label: 'Markets', href: '/markets', isActive: true },
  ]

  const user = {
    name: 'Alex Morgan',
    avatarUrl: undefined,
    balance: 250000, // 250k sats
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => console.log('Navigate to:', href)}
      onLogout={() => console.log('Logout')}
      onSearchChange={(query) => console.log('Search query:', query)}
      onCreateClick={() => console.log('Create button clicked')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Market Discovery & Trading
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This is a preview of the redesigned bitCaster shell featuring:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 mb-6">
            <li>Trading-graph icon with Markets navigation</li>
            <li>Integrated search box for market discovery</li>
            <li>Notification bell icon for alerts</li>
            <li>User menu with CreatorPage, MyPage, and Logout options</li>
            <li>Static brand motto background image</li>
            <li>Single navigation bar across all viewports</li>
          </ul>
          <div className="space-y-4">
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400">
              Market Card Placeholder
            </div>
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400">
              Market Card Placeholder
            </div>
            <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400">
              Market Card Placeholder
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
