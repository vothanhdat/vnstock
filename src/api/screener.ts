/**
 * Screener adapter for stock screening
 */

import { BaseAdapter } from '../core/base';
import { DataSource, ScreenerFieldInfo, LocalizedScreenerFieldInfo } from '../core/types';

export class Screener extends BaseAdapter {
  constructor(
    source: string = DataSource.VCI,
    options?: {
      randomAgent?: boolean;
      showLog?: boolean;
    }
  ) {
    super('screener', source, undefined, options);
  }

  /**
   * Screen stocks based on criteria
   * 
   * @param criteria - Dictionary of screening criteria
   * @returns Promise of filtered stocks
   */
  async screen(criteria: Record<string, any>, ...args: any[]): Promise<any[]> {
    return this.callMethod('screen', criteria, ...args);
  }

  /**
   * Get top gainers
   * 
   * @param limit - Number of results
   * @returns Promise of top gainers
   */
  async topGainers(limit: number = 10): Promise<any[]> {
    return this.callMethod('topGainers', limit);
  }

  /**
   * Get top losers
   * 
   * @param limit - Number of results
   * @returns Promise of top losers
   */
  async topLosers(limit: number = 10): Promise<any[]> {
    return this.callMethod('topLosers', limit);
  }

  /**
   * Get top volume
   * 
   * @param limit - Number of results
   * @returns Promise of top volume stocks
   */
  async topVolume(limit: number = 10): Promise<any[]> {
    return this.callMethod('topVolume', limit);
  }

  /**
   * Get top value
   * 
   * @param limit - Number of results
   * @returns Promise of top value stocks
   */
  async topValue(limit: number = 10): Promise<any[]> {
    return this.callMethod('topValue', limit);
  }

  /**
   * Get screener field metadata (if supported by provider)
   * Returns definitions of fields including labels, tooltips, units, etc.
   * 
   * @param lang - Language for metadata (default: 'en')
   */
  async getFieldMetadata(lang: 'vi' | 'en' = 'en'): Promise<Record<string, LocalizedScreenerFieldInfo>> {
    if (this._provider.getScreenerFieldMetadata) {
      const raw = this._provider.getScreenerFieldMetadata() as Record<string, ScreenerFieldInfo>;
      const result: Record<string, LocalizedScreenerFieldInfo> = {};

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
