/**
 * MSN Explorer Module
 * 
 * Exports MSN data providers and registers them with the provider registry
 */

import { ProviderRegistry } from '../../core/registry';
import { MSNQuoteProvider } from './quote';
import { MSNListingProvider } from './listing';

export { 
  MSNQuoteProvider,
  MSNListingProvider
};

ProviderRegistry.register('quote', 'msn', MSNQuoteProvider);
ProviderRegistry.register('listing', 'msn', MSNListingProvider);
