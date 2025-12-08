/**
 * Example usage of vnstock TypeScript library with TCBS provider
 * 
 * This file demonstrates how to use the vnstock library with TCBS data source.
 * Note: This example makes real network requests to TCBS API.
 */

import { Vnstock, Quote, DataSource, TimeFrame, StockComponents } from './src/index';

async function main() {
  console.log('=== Vnstock TCBS Examples ===\n');

  // Example 1: Using Vnstock helper with TCBS source
  console.log('Example 1: Basic Stock Data (TCBS)');
  // Note: Vnstock constructor defaults to VCI, but we can specify source in methods or use specific classes
  const vnstock = new Vnstock();
  const acb = vnstock.stock('VCB', DataSource.TCBS) as StockComponents;

  try {
    console.log('Fetching historical data for ACB...');
    const history = await acb.quote.history('2024-01-01', '2024-01-31', TimeFrame.DAILY);
    console.log(`Fetched ${history.length} historical records`);
    if (history.length > 0) {
      console.log('First record:', history[0]);
    }
  } catch (error) {
    console.error('Error fetching history:', error);
  }
  console.log();

  // Example 2: Using Quote class directly with TCBS
  console.log('Example 2: Using Quote Class directly');
  const quote = new Quote(DataSource.TCBS, 'VNM');

  try {
    console.log('Fetching intraday data for VNM...');
    const intraday = await quote.intraday(20);
    console.log(`Fetched ${intraday.length} intraday records`);
    if (intraday.length > 0) {
      console.log('Latest record:', intraday[0]);
    }
  } catch (error) {
    console.error('Error fetching intraday:', error);
  }
  console.log();

  // Example 3: Company Profile
  console.log('Example 3: Company Profile');
  try {
    console.log('Fetching company profile for ACB...');
    const profile = await acb.company.profile();
    console.log('Company Profile:', profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
  console.log();

  // Example 4: Financial Reports
  console.log('Example 4: Financial Reports');
  try {
    console.log('Fetching income statement for ACB (Yearly)...');
    // Note: For financial reports, we can use the finance component
    const incomeStatement = await acb.finance.incomeStatement();
    console.log(`Fetched ${incomeStatement.length} records`);
    if (incomeStatement.length > 0) {
      console.log('Latest record:', incomeStatement[0]);
    }

    console.log('Fetching balance sheet for ACB (Quarterly)...');
    const balanceSheet = await acb.finance.balanceSheet();
    console.log(`Fetched ${balanceSheet.length} records`);
  } catch (error) {
    console.error('Error fetching financial reports:', error);
  }
  console.log();

  // Example 5: Listing Data
  console.log('Example 5: Listing Data');
  try {
    console.log('Fetching all symbols from HOSE...');
    // We can use the listing component from the stock instance
    const symbols = await acb.listing.allSymbols('HOSE');
    console.log(`Fetched ${symbols.length} symbols`);
    if (symbols.length > 0) {
      console.log('First symbol:', symbols[0]);
    }
  } catch (error) {
    console.error('Error fetching listing data:', error);
  }
  console.log();

  // Example 6: Trading Data (Price Board)
  console.log('Example 6: Trading Data (Price Board)');
  try {
    console.log('Fetching price board for ACB, VNM, TCB...');
    const priceBoard = await acb.trading.priceBoard(['ACB', 'VNM', 'TCB']);
    console.log(`Fetched ${priceBoard.length} records`);
    if (priceBoard.length > 0) {
      console.log('First record:', priceBoard[0]);
    }
  } catch (error) {
    console.error('Error fetching price board:', error);
  }
  console.log();

  // Example 7: Screener
  console.log('Example 7: Screener');
  try {
    console.log('Screening stocks (HOSE, Market Cap > 10000B)...');
    // Note: The screener parameters depend on the provider. 
    // For TCBS, we can pass a simple filter object.
    const params = {
      exchangeName: 'HOSE,HNX,UPCOM',
      // marketCap: 1000 // Example: Filter by market cap > 1000 billion VND (if supported)
    };
    const screened = await acb.screener.screen(params, 2000);
    console.log(`Fetched ${screened.length} records`);
    if (screened.length > 0) {
      console.log('First record:', screened[0]);
    }

    console.log('Fetching screener field metadata (English)...');
    const metadataEn = await acb.screener.getFieldMetadata('en');
    console.log(`Fetched metadata for ${Object.keys(metadataEn).length} fields`);

    console.log('Fetching screener field metadata (Vietnamese)...');
    const metadataVi = await acb.screener.getFieldMetadata('vi');

    // Log some interesting fields
    const fieldsToShow = ['marketCap', 'roe', 'pe'];
    fieldsToShow.forEach(field => {
      if (metadataEn[field] && metadataVi[field]) {
        console.log(`Field: ${field}`);
        console.log(`  Label (EN): ${metadataEn[field].label}`);
        console.log(`  Label (VI): ${metadataVi[field].label}`);

        if (metadataEn[field].unit) {
          console.log(`  Unit (EN): ${metadataEn[field].unit}`);
        }
        if (metadataVi[field].unit) {
          console.log(`  Unit (VI): ${metadataVi[field].unit}`);
        }

        console.log(`  Tooltip (EN): ${metadataEn[field].tooltip}`);
      }
    });
  } catch (error) {
    console.error('Error screening stocks:', error);
  }
  console.log();

  console.log('=== Examples Complete ===');
}

// Run examples
main().catch(console.error);
