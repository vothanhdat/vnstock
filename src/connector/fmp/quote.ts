/**
 * FMP (Financial Modeling Prep) Quote Provider - TypeScript Implementation
 * 
 * Provides stock price data from FMP API
 */

import axios from 'axios';
import { QuoteData } from '../../core/types';
import { getLogger } from '../../core/logger';

const logger = getLogger('FMP.Quote');

// FMP API Constants
const FMP_DOMAIN = 'https://financialmodelingprep.com/stable';
const DEFAULT_TIMEOUT = 30000;

const ENDPOINTS: Record<string, string> = {
  quote_short: '/quote-short',
  quote: '/quote',
  historical: '/historical-price-full',
  intraday: '/historical-chart/1min',
};

interface FMPHistoricalResponse {
  symbol: string;
  historical: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

export class FMPQuoteProvider {
  private symbol: string;
  private apiKey: string;
  private showLog: boolean;

  constructor(config?: { symbol?: string; apiKey?: string; showLog?: boolean }) {
    this.symbol = config?.symbol?.toUpperCase() || '';
    this.showLog = config?.showLog !== false;
    
    // Get API key from config or environment
    this.apiKey = config?.apiKey || process.env.FMP_API_KEY || process.env.FMP_TOKEN || '';
    
    if (!this.apiKey) {
      const errorMsg = `FMP API key not found. Set FMP_API_KEY or FMP_TOKEN environment variable, or pass apiKey in config.
Get your API key at: https://financialmodelingprep.com`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
  }

  private getEndpointUrl(endpoint: string, symbol?: string): string {
    if (!ENDPOINTS[endpoint]) {
      throw new Error(`Endpoint not found: ${endpoint}`);
    }

    const url = `${FMP_DOMAIN}${ENDPOINTS[endpoint]}`;
    const params = new URLSearchParams();
    
    if (symbol) {
      params.append('symbol', symbol);
    }
    params.append('apikey', this.apiKey);
    
    return `${url}?${params.toString()}`;
  }

  /**
   * Fetch historical price data from FMP
   * 
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)  
   * @param resolution - Time resolution (not used by FMP, always daily)
   * @returns Promise of quote data array
   */
  async history(
    startDate: string,
    endDate: string,
    resolution: string = '1D'
  ): Promise<QuoteData[]> {
    try {
      const symbol = this.symbol;
      const url = this.getEndpointUrl('historical', symbol);

      if (this.showLog) {
        logger.info(`Fetching FMP history for ${symbol} from ${startDate} to ${endDate}`);
      }

      const config = {
        timeout: DEFAULT_TIMEOUT,
      };

      const response = await axios.get<FMPHistoricalResponse>(url, config);
      const data = response.data;

      if (!data || !data.historical || data.historical.length === 0) {
        logger.warn(`No data returned for ${symbol}`);
        return [];
      }

      // Filter by date range
      const start = new Date(startDate);
      const end = new Date(endDate);

      const quoteData: QuoteData[] = data.historical
        .map(item => ({
          symbol,
          time: new Date(item.date),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        }))
        .filter(item => item.time >= start && item.time <= end)
        .sort((a, b) => a.time.getTime() - b.time.getTime());

      return quoteData;
    } catch (error: any) {
      if (error.response?.status === 403) {
        logger.error('API access denied. Check subscription plan.');
      } else if (error.response?.status === 429) {
        logger.error('Rate limit exceeded. Try again later.');
      } else {
        logger.error(`Error fetching history for ${this.symbol}:`, error.message);
      }
      throw error;
    }
  }

  /**
   * Fetch intraday trading data (1-minute intervals)
   * 
   * @param pageSize - Number of records to fetch
   * @returns Promise of intraday quote data
   */
  async intraday(pageSize: number = 100): Promise<QuoteData[]> {
    try {
      const symbol = this.symbol;
      const url = `${FMP_DOMAIN}${ENDPOINTS.intraday}/${symbol}?apikey=${this.apiKey}`;

      if (this.showLog) {
        logger.info(`Fetching FMP intraday data for ${symbol}`);
      }

      const config = {
        timeout: DEFAULT_TIMEOUT,
      };

      const response = await axios.get<Array<{
        date: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
      }>>(url, config);

      const data = response.data;

      if (!data || data.length === 0) {
        logger.warn(`No intraday data returned for ${symbol}`);
        return [];
      }

      // Take only the requested number of most recent records
      const quoteData: QuoteData[] = data
        .slice(0, pageSize)
        .map(item => ({
          symbol,
          time: new Date(item.date),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        }));

      return quoteData;
    } catch (error: any) {
      logger.error(`Error fetching intraday data for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get real-time quote (short format)
   * 
   * @returns Promise of current price data
   */
  async short(): Promise<any> {
    try {
      const url = this.getEndpointUrl('quote_short', this.symbol);

      if (this.showLog) {
        logger.info(`Fetching FMP short quote for ${this.symbol}`);
      }

      const response = await axios.get(url, { timeout: DEFAULT_TIMEOUT });
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching short quote for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get real-time quote (full format)
   * 
   * @returns Promise of complete quote data
   */
  async full(): Promise<any> {
    try {
      const url = this.getEndpointUrl('quote', this.symbol);

      if (this.showLog) {
        logger.info(`Fetching FMP full quote for ${this.symbol}`);
      }

      const response = await axios.get(url, { timeout: DEFAULT_TIMEOUT });
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching full quote for ${this.symbol}:`, error.message);
      throw error;
    }
  }
}
