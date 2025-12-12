import { SimplizeScreenerProvider } from './src/explorer/simplize/screener';

async function main() {
  const screener = new SimplizeScreenerProvider();
  console.log('Testing Simplize Screener...');
  
  const criteria = {
    marketCapVnd: { min: 1000, max: 10000 },
    stockExchange: ['HOSE']
  };

  console.log('Screening with criteria:', JSON.stringify(criteria, null, 2));
  
  try {
    const results = await screener.screen(criteria);
    console.log(`Found ${results.length} results.`);
    if (results.length > 0) {
      console.log('First result record:');
      console.log(results[0]);
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
