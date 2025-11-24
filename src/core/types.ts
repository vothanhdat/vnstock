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
  exchange: string;
  industry: string;
  sector: string;
  website?: string;
  employees?: number;
  description?: string;
}

export interface FinancialData {
  symbol: string;
  period: string;
  year: number;
  quarter?: number;
  revenue?: number;
  profit?: number;
  eps?: number;
  roe?: number;
}

export interface PriceDepthData {
  bids: Array<{ price: number; volume: number }>;
  asks: Array<{ price: number; volume: number }>;
}

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
