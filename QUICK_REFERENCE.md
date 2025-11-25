# Vnstock TypeScript - Quick Reference

## Installation & Setup
```bash
bun install
```

## Basic Usage

### 1. Vietnamese Stocks (VCI or TCBS)
```typescript
import { Vnstock } from 'vnstock';

const vnstock = new Vnstock();
const stock = vnstock.stock('VNM', 'VCI'); // or 'TCBS'

// Company Profile
const profile = await stock.company.profile();

// Historical Prices
const history = await stock.quote.history('2024-01-01', '2024-12-31', '1D');

// Financial Statements
const balanceSheet = await stock.finance.balanceSheet('2023', 'annual');
const income = await stock.finance.incomeStatement('2023', 'annual');
const cashFlow = await stock.finance.cashFlow('2023', 'annual');

// Real-time Price Board (VCI only)
const priceBoard = await stock.trading.priceBoard('HOSE');
```

### 2. Cryptocurrency (MSN)
```typescript
// BTC symbol ID: c2111
const btc = vnstock.stock('c2111', 'MSN');

const btcHistory = await btc.quote.history({
  start: '2024-01-01',
  end: '2024-12-31',
  interval: '1D',
  countBack: 30  // Last 30 days
});
```

### 3. Forex / Currency Exchange (MSN)
```typescript
// USD/VND symbol ID: avyufr
const usdvnd = vnstock.stock('avyufr', 'MSN');

const rates = await usdvnd.quote.history({
  start: '2024-11-01',
  end: '2024-11-25',
  interval: '1D'
});
```

### 4. Search Symbols (MSN)
```typescript
const listing = vnstock.stock(undefined, 'MSN').listing;

const results = await listing.searchSymbolId('BTC', 'en-us', 10);
```

## Cheat Sheet

### VCI Provider
| Feature | Method | Example |
|---------|--------|---------|
| Company Profile | `stock.company.profile()` | Company info with HTML cleaned |
| Officers | `stock.company.officers()` | Company leadership |
| Subsidiaries | `stock.company.subsidiaries()` | Subsidiary companies |
| Historical Prices | `stock.quote.history(start, end, interval)` | OHLCV data |
| Intraday | `stock.quote.intraday(pageSize)` | Real-time trades |
| Price Board | `stock.trading.priceBoard(exchange)` | All stocks on exchange |
| Balance Sheet | `stock.finance.balanceSheet(year, period)` | BS data |
| Income Statement | `stock.finance.incomeStatement(year, period)` | IS data |
| Cash Flow | `stock.finance.cashFlow(year, period)` | CF data |
| All Symbols | `stock.listing.allSymbols()` | List all tickers |
| Screener | `stock.screener.screen(filters)` | Filter stocks |

### TCBS Provider
| Feature | Method | Example |
|---------|--------|---------|
| Company Overview | `stock.company.overview()` | Company overview |
| Company Profile | `stock.company.profile()` | Detailed profile |
| Officers | `stock.company.officers()` | Leadership info |
| Events | `stock.company.events(year, size)` | Major events |
| Historical Prices | `stock.quote.history(start, end, interval)` | OHLCV data |
| Financial Ratios | `stock.finance.ratio(year, period)` | Key ratios |
| Balance Sheet | `stock.finance.balanceSheet(year, period)` | BS data |
| Income Statement | `stock.finance.incomeStatement(year, period)` | IS data |
| Cash Flow | `stock.finance.cashFlow(year, period)` | CF data |

### MSN Provider
| Feature | Method | Example |
|---------|--------|---------|
| Search Symbols | `listing.searchSymbolId(query, locale, limit)` | Find symbols |
| Crypto History | `quote.history({ start, end, interval })` | BTC, ETH, etc. |
| Forex History | `quote.history({ start, end, interval })` | USD/VND, EUR/USD |
| Index History | `quote.history({ start, end, interval })` | NASDAQ, S&P500 |

## Symbol ID Reference (MSN)

### Cryptocurrencies
```
BTC: c2111    ETH: c2112    USDT: c2115
BNB: c2113    XRP: c2117    ADA: c2114
SOL: c2116    DOGE: c2119
```

### Currency Pairs
```
USDVND: avyufr    EURUSD: av932w    GBPUSD: avyjhw
USDJPY: avyomw    AUDVND: auxrkr    JPYVND: ave8sm
```

### Vietnamese Indices
```
VNINDEX: av8k4w    VN30: av8k52    HNX: av8k57
HNX30: av8k5c      UPCOM: av8k5h
```

### Global Indices
```
NASDAQ: av8k67     S&P500: av8k6c    DOWJONES: av8k62
DAX: av8k6h        NIKKEI225: av8k6r HANGSENG: av8k6w
```

## Examples

Run the example files:
```bash
bun run examples-vci.ts
bun run examples-tcbs.ts
bun run examples-msn.ts
```

## Common Patterns

### Get Latest Price
```typescript
const stock = vnstock.stock('VNM', 'VCI');
const history = await stock.quote.history(
  '2024-01-01', 
  new Date().toISOString().split('T')[0],  // Today
  '1D'
);
const latestPrice = history[history.length - 1];
```

### Compare Multiple Stocks
```typescript
const symbols = ['VNM', 'VIC', 'HPG'];
const data = await Promise.all(
  symbols.map(sym => 
    vnstock.stock(sym, 'VCI').quote.history('2024-01-01', '2024-12-31')
  )
);
```

### Get All Stocks on Exchange
```typescript
const stock = vnstock.stock(undefined, 'VCI');
const hoseSymbols = await stock.listing.symbolsByExchange('HOSE');
const hnxSymbols = await stock.listing.symbolsByExchange('HNX');
```

## Error Handling

```typescript
try {
  const profile = await stock.company.profile();
} catch (error) {
  if (error.message.includes('404')) {
    console.error('Symbol not found');
  } else if (error.message.includes('timeout')) {
    console.error('Request timeout - retry later');
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Tips & Best Practices

1. **Use VCI for Vietnamese stocks** - Most comprehensive data
2. **Use TCBS for financial ratios** - Better ratio calculations
3. **Use MSN for global markets** - Crypto, forex, indices
4. **Cache API keys** - MSN API key is fetched once per session
5. **Batch requests** - Use `Promise.all()` for multiple stocks
6. **Handle timezones** - MSN auto-converts to Asia/Ho_Chi_Minh
7. **Check data quality** - VCI profiles are HTML-cleaned automatically

## Data Intervals

| Provider | Supported Intervals |
|----------|-------------------|
| VCI | 1D, 1W, 1M |
| TCBS | 1D |
| MSN | 1D, 1W, 1M |

## Period Types (Financial Data)

```typescript
// Annual reports
await stock.finance.balanceSheet('2023', 'annual');

// Quarterly reports
await stock.finance.balanceSheet('2023', 'quarter');
```

## Documentation

- Full docs: `docs/IMPLEMENTATION_SUMMARY.md`
- MSN guide: `docs/MSN_IMPLEMENTATION.md`
- Status: `docs/EXPLORER_STATUS.md`

---

**Version:** 3.0.0-typescript  
**Last Updated:** November 25, 2024
