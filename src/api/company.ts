/**
 * Company adapter for company information and corporate data
 */

import { BaseAdapter } from '../core/base';
import { DataSource, CompanyProfile } from '../core/types';

export class Company extends BaseAdapter {
  constructor(
    source: string = DataSource.VCI,
    symbol: string = '',
    options?: {
      randomAgent?: boolean;
      showLog?: boolean;
    }
  ) {
    super('company', source, symbol, options);
  }

  /**
   * Fetch company profile information
   * 
   * @returns Promise of company profile data
   */
  async profile(): Promise<CompanyProfile> {
    return this.callMethod('profile');
  }

  /**
   * Fetch company officers/executives information
   * 
   * @returns Promise of officers data
   */
  async officers(): Promise<any[]> {
    return this.callMethod('officers');
  }

  /**
   * Fetch major shareholders information
   * 
   * @param pageSize - Number of records to fetch
   * @returns Promise of shareholders data
   */
  async shareholders(pageSize: number = 100): Promise<any[]> {
    return this.callMethod('shareholders', pageSize);
  }

  /**
   * Fetch company insider trades
   * 
   * @returns Promise of insider trades data
   */
  async insiderDeals(): Promise<any[]> {
    return this.callMethod('insiderDeals');
  }

  /**
   * Fetch subsidiary information
   * 
   * @returns Promise of subsidiaries data
   */
  async subsidiaries(): Promise<any[]> {
    return this.callMethod('subsidiaries');
  }
}
