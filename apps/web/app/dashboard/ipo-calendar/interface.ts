export enum TimeFilters {
  MAXIMUM = "Maximum",
  LAST_24 = "Last 24 Hours",
  LAST_WEEK = "Last Week",
}

export enum ExchangeFilters {
  ALL = "All",
  NYSE = "NYSE",
  NASDAQ_CAPITAL = "NASDAQ Capital",
  NASDAQ_GLOBAL = "NASDAQ Global",
  NASDAQ_GLOBAL_SELECT = "NASDAQ Global Select",
}

export enum StatusFilters {
  ALL = "all",
  EXPECTED = "expected",
  PRICED = "priced",
  FILED = "filed",
  WITHDRAWN = "withdrawn",
}

export type IpoTableFilterOptions = {
  name: string;
  defaultValue: TimeFilters | ExchangeFilters | StatusFilters;
  value: TimeFilters | ExchangeFilters | StatusFilters;
  onChange: (value: TimeFilters | ExchangeFilters | StatusFilters) => void;
  options: { label: string }[];
}[];
