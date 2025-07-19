import {
  AlphavantagePaths,
  withAlphaVantageBaseUrl,
} from "@/utils/url/alphavantage";
import { prisma } from "database";
import type {
  AlphaVantageTicker,
  AlphaVantageTickerNormalisedWithName,
} from "../../models/stock-overview";
import { transformer } from "./transformer";

type DashboardData = {
  last_updated: string;
  top_gainers: AlphaVantageTickerNormalisedWithName[];
  top_losers: AlphaVantageTickerNormalisedWithName[];
  most_actively_traded: AlphaVantageTickerNormalisedWithName[];
};

export async function getData(): Promise<DashboardData | undefined> {
  const res = await fetch(
    withAlphaVantageBaseUrl({ function: AlphavantagePaths.TOP_GAINERS_LOSERS }),
  );

  if (res.ok) {
    const data: {
      last_updated: string;
      top_gainers: AlphaVantageTicker[];
      top_losers: AlphaVantageTicker[];
      most_actively_traded: AlphaVantageTicker[];
    } = await res.json();
    const { top_gainers, top_losers, most_actively_traded } = data;

    const tickers = [
      ...top_gainers,
      ...top_losers,
      ...most_actively_traded,
    ].map(({ ticker }) => ticker);

    const symbolData = await prisma.stockSymbol.findMany({
      where: {
        symbol: {
          in: tickers,
        },
      },
    });

    const transformTicker = transformer(symbolData);

    return {
      last_updated: data.last_updated.split(" ")[0],
      top_gainers: transformTicker(top_gainers),
      top_losers: transformTicker(top_losers),
      most_actively_traded: transformTicker(most_actively_traded),
    };
  }
}
