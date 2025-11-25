/**
 * XNO Connector Module
 * 
 * Exports XNO data providers and registers them with the provider registry
 */

import { ProviderRegistry } from '../../core/registry';
import { ProviderType } from '../../core/types';
import { XNOQuoteProvider } from './quote';

export { XNOQuoteProvider };

// Register XNO Quote provider
ProviderRegistry.register('quote', 'xno', XNOQuoteProvider, ProviderType.API);
