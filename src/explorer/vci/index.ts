/**
 * VCI Explorer Module
 * 
 * Exports VCI data providers and registers them with the provider registry
 */

export { VCIQuoteProvider } from './quote';

// Auto-register VCI providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { ProviderType } from '../../core/types';
import { VCIQuoteProvider } from './quote';

// Register VCI Quote provider
ProviderRegistry.register('quote', 'vci', VCIQuoteProvider, ProviderType.SCRAPING);
