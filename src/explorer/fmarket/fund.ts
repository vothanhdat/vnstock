import { ProviderRegistry } from '../../core/registry';
import { getLogger } from '../../core/logger';
import { BASE_URL, FUND_TYPE_MAPPING, FUND_LIST_COLUMNS, FUND_LIST_MAPPING } from './const';

const logger = getLogger('FMarketFund');

function getHeaders(): Record<string, string> {
  return {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
  };
}

function getByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function convertUnixToDate(timestamp: number | string): string | null {
  if (!timestamp) return null;
  try {
    const date = new Date(Number(timestamp)); // FMarket uses ms timestamp
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

export class FMarketFundProvider {
  constructor() {}

  /**
   * Get list of all available mutual funds
   * @param fundType Filter by fund type: 'BALANCED', 'BOND', 'STOCK' or '' for all
   */
  async listing(fundType: string = ""): Promise<any[]> {
    const type = fundType.toUpperCase();
    const fundAssetTypes = FUND_TYPE_MAPPING[type] || [];

    if (type !== "" && !FUND_TYPE_MAPPING[type]) {
      logger.warn(`Unsupported fund type: '${type}'. Supported: '', 'BALANCED', 'BOND', 'STOCK'`);
    }

    const payload = {
      types: ["NEW_FUND", "TRADING_FUND"],
      issuerIds: [],
      sortOrder: "DESC",
      sortField: "navTo6Months",
      page: 1,
      pageSize: 100,
      isIpo: false,
      fundAssetTypes: fundAssetTypes,
      bondRemainPeriods: [],
      searchField: "",
      isBuyByReward: false,
      thirdAppIds: [],
    };

    try {
      const response = await fetch(`${BASE_URL}/filter`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`FMarket API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const rows = data?.data?.rows || [];
      
      logger.info(`Total funds found: ${data?.data?.total || 0}`);

      return rows.map((row: any) => {
        const mapped: any = {};
        
        // Map columns based on FUND_LIST_MAPPING
        for (const [originalCol, newCol] of Object.entries(FUND_LIST_MAPPING)) {
          // Find the original column in FUND_LIST_COLUMNS to ensure we only map what's expected
          // (Though in TS we can just map directly from the row object using the path)
          let value = getByPath(row, originalCol);
          
          // Convert dates
          if (originalCol === 'firstIssueAt' || originalCol === 'productNavChange.updateAt') {
            value = convertUnixToDate(value);
          }

          mapped[newCol] = value;
        }
        return mapped;
      }).sort((a: any, b: any) => (b.nav_change_36m || 0) - (a.nav_change_36m || 0));

    } catch (error) {
      logger.error(`Error fetching fund listing: ${error}`);
      throw error;
    }
  }

  /**
   * Search for funds by symbol
   * @param symbol Fund short name (e.g. 'SSISCA')
   */
  async filter(symbol: string = ""): Promise<any[]> {
    const searchSymbol = symbol.toUpperCase();
    
    const payload = {
      searchField: searchSymbol,
      types: ["NEW_FUND", "TRADING_FUND"],
      pageSize: 100,
    };

    try {
      const response = await fetch(`${BASE_URL}/filter`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`FMarket API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const rows = data?.data?.rows || [];

      if (rows.length === 0) {
        throw new Error(`No fund found with symbol ${searchSymbol}`);
      }

      return rows.map((row: any) => ({
        id: row.id,
        short_name: row.shortName,
        name: row.name
      }));

    } catch (error) {
      logger.error(`Error filtering funds: ${error}`);
      throw error;
    }
  }

  /**
   * Get top holdings for a fund
   * @param fundId Fund ID
   */
  async topHolding(fundId: number): Promise<any[]> {
    try {
      const response = await fetch(`${BASE_URL}/${fundId}`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`FMarket API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const productTopHoldingList = data?.data?.productTopHoldingList || [];
      const productTopHoldingBondList = data?.data?.productTopHoldingBondList || [];

      const result = [];

      // Process equities
      for (const item of productTopHoldingList) {
        result.push({
          stock_code: item.stockCode,
          industry: item.industry,
          net_asset_percent: item.netAssetPercent,
          type_asset: item.type,
          update_at: convertUnixToDate(item.updateAt),
          fund_id: fundId
        });
      }

      // Process bonds
      for (const item of productTopHoldingBondList) {
        result.push({
          stock_code: item.stockCode,
          industry: item.industry,
          net_asset_percent: item.netAssetPercent,
          type_asset: item.type,
          update_at: convertUnixToDate(item.updateAt),
          fund_id: fundId
        });
      }

      return result;

    } catch (error) {
      logger.error(`Error fetching top holdings: ${error}`);
      throw error;
    }
  }

  /**
   * Get industry allocation for a fund
   * @param fundId Fund ID
   */
  async industryHolding(fundId: number): Promise<any[]> {
    try {
      const response = await fetch(`${BASE_URL}/${fundId}`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`FMarket API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const list = data?.data?.productIndustriesHoldingList || [];

      return list.map((item: any) => ({
        industry: item.industry,
        net_asset_percent: item.assetPercent
      }));

    } catch (error) {
      logger.error(`Error fetching industry holdings: ${error}`);
      throw error;
    }
  }

  /**
   * Get NAV history for a fund
   * @param fundId Fund ID
   */
  async navReport(fundId: number): Promise<any[]> {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const url = `${BASE_URL.replace('/products', '/product')}/get-nav-history`;
    
    const payload = {
      isAllData: 1,
      productId: fundId,
      fromDate: null,
      toDate: currentDate,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`FMarket API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const list = data?.data || [];

      return list.map((item: any) => ({
        date: item.navDate,
        nav_per_unit: item.nav
      }));

    } catch (error) {
      logger.error(`Error fetching NAV report: ${error}`);
      throw error;
    }
  }

  /**
   * Get asset allocation for a fund
   * @param fundId Fund ID
   */
  async assetHolding(fundId: number): Promise<any[]> {
    try {
      const response = await fetch(`${BASE_URL}/${fundId}`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`FMarket API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const list = data?.data?.productAssetHoldingList || [];

      return list.map((item: any) => ({
        asset_percent: item.assetPercent,
        asset_type: item.assetType?.name
      }));

    } catch (error) {
      logger.error(`Error fetching asset holdings: ${error}`);
      throw error;
    }
  }

  /**
   * Get fund details by symbol (convenience method)
   * @param symbol Fund symbol (e.g. 'SSISCA')
   */
  async getDetails(symbol: string): Promise<{
    topHolding: any[],
    industryHolding: any[],
    navReport: any[],
    assetHolding: any[]
  }> {
    const funds = await this.filter(symbol);
    if (funds.length === 0) {
      throw new Error(`Fund not found: ${symbol}`);
    }
    const fundId = funds[0].id;

    const [top, industry, nav, asset] = await Promise.all([
      this.topHolding(fundId),
      this.industryHolding(fundId),
      this.navReport(fundId),
      this.assetHolding(fundId)
    ]);

    return {
      topHolding: top,
      industryHolding: industry,
      navReport: nav,
      assetHolding: asset
    };
  }
}

ProviderRegistry.register('fund', 'fmarket', FMarketFundProvider);
