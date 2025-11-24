/**
 * TCBS Screener Provider - TypeScript Implementation
 * 
 * Provides stock screening functionality from TCBS Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';

const logger = getLogger('TCBS.Screener');

const BASE_URL = 'https://apipubaws.tcbs.com.vn';

export class TCBSScreenerProvider {
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
   * Screen stocks based on parameters
   * 
   * @param params - Screening parameters (e.g., { exchangeName: "HOSE,HNX,UPCOM" })
   * @param limit - Number of results to return
   * @param id - Optional screener ID
   * @returns Promise of screened stock data
   */
  async stock(params: Record<string, any> = { exchangeName: 'HOSE,HNX,UPCOM' }, limit: number = 50, id?: string): Promise<any> {
    try {
      const url = `${BASE_URL}/ligo/v1/watchlist/preview`;
      
      // Create filters from params
      const filters: any[] = [];
      for (const [key, value] of Object.entries(params)) {
        // Handle tuple/range values
        if (Array.isArray(value) && value.length === 2) {
          filters.push({
            key,
            operator: '>=',
            value: value[0],
          });
          filters.push({
            key,
            operator: '<=',
            value: value[1],
          });
        } else if (key !== 'size') {
          // Single value filter
          filters.push({
            key,
            operator: '=',
            value,
          });
        }
      }

      const payload = {
        filters,
        size: limit,
        ...(id && { id }),
      };

      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Screening stocks with ${filters.length} filters, limit: ${limit}`);
      }

      const response = await axios.post(url, payload, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error screening stocks:`, error.message);
      throw error;
    }
  }

  /**
   * Get top gainers
   * 
   * @param limit - Number of results
   * @returns Promise of top gainers data
   */
  async topGainers(limit: number = 20): Promise<any> {
    return this.stock({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get top losers
   * 
   * @param limit - Number of results
   * @returns Promise of top losers data
   */
  async topLosers(limit: number = 20): Promise<any> {
    return this.stock({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get top volume
   * 
   * @param limit - Number of results
   * @returns Promise of top volume data
   */
  async topVolume(limit: number = 20): Promise<any> {
    return this.stock({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get top value
   * 
   * @param limit - Number of results
   * @returns Promise of top value data
   */
  async topValue(limit: number = 20): Promise<any> {
    return this.stock({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get foreign trading statistics
   * 
   * @param limit - Number of results
   * @returns Promise of foreign trading data
   */
  async foreignTrading(limit: number = 20): Promise<any> {
    return this.stock({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get new highs
   * 
   * @param limit - Number of results
   * @returns Promise of new highs data
   */
  async newHighs(limit: number = 20): Promise<any> {
    return this.stock({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get new lows
   * 
   * @param limit - Number of results
   * @returns Promise of new lows data
   */
  async newLows(limit: number = 20): Promise<any> {
    return this.stock({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }
}
