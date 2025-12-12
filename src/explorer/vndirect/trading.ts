import { ProviderRegistry } from '../../core/registry';
import { DataCategory, DataSource, ProviderType, ScreenerFieldInfo } from '../../core/types';
import { VNDirectPriceBoard, VNDirectPriceBoardData } from './priceboard';

export class VNDirectTradingProvider {
  private priceBoardClient: VNDirectPriceBoard;

  constructor() {
    this.priceBoardClient = new VNDirectPriceBoard();
  }

  public getPriceBoardMetadata(): Record<string, ScreenerFieldInfo> {
    return {
      code: { key: 'code', label: { vi: 'Mã CK', en: 'Symbol' }, type: 'string' },
      basicPrice: { key: 'basicPrice', label: { vi: 'TC', en: 'Ref Price' }, type: 'number' },
      ceilingPrice: { key: 'ceilingPrice', label: { vi: 'Trần', en: 'Ceiling' }, type: 'number' },
      floorPrice: { key: 'floorPrice', label: { vi: 'Sàn', en: 'Floor' }, type: 'number' },
      accumulatedVol: { key: 'accumulatedVol', label: { vi: 'Tổng KL', en: 'Total Vol' }, type: 'number' },
      matchPrice: { key: 'matchPrice', label: { vi: 'Khớp lệnh Giá', en: 'Match Price' }, type: 'number' },
      matchQtty: { key: 'matchQtty', label: { vi: 'Khớp lệnh KL', en: 'Match Vol' }, type: 'number' },
      currentPrice: { key: 'currentPrice', label: { vi: '+/-', en: 'Change' }, type: 'number' },
      highestPrice: { key: 'highestPrice', label: { vi: 'Cao', en: 'High' }, type: 'number' },
      lowestPrice: { key: 'lowestPrice', label: { vi: 'Thấp', en: 'Low' }, type: 'number' },
      accumulatedVal: { key: 'accumulatedVal', label: { vi: 'Tổng GT', en: 'Total Val' }, type: 'number' },
      buyForeignQtty: { key: 'buyForeignQtty', label: { vi: 'ĐTNN Mua', en: 'Foreign Buy' }, type: 'number' },
      sellForeignQtty: { key: 'sellForeignQtty', label: { vi: 'ĐTNN Bán', en: 'Foreign Sell' }, type: 'number' },
      bidPrice01: { key: 'bidPrice01', label: { vi: 'Mua G1', en: 'Bid P1' }, type: 'number' },
      bidQtty01: { key: 'bidQtty01', label: { vi: 'Mua KL1', en: 'Bid V1' }, type: 'number' },
      bidPrice02: { key: 'bidPrice02', label: { vi: 'Mua G2', en: 'Bid P2' }, type: 'number' },
      bidQtty02: { key: 'bidQtty02', label: { vi: 'Mua KL2', en: 'Bid V2' }, type: 'number' },
      bidPrice03: { key: 'bidPrice03', label: { vi: 'Mua G3', en: 'Bid P3' }, type: 'number' },
      bidQtty03: { key: 'bidQtty03', label: { vi: 'Mua KL3', en: 'Bid V3' }, type: 'number' },
      offerPrice01: { key: 'offerPrice01', label: { vi: 'Bán G1', en: 'Ask P1' }, type: 'number' },
      offerQtty01: { key: 'offerQtty01', label: { vi: 'Bán KL1', en: 'Ask V1' }, type: 'number' },
      offerPrice02: { key: 'offerPrice02', label: { vi: 'Bán G2', en: 'Ask P2' }, type: 'number' },
      offerQtty02: { key: 'offerQtty02', label: { vi: 'Bán KL2', en: 'Ask V2' }, type: 'number' },
      offerPrice03: { key: 'offerPrice03', label: { vi: 'Bán G3', en: 'Ask P3' }, type: 'number' },
      offerQtty03: { key: 'offerQtty03', label: { vi: 'Bán KL3', en: 'Ask V3' }, type: 'number' },
    };
  }

  async priceBoard(symbols?: string[]): Promise<VNDirectPriceBoardData[]> {
    // Fetch from all floors
    const floors = ['10', '02', '03']; // HOSE, HNX, UPCOM
    const promises = floors.map(floor => this.priceBoardClient.fetch(floor));
    
    const results = await Promise.all(promises);
    const allData = results.flat();

    if (symbols && symbols.length > 0) {
      const symbolSet = new Set(symbols.map(s => s.toUpperCase()));
      return allData.filter(item => symbolSet.has(item.code));
    }

    return allData;
  }
}

ProviderRegistry.register(
  DataCategory.TRADING,
  DataSource.VNDIRECT,
  VNDirectTradingProvider,
  ProviderType.SCRAPING
);
