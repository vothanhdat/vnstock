/**
 * Tests for complete TCBS provider implementation
 */

// Import provider index modules to trigger registration
import './explorer/tcbs';

import { 
  TCBSQuoteProvider,
  TCBSCompanyProvider, 
  TCBSFinancialProvider,
  TCBSScreenerProvider,
  TCBSTradingProvider,
  TCBSListingProvider
} from './explorer/tcbs';
import { ProviderRegistry } from './core/registry';
import { Quote, Company, Finance, Screener, Trading, Listing } from './index';

describe('Complete TCBS Providers', () => {
  describe('TCBS Quote Provider', () => {
    it('should be registered', () => {
      expect(ProviderRegistry.has('quote', 'tcbs')).toBe(true);
    });

    it('should create instance', () => {
      const provider = new TCBSQuoteProvider({ symbol: 'VNM', showLog: false });
      expect(provider).toBeDefined();
    });
  });

  describe('TCBS Company Provider', () => {
    it('should be registered', () => {
      expect(ProviderRegistry.has('company', 'tcbs')).toBe(true);
    });

    it('should create instance for stocks', () => {
      const provider = new TCBSCompanyProvider({ symbol: 'VNM', showLog: false });
      expect(provider).toBeDefined();
    });

    it('should throw error for non-stock symbols', () => {
      expect(() => {
        new TCBSCompanyProvider({ symbol: 'VNINDEX', showLog: false });
      }).toThrow('Invalid symbol. Only stocks have company information.');
    });
  });

  describe('TCBS Financial Provider', () => {
    it('should be registered', () => {
      expect(ProviderRegistry.has('financial', 'tcbs')).toBe(true);
    });

    it('should create instance with default report type', () => {
      const provider = new TCBSFinancialProvider({ symbol: 'VNM', showLog: false });
      expect(provider).toBeDefined();
    });

    it('should create instance with balance_sheet report type', () => {
      const provider = new TCBSFinancialProvider({ 
        symbol: 'VNM', 
        reportType: 'balance_sheet',
        showLog: false 
      });
      expect(provider).toBeDefined();
    });

    it('should throw error for invalid report type', () => {
      expect(() => {
        new TCBSFinancialProvider({ 
          symbol: 'VNM', 
          reportType: 'invalid' as any,
          showLog: false 
        });
      }).toThrow();
    });

    it('should throw error for invalid period', () => {
      expect(() => {
        new TCBSFinancialProvider({ 
          symbol: 'VNM', 
          period: 'invalid' as any,
          showLog: false 
        });
      }).toThrow();
    });
  });

  describe('TCBS Screener Provider', () => {
    it('should be registered', () => {
      expect(ProviderRegistry.has('screener', 'tcbs')).toBe(true);
    });

    it('should create instance', () => {
      const provider = new TCBSScreenerProvider({ showLog: false });
      expect(provider).toBeDefined();
    });

    it('should return screener field metadata', () => {
      const provider = new TCBSScreenerProvider({ showLog: false });
      const metadata = provider.getScreenerFieldMetadata();
      expect(metadata).toBeDefined();
      expect(Object.keys(metadata).length).toBeGreaterThan(0);
      expect(metadata['marketCap']).toBeDefined();
      expect(metadata['marketCap'].label.en).toBe('Market Cap');
    });
  });

  describe('TCBS Trading Provider', () => {
    it('should be registered', () => {
      expect(ProviderRegistry.has('trading', 'tcbs')).toBe(true);
    });

    it('should create instance', () => {
      const provider = new TCBSTradingProvider({ symbol: 'VNM', showLog: false });
      expect(provider).toBeDefined();
    });
  });

  describe('TCBS Listing Provider', () => {
    it('should be registered', () => {
      expect(ProviderRegistry.has('listing', 'tcbs')).toBe(true);
    });

    it('should create instance', () => {
      const provider = new TCBSListingProvider({ showLog: false });
      expect(provider).toBeDefined();
    });
  });

  describe('Adapter Integration', () => {
    it('should work with Company adapter', () => {
      const company = new Company('tcbs', 'VNM', { showLog: false });
      expect(company).toBeDefined();
    });

    it('should work with Finance adapter', () => {
      const finance = new Finance('tcbs', 'VNM', { showLog: false });
      expect(finance).toBeDefined();
    });

    it('should work with Screener adapter', () => {
      const screener = new Screener('tcbs', { showLog: false });
      expect(screener).toBeDefined();
    });

    it('should retrieve metadata via Screener adapter', async () => {
      const screener = new Screener('tcbs', { showLog: false });
      const metadata = await screener.getFieldMetadata();
      expect(metadata).toBeDefined();
      expect(metadata['marketCap']).toBeDefined();
    });

    it('should work with Trading adapter', () => {
      const trading = new Trading('tcbs', { showLog: false });
      expect(trading).toBeDefined();
    });

    it('should work with Listing adapter', () => {
      const listing = new Listing('tcbs', { showLog: false });
      expect(listing).toBeDefined();
    });
  });

  describe('Provider Metadata', () => {
    it('should have correct metadata for all providers', () => {
      const categories = ['quote', 'company', 'financial', 'screener', 'trading', 'listing'];
      
      categories.forEach(category => {
        const metadata = ProviderRegistry.getMetadata(category, 'tcbs');
        expect(metadata).toBeDefined();
        expect(metadata?.name).toBe('tcbs');
        expect(metadata?.category).toBe(category);
        expect(metadata?.type).toBe('scraping');
      });
    });
  });
});
