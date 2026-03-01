# Application Shell

## Overview
The bitCaster shell uses a streamlined top navigation pattern optimized for a Bitcoin-native prediction market platform. Dark theme with a static brand motto image as background.

## Navigation Structure
- **Markets** (TrendingUp icon) → Market Discovery & Trading (default home view)
- **Search** — inline input on desktop, full interface on mobile
- **Notifications** — Bell icon with unread badge (bitcoin orange #f7931a)
- **User Menu** — dropdown with CreatorPage, Portfolio, Settings, Logout

## Desktop Layout
Single horizontal nav bar: Logo → Markets link → Search box → Notification bell → User menu

## Mobile Layout (< 768px)
- Top: simplified logo
- Bottom: fixed navigation bar with 5 items: Markets, Search, Notifications, Creator, User

## Components Provided
- `AppShell.tsx` — Main layout wrapper
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu dropdown

## Design Notes
- Default dark theme (slate-900/950 backgrounds)
- Blue primary, amber secondary, slate neutral
- Inter font for text, JetBrains Mono for amounts
- Brand motto PNG as fixed background
