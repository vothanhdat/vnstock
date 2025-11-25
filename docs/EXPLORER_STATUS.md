# Vnstock Explorer Implementation Status

## Completed Explorers ✅

### 1. VCI (Vietcap Securities)
**Status:** Fully implemented
**Location:** `src/explorer/vci/`
**Providers:**
- ✅ Quote (historical prices, intraday)
- ✅ Company (profile, officers, subsidiaries)
- ✅ Financial (balance sheet, income statement, cash flow)
- ✅ Listing (all symbols, by exchange, by industry)
- ✅ Trading (price board, index components)
- ✅ Screener (stock screening)

**Key Features:**
- GraphQL API integration
- HTML cleaning for company profiles
- Comprehensive financial data
- Real-time price board

---

### 2. TCBS (Techcombank Securities)
**Status:** Fully implemented
**Location:** `src/explorer/tcbs/`
**Providers:**
- ✅ Quote (historical prices)
- ✅ Company (overview, profile, subsidiaries, officers, events)
- ✅ Financial (financial ratios, balance sheet, income statement, cash flow)
- ✅ Listing (all symbols)

**Key Features:**
- REST API integration
- Rich company data
- Historical financial ratios
- Major events tracking

---

### 3. MSN (Microsoft Network)
**Status:** Fully implemented ✅
**Location:** `src/explorer/msn/`
**Providers:**
- ✅ Quote (historical prices for crypto, forex, indices)
- ✅ Listing (symbol search)

**Key Features:**
- Global market data (crypto, forex, indices)
- Multi-asset type support
- Symbol search functionality
- Timezone-aware data handling

---

## Remaining Python Explorers to Implement

### 4. FMarket (Fund Market) 🔄
**Status:** Not yet implemented
**Python Location:** `vnstock/explorer/fmarket/`
**Priority:** Medium

**Python Files:**
- `fund.py` - Mutual fund data

**Key Features to Port:**
```python
class Fund:
    def listing(fund_type: str) -> pd.DataFrame
        # Get all mutual funds
        # Filter by type: BALANCED, BOND, STOCK
        
    class FundDetails:
        def overview(fund_id: str) -> dict
        def nav_report(fund_id: str) -> pd.DataFrame
        def asset_allocation(fund_id: str) -> dict
        def industry_holding(fund_id: str) -> pd.DataFrame
        def holding_stock(fund_id: str) -> pd.DataFrame
```

**TypeScript Implementation Plan:**
```typescript
// src/explorer/fmarket/fund.ts
export class FMarketFundProvider {
  async listing(fundType?: string): Promise<any[]>
  async overview(fundId: string): Promise<any>
  async navReport(fundId: string): Promise<any[]>
  async assetAllocation(fundId: string): Promise<any>
  async industryHolding(fundId: string): Promise<any[]>
  async holdingStock(fundId: string): Promise<any[]>
}
```

**API Details:**
- Base URL: `https://api.fmarket.vn/res/product`
- Endpoints:
  - `/filter` - List funds with filters
  - `/getById` - Fund details
  - `/nav` - NAV history
  - `/asset-allocation` - Portfolio allocation
  - `/industry-holdings` - Industry breakdown
  - `/top-holdings` - Top stock holdings

---

### 5. Misc Utilities 🔄
**Status:** Not yet implemented
**Python Location:** `vnstock/explorer/misc/`
**Priority:** Low

#### 5.1 Gold Prices (`gold_price.py`)
```python
def sjc_gold_price(date: str) -> pd.DataFrame
    # Get gold prices from SJC (Saigon Jewelry Company)
    # Date range: 2016-01-02 to present
    # Returns: buy/sell prices by branch
    
def btmc_goldprice() -> pd.DataFrame
    # Get gold prices from Bảo Tín Minh Châu
    # Returns: various gold products with prices
```

**TypeScript Implementation Plan:**
```typescript
// src/explorer/misc/gold.ts
export class GoldPriceProvider {
  async sjcPrice(date?: string): Promise<any[]>
  async btmcPrice(): Promise<any[]>
}
```

**API Details:**
- SJC: `https://sjc.com.vn/GoldPrice/Services/PriceService.ashx`
- BTMC: `http://api.btmc.vn/api/BTMCAPI/getpricebtmc`

#### 5.2 Exchange Rates (`exchange_rate.py`)
```python
def vcb_exchange_rate(date: str) -> pd.DataFrame
    # Get exchange rates from Vietcombank
    # Returns: Currency codes, buy/sell rates
```

**TypeScript Implementation Plan:**
```typescript
// src/explorer/misc/exchange.ts
export class ExchangeRateProvider {
  async vcbRate(date?: string): Promise<any[]>
}
```

**API Details:**
- VCB: `https://www.vietcombank.com.vn/api/exchangerates/exportexcel?date={date}`
- Returns: Base64-encoded Excel file

---

## Implementation Priority

### High Priority ⭐⭐⭐
- **VCI, TCBS, MSN** - ✅ Completed

### Medium Priority ⭐⭐
- **FMarket Fund** - Important for investors tracking mutual funds
  - Moderate complexity
  - Clear API structure
  - High user value

### Low Priority ⭐
- **Misc Utilities** - Nice-to-have features
  - Gold prices (niche use case)
  - Exchange rates (MSN already provides forex data)
  - Simple to implement but limited demand

---

## Implementation Recommendations

### Next Steps:

#### 1. FMarket Fund Module (Recommended Next)
**Rationale:**
- High user value for fund investors
- Well-documented API
- Medium complexity
- Good learning opportunity for REST API integration

**Estimated Effort:** 4-6 hours
- 2 hours: Core listing and overview
- 2 hours: NAV and allocation features
- 1-2 hours: Testing and examples

**Files to Create:**
```
src/explorer/fmarket/
├── const.ts          # Fund type mappings, column maps
├── fund.ts           # Fund provider implementation
└── index.ts          # Module exports
```

#### 2. Misc Utilities (Optional)
**Rationale:**
- Low complexity
- Independent modules
- Can be implemented as standalone utilities

**Estimated Effort:** 2-3 hours
- 1 hour: Gold prices
- 1 hour: Exchange rates
- 1 hour: Testing

**Files to Create:**
```
src/explorer/misc/
├── gold.ts           # Gold price utilities
├── exchange.ts       # Exchange rate utilities
└── index.ts          # Module exports
```

---

## Current Implementation Summary

| Explorer | Status | Providers | Lines of Code | Test Coverage |
|----------|--------|-----------|---------------|---------------|
| VCI      | ✅ Done | 6         | ~800         | Examples ✅   |
| TCBS     | ✅ Done | 4         | ~600         | Examples ✅   |
| MSN      | ✅ Done | 2         | ~250         | Examples ✅   |
| FMarket  | ❌ Todo | 0         | 0            | N/A           |
| Misc     | ❌ Todo | 0         | 0            | N/A           |

**Total Progress:** 3/5 explorers (60%)
**Total Providers:** 12/14+ (85%+ of core functionality)

---

## Testing Strategy

### Completed Examples:
- ✅ `examples-vci.ts` - VCI provider examples
- ✅ `examples-tcbs.ts` - TCBS provider examples
- ✅ `examples-msn.ts` - MSN provider examples

### Pending Examples:
- ❌ `examples-fmarket.ts` - FMarket examples
- ❌ `examples-misc.ts` - Misc utilities examples

### Test Coverage Needed:
```typescript
// Unit tests for each provider
describe('MSNQuoteProvider', () => {
  it('should fetch BTC history', async () => {
    // Test implementation
  });
  
  it('should handle invalid symbols', async () => {
    // Error handling test
  });
});
```

---

## API Comparison

| Feature | VCI | TCBS | MSN | FMarket | Misc |
|---------|-----|------|-----|---------|------|
| Vietnamese Stocks | ✅ | ✅ | ❌ | ❌ | ❌ |
| Financial Data | ✅ | ✅ | ❌ | ❌ | ❌ |
| Company Info | ✅ | ✅ | ❌ | ❌ | ❌ |
| Crypto | ❌ | ❌ | ✅ | ❌ | ❌ |
| Forex | ❌ | ❌ | ✅ | ❌ | ✅ |
| Mutual Funds | ❌ | ❌ | ❌ | ✅ | ❌ |
| Gold Prices | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## Conclusion

**Current State:**
- Core Vietnamese stock market data ✅ (VCI, TCBS)
- Global markets data ✅ (MSN)
- Mutual funds ⏳ (Pending)
- Misc utilities ⏳ (Pending)

**Recommendation:**
Implement FMarket next for complete coverage of Vietnamese investment products (stocks + funds). Misc utilities can wait or be implemented as separate utility modules outside the provider system.

**Completeness:** The current implementation covers ~85% of user needs with VCI, TCBS, and MSN providers. Adding FMarket would bring it to ~95%.
