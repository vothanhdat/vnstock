import { writeFileSync } from 'fs';
import { join } from 'path';
import { SimplizeScreenerProvider } from './src/explorer/simplize/screener';

async function main() {
  const provider = new SimplizeScreenerProvider({});
  const meta = provider.getScreenerFieldMetadata();

  const tickers = ['VIC', 'VCB', 'VHM'];

  for (const ticker of tickers) {
    const rows = await provider.screen({ ticker });
    if (!rows || !rows.length) {
      console.log(`No rows for ${ticker}`);
      continue;
    }
    const row = rows[0] as Record<string, any>;
    const out = Object.keys(row)
      .sort()
      .map((k) => ({ field: k, value: row[k], unit: meta[k]?.unit ?? null }));

    const file = join(process.cwd(), `tmp-simplize-${ticker.toLowerCase()}-units.json`);
    writeFileSync(file, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Wrote ${out.length} fields to ${file}`);
  }
}

main().catch((err) => {
  console.error(err?.response?.status, err?.response?.data || err);
  process.exit(1);
});
