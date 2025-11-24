/**
 * Finance adapter for financial statements and ratios
 */

import { BaseAdapter } from '../core/base';
import { DataSource, FinancialData } from '../core/types';

export class Finance extends BaseAdapter {
  constructor(
    source: string = DataSource.VCI,
    symbol: string = '',
    options?: {
      randomAgent?: boolean;
      showLog?: boolean;
    }
  ) {
    super('financial', source, symbol, options);
  }

  /**
   * Fetch balance sheet data
   * 
   * @param period - 'quarter' or 'year'
   * @param dropna - Whether to drop NA values
   * @returns Promise of balance sheet data
   */
  async balanceSheet(
    period: string = 'quarter',
    dropna: boolean = true
  ): Promise<FinancialData[]> {
    return this.callMethod('balanceSheet', period, dropna);
  }

  /**
   * Fetch income statement data
   * 
   * @param period - 'quarter' or 'year'
   * @param dropna - Whether to drop NA values
   * @returns Promise of income statement data
   */
  async incomeStatement(
    period: string = 'quarter',
    dropna: boolean = true
  ): Promise<FinancialData[]> {
    return this.callMethod('incomeStatement', period, dropna);
  }

  /**
   * Fetch cash flow statement data
   * 
   * @param period - 'quarter' or 'year'
   * @param dropna - Whether to drop NA values
   * @returns Promise of cash flow data
   */
  async cashFlow(
    period: string = 'quarter',
    dropna: boolean = true
  ): Promise<FinancialData[]> {
    return this.callMethod('cashFlow', period, dropna);
  }

  /**
   * Fetch financial ratios
   * 
   * @param period - 'quarter' or 'year'
   * @param dropna - Whether to drop NA values
   * @returns Promise of financial ratios
   */
  async ratios(
    period: string = 'quarter',
    dropna: boolean = true
  ): Promise<any[]> {
    return this.callMethod('ratios', period, dropna);
  }
}
