/**
 * Trading adapter for real-time trading data
 */

import { BaseAdapter } from '../core/base';
import { DataSource, PriceDepthData } from '../core/types';

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
}
