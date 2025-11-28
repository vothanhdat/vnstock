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

export interface TCBSLocalizedField {
  vi: string;
  en: string;
}

/**
 * TCBS Screener Result Interface
 * Represents the data returned by TCBS stock screener API
 */
export interface TCBSScreenerResult {
  /**
   * Stock symbol (e.g., "ACB")
   */
  ticker: string;
  
  /**
   * Exchange name (HOSE, HNX, UPCOM)
   * - vi: Sàn
   * - en: Exchange
   */
  exchangeName: TCBSLocalizedField | string;
  
  /**
   * Industry classification
   * - vi: Ngành
   * - en: Industry
   */
  industryName: TCBSLocalizedField | string;
  
  /**
   * Company name
   */
  companyName: string;
  
  /**
   * Market capitalization (billion VND)
   * - vi: Vốn hoá
   * - en: Market Cap
   */
  marketCap: number;
  
  /**
   * Return on Equity (%)
   * - vi: ROE
   * - en: ROE
   */
  roe: number;
  
  /**
   * TCBS Stock Rating (0-5)
   * - vi: TC Rating
   * - en: TC Rating
   */
  stockRating: number;
  
  /**
   * Business Operation Score
   * - vi: Hiệu quả HĐ
   * - en: Operational efficiency
   */
  businessOperation: number;
  
  /**
   * Business Model Score
   * - vi: Mô hình KD
   * - en: Business model
   */
  businessModel: number;
  
  /**
   * Financial Health Score
   * - vi: Sức khoẻ TC
   * - en: Financial health
   */
  financialHealth: number;
  
  /**
   * Alpha coefficient
   * - vi: Alpha
   * - en: Alpha
   */
  alpha: number;
  
  /**
   * Beta coefficient
   * - vi: Beta
   * - en: Beta
   */
  beta: number;
  
  /**
   * Relative Strength
   */
  relativeStrength: number | null;
  
  /**
   * Uptrend signal
   * - vi: Uptrend
   * - en: Uptrend
   */
  uptrend: string | null;
  
  /**
   * Active Buy Volume Percentage
   * - vi: % Mua CĐ
   * - en: % Buy Up
   */
  activeBuyPercentage: number;
  
  /**
   * Strong Buy Volume Percentage
   * - vi: % Dư mua
   * - en: % Bid
   */
  strongBuyPercentage: number;
  
  /**
   * Sudden High Volume Matching
   * - vi: Tốc độ khớp lệnh
   * - en: Trading speed
   */
  suddenlyHighVolumeMatching: number;
  
  /**
   * Forecast Volume Ratio
   * - vi: KL dự kiến so với SMA(5)
   * - en: Expected volume vs SMA(5)
   */
  forecastVolumeRatio: number;
  
  /**
   * Price crossed above SMA5 signal
   */
  priceCrossAboveSma5: any;
  
  /**
   * Price crossed below SMA5 signal
   */
  priceCrossBelowSma5: any;
  
  /**
   * Price crossed above SMA20 signal
   */
  priceCrossAboveSma20: any;
  
  /**
   * Price crossed below SMA20 signal
   */
  priceCrossBelowSma20: any;
  
  /**
   * Price to Earnings Ratio
   * - vi: P/E
   * - en: P/E
   */
  pe: number;
  
  /**
   * Price to Book Ratio
   * - vi: P/B
   * - en: P/B
   */
  pb: number;
  
  /**
   * Enterprise Value / EBITDA
   * - vi: EV/EBITDA
   * - en: EV/EBITDA
   */
  evEbitda: number;
  
  /**
   * Dividend Yield (%)
   * - vi: % Cổ tức
   * - en: %Div yield
   */
  dividendYield: number;
  
  /**
   * Price vs SMA5 status
   * - vi: Giá vs SMA(5)
   * - en: Price vs SMA(5)
   */
  priceVsSMA5: TCBSLocalizedField | null;
  
  /**
   * Price vs SMA20 status
   * - vi: Giá vs SMA(20)
   * - en: Price vs SMA(20)
   */
  priceVsSMA20: TCBSLocalizedField | null;
  
  /**
   * Revenue Growth 1 Year (%)
   * - vi: % DT 1 năm
   * - en: 1-year revenue growth
   */
  revenueGrowth1Year: number;
  
  /**
   * Revenue Growth 5 Years (%)
   * - vi: % DT 5 năm
   * - en: 5-years revenue growth
   */
  revenueGrowth5Year: number;
  
  /**
   * EPS Growth 1 Year (%)
   * - vi: % EPS 1 năm
   * - en: 1-year EPS growth
   */
  epsGrowth1Year: number;
  
  /**
   * EPS Growth 5 Years (%)
   * - vi: % EPS 5 năm
   * - en: 5-years EPS growth
   */
  epsGrowth5Year: number;
  
  /**
   * Gross Margin (%)
   * - vi: Biên LN gộp
   * - en: Gross margin
   */
  grossMargin: number;
  
  /**
   * Net Margin (%)
   * - vi: Biên LN ròng
   * - en: Net margin
   */
  netMargin: number;
  
  /**
   * Dividend on Equity / Payout Ratio
   * - vi: D/E
   * - en: D/E
   */
  doe: number;
  
  /**
   * Average Trading Value 5 Days
   * - vi: GTGD 1 tuần
   * - en: 1-week liquidity
   */
  avgTradingValue5Day: number;
  
  /**
   * Average Trading Value 10 Days
   * - vi: GTGD 10 ngày
   * - en: 10-days liquidity
   */
  avgTradingValue10Day: number;
  
  /**
   * Average Trading Value 20 Days
   * - vi: GTGD 1 tháng
   * - en: 1-month liquidity
   */
  avgTradingValue20Day: number;
  
  /**
   * Relative Strength 3 Days
   * - vi: RS 3 ngày
   * - en: 3-days RS
   */
  relativeStrength3Day: number;
  
  /**
   * Relative Strength 1 Month
   * - vi: RS 1 tháng
   * - en: 1-month RS
   */
  relativeStrength1Month: number;
  
  /**
   * Relative Strength 3 Months
   * - vi: RS 3 tháng
   * - en: 3-months RS
   */
  relativeStrength3Month: number;
  
  /**
   * Relative Strength 1 Year
   * - vi: RS 1 năm
   * - en: 1-years RS
   */
  relativeStrength1Year: number;
  
  /**
   * Total Trading Value
   * - vi: GT khớp lệnh
   * - en: Matched value
   */
  totalTradingValue: number;
  
  /**
   * Foreign Transaction Trend
   * - vi: GD khối ngoại
   * - en: Net foreign transaction
   */
  foreignTransaction: TCBSLocalizedField | null;
  
  /**
   * Near Realtime Price
   * - vi: Thị giá
   * - en: Price
   */
  priceNearRealtime: number;
  
  /**
   * RSI 14 Days
   * - vi: RSI (14)
   * - en: RSI (14)
   */
  rsi14: number;
  
  /**
   * Foreign Volume Percentage
   * - vi: % Sở hữu NN
   * - en: % Foreign ownership
   */
  foreignVolumePercent: number;
  
  /**
   * TCBS Relative Strength
   * - vi: RS trung bình
   * - en: Average RS
   */
  tcRS: number;
  
  /**
   * TCBS Recommendation
   * - vi: TCBS khuyến nghị
   * - en: TCBS's recommendations
   */
  tcbsRecommend: any;
  
  /**
   * TCBS Buy/Sell Signal
   * - vi: Tín hiệu kỹ thuật
   * - en: TCBS's technical signals
   */
  tcbsBuySellSignal: TCBSLocalizedField | null;
  
  /**
   * Foreign Buy/Sell Net Volume 20 Sessions
   * - vi: GD khối ngoại 20 phiên
   * - en: 20-days foreign trade
   */
  foreignBuySell20Session: number;
  
  /**
   * Number of consecutive increase days
   * - vi: Phiên tăng liên tiếp
   * - en: Consecutive price increases
   */
  numIncreaseContinuousDay: number;
  
  /**
   * Number of consecutive decrease days
   * - vi: Phiên giảm liên tiếp
   * - en: Consecutive price decreases
   */
  numDecreaseContinuousDay: number;
  
  /**
   * Earnings Per Share
   * - vi: EPS
   * - en: EPS
   */
  eps: number;
  
  /**
   * MACD Histogram status
   * - vi: MACD Histogram
   * - en: MACD Histogram
   */
  macdHistogram: TCBSLocalizedField | null;
  
  /**
   * Volume vs SMA5 Volume
   * - vi: Khối lượng so với SMA(5)
   * - en: Volume Vs SMA(5)
   */
  volumeVsVSma5: number;
  
  /**
   * Volume vs SMA10 Volume
   * - vi: Khối lượng so với SMA(10)
   * - en: Volume Vs SMA(10)
   */
  volumeVsVSma10: number;
  
  /**
   * Volume vs SMA20 Volume
   * - vi: Khối lượng so với SMA(20)
   * - en: Volume Vs SMA(20)
   */
  volumeVsVSma20: number;
  
  /**
   * Volume vs SMA50 Volume
   * - vi: Khối lượng so với SMA(50)
   * - en: Volume Vs SMA(50)
   */
  volumeVsVSma50: number;
  
  /**
   * Price vs SMA10 status
   * - vi: Giá vs SMA(10)
   * - en: Price Vs SMA(10)
   */
  priceVsSma10: any;
  
  /**
   * Price vs SMA50 status
   * - vi: Giá vs SMA(50)
   * - en: Price Vs SMA(50)
   */
  priceVsSma50: TCBSLocalizedField | null;
  
  /**
   * Price Breakout 52 Week signal
   * - vi: Vượt đỉnh 52 tuần
   * - en: Breaching 52-week high
   */
  priceBreakOut52Week: any;
  
  /**
   * Price Washout 52 Week signal
   * - vi: Phá đáy 52 tuần
   * - en: Breaching 52-week low
   */
  priceWashOut52Week: any;
  
  /**
   * SAR vs MACD Histogram signal
   * - vi: SAR x MACD Histogram
   * - en: SAR x MACD Histogram
   */
  sarVsMacdHist: any;
  
  /**
   * Bollinger Band Signal
   * - vi: Mở Band Bollinger 
   * - en: Expanding Bollinger Bands
   */
  bollingBandSignal: any;
  
  /**
   * DMI Signal
   * - vi: Lướt sóng vs DMI
   * - en: Trading with DMI
   */
  dmiSignal: any;
  
  /**
   * RSI 14 Status
   * - vi: Trạng thái RSI(14)
   * - en: RSI(14) Status
   */
  rsi14Status: TCBSLocalizedField | null;
  
  /**
   * Price Growth 1 Week (%)
   * - vi: % Thay đổi giá 1 tuần
   * - en: Price change in week
   */
  priceGrowth1Week: number;
  
  /**
   * Price Growth 1 Month (%)
   * - vi: % Thay đổi giá 1 tháng
   * - en: Price change in month
   */
  priceGrowth1Month: number;
  
  /**
   * Breakout signal
   * - vi: Phá nền
   * - en: Breakout
   */
  breakout: any;
  
  /**
   * Previous 1 Day Growth (%)
   * - vi: 1D
   * - en: 1D
   */
  prev1DayGrowthPercent: number;
  
  /**
   * Previous 1 Month Growth (%)
   * - vi: 1M
   * - en: 1M
   */
  prev1MonthGrowthPercent: number;
  
  /**
   * Previous 1 Year Growth (%)
   * - vi: 1Y
   * - en: 1Y
   */
  prev1YearGrowthPercent: number;
  
  /**
   * Previous 5 Years Growth (%)
   * - vi: 5Y
   * - en: 5Y
   */
  prev5YearGrowthPercent: number;
  
  /**
   * Has Financial Report status
   * - vi: Có BCTC quý gần nhất
   * - en: Has Financial Report
   */
  hasFinancialReport: TCBSLocalizedField | null;
  
  /**
   * Free Transfer Rate (%)
   * - vi: Tỷ lệ chuyển nhượng tự do
   * - en: Free-float
   */
  freeTransferRate: number;
  
  /**
   * Net Cash / Market Cap (%)
   * - vi: Tiền mặt ròng/Vốn hóa
   * - en: Net cash/Market capitalization
   */
  netCashPerMarketCap: number;
  
  /**
   * Net Cash / Total Assets (%)
   * - vi: Tiền mặt ròng/Tổng tài sản
   * - en: Net cash/Total assets
   */
  netCashPerTotalAssets: number;
  
  /**
   * Profit for last 4 quarters
   * - vi: Lợi nhuận 4 quý gần nhất
   * - en: TTM Profit
   */
  profitForTheLast4Quarters: number;
  
  /**
   * Last Quarter Revenue Growth (%)
   * - vi: Tăng trưởng doanh thu quý gần nhất
   * - en: Latest quarterly revenue growth
   */
  lastQuarterRevenueGrowth: number;
  
  /**
   * Second Last Quarter Revenue Growth (%)
   * - vi: Tăng trưởng doanh thu quý gần nhì
   * - en: Second latest quarterly revenue growth
   */
  secondQuarterRevenueGrowth: number;
  
  /**
   * Last Quarter Profit Growth (%)
   * - vi: Tăng trưởng lợi nhuận quý gần nhất
   * - en: Latest quarterly profit growth
   */
  lastQuarterProfitGrowth: number;
  
  /**
   * Second Last Quarter Profit Growth (%)
   * - vi: Tăng trưởng lợi nhuận quý gần nhì
   * - en: Second latest quarterly profit growth
   */
  secondQuarterProfitGrowth: number;
  
  /**
   * Percent from 1 Year Peak (%)
   * - vi: % cách đỉnh 1 năm
   * - en: % from 1-year high
   */
  percent1YearFromPeak: number;
  
  /**
   * Percent from Historical Peak (%)
   * - vi: % cách đỉnh lịch sử 
   * - en: % from all-time high
   */
  percentAwayFromHistoricalPeak: number;
  
  /**
   * Percent from 1 Year Bottom (%)
   * - vi: % cách đáy 1 năm
   * - en: % from 1-year low
   */
  percent1YearFromBottom: number;
  
  /**
   * Percent from Historical Bottom (%)
   * - vi: % cách đáy lịch sử 
   * - en: % from all-time low
   */
  percentOffHistoricalBottom: number;
  
  /**
   * Price vs SMA100 status
   * - vi: Giá vs SMA(100)
   * - en: Price vs SMA(100)
   */
  priceVsSMA100: TCBSLocalizedField | null;
  
  /**
   * Heating Up signal
   * - vi: Tăng nóng
   * - en: Overheated
   */
  heatingUp: any;
  
  /**
   * Price Growth 1 Day (%)
   * - vi: % Thay đổi giá hôm nay
   * - en: Price change in day
   */
  priceGrowth1Day: number;
  
  /**
   * Volume SMA 5
   * - vi: KL giao dịch trung bình 5 phiên
   * - en: 5-day average trading volume
   */
  vsma5: number;
  
  /**
   * Volume SMA 10
   * - vi: KL giao dịch trung bình 10 phiên
   * - en: 10-day average trading volume
   */
  vsma10: number;
  
  /**
   * Volume SMA 20
   * - vi: KL giao dịch trung bình 20 phiên
   * - en: 20-day average trading volume
   */
  vsma20: number;
  
  /**
   * Volume SMA 50
   * - vi: KL giao dịch trung bình 50 phiên
   * - en: 50-day average trading volume
   */
  vsma50: number;
  
  /**
   * Corporate Holding Percentage
   * - vi: Tỷ lệ sở hữu tổ chức
   * - en: Institutional ownership ratio
   */
  corporatePercentage: number;
  
  /**
   * Enterprise Value
   * - vi: Giá trị doanh nghiệp (EV)
   * - en: Enterprise value (EV)
   */
  ev: number;
  
  /**
   * Quarter Revenue Growth (%)
   * - vi: Tăng trưởng doanh thu thuần QoQ
   * - en: Net revenue growth QoQ
   */
  quarterRevenueGrowth: number;
  
  /**
   * Quarter Income Growth (%)
   * - vi: Tăng trưởng lợi nhuận ròng QoQ
   * - en: Net profit growth QoQ
   */
  quarterIncomeGrowth: number;
  
  /**
   * PEG Forward
   * - vi: PEG Foward
   * - en: PEG Forward
   */
  pegForward: number | null;
  
  /**
   * PEG Trailing
   * - vi: PEG Trailing
   * - en: PEG Trailing
   */
  pegTrailing: number;
  
  /**
   * Quarterly Income
   * - vi: Lợi nhuận ròng quý gần nhất
   * - en: Most recent quarterly net profit
   */
  quarterlyIncome: number;
  
  /**
   * Quarterly Revenue
   * - vi: Doanh thu thuần quý gần nhất
   * - en: Most recent quarterly net revenue
   */
  quarterlyRevenue: number;
  
  /**
   * Price to Sales Ratio
   * - vi: Tỷ lệ P/S
   * - en: P/S ratio
   */
  ps: number;
  
  /**
   * Return on Assets (%)
   * - vi: ROA
   * - en: ROA
   */
  roa: number;
  
  /**
   * Non-Performing Loan Ratio (for banks)
   * - vi: Tỷ lệ nợ xấu
   * - en: Bad debt ratio
   */
  npl: number | null;
  
  /**
   * Net Interest Margin (for banks)
   * - vi: Biên lãi thuần (NIM)
   * - en: Net interest margin (NIM)
   */
  nim: number | null;
  
  /**
   * Price vs SMA200 status
   * - vi: Giá vs SMA(200)
   * - en: Price vs SMA(200)
   */
  priceVsSMA200: any;
  
  /**
   * EPS TTM Growth 1 Year (%)
   * - vi: % tăng trưởng EPS TTM trong 1 năm
   * - en: % growth in EPS TTM over 1 year
   */
  epsTTMGrowth1Year: number;
  
  /**
   * EPS TTM Growth 5 Years (%)
   * - vi: % tăng trưởng EPS TTM trong 5 năm
   * - en: % growth in EPS TTM over 5 year
   */
  epsTTMGrowth5Year: number;
  
  /**
   * Equity Minority Interest
   * - vi: Vốn chủ sở hữu sau lợi ích của cổ đông thiểu số
   * - en: Equity after Minority Interest
   */
  equityMI: number;
  
  /**
   * Recent EPS
   * - vi: EPS quý gần nhất
   * - en: EPS of the most recent quarter
   */
  epsRecently: number;
  
  /**
   * Percent Price vs MA200 (%)
   * - vi: % giá hiện tại so với MA200
   * - en: % current price relative to MA200
   */
  percentPriceVsMa200: number;
  
  /**
   * Percent Price vs MA20 (%)
   * - vi: % giá hiện tại so với MA20
   * - en: % current price relative to MA20
   */
  percentPriceVsMa20: number;
  
  /**
   * Percent Price vs MA50 (%)
   * - vi: % giá hiện tại so với MA50
   * - en: % current price relative to MA50
   */
  percentPriceVsMa50: number;
  
  /**
   * Percent Price vs MA100 (%)
   * - vi: % giá hiện tại so với MA100
   * - en: % current price relative to MA100
   */
  percentPriceVsMa100: number;
  
  [key: string]: any;
}
