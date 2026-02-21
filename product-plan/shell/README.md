# Application Shell

## Overview
The bitCaster shell uses a streamlined top navigation pattern optimized for a Bitcoin-native prediction market platform. The design features a single top bar with logo, Markets link, search, notification bell, and user menu.

## Components

- `AppShell.tsx` — Main layout wrapper with top navigation bar and content area
- `MainNav.tsx` — Top navigation with logo, Markets link, search box, notification bell
- `UserMenu.tsx` — User dropdown with avatar, name, balance, and menu items (Creator, Portfolio, Settings, Logout)

## Responsive Behavior

### Desktop
- Horizontal top bar with all elements visible
- Logo, Markets link, search box, notification bell, user menu

### Mobile (< 768px)
- Simplified top header with logo
- Bottom navigation bar with 5 items: Markets, Search, Notifications, Creator, User

## Navigation Structure
- **Markets** (TrendingUp icon) — Market Discovery & Trading (default home)
- **Search** — Inline search for markets
- **Notifications** — Bell icon with unread badge (bitcoin orange)
- **Creator** (Sparkles icon) — Market creation tools (via User Menu on desktop)
- **Portfolio** (Wallet icon) — Trading dashboard (via User Menu on desktop)
- **Settings** (Gear icon) — User preferences (via User Menu on desktop)

## Brand Motto
Background image displays "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE" at subtle opacity.
