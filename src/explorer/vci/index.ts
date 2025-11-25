/**
 * VCI Explorer Module
 * 
 * Exports VCI data providers and registers them with the provider registry
 */

import { ProviderRegistry } from '../../core/registry';
import { VCIQuoteProvider } from './quote';
import { VCICompanyProvider } from './company';
import { VCIFinancialProvider } from './financial';
import { VCIListingProvider } from './listing';
import { VCITradingProvider } from './trading';
import { VCIScreener } from './screener';

export { 
  VCIQuoteProvider,
  VCICompanyProvider,
  VCIFinancialProvider,
  VCIListingProvider,
  VCITradingProvider,
  VCIScreener
};

ProviderRegistry.register('quote', 'vci', VCIQuoteProvider);
ProviderRegistry.register('company', 'vci', VCICompanyProvider);
ProviderRegistry.register('financial', 'vci', VCIFinancialProvider);
ProviderRegistry.register('listing', 'vci', VCIListingProvider);
ProviderRegistry.register('trading', 'vci', VCITradingProvider);
ProviderRegistry.register('screener', 'vci', VCIScreener);
