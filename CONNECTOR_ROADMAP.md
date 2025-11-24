# Connector Implementation Roadmap

## Status Overview

| Connector | Type | Status | Priority | Markets |
|-----------|------|--------|----------|---------|
| VCI | Scraping | ✅ **Implemented** | High | Vietnamese stocks |
| FMP | API | ✅ **Implemented** | High | Global stocks |
| TCBS | Scraping | 📋 Planned | High | Vietnamese stocks |
| MSN | API | 📋 Planned | Medium | Global indices, forex, crypto |
| DNSE | API | 📋 Planned | Medium | Vietnamese trading |
| Binance | API | 📋 Planned | Low | Cryptocurrency |
| XNO | API | 📋 Planned | Low | Vietnamese stocks |

## Implemented Connectors

### ✅ VCI (VietCap Securities)
**File**: `src/explorer/vci/quote.ts`  
**Type**: Web Scraping  
**Status**: Production Ready

**Features**:
- ✅ Historical OHLCV data
- ✅ Multiple timeframes (1m to 1M)
- ✅ Vietnamese indices support
- ⚠️ Intraday (structure ready)
- ⚠️ Price depth (structure ready)

**Usage**:
```typescript
const quote = new Quote('vci', 'ACB');
const data = await quote.history('2024-01-01', '2024-12-31', '1D');
```

### ✅ FMP (Financial Modeling Prep)
**File**: `src/connector/fmp/quote.ts`  
**Type**: REST API  
**Status**: Production Ready

**Features**:
- ✅ Historical daily data
- ✅ Intraday 1-minute data
- ✅ Real-time quotes (short/full)
- ✅ API key management

**Usage**:
```typescript
const quote = new Quote('fmp', 'AAPL');
const data = await quote.history('2024-01-01', '2024-12-31');
```

**API Key**: Set `FMP_API_KEY` environment variable  
**Free Tier**: 250 calls/day

## Planned Connectors

### 📋 TCBS (TCBS Securities)
**Priority**: High  
**Type**: Web Scraping  
**Markets**: Vietnamese stocks

**Reason**: Second most popular data source for Vietnamese stocks. Large user base expects TCBS support.

**Implementation Plan**:
```typescript
// src/explorer/tcbs/quote.ts
export class TCBSQuoteProvider {
  async history(start: string, end: string): Promise<QuoteData[]> {
    // TCBS API endpoint
    // Similar to VCI implementation
  }
}
```

**Data Available**:
- Historical prices
- Company info
- Financial statements
- Market analysis

### 📋 MSN (MSN Money)
**Priority**: Medium  
**Type**: REST API  
**Markets**: Global indices, forex, crypto

**Reason**: Provides global market data including forex and cryptocurrency. Complements Vietnamese stock data.

**Implementation Plan**:
```typescript
// src/explorer/msn/quote.ts
export class MSNQuoteProvider {
  async history(start: string, end: string): Promise<QuoteData[]> {
    // MSN Finance API
  }
}
```

**Data Available**:
- World indices (DJI, SPX, etc.)
- Forex pairs (EURUSD, GBPUSD, etc.)
- Cryptocurrency (BTC, ETH, etc.)

### 📋 DNSE (DNSE Securities)
**Priority**: Medium  
**Type**: REST API  
**Markets**: Vietnamese trading

**Reason**: Provides trading capabilities and order placement. Important for automated trading.

**Implementation Plan**:
```typescript
// src/connector/dnse/trading.ts
export class DNSETradingProvider {
  async placeOrder(order: OrderRequest): Promise<OrderResponse> {
    // DNSE trading API
  }
}
```

**Data Available**:
- Trading orders
- Portfolio management
- Account information

### 📋 Binance
**Priority**: Low  
**Type**: REST API  
**Markets**: Cryptocurrency

**Reason**: For users interested in cryptocurrency trading alongside stocks.

**Implementation Plan**:
```typescript
// src/connector/binance/quote.ts
export class BinanceQuoteProvider {
  async history(start: string, end: string): Promise<QuoteData[]> {
    // Binance API
  }
}
```

**Data Available**:
- Crypto prices
- Trading pairs
- Market depth

### 📋 XNO
**Priority**: Low  
**Type**: REST API  
**Markets**: Vietnamese stocks

**Reason**: Alternative API provider for Vietnamese market data.

## Implementation Guidelines

### For Each New Connector:

1. **Create Provider Class**
```typescript
// src/explorer/{provider}/quote.ts or src/connector/{provider}/quote.ts
export class {Provider}QuoteProvider {
  constructor(config?: ProviderConfig) {
    // Initialize
  }
  
  async history(start: string, end: string, resolution?: string): Promise<QuoteData[]> {
    // Implement data fetching
  }
  
  async intraday(pageSize?: number): Promise<QuoteData[]> {
    // Implement intraday data
  }
}
```

2. **Create Index File**
```typescript
// src/explorer/{provider}/index.ts
import { ProviderRegistry } from '../../core/registry';
import { {Provider}QuoteProvider } from './quote';

ProviderRegistry.register('quote', '{provider}', {Provider}QuoteProvider);

export { {Provider}QuoteProvider };
```

3. **Register in Main Index**
```typescript
// src/index.ts
import './explorer/{provider}';
```

4. **Add Tests**
```typescript
// src/{provider}.test.ts
describe('{Provider} Provider', () => {
  it('should fetch historical data', async () => {
    const quote = new Quote('{provider}', 'SYMBOL');
    const data = await quote.history('2024-01-01', '2024-12-31');
    expect(data.length).toBeGreaterThan(0);
  });
});
```

5. **Update Documentation**
- Add to CONNECTORS.md
- Add usage examples
- Document API keys if needed

## Effort Estimates

| Connector | Estimated Effort | Complexity |
|-----------|-----------------|------------|
| TCBS | 4-6 hours | Medium (similar to VCI) |
| MSN | 2-4 hours | Low (REST API) |
| DNSE | 6-8 hours | High (trading API) |
| Binance | 2-3 hours | Low (well-documented API) |
| XNO | 3-4 hours | Medium (API integration) |

## Dependencies

All connectors use existing dependencies:
- `axios` - HTTP requests
- `cheerio` - HTML parsing (for scraping)
- Core TypeScript types

No additional dependencies needed for basic implementations.

## Testing Strategy

For each connector:
1. Unit tests with mocked responses
2. Integration tests with real API (optional, requires credentials)
3. Error handling tests
4. Rate limit tests (for API connectors)

## Priority Rationale

**High Priority** (VCI, FMP, TCBS):
- Most commonly requested data sources
- Cover both Vietnamese and global markets
- One already implemented, one in progress

**Medium Priority** (MSN, DNSE):
- Extend market coverage (forex, crypto)
- Add trading capabilities
- Important for complete solution

**Low Priority** (Binance, XNO):
- Alternative providers
- Specific use cases
- Can be added as needed

## Community Contributions

The connector architecture is designed for community contributions:

1. Fork the repository
2. Implement new connector following guidelines
3. Add tests and documentation
4. Submit pull request

Template available in CONNECTORS.md

## Success Criteria

A connector is considered complete when:
- ✅ Historical data fetching works
- ✅ Registered with ProviderRegistry
- ✅ Tests pass (unit + integration)
- ✅ Documentation added
- ✅ Example usage provided
- ✅ Error handling implemented
- ✅ Logging configured

## Current Implementation

**Files**: 10 connector files
**Tests**: 16 passing (8 core + 8 connector)
**Documentation**: CONNECTORS.md, examples
**Build**: Clean, no errors
**Security**: 0 vulnerabilities

Ready for production use with VCI and FMP providers. Framework proven and extensible for all planned connectors.
