export interface MSNQuoteData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  [key: string]: any;
}

export interface MSNSearchResult {
  symbol: string;
  symbol_id: string;
  exchange_name: string;
  exchange_code_mic: string;
  short_name: string;
  friendly_name: string;
  eng_name: string;
  description: string;
  local_name: string;
  locale: string;
  [key: string]: any;
}
