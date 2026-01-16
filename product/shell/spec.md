# Application Shell Specification

## Overview
The bitCaster shell uses a streamlined top navigation pattern optimized for a Bitcoin-native prediction market platform. The design emphasizes clean trading interface aesthetics with a static brand motto image as the background.

## Navigation Structure
- **Markets** (with trading-graph icon) → Market Discovery & Trading (default home view)
- **Search Box** → Search markets functionality
- **Create Button** (primary button) → Market Creation & Management
- **User Menu** → Contains MyPage and Logout

## User Menu
Located in the top right corner of the header. Contains:
- User avatar
- User name
- Balance display (in sats)
- Dropdown menu with:
  - MyPage → Personal dashboard with Bitcoin wallet
  - Logout option

## Layout Pattern
Single top horizontal navigation bar with:
- Logo positioned on the left
- Markets navigation link (with trading-graph icon)
- Search box in center area
- Create button (primary styled) before user menu
- User menu in the far right corner
- Static brand motto image as page background

## Brand Motto Display
The motto "FINANCE WANTS TO BE FREE | FAKE MUST BE EXPENSIVE" appears as a static background image:
- Image file: `product/brand_motto.png`
- Fixed background positioning
- Subtle opacity to avoid interfering with content readability
- Always visible but unobtrusive

## Responsive Behavior

### Desktop
- Horizontal navigation bar at the top
- All elements visible: logo, Markets link with icon, search box, Create button, user menu
- Search box at comfortable width
- Background motto image at full scale

### Tablet
- Same structure as desktop
- More compact spacing between elements
- Slightly smaller text and icons
- Search box may be narrower

### Mobile (< 768px)
- Top header shows only logo (simplified)
- Bottom navigation bar with 4 items:
  1. **Markets** - Trading-graph icon with label
  2. **Search** - Search icon with label (opens search interface)
  3. **Create** - Plus icon with label (primary action)
  4. **User** - User avatar/icon with label (opens user menu)
- Bottom bar fixed at bottom of viewport for easy thumb access
- All primary navigation accessible from bottom bar

## Design Notes
- Uses blue (primary), amber (secondary), and slate (neutral) color scheme
- Typography: Inter for heading and body text, JetBrains Mono for monospace elements (balance)
- Supports light and dark mode
- Single navigation pattern across all viewport sizes for consistency
- Trading-graph icon (TrendingUp from lucide-react) for Markets
- Search icon (Search from lucide-react) for search functionality
