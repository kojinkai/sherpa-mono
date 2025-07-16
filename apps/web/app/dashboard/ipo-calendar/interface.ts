export enum TimeFilters {
  MAXIMUM = "Maximum",
  LAST_24 = "Last 24 Hours",
  LAST_WEEK = "Last Week",
}

export enum ExchangeFilters {
  NYSE = "NYSE",
  NASDAQ_CAPITAL = "NASDAQ Capital",
  NASDAQ_GLOBAL = "NASDAQ Global",
  NASDAQ_GLOBAL_SELECT = "NASDAQ Global Select",
}

export type IpoTableFilterOptions = {
  name: string;
  defaultValue: TimeFilters | ExchangeFilters;
  value: TimeFilters | ExchangeFilters;
  onChange: (value: TimeFilters | ExchangeFilters) => void;
  options: { label: string }[];
}[];
