import { StockSymbolData } from "@/models";
import {
  AlphaVantageTicker,
  AlphaVantageTickerNormalised,
} from "@/models/stock-overview";
import { formatNumber } from "@/utils/formatters/formatNumber";
import { flow, map } from "lodash/fp";

// This file takes a response from the AlphaVantage TOP_GAINERS_LOSERS API
// shaped as folllows
// {
//   "ticker": "IXHL",
//   "price": "0.61",
//   "change_amount": "0.2399",
//   "change_percentage": "64.8203%",
//   "volume": "472831869"
// }
//
// Note that the numerical values are strings, so these need to be transformed
// so we can compare them properly with less than or greater than comparisons.
//
// Because we also want to display the stock name and not just the symbol
// we need to merge the name in, which we get from a separate DB call to our stored
// US symbols

function normaliseAlphaVantaeTicker(
  stock: AlphaVantageTicker,
): AlphaVantageTickerNormalised {
  const convertChangeToFloat = (value: string) => {
    const str = value.replace("%", "");
    const parsedValue = parseFloat(str);

    return isNaN(parsedValue) ? 0 : parsedValue;
  };
  return {
    ...stock,
    change_amount: convertChangeToFloat(stock.change_amount),
    change_percentage: convertChangeToFloat(stock.change_percentage),
    volume: formatNumber(parseInt(stock.volume)),
  };
}

function getNameFromSymbol(
  symbolData: StockSymbolData[],
  ticker: AlphaVantageTickerNormalised["ticker"],
): string {
  const correlatedSymbol = symbolData.find(
    (symbolDatum) => symbolDatum.symbol == ticker,
  );
  return correlatedSymbol
    ? correlatedSymbol.description.toLowerCase()
    : ticker.toUpperCase();
}

function decorateAlphaVantageStockWithName(symbolData: StockSymbolData[]) {
  return ({ ticker, ...rest }: AlphaVantageTickerNormalised) => {
    return {
      ...rest,
      ticker,
      name: getNameFromSymbol(symbolData, ticker),
    };
  };
}
export const transformer = (symbolData: StockSymbolData[]) =>
  flow(
    map(normaliseAlphaVantaeTicker),
    map(decorateAlphaVantageStockWithName(symbolData)),
  );
