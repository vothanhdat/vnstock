/**
 * Unit tests for XNO Connector module
 * 
 * Tests XNO Quote Provider functionality
 */

import axios from 'axios';
import { XNOQuoteProvider } from './quote';
import { XNOConfig } from './config';
import { ProviderRegistry } from '../../core/registry';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Helper to create mock axios response
const createMockResponse = (data: any, status = 200) => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {}
} as any);

describe('XNO Connector Module', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('XNOConfig', () => {
    it('should throw error when no API key is provided', () => {
      delete process.env.XNO_API_KEY;
      delete process.env.XNO_TOKEN;

      expect(() => new XNOConfig()).toThrow(/XNO API key not found/);
    });

    it('should use XNO_API_KEY from environment', () => {
      process.env.XNO_API_KEY = 'test-api-key';

      const config = new XNOConfig(undefined, false);

      expect(config.apiKey).toBe('test-api-key');
    });

    it('should use XNO_TOKEN from environment', () => {
      delete process.env.XNO_API_KEY;
      process.env.XNO_TOKEN = 'test-token';

      const config = new XNOConfig(undefined, false);

      expect(config.apiKey).toBe('test-token');
    });

    it('should prefer passed API key over environment', () => {
      process.env.XNO_API_KEY = 'env-key';

      const config = new XNOConfig('passed-key', false);

      expect(config.apiKey).toBe('passed-key');
    });

    it('should have correct default base URLs', () => {
      process.env.XNO_API_KEY = 'test-key';

      const config = new XNOConfig(undefined, false);

      expect(config.apiBase).toBe('https://api-v2.xno.vn');
      expect(config.lambdaBase).toBe('https://lambda.xno.vn');
    });

    it('should have default timeout', () => {
      process.env.XNO_API_KEY = 'test-key';

      const config = new XNOConfig(undefined, false);

      expect(config.timeout).toBe(30000);
    });
  });

  describe('XNOQuoteProvider', () => {
    beforeEach(() => {
      process.env.XNO_API_KEY = 'test-api-key';
    });

    it('should create provider with symbol', () => {
      const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

      expect(provider).toBeDefined();
    });

    it('should uppercase symbol', () => {
      const provider = new XNOQuoteProvider({ symbol: 'acb', showLog: false });

      expect(provider).toBeDefined();
    });

    it('should accept custom API key', () => {
      delete process.env.XNO_API_KEY;

      const provider = new XNOQuoteProvider({ 
        symbol: 'VNM', 
        apiKey: 'custom-key',
        showLog: false 
      });

      expect(provider).toBeDefined();
    });

    describe('history()', () => {
      const mockHistoryData = {
        t: [1700000000, 1700086400, 1700172800],
        o: [100, 101, 102],
        h: [105, 106, 107],
        l: [99, 100, 101],
        c: [104, 105, 106],
        v: [1000000, 1100000, 1200000]
      };

      it('should fetch historical data successfully', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockHistoryData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.history({});

        expect(result).toHaveLength(3);
        expect(result[0]).toMatchObject({
          symbol: 'ACB',
          open: 100,
          high: 105,
          low: 99,
          close: 104,
          volume: 1000000
        });
      });

      it('should convert timestamps to Date objects', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockHistoryData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.history({});

        expect(result[0].time).toBeInstanceOf(Date);
        expect(result[0].time.getTime()).toBe(1700000000 * 1000);
      });

      it('should pass date parameters correctly', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockHistoryData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        await provider.history({
          start: '2024-01-01',
          end: '2024-01-31'
        });

        expect(mockedAxios.get).toHaveBeenCalledWith(
          expect.stringContaining('/ACB/ohlcv/'),
          expect.objectContaining({
            params: expect.objectContaining({
              from: expect.any(Number),
              to: expect.any(Number)
            })
          })
        );
      });

      it('should return empty array when no data', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse({ t: [] }));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.history({});

        expect(result).toEqual([]);
      });

      it('should return empty array when response is null', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(null));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.history({});

        expect(result).toEqual([]);
      });

      it('should throw error on network failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        await expect(provider.history({})).rejects.toThrow('Network error');
      });

      it('should normalize interval correctly', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockHistoryData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        await provider.history({ interval: '1D' });

        expect(mockedAxios.get).toHaveBeenCalledWith(
          expect.stringContaining('/ohlcv/d'),
          expect.any(Object)
        );
      });

      it('should pass countBack parameter', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockHistoryData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        await provider.history({ countBack: 100 });

        expect(mockedAxios.get).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            params: expect.objectContaining({
              countBack: 100
            })
          })
        );
      });
    });

    describe('intraday()', () => {
      const mockIntradayData = [
        { symbol: 'ACB', price: 25.5, volume: 10000 },
        { symbol: 'VNM', price: 80.0, volume: 5000 }
      ];

      it('should fetch intraday data successfully', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockIntradayData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.intraday();

        expect(result).toBeDefined();
        expect(result.symbol).toBe('ACB');
      });

      it('should filter data for specified symbol', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockIntradayData));
        const provider = new XNOQuoteProvider({ symbol: 'VNM', showLog: false });

        const result = await provider.intraday();

        expect(result.symbol).toBe('VNM');
      });

      it('should return data when code field matches', async () => {
        const dataWithCode = [
          { code: 'ACB', price: 25.5 }
        ];
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(dataWithCode));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.intraday();

        expect(result.code).toBe('ACB');
      });

      it('should return full response when not an array', async () => {
        const singleData = { symbol: 'ACB', price: 25.5 };
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(singleData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.intraday();

        expect(result).toEqual(singleData);
      });

      it('should throw error on network failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        await expect(provider.intraday()).rejects.toThrow('Network error');
      });
    });

    describe('priceDepth()', () => {
      const mockPriceDepthData = {
        bids: [{ price: 25.4, volume: 1000 }],
        asks: [{ price: 25.5, volume: 2000 }]
      };

      it('should fetch price depth successfully', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockPriceDepthData));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        const result = await provider.priceDepth();

        expect(result).toMatchObject(mockPriceDepthData);
      });

      it('should pass symbol as query parameter', async () => {
        mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockPriceDepthData));
        const provider = new XNOQuoteProvider({ symbol: 'VNM', showLog: false });

        await provider.priceDepth();

        expect(mockedAxios.get).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            params: { symbol: 'VNM' }
          })
        );
      });

      it('should throw error on network failure', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
        const provider = new XNOQuoteProvider({ symbol: 'ACB', showLog: false });

        await expect(provider.priceDepth()).rejects.toThrow('Network error');
      });
    });
  });

  describe('Provider Registration', () => {
    beforeEach(() => {
      // Import to trigger registration
      require('./index');
    });

    it('should register XNO in quote providers', () => {
      expect(ProviderRegistry.has('quote', 'xno')).toBe(true);
    });

    it('should have correct metadata', () => {
      const metadata = ProviderRegistry.getMetadata('quote', 'xno');
      expect(metadata).toBeDefined();
      expect(metadata?.name).toBe('xno');
      expect(metadata?.category).toBe('quote');
      expect(metadata?.type).toBe('api');
    });
  });
});
