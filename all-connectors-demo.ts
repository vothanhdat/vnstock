/**
 * Complete connector examples with all 4 implemented providers
 * 
 * Demonstrates VCI, TCBS, FMP, and DNSE usage
 */

import { Vnstock, Quote, ProviderRegistry, DNSETradingProvider } from './src/index';

async function main() {
  console.log('=== Vnstock TypeScript - All Connectors Demo ===\n');

  // List all registered providers
  console.log('📋 Registered Providers:');
  const quoteSources = ProviderRegistry.listSources('quote');
  const tradingSources = ProviderRegistry.listSources('trading');
  
  console.log('  Quote providers:', quoteSources.join(', '));
  console.log('  Trading providers:', tradingSources.join(', '));
  console.log();

  // Example 1: VCI - Vietnamese stocks via web scraping
  console.log('1️⃣  VCI Provider (Web Scraping - Vietnamese Stocks)');
  try {
    const vciQuote = new Quote('vci', 'ACB', { showLog: false });
    console.log('   ✅ VCI Quote instance created for ACB');
    console.log('   📊 Can fetch: Historical data, Intraday, Price depth');
  } catch (error: any) {
    console.log('   ⚠️  Error:', error.message);
  }
  console.log();

  // Example 2: TCBS - Vietnamese stocks via REST API
  console.log('2️⃣  TCBS Provider (REST API - Vietnamese Stocks)');
  try {
    const tcbsQuote = new Quote('tcbs', 'VNM', { showLog: false });
    console.log('   ✅ TCBS Quote instance created for VNM');
    console.log('   📊 Can fetch: Historical data (8 timeframes), Intraday');
    console.log('   🎯 Intervals: 1m, 5m, 15m, 30m, 1H, 1D, 1W, 1M');
  } catch (error: any) {
    console.log('   ⚠️  Error:', error.message);
  }
  console.log();

  // Example 3: TCBS with Vietnamese indices
  console.log('3️⃣  TCBS Provider (Vietnamese Indices)');
  try {
    const vnindexQuote = new Quote('tcbs', 'VNINDEX', { showLog: false });
    console.log('   ✅ TCBS Quote instance created for VNINDEX');
    console.log('   📈 Supports: VNINDEX, HNXINDEX, UPCOMINDEX');
  } catch (error: any) {
    console.log('   ⚠️  Error:', error.message);
  }
  console.log();

  // Example 4: FMP - Global stocks
  console.log('4️⃣  FMP Provider (REST API - Global Stocks)');
  if (process.env.FMP_API_KEY || process.env.FMP_TOKEN) {
    try {
      const fmpQuote = new Quote('fmp', 'AAPL', { showLog: false });
      console.log('   ✅ FMP Quote instance created for AAPL');
      console.log('   🌍 Can fetch: Historical, Intraday, Real-time quotes');
      console.log('   🔑 API key: Configured via environment variable');
    } catch (error: any) {
      console.log('   ⚠️  Error:', error.message);
    }
  } else {
    console.log('   ℹ️  Skipped - Set FMP_API_KEY environment variable');
    console.log('   📝 Get free key at: https://financialmodelingprep.com');
  }
  console.log();

  // Example 5: DNSE - Trading provider
  console.log('5️⃣  DNSE Provider (REST API - Trading)');
  try {
    const dnseTrading = new DNSETradingProvider();
    console.log('   ✅ DNSE Trading instance created');
    console.log('   🔐 Features: Login, Account info, Balance, OTP, Trading tokens');
    console.log('   📊 Status: Not authenticated');
    console.log('   ℹ️  Use login(username, password) to authenticate');
  } catch (error: any) {
    console.log('   ⚠️  Error:', error.message);
  }
  console.log();

  // Example 6: Using Vnstock client
  console.log('6️⃣  Vnstock Client Usage');
  try {
    const stock = new Vnstock();
    
    // VCI
    const acb = stock.stock('ACB', 'VCI');
    console.log('   ✅ Created VCI stock client for ACB');
    
    // TCBS
    const vnm = stock.stock('VNM', 'TCBS');
    console.log('   ✅ Created TCBS stock client for VNM');
    
    console.log('   📊 Both can use: quote.history(), company.profile(), finance.balanceSheet()');
  } catch (error: any) {
    console.log('   ⚠️  Error:', error.message);
  }
  console.log();

  // Example 7: Provider metadata
  console.log('7️⃣  Provider Metadata');
  const providers = ['vci', 'tcbs', 'fmp'];
  for (const provider of providers) {
    const metadata = ProviderRegistry.getMetadata('quote', provider);
    if (metadata) {
      console.log(`   ${provider.toUpperCase()}:`, {
        type: metadata.type,
        category: metadata.category,
      });
    }
  }
  
  const dnseMetadata = ProviderRegistry.getMetadata('trading', 'dnse');
  if (dnseMetadata) {
    console.log('   DNSE:', {
      type: dnseMetadata.type,
      category: dnseMetadata.category,
    });
  }
  console.log();

  // Example 8: Comparison table
  console.log('8️⃣  Connector Comparison');
  console.log('   ┌─────────┬──────────────┬────────────────┬───────────┐');
  console.log('   │ Provider│ Type         │ Market         │ API Key   │');
  console.log('   ├─────────┼──────────────┼────────────────┼───────────┤');
  console.log('   │ VCI     │ Web Scraping │ Vietnamese     │ No        │');
  console.log('   │ TCBS    │ REST API     │ Vietnamese     │ No        │');
  console.log('   │ FMP     │ REST API     │ Global         │ Yes       │');
  console.log('   │ DNSE    │ REST API     │ Trading        │ Yes       │');
  console.log('   └─────────┴──────────────┴────────────────┴───────────┘');
  console.log();

  console.log('=== Examples Complete ===');
  console.log('\n💡 Tips:');
  console.log('   - Use VCI for comprehensive Vietnamese stock data');
  console.log('   - Use TCBS for fast REST API access to Vietnamese stocks');
  console.log('   - Use FMP for global market data (requires free API key)');
  console.log('   - Use DNSE for trading operations (requires account)');
  console.log('\n✅ All 4 connectors are production-ready!');
}

// Run examples
main().catch(console.error);
