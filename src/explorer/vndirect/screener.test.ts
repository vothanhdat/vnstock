import { VNDirectScreenerProvider } from './screener';

describe('VNDirectScreenerProvider', () => {
  const screener = new VNDirectScreenerProvider({ showLog: false });

  it('should screen stocks with default parameters', async () => {
    const results = await screener.screen({}, 5);
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeLessThanOrEqual(5);
    if (results.length > 0) {
      expect(results[0]).toHaveProperty('code');
    }
  });

  it('should respect the limit parameter', async () => {
    const limit = 3;
    const results = await screener.screen({}, limit);
    expect(results.length).toBeLessThanOrEqual(limit);
  });

  it('should filter by specific stock code (VCB)', async () => {
    const results = await screener.screen({ code: 'VCB' });
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
    const vcb = results.find(r => r.code === 'VCB');
    expect(vcb).toBeDefined();
    expect(vcb?.code).toBe('VCB');
    // Check for some expected fields
    expect(vcb).toHaveProperty('priceCr');
    expect(vcb).toHaveProperty('marketCapCr');
    expect(vcb).toHaveProperty('peCr');
  });

  it('should handle custom filters (PE range)', async () => {
    const results = await screener.screen({
      floor: 'HOSE',
      peCr: [5, 10],
      sort: 'peCr:asc'
    }, 5);
    
    expect(results).toBeDefined();
    if (results.length > 0) {
      const stock = results[0];
      expect(stock.peCr).toBeGreaterThanOrEqual(5);
      expect(stock.peCr).toBeLessThanOrEqual(10);
    }
  });
});
