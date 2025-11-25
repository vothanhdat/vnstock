export interface TCBSCompanyProfile {
  id: string | null;
  companyName: string;
  ticker: string | null;
  companyProfile: string;
  historyDev: string;
  companyPromise: string;
  businessRisk: string;
  keyDevelopments: string;
  businessStrategies: string;
}

export interface TCBSFinancialReport {
  ticker: string;
  quarter: number;
  year: number;
  revenue: number | null;
  yearRevenueGrowth: number | null;
  quarterRevenueGrowth: number | null;
  costOfGoodSold: number | null;
  grossProfit: number | null;
  operationExpense: number | null;
  operationProfit: number | null;
  yearOperationProfitGrowth: number | null;
  quarterOperationProfitGrowth: number | null;
  interestExpense: number | null;
  preTaxProfit: number | null;
  postTaxProfit: number | null;
  shareHolderIncome: number | null;
  yearShareHolderIncomeGrowth: number | null;
  quarterShareHolderIncomeGrowth: number | null;
  investProfit: number | null;
  serviceProfit: number | null;
  otherProfit: number | null;
  provisionExpense: number | null;
  operationIncome: number | null;
  ebitda: number | null;
  [key: string]: any;
}

export interface TCBSPriceBoard {
  t: string; // Ticker
  fv: number;
  mav: number;
  nstv: number;
  nstp: number;
  rsi: number;
  macdv: number;
  macdsignal: string;
  tsignal: string;
  avgsignal: string;
  ma20: number;
  ma50: number;
  ma100: number;
  session: number;
  mw3d: number;
  mw1m: number;
  mw3m: number;
  mw1y: number;
  rs3d: number;
  rs1m: number;
  rs3m: number;
  rs1y: number;
  rsavg: number;
  hp1m: number;
  hp3m: number;
  hp1y: number;
  lp1m: number;
  lp3m: number;
  lp1y: number;
  hp1yp: number;
  lp1yp: number;
  pe: number;
  pb: number;
  roe: number;
  oscore: number;
  av: number;
  bv: number;
  ev: number;
  hmp: number;
  mscore: number;
  delta1m: number;
  delta1y: number;
  seq: number;
  vnid3d: number;
  vnid1m: number;
  vnid3m: number;
  vnid1y: number;
  cp: number;
  vnipe: number;
  vnipb: number;
  roa: number;
  dividend: number;
  [key: string]: any;
}

export interface TCBSScreenerResult {
  ticker: string;
  exchangeName: { vi: string; en: string } | string;
  industryName: { vi: string; en: string } | string;
  companyName: string;
  marketCap: number;
  roe: number;
  stockRating: number;
  pe: number;
  pb: number;
  evEbitda: number;
  dividendYield: number;
  [key: string]: any;
}
