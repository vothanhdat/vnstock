/**
 * TCBS Listing Provider - TypeScript Implementation
 * 
 * Provides stock listing and market data from TCBS Securities.
 * Uses the screener API to fetch listing data.
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';

const logger = getLogger('TCBS.Listing');

const BASE_URL = 'https://apipubaws.tcbs.com.vn';

/**
 * Stock listing item from TCBS
 */
export interface TCBSListingItem {
  ticker: string;
  exchangeName: string;
  industryName: string;
  companyName: string;
  marketCap?: number;
  [key: string]: any;
}

export class TCBSListingProvider {
  private headers: Record<string, string>;
  private showLog: boolean;

  constructor(config?: { randomAgent?: boolean; showLog?: boolean }) {
    this.showLog = config?.showLog !== false;
    
    this.headers = {
      'User-Agent': config?.randomAgent 
        ? this.getRandomUserAgent()
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  private getRandomUserAgent(): string {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ];
    return agents[Math.floor(Math.random() * agents.length)];
  }

  /**
   * Fetch stock data using the screener/watchlist API
   * 
   * @param filters - Filter conditions
   * @param size - Maximum number of results
   * @returns Promise of listing data
   */
  private async fetchFromScreener(filters: Array<{key: string; operator: string; value: any}>, size: number = 2000): Promise<TCBSListingItem[]> {
    try {
      const url = `${BASE_URL}/ligo/v1/watchlist/preview`;
      
      const payload = {
        filters,
        size,
      };

      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching listing data with ${filters.length} filters`);
      }

      const response = await axios.post(url, payload, config);
      const data = response.data as any;
      
      if (data && data.searchData && data.searchData.pageContent) {
        return data.searchData.pageContent.map((item: any) => ({
          ticker: item.ticker,
          exchangeName: typeof item.exchangeName === 'object' ? item.exchangeName.en || item.exchangeName.vi : item.exchangeName,
          industryName: typeof item.industryName === 'object' ? item.industryName.en || item.industryName.vi : item.industryName,
          companyName: item.companyName,
          marketCap: item.marketCap,
          ...item,
        }));
      }
      
      return [];
    } catch (error: any) {
      logger.error(`Error fetching listing data:`, error.message);
      throw error;
    }
  }

  /**
   * Get all symbols from specified exchanges
   * 
   * @param exchange - Exchange name or comma-separated list (HOSE, HNX, UPCOM)
   * @returns Promise of symbol list data
   */
  async allSymbols(exchange: string = 'HOSE,HNX,UPCOM'): Promise<string[]> {
    try {
      const filters = [{
        key: 'exchangeName',
        operator: '=',
        value: exchange.toUpperCase(),
      }];

      const data = await this.fetchFromScreener(filters);
      return data.map(item => item.ticker);
    } catch (error: any) {
      logger.error(`Error fetching all symbols:`, error.message);
      throw error;
    }
  }

  /**
   * Get all symbols with full listing info
   * 
   * @param exchange - Exchange name or comma-separated list (HOSE, HNX, UPCOM)
   * @returns Promise of full listing data
   */
  async allSymbolsWithInfo(exchange: string = 'HOSE,HNX,UPCOM'): Promise<TCBSListingItem[]> {
    try {
      const filters = [{
        key: 'exchangeName',
        operator: '=',
        value: exchange.toUpperCase(),
      }];

      return await this.fetchFromScreener(filters);
    } catch (error: any) {
      logger.error(`Error fetching all symbols with info:`, error.message);
      throw error;
    }
  }

  /**
   * Get symbols by industry
   * 
   * @param industry - Industry name
   * @param exchange - Optional exchange filter
   * @returns Promise of industry symbols data
   */
  async symbolsByIndustries(industry?: string, exchange: string = 'HOSE,HNX,UPCOM'): Promise<TCBSListingItem[]> {
    try {
      const filters: Array<{key: string; operator: string; value: any}> = [{
        key: 'exchangeName',
        operator: '=',
        value: exchange.toUpperCase(),
      }];

      if (industry) {
        filters.push({
          key: 'industryName',
          operator: '=',
          value: industry,
        });
      }

      const data = await this.fetchFromScreener(filters);
      
      // Group by industry if no specific industry was requested
      if (!industry) {
        return data;
      }
      
      return data;
    } catch (error: any) {
      logger.error(`Error fetching symbols by industry:`, error.message);
      throw error;
    }
  }

  /**
   * Get symbols by exchange
   * 
   * @param exchange - Exchange name (HOSE, HNX, UPCOM)
   * @returns Promise of exchange symbols data
   */
  async symbolsByExchange(exchange: string): Promise<string[]> {
    return this.allSymbols(exchange);
  }

  /**
   * Get covered warrants
   * 
   * @returns Promise of covered warrants data
   */
  async coveredWarrants(): Promise<any> {
    try {
      const url = `${BASE_URL}/stock-insight/v1/covered-warrant/all`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info('Fetching covered warrants');
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error('Error fetching covered warrants:', error.message);
      throw error;
    }
  }

  /**
   * Get indices list
   * 
   * @returns Promise of indices data
   */
  async indices(): Promise<any> {
    try {
      const url = `${BASE_URL}/stock-insight/v1/stock/top-mover`;
      
      const params = {
        type: 'index',
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info('Fetching indices');
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error('Error fetching indices:', error.message);
      throw error;
    }
  }
}
