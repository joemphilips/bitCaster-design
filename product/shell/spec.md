# Application Shell Specification

## Overview
The bitCaster shell uses a streamlined top navigation pattern optimized for a Bitcoin-native prediction market platform. The design emphasizes clean trading interface aesthetics with a static brand motto image as the background.

## Navigation Structure
- **Markets** (with trading-graph icon) → Market Discovery & Trading (default home view)

## Header Elements (Non-Navigation)
Search Box: Inline search input for market discovery
Notification Bell: Bell icon with unread badge (bitcoin orange background, max "9+") for user notifications (left of user menu)
User Menu: Dropdown with user avatar, name, balance, and menu items including CreatorPage (Sparkles icon), Portfolio (Wallet icon), Settings (Gear icon), and Logout

## User Menu
Located in the top right corner of the header. Contains:
- User avatar
- User name
- Balance display (in sats)
- Dropdown menu with:
  - CreatorPage → Market creation tools (Sparkles icon)
  - Portfolio → Trading dashboard with positions, P/L, and activity (Wallet icon)
  - Settings → User preferences, currency, theme, mints (Gear icon)
  - Logout option

## Layout Pattern
Single top horizontal navigation bar with:
- Logo positioned on the left
- Markets navigation link (with trading-graph icon)
- Search box in center area
- Notification bell icon with unread badge (left of user menu)
- User menu in the far right corner
- Static brand motto image as page background

## Notification Badge
- Shows unread notification count
- Bitcoin orange (#f7931a) background with white text
- Displays numeric count up to 9, then "9+" for higher counts
- Hidden when count is zero

## Brand Motto Display
The motto "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE" appears as a static background image:
- Image file: `product/brand_motto.png`
- Fixed background positioning
- Subtle opacity to avoid interfering with content readability
- Always visible but unobtrusive

## Responsive Behavior

### Desktop
- Horizontal navigation bar at the top
- All elements visible: logo, Markets link with icon, search box, notification bell with badge, user menu
- Search box at comfortable width
- Background motto image at full scale

### Tablet
- Same structure as desktop
- More compact spacing between elements
- Slightly smaller text and icons
- Search box may be narrower

### Mobile (< 768px)
- Top header shows only logo (simplified)
- Bottom navigation bar with 5 items:
  1. **Markets** - TrendingUp icon with label
  2. **Search** - Search icon with label (opens search interface)
  3. **Notifications** - Bell icon with label (with unread badge, bitcoin orange background)
  4. **Creator** - Sparkles icon with label (opens creator page)
  5. **User** - User avatar/icon with label → navigates to Portfolio
- Bottom bar fixed at bottom of viewport for easy thumb access
- All primary navigation accessible from bottom bar

## Design Notes
- Uses blue (primary), amber (secondary), and slate (neutral) color scheme
- Typography: Inter for heading and body text, JetBrains Mono for monospace elements (balance)
- Supports light and dark mode
- Single navigation pattern across all viewport sizes for consistency
- TrendingUp icon (lucide-react) for Markets
- Search icon (lucide-react) for search functionality
- Bell icon (lucide-react) for notifications
- Sparkles icon (lucide-react) for Creator
- Wallet icon (lucide-react) for Portfolio
- Settings/Gear icon (lucide-react) for Settings
