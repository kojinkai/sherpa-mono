import { getTopGainersLosers } from "@/utils/alphavantage";
import { prisma } from "database";
import type { AlphaVantageTickerNormalisedWithName } from "../../models";
import { APIResponse } from "../interface";
import { mergeSymbolData } from "./transformer";

type DashboardData = {
  last_updated: string;
  top_gainers: AlphaVantageTickerNormalisedWithName[];
  top_losers: AlphaVantageTickerNormalisedWithName[];
  most_actively_traded: AlphaVantageTickerNormalisedWithName[];
};

export async function getData(): Promise<APIResponse<DashboardData>> {
  const res = await getTopGainersLosers();

  if (!res.success) {
    return res;
  }

  const { top_gainers, top_losers, most_actively_traded } = res.data;

  const tickers = [...top_gainers, ...top_losers, ...most_actively_traded].map(
    ({ ticker }) => ticker,
  );

  const symbolData = await prisma.stockSymbol.findMany({
    where: {
      symbol: {
        in: tickers,
      },
    },
  });

  const transformTicker = mergeSymbolData(symbolData);

  return {
    ...res,
    data: {
      last_updated: res.data.last_updated.split(" ")[0],
      top_gainers: transformTicker(top_gainers),
      top_losers: transformTicker(top_losers),
      most_actively_traded: transformTicker(most_actively_traded),
    },
  };
}
