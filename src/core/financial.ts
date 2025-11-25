/**
 * Financial Data Normalization Utilities
 * 
 * Provides functions to convert provider-specific financial data
 * to the unified FinancialData interface.
 */

import { FinancialData, BalanceSheetData, CashFlowData } from './types';

/**
 * Normalize TCBS Financial Report to unified FinancialData
 * 
 * @param data - Raw TCBS financial report data
 * @param symbol - Stock symbol
 * @returns Normalized FinancialData
 */
export function normalizeTCBSFinancial(data: any, symbol: string): FinancialData {
  return {
    // Identification
    symbol: data.ticker || symbol,
    period: data.quarter === 0 ? 'year' : 'quarter',
    year: data.year,
    quarter: data.quarter === 0 ? undefined : data.quarter,

    // Income Statement
    revenue: data.revenue,
    revenue_growth: data.yearRevenueGrowth || data.quarterRevenueGrowth,
    cost_of_goods_sold: data.costOfGoodSold,
    gross_profit: data.grossProfit,
    operating_expenses: data.operationExpense,
    operating_profit: data.operationProfit,
    interest_expense: data.interestExpense,
    pre_tax_profit: data.preTaxProfit,
    net_profit: data.postTaxProfit,
    net_profit_growth: data.yearShareHolderIncomeGrowth || data.quarterShareHolderIncomeGrowth,
    shareholder_income: data.shareHolderIncome,
    ebitda: data.ebitda,

    // Pass through other fields
    ...extractExtraFields(data, [
      'ticker', 'quarter', 'year', 'revenue', 'yearRevenueGrowth', 'quarterRevenueGrowth',
      'costOfGoodSold', 'grossProfit', 'operationExpense', 'operationProfit',
      'interestExpense', 'preTaxProfit', 'postTaxProfit', 'shareHolderIncome',
      'yearShareHolderIncomeGrowth', 'quarterShareHolderIncomeGrowth', 'ebitda'
    ])
  };
}

/**
 * Normalize TCBS Financial Ratio to unified FinancialData
 * 
 * @param data - Raw TCBS financial ratio data
 * @param symbol - Stock symbol
 * @returns Normalized FinancialData
 */
export function normalizeTCBSRatio(data: any, symbol: string): FinancialData {
  return {
    // Identification
    symbol: data.ticker || symbol,
    period: data.quarter === 0 ? 'year' : 'quarter',
    year: data.year,
    quarter: data.quarter === 0 ? undefined : data.quarter,

    // Valuation
    eps: data.eps,
    pe: data.pe,
    pb: data.pb,
    ev: data.ev,
    dividend: data.dividend,

    // Profitability
    roe: data.roe,
    roa: data.roa,

    // Extra fields
    ...extractExtraFields(data, ['ticker', 'quarter', 'year', 'eps', 'pe', 'pb', 'ev', 'dividend', 'roe', 'roa'])
  };
}

/**
 * Normalize VCI Financial Ratio to unified FinancialData
 * 
 * @param data - Raw VCI financial ratio data
 * @param symbol - Stock symbol
 * @returns Normalized FinancialData
 */
export function normalizeVCIFinancial(data: any, symbol: string): FinancialData {
  // VCI uses length_report for quarter (1=Q1, 2=Q2, 3=Q3, 4=Q4, 5=Year)
  const isYearly = data.length_report === 5 || data.length_report === 0;
  
  return {
    // Identification
    symbol: symbol,
    period: isYearly ? 'year' : 'quarter',
    year: data.year_report,
    quarter: isYearly ? undefined : data.length_report,
    update_date: data.update_date,

    // Income Statement
    revenue: data.revenue,
    revenue_growth: data.revenue_growth,
    net_profit: data.net_profit,
    net_profit_growth: data.net_profit_growth,
    ebitda: data.ebitda,
    ebit: data.ebit,

    // Valuation
    eps: data.eps,
    eps_ttm: data.eps_ttm,
    bvps: data.bvps,
    pe: data.pe,
    pb: data.pb,
    ps: data.ps,
    pcf: data.pcf,
    ev: data.ev,
    ev_per_ebitda: data.ev_per_ebitda,
    dividend: data.dividend,

    // Profitability
    roe: data.roe,
    roa: data.roa,
    roic: data.roic,
    gross_margin: data.gross_margin,
    net_profit_margin: data.net_profit_margin,
    ebit_margin: data.ebit_margin,

    // Liquidity
    current_ratio: data.current_ratio,
    quick_ratio: data.quick_ratio,
    cash_ratio: data.cash_ratio,
    interest_coverage: data.interest_coverage,

    // Market Data
    issued_shares: data.issue_share,
    charter_capital: data.charter_capital,

    // Extra fields
    ...extractExtraFields(data, [
      'year_report', 'length_report', 'update_date', 'revenue', 'revenue_growth',
      'net_profit', 'net_profit_growth', 'ebitda', 'ebit', 'eps', 'eps_ttm',
      'bvps', 'pe', 'pb', 'ps', 'pcf', 'ev', 'ev_per_ebitda', 'dividend',
      'roe', 'roa', 'roic', 'gross_margin', 'net_profit_margin', 'ebit_margin',
      'current_ratio', 'quick_ratio', 'cash_ratio', 'interest_coverage',
      'issue_share', 'charter_capital'
    ])
  };
}

/**
 * Batch normalize TCBS financial reports
 */
export function normalizeTCBSFinancialList(dataList: any[], symbol: string): FinancialData[] {
  return dataList.map(item => normalizeTCBSFinancial(item, symbol));
}

/**
 * Batch normalize VCI financial data
 */
export function normalizeVCIFinancialList(dataList: any[], symbol: string): FinancialData[] {
  return dataList.map(item => normalizeVCIFinancial(item, symbol));
}

/**
 * Extract fields that are not in the exclude list
 */
function extractExtraFields(data: any, excludeKeys: string[]): Record<string, any> {
  const extra: Record<string, any> = {};
  for (const key of Object.keys(data)) {
    if (!excludeKeys.includes(key) && data[key] !== null && data[key] !== undefined) {
      extra[key] = data[key];
    }
  }
  return extra;
}

/**
 * Type guard to check if data is FinancialData
 */
export function isFinancialData(data: any): data is FinancialData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.symbol === 'string' &&
    (data.period === 'year' || data.period === 'quarter') &&
    typeof data.year === 'number'
  );
}

/**
 * Filter financial data by period
 */
export function filterByPeriod(
  data: FinancialData[],
  period: 'year' | 'quarter'
): FinancialData[] {
  return data.filter(item => item.period === period);
}

/**
 * Filter financial data by year
 */
export function filterByYear(
  data: FinancialData[],
  year: number
): FinancialData[] {
  return data.filter(item => item.year === year);
}

/**
 * Get latest financial data entry
 */
export function getLatest(data: FinancialData[]): FinancialData | undefined {
  if (data.length === 0) return undefined;
  
  return data.reduce((latest, current) => {
    // Compare by year first, then quarter
    if (current.year > latest.year) return current;
    if (current.year === latest.year) {
      const currentQ = current.quarter || 0;
      const latestQ = latest.quarter || 0;
      if (currentQ > latestQ) return current;
    }
    return latest;
  });
}
