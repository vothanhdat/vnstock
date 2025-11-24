/**
 * FMP Connector Module
 * 
 * Exports FMP data providers and registers them with the provider registry
 */

export { FMPQuoteProvider } from './quote';

// Auto-register FMP providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { ProviderType } from '../../core/types';
import { FMPQuoteProvider } from './quote';

// Register FMP Quote provider
ProviderRegistry.register('quote', 'fmp', FMPQuoteProvider, ProviderType.API);
