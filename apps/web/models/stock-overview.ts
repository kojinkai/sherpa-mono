// Type returned by Alpha Vantage API
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
