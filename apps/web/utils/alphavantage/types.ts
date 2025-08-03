// Common parameter types
export interface AlphaVantageTimeSeriesParams {
  symbol: string;
  outputsize?: "compact" | "full";
  datatype?: "json" | "csv";
  interval?: string;
}

export interface AlphaVantageTechnicalParams {
  symbol: string;
  interval: string;
  timePeriod: number;
  seriesType: "open" | "high" | "low" | "close" | "volume";
}

// Common response types
export interface AlphaVantageTimeSeriesData {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

export interface AlphaVantageQuoteData {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

export interface AlphaVantageSearchResult {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

// API response wrapper
export interface AlphaVantageResponse<T> {
  "Meta Data"?: Record<string, string>;
  "Time Series (Daily)"?: T;
  "Time Series (Intraday)"?: T;
  "Time Series (Weekly)"?: T;
  "Time Series (Monthly)"?: T;
  "Global Quote"?: T;
  "Best Matches"?: T[];
  "Error Message"?: string;
  Note?: string;
}

// my interface - above is AI
export type AlphaVantageCompanyOverview = {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  OfficialSite: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  AnalystRatingStrongBuy: string;
  AnalystRatingBuy: string;
  AnalystRatingHold: string;
  AnalystRatingSell: string;
  AnalystRatingStrongSell: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  SharesFloat: string;
  PercentInsiders: string;
  PercentInstitutions: string;
  DividendDate: string;
  ExDividendDate: string;
};

export type AlphaVantageTicker = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

// Type returned by Alpha Vantage API
export type AlphaVantageTickerNormalised = Omit<
  AlphaVantageTicker,
  "change_amount" | "change_percentage"
> & {
  change_amount: number;
  change_percentage: number;
};

// Type returned by Alpha Vantage API
export type AlphaVantageTickerNormalisedWithName =
  AlphaVantageTickerNormalised & {
    name: string;
  };

export type AlphaVantageTopGainersLosers = {
  last_updated: string;
  top_gainers: AlphaVantageTicker[];
  top_losers: AlphaVantageTicker[];
  most_actively_traded: AlphaVantageTicker[];
};
