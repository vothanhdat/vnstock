/**
 * VCI Quote Provider - TypeScript Implementation
 * 
 * Provides historical and intraday stock price data from VCI Securities
 */

import axios, { AxiosRequestConfig } from 'axios';
import { QuoteData } from '../../core/types';
import { getLogger } from '../../core/logger';

const logger = getLogger('VCI.Quote');

// VCI API Constants
const TRADING_URL = 'https://trading.vietcap.com.vn/api/';
const CHART_URL = 'chart/OHLCChart/gap-chart';

const INTERVAL_MAP: Record<string, string> = {
  '1m': 'ONE_MINUTE',
  '5m': 'ONE_MINUTE',
  '15m': 'ONE_MINUTE',
  '30m': 'ONE_MINUTE',
  '1H': 'ONE_HOUR',
  '1D': 'ONE_DAY',
  '1W': 'ONE_DAY',
  '1M': 'ONE_DAY',
};

const RESAMPLE_MAP: Record<string, string> = {
  '5m': '5min',
  '15m': '15min',
  '30m': '30min',
  '1H': '1H',
  '1W': '1W',
  '1M': 'M',
};

interface VCIOHLCResponse {
  t: number[];  // timestamps
  o: number[];  // open
  h: number[];  // high
  l: number[];  // low
  c: number[];  // close
  v: number[];  // volume
}

export class VCIQuoteProvider {
  private symbol: string;
  private headers: Record<string, string>;
  private showLog: boolean;

  constructor(config?: { symbol?: string; randomAgent?: boolean; showLog?: boolean }) {
    this.symbol = config?.symbol?.toUpperCase() || '';
    this.showLog = config?.showLog !== false;
    
    this.headers = {
      'User-Agent': config?.randomAgent 
        ? this.getRandomUserAgent()
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json',
    };
  }

  private getRandomUserAgent(): string {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ];
    return agents[Math.floor(Math.random() * agents.length)];
  }

  /**
   * Fetch historical price data from VCI
   * 
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   * @param resolution - Time resolution (1D, 1W, 1M, etc.)
   * @returns Promise of quote data array
   */
  async history(
    startDate: string,
    endDate: string,
    resolution: string = '1D'
  ): Promise<QuoteData[]> {
    try {
      const symbol = this.symbol;
      
      // Parse dates
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      
      // Get interval mapping
      const intervalKey = INTERVAL_MAP[resolution];
      if (!intervalKey) {
        throw new Error(`Invalid interval: ${resolution}. Valid values: ${Object.keys(INTERVAL_MAP).join(', ')}`);
      }

      // Build request URL
      const url = `${TRADING_URL}${CHART_URL}`;
      const params = {
        ticker: symbol,
        from: startTime,
        to: endTime,
        resolution: intervalKey,
      };

      const config: AxiosRequestConfig = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching history for ${symbol} from ${startDate} to ${endDate} with resolution ${resolution}`);
      }

      const response = await axios.get<VCIOHLCResponse>(url, config);
      const data = response.data;

      if (!data || !data.t || data.t.length === 0) {
        logger.warn(`No data returned for ${symbol}`);
        return [];
      }

      // Transform to QuoteData format
      const quoteData: QuoteData[] = [];
      for (let i = 0; i < data.t.length; i++) {
        quoteData.push({
          symbol,
          time: new Date(data.t[i]),
          open: data.o[i],
          high: data.h[i],
          low: data.l[i],
          close: data.c[i],
          volume: data.v[i],
        });
      }

      // Apply resampling if needed
      if (RESAMPLE_MAP[resolution]) {
        // For now, return raw data. Resampling can be added later
        if (this.showLog) {
          logger.debug(`Resampling to ${resolution} would be applied here`);
        }
      }

      return quoteData;
    } catch (error) {
      logger.error(`Error fetching history for ${this.symbol}:`, error);
      throw error;
    }
  }

  /**
   * Fetch intraday trading data
   * 
   * @param pageSize - Number of records to fetch
   * @returns Promise of intraday quote data
   */
  async intraday(pageSize: number = 100): Promise<QuoteData[]> {
    try {
      // For now, return mock data as the actual implementation would require
      // GraphQL queries which are more complex
      logger.warn('Intraday data not yet fully implemented - returning sample data');
      
      const now = new Date();
      return [
        {
          symbol: this.symbol,
          time: now,
          open: 100,
          high: 102,
          low: 99,
          close: 101,
          volume: pageSize * 100,
        },
      ];
    } catch (error) {
      logger.error(`Error fetching intraday data for ${this.symbol}:`, error);
      throw error;
    }
  }

  /**
   * Fetch price depth / order book data
   * 
   * @returns Promise of price depth data
   */
  async priceDepth(): Promise<any> {
    try {
      logger.warn('Price depth not yet fully implemented - returning sample data');
      
      return {
        bids: [
          { price: 100, volume: 1000 },
          { price: 99.5, volume: 2000 },
        ],
        asks: [
          { price: 100.5, volume: 1500 },
          { price: 101, volume: 2500 },
        ],
      };
    } catch (error) {
      logger.error(`Error fetching price depth for ${this.symbol}:`, error);
      throw error;
    }
  }
}
