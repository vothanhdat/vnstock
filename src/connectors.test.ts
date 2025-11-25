/**
 * Tests for VCI and FMP providers
 */

// Import provider index modules to trigger registration
import './explorer/vci';
import './connector/fmp';

import { VCIQuoteProvider } from './explorer/vci/quote';
import { FMPQuoteProvider } from './connector/fmp/quote';
import { ProviderRegistry } from './core/registry';
import { Quote } from './api/quote';

describe('Connector Providers', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Suppress expected console output during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  describe('VCI Quote Provider', () => {
    it('should create VCI provider instance', () => {
      const provider = new VCIQuoteProvider({ symbol: 'ACB', showLog: false });
      expect(provider).toBeDefined();
    });

    it('should be registered in provider registry', () => {
      expect(ProviderRegistry.has('quote', 'vci')).toBe(true);
    });

    it('should be accessible through Quote adapter', () => {
      const quote = new Quote('vci', 'ACB', { showLog: false });
      expect(quote).toBeDefined();
    });
  });

  describe('FMP Quote Provider', () => {
    it('should create FMP provider instance with API key', () => {
      // Skip if no API key available
      if (!process.env.FMP_API_KEY && !process.env.FMP_TOKEN) {
        console.log('Skipping FMP test - no API key available');
        return;
      }

      const provider = new FMPQuoteProvider({ symbol: 'AAPL', showLog: false });
      expect(provider).toBeDefined();
    });

    it('should be registered in provider registry', () => {
      expect(ProviderRegistry.has('quote', 'fmp')).toBe(true);
    });

    it('should throw error without API key', () => {
      const oldKey = process.env.FMP_API_KEY;
      const oldToken = process.env.FMP_TOKEN;
      
      delete process.env.FMP_API_KEY;
      delete process.env.FMP_TOKEN;

      expect(() => {
        new FMPQuoteProvider({ symbol: 'AAPL', showLog: false });
      }).toThrow();

      // Restore
      if (oldKey) process.env.FMP_API_KEY = oldKey;
      if (oldToken) process.env.FMP_TOKEN = oldToken;
    });
  });

  describe('Provider Registration', () => {
    it('should list all registered quote providers', () => {
      const sources = ProviderRegistry.listSources('quote');
      expect(sources).toContain('vci');
      expect(sources).toContain('fmp');
    });

    it('should retrieve provider metadata', () => {
      const vciMetadata = ProviderRegistry.getMetadata('quote', 'vci');
      expect(vciMetadata).toBeDefined();
      expect(vciMetadata?.name).toBe('vci');
      expect(vciMetadata?.category).toBe('quote');

      const fmpMetadata = ProviderRegistry.getMetadata('quote', 'fmp');
      expect(fmpMetadata).toBeDefined();
      expect(fmpMetadata?.name).toBe('fmp');
      expect(fmpMetadata?.type).toBe('api');
    });
  });
});
