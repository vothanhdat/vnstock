import { VNDirectScreenerProvider } from './src/explorer/vndirect/screener';

async function main() {
  const screener = new VNDirectScreenerProvider({ showLog: true });

  console.log('Testing with limited fields...');
  try {
    const limited = await screener.screen({ 
        floor: 'HOSE,HNX,UPCOM',
        sort: 'nmValCr:desc'
    }, 5);
    console.log(`Limited fields count: ${limited.length}`);
    limited.forEach(r => {
        console.log(`${r.code} - Vol: ${r.nmVolCr}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main();
