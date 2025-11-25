/**
 * Example usage of vnstock TypeScript library with VCI provider
 * 
 * This file demonstrates how to use the vnstock library with VCI (Vietcap) data source.
 */

import { Vnstock, DataSource, TimeFrame } from './src/index';

async function main() {
  console.log('=== Vnstock VCI Examples ===\n');

  const vnstock = new Vnstock();
  const symbol = 'VNM';
  const stock = vnstock.stock(symbol, DataSource.VCI);

  // Example 1: Historical Quote
  console.log('Example 1: Historical Quote');
  try {
    console.log(`Fetching history for ${symbol}...`);
    const history = await stock.quote.history('2024-01-01', '2024-01-31', TimeFrame.DAILY);
    console.log(`Fetched ${history.length} records`);
    if (history.length > 0) {
      console.log('First record:', history[0]);
    }
  } catch (error) {
    console.error('Error fetching history:', error);
  }
  console.log();

  // Example 2: Company Profile
  console.log('Example 2: Company Profile');
  try {
    console.log(`Fetching profile for ${symbol}...`);
    const profile = await stock.company.profile();
    console.log('Profile:', profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
  console.log();

  // Example 3: Shareholders
  console.log('Example 3: Shareholders');
  try {
    console.log(`Fetching shareholders for ${symbol}...`);
    const shareholders = await stock.company.shareholders();
    console.log(`Fetched ${shareholders.length} shareholders`);
    if (shareholders.length > 0) {
      console.log('Top shareholder:', shareholders[0]);
    }
  } catch (error) {
    console.error('Error fetching shareholders:', error);
  }
  console.log();

  // Example 4: Financial Ratios
  console.log('Example 4: Financial Ratios');
  try {
    console.log(`Fetching financial ratios for ${symbol}...`);
    const ratios = await stock.finance.ratios();
    console.log(`Fetched ${ratios.length} ratio records`);
    if (ratios.length > 0) {
      console.log('Latest ratios:', ratios[0]);
    }
  } catch (error) {
    console.error('Error fetching ratios:', error);
  }
  console.log();

  // Example 5: Listing (All Symbols)
  console.log('Example 5: Listing');
  try {
    console.log('Fetching all symbols...');
    const symbols = await stock.listing.allSymbols();
    console.log(`Fetched ${symbols.length} symbols`);
    if (symbols.length > 0) {
      console.log('First symbol:', symbols[0]);
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
  }
  console.log();

  // Example 6: Trading (Price Board)
  console.log('Example 6: Trading (Price Board)');
  try {
    const symbols = ['VNM', 'VIC', 'FPT'];
    console.log(`Fetching price board for ${symbols.join(', ')}...`);
    const board = await stock.trading.priceBoard(symbols);
    console.log(`Fetched ${board.length} records`);
    if (board.length > 0) {
      console.log('First record:', board[0]);
    }
  } catch (error) {
    console.error('Error fetching price board:', error);
  }
  console.log();

  console.log('=== Examples Complete ===');
}

main().catch(console.error);
