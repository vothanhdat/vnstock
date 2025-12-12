import axios from 'axios';
import { getLogger } from '../../core/logger';
import metadata from './info.json';

const logger = getLogger('Simplize.Screener');

export class SimplizeScreenerProvider {
  private headers: Record<string, string>;

  constructor(config?: { randomAgent?: boolean; showLog?: boolean }) {
    this.headers = {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
      'content-type': 'application/json;charset=UTF-8',
      'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'Referer': 'https://simplize.vn/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    };
  }

  async screen(params: Record<string, any>): Promise<any[]> {
    const url = 'https://api2.simplize.vn/api/company/screener/filter';
    
    const rules: any[] = [];

    // Helper to find unit from metadata
    const findUnit = (id: string): number => {
      for (const section of (metadata as any[])) {
        const criterion = section.criteria?.find((c: any) => c.id === id);
        if (criterion) return criterion.unit || 1;
      }
      return 1;
    };

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;

      const unit = findUnit(key);

      if (typeof value === 'object' && !Array.isArray(value)) {
        const valObj = value as any;
        if (valObj.min !== undefined) {
          rules.push({
            id: key,
            val: Number(valObj.min) * unit,
            op: '>='
          });
        }
        if (valObj.max !== undefined) {
          rules.push({
            id: key,
            val: Number(valObj.max) * unit,
            op: '<='
          });
        }
        if (valObj.value !== undefined) {
           // Handle specific value equality if needed, or array
           // For now, assuming simple equality for non-array
           if (!Array.isArray(valObj.value)) {
             rules.push({
               id: key,
               val: valObj.value,
               op: '='
             });
           } else {
             // For arrays (MULTI_SELECT), we might need multiple rules or 'IN' operator?
             // The example doesn't specify, but let's try adding multiple '=' rules or check if 'IN' works
             // Simplize likely uses OR logic for same ID? Or maybe 'IN' operator.
             // Let's try 'IN' if it's an array
             rules.push({
                id: key,
                val: valObj.value,
                op: 'in'
             });
           }
        }
      } else {
        // Direct value
        if (Array.isArray(value)) {
             rules.push({
                id: key,
                val: value,
                op: 'in'
             });
        } else {
             rules.push({
               id: key,
               val: value,
               op: '='
             });
        }
      }
    }

    const payload = {
      page: 0,
      size: 2000,
      rules: JSON.stringify(rules),
      sort: JSON.stringify({ id: "marketCapVnd", direction: "DESC" })
    };
    try {
      const response = await axios.post(url, payload, { headers: this.headers });
      return (response.data as any)?.data || [];
    } catch (error) {
      logger.error('Simplize screener error:', error);
      throw error;
    }
  }
}

