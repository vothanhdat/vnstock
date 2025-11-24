/**
 * TCBS Quote Provider - TypeScript Implementation
 * 
 * Provides historical and intraday stock price data from TCBS Securities
 */

import axios from 'axios';

import { QuoteData } from '../../core/types';
import { getLogger } from '../../core/logger';

const logger = getLogger('TCBS.Quote');

// TCBS API Constants
const BASE_URL = 'https://apipubaws.tcbs.com.vn';
const STOCKS_URL = 'stock-insight';

const INTERVAL_MAP: Record<string, string> = {
  '1m': '1',
  '5m': '5',
  '15m': '15',
  '30m': '30',
  '1H': '60',
  '1D': 'D',
  '1W': 'W',
  '1M': 'M',
};

const INDEX_MAPPING: Record<string, string> = {
  'VNINDEX': 'VNINDEX',
  'HNXINDEX': 'HNXIndex',
  'UPCOMINDEX': 'HNXUpcomIndex',
};

interface TCBSOHLCResponse {
  tradingDate: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export class TCBSQuoteProvider {
  private symbol: string;
  private headers: Record<string, string>;
  private showLog: boolean;
  private assetType: string;

  constructor(config?: { symbol?: string; randomAgent?: boolean; showLog?: boolean }) {
    let symbol = config?.symbol?.toUpperCase() || '';
    this.showLog = config?.showLog !== false;
    
    // Handle INDEX symbols
    if (symbol.includes('INDEX')) {
      if (INDEX_MAPPING[symbol]) {
        symbol = INDEX_MAPPING[symbol];
      } else {
        const validIndices = Object.keys(INDEX_MAPPING).join(', ');
        throw new Error(`Invalid index symbol: ${symbol}. Valid values: ${validIndices}`);
      }
    }
    
    this.symbol = symbol;
    this.assetType = this.getAssetType(symbol);
    
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

  private getAssetType(symbol: string): string {
    if (symbol.includes('INDEX')) return 'INDEX';
    if (symbol.startsWith('VN30F')) return 'FUTURE';
    return 'STOCK';
  }

  /**
   * Fetch historical price data from TCBS
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
      if (!startDate || !endDate) {
        throw new Error('Start date and end date are required');
      }

      const symbol = this.symbol;
      
      // Get interval mapping
      const intervalKey = INTERVAL_MAP[resolution];
      if (!intervalKey) {
        throw new Error(`Invalid interval: ${resolution}. Valid values: ${Object.keys(INTERVAL_MAP).join(', ')}`);
      }

      // Calculate countBack and to timestamp
      const start = new Date(startDate);
      const end = new Date(endDate);
      // TCBS API expects 'to' as unix timestamp (seconds)
      const toTimestamp = Math.floor(end.getTime() / 1000);
      
      // Estimate countBack
      let countBack = 365;
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (resolution === '1D' || resolution === '1D') {
        countBack = diffDays + 20; // Add buffer
      } else if (resolution === '1W') {
        countBack = Math.ceil(diffDays / 7) + 5;
      } else if (resolution === '1M') {
        countBack = Math.ceil(diffDays / 30) + 2;
      } else {
        // Intraday
        // resolution is in minutes e.g. '1', '5'
        const minutes = parseInt(intervalKey);
        if (!isNaN(minutes)) {
             const diffMinutes = Math.ceil(diffTime / (1000 * 60));
             countBack = Math.ceil(diffMinutes / minutes) + 100;
        }
      }

      // Map asset type
      let type = 'stock';
      if (this.assetType === 'FUTURE') type = 'derivative';
      else if (this.assetType === 'INDEX') type = 'index';

      // Determine endpoint
      let endPoint = 'bars';
      if (['D', 'W', 'M'].includes(intervalKey)) {
        endPoint = 'bars-long-term';
      }

      // Build request URL
      const url = `${BASE_URL}/${STOCKS_URL}/v2/stock/${endPoint}`;
      
      const params = {
        ticker: symbol,
        type: type,
        resolution: intervalKey,
        to: toTimestamp,
        countBack: countBack
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching history for ${symbol} from ${startDate} to ${endDate} with resolution ${resolution}`);
      }

      const response = await axios.get<{ data: TCBSOHLCResponse[] }>(url, config);
      const data = response.data?.data;

      if (!data || data.length === 0) {
        logger.warn(`No data returned for ${symbol}`);
        return [];
      }

      // Filter data by date range
      const startTime = start.getTime();
      const endTime = end.getTime() + (24 * 60 * 60 * 1000); // Include end date fully

      // Transform to QuoteData format
      const quoteData: QuoteData[] = data
        .map(item => ({
          symbol,
          time: new Date(item.tradingDate),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        }))
        .filter(item => {
          const time = item.time.getTime();
          return time >= startTime && time <= endTime;
        });
        
      return quoteData;
    } catch (error: any) {
      logger.error(`Error fetching history for ${this.symbol}:`, error.message);
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
      // TCBS intraday endpoint
      const url = `${BASE_URL}/${STOCKS_URL}/v1/intraday/${this.symbol}/his/paging`;
      
      const params = {
        page: 0,
        size: pageSize,
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching intraday data for ${this.symbol}`);
      }

      const response = await axios.get<{ data: Array<{ t: number; p: number; v: number }> }>(url, config);
      const data = response.data?.data;

      if (!data || data.length === 0) {
        logger.warn(`No intraday data returned for ${this.symbol}`);
        return [];
      }

      // Transform to QuoteData format
      const quoteData: QuoteData[] = data.map(item => ({
        symbol: this.symbol,
        time: new Date(item.t),
        open: item.p,
        high: item.p,
        low: item.p,
        close: item.p,
        volume: item.v,
      }));

      return quoteData;
    } catch (error: any) {
      logger.error(`Error fetching intraday data for ${this.symbol}:`, error.message);
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
      logger.warn('Price depth not yet fully implemented for TCBS - returning sample data');
      
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
    } catch (error: any) {
      logger.error(`Error fetching price depth for ${this.symbol}:`, error.message);
      throw error;
    }
  }
}
