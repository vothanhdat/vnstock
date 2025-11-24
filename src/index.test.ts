/**
 * Basic tests for vnstock core functionality
 */

import { Vnstock, DataSource, TimeFrame } from './index';
import { ProviderRegistry } from './core/registry';

describe('Vnstock Core', () => {
  describe('Vnstock Client', () => {
    it('should create a Vnstock instance', () => {
      const client = new Vnstock();
      expect(client).toBeInstanceOf(Vnstock);
    });

    it('should throw error for unsupported source', () => {
      expect(() => {
        new Vnstock('ACB', 'INVALID_SOURCE');
      }).toThrow();
    });

    it('should create stock components with mock providers', () => {
      // Register mock providers
      class MockProvider {
        constructor(public args?: any) {}
        async history() { return []; }
        async profile() { return {}; }
        async balanceSheet() { return []; }
      }

      ProviderRegistry.register('quote', 'vci', MockProvider);
      ProviderRegistry.register('company', 'vci', MockProvider);
      ProviderRegistry.register('financial', 'vci', MockProvider);
      ProviderRegistry.register('listing', 'vci', MockProvider);
      ProviderRegistry.register('trading', 'vci', MockProvider);
      ProviderRegistry.register('screener', 'vci', MockProvider);

      const client = new Vnstock();
      const stock = client.stock('ACB');
      expect(stock).toBeDefined();
      expect(stock.quote).toBeDefined();
      expect(stock.company).toBeDefined();
      expect(stock.finance).toBeDefined();
      
      // Clean up
      ProviderRegistry.clear();
    });
  });

  describe('Constants', () => {
    it('should have DataSource enum', () => {
      expect(DataSource.VCI).toBe('vci');
      expect(DataSource.TCBS).toBe('tcbs');
      expect(DataSource.MSN).toBe('msn');
    });

    it('should have TimeFrame enum', () => {
      expect(TimeFrame.DAILY).toBe('1D');
      expect(TimeFrame.WEEKLY).toBe('1W');
      expect(TimeFrame.MONTHLY).toBe('1M');
    });
  });

  describe('ProviderRegistry', () => {
    beforeEach(() => {
      ProviderRegistry.clear();
    });

    it('should register and retrieve providers', () => {
      class MockProvider {
        constructor() {}
      }

      ProviderRegistry.register('quote', 'test', MockProvider);
      const Provider = ProviderRegistry.get('quote', 'test');
      expect(Provider).toBe(MockProvider);
    });

    it('should throw error for non-existent provider', () => {
      expect(() => {
        ProviderRegistry.get('quote', 'nonexistent');
      }).toThrow();
    });

    it('should list sources for a category', () => {
      class MockProvider {
        constructor() {}
      }

      ProviderRegistry.register('quote', 'test1', MockProvider);
      ProviderRegistry.register('quote', 'test2', MockProvider);
      
      const sources = ProviderRegistry.listSources('quote');
      expect(sources).toContain('test1');
      expect(sources).toContain('test2');
    });
  });
});
