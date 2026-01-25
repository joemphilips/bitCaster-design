# Tailwind Color Configuration

## Color Choices

- **Primary:** `blue` — Used for buttons, links, key accents, active states
- **Secondary:** `amber` — Used for meta tags (Trending/Popular/New), balance display, highlights
- **Neutral:** `slate` — Used for backgrounds, text, borders

## Tailwind Config Extension

If you need to extend Tailwind's default colors, here's the configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Using Tailwind's built-in blue, amber, and slate
        // No custom extensions needed - use the defaults
      },
    },
  },
}
```

## Usage Examples

### Primary (Blue)

```jsx
// Primary button
<button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
  Create Market
</button>

// Active navigation item
<span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
  Markets
</span>

// Links
<a className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
  View Details
</a>
```

### Secondary (Amber)

```jsx
// Meta tags (Trending, Popular, New)
<span className="bg-amber-500 dark:bg-amber-400 text-white">
  Trending
</span>

// Unselected meta tag
<span className="bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300">
  Popular
</span>

// Balance display
<span className="text-amber-600 dark:text-amber-400 font-mono">
  12,500 sats
</span>
```

### Neutral (Slate)

```jsx
// Page background
<div className="bg-slate-50 dark:bg-slate-950">

// Card background
<div className="bg-white dark:bg-slate-900">

// Border
<div className="border border-slate-200 dark:border-slate-800">

// Primary text
<p className="text-slate-900 dark:text-slate-100">

// Secondary text
<p className="text-slate-600 dark:text-slate-400">

// Muted text
<p className="text-slate-500 dark:text-slate-400">
```

### Semantic Colors

```jsx
// Success (Emerald) - Buy YES, positive P/L
<button className="bg-emerald-600 hover:bg-emerald-700 text-white">
  Buy YES
</button>
<span className="text-emerald-600 dark:text-emerald-400">+2,500 sats</span>

// Danger (Rose) - Buy NO, negative P/L, sell
<button className="bg-rose-600 hover:bg-rose-700 text-white">
  Buy NO
</button>
<span className="text-rose-600 dark:text-rose-400">-1,200 sats</span>

// Info (Blue) - Same as primary
<span className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
  Resolved
</span>
```

## Dark Mode

All components support dark mode using Tailwind's `dark:` variant. The design uses:

- Light mode: `slate-50` background, `white` cards
- Dark mode: `slate-950` background, `slate-900` cards

Enable dark mode in your Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' for system preference
}
```
