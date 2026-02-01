# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Or import in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

## Font Stack

### Inter (Headings & Body Text)

Used for all headings, body text, and UI labels.

```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Weights used:**
- `400` — Regular (body text)
- `500` — Medium (labels, small headings)
- `600` — Semi-bold (buttons, navigation)
- `700` — Bold (headings, important text)

### JetBrains Mono (Monospace)

Used for numeric values, ₿ amounts, transaction IDs, and code.

```css
font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
```

**Weights used:**
- `400` — Regular
- `500` — Medium
- `600` — Semi-bold
- `700` — Bold (large amounts)

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    },
  },
}
```

## Usage Examples

### Headings

```jsx
// Page title
<h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
  Your Markets
</h1>

// Section title
<h2 className="text-lg font-semibold text-slate-900 dark:text-white">
  Positions
</h2>

// Card title
<h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
  Market Title Here
</h3>
```

### Body Text

```jsx
// Regular text
<p className="text-slate-600 dark:text-slate-400">
  Description text here
</p>

// Small/helper text
<p className="text-sm text-slate-500 dark:text-slate-400">
  Helper text
</p>

// Extra small (labels, badges)
<span className="text-xs font-medium uppercase tracking-wider text-slate-500">
  LABEL
</span>
```

### Monospace (Numbers & Values)

```jsx
// Large amount
<span className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
  125,000
</span>

// Inline amount
<span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
  ₿12,500
</span>

// Percentage
<span className="font-mono text-sm">
  65.5%
</span>

// Transaction ID
<code className="font-mono text-sm text-slate-600 dark:text-slate-400">
  abc123...xyz789
</code>
```

## Responsive Typography

The design uses responsive font sizes on some elements:

```jsx
// Page title: smaller on mobile
<h1 className="text-2xl sm:text-3xl font-bold">

// Card title: slightly smaller on mobile
<h3 className="text-sm sm:text-base font-bold">
```
