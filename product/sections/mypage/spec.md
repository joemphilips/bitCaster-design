# MyPage Specification

## Overview
Personal dashboard where users view their trading positions, transaction history, and created markets. Features a profile header with avatar and profit/loss summary, with expandable sections for detailed lists.

## User Flows
- View profile header with avatar and total P/L across time scales (24h, 7d, 30d, All-time)
- Upload/change avatar by clicking the avatar image
- Browse positions in two tabs: Active markets and Closed markets
- View position details: market title, shares owned, current value, P/L
- Sell a position using the "Sell" button on each position item
- View order history showing deposits/withdrawals with date, type, amount, TX ID, status, and Lightning invoice (if applicable)
- Browse list of markets the user has created

## UI Requirements
- Summary cards at top showing avatar and P/L metrics by time scale
- Expandable sections below for: Positions, Order History, My Markets
- Positions section has sub-tabs for Active vs Closed markets
- Each position row has a "Sell" button for quick action
- Avatar is clickable to upload a new PNG image
- Order history shows full transaction details including Lightning invoice when applicable

## Configuration
- shell: true
