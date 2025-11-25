# MSN Explorer Implementation

## Overview
The MSN explorer module provides access to global financial data including:
- Cryptocurrencies (BTC, ETH, USDT, etc.)
- Currency exchange rates (USD/VND, EUR/USD, etc.)
- Global indices (NASDAQ, S&P500, etc.)
- Symbol search functionality

## Implementation Status

### Completed Components

#### 1. Constants (`src/explorer/msn/const.ts`)
- `BASE_URL`: MSN Finance API base URL
- `SYMBOL_INDEX_COLS_MAP`: Column mapping for symbol search results
- `INTERVAL_MAP`: Supported time intervals
- `RESAMPLE_MAP`: Data resampling configuration
- `OHLC_MAP`: Price data column mapping
- `CURRENCY_ID_MAP`: Currency pair symbol IDs
- `CRYPTO_ID_MAP`: Cryptocurrency symbol IDs
- `GLOBAL_INDICES`: Global stock indices symbol IDs

#### 2. Helper Functions (`src/explorer/msn/helper.ts`)
- `getHeaders()`: Generate HTTP headers for MSN API requests
- `getMsnApiKey()`: Fetch and cache MSN API key
- `getAssetType()`: Determine asset type (crypto/currency/index)

#### 3. Listing Provider (`src/explorer/msn/listing.ts`)
```typescript
class MSNListingProvider {
  async searchSymbolId(query: string, locale?: string, limit?: number): Promise<any[]>
}
```
**Features:**
- Search for symbols across all asset types
- Filter by locale (vi-vn, en-us, etc.)
- Limit result count
- Automatic column mapping

#### 4. Quote Provider (`src/explorer/msn/quote.ts`)
```typescript
class MSNQuoteProvider {
  async history(
    startOrOptions: string | HistoryOptions,
    end?: string,
    interval?: string
  ): Promise<any[]>
}
```
**Features:**
- Historical price data
- Support for multiple asset types (crypto, currency, stocks)
- Flexible parameter styles (object or positional)
- Automatic timezone adjustment (UTC to Asia/Ho_Chi_Minh)
- Data filtering and resampling
- Special handling for currency (removes volume column)

## Usage Examples

### Example 1: Search for Symbols
```typescript
import { Vnstock } from './src/index';

const vnstock = new Vnstock();
const listing = vnstock.stock(undefined, 'MSN').listing;

const results = await listing.searchSymbolId('BTCUSD', 'en-us', 10);
console.log(results);
```

### Example 2: Get Cryptocurrency History
```typescript
const btc = vnstock.stock('c2111', 'MSN'); // BTC symbol ID

const history = await btc.quote.history({
  start: '2024-01-01',
  end: '2024-01-31',
  interval: '1D',
  countBack: 10
});
console.log(history);
```

### Example 3: Get Currency Exchange Rates
```typescript
const usdvnd = vnstock.stock('avyufr', 'MSN'); // USDVND symbol ID

const rates = await usdvnd.quote.history({
  start: '2024-11-01',
  end: '2024-11-25',
  interval: '1D',
  countBack: 5
});
console.log(rates);
```

### Example 4: Vietnamese Stocks Search
```typescript
const vnResults = await listing.searchSymbolId('VNM', 'vi-vn', 5);
console.log(vnResults);
```

## API Reference

### MSNListingProvider

#### `searchSymbolId(query, locale?, limit?)`
Search for symbols by keyword.

**Parameters:**
- `query` (string): Search keyword
- `locale` (string, optional): Filter by locale (e.g., 'vi-vn', 'en-us')
- `limit` (number, optional): Maximum results (default: 10)

**Returns:** Array of symbol objects with properties:
- `symbol`: Stock ticker
- `symbol_id`: MSN internal ID
- `exchange_name`: Exchange name
- `exchange_code_mic`: Market Identifier Code
- `short_name`: Short display name
- `friendly_name`: User-friendly name
- `eng_name`: English name
- `description`: Full description
- `local_name`: Localized name
- `locale`: Language/market code

### MSNQuoteProvider

#### `history(options)`
Fetch historical price data.

**Parameters (Object Style):**
```typescript
{
  start: string;        // Start date (YYYY-MM-DD)
  end?: string;         // End date (YYYY-MM-DD, default: today)
  interval?: string;    // Time interval ('1D', '1W', '1M', default: '1D')
  showLog?: boolean;    // Enable logging (default: false)
  countBack?: number;   // Limit results from end (optional)
}
```

**Parameters (Positional Style):**
- `start` (string): Start date
- `end` (string): End date
- `interval` (string): Time interval

**Returns:** Array of price data objects:
```typescript
{
  time: string;     // Date (YYYY-MM-DD)
  open: number;     // Opening price
  high: number;     // Highest price
  low: number;      // Lowest price
  close: number;    // Closing price
  volume?: number;  // Trading volume (not available for currencies)
}
```

## Symbol ID Reference

### Cryptocurrencies
```typescript
{
  'BTC': 'c2111',
  'ETH': 'c2112',
  'USDT': 'c2115',
  'USDC': 'c211a',
  'BNB': 'c2113',
  'XRP': 'c2117',
  'ADA': 'c2114',
  'SOL': 'c2116',
  'DOGE': 'c2119'
}
```

### Currency Pairs
```typescript
{
  'USDVND': 'avyufr',
  'EURUSD': 'av932w',
  'GBPUSD': 'avyjhw',
  'USDJPY': 'avyomw',
  // ... and many more
}
```

### Global Indices
```typescript
{
  'VNINDEX': 'av8k4w',
  'VN30': 'av8k52',
  'DOWJONES': 'av8k62',
  'NASDAQ': 'av8k67',
  'S&P500': 'av8k6c',
  // ... and many more
}
```

## Technical Notes

### API Key Management
- API key is fetched dynamically from MSN's configuration endpoint
- Key is cached for the session to reduce API calls
- Automatic version detection based on current date

### Timezone Handling
- All timestamps are converted from UTC to Asia/Ho_Chi_Minh (+7 hours)
- Time portion is removed for daily data

### Data Cleaning
- Invalid values (-99999901.0) are filtered out
- Rows with missing OHLC data are removed
- Prices are rounded to 2 decimal places

### Asset Type Detection
The provider automatically detects asset type based on symbol ID:
- **Crypto**: Has volume data, uses crypto endpoint
- **Currency**: No volume data, volume column is removed
- **Index**: Uses standard chart endpoint
- **Unknown**: Default behavior

## Testing

Run the examples file to test all functionality:
```bash
bun run examples-msn.ts
```

## Future Enhancements

Potential additions from the Python implementation that could be ported:
1. **FMarket** (`vnstock/explorer/fmarket/`):
   - Mutual fund data
   - Fund performance metrics
   - Fund comparison tools

2. **Misc Utilities** (`vnstock/explorer/misc/`):
   - Gold prices (SJC, BTMC)
   - Exchange rates (VCB)
   - Additional financial data sources

3. **Additional MSN Features**:
   - Company profiles for global stocks
   - Financial statements for international companies
   - News and sentiment data

## Dependencies

- `fetch` API for HTTP requests
- Logger from `core/logger`
- Registry system from `core/registry`

## Files Structure

```
src/explorer/msn/
├── const.ts       # Constants and mappings
├── helper.ts      # Helper functions
├── listing.ts     # Listing provider
├── quote.ts       # Quote provider
└── index.ts       # Module exports and registration
```

## Integration

The MSN module is automatically registered when importing the main vnstock package:

```typescript
import { Vnstock } from './src/index';
// MSN providers are auto-registered via:
// import './explorer/msn';
```

No manual registration needed!
