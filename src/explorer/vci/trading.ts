/**
 * VCI Trading Provider - TypeScript Implementation
 * 
 * Provides trading data (price board) from VCI Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { camelToSnake } from '../../core/utils';

const logger = getLogger('VCI.Trading');

const TRADING_URL = 'https://trading.vietcap.com.vn/api/';

export class VCITradingProvider {
  private headers: Record<string, string>;
  private showLog: boolean;

  constructor(config?: { randomAgent?: boolean; showLog?: boolean }) {
    this.showLog = config?.showLog !== false;
    
    this.headers = {
      'User-Agent': config?.randomAgent 
        ? this.getRandomUserAgent()
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Referer': 'https://trading.vietcap.com.vn/',
      'Origin': 'https://trading.vietcap.com.vn/',
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
   * Fetch price board data
   * 
   * @param symbols - List of symbols
   * @returns Promise of price board data
   */
  async priceBoard(symbols: string[]): Promise<any[]> {
    try {
      const url = `${TRADING_URL}price/symbols/getList`;
      const payload = { symbols };

      if (this.showLog) {
        logger.info(`Fetching price board for ${symbols.length} symbols`);
      }

      const response = await axios.post(url, payload, { headers: this.headers });
      const data = response.data as any[];
      
      return data.map((item: any) => {
        // Flatten the structure similar to Python implementation
        const flatItem: any = {};
        
        // Listing Info
        if (item.listingInfo) {
            for (const key in item.listingInfo) {
                flatItem[camelToSnake(key)] = item.listingInfo[key];
            }
        }
        
        // Match Price
        if (item.matchPrice) {
            for (const key in item.matchPrice) {
                flatItem[camelToSnake(key)] = item.matchPrice[key];
            }
        }
        
        // Bid/Ask
        if (item.bidAsk) {
             // We can add bid/ask details here if needed
             // For simplicity, let's just keep the raw object or specific fields
             // Python implementation flattens bid1, bid2, etc.
        }

        return flatItem;
      });
    } catch (error: any) {
      logger.error(`Error fetching price board:`, error.message);
      throw error;
    }
  }
}
