/**
 * Quote adapter for historical and intraday quote data
 */

import { BaseAdapter } from '../core/base';
import { DataSource, TimeFrame, QuoteData } from '../core/types';

export class Quote extends BaseAdapter {
  constructor(
    source: string = DataSource.VCI,
    symbol: string = '',
    options?: {
      randomAgent?: boolean;
      showLog?: boolean;
    }
  ) {
    super('quote', source, symbol, options);
  }

  /**
   * Fetch historical price data
   * 
   * @param startDate - Start date (YYYY-MM-DD) or options object
   * @param endDate - End date (YYYY-MM-DD)
   * @param resolution - Time resolution (1D, 1W, 1M, etc.)
   * @returns Promise of quote data array
   */
  async history(
    startDate: string | { start: string; end?: string; interval?: string; countBack?: number; showLog?: boolean },
    endDate?: string,
    resolution: string = TimeFrame.DAILY
  ): Promise<QuoteData[]> {
    // Support MSN-style object parameter
    if (typeof startDate === 'object') {
      return this.callMethod('history', startDate);
    }
    return this.callMethod('history', startDate, endDate, resolution);
  }

  /**
   * Fetch intraday trading data
   * 
   * @param pageSize - Number of records to fetch
   * @returns Promise of intraday quote data
   */
  async intraday(pageSize: number = 100): Promise<QuoteData[]> {
    return this.callMethod('intraday', pageSize);
  }

  /**
   * Fetch price depth / order book data
   * 
   * @returns Promise of price depth data
   */
  async priceDepth(): Promise<any> {
    return this.callMethod('priceDepth');
  }
}
