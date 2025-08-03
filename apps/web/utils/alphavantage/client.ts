import alphavantage from "alphavantage";
import { ApiResponseError } from "../../app/interface";

// Environment variable configuration
const API_KEY =
  process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY ||
  process.env.ALPHA_VANTAGE_API_KEY;

if (!API_KEY) {
  console.warn(
    "AlphaVantage API key not found. Please set NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY or ALPHA_VANTAGE_API_KEY environment variable.",
  );
}

// Create the AlphaVantage client instance
const client = alphavantage({ key: API_KEY || "" });

// Enhanced client with error handling and logging
export const alphaVantageClient = {
  // Stock data endpoints
  data: {
    intraday: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.intraday(
          symbol,
          outputsize,
          datatype,
          interval,
        );
      } catch (error) {
        console.error(`Error fetching intraday data for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching intraday data for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    daily: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.daily(symbol, outputsize, datatype, interval);
      } catch (error) {
        console.error(`Error fetching daily data for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching daily data for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    dailyAdjusted: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.daily_adjusted(
          symbol,
          outputsize,
          datatype,
          interval,
        );
      } catch (error) {
        console.error(
          `Error fetching daily adjusted data for ${symbol}:`,
          error,
        );
        throw new ApiResponseError(
          `Error fetching daily adjusted data for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    weekly: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.weekly(symbol, outputsize, datatype, interval);
      } catch (error) {
        console.error(`Error fetching weekly data for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching weekly data for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    weeklyAdjusted: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.weekly_adjusted(
          symbol,
          outputsize,
          datatype,
          interval,
        );
      } catch (error) {
        console.error(
          `Error fetching weekly adjusted data for ${symbol}:`,
          error,
        );
        throw new ApiResponseError(
          `Error fetching weekly adjusted data for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    monthly: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.monthly(
          symbol,
          outputsize,
          datatype,
          interval,
        );
      } catch (error) {
        console.error(`Error fetching monthly data for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching monthly data for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    monthlyAdjusted: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.monthly_adjusted(
          symbol,
          outputsize,
          datatype,
          interval,
        );
      } catch (error) {
        console.error(
          `Error fetching monthly adjusted data for ${symbol}:`,
          error,
        );
        throw new ApiResponseError(
          `Error fetching monthly adjusted data for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    quote: async (
      symbol: string,
      outputsize?: string,
      datatype?: string,
      interval?: string,
    ) => {
      try {
        return await client.data.quote(symbol, outputsize, datatype, interval);
      } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching quote for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    search: async (keywords: string) => {
      try {
        return await client.data.search(keywords);
      } catch (error) {
        console.error(`Error searching for keywords "${keywords}":`, error);
        throw new ApiResponseError(
          `Error searching for keywords "${keywords}"`,
          undefined,
          error,
        );
      }
    },
  },

  // Forex endpoints
  forex: {
    rate: async (fromCurrency: string, toCurrency: string) => {
      try {
        return await client.forex.rate(fromCurrency, toCurrency);
      } catch (error) {
        console.error(
          `Error fetching forex rate from ${fromCurrency} to ${toCurrency}:`,
          error,
        );
        throw new ApiResponseError(
          `Error fetching forex rate from ${fromCurrency} to ${toCurrency}`,
          undefined,
          error,
        );
      }
    },
  },

  // Crypto endpoints
  crypto: {
    daily: async (symbol: string, market: string) => {
      try {
        return await client.crypto.daily(symbol, market);
      } catch (error) {
        console.error(
          `Error fetching daily crypto data for ${symbol}/${market}:`,
          error,
        );
        throw new ApiResponseError(
          `Error fetching daily crypto data for ${symbol}/${market}`,
          undefined,
          error,
        );
      }
    },

    weekly: async (symbol: string, market: string) => {
      try {
        return await client.crypto.weekly(symbol, market);
      } catch (error) {
        console.error(
          `Error fetching weekly crypto data for ${symbol}/${market}:`,
          error,
        );
        throw new ApiResponseError(
          `Error fetching weekly crypto data for ${symbol}/${market}`,
          undefined,
          error,
        );
      }
    },

    monthly: async (symbol: string, market: string) => {
      try {
        return await client.crypto.monthly(symbol, market);
      } catch (error) {
        console.error(
          `Error fetching monthly crypto data for ${symbol}/${market}:`,
          error,
        );
        throw new ApiResponseError(
          `Error fetching monthly crypto data for ${symbol}/${market}`,
          undefined,
          error,
        );
      }
    },
  },

  // Technical indicators
  technical: {
    sma: async (
      symbol: string,
      interval: string,
      timePeriod: number,
      seriesType: string,
    ) => {
      try {
        return await client.technical.sma(
          symbol,
          interval,
          timePeriod,
          seriesType,
        );
      } catch (error) {
        console.error(`Error fetching SMA for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching SMA for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    ema: async (
      symbol: string,
      interval: string,
      timePeriod: number,
      seriesType: string,
    ) => {
      try {
        return await client.technical.ema(
          symbol,
          interval,
          timePeriod,
          seriesType,
        );
      } catch (error) {
        console.error(`Error fetching EMA for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching EMA for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    rsi: async (
      symbol: string,
      interval: string,
      timePeriod: number,
      seriesType: string,
    ) => {
      try {
        return await client.technical.rsi(
          symbol,
          interval,
          timePeriod,
          seriesType,
        );
      } catch (error) {
        console.error(`Error fetching RSI for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching RSI for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    macd: async (
      symbol: string,
      interval: string,
      seriesType: string,
      fastPeriod?: number,
      slowPeriod?: number,
      signalPeriod?: number,
    ) => {
      try {
        return await client.technical.macd(
          symbol,
          interval,
          seriesType,
          fastPeriod,
          slowPeriod,
          signalPeriod,
        );
      } catch (error) {
        console.error(`Error fetching MACD for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching MACD for ${symbol}`,
          undefined,
          error,
        );
      }
    },

    bbands: async (
      symbol: string,
      interval: string,
      timePeriod: number,
      seriesType: string,
      nbDevUp?: number,
      nbDevDn?: number,
    ) => {
      try {
        return await client.technical.bbands(
          symbol,
          interval,
          timePeriod,
          seriesType,
          nbDevUp,
          nbDevDn,
        );
      } catch (error) {
        console.error(`Error fetching Bollinger Bands for ${symbol}:`, error);
        throw new ApiResponseError(
          `Error fetching Bollinger Bands for ${symbol}`,
          undefined,
          error,
        );
      }
    },
  },

  // Experimental endpoints for unsupported functions
  experimental: async (functionName: string, params: Record<string, any>) => {
    try {
      return await client.util.fn(functionName)(params);
    } catch (error) {
      console.error(
        `Error calling experimental function ${functionName}:`,
        error,
      );
      throw new ApiResponseError(
        `Error calling experimental function ${functionName}`,
        undefined,
        error,
      );
    }
  },

  // Utility functions
  util: {
    polish: (data: any) => {
      try {
        return client.util.polish(data);
      } catch (error) {
        console.error("Error polishing data:", error);
        return data; // Return original data if polishing fails
      }
    },
  },

  // Raw client access for advanced usage
  raw: client,
};

export default alphaVantageClient;
