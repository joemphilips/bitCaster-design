# Tailwind Color Configuration

## Color Choices

- **Primary:** `blue` — Used for buttons, links, key accents, active states
- **Secondary:** `amber` — Used for volume displays, tags, highlights, secondary elements
- **Neutral:** `slate` — Used for backgrounds, text, borders, cards
- **Accent:** Bitcoin orange `#f7931a` — Used for notification badges, brand elements

## Tailwind Config

Add to your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: '#f7931a',
        bg: {
          primary: '#0a0a0a',
        },
      },
    },
  },
}
```

## Usage Examples

Primary button: `bg-blue-600 hover:bg-blue-700 text-white`
Secondary badge: `bg-amber-100 text-amber-800` / dark: `bg-amber-500/10 text-amber-400`
Neutral text: `text-slate-600 dark:text-slate-400`
Card background: `bg-slate-800 border-slate-700`
Bitcoin accent: `bg-[#f7931a] text-white`
App background: `bg-[#0a0a0a]`
