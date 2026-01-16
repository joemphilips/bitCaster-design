# Market Discovery & Trading Specification

## Overview
Core marketplace where users browse prediction markets through a tag-based navigation system, filter and search markets, and execute quick trades directly from market cards. The page features a horizontal tag bar with meta tags (Trending, Popular, New) and category tags, a searchable and filterable market grid, and inline trading without leaving the discovery view.

## User Flows
- User lands on page and sees most popular markets by default
- User searches markets using search box or filters by tag selection
- User applies filters: Market Type (Yes/No, Categorical, TwoDimensional), Volume range, and Closing date
- User clicks Buy Yes/No on a market card → card transforms to show trade interface with × cancel button, predicted odds after purchase, amount picker, and BUY confirmation button
- User confirms trade or cancels with × button to return card to normal state
- User clicks anywhere else on market card → navigates to full market detail page
- User scrolls down → more markets load automatically (infinite scroll)

## UI Requirements
- Horizontal tag bar with two sections: left side shows meta tags (Trending, Popular, New), right side shows popular category tags
- Search box at top of page for keyword filtering
- Three filter controls: Market Type dropdown, Volume range (two dropdowns for min/max), Closing date slider ("Closing in X days")
- Market cards in responsive grid layout showing: market image, title/question, current odds percentage, Buy Yes/No action buttons, and metrics footer (volume, liquidity, trader count)
- Inline card transformation for quick trading: card flips to trade mode showing × button (top right), predicted odds, amount picker, and BUY button
- Infinite scroll loading for market list
- Market card click (outside action buttons) navigates to market detail page

## Configuration
- shell: true
