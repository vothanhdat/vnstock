# AI Handover Document

## Session Summary (November 25, 2025)
This document serves as a context bridge for the next AI agent working on the `vnstock` TypeScript migration.

### Completed Tasks
1.  **Verification & Stabilization**:
    -   Verified all existing providers: `TCBS`, `VCI`, `MSN`, `FMarket`, `DNSE`.
    -   Fixed bugs in `TCBS` and `VCI` implementations.
    -   **Interface Standardization Status**:
        -   `QuoteData`: ✅ Standardized across TCBS, VCI, XNO.
        -   `CompanyProfile`: ✅ Standardized across TCBS, VCI.
        -   `FinancialData`: ✅ **NOW STANDARDIZED** - Unified interface with normalization utilities.
        -   `Listing`: ✅ **TCBS NOW IMPLEMENTED** - Uses screener API for listing data.

2.  **New Implementations (Ported from Python)**:
    -   **Misc Module**: Created `src/explorer/misc/gold_price.ts` for SJC and BTMC gold prices.
        -   *Note*: SJC requires specific headers (`Referer`, `Origin`) to work.
    -   **XNO Connector**: Created `src/connector/xno/` for historical and intraday quotes.
        -   *Note*: Returns 401 if no API key is provided (expected behavior).

3.  **Financial Interface Standardization** (Session 2):
    -   Created unified `FinancialData` interface in `src/core/types.ts` with 50+ standardized fields.
    -   Created `BalanceSheetData` and `CashFlowData` extended interfaces.
    -   Created `src/core/financial.ts` with normalization utilities:
        -   `normalizeTCBSFinancial()`, `normalizeTCBSFinancialList()`
        -   `normalizeVCIFinancial()`, `normalizeVCIFinancialList()`
        -   Helper functions: `isFinancialData()`, `filterByPeriod()`, `filterByYear()`, `getLatest()`
    -   Added `normalizedBalanceSheet()`, `normalizedIncomeStatement()`, `normalizedCashFlow()` to TCBS provider.
    -   Added `normalizedRatios()` to VCI provider.

4.  **TCBS Listing Fix** (Session 2):
    -   Reimplemented `TCBSListingProvider` to use the screener/watchlist API.
    -   Now returns proper data for `allSymbols()`, `symbolsByExchange()`, `symbolsByIndustries()`.
    -   Added `allSymbolsWithInfo()` for full listing data with market cap, industry, etc.

5.  **Unit Tests** (Session 2):
    -   Created `src/explorer/misc/gold_price.test.ts` (16 tests) - SJC and BTMC gold price tests.
    -   Created `src/connector/xno/quote.test.ts` (27 tests) - XNO provider tests.
    -   Created `src/core/financial.test.ts` (21 tests) - Financial normalization tests.

6.  **Documentation**:
    -   Created `EXPLORER_COMPARISON.md`: A feature matrix comparing all implemented providers.
    -   Updated `TYPESCRIPT_IMPLEMENTATION.md` (pending update in this handover).

### Current Architecture
-   **Core**: `src/core/` (Registry, Base classes, Financial utilities).
-   **Explorers**: `src/explorer/` (TCBS, VCI, MSN, FMarket, Misc).
    -   *Pattern*: Functional or Class-based adapters implementing core interfaces.
-   **Connectors**: `src/connector/` (DNSE, XNO).
    -   *Pattern*: Class-based providers with `Config` and `Const` files.

### Pending Tasks / Known Issues
1.  **Exchange Rate (Misc)**:
    -   *Status*: Skipped.
    -   *Reason*: The Python implementation uses `pandas.read_excel`. Porting this requires adding a dependency like `xlsx` or `exceljs` to `package.json`.
    -   *Action*: Decide whether to add the dependency or find an alternative API.

2.  **Pre-existing Test Issue**:
    -   `src/index.test.ts` has TypeScript errors (lines 41-42) - `company` and `finance` properties not found on MSNComponents.
    -   This is a pre-existing issue, not introduced by recent changes.

### Verification Commands
To verify the current state, run the following commands:

```bash
# 1. Specific Provider Verification (Recommended)
npx ts-node examples-tcbs.ts    # Verify TCBS (Quote, Profile, Financials)
npx ts-node examples-vci.ts     # Verify VCI (Quote, Profile, Financials)
npx ts-node examples-msn.ts     # Verify MSN (Search, Crypto)
npx ts-node examples-fmarket.ts # Verify FMarket (Funds)
npx ts-node examples-dnse.ts    # Verify DNSE (Trading - requires auth)

# 2. Connectors Overview
npx ts-node connector-examples.ts
npx ts-node all-connectors-demo.ts

# 3. Misc (Gold Price)
# Create a temporary script to verify:
# import { sjcGoldPrice, btmcGoldPrice } from './src/explorer/misc/gold_price';
# (async () => { console.log(await sjcGoldPrice()); })();
```

```typescript
// Quick verification snippet for Misc
import { sjcGoldPrice, btmcGoldPrice } from './src/explorer/misc/gold_price';
(async () => {
    console.log('SJC:', await sjcGoldPrice());
    console.log('BTMC:', await btmcGoldPrice());
})();
```

## File Manifest
-   `src/explorer/misc/gold_price.ts`: Gold price implementation.
-   `src/connector/xno/`: XNO Connector implementation.
-   `EXPLORER_COMPARISON.md`: Feature comparison table.
