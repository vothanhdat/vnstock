/**
 * TCBS Screener Provider - TypeScript Implementation
 * 
 * Provides stock screening functionality from TCBS Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { TCBSScreenerResult } from './types';
import screenerMetadata from './info.json';

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
      // 'Authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhdXRoZW5fc2VydmljZSIsImV4cCI6MTc2NjE2ODgxMCwianRpIjoiIiwiaWF0IjoxNzY2MTI1NjEwLCJzdWIiOiIxMDAwMDg2MTc0NSIsImN1c3RvZHlJRCI6IjEwNUNUREFUVk8iLCJ0Y2JzSWQiOiIxMDAwMDg2MTc0NSIsImVtYWlsIjoidGhhbmhkYXQxNzEwQGdtYWlsLmNvbSIsInJvbGVzIjpbImN1c3RvbWVyIl0sInNjb3BlcyI6WyJhbGw6YWxsIiwic29ja2V0OmFsbCJdLCJzdGVwdXBfZXhwIjowLCJzb3RwX3NpZ24iOiIiLCJjbGllbnRfa2V5IjoiMTAwMDA4NjE3NDUuSlRFTzAwdXhZc2NIZHNhOU5MN1EiLCJzZXNzaW9uSUQiOiJkMTI5ZDViYy0yYjY4LTQ2YzctODhjZC04NTdlZWFhMDRiOTQiLCJhY2NvdW50X3N0YXR1cyI6IjEiLCJvdHAiOiIiLCJvdHBUeXBlIjoiIiwib3RwU291cmNlIjoiVENJTlZFU1QiLCJvdHBTZXNzaW9uSWQiOiIiLCJhY2NvdW50VHlwZSI6IlBSSU1BUlkiLCJwcmltYXJ5U3ViIjoiIiwicHJpbWFyeUN1c3RvZHlJRCI6IiIsImVub3RwX3NpZ24iOiIiLCJzcWFfc2lnbiI6IiIsImVuX290cCI6IiIsImVuT1RQVHlwZSI6IiIsImNhU3RhdHVzIjoiSUdOT1JFIiwiY3VzVHlwZSI6IklORElWSURVQUwiLCJ0ZW5hbnQiOiJ0Y2JzIn0.VNKbSVjZY4DSPWlyr4QvNGuub_OF_MXPoxtFFr_RReY`
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
   * Useful for understanding field definitions, units, and tooltips
   */
  getScreenerFieldMetadata(): Record<string, any> {
    const fields = new Map<string, any>();
    
    // Helper to extract field info
    const extractField = (item: any) => {
      if (item.key && item.key.data) {
        // Rich definition from conditionsForSearch
        return {
          key: item.key.data,
          label: item.key.lang,
          tooltip: item.tooltip,
          unit: item.unit?.lang || item.unit,
          type: item.type,
          values: item.value // Enum values if any
        };
      } else if (item.data) {
        // Simple definition
        return {
          key: item.data,
          label: item.lang
        };
      }
      return null;
    };

    // 1. Process conditionsForSearch (Rich metadata)
    if ((screenerMetadata as any).conditionsForSearch) {
      for (const group of (screenerMetadata as any).conditionsForSearch) {
        if (group.items) {
          for (const item of group.items) {
            const info = extractField(item);
            if (info) fields.set(info.key, info);
          }
        }
      }
    }

    // 2. Process other sections to catch any missing fields
    const otherSections = ['conditionsForFilter', 'conditionsForOptions', 'keyDetails'];
    for (const section of otherSections) {
      if ((screenerMetadata as any)[section]) {
        const data = (screenerMetadata as any)[section];
        // Some sections are arrays of groups, some might be direct arrays (keyDetails)
        if (Array.isArray(data)) {
          for (const groupOrItem of data) {
            if (groupOrItem.items) {
              // It's a group
              for (const item of groupOrItem.items) {
                const info = extractField(item);
                if (info && !fields.has(info.key)) fields.set(info.key, info);
              }
            } else {
              // It's a direct item (like in keyDetails)
              const info = extractField(groupOrItem);
              if (info && !fields.has(info.key)) fields.set(info.key, info);
            }
          }
        }
      }
    }

    return Object.fromEntries(fields);
  }

  /**
   * Screen stocks based on parameters
   * 
   * @param params - Screening parameters (e.g., { exchangeName: "HOSE,HNX,UPCOM" })
   * @param limit - Number of results to return
   * @param id - Optional screener ID
   * @returns Promise of screened stock data
   */
  async screen(params: Record<string, any> = { exchangeName: 'HOSE,HNX,UPCOM' }, limit: number = 50, id?: string): Promise<TCBSScreenerResult[]> {
    try {
      const url = `${BASE_URL}/ligo/v2/watchlist/preview`;
      
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
      const data = response.data as any;
      
      if (data && data.searchData && data.searchData.pageContent) {
        return data.searchData.pageContent;
      }
      
      return [];
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
    return this.screen({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get top losers
   * 
   * @param limit - Number of results
   * @returns Promise of top losers data
   */
  async topLosers(limit: number = 20): Promise<any> {
    return this.screen({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get top volume
   * 
   * @param limit - Number of results
   * @returns Promise of top volume data
   */
  async topVolume(limit: number = 20): Promise<any> {
    return this.screen({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get top value
   * 
   * @param limit - Number of results
   * @returns Promise of top value data
   */
  async topValue(limit: number = 20): Promise<any> {
    return this.screen({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get foreign trading statistics
   * 
   * @param limit - Number of results
   * @returns Promise of foreign trading data
   */
  async foreignTrading(limit: number = 20): Promise<any> {
    return this.screen({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get new highs
   * 
   * @param limit - Number of results
   * @returns Promise of new highs data
   */
  async newHighs(limit: number = 20): Promise<any> {
    return this.screen({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }

  /**
   * Get new lows
   * 
   * @param limit - Number of results
   * @returns Promise of new lows data
   */
  async newLows(limit: number = 20): Promise<any> {
    return this.screen({ exchangeName: 'HOSE,HNX,UPCOM' }, limit);
  }
}
