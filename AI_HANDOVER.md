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
        -   `FinancialData`: ❌ Not standardized. TCBS returns `TCBSFinancialReport`, VCI returns `VCIFinancialRatio`.
        -   `Listing`: ❌ Not standardized. TCBS implementation is partial.

2.  **New Implementations (Ported from Python)**:
    -   **Misc Module**: Created `src/explorer/misc/gold_price.ts` for SJC and BTMC gold prices.
        -   *Note*: SJC requires specific headers (`Referer`, `Origin`) to work.
    -   **XNO Connector**: Created `src/connector/xno/` for historical and intraday quotes.
        -   *Note*: Returns 401 if no API key is provided (expected behavior).

3.  **Documentation**:
    -   Created `EXPLORER_COMPARISON.md`: A feature matrix comparing all implemented providers.
    -   Updated `TYPESCRIPT_IMPLEMENTATION.md` (pending update in this handover).

### Current Architecture
-   **Core**: `src/core/` (Registry, Base classes).
-   **Explorers**: `src/explorer/` (TCBS, VCI, MSN, FMarket, Misc).
    -   *Pattern*: Functional or Class-based adapters implementing core interfaces.
-   **Connectors**: `src/connector/` (DNSE, XNO).
    -   *Pattern*: Class-based providers with `Config` and `Const` files.

### Pending Tasks / Known Issues
1.  **Exchange Rate (Misc)**:
    -   *Status*: Skipped.
    -   *Reason*: The Python implementation uses `pandas.read_excel`. Porting this requires adding a dependency like `xlsx` or `exceljs` to `package.json`.
    -   *Action*: Decide whether to add the dependency or find an alternative API.

2.  **Test Coverage**:
    -   Integration tests exist in `examples.ts` and `connector-examples.ts`.
    -   Unit tests are sparse. Need to add Jest tests for `src/explorer/misc` and `src/connector/xno`.

3.  **TCBS Listing**:
    -   The `listing` method in TCBS explorer might be incomplete or return empty data for some queries.

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
