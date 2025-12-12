/**
 * VNDirect Explorer Module
 * 
 * Exports VNDirect data providers and registers them with the provider registry
 */

export { VNDirectScreenerProvider } from './screener';
export * from './types';

// Auto-register VNDirect providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { DataCategory, ProviderType } from '../../core/types';
import { VNDirectScreenerProvider } from './screener';

// Register Screener Provider
ProviderRegistry.register(
  DataCategory.SCREENER,
  'vndirect',
  VNDirectScreenerProvider,
  ProviderType.API
);
