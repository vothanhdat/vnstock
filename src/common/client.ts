/**
 * Main client class for vnstock library
 */

import { Quote } from '../api/quote';
import { Company } from '../api/company';
import { Finance } from '../api/financial';
import { Listing } from '../api/listing';
import { Trading } from '../api/trading';
import { Screener } from '../api/screener';
import { getLogger } from '../core/logger';
import { Config } from '../core/config';

const logger = getLogger('Vnstock');

/**
 * Stock components wrapper
 */
export class StockComponents {
  public quote: Quote;
  public company: Company;
  public finance: Finance;
  public listing: Listing;
  public trading: Trading;
  public screener: Screener;

  constructor(
    public symbol: string,
    public source: string,
    showLog: boolean = true
  ) {
    if (!showLog) {
      Config.setLogLevel('error');
    }

    this.quote = new Quote(source, symbol, { showLog });
    this.company = new Company(source, symbol, { showLog });
    this.finance = new Finance(source, symbol, { showLog });
    this.listing = new Listing(source, { showLog });
    this.trading = new Trading(source, { showLog });
    this.screener = new Screener(source, { showLog });
  }
}

/**
 * MSN components wrapper (for forex, crypto, global indices)
 */
export class MSNComponents {
  public quote: Quote;
  public listing: Listing;

  constructor(
    public symbol: string,
    public source: string = 'MSN'
  ) {
    this.quote = new Quote(source, symbol);
    this.listing = new Listing(source);
  }
}

/**
 * Main Vnstock client class
 */
export class Vnstock {
  static readonly SUPPORTED_SOURCES = ['VCI', 'TCBS', 'MSN'];
  
  // MSN symbol mappings (simplified - full maps would be imported from constants)
  static readonly msnSymbolMap: Record<string, string> = {
    'BTC': 'BTCUSD',
    'ETH': 'ETHUSD',
    'EURUSD': 'EURUSD',
    'GBPUSD': 'GBPUSD',
  };

  constructor(
    public symbol?: string,
    public source: string = 'VCI',
    public showLog: boolean = true
  ) {
    const upperSource = source.toUpperCase();
    
    if (!Vnstock.SUPPORTED_SOURCES.includes(upperSource)) {
      throw new Error(
        `Supported sources: ${Vnstock.SUPPORTED_SOURCES.join(', ')}. Got: ${source}`
      );
    }
    
    this.source = upperSource;
    
    if (!showLog) {
      Config.setLogLevel('error');
    }
  }

  /**
   * Get stock data components for a symbol
   * 
   * @param symbol - Stock symbol (e.g., 'ACB', 'VNM')
   * @param source - Data source override
   * @returns StockComponents object
   * 
   * @example
   * ```typescript
   * const stock = new Vnstock();
   * const acb = stock.stock('ACB');
   * const history = await acb.quote.history('2023-01-01', '2023-12-31');
   * const profile = await acb.company.profile();
   * ```
   */
  stock(symbol?: string, source?: string): StockComponents {
    const targetSymbol = symbol || this.symbol || 'VN30F1M';
    const targetSource = source || this.source;
    
    if (!symbol && !this.symbol) {
      logger.info('Symbol not specified, using default: VN30F1M');
    }
    
    this.symbol = targetSymbol;
    return new StockComponents(targetSymbol, targetSource, this.showLog);
  }

  /**
   * Get forex (currency) data
   * 
   * @param symbol - Currency pair (e.g., 'EURUSD', 'GBPUSD')
   * @param source - Data source (only MSN supported)
   * @returns MSNComponents object
   * 
   * @example
   * ```typescript
   * const stock = new Vnstock();
   * const eurusd = stock.fx('EURUSD');
   * const history = await eurusd.quote.history('2023-01-01', '2023-12-31');
   * ```
   */
  fx(symbol: string = 'EURUSD', source: string = 'MSN'): MSNComponents {
    const mappedSymbol = Vnstock.msnSymbolMap[symbol] || symbol;
    logger.debug(`Mapped ${symbol} -> ${mappedSymbol}`);
    
    return new MSNComponents(mappedSymbol, source);
  }

  /**
   * Get cryptocurrency data
   * 
   * @param symbol - Crypto symbol (e.g., 'BTC', 'ETH')
   * @param source - Data source (only MSN supported)
   * @returns MSNComponents object
   * 
   * @example
   * ```typescript
   * const stock = new Vnstock();
   * const btc = stock.crypto('BTC');
   * const history = await btc.quote.history('2023-01-01', '2023-12-31');
   * ```
   */
  crypto(symbol: string = 'BTC', source: string = 'MSN'): MSNComponents {
    const mappedSymbol = Vnstock.msnSymbolMap[symbol] || symbol;
    logger.debug(`Mapped ${symbol} -> ${mappedSymbol}`);
    
    return new MSNComponents(mappedSymbol, source);
  }

  /**
   * Get world index data
   * 
   * @param symbol - Index symbol (e.g., 'DJI', 'SPX')
   * @param source - Data source (only MSN supported)
   * @returns MSNComponents object
   * 
   * @example
   * ```typescript
   * const stock = new Vnstock();
   * const dji = stock.worldIndex('DJI');
   * const history = await dji.quote.history('2023-01-01', '2023-12-31');
   * ```
   */
  worldIndex(symbol: string, source: string = 'MSN'): MSNComponents {
    const mappedSymbol = Vnstock.msnSymbolMap[symbol] || symbol;
    logger.debug(`Mapped ${symbol} -> ${mappedSymbol}`);
    
    return new MSNComponents(mappedSymbol, source);
  }
}
