/**
 * VCI Company Provider - TypeScript Implementation
 * 
 * Provides company information and corporate data from VCI Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { camelToSnake, cleanHtml } from '../../core/utils';

const logger = getLogger('VCI.Company');

const GRAPHQL_URL = 'https://trading.vietcap.com.vn/data-mt/graphql';

export class VCICompanyProvider {
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
   * Fetch company profile information
   * 
   * @returns Promise of company profile data
   */
  async profile(): Promise<any> {
    try {
      const query = `
        query Query($ticker: String!) {
          CompanyListingInfo(ticker: $ticker) {
            id
            issueShare
            en_History
            history
            en_CompanyProfile
            companyProfile
            icbName3
            enIcbName3
            icbName2
            enIcbName2
            icbName4
            enIcbName4
            financialRatio {
              id
              ticker
              issueShare
              charterCapital
              __typename
            }
            __typename
          }
        }
      `;

      const variables = {
        ticker: this.symbol
      };

      if (this.showLog) {
        logger.info(`Fetching company profile for ${this.symbol}`);
      }

      const response = await axios.post(GRAPHQL_URL, { query, variables }, { headers: this.headers });
      const responseData = response.data as any;
      
      if (responseData.errors) {
        throw new Error(responseData.errors[0].message);
      }

      const data = responseData.data.CompanyListingInfo;
      
      // Convert keys to snake_case and clean HTML
      const result: any = {};
      const htmlFields = ['history', 'en_History', 'companyProfile', 'en_CompanyProfile'];

      for (const key in data) {
        if (key !== '__typename') {
          let value = data[key];
          if (htmlFields.includes(key) && typeof value === 'string') {
            value = cleanHtml(value);
          }
          result[camelToSnake(key)] = value;
        }
      }

      return result;
    } catch (error: any) {
      logger.error(`Error fetching company profile for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Fetch company shareholders
   * 
   * @returns Promise of shareholders data
   */
  async shareholders(): Promise<any[]> {
    try {
      const query = `
        query Query($ticker: String!) {
          OrganizationShareHolders(ticker: $ticker) {
            id
            ticker
            ownerFullName
            en_OwnerFullName
            quantity
            percentage
            updateDate
            __typename
          }
        }
      `;

      const variables = {
        ticker: this.symbol
      };

      if (this.showLog) {
        logger.info(`Fetching shareholders for ${this.symbol}`);
      }

      const response = await axios.post(GRAPHQL_URL, { query, variables }, { headers: this.headers });
      const responseData = response.data as any;
      
      if (responseData.errors) {
        throw new Error(responseData.errors[0].message);
      }

      const data = responseData.data.OrganizationShareHolders;
      
      return data.map((item: any) => {
        const result: any = {};
        for (const key in item) {
          if (key !== '__typename') {
            result[camelToSnake(key)] = item[key];
          }
        }
        return result;
      });
    } catch (error: any) {
      logger.error(`Error fetching shareholders for ${this.symbol}:`, error.message);
      throw error;
    }
  }
}
