
import { SimplizeScreenerProvider } from './screener';

describe('SimplizeScreenerProvider', () => {
  const screener = new SimplizeScreenerProvider();

  it('should return correct metadata structure with English translations', () => {
    const metadata = screener.getScreenerFieldMetadata();
    expect(metadata).toBeDefined();
    
    const keys = Object.keys(metadata);
    expect(keys.length).toBeGreaterThan(0);
    
    // Check a specific field, e.g., marketCapVnd
    const marketCap = metadata['marketCapVnd'];
    expect(marketCap).toBeDefined();
    expect(marketCap).toHaveProperty('key', 'marketCapVnd');
    expect(marketCap).toHaveProperty('label');
    expect(marketCap.label).toHaveProperty('vi', 'Vốn hóa');
    expect(marketCap.label).toHaveProperty('en', 'Market Cap'); // Check translation
    expect(marketCap).toHaveProperty('unit', 'Tỷ');
    expect(marketCap).toHaveProperty('group', 'Thông tin cơ bản');
    
    // Check a field with options, e.g., stockExchange
    const exchange = metadata['stockExchange'];
    expect(exchange).toBeDefined();
    expect(exchange.label).toHaveProperty('en', 'Exchange'); // Check translation
    expect(exchange).toHaveProperty('type', 'MULTI_SELECT');
    expect(exchange.values).toBeDefined();
    expect(Array.isArray(exchange.values)).toBe(true);
    expect(exchange.values.length).toBeGreaterThan(0);
    expect(exchange.values[0]).toHaveProperty('value');
    expect(exchange.values[0]).toHaveProperty('label');
  });
});
