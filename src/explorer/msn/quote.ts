import { ProviderRegistry } from '../../core/registry';
import { getLogger } from '../../core/logger';
import { getMsnApiKey, getAssetType } from './helper';
import { BASE_URL, RESAMPLE_MAP, OHLC_MAP } from './const';

const logger = getLogger('MSNQuote');

interface HistoryOptions {
  start: string;
  end?: string;
  interval?: string;
  showLog?: boolean;
  countBack?: number;
}

export class MSNQuoteProvider {
  private symbolId: string;
  private assetType: string;
  private apikey: string | null = null;

  constructor(config: { symbol: string }) {
    this.symbolId = config.symbol.toLowerCase();
    this.assetType = getAssetType(this.symbolId);
  }

  private async ensureApiKey() {
    if (!this.apikey) {
      this.apikey = await getMsnApiKey();
    }
  }

  async history(
    startOrOptions: string | HistoryOptions,
    end?: string,
    interval: string = '1D'
  ): Promise<any[]> {
    await this.ensureApiKey();

    let start: string;
    let endDate: string;
    let resolution: string;
    let showLog = false;
    let countBack: number | undefined;

    // Support both calling styles
    if (typeof startOrOptions === 'object') {
      // MSN style: history({ start, end, interval, ... })
      start = startOrOptions.start;
      endDate = startOrOptions.end || new Date().toISOString().split('T')[0];
      resolution = startOrOptions.interval || '1D';
      showLog = startOrOptions.showLog || false;
      countBack = startOrOptions.countBack;
    } else {
      // VCI style: history(start, end, interval)
      start = startOrOptions;
      endDate = end || new Date().toISOString().split('T')[0];
      resolution = interval;
    }

    // Validate interval
    if (!RESAMPLE_MAP[resolution as keyof typeof RESAMPLE_MAP]) {
      throw new Error(`Invalid interval: ${resolution}. MSN supports: 1D, 1W, 1M`);
    }

    let url: string;
    if (this.assetType === "crypto") {
      url = `${BASE_URL}/Cryptocurrency/chart`;
    } else {
      url = `${BASE_URL}/Charts/TimeRange`;
    }

    const params = new URLSearchParams({
      apikey: this.apikey!,
      StartTime: `${start}T17:00:00.000Z`,
      EndTime: `${endDate}T16:59:00.858Z`,
      timeframe: '1',
      ocid: 'finance-utils-peregrine',
      cm: 'vi-vn',
      it: 'web',
      scn: 'ANON',
      ids: this.symbolId,
      type: 'All',
      wrapodata: 'false',
      disableSymbol: 'false'
    });

    if (showLog) {
      logger.info(`Fetching data from ${url} for ${this.symbolId} from ${start} to ${endDate}, interval ${resolution}`);
    }

    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
      }

      const jsonData = await response.json();
      const series = jsonData[0]?.series || {};

      if (showLog) {
        logger.info(`Successfully fetched data for ${this.symbolId}`);
      }

      const df = this._asDataFrame(series, resolution);

      // Filter by date range
      const filtered = df.filter((row: any) => {
        const rowDate = new Date(row.time);
        const startDate = new Date(start);
        const endDateObj = new Date(endDate);
        return rowDate >= startDate && rowDate <= endDateObj;
      });

      // Apply countBack if specified
      if (countBack && countBack > 0) {
        return filtered.slice(-countBack);
      }

      return filtered;

    } catch (error) {
      logger.error(`Error fetching history: ${error}`);
      throw error;
    }
  }

  private _asDataFrame(historyData: any, interval: string, floating: number = 2): any[] {
    // historyData is columnar: { timeStamps: [], openPrices: [], ... }
    const timeStamps = historyData.timeStamps || [];
    const length = timeStamps.length;
    const result = [];

    for (let i = 0; i < length; i++) {
      const row: any = {};
      
      // Map columns using OHLC_MAP
      for (const [key, value] of Object.entries(OHLC_MAP)) {
        if (historyData[key] && historyData[key][i] !== undefined) {
          row[value] = historyData[key][i];
        }
      }

      // Parse time
      if (row.time) {
        const date = new Date(row.time);
        // Add 7 hours for timezone adjustment (UTC to Asia/Ho_Chi_Minh)
        date.setHours(date.getHours() + 7);
        // Remove time portion
        date.setHours(0, 0, 0, 0);
        row.time = date.toISOString().split('T')[0];
      }

      // Round prices
      ['open', 'high', 'low', 'close'].forEach(key => {
        if (row[key] !== undefined) {
          row[key] = parseFloat(Number(row[key]).toFixed(floating));
        }
      });

      // Parse volume
      if (row.volume !== undefined) {
        row.volume = parseInt(row.volume, 10);
      }

      result.push(row);
    }

    // Filter out invalid rows (with -99999901.0 values)
    const cleaned = result.filter((row: any) => {
      return row.open !== -99999901.0 && row.high !== -99999901.0 && row.low !== -99999901.0;
    });

    // Remove volume for currency assets
    if (this.assetType === "currency") {
      cleaned.forEach((row: any) => {
        delete row.volume;
      });
    }

    return cleaned;
  }
}

ProviderRegistry.register('quote', 'msn', MSNQuoteProvider);
