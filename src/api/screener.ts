/**
 * Screener adapter for stock screening
 */

import { BaseAdapter } from '../core/base';
import { DataSource } from '../core/types';

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
  async screen(criteria: Record<string, any>): Promise<any[]> {
    return this.callMethod('screen', criteria);
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
}
