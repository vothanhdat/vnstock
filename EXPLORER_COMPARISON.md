# Explorer & Connector Comparison

This document provides a detailed comparison of the features and fields supported by the different data providers (Explorers and Connectors) available in the `vnstock` library.

## Feature Support Matrix

| Feature Category | Feature | TCBS | VCI | MSN | FMarket | DNSE |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Market Data** | Historical Quote (OHLCV) | ✅ | ✅ | ✅ | ❌ | ❌ |
| | Intraday Quote | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Price Board (Real-time) | ✅ | ✅ | ❌ | ❌ | ❌ |
| | Crypto / Forex Data | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Company Info** | Company Profile | ✅ | ✅ | ❌ | ❌ | ❌ |
| | Shareholders | ✅ | ✅ | ❌ | ❌ | ❌ |
| | Subsidiaries | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Officers / Key People | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Financials** | Income Statement | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Balance Sheet | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Cash Flow | ✅ | ❌ | ❌ | ❌ | ❌ |
| | Financial Ratios | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Discovery** | Listing (All Symbols) | ⚠️ (Partial) | ✅ | ❌ | ❌ | ❌ |
| | Search Symbol | ❌ | ❌ | ✅ | ❌ | ❌ |
| | Screener | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Funds** | Fund Listing | ❌ | ❌ | ❌ | ✅ | ❌ |
| | Fund Details (NAV, Holdings) | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Trading** | Authentication | ❌ | ❌ | ❌ | ❌ | ✅ |
| | Place Order | ❌ | ❌ | ❌ | ❌ | ✅ |
| | Account Balance | ❌ | ❌ | ❌ | ❌ | ✅ |
| | Portfolio | ❌ | ❌ | ❌ | ❌ | ✅ |

> **Legend:**
> - ✅: Supported
> - ❌: Not Supported
> - ⚠️: Partially Supported / In Progress

---

## Detailed Field Support

### 1. Company Profile (`profile()`)

The `CompanyProfile` interface is standardized across providers (TCBS, VCI).

| Field | Type | TCBS | VCI | Description |
| :--- | :--- | :---: | :---: | :--- |
| `symbol` | `string` | ✅ | ✅ | Stock ticker symbol |
| `company_name` | `string` | ✅ | ✅ | Full legal name of the company |
| `description` | `string` | ✅ | ✅ | Business description / profile |
| `history` | `string` | ✅ | ✅ | Company history and milestones |
| `strategies` | `string` | ✅ | ❌ | Business strategies |
| `promise` | `string` | ✅ | ❌ | Company promise / vision |
| `risk` | `string` | ✅ | ❌ | Business risks |
| `key_developments` | `string` | ✅ | ❌ | Key developments |

### 2. Historical Quote (`quote.history()`)

The `StockQuote` interface is standardized.

| Field | Type | TCBS | VCI | MSN | Description |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `time` | `Date/String` | ✅ | ✅ | ✅ | Trading date/time |
| `open` | `number` | ✅ | ✅ | ✅ | Opening price |
| `high` | `number` | ✅ | ✅ | ✅ | Highest price |
| `low` | `number` | ✅ | ✅ | ✅ | Lowest price |
| `close` | `number` | ✅ | ✅ | ✅ | Closing price |
| `volume` | `number` | ✅ | ✅ | ✅ | Trading volume |
| `ticker` | `string` | ✅ | ❌ | ❌ | Symbol (sometimes included) |

### 3. Financial Ratios (`financial.ratios()`)

| Field | TCBS | VCI | Notes |
| :--- | :---: | :---: | :--- |
| `ticker` | ✅ | ✅ | |
| `quarter` | ✅ | ❌ | VCI returns yearly/current snapshot mostly |
| `year` | ✅ | ✅ | |
| `priceToEarning` (P/E) | ✅ | ✅ | |
| `priceToBook` (P/B) | ✅ | ✅ | |
| `roe` | ✅ | ✅ | |
| `roa` | ✅ | ✅ | |
| `debtToEquity` | ❌ | ✅ | |
| `currentRatio` | ❌ | ✅ | |

### 4. Funds (FMarket Only)

| Feature | Fields Supported |
| :--- | :--- |
| **Listing** | `id`, `short_name`, `name`, `nav`, `management_fee`, `fund_type` |
| **Top Holding** | `stock_code`, `industry`, `net_asset_percent` |
| **Industry Holding** | `industry`, `net_asset_percent` |
| **NAV Report** | `date`, `nav_per_unit` |
| **Asset Holding** | `asset_type`, `asset_percent` |

---

## Provider Recommendations

- **Best for General Market Data**: **TCBS** is the most comprehensive provider for Vietnam stocks, offering quotes, profiles, financials, and screening.
- **Best for Corporate Actions & Shareholders**: **VCI** provides detailed shareholder lists and reliable corporate profile data.
- **Best for Global Markets**: **MSN** is the go-to for Crypto, Forex, and searching for international symbols.
- **Best for Mutual Funds**: **FMarket** is the dedicated provider for Vietnam mutual fund data.
- **Best for Trading Integration**: **DNSE** is currently the only connector supporting authenticated trading actions.
