# Data Shape

Core entities that describe the bitCaster domain. Each entity maps to TypeScript interfaces defined in the corresponding section's `types.ts`.

---

## Condition

A prediction question with defined outcomes, registered on a NUT-CTF compliant mint. This is the protocol-level entity — all static market data comes from the mint's `GET /v1/conditions/{condition_id}` endpoint.

| Field | Type | Description |
|---|---|---|
| condition_id | hex string (32 bytes) | Unique identifier computed from oracle announcements (tagged hash) |
| threshold | number | Minimum oracles required for attestation (default: 1) |
| description | string | Human-readable condition description |
| announcements | hex string[] | DLC oracle announcement TLV bytes |
| keysets | Record<string, string> | Map of outcome collection → keyset ID |
| partitions | Partition[] | Registered partitions (see below) |
| attestation | Attestation? | Oracle attestation state (see below) |

### Partition (nested)

| Field | Type | Description |
|---|---|---|
| partition | string[] | Outcome collection grouping (e.g. `["YES", "NO"]`) |
| collateral | string | Unit string (`"sat"`) or parent outcome_collection_id |
| parent_collection_id | hex string | Parent collection for combinatorial markets (zero bytes for root) |

### Attestation (nested)

| Field | Type | Description |
|---|---|---|
| status | `pending` \| `attested` \| `expired` \| `violation` | Resolution state |
| winning_outcome | string? | Attested outcome (null if pending) |
| attested_at | number? | Unix timestamp of attestation (null if pending) |

**Source:** NUT-CTF spec `Condition Info` (`GET /v1/conditions/{condition_id}`)

---

## Market

A tradeable view of a Condition — combines protocol-level data from the mint with real-time trade data from the matching engine.

| Field | Type | Description |
|---|---|---|
| id | string | Display identifier (maps to `condition_id`) |
| condition | Condition | The underlying NUT-CTF condition (from mint) |
| type | `yesno` \| `categorical` | UI display type (derived from condition's outcomes) |
| imageUrl | string | Thumbnail image (matching engine metadata) |
| categoryTags | string[] | Category labels (matching engine metadata) |
| metaTags | string[] | Meta labels — Trending, Popular, New (matching engine) |
| volume | number | Total traded volume in sats (matching engine) |
| liquidity | number | Current liquidity in sats (matching engine) |
| traderCount | number | Number of unique traders (matching engine) |
| currentOdds | CurrentOdds | Live odds derived from order book (matching engine) |
| creatorFeePercent | number | Fee taken by the market creator |

> **Design principle:** Static data (description, outcomes, closing date, resolution) lives in the Condition and comes from the mint. The matching engine only provides real-time trade data (volume, liquidity, odds, trader count) and display metadata (image, tags). Keep the matching engine as thin as possible.

**Source:** `market-discovery-and-trading/types.ts` (BaseMarket), NUT-CTF `Condition Info`

---

## Outcome

A possible result within a condition. Maps to a NUT-CTF **outcome collection** — a single outcome or an OR-combination of outcomes that share a conditional keyset.

| Field | Type | Description |
|---|---|---|
| outcome_collection | string | Outcome collection string (e.g. `"YES"`, `"ALICE\|BOB"`) |
| outcome_collection_id | hex string | 32-byte unique identifier (from NUT-CTF) |
| keyset_id | string | Conditional keyset ID for this outcome collection |
| label | string | Display name (e.g. "Yes", "No", "Trump") |
| odds | number | Current odds (0–100, from matching engine) |

> **Note:** `outcome_collection`, `outcome_collection_id`, and `keyset_id` come from the mint (NUT-CTF). `label` is a display-friendly version of the outcome collection string. `odds` is real-time data from the matching engine.

**Source:** NUT-CTF spec (outcome collections, conditional keysets), `market-discovery-and-trading/types.ts` (Outcome)

---

## Position

A user's stake on a specific outcome — reconstructed from locally held Cashu conditional tokens and condition data from the mint.

Each Position maps 1:1 to a set of conditional ecash tokens the user holds for a given outcome collection. It is **not stored server-side** — the wallet reconstructs it by combining:
1. **Condition info** downloaded from the mint (`GET /v1/conditions/{condition_id}`)
2. **Ecash tokens** held locally in the wallet (conditional proofs signed under the outcome collection's keyset)

| Field | Type | Description |
|---|---|---|
| id | string | Derived identifier (e.g. `condition_id:outcome_collection_id`) |
| condition_id | hex string | The NUT-CTF condition this position belongs to |
| outcome_collection_id | hex string | The outcome collection the tokens are locked to |
| marketTitle | string | Market question (from condition description) |
| side | `yes` \| `no` | Which side the user holds |
| outcomeLabel | string? | Outcome label (categorical markets) |
| shares | number | Number of shares (sum of token amounts) |
| avgBuyPrice | number | Average entry price (tracked locally) |
| currentPrice | number | Current market price (from matching engine) |
| currentValueSats | number | Current value in sats |
| profitLossSats | number | Unrealised P/L in sats |
| profitLossPercent | number | Unrealised P/L as percentage |
| status | `active` \| `closed` | Whether the position is still open |
| acquiredDate | string | When the position was opened |
| mintUrl | string | Mint that issued the conditional tokens |

**Source:** `portfolio/types.ts` (Position), NUT-CTF conditional tokens

---

## Order

A buy or sell order placed on the order book.

| Field | Type | Description |
|---|---|---|
| kind | `market` \| `limit` | Order type |
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
Condition ──1:1──▸ Market         (each market wraps one condition)
Condition ──1:N──▸ Outcome        (outcome collections from partitions)
Market ──1:N──▸ Order             (via OrderBook, matching engine)
Market ──1:N──▸ Trade             (matching engine)
Market ──1:N──▸ Comment
Outcome ──1:N──▸ Position         (user holds tokens per outcome collection)
Position ──N:1──▸ Condition       (via condition_id)
Position ──N:1──▸ Outcome         (via outcome_collection_id)
Order ──N:1──▸ Market
Trade ──N:1──▸ Market
Fund ──N:1──▸ Mint
Activity ──N:1──▸ Market          (optional)
Activity ──N:1──▸ Position        (optional)
```
