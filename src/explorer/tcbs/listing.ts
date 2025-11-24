/**
 * TCBS Listing Provider - TypeScript Implementation
 * 
 * Provides stock listing and market data from TCBS Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';

const logger = getLogger('TCBS.Listing');

const BASE_URL = 'https://apipubaws.tcbs.com.vn';
const STOCKS_URL = 'stock-insight';

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
   * Get all symbols from specified exchanges
   * 
   * @param exchange - Exchange name or comma-separated list (HOSE, HNX, UPCOM)
   * @returns Promise of symbol list data
   */
  async allSymbols(exchange: string = 'HOSE,HNX,UPCOM'): Promise<any> {
    logger.warn('allSymbols is not fully implemented for TCBS provider yet.');
    return [];
    /*
    try {
      const url = `${BASE_URL}/${STOCKS_URL}/v1/market/top-mover`;
      
      const params = {
        exchange: exchange.toUpperCase(),
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching all symbols from ${exchange}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching all symbols:`, error.message);
      throw error;
    }
    */
  }

  /**
   * Get symbols by industry
   * 
   * @param industry - Industry name or ID
   * @returns Promise of industry symbols data
   */
  async symbolsByIndustries(industry: string): Promise<any> {
    logger.warn('symbolsByIndustries is not fully implemented for TCBS provider yet.');
    return [];
    /*
    try {
      const url = `${BASE_URL}/${STOCKS_URL}/v1/market/top-mover`;
      
      const params = {
        sector: industry,
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching symbols for industry: ${industry}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching symbols for industry ${industry}:`, error.message);
      throw error;
    }
    */
  }

  /**
   * Get symbols by exchange
   * 
   * @param exchange - Exchange name (HOSE, HNX, UPCOM)
   * @returns Promise of exchange symbols data
   */
  async byExchange(exchange: string): Promise<any> {
    return this.allSymbols(exchange);
  }

  /**
   * Get covered warrants
   * 
   * @returns Promise of covered warrants data
   */
  async coveredWarrants(): Promise<any> {
    try {
      const url = `${BASE_URL}/${STOCKS_URL}/v1/covered-warrant/all`;
      
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
}
