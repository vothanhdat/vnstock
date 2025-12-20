/**
 * VNDirect Screener Provider - TypeScript Implementation
 * 
 * Provides stock screening functionality from VNDirect Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { VNDirectScreenerResult, VNDirectScreenerPayload, VNDirectScreenerFilter } from './types';
import screenerMetadata from './info.json';
import unitOverrides from './units.json';

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

  // Base-unit inference (display-only): prices/values in ₫, volumes in shares, pct fields in %
  private inferUnit(code: string): string | null {
    const key = code.toLowerCase();

    if (
      key.includes('pct') ||
      key.includes('growth') ||
      key.includes('margin') ||
      key.includes('yield') ||
      key.includes('rate') ||
      key.includes('gryoy') ||
      key.includes('grqoq') ||
      key.includes('gr') ||
      key.includes('roa') ||
      key.includes('roe')
    ) {
      return '%';
    }

    if (key.includes('vol') || key.includes('volume') || key.includes('share')) {
      return 'shares';
    }

    const monetaryHints = [
      'price',
      'val',
      'cap',
      'revenue',
      'sales',
      'income',
      'profit',
      'cash',
      'debt',
      'equity',
      'asset',
      'eps',
      'bvps',
      'div',
      'band',
      'macd'
    ];

    if (monetaryHints.some(hint => key.includes(hint))) {
      return '₫';
    }

    return null;
  }

  /**
   * Get metadata for all available screener fields
   */
  getScreenerFieldMetadata(): Record<string, any> {
    const fields = new Map<string, any>();
    const bannedCodes = new Set(['PROFILE', 'FUNDAMENTAL', 'TECHNICAL', 'DRATING']);

    const ensureField = (code: string) => {
      if (!fields.has(code)) {
        fields.set(code, {
          key: code,
          label: { vi: '', en: '' },
          tooltip: { vi: '', en: '' },
          unit: null,
          type: null,
          values: null,
          group: null,
        });
      }
      return fields.get(code)!;
    };
    
    if ((screenerMetadata as any).data) {
      for (const item of (screenerMetadata as any).data) {
        if (!item.refCode || item.refType === 'CATEGORIES' || bannedCodes.has(item.refCode)) continue;
        const existing = ensureField(item.refCode);

        if (item.refGroup === 'TOOLTIP') {
          if (item.locale === 'VN') {
            existing.tooltip.vi = item.description;
          } else if (item.locale === 'EN_GB') {
            existing.tooltip.en = item.description;
          }
        } else {
          existing.group = existing.group || item.refGroup;
          existing.type = existing.type || item.refType;

          if (item.locale === 'VN') {
            existing.label.vi = item.description;
          } else if (item.locale === 'EN_GB') {
            existing.label.en = item.description;
          }
        }
      }
    }
    
    const applyOverrides = (code: string) => {
      const target = ensureField(code);
      const override = (unitOverrides as Record<string, any>)[code];

      if (override?.label) {
        target.label = {
          vi: override.label.vi || target.label.vi,
          en: override.label.en || target.label.en,
        };
      }

      if (override?.tooltip) {
        target.tooltip = {
          vi: override.tooltip.vi || target.tooltip.vi,
          en: override.tooltip.en || target.tooltip.en,
        };
      }

      if (override?.group && !target.group) target.group = override.group;
      if (override?.type && !target.type) target.type = override.type;
      if (override?.values) target.values = override.values;
      const hasOverrideUnit = override && Object.prototype.hasOwnProperty.call(override, 'unit');
      if (hasOverrideUnit) {
        target.unit = override.unit;
      }

      if ((target.unit === null || target.unit === undefined) && !hasOverrideUnit) {
        target.unit = this.inferUnit(code);
      }

      if (!target.label.vi && target.label.en) target.label.vi = target.label.en;
      if (!target.label.en && target.label.vi) target.label.en = target.label.vi;
      if (!target.label.vi && !target.label.en) {
        target.label = { vi: code, en: code };
      }

      if (!target.tooltip.vi && !target.tooltip.en) {
        target.tooltip = null;
      } else {
        if (!target.tooltip.vi && target.tooltip.en) target.tooltip.vi = target.tooltip.en;
        if (!target.tooltip.en && target.tooltip.vi) target.tooltip.en = target.tooltip.vi;
      }
    };

    const codes = new Set<string>([...fields.keys(), ...Object.keys(unitOverrides as Record<string, any>)]);
    for (const code of codes) {
      applyOverrides(code);
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
      const bannedCodes = new Set(['PROFILE', 'FUNDAMENTAL', 'TECHNICAL', 'DRATING']);
      const metaFields = (screenerMetadata as any).data
        .filter((item: any) => item.refType !== 'CATEGORIES' && !bannedCodes.has(item.refCode))
        .map((item: any) => item.refCode)
        .filter((code: any) => typeof code === 'string' && code.length > 0);

      // Ensure common fields are included and remove duplicates
      const defaultFields = [...new Set([
        'code',
        'companyNameVi',
        'companyNameEn',
        'floor',
        'industrylv2',
        'priceCr',
        'nmVolCr',
        'nmValCr',
        'marketCapCr',
        ...metaFields,
      ])];

      

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
