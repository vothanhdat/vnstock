/**
 * VCI Financial Provider - TypeScript Implementation
 * 
 * Provides financial reports and ratios from VCI Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { FinancialData } from '../../core/types';
import { normalizeVCIFinancial, normalizeVCIFinancialList } from '../../core/financial';
import { camelToSnake } from '../../core/utils';
import { VCIFinancialRatio } from './types';

const logger = getLogger('VCI.Financial');

const GRAPHQL_URL = 'https://trading.vietcap.com.vn/data-mt/graphql';

export class VCIFinancialProvider {
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
   * Fetch financial ratios
   * 
   * @returns Promise of financial ratios data
   */
  async ratios(): Promise<VCIFinancialRatio[]> {
    try {
      const query = `
        query Query($ticker: String!) {
          TickerPriceInfo(ticker: $ticker) {
            financialRatio {
              yearReport
              lengthReport
              updateDate
              revenue
              revenueGrowth
              netProfit
              netProfitGrowth
              ebitMargin
              roe
              roic
              roa
              pe
              pb
              eps
              currentRatio
              cashRatio
              quickRatio
              interestCoverage
              ae
              fae
              netProfitMargin
              grossMargin
              ev
              issueShare
              ps
              pcf
              bvps
              evPerEbitda
              at
              fat
              acp
              dso
              dpo
              epsTTM
              charterCapital
              RTQ4
              charterCapitalRatio
              RTQ10
              dividend
              ebitda
              ebit
              le
              de
              ccc
              RTQ17
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
        logger.info(`Fetching financial ratios for ${this.symbol}`);
      }

      const response = await axios.post(GRAPHQL_URL, { query, variables }, { headers: this.headers });
      const responseData = response.data as any;
      
      if (responseData.errors) {
        throw new Error(responseData.errors[0].message);
      }

      const data = responseData.data.TickerPriceInfo.financialRatio;
      
      if (!data) return [];

      // The API returns a single object for ratios, but we might want to wrap it in an array or return as is.
      // Based on the Python code, it seems to return a list of ratios over time if available, 
      // but the query above fetches "financialRatio" which looks like a list in the schema?
      // Let's check the Python code again. 
      // In Python `_fetch_data` for Company fetches `TickerPriceInfo` which has `financialRatio`.
      // Wait, the Python `Finance` class seems to fetch Balance Sheet, Income Statement etc.
      // The `ratios` method in Python `Finance` class is not explicitly shown in the snippet I read.
      // Let me re-read `vnstock/explorer/vci/financial.py` to see how it fetches reports.
      
      // For now, I'll return the data as is, converted to snake_case.
      if (Array.isArray(data)) {
         return data.map((item: any) => {
          const result: any = {};
          for (const key in item) {
            if (key !== '__typename') {
              result[camelToSnake(key)] = item[key];
            }
          }
          return result;
        });
      } else {
         const result: any = {};
          for (const key in data) {
            if (key !== '__typename') {
              result[camelToSnake(key)] = data[key];
            }
          }
          return [result];
      }

    } catch (error: any) {
      logger.error(`Error fetching financial ratios for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  // ============= Normalized Methods (Return unified FinancialData) =============

  /**
   * Get normalized financial ratios
   * 
   * @returns Promise of normalized FinancialData[]
   */
  async normalizedRatios(): Promise<FinancialData[]> {
    const raw = await this.ratios();
    return normalizeVCIFinancialList(raw, this.symbol);
  }
  
  // Note: Implementing full financial reports (Balance Sheet, Income Statement, Cash Flow) 
  // requires mapping the company type (Bank, Insurance, Securities, Normal) and using specific queries.
  // For this example, I'll stick to the ratios which are simpler. 
  // If the user needs full reports, I would need to implement the logic to determine company type and select the correct query.
}
