# Data Shape

Core entities that describe the bitCaster domain. Each entity maps to TypeScript interfaces defined in the corresponding section's `types.ts`.

---

## Market

A prediction market with outcomes, odds, and resolution criteria.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| title | string | Market question |
| type | `yesno` \| `categorical` \| `twodimensional` | Outcome structure |
| imageUrl | string | Thumbnail image |
| categoryTags | string[] | Category labels |
| metaTags | string[] | Meta labels (Trending, Popular, New) |
| volume | number | Total traded volume in sats |
| liquidity | number | Current liquidity in sats |
| traderCount | number | Number of unique traders |
| closingDate | string | When trading closes (ISO 8601) |
| createdDate | string | When the market was created |
| activeSince | string | When the market became active |
| creatorFeePercent | number | Fee taken by the market creator |
| baseMarket | string | `"sats"` for base markets, or a Market ID for 2D markets |

**Source:** `market-discovery-and-trading/types.ts` (BaseMarket, YesNoMarket, CategoricalMarket, TwoDimensionalMarket)

---

## Outcome

A possible result within a market (Yes/No or categorical).

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| label | string | Display name (e.g. "Yes", "No", "Trump") |
| odds | number | Current odds (0–100) |

**Source:** `market-discovery-and-trading/types.ts` (Outcome)

---

## Position

A user's stake on a specific outcome — shares held, entry price, and current P/L.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| marketId | string | Market this position belongs to |
| marketTitle | string | Market question (denormalized for display) |
| side | `yes` \| `no` | Which side the user holds |
| outcomeId | string? | Outcome ID (categorical markets) |
| outcomeLabel | string? | Outcome label (categorical markets) |
| shares | number | Number of shares held |
| avgBuyPrice | number | Average entry price |
| currentPrice | number | Current market price |
| currentValueSats | number | Current value in sats |
| profitLossSats | number | Unrealised P/L in sats |
| profitLossPercent | number | Unrealised P/L as percentage |
| status | `active` \| `closed` | Whether the position is still open |
| acquiredDate | string | When the position was opened |
| mintUrl | string | Mint that issued the conditional tokens |

**Source:** `portfolio/types.ts` (Position)

---

## Order

A buy or sell order placed on the order book (market or limit).

| Field | Type | Description |
|---|---|---|
| price | number | Price level (0–100) |
| amount | number | Size in sats |
| total | number | Cumulative amount at this price level |

**Source:** `market-detail/types.ts` (Order, OrderBook)

---

## Trade

A completed transaction between a buyer and a seller.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| userId | string | Trader identifier |
| userDisplayName | string | Anonymised display name |
| side | `yes` \| `no` | Which side was traded |
| outcomeId | string? | Outcome ID (categorical markets) |
| cellId | string? | Cell ID (2D markets) |
| amount | number | Size in sats |
| price | number | Execution price (0–100) |
| timestamp | string | When the trade occurred |

**Source:** `market-detail/types.ts` (Trade)

---

## Fund

Base ecash balance held in the wallet — not locked to any market outcome.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| unit | `sats` \| `usd` | Token denomination |
| amount | number | Balance |
| mintUrl | string | Mint that issued the tokens |

**Source:** `portfolio/types.ts` (Fund)

---

## Activity

Ledger entry for deposits, withdrawals, buys, sells, and payouts.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| type | `deposit` \| `withdrawal` \| `buy` \| `sell` \| `payout_claimed` \| `creator_fee_claimed` | Kind of activity |
| amountSats | number | Amount in sats |
| date | string | When it occurred |
| status | `pending` \| `completed` \| `failed` | Current status |
| txId | string? | Lightning transaction ID |
| lightningInvoice | string? | Lightning invoice (if applicable) |
| marketId | string? | Related market (if applicable) |
| marketTitle | string? | Related market title |

**Source:** `portfolio/types.ts` (ActivityItem)

---

## Mint

A connected Cashu mint that holds ecash.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| name | string | Display name |
| url | string | Mint URL |
| balanceSats | number | User's balance at this mint |
| isDefault | boolean | Whether this is the default mint |
| connectionStatus | `connected` \| `disconnected` \| `error` | Current connection state |

**Source:** `deposit-withdraw/types.ts` (MintInfo), `settings/types.ts` (MintConfig)

---

## Oracle

A DLC oracle that announces events and attests outcomes via Nostr.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| eventId | string | Nostr event hex ID (kind 88) |
| oraclePubkey | string | Oracle's Nostr public key |
| description | string | Event description |
| resolutionDate | string | Expected resolution date (ISO 8601) |
| outcomes | string[] | Possible outcome labels |

**Source:** `market-creation/types.ts` (OracleAnnouncement)

---

## Comment

A user comment on a market.

| Field | Type | Description |
|---|---|---|
| id | string | Unique identifier |
| userId | string | Commenter identifier |
| userDisplayName | string | Display name |
| userAvatarUrl | string? | Avatar URL |
| content | string | Comment text |
| timestamp | string | When it was posted |
| likeCount | number | Number of likes |
| isLiked | boolean | Whether current user liked it |

**Source:** `market-detail/types.ts` (Comment)

---

## Relationships

```
Market ──1:N──▸ Outcome
Market ──1:N──▸ Order       (via OrderBook)
Market ──1:N──▸ Trade
Market ──1:N──▸ Comment
Outcome ──1:N──▸ Position
Position ──N:1──▸ Market
Position ──N:1──▸ Outcome
Order ──N:1──▸ Market
Trade ──N:1──▸ Market
Fund ──N:1──▸ Mint
Activity ──N:1──▸ Market    (optional)
Activity ──N:1──▸ Position  (optional)
```
