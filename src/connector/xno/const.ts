/**
 * Constants and configuration for XNO connector.
 * Only uses 2 dedicated XNO API endpoints.
 */

export const XNO_API_BASE = "https://api-v2.xno.vn";
export const XNO_LAMBDA_BASE = "https://lambda.xno.vn";
export const DEFAULT_TIMEOUT = 30000;

export const ENDPOINTS = {
    // Stock historical data from API v2
    // Format: /quant-data/v1/stocks/{symbol}/ohlcv/{resolution}
    stocks_ohlcv: '/quant-data/v1/stocks',

    // Chart data from Lambda
    chart: 'chart/OHLCChart/gap-chart',

    // Intraday data from Lambda
    intraday: 'LEData/getAll',

    // Price depth from Lambda
    price_depth: 'AccumulatedPriceStepVol/getSymbolData'
};

// Interval mapping (XNO internal code -> human readable)
export const TIMEFRAME_MAP: Record<string, string> = {
    'm': 'minute',
    'h': 'hour',
    'd': 'day',
    'w': 'week',
    'M': 'month'
};

// OHLCV Column Mapping (XNO -> vnstock standard)
export const OHLC_RENAME: Record<string, string> = {
    "t": "time",
    "o": "open",
    "h": "high",
    "l": "low",
    "c": "close",
    "v": "volume"
};
