/**
 * TCBS Explorer Module
 * 
 * Exports TCBS data providers and registers them with the provider registry
 */

export { TCBSQuoteProvider } from './quote';

// Auto-register TCBS providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { ProviderType } from '../../core/types';
import { TCBSQuoteProvider } from './quote';

// Register TCBS Quote provider
ProviderRegistry.register('quote', 'tcbs', TCBSQuoteProvider, ProviderType.SCRAPING);
