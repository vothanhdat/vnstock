/**
 * Listing adapter for symbol listing and market data
 */

import { BaseAdapter } from '../core/base';
import { DataSource } from '../core/types';

export class Listing extends BaseAdapter {
  constructor(
    source: string = DataSource.VCI,
    options?: {
      randomAgent?: boolean;
      showLog?: boolean;
    }
  ) {
    super('listing', source, undefined, options);
  }

  /**
   * Get list of all available symbols
   * 
   * @returns Promise of symbol array
   */
  async allSymbols(): Promise<string[]> {
    return this.callMethod('allSymbols');
  }

  /**
   * Get symbols filtered by exchange
   * 
   * @param exchange - Exchange code (HOSE, HNX, UPCOM)
   * @returns Promise of symbol array
   */
  async symbolsByExchange(exchange: string): Promise<string[]> {
    return this.callMethod('symbolsByExchange', exchange);
  }

  /**
   * Get symbols grouped by industries
   * 
   * @returns Promise of symbols with industry mapping
   */
  async symbolsByIndustries(): Promise<any[]> {
    return this.callMethod('symbolsByIndustries');
  }

  /**
   * Get all listed companies data
   * 
   * @returns Promise of company listing data
   */
  async allCompanies(): Promise<any[]> {
    return this.callMethod('allCompanies');
  }
}
