import axios from 'axios';
import { getLogger } from '../../core/logger';
import metadata from './info.json';

const logger = getLogger('Simplize.Screener');

const TRANSLATION_MAP: Record<string, string> = {
  // Basic Info
  'stockExchange': 'Exchange',
  'marketCapVnd': 'Market Cap',
  'beta5y': 'Beta (5Y)',
  
  // Price & Volatility
  'priceClose': 'Close Price',
  'pricePctChgIntraDay': '% Price Change (Intraday)',
  'pricePctChg7d': '% Price Change (1W)',
  'pricePctChg30d': '% Price Change (1M)',
  'priceUpStreak': 'Consecutive Price Increase',
  'priceDownStreak': 'Consecutive Price Decrease',
  'priceClosePeak': 'Price Breakout (Peak)',
  'priceCloseTrough': 'Price Breakout (Trough)',
  
  // Volume
  'volume': 'Volume',
  'volume10dAvg': 'Avg Volume (10D)',
  'volumeUpStreak': 'Consecutive Volume Increase',
  'volumeDownStreak': 'Consecutive Volume Decrease',
  
  // Financial Report
  'financialReportPeriod': 'Financial Report Period',
  
  // Valuation
  'marginOfSafety': 'Margin of Safety',
  'netCashToMarketCap': 'Net Cash / Market Cap',
  'peRatio': 'P/E Ratio',
  'pbRatio': 'P/B Ratio',
  'evEbitdaRatio': 'EV/EBITDA',
  
  // Growth
  'revenueGrowthPreQ': 'Revenue Growth (QoQ)',
  'revenueGrowthQoq': 'Revenue Growth (YoY)',
  'revenueLtmGrowth': 'Revenue Growth (LTM YoY)',
  'revenue5yGrowth': 'Revenue Growth (5Y Avg)',
  'revenueEstGrowth': 'Revenue Growth (3Y Est)',
  'netIncomeGrowthPreQ': 'Net Income Growth (QoQ)',
  'netIncomeGrowthQoq': 'Net Income Growth (YoY)',
  'netIncomeLtmGrowth': 'Net Income Growth (LTM YoY)',
  'netIncome5yGrowth': 'Net Income Growth (5Y Avg)',
  'netIncomeEstGrowth': 'Net Income Growth (3Y Est)',
  'epsGrowthPreQ': 'EPS Growth (QoQ)',
  'epsGrowthQoq': 'EPS Growth (YoY)',
  'epsLtmGrowthPreQ': 'EPS Growth (LTM QoQ)',
  'epsLtmGrowthQoq': 'EPS Growth (LTM YoY)',
  
  // Efficiency
  'grossMarginLtm': 'Gross Margin (LTM)',
  'profitMarginLtm': 'Net Profit Margin (LTM)',
  'returnOnEquity': 'ROE (LTM)',
  'returnOnAssets': 'ROA (LTM)',
  
  // Financial Health
  'debtToEquity': 'D/E Ratio',
  'assetsToEquity': 'Assets / Equity',
  'casaRatio': 'CASA Ratio',
  'nonPerformingLoanRatioLtm': 'NPL Ratio',
  'provisionLoanRatioLtm': 'Loan Loss Provision Ratio',
  
  // Dividend
  'dividendYieldCurrent': 'Dividend Yield',
  'countCashDiv': 'Consecutive Cash Dividend',
  
  // Balance Sheet
  'constructionInProgressPct': 'CIP / Total Assets',
  'constructionInProgressGrowthPreQ': 'CIP Growth (QoQ)',
  'netInventoriesPct': 'Inventory / Total Assets',
};

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

  getScreenerFieldMetadata(): Record<string, any> {
    const fields: Record<string, any> = {};

    for (const group of (metadata as any[])) {
      if (group.criteria) {
        for (const item of group.criteria) {
          fields[item.id] = {
            key: item.id,
            label: {
              vi: item.name,
              en: TRANSLATION_MAP[item.id] || item.name // Use translation or fallback to VI name
            },
            tooltip: item.tooltip ? {
                vi: item.tooltip,
                en: item.tooltip // Tooltips might need translation too, but skipping for now
            } : null,
            // unit: item.suffix || null,
            type: item.type,
            values: item.options ? item.options.map((opt: any) => ({
              value: opt.value,
              label: {
                vi: opt.label,
                en: opt.label // Option labels might need translation too
              }
            })) : null,
            group: group.name
          };
        }
      }
    }

    return fields;
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

