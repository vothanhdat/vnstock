/**
 * Unit tests for Misc Gold Price module
 * 
 * Tests SJC and BTMC gold price fetching functions
 */

import axios from 'axios';
import { sjcGoldPrice, btmcGoldPrice, GoldPrice } from './gold_price';

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

describe('Gold Price Module', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress expected console output during tests
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('sjcGoldPrice', () => {
    const mockSJCData = {
      success: true,
      data: [
        {
          TypeName: 'Vàng SJC 1L - 10L',
          BranchName: 'Hồ Chí Minh',
          BuyValue: '83500000',
          SellValue: '85500000'
        },
        {
          TypeName: 'Vàng SJC 0.5L',
          BranchName: 'Hà Nội',
          BuyValue: '83500000',
          SellValue: '85600000'
        }
      ]
    };

    it('should fetch SJC gold prices successfully', async () => {
      mockedAxios.post.mockResolvedValueOnce(createMockResponse(mockSJCData));

      const result = await sjcGoldPrice();

      expect(result).not.toBeNull();
      expect(result).toHaveLength(2);
      expect(result![0]).toMatchObject({
        name: 'Vàng SJC 1L - 10L',
        branch: 'Hồ Chí Minh',
        buy_price: 83500000,
        sell_price: 85500000
      });
    });

    it('should use correct API URL and headers', async () => {
      mockedAxios.post.mockResolvedValueOnce(createMockResponse(mockSJCData));

      await sjcGoldPrice('2024-01-15');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://sjc.com.vn/GoldPrice/Services/PriceService.ashx',
        expect.stringContaining('method=GetSJCGoldPriceByDate'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Origin': 'https://sjc.com.vn',
            'Referer': 'https://sjc.com.vn/gia-vang-sjc'
          })
        })
      );
    });

    it('should format date correctly in payload', async () => {
      mockedAxios.post.mockResolvedValueOnce(createMockResponse(mockSJCData));

      await sjcGoldPrice('2024-03-05');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('toDate=05/03/2024'),
        expect.any(Object)
      );
    });

    it('should return null when API returns empty data', async () => {
      mockedAxios.post.mockResolvedValueOnce(createMockResponse({ success: true, data: [] }));

      const result = await sjcGoldPrice();

      expect(result).toBeNull();
    });

    it('should return null when API fails', async () => {
      mockedAxios.post.mockResolvedValueOnce(createMockResponse({ success: false }));

      const result = await sjcGoldPrice();

      expect(result).toBeNull();
    });

    it('should return null on network error', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

      const result = await sjcGoldPrice();

      expect(result).toBeNull();
    });

    it('should return null for date before 2016-01-02', async () => {
      // The function catches the error internally and returns null
      const result = await sjcGoldPrice('2015-12-31');
      expect(result).toBeNull();
    });

    it('should use today date when no date provided', async () => {
      mockedAxios.post.mockResolvedValueOnce(createMockResponse(mockSJCData));

      const result = await sjcGoldPrice();

      expect(result).not.toBeNull();
      // Verify date field is set to today
      const today = new Date().toISOString().split('T')[0];
      expect(result![0].date).toBe(today);
    });
  });

  describe('btmcGoldPrice', () => {
    const mockBTMCData = {
      DataList: {
        Data: [
          {
            '@row': '1',
            '@n_1': 'Vàng SJC 1L',
            '@pb_1': '83500000',
            '@ps_1': '85500000'
          },
          {
            '@row': '2',
            '@n_2': 'Vàng Nhẫn 24k',
            '@pb_2': '82000000',
            '@ps_2': '83500000'
          }
        ]
      }
    };

    it('should fetch BTMC gold prices successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockBTMCData));

      const result = await btmcGoldPrice();

      expect(result).not.toBeNull();
      expect(result).toHaveLength(2);
      expect(result![0]).toMatchObject({
        name: 'Vàng SJC 1L',
        buy_price: 83500000,
        sell_price: 85500000
      });
    });

    it('should use correct API URL', async () => {
      mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockBTMCData));

      await btmcGoldPrice();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'
      );
    });

    it('should set date to today', async () => {
      mockedAxios.get.mockResolvedValueOnce(createMockResponse(mockBTMCData));

      const result = await btmcGoldPrice();

      const today = new Date().toISOString().split('T')[0];
      expect(result![0].date).toBe(today);
    });

    it('should return null when DataList is missing', async () => {
      mockedAxios.get.mockResolvedValueOnce(createMockResponse({}));

      const result = await btmcGoldPrice();

      expect(result).toBeNull();
    });

    it('should return null on network error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

      const result = await btmcGoldPrice();

      expect(result).toBeNull();
    });

    it('should return null when Data array is missing', async () => {
      mockedAxios.get.mockResolvedValueOnce(createMockResponse({ DataList: {} }));

      const result = await btmcGoldPrice();

      expect(result).toBeNull();
    });
  });

  describe('GoldPrice interface', () => {
    it('should have required properties', () => {
      const goldPrice: GoldPrice = {
        name: 'Test Gold',
        buy_price: 80000000,
        sell_price: 82000000
      };

      expect(goldPrice.name).toBeDefined();
      expect(goldPrice.buy_price).toBeDefined();
      expect(goldPrice.sell_price).toBeDefined();
    });

    it('should support optional properties', () => {
      const goldPrice: GoldPrice = {
        name: 'Test Gold',
        branch: 'Ho Chi Minh',
        buy_price: 80000000,
        sell_price: 82000000,
        date: '2024-01-15'
      };

      expect(goldPrice.branch).toBe('Ho Chi Minh');
      expect(goldPrice.date).toBe('2024-01-15');
    });
  });
});
