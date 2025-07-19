import { serializeQueryParams } from "./serialize-query-params";

type alphaVantageFunction = {
  function: string;
};

export enum AlphavantagePaths {
  TOP_GAINERS_LOSERS = "TOP_GAINERS_LOSERS",
}

export function withAlphaVantageBaseUrl(
  params: alphaVantageFunction & Record<string, string>,
) {
  const paramsWithApiKey = {
    ...params,
    apikey: process.env.ALPHA_VANTAGE_API_KEY ?? "",
  };

  return `https://www.alphavantage.co/query${serializeQueryParams(
    paramsWithApiKey,
  )}`;
}
