/**
 * Type definitions for vnstock library.
 * 
 * This module provides:
 * - Enums for data categories, provider types, market types
 * - Interfaces for provider interfaces
 * - Types for structured return data
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum DataCategory {
  QUOTE = 'quote',
  COMPANY = 'company',
  FINANCIAL = 'financial',
  TRADING = 'trading',
  LISTING = 'listing',
  SCREENER = 'screener',
}

export enum ProviderType {
  SCRAPING = 'scraping', // Web scraping sources (VCI, TCBS, MSN)
  API = 'api',           // REST API partners (FMP, XNO, Binance, DNSE)
}

export enum MarketType {
  STOCK = 'stock',
  INDEX = 'index',
  DERIVATIVE = 'derivative',
  BOND = 'bond',
  FUND = 'fund',
  COMMODITY = 'commodity',
  CRYPTO = 'crypto',
  FOREX = 'forex',
}

export enum ExchangeType {
  HOSE = 'HOSE',   // Ho Chi Minh Stock Exchange
  HNX = 'HNX',     // Hanoi Stock Exchange
  UPCOM = 'UPCOM', // Unlisted Public Company Market
  ALL = 'ALL',     // All exchanges
}

export enum TimeFrame {
  // Minute intervals
  MINUTE_1 = '1m',
  MINUTE_5 = '5m',
  MINUTE_15 = '15m',
  MINUTE_30 = '30m',
  // Hour intervals
  HOUR_1 = '1H',
  HOUR_4 = '4h',
  // Day/Week/Month intervals
  DAY_1 = '1D',
  DAILY = '1D',
  WEEK_1 = '1W',
  WEEKLY = '1W',
  MONTH_1 = '1M',
  MONTHLY = '1M',
}

export enum DataSource {
  VCI = 'vci',
  TCBS = 'tcbs',
  MSN = 'msn',
  DNSE = 'dnse',
  BINANCE = 'binance',
  FMP = 'fmp',
  XNO = 'xno',
  FMARKET = 'fmarket', // Fund market
}

export namespace DataSource {
  export function allSources(): string[] {
    return Object.values(DataSource).filter(v => typeof v === 'string');
  }
}

// ============================================================================
// INTERFACE DEFINITIONS
// ============================================================================

export interface ProviderInfo {
  name: string;
  category: DataCategory;
  type: ProviderType;
  class_path: string;
  supported_methods: string[];
}

export interface QuoteData {
  symbol: string;
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  value?: number;
}

export interface CompanyProfile {
  symbol: string;
  company_name: string;
  exchange?: string;
  industry?: string;
  sector?: string;
  website?: string;
  employees?: number;
  description?: string;
  [key: string]: any;
}

/**
 * Unified Financial Data interface
 * 
 * This interface standardizes financial data from different providers (TCBS, VCI, etc.)
 * It covers three main categories:
 * 1. Financial Statements (Income Statement, Balance Sheet, Cash Flow)
 * 2. Financial Ratios (Valuation, Profitability, Liquidity, Leverage)
 * 3. Growth Metrics
 * 
 * All monetary values are in the source currency (typically VND).
 * Ratios and percentages are in decimal form (e.g., 0.15 for 15%).
 */
export interface FinancialData {
  // ============= Identification =============
  /** Stock ticker symbol */
  symbol: string;
  /** Reporting period: 'year' or 'quarter' */
  period: 'year' | 'quarter';
  /** Fiscal year */
  year: number;
  /** Quarter number (1-4), only present when period is 'quarter' */
  quarter?: number;
  /** Data update timestamp */
  update_date?: number;

  // ============= Income Statement =============
  /** Total revenue */
  revenue?: number;
  /** Revenue growth rate (YoY or QoQ) */
  revenue_growth?: number;
  /** Cost of goods sold */
  cost_of_goods_sold?: number;
  /** Gross profit (revenue - COGS) */
  gross_profit?: number;
  /** Operating expenses */
  operating_expenses?: number;
  /** Operating profit (EBIT) */
  operating_profit?: number;
  /** Interest expense */
  interest_expense?: number;
  /** Profit before tax */
  pre_tax_profit?: number;
  /** Net profit after tax */
  net_profit?: number;
  /** Net profit growth rate (YoY or QoQ) */
  net_profit_growth?: number;
  /** Shareholder income (profit attributable to shareholders) */
  shareholder_income?: number;
  /** EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization) */
  ebitda?: number;
  /** EBIT (Earnings Before Interest and Taxes) */
  ebit?: number;

  // ============= Valuation Ratios =============
  /** Earnings per share */
  eps?: number;
  /** Trailing twelve months EPS */
  eps_ttm?: number;
  /** Book value per share */
  bvps?: number;
  /** Price to earnings ratio */
  pe?: number;
  /** Price to book ratio */
  pb?: number;
  /** Price to sales ratio */
  ps?: number;
  /** Price to cash flow ratio */
  pcf?: number;
  /** Enterprise value */
  ev?: number;
  /** EV to EBITDA ratio */
  ev_per_ebitda?: number;
  /** Dividend per share or dividend yield */
  dividend?: number;

  // ============= Profitability Ratios =============
  /** Return on equity */
  roe?: number;
  /** Return on assets */
  roa?: number;
  /** Return on invested capital */
  roic?: number;
  /** Gross margin (gross_profit / revenue) */
  gross_margin?: number;
  /** Net profit margin (net_profit / revenue) */
  net_profit_margin?: number;
  /** EBIT margin (ebit / revenue) */
  ebit_margin?: number;

  // ============= Liquidity Ratios =============
  /** Current ratio (current_assets / current_liabilities) */
  current_ratio?: number;
  /** Quick ratio ((current_assets - inventory) / current_liabilities) */
  quick_ratio?: number;
  /** Cash ratio (cash / current_liabilities) */
  cash_ratio?: number;
  /** Interest coverage ratio (EBIT / interest_expense) */
  interest_coverage?: number;

  // ============= Leverage Ratios =============
  /** Debt to equity ratio */
  debt_to_equity?: number;
  /** Leverage ratio */
  leverage?: number;

  // ============= Market Data =============
  /** Number of issued shares */
  issued_shares?: number;
  /** Charter capital */
  charter_capital?: number;

  // ============= Provider-specific extra fields =============
  /** Allow provider-specific additional fields */
  [key: string]: any;
}

/**
 * Balance Sheet specific data
 */
export interface BalanceSheetData extends FinancialData {
  /** Total assets */
  total_assets?: number;
  /** Total liabilities */
  total_liabilities?: number;
  /** Total equity */
  total_equity?: number;
  /** Current assets */
  current_assets?: number;
  /** Non-current assets */
  non_current_assets?: number;
  /** Current liabilities */
  current_liabilities?: number;
  /** Non-current liabilities */
  non_current_liabilities?: number;
  /** Cash and cash equivalents */
  cash?: number;
  /** Inventory */
  inventory?: number;
  /** Accounts receivable */
  accounts_receivable?: number;
  /** Accounts payable */
  accounts_payable?: number;
  /** Long-term debt */
  long_term_debt?: number;
  /** Short-term debt */
  short_term_debt?: number;
}

/**
 * Cash Flow Statement specific data
 */
export interface CashFlowData extends FinancialData {
  /** Cash flow from operating activities */
  operating_cash_flow?: number;
  /** Cash flow from investing activities */
  investing_cash_flow?: number;
  /** Cash flow from financing activities */
  financing_cash_flow?: number;
  /** Net change in cash */
  net_cash_change?: number;
  /** Free cash flow (operating - capex) */
  free_cash_flow?: number;
  /** Capital expenditure */
  capex?: number;
}

export interface PriceDepthData {
  bids: Array<{ price: number; volume: number }>;
  asks: Array<{ price: number; volume: number }>;
}

/**
 * Screener Field Metadata
 * Describes a field available for screening
 */
export interface ScreenerFieldInfo {
  /** Field identifier */
  key: string;
  /** Localized label */
  label: { vi: string; en: string };
  /** Localized tooltip/description */
  tooltip?: { vi: string; en: string };
  /** Unit of measurement (e.g., %, billion) */
  unit?: string | { vi: string; en: string };
  /** Data type (e.g., fundamental, technical) */
  type?: string;
  /** Enum values for list-based fields */
  values?: any[];
}

/**
 * Localized Field Metadata
 * Describes a field with localized strings
 */
export interface LocalizedFieldInfo {
  /** Field identifier */
  key: string;
  /** Localized label */
  label: string;
  /** Localized tooltip/description */
  tooltip?: string;
  /** Unit of measurement (e.g., %, billion) */
  unit?: string;
  /** Data type (e.g., fundamental, technical) */
  type?: string;
  /** Enum values for list-based fields */
  values?: any[];
}

/**
 * @deprecated Use LocalizedFieldInfo instead
 */
export type LocalizedScreenerFieldInfo = LocalizedFieldInfo;

// ============================================================================
// PROVIDER INTERFACES
// ============================================================================

export interface QuoteProvider {
  /**
   * Fetch historical price data.
   * 
   * @param symbol - Stock symbol
   * @param start - Start date (YYYY-MM-DD)
   * @param end - End date (YYYY-MM-DD)
   * @param interval - Time interval (1D, 1W, 1M, etc.)
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of quote data
   */
  history(
    symbol: string,
    start: string,
    end: string,
    interval?: string,
    kwargs?: Record<string, any>
  ): Promise<QuoteData[]>;

  /**
   * Fetch intraday trading data.
   * 
   * @param symbol - Stock symbol
   * @param pageSize - Number of records to fetch
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of intraday trading data
   */
  intraday(
    symbol: string,
    pageSize?: number,
    kwargs?: Record<string, any>
  ): Promise<QuoteData[]>;
}

export interface CompanyProvider {
  /**
   * Fetch company profile information.
   * 
   * @param symbol - Stock symbol
   * @param kwargs - Additional provider-specific parameters
   * @returns Company profile data
   */
  profile(symbol: string, kwargs?: Record<string, any>): Promise<CompanyProfile>;

  /**
   * Fetch company officers/executives information.
   * 
   * @param symbol - Stock symbol
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of officers data
   */
  officers(symbol: string, kwargs?: Record<string, any>): Promise<any[]>;

  /**
   * Fetch major shareholders information.
   * 
   * @param symbol - Stock symbol
   * @param pageSize - Number of records to fetch
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of shareholders data
   */
  shareholders(
    symbol: string,
    pageSize?: number,
    kwargs?: Record<string, any>
  ): Promise<any[]>;
}

export interface FinancialProvider {
  /**
   * Fetch balance sheet data.
   * 
   * @param symbol - Stock symbol
   * @param period - 'quarter' or 'year'
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of balance sheet data
   */
  balanceSheet(
    symbol: string,
    period?: string,
    kwargs?: Record<string, any>
  ): Promise<FinancialData[]>;

  /**
   * Fetch income statement data.
   * 
   * @param symbol - Stock symbol
   * @param period - 'quarter' or 'year'
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of income statement data
   */
  incomeStatement(
    symbol: string,
    period?: string,
    kwargs?: Record<string, any>
  ): Promise<FinancialData[]>;

  /**
   * Fetch cash flow statement data.
   * 
   * @param symbol - Stock symbol
   * @param period - 'quarter' or 'year'
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of cash flow data
   */
  cashFlow(
    symbol: string,
    period?: string,
    kwargs?: Record<string, any>
  ): Promise<FinancialData[]>;

  /**
   * Fetch financial ratios.
   * 
   * @param symbol - Stock symbol
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of financial ratios
   */
  ratios(symbol: string, kwargs?: Record<string, any>): Promise<any[]>;
}

export interface TradingProvider {
  /**
   * Fetch real-time price board data.
   * 
   * @param symbols - List of symbols (undefined = all)
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of price board data
   */
  priceBoard(
    symbols?: string[],
    kwargs?: Record<string, any>
  ): Promise<any[]>;

  /**
   * Fetch order book / price depth data.
   * 
   * @param symbol - Stock symbol
   * @param kwargs - Additional provider-specific parameters
   * @returns Price depth data with bid/ask levels
   */
  priceDepth(
    symbol: string,
    kwargs?: Record<string, any>
  ): Promise<PriceDepthData>;
}

export interface ListingProvider {
  /**
   * Get list of all available symbols.
   * 
   * @param kwargs - Additional provider-specific parameters
   * @returns List of symbol strings
   */
  allSymbols(kwargs?: Record<string, any>): Promise<string[]>;

  /**
   * Get symbols filtered by exchange.
   * 
   * @param exchange - Exchange code (HOSE, HNX, UPCOM)
   * @param kwargs - Additional provider-specific parameters
   * @returns List of symbol strings
   */
  symbolsByExchange(
    exchange: string,
    kwargs?: Record<string, any>
  ): Promise<string[]>;

  /**
   * Get symbols grouped by industries.
   * 
   * @param kwargs - Additional provider-specific parameters
   * @returns Array with symbol and industry mapping
   */
  symbolsByIndustries(kwargs?: Record<string, any>): Promise<any[]>;
}

export interface ScreenerProvider {
  /**
   * Screen stocks based on criteria.
   * 
   * @param criteria - Dictionary of screening criteria
   * @param kwargs - Additional provider-specific parameters
   * @returns Array of filtered stocks
   */
  screen(
    criteria: Record<string, any>,
    kwargs?: Record<string, any>
  ): Promise<any[]>;
}

// ============================================================================
// STANDARD CONSTANTS
// ============================================================================

export class FileTypes {
  static readonly MIME_TYPES: Record<string, string> = {
    // Image formats
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'ico': 'image/x-icon',
    'svg': 'image/svg+xml',
    // Document formats
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain',
    'rtf': 'application/rtf',
    // Spreadsheet formats
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'csv': 'text/csv',
    'tsv': 'text/tab-separated-values',
    // Presentation formats
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Data formats
    'json': 'application/json',
    'xml': 'application/xml',
    'yaml': 'application/yaml',
    // Archive formats
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',
    // Audio formats
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'flac': 'audio/flac',
    'aac': 'audio/aac',
    // Video formats
    'mp4': 'video/mp4',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'mkv': 'video/x-matroska',
    'webm': 'video/webm',
  };

  static getMimeType(fileExtension: string): string {
    const ext = fileExtension.replace(/^\./, '').toLowerCase();
    return FileTypes.MIME_TYPES[ext] || 'application/octet-stream';
  }
}

export class ParameterNames {
  static readonly SYMBOL = 'symbol';
  static readonly START = 'start';
  static readonly END = 'end';
  static readonly INTERVAL = 'interval';
  static readonly PAGE = 'page';
  static readonly PAGE_SIZE = 'page_size';
}

export class MethodNames {
  static readonly HISTORY = 'history';
  static readonly INTRADAY = 'intraday';
  static readonly PRICE_DEPTH = 'price_depth';
}
