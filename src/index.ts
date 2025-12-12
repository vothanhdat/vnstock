/**
 * Vnstock - Vietnamese Stock Market Analysis Library
 * 
 * A beginner-friendly yet powerful TypeScript toolkit for financial
 * analysis and automation — built to make modern investing accessible
 * to everyone.
 */

// Auto-register providers by importing connector and explorer modules
import './explorer/vci';
import './explorer/tcbs';
import './explorer/msn';
import './explorer/vndirect';
import './explorer/simplize';
import './connector/fmp';
import './connector/dnse';

// Main client
export { Vnstock, StockComponents, MSNComponents } from './common/client';

// API classes
export { Quote } from './api/quote';
export { Company } from './api/company';
export { Finance } from './api/financial';
export { Listing } from './api/listing';
export { Trading } from './api/trading';
export { Screener } from './api/screener';

// Core types and enums
export {
  DataCategory,
  ProviderType,
  MarketType,
  ExchangeType,
  TimeFrame,
  DataSource,
} from './core/types';

export type {
  QuoteData,
  CompanyProfile,
  FinancialData,
  BalanceSheetData,
  CashFlowData,
  PriceDepthData,
  QuoteProvider,
  CompanyProvider,
  FinancialProvider,
  TradingProvider,
  ListingProvider,
  ScreenerProvider,
  ProviderInfo,
  FileTypes,
  ParameterNames,
  MethodNames,
} from './core/types';

// Financial utilities
export {
  normalizeTCBSFinancial,
  normalizeTCBSFinancialList,
  normalizeTCBSRatio,
  normalizeVCIFinancial,
  normalizeVCIFinancialList,
  isFinancialData,
  filterByPeriod,
  filterByYear,
  getLatest,
} from './core/financial';

// Constants
export {
  INDICES_INFO,
  INDICES_MAP,
  INDEX_GROUPS,
  SECTOR_IDS,
  EXCHANGES,
  type IndexInfo,
  type IndicesInfoMap,
  type IndexGroups,
  type SectorIds,
  type Exchanges,
} from './constants';

// Core utilities
export { Config } from './core/config';
export { getLogger, Logger } from './core/logger';
export { ProviderRegistry } from './core/registry';
export { BaseAdapter } from './core/base';

// Connectors and explorers
export { VCIQuoteProvider } from './explorer/vci';
export { 
  TCBSQuoteProvider, 
  TCBSCompanyProvider, 
  TCBSFinancialProvider, 
  TCBSScreenerProvider, 
  TCBSTradingProvider,
  TCBSListingProvider 
} from './explorer/tcbs';
export { FMPQuoteProvider } from './connector/fmp';
export { DNSETradingProvider } from './connector/dnse';
export { VNDirectScreenerProvider, VNDirectPriceBoard } from './explorer/vndirect';

// Default export
import { Vnstock } from './common/client';
export default Vnstock;
