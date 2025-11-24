/**
 * Example usage of vnstock TypeScript library with VCI and FMP connectors
 * 
 * This demonstrates how to use the implemented connectors
 */

import { Vnstock, Quote, ProviderRegistry } from './src/index';

async function main() {
  console.log('=== Vnstock TypeScript - Connector Examples ===\n');

  // List all registered providers
  console.log('Registered Quote Providers:');
  const quoteSources = ProviderRegistry.listSources('quote');
  quoteSources.forEach(source => {
    const metadata = ProviderRegistry.getMetadata('quote', source);
    console.log(`  - ${source.toUpperCase()}: ${metadata?.type} provider`);
  });
  console.log();

  // Example 1: Using VCI provider through Vnstock client
  console.log('Example 1: VCI Provider via Vnstock Client');
  try {
    const vnstock = new Vnstock();
    const acb = vnstock.stock('ACB', 'VCI');
    
    console.log('Fetching ACB historical data from VCI...');
    const history = await acb.quote.history('2024-01-01', '2024-01-31');
    console.log(`Retrieved ${history.length} records`);
    if (history.length > 0) {
      console.log('Sample data:', history[0]);
    }
  } catch (error: any) {
    console.log('Error (expected for demo):', error.message);
  }
  console.log();

  // Example 2: Using VCI provider directly
  console.log('Example 2: VCI Provider Direct Usage');
  try {
    const quote = new Quote('vci', 'VNM', { showLog: false });
    console.log('Fetching VNM data from VCI...');
    const data = await quote.history('2024-01-01', '2024-01-31');
    console.log(`Retrieved ${data.length} records`);
  } catch (error: any) {
    console.log('Error (expected for demo):', error.message);
  }
  console.log();

  // Example 3: Using FMP provider (requires API key)
  console.log('Example 3: FMP Provider (API-based)');
  if (process.env.FMP_API_KEY || process.env.FMP_TOKEN) {
    try {
      const quote = new Quote('fmp', 'AAPL', { showLog: false });
      console.log('Fetching AAPL data from FMP...');
      const data = await quote.history('2024-01-01', '2024-01-31');
      console.log(`Retrieved ${data.length} records`);
      if (data.length > 0) {
        console.log('Sample data:', data[0]);
      }
    } catch (error: any) {
      console.log('Error:', error.message);
    }
  } else {
    console.log('Skipped - Set FMP_API_KEY environment variable to test FMP connector');
    console.log('Get your free API key at: https://financialmodelingprep.com');
  }
  console.log();

  // Example 4: Provider metadata
  console.log('Example 4: Provider Metadata');
  const vciMetadata = ProviderRegistry.getMetadata('quote', 'vci');
  console.log('VCI Provider Info:', {
    name: vciMetadata?.name,
    type: vciMetadata?.type,
    category: vciMetadata?.category,
  });
  
  const fmpMetadata = ProviderRegistry.getMetadata('quote', 'fmp');
  console.log('FMP Provider Info:', {
    name: fmpMetadata?.name,
    type: fmpMetadata?.type,
    category: fmpMetadata?.category,
  });
  console.log();

  console.log('=== Examples Complete ===');
  console.log('\nNote: Some examples may fail without actual API access or keys.');
  console.log('This demonstrates the provider architecture and registration system.');
}

// Run examples
main().catch(console.error);
