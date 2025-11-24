/**
 * DNSE Connector Module
 * 
 * Exports DNSE data providers and registers them with the provider registry
 */

export { DNSETradingProvider } from './trading';

// Auto-register DNSE providers when this module is imported
import { ProviderRegistry } from '../../core/registry';
import { ProviderType } from '../../core/types';
import { DNSETradingProvider } from './trading';

// Register DNSE Trading provider
ProviderRegistry.register('trading', 'dnse', DNSETradingProvider, ProviderType.API);
