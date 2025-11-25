import { Vnstock } from './src/index';

async function main() {
  console.log('\n=== MSN Provider Examples ===\n');

  // Example 1: Search for symbols
  console.log('1. Searching for symbols...');
  const vnstock = new Vnstock();
  const listing = vnstock.stock(undefined, 'MSN').listing;
  
  try {
    const results = await listing.searchSymbolId('BTCUSD', 'en-us', 10);
    console.log('Search results for BTCUSD:', JSON.stringify(results.slice(0, 3), null, 2));
  } catch (error) {
    console.error('Error searching symbols:', error);
  }

  // Example 2: Get historical data for cryptocurrency
  console.log('\n2. Getting BTC historical data...');
  const btc = vnstock.stock('c2111', 'MSN'); // BTC symbol ID
  
  try {
    const history = await btc.quote.history({
      start: '2024-01-01',
      end: '2024-01-31',
      interval: '1D',
      countBack: 10
    });
    console.log('BTC Price History (last 10 days):', JSON.stringify(history.slice(0, 3), null, 2));
  } catch (error) {
    console.error('Error fetching BTC history:', error);
  }

  // Example 3: Get currency exchange rate data
  console.log('\n3. Getting USD/VND exchange rate...');
  const usdvnd = vnstock.stock('avyufr', 'MSN'); // USDVND symbol ID
  
  try {
    const history = await usdvnd.quote.history({
      start: '2024-11-01',
      end: '2024-11-25',
      interval: '1D',
      countBack: 5
    });
    console.log('USD/VND Exchange Rate (last 5 days):', JSON.stringify(history, null, 2));
  } catch (error) {
    console.error('Error fetching USD/VND history:', error);
  }

  // Example 4: Search for Vietnamese stocks on MSN
  console.log('\n4. Searching for Vietnamese stocks...');
  
  try {
    const vnResults = await listing.searchSymbolId('VNM', 'vi-vn', 5);
    console.log('Search results for VNM:', JSON.stringify(vnResults, null, 2));
  } catch (error) {
    console.error('Error searching VN stocks:', error);
  }
}

main().catch(console.error);
