/**
 * Trading adapter for real-time trading data
 */

import { BaseAdapter } from '../core/base';
import { DataSource, PriceDepthData, LocalizedFieldInfo, ScreenerFieldInfo } from '../core/types';

export class Trading extends BaseAdapter {
  constructor(
    source: string = DataSource.VCI,
    options?: {
      randomAgent?: boolean;
      showLog?: boolean;
    }
  ) {
    super('trading', source, undefined, options);
  }

  /**
   * Fetch real-time price board data
   * 
   * @param symbols - List of symbols (undefined = all)
   * @returns Promise of price board data
   */
  async priceBoard(symbols?: string[]): Promise<any[]> {
    return this.callMethod('priceBoard', symbols);
  }

  /**
   * Fetch order book / price depth data
   * 
   * @param symbol - Stock symbol
   * @returns Promise of price depth data
   */
  async priceDepth(symbol: string): Promise<PriceDepthData> {
    return this.callMethod('priceDepth', symbol);
  }

  /**
   * Fetch intraday price data
   * 
   * @param symbol - Stock symbol
   * @param pageSize - Number of records
   * @returns Promise of intraday data
   */
  async intraday(symbol: string, pageSize: number = 100): Promise<any[]> {
    return this.callMethod('intraday', symbol, pageSize);
  }

  /**
   * Get price board field metadata (if supported by provider)
   * Returns definitions of fields including labels, tooltips, units, etc.
   * 
   * @param lang - Language for metadata (default: 'en')
   */
  async getFieldMetadata(lang: 'vi' | 'en' = 'en'): Promise<Record<string, LocalizedFieldInfo>> {
    if (this._provider.getPriceBoardMetadata) {
      const raw = this._provider.getPriceBoardMetadata() as Record<string, ScreenerFieldInfo>;
      const result: Record<string, LocalizedFieldInfo> = {};
      
      for (const [key, field] of Object.entries(raw)) {
        // Helper to get localized value with fallback
        const getVal = (obj: any) => {
          if (!obj) return undefined;
          return obj[lang] || obj['en'] || obj['vi'];
        };

        result[key] = {
          key: field.key,
          label: getVal(field.label) || field.key,
          tooltip: getVal(field.tooltip),
          unit: (typeof field.unit === 'object' && field.unit !== null) ? getVal(field.unit) : field.unit,
          type: field.type,
          values: field.values
        };
      }
      return result;
    }
    return {};
  }
}
