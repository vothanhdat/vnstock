/**
 * VNDirect Screener Provider - TypeScript Implementation
 * 
 * Provides stock screening functionality from VNDirect Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { VNDirectScreenerResult, VNDirectScreenerPayload, VNDirectScreenerFilter } from './types';
import screenerMetadata from './info.json';

const logger = getLogger('VNDirect.Screener');

const BASE_URL = 'https://screener-api.vndirect.com.vn';

export class VNDirectScreenerProvider {
  private headers: Record<string, string>;
  private showLog: boolean;

  constructor(config?: { randomAgent?: boolean; showLog?: boolean }) {
    this.showLog = config?.showLog !== false;
    
    this.headers = {
      'User-Agent': config?.randomAgent 
        ? this.getRandomUserAgent()
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'DNT': '1',
      'Origin': 'https://trade.vndirect.com.vn',
      'Referer': 'https://trade.vndirect.com.vn/',
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
   * Get metadata for all available screener fields
   */
  getScreenerFieldMetadata(): Record<string, any> {
    const fields = new Map<string, any>();
    
    if ((screenerMetadata as any).data) {
      for (const item of (screenerMetadata as any).data) {
        if (item.refCode) {
          fields.set(item.refCode, {
            key: item.refCode,
            label: item.description,
            group: item.refGroup,
            type: item.refType,
            locale: item.locale
          });
        }
      }
    }

    return Object.fromEntries(fields);
  }

  /**
   * Screen stocks based on parameters
   * 
   * @param params - Screening parameters
   * @param limit - Number of results to return (optional, default is all)
   * @returns Promise of screened stock data
   */
  async screen(params: Record<string, any> = {}, limit?: number): Promise<VNDirectScreenerResult[]> {
    try {
      const url = `${BASE_URL}/search_data`;
      
      // Get all available fields from metadata
      const metaFields = (screenerMetadata as any).data
        .map((item: any) => item.refCode)
        .filter((code: any) => typeof code === 'string' && code.length > 0);
        
      // Ensure 'code' and 'nmVolCr' are included and remove duplicates
      const defaultFields = [...new Set(['code', 'nmVolCr', ...metaFields])];

      // Construct filters
      const filters: VNDirectScreenerFilter[] = [];
      
      // Default to HOSE, HNX, UPCOM if not specified
      if (!params.floor) {
        filters.push({
          dbFilterCode: 'floor',
          condition: 'EQUAL',
          value: 'HNX,HOSE,UPCOM'
        });
      }

      for (const [key, value] of Object.entries(params)) {
        if (key === 'size' || key === 'page' || key === 'sort') continue;

        // Handle array values (Range)
        if (Array.isArray(value) && value.length === 2) {
          if (value[0] !== null && value[0] !== undefined) {
            filters.push({
              dbFilterCode: key,
              condition: 'GTE',
              value: value[0],
            });
          }
          if (value[1] !== null && value[1] !== undefined) {
            filters.push({
              dbFilterCode: key,
              condition: 'LTE',
              value: value[1],
            });
          }
        } else if (typeof value === 'object' && value !== null && 'condition' in value && 'value' in value) {
          // Handle explicit condition object
          filters.push({
            dbFilterCode: key,
            condition: (value as any).condition,
            value: (value as any).value,
          });
        } else {
          // Handle single values
          const stringFields = ['floor', 'industrylv2', 'code', 'companyNameVi', 'companyNameEn'];
          
          if (stringFields.includes(key)) {
            filters.push({
              dbFilterCode: key,
              condition: 'EQUAL',
              value: String(value),
            });
          } else {
            // For numeric fields, default to GT (Greater Than) as per example
            // But if it's a specific value, maybe EQUAL?
            // Let's use GT for now as it's common for screener "min value"
            filters.push({
              dbFilterCode: key,
              condition: 'GT',
              value: value as string | number,
            });
          }
        }
      }

      const payload: VNDirectScreenerPayload = {
        fields: defaultFields.join(','),
        filters,
        sort: (params.sort as string) || 'code:asc',
        size: 9999, // Request all (or a lot) since API ignores small limits or we want to handle it locally
        page: (params.page as number) || 1
      };

      if (this.showLog) {
        logger.info(`Screening stocks with ${filters.length} filters, limit: ${limit || 'ALL'}`);
      }

      const response = await axios.post(url, payload, {
        headers: this.headers,
        timeout: 30000,
      });

      const data = response.data as any;
      
      if (data && data.data) {
        const results = data.data;
        if (limit && limit > 0) {
          return results.slice(0, limit);
        }
        return results;
      }
      
      return [];
    } catch (error: any) {
      logger.error(`Error screening stocks:`, error.message);
      throw error;
    }
  }

  /**
   * Get top gainers
   */
  async topGainers(limit: number = 20): Promise<VNDirectScreenerResult[]> {
    return this.screen({ 
      floor: 'HOSE,HNX,UPCOM',
      sort: 'priceChgPctCr:desc'
    }, limit);
  }

  /**
   * Get top losers
   */
  async topLosers(limit: number = 20): Promise<VNDirectScreenerResult[]> {
    return this.screen({ 
      floor: 'HOSE,HNX,UPCOM',
      sort: 'priceChgPctCr:asc'
    }, limit);
  }

  /**
   * Get top volume
   */
  async topVolume(limit: number = 20): Promise<VNDirectScreenerResult[]> {
    return this.screen({ 
      floor: 'HOSE,HNX,UPCOM',
      sort: 'nmVolCr:desc' // Assuming nmVolCr exists based on derived fields
    }, limit);
  }

  /**
   * Get top value
   */
  async topValue(limit: number = 20): Promise<VNDirectScreenerResult[]> {
    return this.screen({ 
      floor: 'HOSE,HNX,UPCOM',
      sort: 'nmValCr:desc'
    }, limit);
  }

  /**
   * Get foreign trading (Net Buy)
   */
  async foreignTrading(limit: number = 20): Promise<VNDirectScreenerResult[]> {
    return this.screen({ 
      floor: 'HOSE,HNX,UPCOM',
      sort: 'netForBoughtValCr:desc'
    }, limit);
  }

  /**
   * Get new highs (52 week)
   */
  async newHighs(limit: number = 20): Promise<VNDirectScreenerResult[]> {
    return this.screen({ 
      floor: 'HOSE,HNX,UPCOM',
      priceChgPctCrHC1y: 0 // Close to high?
    }, limit);
  }
}
