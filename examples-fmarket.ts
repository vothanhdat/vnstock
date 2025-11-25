import { FMarketFundProvider } from './src/explorer/fmarket/fund';

async function main() {
  const provider = new FMarketFundProvider();

  console.log('--- FMarket Fund Listing (STOCK) ---');
  try {
    const funds = await provider.listing('STOCK');
    console.log(`Found ${funds.length} stock funds.`);
    if (funds.length > 0) {
      console.log('First fund:', funds[0]);
    }
  } catch (e) {
    console.error('Listing error:', e);
  }

  console.log('\n--- FMarket Fund Filter (SSISCA) ---');
  let fundId = 0;
  try {
    const funds = await provider.filter('SSISCA');
    console.log('Found funds:', funds);
    if (funds.length > 0) {
      fundId = funds[0].id;
    }
  } catch (e) {
    console.error('Filter error:', e);
  }

  if (fundId) {
    console.log(`\n--- Details for Fund ID ${fundId} ---`);
    
    try {
      const top = await provider.topHolding(fundId);
      console.log(`Top Holdings (${top.length}):`, top.slice(0, 2));
    } catch (e) { console.error('Top Holding error:', e); }

    try {
      const ind = await provider.industryHolding(fundId);
      console.log(`Industry Holdings (${ind.length}):`, ind.slice(0, 2));
    } catch (e) { console.error('Industry Holding error:', e); }

    try {
      const nav = await provider.navReport(fundId);
      console.log(`NAV Report (${nav.length}):`, nav.slice(0, 2));
    } catch (e) { console.error('NAV Report error:', e); }

    try {
      const asset = await provider.assetHolding(fundId);
      console.log(`Asset Holdings (${asset.length}):`, asset);
    } catch (e) { console.error('Asset Holding error:', e); }
  }
}

main();
