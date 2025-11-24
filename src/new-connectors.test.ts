/**
 * Tests for TCBS and DNSE providers
 */

// Import provider index modules to trigger registration
import './explorer/tcbs';
import './connector/dnse';

import { TCBSQuoteProvider } from './explorer/tcbs/quote';
import { DNSETradingProvider } from './connector/dnse/trading';
import { ProviderRegistry } from './core/registry';
import { Quote } from './api/quote';

describe('New Connector Providers', () => {
  describe('TCBS Quote Provider', () => {
    it('should create TCBS provider instance', () => {
      const provider = new TCBSQuoteProvider({ symbol: 'ACB', showLog: false });
      expect(provider).toBeDefined();
    });

    it('should be registered in provider registry', () => {
      expect(ProviderRegistry.has('quote', 'tcbs')).toBe(true);
    });

    it('should be accessible through Quote adapter', () => {
      const quote = new Quote('tcbs', 'VNM', { showLog: false });
      expect(quote).toBeDefined();
    });

    it('should handle INDEX symbols', () => {
      const provider = new TCBSQuoteProvider({ symbol: 'VNINDEX', showLog: false });
      expect(provider).toBeDefined();
    });

    it('should throw error for invalid index', () => {
      expect(() => {
        new TCBSQuoteProvider({ symbol: 'INVALIDINDEX', showLog: false });
      }).toThrow();
    });
  });

  describe('DNSE Trading Provider', () => {
    it('should create DNSE provider instance', () => {
      const provider = new DNSETradingProvider();
      expect(provider).toBeDefined();
    });

    it('should be registered in provider registry', () => {
      expect(ProviderRegistry.has('trading', 'dnse')).toBe(true);
    });

    it('should not be authenticated initially', () => {
      const provider = new DNSETradingProvider();
      expect(provider.isAuthenticated()).toBe(false);
    });

    it('should have null token initially', () => {
      const provider = new DNSETradingProvider();
      expect(provider.getToken()).toBeNull();
      expect(provider.getTradingTokenValue()).toBeNull();
    });
  });

  describe('Provider Registration', () => {
    it('should have TCBS registered in quote providers', () => {
      const sources = ProviderRegistry.listSources('quote');
      expect(sources).toContain('tcbs');
    });

    it('should have DNSE registered in trading providers', () => {
      const sources = ProviderRegistry.listSources('trading');
      expect(sources).toContain('dnse');
    });

    it('should retrieve TCBS provider metadata', () => {
      const metadata = ProviderRegistry.getMetadata('quote', 'tcbs');
      expect(metadata).toBeDefined();
      expect(metadata?.name).toBe('tcbs');
      expect(metadata?.category).toBe('quote');
      expect(metadata?.type).toBe('scraping');
    });

    it('should retrieve DNSE provider metadata', () => {
      const metadata = ProviderRegistry.getMetadata('trading', 'dnse');
      expect(metadata).toBeDefined();
      expect(metadata?.name).toBe('dnse');
      expect(metadata?.category).toBe('trading');
      expect(metadata?.type).toBe('api');
    });
  });
});
