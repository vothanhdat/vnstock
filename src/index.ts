/**
 * Vnstock - Vietnamese Stock Market Analysis Library
 * 
 * A beginner-friendly yet powerful TypeScript toolkit for financial
 * analysis and automation — built to make modern investing accessible
 * to everyone.
 */

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
  QuoteData,
  CompanyProfile,
  FinancialData,
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

// Constants
export {
  INDICES_INFO,
  INDICES_MAP,
  INDEX_GROUPS,
  SECTOR_IDS,
  EXCHANGES,
  IndexInfo,
  IndicesInfoMap,
  IndexGroups,
  SectorIds,
  Exchanges,
} from './constants';

// Core utilities
export { Config } from './core/config';
export { getLogger, Logger } from './core/logger';
export { ProviderRegistry } from './core/registry';
export { BaseAdapter } from './core/base';

// Default export
import { Vnstock } from './common/client';
export default Vnstock;
