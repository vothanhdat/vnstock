/**
 * TCBS Financial Provider - TypeScript Implementation
 * 
 * Provides financial statements and ratios from TCBS Securities
 */

import axios from 'axios';
import { getLogger } from '../../core/logger';
import { TCBSFinancialReport } from './types';

const logger = getLogger('TCBS.Financial');

const BASE_URL = 'https://apipubaws.tcbs.com.vn';
const ANALYSIS_URL = 'tcanalysis';

const FINANCIAL_REPORT_MAP: Record<string, string> = {
  balance_sheet: 'balancesheet',
  income_statement: 'incomestatement',
  cash_flow: 'cashflow',
};

const FINANCIAL_REPORT_PERIOD_MAP: Record<string, string> = {
  year: 'Y',
  quarter: 'Q',
};

export class TCBSFinancialProvider {
  private symbol: string;
  private headers: Record<string, string>;
  private showLog: boolean;
  private reportType: string;
  private period: string;

  constructor(config?: { 
    symbol?: string; 
    randomAgent?: boolean; 
    showLog?: boolean;
    reportType?: 'balance_sheet' | 'income_statement' | 'cash_flow';
    period?: 'year' | 'quarter';
  }) {
    this.symbol = config?.symbol?.toUpperCase() || '';
    this.showLog = config?.showLog !== false;
    
    // Validate report type
    const reportType = config?.reportType || 'income_statement';
    if (!['balance_sheet', 'income_statement', 'cash_flow'].includes(reportType)) {
      throw new Error('Invalid report type. Must be: balance_sheet, income_statement, or cash_flow');
    }
    
    // Validate period
    const period = config?.period || 'quarter';
    if (!['year', 'quarter'].includes(period)) {
      throw new Error('Invalid period. Must be: year or quarter');
    }
    
    this.reportType = FINANCIAL_REPORT_MAP[reportType];
    this.period = FINANCIAL_REPORT_PERIOD_MAP[period];
    
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
   * Get financial report
   * 
   * @param reportType - Type of financial report
   * @param period - Report period (year or quarter)
   * @returns Promise of financial data
   */
  async report(reportType?: string, period?: string): Promise<any> {
    try {
      const effectiveReportType = reportType 
        ? FINANCIAL_REPORT_MAP[reportType] || reportType
        : this.reportType;
      
      const effectivePeriod = period 
        ? FINANCIAL_REPORT_PERIOD_MAP[period] || period
        : this.period;

      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/finance/${this.symbol}/${effectiveReportType}`;
      
      const params = {
        yearly: effectivePeriod === 'Y' ? 1 : 0,
        isAll: true,
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching ${effectiveReportType} for ${this.symbol} (period: ${effectivePeriod})`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching financial report for ${this.symbol}:`, error.message);
      throw error;
    }
  }

  /**
   * Get balance sheet
   * 
   * @param period - Report period (year or quarter)
   * @returns Promise of balance sheet data
   */
  async balanceSheet(period?: string): Promise<TCBSFinancialReport[]> {
    return this.report('balance_sheet', period);
  }

  /**
   * Get income statement
   * 
   * @param period - Report period (year or quarter)
   * @returns Promise of income statement data
   */
  async incomeStatement(period?: string): Promise<TCBSFinancialReport[]> {
    return this.report('income_statement', period);
  }

  /**
   * Get cash flow statement
   * 
   * @param period - Report period (year or quarter)
   * @returns Promise of cash flow data
   */
  async cashFlow(period?: string): Promise<TCBSFinancialReport[]> {
    return this.report('cash_flow', period);
  }

  /**
   * Get financial ratios
   * 
   * @returns Promise of financial ratios data
   */
  async ratio(): Promise<any> {
    try {
      const url = `${BASE_URL}/${ANALYSIS_URL}/v1/finance/${this.symbol}/financialratio`;
      
      const params = {
        yearly: 0,
        isAll: true,
      };

      const config = {
        headers: this.headers,
        params,
        timeout: 30000,
      };

      if (this.showLog) {
        logger.info(`Fetching financial ratios for ${this.symbol}`);
      }

      const response = await axios.get(url, config);
      return response.data;
    } catch (error: any) {
      logger.error(`Error fetching financial ratios for ${this.symbol}:`, error.message);
      throw error;
    }
  }
}
