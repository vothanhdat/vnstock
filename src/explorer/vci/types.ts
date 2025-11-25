export interface VCICompanyProfile {
  id: string;
  organ_name?: string;
  en_organ_name?: string;
  issue_share: number;
  en__history: string;
  history: string;
  en__company_profile: string;
  company_profile: string;
  icb_name3: string;
  en_icb_name3: string;
  icb_name2: string;
  en_icb_name2: string;
  icb_name4: string;
  en_icb_name4: string;
  financial_ratio?: any;
  [key: string]: any;
}

export interface VCIShareholder {
  id: string;
  ticker: string;
  owner_full_name: string;
  en__owner_full_name: string;
  quantity: number;
  percentage: number;
  update_date: number;
  [key: string]: any;
}

export interface VCIFinancialRatio {
  year_report: number;
  length_report: number;
  update_date: number;
  revenue: number;
  revenue_growth: number;
  net_profit: number;
  net_profit_growth: number;
  ebit_margin: number;
  roe: number;
  roic: number;
  roa: number;
  pe: number;
  pb: number;
  eps: number;
  current_ratio: number;
  cash_ratio: number;
  quick_ratio: number;
  interest_coverage: number;
  net_profit_margin: number;
  gross_margin: number;
  ev: number;
  issue_share: number;
  ps: number;
  pcf: number;
  bvps: number;
  ev_per_ebitda: number;
  dividend: number;
  ebitda: number;
  ebit: number;
  [key: string]: any;
}

export interface VCIListing {
  organ_name: string;
  en_organ_name: string;
  icb_name3: string;
  en_icb_name3: string;
  icb_name2: string;
  en_icb_name2: string;
  icb_name4: string;
  en_icb_name4: string;
  com_type_code: string;
  icb_code1: string;
  icb_code2: string;
  icb_code3: string;
  icb_code4: string;
  symbol: string;
  [key: string]: any;
}

export interface VCIPriceBoard {
  code: string;
  symbol: string;
  ceiling: number;
  floor: number;
  ref_price: number;
  stock_type: string;
  board: string;
  trading_status: string;
  trading_date: string;
  match_price: number;
  open_price: number;
  highest: number;
  lowest: number;
  accumulated_volume: number;
  accumulated_value: number;
  foreign_buy_volume: number;
  foreign_sell_volume: number;
  [key: string]: any;
}
