export interface VNDirectScreenerResult {
  code: string;
  companyNameVi: string;
  companyNameEn?: string;
  floor: string;
  industrylv2: string;
  priceCr: number;
  marketCapCr: number;
  peCr: number;
  pbCr: number;
  epsTr: number;
  roeTr: number;
  roaTr: number;
  [key: string]: any;
}

export interface VNDirectScreenerFilter {
  dbFilterCode: string;
  condition: 'EQUAL' | 'GT' | 'LT' | 'GTE' | 'LTE' | 'CONTAIN' | 'IN';
  value: string | number;
}

export interface VNDirectScreenerPayload {
  fields: string;
  filters: VNDirectScreenerFilter[];
  sort: string;
  size?: number;
  page?: number;
}
