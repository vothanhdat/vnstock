import axios from 'axios';
import { getLogger } from '../../core/logger';
import { QuoteData, TimeFrame } from '../../core/types';
import { XNOConfig } from './config';
import { ENDPOINTS, OHLC_RENAME } from './const';

const logger = getLogger('XNO.Quote');

export class XNOQuoteProvider {
  private symbol: string;
  private config: XNOConfig;

  constructor(config: { symbol: string; apiKey?: string; showLog?: boolean }) {
    this.symbol = config.symbol.toUpperCase();
    this.config = new XNOConfig(config.apiKey, config.showLog);
  }

  private normalizeInterval(interval: string): string {
    // Map TimeFrame to XNO format
    const map: Record<string, string> = {
      [TimeFrame.MINUTE_1]: 'm',
      [TimeFrame.MINUTE_5]: 'm',
      [TimeFrame.MINUTE_15]: 'm',
      [TimeFrame.MINUTE_30]: 'm',
      [TimeFrame.HOUR_1]: 'h',
      [TimeFrame.HOUR_4]: 'h',
      [TimeFrame.DAY_1]: 'd',
      [TimeFrame.WEEK_1]: 'w',
      [TimeFrame.MONTH_1]: 'M',
      // Aliases (avoiding duplicates with TimeFrame values)
      '1h': 'h', 
      '1d': 'd', 
      '1w': 'w',
      'm': 'm', 'h': 'h', 'd': 'd', 'w': 'w', 'M': 'M'
    };

    const result = map[interval];
    if (result) return result;

    // Default to day if unknown
    logger.warn(`Unknown interval ${interval}, defaulting to 'd'`);
    return 'd';
  }

  /**
   * Fetch historical OHLCV data
   */
  async history(options: {
    start?: string;
    end?: string;
    interval?: string;
    countBack?: number;
  }): Promise<QuoteData[]> {
    try {
      const interval = this.normalizeInterval(options.interval || '1D');
      const url = `${this.config.apiBase}${ENDPOINTS.stocks_ohlcv}/${this.symbol}/ohlcv/${interval}`;
      
      const params: any = {};
      
      if (options.start) {
        params.from = Math.floor(new Date(options.start).getTime() / 1000);
      } else {
        params.from = 0;
      }

      if (options.end) {
        params.to = Math.floor(new Date(options.end).getTime() / 1000);
      } else {
        params.to = 9999999999;
      }

      if (options.countBack) {
        params.countBack = options.countBack;
      }

      if (this.config.showLog) {
        logger.info(`Fetching history for ${this.symbol} (interval: ${interval})`);
      }

      const response = await axios.get(url, {
        headers: this.config.getHeaders(),
        params
      });

      const data = response.data as any;
      if (!data || !data.t || data.t.length === 0) {
        return [];
      }

      // Transform data to QuoteData format
      // XNO returns object of arrays: { t: [...], o: [...], ... }
      const result: QuoteData[] = [];
      const length = data.t.length;

      for (let i = 0; i < length; i++) {
        result.push({
          time: new Date(data.t[i] * 1000), // QuoteData expects Date object
          open: data.o[i],
          high: data.h[i],
          low: data.l[i],
          close: data.c[i],
          volume: data.v[i],
          symbol: this.symbol
        });
      }

      return result;

    } catch (error: any) {
      logger.error(`Error fetching history for ${this.symbol}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get intraday data
   */
  async intraday(): Promise<any> {
    try {
      const url = this.config.getEndpointUrl(ENDPOINTS.intraday, true);
      
      if (this.config.showLog) {
        logger.info(`Fetching intraday data for ${this.symbol}`);
      }

      const response = await axios.get(url, {
        headers: this.config.getHeaders()
      });

      // Filter for current symbol if API returns all
      // Note: The endpoint is LEData/getAll, which suggests it returns all symbols
      // We need to check the response structure.
      // Assuming it returns a list and we filter.
      
      const data = response.data;
      if (Array.isArray(data)) {
        return data.find((item: any) => item.symbol === this.symbol || item.code === this.symbol);
      }
      
      return data;

    } catch (error: any) {
      logger.error(`Error fetching intraday for ${this.symbol}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get price depth
   */
  async priceDepth(): Promise<any> {
    try {
      const url = this.config.getEndpointUrl(ENDPOINTS.price_depth, true);
      
      if (this.config.showLog) {
        logger.info(`Fetching price depth for ${this.symbol}`);
      }

      const response = await axios.get(url, {
        headers: this.config.getHeaders(),
        params: {
          symbol: this.symbol
        }
      });

      return response.data;

    } catch (error: any) {
      logger.error(`Error fetching price depth for ${this.symbol}: ${error.message}`);
      throw error;
    }
  }
}
