export interface FMarketFundModel {
  id: number;
  short_name: string;
  name: string;
  fund_type?: string;
  fund_owner_name?: string;
  management_fee?: number;
  inception_date?: string | null;
  nav?: number;
  nav_change_previous?: number;
  nav_change_last_year?: number;
  nav_change_inception?: number;
  nav_change_1m?: number;
  nav_change_3m?: number;
  nav_change_6m?: number;
  nav_change_12m?: number;
  nav_change_24m?: number;
  nav_change_36m?: number;
  nav_change_36m_annualized?: number;
  nav_update_at?: string | null;
  fund_id_fmarket?: number;
  fund_code?: string;
  vsd_fee_id?: string;
  [key: string]: any; // Allow other properties
}

export interface FMarketTopHolding {
  stock_code: string;
  industry: string;
  net_asset_percent: number;
  type_asset: string;
  update_at: string | null;
  fund_id: number;
}

export interface FMarketIndustryHolding {
  industry: string;
  net_asset_percent: number;
}

export interface FMarketNavReport {
  date: string;
  nav_per_unit: number;
}

export interface FMarketAssetHolding {
  asset_percent: number;
  asset_type: string;
}
