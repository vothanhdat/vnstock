/**
 * TCBS Explorer Module
 * 
 * Exports TCBS data providers and registers them with the provider registry
 */

export { TCBSQuoteProvider } from './quote';
export { TCBSCompanyProvider } from './company';
export { TCBSFinancialProvider } from './financial';
export { TCBSScreenerProvider } from './screener';
export { TCBSTradingProvider } from './trading';
export { TCBSListingProvider, TCBSListingItem } from './listing';

// Auto-register TCBS providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { ProviderType } from '../../core/types';
import { TCBSQuoteProvider } from './quote';
import { TCBSCompanyProvider } from './company';
import { TCBSFinancialProvider } from './financial';
import { TCBSScreenerProvider } from './screener';
import { TCBSTradingProvider } from './trading';
import { TCBSListingProvider } from './listing';

// Register all TCBS providers
ProviderRegistry.register('quote', 'tcbs', TCBSQuoteProvider, ProviderType.SCRAPING);
ProviderRegistry.register('company', 'tcbs', TCBSCompanyProvider, ProviderType.SCRAPING);
ProviderRegistry.register('financial', 'tcbs', TCBSFinancialProvider, ProviderType.SCRAPING);
ProviderRegistry.register('screener', 'tcbs', TCBSScreenerProvider, ProviderType.SCRAPING);
ProviderRegistry.register('trading', 'tcbs', TCBSTradingProvider, ProviderType.SCRAPING);
ProviderRegistry.register('listing', 'tcbs', TCBSListingProvider, ProviderType.SCRAPING);

