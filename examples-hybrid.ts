/**
 * Hybrid Example: TCBS Data + DNSE Trading
 * 
 * This example demonstrates how to combine:
 * 1. TCBS Provider: To fetch public market data (Price, Analysis, Screener)
 * 2. DNSE Provider: To execute trades based on that data
 */

import { Vnstock, DataSource, TimeFrame } from './src/index';
import { DNSETradingProvider } from './src/connector/dnse/trading';

async function main() {
  console.log('=== Vnstock Hybrid Example (TCBS Data + DNSE Trading) ===\n');

  // 1. Setup Providers
  const vnstock = new Vnstock();
  const dnse = new DNSETradingProvider();

  // Credentials (Update these to run)
  const DNSE_USER = 'YOUR_USERNAME';
  const DNSE_PASS = 'YOUR_PASSWORD';

  // 2. DATA PHASE (Using TCBS - No Login Required)
  console.log('--- Phase 1: Market Analysis (TCBS) ---');
  
  const symbol = 'VNM';
  const stock = vnstock.stock(symbol, DataSource.TCBS);

  try {
    // A. Get Real-time Price
    console.log(`Fetching real-time price for ${symbol}...`);
    // Note: Using quote.intraday as a proxy for current price in this example
    const intraday = await stock.quote.intraday(1);
    
    if (intraday.length === 0) {
      console.error('No price data found. Exiting.');
      return;
    }

    const currentPrice = intraday[0].close; // Using close price as current price
    console.log(`Current Price: ${currentPrice}`);

    // B. Get Financial Health
    console.log(`Checking financial health...`);
    const profile = await stock.company.profile();
    // Note: TCBS returns camelCase keys, but the interface might expect snake_case.
    // We cast to any to access the raw property for this example.
    console.log(`Company: ${(profile as any).companyName}`);
    // In a real bot, you would analyze PE, PB, etc. here

  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }

  // 3. EXECUTION PHASE (Using DNSE - Login Required)
  console.log('\n--- Phase 2: Trade Execution (DNSE) ---');

  if (DNSE_USER === 'YOUR_USERNAME') {
    console.log('Skipping execution phase (Missing Credentials)');
    console.log('Update DNSE_USER and DNSE_PASS in examples-hybrid.ts to test trading.');
    return;
  }

  try {
    // A. Login
    console.log(`Logging in to DNSE...`);
    const token = await dnse.login(DNSE_USER, DNSE_PASS);
    if (!token) return;

    // B. Get Account
    const subAccounts = await dnse.subAccounts();
    if (!subAccounts || subAccounts.length === 0) {
      console.error('No sub-accounts found.');
      return;
    }
    const myAccount = subAccounts[0].accountNumber;
    console.log(`Trading Account: ${myAccount}`);

    // C. Check Buying Power
    // Let's say we want to buy 100 shares at current price
    const targetPrice = 65000; // Use real price from Phase 1 in production
    const quantity = 100;
    
    console.log(`Checking buying power for ${quantity} ${symbol} @ ${targetPrice}...`);
    const capacity = await dnse.tradeCapacities(symbol, targetPrice, myAccount);
    console.log('Buying Power:', capacity);

    // D. Place Order (Commented out for safety)
    /*
    console.log('Placing order...');
    // You need to handle OTP flow here for production
    // await dnse.emailOtp();
    // const tradingToken = await dnse.getTradingToken('OTP_CODE');
    
    // const order = await dnse.placeOrder(
    //   myAccount,
    //   symbol,
    //   'buy',
    //   quantity,
    //   targetPrice,
    //   'LO'
    // );
    // console.log('Order Placed:', order);
    */

  } catch (error) {
    console.error('Trading error:', error);
  }

  console.log('\n=== Hybrid Example Complete ===');
}

main().catch(console.error);
