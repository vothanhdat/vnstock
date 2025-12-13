import { VNDirectScreenerProvider } from './src/explorer/vndirect/screener';
import { VNDirectPriceBoard } from './src/explorer/vndirect/priceboard';
import './src/explorer/vndirect'; // Register VNDirect providers
import { Trading } from './src/api/trading';
import { DataSource } from './src/core/types';

async function main() {
  console.log('=== VNDirect Screener Examples ===\n');

  const screener = new VNDirectScreenerProvider({ showLog: true });

  console.log('1. Testing Metadata...');
  const metadata = screener.getScreenerFieldMetadata();
  console.log(`Total fields: ${Object.keys(metadata).length}`);
  console.log('Sample field (roeYr):', metadata['roeYr']);
  console.log('Sample field (marketCap):', metadata['marketCap']);
  console.log();

  try {
    console.log('2. Testing Top Gainers (Sort by priceChgPctCr)...');
    try {
        const gainers = await screener.screen({ 
            floor: 'HOSE,HNX,UPCOM',
            sort: 'priceChgPctCr:desc'
        }, 5);
        console.log('Top 5 Gainers:');
        gainers.forEach(r => {
            console.log(`${r.code} - Price: ${r.priceCr} - Change: ${r.priceChgPctCr}%`);
        });
    } catch (e) {
        console.log('Failed with priceChgPctCr');
    }
    console.log();

    console.log('2b. Testing Top Gainers (Sort by priceChgPctCr1m)...');
    try {
        const gainers = await screener.screen({ 
            floor: 'HOSE,HNX,UPCOM',
            sort: 'priceChgPctCr1m:desc'
        }, 5);
        console.log('Top 5 Gainers (1m):');
        gainers.forEach(r => {
            console.log(`${r.code} - Price: ${r.priceCr} - Change 1m: ${r.priceChgPctCr1m}%`);
        });
    } catch (e) {
        console.log('Failed with priceChgPctCr1m');
    }
    console.log();

    console.log('3. Testing Top Volume (Sort by nmVolCr)...');
    try {
        const volume = await screener.screen({ 
            floor: 'HOSE,HNX,UPCOM',
            sort: 'nmVolCr:desc'
        }, 5);
        console.log(`Top 5 Volume (Count: ${volume.length}):`);
        volume.forEach(r => {
            console.log(`${r.code} - Price: ${r.priceCr} - Volume: ${r.nmVolCr} (Raw) - Value: ${r.nmValCr}`);
        });
    } catch (e) {
        console.log('Failed with nmVolCr');
    }
    console.log();

    console.log('4. Testing Top Value (Sort by nmValCr)...');
    try {
        const value = await screener.screen({ 
            floor: 'HOSE,HNX,UPCOM',
            sort: 'nmValCr:desc'
        }, 5);
        console.log(`Top 5 Value (Count: ${value.length}):`);
        value.forEach(r => {
            console.log(`${r.code} - Price: ${r.priceCr} - Volume: ${r.nmVolCr} - Value: ${r.nmValCr}`);
        });
    } catch (e) {
        console.log('Failed with nmValCr');
    }
    console.log();

    console.log('5. Testing Custom Filters (PE [5, 10], Market Cap > 1000)...');
    try {
        const filtered = await screener.screen({ 
            floor: 'HOSE',
            peCr: [5, 10],
            marketCapCr: { condition: 'GT', value: 1000 },
            sort: 'marketCapCr:desc'
        }, 5);
        console.log(`Top 5 Filtered (Count: ${filtered.length}):`);
        filtered.forEach(r => {
            console.log(`${r.code} - Price: ${r.priceCr} - PE: ${r.peCr} - Market Cap: ${r.marketCapCr}`);
        });
    } catch (e) {
        console.log('Failed with custom filters');
        console.error(e);
    }
    console.log();

    console.log('6. Testing Single Stock Full Details (VCB)...');
    try {
        const vcb = await screener.screen({ 
            code: 'VCB'
        });
        if (vcb.length > 0) {
            console.log('VCB Full Details:');
            console.log(JSON.stringify(vcb[0], null, 2));
        } else {
            console.log('VCB not found');
        }
    } catch (e) {
        console.log('Failed to get VCB details');
        console.error(e);
    }
    console.log();

    console.log('=== VNDirect Price Board Examples ===\n');
    const priceBoard = new VNDirectPriceBoard();
    
    console.log('1. Fetching HOSE Price Board (Floor 10)...');
    try {
        const hoseData = await priceBoard.fetch('10');
        console.log(`Fetched ${hoseData.length} records.`);
        if (hoseData.length > 0) {
            console.log('Sample Record (First):');
            console.log(JSON.stringify(hoseData[0], null, 2));
        }
    } catch (e) {
        console.error('Failed to fetch HOSE price board:', e);
    }
    console.log();

    console.log('=== VNDirect Trading Adapter Examples ===\n');
    const trading = new Trading(DataSource.VNDIRECT);

    console.log('1. Fetching All Price Board Data (HOSE, HNX, UPCOM)...');
    try {
        const allData = await trading.priceBoard();
        console.log(`Fetched ${allData.length} records from all markets.`);
    } catch (e) {
        console.error('Failed to fetch all price board data:', e);
    }
    console.log();

    console.log('2. Fetching Specific Symbols (VNM, HPG, FPT)...');
    try {
        const symbols = ['VNM', 'HPG', 'FPT'];
        const specificData = await trading.priceBoard(symbols);
        console.log(`Fetched ${specificData.length} records.`);
        specificData.forEach(d => {
            console.log(`${d.code}: Price ${d.matchPrice}, Vol ${d.matchQtty}`);
        });
    } catch (e) {
        console.error('Failed to fetch specific symbols:', e);
    }
    console.log();

    console.log('3. Fetching Metadata...');
    try {
        const metadata = await trading.getFieldMetadata('vi');
        console.log('Metadata (Vietnamese):');
        console.log(JSON.stringify(metadata, null, 2));
    } catch (e) {
        console.error('Failed to fetch metadata:', e);
    }
    console.log();

  } catch (error) {
    console.error('Error running examples:', error);
  }
}

main();
