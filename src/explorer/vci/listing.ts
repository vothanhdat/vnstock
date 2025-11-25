/**
 * VCI Listing Provider - TypeScript Implementation
 * 
 * Provides stock listing and market data from VCI Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { camelToSnake } from '../../core/utils';
import { VCIListing } from './types';

const logger = getLogger('VCI.Listing');

const GRAPHQL_URL = 'https://trading.vietcap.com.vn/data-mt/graphql';

export class VCIListingProvider {
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
   * Get all symbols
   * 
   * @returns Promise of symbol list data
   */
  async allSymbols(): Promise<VCIListing[]> {
    try {
      const query = `
        query {
          CompaniesListingInfo {
            ticker
            organName
            enOrganName
            icbName3
            enIcbName3
            icbName2
            enIcbName2
            icbName4
            enIcbName4
            comTypeCode
            icbCode1
            icbCode2
            icbCode3
            icbCode4
            __typename
          }
        }
      `;

      if (this.showLog) {
        logger.info(`Fetching all symbols`);
      }

      const response = await axios.post(GRAPHQL_URL, { query, variables: {} }, { headers: this.headers });
      const responseData = response.data as any;
      
      if (responseData.errors) {
        throw new Error(responseData.errors[0].message);
      }

      const data = responseData.data.CompaniesListingInfo;
      
      return data.map((item: any) => {
        const result: any = {};
        for (const key in item) {
          if (key !== '__typename') {
            result[camelToSnake(key)] = item[key];
          }
        }
        // Rename ticker to symbol
        if (result.ticker) {
            result.symbol = result.ticker;
            delete result.ticker;
        }
        return result;
      });
    } catch (error: any) {
      logger.error(`Error fetching all symbols:`, error.message);
      throw error;
    }
  }
}
