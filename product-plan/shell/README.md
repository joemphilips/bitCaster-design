# Application Shell

The bitCaster shell uses a streamlined top navigation pattern optimized for a Bitcoin-native prediction market platform.

## Overview

The shell provides consistent navigation and layout across all pages with:
- Top navigation bar (desktop/tablet)
- Bottom navigation bar (mobile)
- Brand motto background image

## Navigation Structure

| Item | Route | Icon | Description |
|------|-------|------|-------------|
| Markets | `/markets` | TrendingUp | Market Discovery (default home) |
| Search | — | Search | Opens search interface (mobile) |
| Create | `/create` | Plus | Market Creation (primary CTA) |
| User Menu | — | User | Dropdown with MyPage, Logout |

## User Menu

Located in top right (desktop) or bottom nav (mobile):
- User avatar (with upload capability)
- Display name
- Balance in sats (amber colored, monospace)
- Dropdown: MyPage link, Logout

## Layout Pattern

### Desktop/Tablet
- Sticky top navigation bar
- Logo left, Markets link, search box center, Create button, user menu right
- Semi-transparent backdrop blur background
- Content area below navigation

### Mobile (< 768px)
- Simple top header with centered logo only
- Content area with bottom padding for nav bar
- Fixed bottom navigation with 4 items: Markets, Search, Create, User
- Search and User menu open as full-screen overlays

## Brand Motto

The motto "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE" appears as a subtle background:
- Very low opacity (3% light mode, 2% dark mode)
- Fixed positioning
- Does not interfere with content readability

## Components

### AppShell.tsx

Main layout wrapper. Props:

```typescript
interface AppShellProps {
  children: React.ReactNode
  navigationItems: Array<{ label: string; href: string; isActive?: boolean }>
  user?: { name: string; avatarUrl?: string; balance?: number }
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onSearchChange?: (query: string) => void
  onCreateClick?: () => void
}
```

### MainNav.tsx

Navigation with markets link and search box. Used within AppShell.

### UserMenu.tsx

User dropdown menu with avatar, balance, and menu items. Used within AppShell.

## Integration

```jsx
import { AppShell } from './shell/components/AppShell'

function App() {
  const user = { name: 'satoshi', balance: 125000 }

  return (
    <AppShell
      navigationItems={[
        { label: 'Markets', href: '/markets', isActive: true }
      ]}
      user={user}
      onNavigate={(href) => router.push(href)}
      onLogout={() => auth.logout()}
      onSearchChange={(query) => setSearchQuery(query)}
      onCreateClick={() => router.push('/create')}
    >
      <YourPageContent />
    </AppShell>
  )
}
```

## Styling

- Primary color: Blue (navigation, Create button)
- Secondary color: Amber (balance display)
- Neutral color: Slate (backgrounds, borders)
- Fonts: Inter (text), JetBrains Mono (balance)
- Supports light and dark mode
