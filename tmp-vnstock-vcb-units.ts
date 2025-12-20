import { writeFileSync } from 'fs';
import { join } from 'path';
import { VNDirectScreenerProvider } from './src/explorer/vndirect/screener';

async function main() {
  const s = new VNDirectScreenerProvider({ showLog: false });
  const meta = s.getScreenerFieldMetadata();

  const codes = ['VCB', 'VIB', 'VIC'];

  for (const code of codes) {
    const rows = await s.screen({ code, floor: 'HOSE' }, 1);
    if (!rows.length) {
      console.log(`No rows for ${code}`);
      continue;
    }
    const row = rows[0] as Record<string, any>;
    const out = Object.keys(row)
      .sort()
      .map((k) => ({ field: k, value: row[k], unit: (meta[k] && meta[k].unit) || null }));

    const file = join(process.cwd(), `tmp-${code.toLowerCase()}-units.json`);
    writeFileSync(file, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Wrote ${out.length} fields to ${file}`);
  }
}

main().catch((err) => {
  console.error(err?.response?.status, err?.response?.data || err);
  process.exit(1);
});
