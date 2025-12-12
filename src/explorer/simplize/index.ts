/**
 * Simplize Explorer Module
 * 
 * Exports Simplize data providers and registers them with the provider registry
 */

export { SimplizeScreenerProvider } from './screener';

// Auto-register Simplize providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { ProviderType } from '../../core/types';
import { SimplizeScreenerProvider } from './screener';

ProviderRegistry.register(
  'screener',
  'simplize',
  SimplizeScreenerProvider,
  ProviderType.API
);
