/**
 * VNDirect Explorer Module
 * 
 * Exports VNDirect data providers and registers them with the provider registry
 */

export { VNDirectScreenerProvider } from './screener';
export { VNDirectPriceBoard, type VNDirectPriceBoardData } from './priceboard';
export { VNDirectTradingProvider } from './trading';
export { VNDirectQuoteProvider } from './quote';
export { VNDirectCompanyProvider } from './company';
export { VNDirectFinancialProvider } from './financial';
export { VNDirectListingProvider } from './listing';
export * from './types';

// Auto-register VNDirect providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { DataCategory, ProviderType } from '../../core/types';
import { VNDirectScreenerProvider } from './screener';
import { VNDirectQuoteProvider } from './quote';
import { VNDirectCompanyProvider } from './company';
import { VNDirectFinancialProvider } from './financial';
import { VNDirectListingProvider } from './listing';

// Register Screener Provider
ProviderRegistry.register(
  DataCategory.SCREENER,
  'vndirect',
  VNDirectScreenerProvider,
  ProviderType.SCRAPING
);

// Register Quote Provider
ProviderRegistry.register(
  DataCategory.QUOTE,
  'vndirect',
  VNDirectQuoteProvider,
  ProviderType.SCRAPING
);

// Register Company Provider
ProviderRegistry.register(
  DataCategory.COMPANY,
  'vndirect',
  VNDirectCompanyProvider,
  ProviderType.SCRAPING
);

// Register Financial Provider
ProviderRegistry.register(
  DataCategory.FINANCIAL,
  'vndirect',
  VNDirectFinancialProvider,
  ProviderType.SCRAPING
);

// Register Listing Provider
ProviderRegistry.register(
  DataCategory.LISTING,
  'vndirect',
  VNDirectListingProvider,
  ProviderType.SCRAPING
);
