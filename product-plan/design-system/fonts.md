# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Font Usage

- **Headings:** Inter (weight 600-700)
- **Body text:** Inter (weight 400-500)
- **Code/technical/amounts:** JetBrains Mono (weight 400-500) — used for sats balances, prices, order book values

## Tailwind Config

```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```
