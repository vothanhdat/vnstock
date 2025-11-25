export const BASE_URL = 'https://assets.msn.com/service/Finance';

export const SYMBOL_INDEX_COLS_MAP = {
  'RT00S': 'symbol',
  'SecId': 'symbol_id',
  'AC040': 'exchange_name',
  'LS01Z': 'exchange_code_mic',
  'AC042': 'short_name',
  'FriendlyName': 'friendly_name',
  'RT0SN': 'eng_name',
  'Description': 'description',
  'OS0LN': 'local_name',
  'locale': 'locale'
};

export const INTERVAL_MAP = {
  '1D': '1D',
  '1M': 'Max'
};

export const RESAMPLE_MAP = {
  '1D': '1D',
  '1W': '1W',
  '1M': 'ME'
};

export const OHLC_MAP = {
  'timeStamps': 'time',
  'openPrices': 'open',
  'pricesHigh': 'high',
  'pricesLow': 'low',
  'prices': 'close',
  'volumes': 'volume',
};

export const CURRENCY_ID_MAP: Record<string, string> = {
  'USDVND': 'avyufr',
  'JPYVND': 'ave8sm',
  'AUDVND': 'auxrkr',
  'CNYVND': 'av55fr',
  'KRWVND': 'avfg9c',
  'USDJPY': 'avyomw',
  'USDEUR': 'avyn9c',
  'USDCAD': 'avylur',
  'USDCHF': 'avyt7w',
  'USDCNY': 'avym77',
  'USDKRW': 'avyoyc',
  'USDSGD': 'avyspr',
  'USDHKD': 'avynz2',
  'USDTRY': 'avytp2',
  'USDINR': 'avyo8m',
  'USDDKK': 'avymr7',
  'USDSEK': 'avyt52',
  'USDILS': 'avyoh7',
  'USDRUB': 'avys2w',
  'USDMXN': 'avyqcw',
  'USDZAR': 'avysvh',
  'EURUSD': 'av932w',
  'EURVND': 'av93ec',
  'EURJPY': 'av8wim',
  'EURGBP': 'av92z2',
  'EURCHF': 'av923m',
  'EURCAD': 'av8ttc',
  'EURAUD': 'av8sfr',
  'EURNZD': 'av8ysm',
  'GBPJPY': 'avye1h',
  'GBPVND': 'avyjtc',
  'GBPUSD': 'avyjhw',
  'GBPAUD': 'avy9ur',
  'GBPCHF': 'avyilh',
  'GBPNZD': 'avygbh',
  'GBPCAD': 'avyb9c',
  'AUDUSD': 'auxr9c',
  'NZDUSD': 'avmpm7',
};

export const CRYPTO_ID_MAP: Record<string, string> = {
  'BTC': 'c2111',
  'ETH': 'c2112',
  'USDT': 'c2115',
  'USDC': 'c211a',
  'BNB': 'c2113',
  'BUSD': 'c211i',
  'XRP': 'c2117',
  'ADA': 'c2114',
  'SOL': 'c2116',
  'DOGE': 'c2119'
};

export const GLOBAL_INDICES: Record<string, string> = {
  'VNINDEX': 'av8k4w',
  'VN30': 'av8k52',
  'HNX': 'av8k57',
  'HNX30': 'av8k5c',
  'UPCOM': 'av8k5h',
  'DOWJONES': 'av8k62',
  'NASDAQ': 'av8k67',
  'S&P500': 'av8k6c',
  'DAX': 'av8k6h',
  'FTSE100': 'av8k6m',
  'NIKKEI225': 'av8k6r',
  'HANGSENG': 'av8k6w',
  'SHANGHAI': 'av8k72',
  'KOSPI': 'av8k77',
  'NIFTY50': 'av8k7c',
  'SET': 'av8k7h',
  'STI': 'av8k7m',
  'JKSE': 'av8k7r',
  'KLCI': 'av8k7w',
  'PSEI': 'av8k82',
  'TAIEX': 'av8k87',
  'ASX200': 'av8k8c',
  'NZX50': 'av8k8h',
  'TSX': 'av8k8m',
  'BOVESPA': 'av8k8r',
  'MERVAL': 'av8k8w',
  'IPC': 'av8k92',
  'IPSA': 'av8k97',
};
