# Milestone 1: Foundation

## Objective
Set up the project foundation including design tokens, routing, data model, and application shell.

## Prerequisites
- React project initialized
- Tailwind CSS installed
- TypeScript configured

## Reference Files
- `product-plan/design-system/tokens.css` — CSS custom properties
- `product-plan/design-system/tailwind-colors.md` — Tailwind color configuration
- `product-plan/design-system/fonts.md` — Font setup instructions
- `product-plan/event-model/events.ts` — Domain event interfaces
- `product-plan/shell/components/` — Shell component implementations

---

## Tasks

### 1.1 Design System Setup

#### CSS Custom Properties
Copy the design tokens from `design-system/tokens.css` into your global CSS file. These define:
- Color palette (blue, amber, slate) for light and dark modes
- Typography scale
- Spacing and layout variables

#### Tailwind Configuration
Follow `design-system/tailwind-colors.md` to extend your `tailwind.config.js`:
```js
colors: {
  primary: { /* blue shades */ },
  secondary: { /* amber shades */ },
  neutral: { /* slate shades */ }
}
```

#### Fonts
Follow `design-system/fonts.md` to:
1. Add Google Fonts import for Inter and JetBrains Mono
2. Configure `fontFamily` in Tailwind config
3. Use Inter for headings and body, JetBrains Mono for numbers/balances

#### Dark Mode
- Configure Tailwind dark mode (class-based recommended)
- Implement toggle in UI (can be in UserMenu)
- Tokens already include dark mode variants

### 1.2 Data Model

Review `event-model/events.ts` for domain concepts. Define TypeScript interfaces:

```typescript
// Core entities
interface User {
  id: string
  name: string
  avatarUrl?: string
  balance: number // in sats
}

interface Market {
  id: string
  title: string
  type: 'yesno' | 'categorical' | 'twodimensional'
  imageUrl?: string
  currentOdds: number | Record<string, number>
  volume: number
  liquidity: number
  traderCount: number
  closingDate: string
  status: 'open' | 'pending_resolution' | 'resolved'
  // ... additional fields per market type
}

interface Position {
  marketId: string
  marketTitle: string
  side: 'yes' | 'no'
  shares: number
  avgPrice: number
  currentValue: number
  pnl: number
}

interface Order {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  timestamp: string
  status: 'pending' | 'completed' | 'failed'
  txId?: string
  lightningInvoice?: string
}
```

#### Data Layer Options
Choose based on your needs:
- **Mock data**: Use sample JSON files from each section
- **LocalStorage**: Persist state between sessions
- **API client**: Connect to a backend service

### 1.3 Routing

Configure your router with these routes:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | MarketDiscovery | Home page, market browsing |
| `/create` | MarketCreation | Creator dashboard |
| `/mypage` | MyPage | Personal dashboard |
| `/market/:id` | MarketDetail | Single market view |

### 1.4 Application Shell

Implement the shell components from `shell/components/`:

#### AppShell.tsx
- Wraps all pages
- Renders MainNav at top
- Handles mobile bottom navigation
- Includes brand motto background image

#### MainNav.tsx
- Logo on left
- "Markets" link with TrendingUp icon
- Search input (center)
- User menu (right)
- Responsive: collapses on mobile

#### UserMenu.tsx
- User avatar thumbnail
- Balance display (₿ format)
- Dropdown with: CreatorPage (Sparkles), MyPage, Logout

#### Mobile Bottom Navigation
On viewports < 768px:
1. Markets (TrendingUp icon)
2. Search (Search icon)
3. Creator (Sparkles icon)
4. User (User icon)

---

## Deliverables Checklist

- [ ] Design tokens applied globally
- [ ] Tailwind extended with blue/amber/slate colors
- [ ] Inter and JetBrains Mono fonts loading
- [ ] Dark mode toggle functional
- [ ] TypeScript interfaces for User, Market, Position, Order
- [ ] Data layer initialized (mock or API)
- [ ] Routes configured and navigable
- [ ] AppShell renders on all pages
- [ ] MainNav visible on desktop/tablet
- [ ] Mobile bottom navigation visible on small screens
- [ ] UserMenu dropdown working
- [ ] Brand motto background visible

---

## Next Steps

After completing Foundation, proceed to:
→ `02-market-discovery-and-trading.md`
