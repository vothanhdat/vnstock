/**
 * VCI Quote Provider - TypeScript Implementation
 * 
 * Provides historical and intraday stock price data from VCI Securities
 */

import axios from 'axios';

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
  t: (number | string)[];  // timestamps
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
      'Referer': 'https://trading.vietcap.com.vn/',
      'Origin': 'https://trading.vietcap.com.vn/',
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
      
      // Calculate countBack
      const diffTime = Math.abs(endTime - startTime);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      let countBack = diffDays;
      if (intervalKey === 'ONE_MINUTE') {
          countBack = diffDays * 390; // Approx trading minutes per day
      } else if (intervalKey === 'ONE_HOUR') {
          countBack = diffDays * 5; // Approx trading hours per day
      }
      // Add some buffer
      countBack = Math.ceil(countBack * 1.5);

      const payload = {
        timeFrame: intervalKey,
        symbols: [symbol],
        to: Math.floor(endTime / 1000), // Seconds
        countBack: countBack
      };

      if (this.showLog) {
        logger.info(`Fetching history for ${symbol} from ${startDate} to ${endDate} with resolution ${resolution}`);
      }

      const response = await axios.post<VCIOHLCResponse[]>(url, payload, { 
        headers: this.headers,
        timeout: 30000
      });
      
      const responseData = response.data;

      if (!responseData || !Array.isArray(responseData) || responseData.length === 0) {
        logger.warn(`No data returned for ${symbol}. Response: ${JSON.stringify(responseData)}`);
        return [];
      }

      const data = responseData[0];

      if (!data || !data.t || data.t.length === 0) {
        logger.warn(`No data returned for ${symbol}. Response: ${JSON.stringify(data)}`);
        return [];
      }

      // Transform to QuoteData format
      const quoteData: QuoteData[] = [];
      for (let i = 0; i < data.t.length; i++) {
        const timestamp = typeof data.t[i] === 'string' ? parseInt(data.t[i] as string) : data.t[i] as number;
        quoteData.push({
          symbol,
          time: new Date(timestamp * 1000),
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
   * Fetch intraday price data (not implemented yet)
   */
  async intraday(
    startDate: string,
    endDate: string,
    resolution: string = '1m'
  ): Promise<QuoteData[]> {
    // VCI uses the same endpoint for intraday if resolution is small
    return this.history(startDate, endDate, resolution);
  }
}
