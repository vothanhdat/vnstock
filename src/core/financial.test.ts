/**
 * Unit tests for Financial Data Normalization Utilities
 */

import {
  normalizeTCBSFinancial,
  normalizeTCBSFinancialList,
  normalizeTCBSRatio,
  normalizeVCIFinancial,
  normalizeVCIFinancialList,
  isFinancialData,
  filterByPeriod,
  filterByYear,
  getLatest,
} from './financial';
import { FinancialData } from './types';

describe('Financial Normalization Utilities', () => {
  describe('normalizeTCBSFinancial', () => {
    const mockTCBSData = {
      ticker: 'VNM',
      quarter: 2,
      year: 2024,
      revenue: 15000000000000,
      yearRevenueGrowth: 0.12,
      quarterRevenueGrowth: 0.05,
      costOfGoodSold: 10000000000000,
      grossProfit: 5000000000000,
      operationExpense: 2000000000000,
      operationProfit: 3000000000000,
      interestExpense: 100000000000,
      preTaxProfit: 2900000000000,
      postTaxProfit: 2500000000000,
      shareHolderIncome: 2400000000000,
      yearShareHolderIncomeGrowth: 0.08,
      ebitda: 3500000000000,
    };

    it('should normalize TCBS financial data correctly', () => {
      const result = normalizeTCBSFinancial(mockTCBSData, 'VNM');

      expect(result.symbol).toBe('VNM');
      expect(result.period).toBe('quarter');
      expect(result.year).toBe(2024);
      expect(result.quarter).toBe(2);
      expect(result.revenue).toBe(15000000000000);
      expect(result.revenue_growth).toBe(0.12);
      expect(result.cost_of_goods_sold).toBe(10000000000000);
      expect(result.gross_profit).toBe(5000000000000);
      expect(result.operating_expenses).toBe(2000000000000);
      expect(result.operating_profit).toBe(3000000000000);
      expect(result.net_profit).toBe(2500000000000);
      expect(result.ebitda).toBe(3500000000000);
    });

    it('should set period to "year" when quarter is 0', () => {
      const yearlyData = { ...mockTCBSData, quarter: 0 };
      const result = normalizeTCBSFinancial(yearlyData, 'VNM');

      expect(result.period).toBe('year');
      expect(result.quarter).toBeUndefined();
    });

    it('should use provided symbol when ticker is missing', () => {
      const dataWithoutTicker = { ...mockTCBSData, ticker: undefined };
      const result = normalizeTCBSFinancial(dataWithoutTicker, 'ACB');

      expect(result.symbol).toBe('ACB');
    });
  });

  describe('normalizeTCBSFinancialList', () => {
    it('should normalize array of TCBS data', () => {
      const mockList = [
        { ticker: 'VNM', quarter: 1, year: 2024, revenue: 10000000000000 },
        { ticker: 'VNM', quarter: 2, year: 2024, revenue: 12000000000000 },
      ];

      const result = normalizeTCBSFinancialList(mockList, 'VNM');

      expect(result).toHaveLength(2);
      expect(result[0].quarter).toBe(1);
      expect(result[1].quarter).toBe(2);
    });
  });

  describe('normalizeTCBSRatio', () => {
    const mockRatioData = {
      ticker: 'VNM',
      quarter: 1,
      year: 2024,
      eps: 5000,
      pe: 15.5,
      pb: 3.2,
      ev: 50000000000000,
      dividend: 2500,
      roe: 0.18,
      roa: 0.12,
    };

    it('should normalize TCBS ratio data correctly', () => {
      const result = normalizeTCBSRatio(mockRatioData, 'VNM');

      expect(result.symbol).toBe('VNM');
      expect(result.eps).toBe(5000);
      expect(result.pe).toBe(15.5);
      expect(result.pb).toBe(3.2);
      expect(result.roe).toBe(0.18);
      expect(result.roa).toBe(0.12);
    });
  });

  describe('normalizeVCIFinancial', () => {
    const mockVCIData = {
      year_report: 2024,
      length_report: 2, // Q2
      update_date: 1700000000,
      revenue: 15000000000000,
      revenue_growth: 0.12,
      net_profit: 2500000000000,
      net_profit_growth: 0.08,
      ebitda: 3500000000000,
      ebit: 3000000000000,
      eps: 5000,
      eps_ttm: 4800,
      bvps: 35000,
      pe: 15.5,
      pb: 3.2,
      ps: 2.1,
      pcf: 10.5,
      ev: 50000000000000,
      ev_per_ebitda: 14.3,
      dividend: 2500,
      roe: 0.18,
      roa: 0.12,
      roic: 0.15,
      gross_margin: 0.33,
      net_profit_margin: 0.17,
      ebit_margin: 0.20,
      current_ratio: 1.8,
      quick_ratio: 1.2,
      cash_ratio: 0.5,
      interest_coverage: 30,
      issue_share: 2000000000,
      charter_capital: 20000000000000,
    };

    it('should normalize VCI financial data correctly', () => {
      const result = normalizeVCIFinancial(mockVCIData, 'VNM');

      expect(result.symbol).toBe('VNM');
      expect(result.period).toBe('quarter');
      expect(result.year).toBe(2024);
      expect(result.quarter).toBe(2);
      expect(result.update_date).toBe(1700000000);
      expect(result.revenue).toBe(15000000000000);
      expect(result.net_profit).toBe(2500000000000);
      expect(result.eps).toBe(5000);
      expect(result.pe).toBe(15.5);
      expect(result.roe).toBe(0.18);
      expect(result.current_ratio).toBe(1.8);
      expect(result.issued_shares).toBe(2000000000);
    });

    it('should set period to "year" when length_report is 5', () => {
      const yearlyData = { ...mockVCIData, length_report: 5 };
      const result = normalizeVCIFinancial(yearlyData, 'VNM');

      expect(result.period).toBe('year');
      expect(result.quarter).toBeUndefined();
    });

    it('should set period to "year" when length_report is 0', () => {
      const yearlyData = { ...mockVCIData, length_report: 0 };
      const result = normalizeVCIFinancial(yearlyData, 'VNM');

      expect(result.period).toBe('year');
      expect(result.quarter).toBeUndefined();
    });
  });

  describe('normalizeVCIFinancialList', () => {
    it('should normalize array of VCI data', () => {
      const mockList = [
        { year_report: 2024, length_report: 1, revenue: 10000000000000 },
        { year_report: 2024, length_report: 2, revenue: 12000000000000 },
      ];

      const result = normalizeVCIFinancialList(mockList, 'VNM');

      expect(result).toHaveLength(2);
      expect(result[0].quarter).toBe(1);
      expect(result[1].quarter).toBe(2);
    });
  });

  describe('isFinancialData', () => {
    it('should return true for valid FinancialData', () => {
      const validData: FinancialData = {
        symbol: 'VNM',
        period: 'quarter',
        year: 2024,
        quarter: 1,
      };

      expect(isFinancialData(validData)).toBe(true);
    });

    it('should return false for missing symbol', () => {
      const invalidData = {
        period: 'quarter',
        year: 2024,
      };

      expect(isFinancialData(invalidData)).toBe(false);
    });

    it('should return false for invalid period', () => {
      const invalidData = {
        symbol: 'VNM',
        period: 'monthly', // Invalid
        year: 2024,
      };

      expect(isFinancialData(invalidData)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isFinancialData(null)).toBe(false);
    });

    it('should return false for non-object', () => {
      expect(isFinancialData('string')).toBe(false);
    });
  });

  describe('filterByPeriod', () => {
    const testData: FinancialData[] = [
      { symbol: 'VNM', period: 'quarter', year: 2024, quarter: 1 },
      { symbol: 'VNM', period: 'quarter', year: 2024, quarter: 2 },
      { symbol: 'VNM', period: 'year', year: 2023 },
      { symbol: 'VNM', period: 'year', year: 2022 },
    ];

    it('should filter by quarterly period', () => {
      const result = filterByPeriod(testData, 'quarter');

      expect(result).toHaveLength(2);
      expect(result.every(d => d.period === 'quarter')).toBe(true);
    });

    it('should filter by yearly period', () => {
      const result = filterByPeriod(testData, 'year');

      expect(result).toHaveLength(2);
      expect(result.every(d => d.period === 'year')).toBe(true);
    });
  });

  describe('filterByYear', () => {
    const testData: FinancialData[] = [
      { symbol: 'VNM', period: 'quarter', year: 2024, quarter: 1 },
      { symbol: 'VNM', period: 'quarter', year: 2024, quarter: 2 },
      { symbol: 'VNM', period: 'year', year: 2023 },
      { symbol: 'VNM', period: 'year', year: 2022 },
    ];

    it('should filter by year', () => {
      const result = filterByYear(testData, 2024);

      expect(result).toHaveLength(2);
      expect(result.every(d => d.year === 2024)).toBe(true);
    });

    it('should return empty array for non-existent year', () => {
      const result = filterByYear(testData, 2020);

      expect(result).toHaveLength(0);
    });
  });

  describe('getLatest', () => {
    const testData: FinancialData[] = [
      { symbol: 'VNM', period: 'quarter', year: 2023, quarter: 4 },
      { symbol: 'VNM', period: 'quarter', year: 2024, quarter: 1 },
      { symbol: 'VNM', period: 'quarter', year: 2024, quarter: 2 },
      { symbol: 'VNM', period: 'year', year: 2023 },
    ];

    it('should return the latest entry by year and quarter', () => {
      const result = getLatest(testData);

      expect(result?.year).toBe(2024);
      expect(result?.quarter).toBe(2);
    });

    it('should prefer quarterly data over yearly for same year', () => {
      const mixedData: FinancialData[] = [
        { symbol: 'VNM', period: 'year', year: 2024 },
        { symbol: 'VNM', period: 'quarter', year: 2024, quarter: 1 },
      ];

      const result = getLatest(mixedData);

      expect(result?.period).toBe('quarter');
      expect(result?.quarter).toBe(1);
    });

    it('should return undefined for empty array', () => {
      const result = getLatest([]);

      expect(result).toBeUndefined();
    });
  });
});
