/**
 * Example usage of vnstock TypeScript library
 * 
 * This file demonstrates how to use the vnstock library in TypeScript.
 * Note: This example requires actual provider implementations to be registered.
 */

import { Vnstock, Quote, DataSource, TimeFrame, ProviderRegistry } from './src/index';

// Example: Register mock providers for demonstration
class MockQuoteProvider {
  constructor(private config?: any) {}

  async history(startDate: string, endDate: string, resolution: string = '1D') {
    // This would fetch actual data from an API
    console.log(`Fetching history for ${this.config?.symbol} from ${startDate} to ${endDate} with resolution ${resolution}`);
    return [
      {
        symbol: this.config?.symbol || 'ACB',
        time: new Date('2024-01-01'),
        open: 100,
        high: 105,
        low: 98,
        close: 103,
        volume: 1000000,
      },
      {
        symbol: this.config?.symbol || 'ACB',
        time: new Date('2024-01-02'),
        open: 103,
        high: 107,
        low: 102,
        close: 106,
        volume: 1200000,
      },
    ];
  }

  async intraday(pageSize: number = 100) {
    console.log(`Fetching intraday data for ${this.config?.symbol}, page size: ${pageSize}`);
    return [
      {
        symbol: this.config?.symbol || 'ACB',
        time: new Date(),
        open: 106,
        high: 108,
        low: 105,
        close: 107,
        volume: 50000,
      },
    ];
  }

  async priceDepth() {
    return {
      bids: [
        { price: 106.5, volume: 1000 },
        { price: 106.0, volume: 2000 },
      ],
      asks: [
        { price: 107.0, volume: 1500 },
        { price: 107.5, volume: 2500 },
      ],
    };
  }
}

// Generic mock provider for other modules
class MockProvider {
  constructor(private config?: any) {}
  
  async profile() {
    return { symbol: this.config?.symbol, name: 'Mock Company' };
  }
  
  async balanceSheet() {
    return [];
  }
  
  async allSymbols() {
    return ['ACB', 'VNM', 'VCB'];
  }
  
  async priceBoard() {
    return [];
  }
  
  async screen() {
    return [];
  }
}

// Register all providers
ProviderRegistry.register('quote', 'vci', MockQuoteProvider);
ProviderRegistry.register('company', 'vci', MockProvider);
ProviderRegistry.register('financial', 'vci', MockProvider);
ProviderRegistry.register('listing', 'vci', MockProvider);
ProviderRegistry.register('trading', 'vci', MockProvider);
ProviderRegistry.register('screener', 'vci', MockProvider);

async function main() {
  console.log('=== Vnstock TypeScript Examples ===\n');

  // Example 1: Basic usage
  console.log('Example 1: Basic Stock Data');
  const vnstock = new Vnstock();
  const acb = vnstock.stock('ACB');
  
  const history = await acb.quote.history('2024-01-01', '2024-12-31', TimeFrame.DAILY);
  console.log('Historical data:', history);
  console.log();

  // Example 2: Using specific data source
  console.log('Example 2: Using Specific Data Source');
  const quote = new Quote(DataSource.VCI, 'VNM');
  const intradayData = await quote.intraday(50);
  console.log('Intraday data:', intradayData);
  console.log();

  // Example 3: Price depth
  console.log('Example 3: Price Depth');
  const priceDepth = await acb.quote.priceDepth();
  console.log('Price depth:', priceDepth);
  console.log();

  // Example 4: Different time frames
  console.log('Example 4: Different Time Frames');
  console.log('Available time frames:');
  console.log('- Daily:', TimeFrame.DAILY);
  console.log('- Weekly:', TimeFrame.WEEKLY);
  console.log('- Monthly:', TimeFrame.MONTHLY);
  console.log('- Minute (1m):', TimeFrame.MINUTE_1);
  console.log('- Hour (1H):', TimeFrame.HOUR_1);
  console.log();

  // Example 5: Constants usage
  console.log('Example 5: Market Constants');
  const { INDICES_INFO, SECTOR_IDS, EXCHANGES } = await import('./src/constants');
  console.log('VN30 Index Info:', INDICES_INFO['VN30']);
  console.log('Sector 138 (Finance):', SECTOR_IDS[138]);
  console.log('HOSE Exchange:', EXCHANGES['HOSE']);
  console.log();

  console.log('=== Examples Complete ===');
}

// Run examples
main().catch(console.error);
