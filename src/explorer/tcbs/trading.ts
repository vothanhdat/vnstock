/**
 * TCBS Trading Provider - TypeScript Implementation
 * 
 * Provides trading data and price board information from TCBS Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';

const logger = getLogger('TCBS.Trading');

const BASE_URL = 'https://apipubaws.tcbs.com.vn';
const STOCKS_URL = 'stock-insight';

export class TCBSTradingProvider {
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
   * Get price board for multiple symbols
   * 
   * @param symbolList - Array of stock symbols
   * @param stdColumns - Use standard columns or extended columns
   * @returns Promise of price board data
   */
  async priceBoard(symbolList: string[], stdColumns: boolean = true): Promise<any> {
    try {
      const url = `${BASE_URL}/${STOCKS_URL}/v1/stock/second-tc-price`;
      
      const payload = {
        tickers: symbolList.map(s => s.toUpperCase()).join(','),
      };

      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching price board for ${symbolList.length} symbols`);
      }

      const response = await axios.post(url, payload, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching price board:`, error.message);
      throw error;
    }
  }

  /**
   * Get real-time price for a single symbol
   * 
   * @param symbol - Stock symbol (optional, uses instance symbol if not provided)
   * @returns Promise of real-time price data
   */
  async price(symbol?: string): Promise<any> {
    const targetSymbol = symbol || this.symbol;
    if (!targetSymbol) {
      throw new Error('Symbol is required');
    }

    try {
      const url = `${BASE_URL}/${STOCKS_URL}/v1/stock/${targetSymbol.toUpperCase()}/overview`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching real-time price for ${targetSymbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching price for ${targetSymbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get trading statistics
   * 
   * @returns Promise of trading statistics
   */
  async statistics(): Promise<any> {
    try {
      if (!this.symbol) {
        throw new Error('Symbol is required');
      }

      const url = `${BASE_URL}/${STOCKS_URL}/v1/stock/${this.symbol}/trading-statistic`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching trading statistics for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching trading statistics for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get market breadth (advance/decline)
   * 
   * @param exchange - Exchange name (HOSE, HNX, UPCOM)
   * @returns Promise of market breadth data
   */
  async marketBreadth(exchange: string = 'HOSE'): Promise<any> {
    try {
      const url = `${BASE_URL}/${STOCKS_URL}/v1/market/market-breadth`;
      
      const params = {
        exchange: exchange.toUpperCase(),
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching market breadth for ${exchange}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching market breadth:`, error.message);
      throw error;
    }
  }

  /**
   * Get sector performance
   * 
   * @returns Promise of sector performance data
   */
  async sectorPerformance(): Promise<any> {
    try {
      const url = `${BASE_URL}/${STOCKS_URL}/v1/market/top-mover`;
      
      const config = {
        headers: this.headers,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info('Fetching sector performance');
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error('Error fetching sector performance:', error.message);
      throw error;
    }
  }
}
