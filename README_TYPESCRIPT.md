# Vnstock - TypeScript Edition

A beginner-friendly yet powerful TypeScript toolkit for financial analysis and automation of Vietnamese stock market data.

## Installation

```bash
npm install vnstock
```

## Quick Start

### Basic Usage

```typescript
import { Vnstock } from 'vnstock';

// Initialize client
const stock = new Vnstock();

// Get stock data
const acb = stock.stock('ACB');

// Fetch historical data
const history = await acb.quote.history('2023-01-01', '2023-12-31');
console.log(history);

// Get company profile
const profile = await acb.company.profile();
console.log(profile);

// Get financial statements
const balanceSheet = await acb.finance.balanceSheet('quarter');
console.log(balanceSheet);
```

### Advanced Usage

```typescript
import { Vnstock, DataSource, TimeFrame } from 'vnstock';

// Use specific data source
const stock = new Vnstock('ACB', 'VCI', true);

// Get quote data with different time frames
const quote = stock.stock('VNM', 'TCBS');
const dailyData = await quote.quote.history(
  '2023-01-01',
  '2023-12-31',
  TimeFrame.DAILY
);

// Get intraday data
const intradayData = await quote.quote.intraday(100);

// Screen stocks
const screener = stock.stock().screener;
const topGainers = await screener.topGainers(10);
const topLosers = await screener.topLosers(10);
```

### Forex and Crypto

```typescript
const stock = new Vnstock();

// Get forex data
const eurusd = stock.fx('EURUSD');
const fxHistory = await eurusd.quote.history('2023-01-01', '2023-12-31');

// Get crypto data
const btc = stock.crypto('BTC');
const btcHistory = await btc.quote.history('2023-01-01', '2023-12-31');

// Get world indices
const dji = stock.worldIndex('DJI');
const indexHistory = await dji.quote.history('2023-01-01', '2023-12-31');
```

## API Reference

### Main Classes

- **Vnstock**: Main client class
- **Quote**: Historical and intraday price data
- **Company**: Company information and corporate data
- **Finance**: Financial statements and ratios
- **Listing**: Symbol listings and market data
- **Trading**: Real-time trading data
- **Screener**: Stock screening and filtering

### Data Sources

- **VCI**: VCI Securities (default)
- **TCBS**: TCBS Securities
- **VNDirect**: VNDirect Securities
- **Simplize**: Simplize (Screener only)
- **MSN**: MSN Money (for forex, crypto, global indices)

### Time Frames

- `MINUTE_1`, `MINUTE_5`, `MINUTE_15`, `MINUTE_30`
- `HOUR_1`, `HOUR_4`
- `DAILY`, `WEEKLY`, `MONTHLY`

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
npm run lint:fix
```

## License

See LICENSE.md for licensing information.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Support

- Documentation: [GitHub Wiki](https://github.com/thinh-vu/vnstock)
- Issues: [GitHub Issues](https://github.com/thinh-vu/vnstock/issues)
- Community: [Facebook Group](https://www.facebook.com/groups/vnstock.official)

## Acknowledgments

This is a TypeScript reimplementation of the original [vnstock](https://github.com/thinh-vu/vnstock) Python library by Thinh Vu.
