import { APIResponse, ApiResponseError, RouterParams } from "@/app/interface";
import { alphaVantageClient } from "./client";
import {
  AlphaVantageCompanyOverview,
  AlphaVantageTopGainersLosers,
} from "./types";

export async function getSymbolPageData({
  symbolId,
}: {
  symbolId: RouterParams["symbolId"];
}): Promise<APIResponse<AlphaVantageCompanyOverview>> {
  try {
    // Use the experimental function for company overview
    const data = await alphaVantageClient.experimental("OVERVIEW", {
      symbol: symbolId,
    });

    return {
      data: data as AlphaVantageCompanyOverview,
      success: true,
    };
  } catch (error) {
    return {
      data: undefined,
      success: false,
      error: error as ApiResponseError,
    };
  }
}

export async function getTopGainersLosers(): Promise<
  APIResponse<AlphaVantageTopGainersLosers>
> {
  try {
    // Use the experimental function for company overview
    const data = await alphaVantageClient.experimental(
      "TOP_GAINERS_LOSERS",
      {},
    );

    return {
      data: data as AlphaVantageTopGainersLosers,
      success: true,
    };
  } catch (error) {
    return {
      data: undefined,
      success: false,
      error: error as ApiResponseError,
    };
  }
}
