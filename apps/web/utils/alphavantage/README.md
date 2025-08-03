# AlphaVantage Utility

This utility provides a wrapper around the [AlphaVantage API](https://www.npmjs.com/package/alphavantage) with enhanced error handling, TypeScript support, and a singleton pattern for consistent usage across the application.

## Setup

1. Set your AlphaVantage API key in your environment variables:

   ```bash
   # For client-side usage (Next.js public env)
   NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here

   # For server-side usage only
   ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

2. Import the client in your components:
   ```typescript
   import { alphaVantageClient } from "@/utils/alphavantage";
   ```

## Usage Examples

### Stock Data

```typescript
// Get daily stock data
const dailyData = await alphaVantageClient.data.daily(
  "AAPL",
  "compact",
  "json",
);

// Get intraday data
const intradayData = await alphaVantageClient.data.intraday(
  "MSFT",
  "compact",
  "json",
  "5min",
);

// Get stock quote
const quote = await alphaVantageClient.data.quote("GOOGL");

// Search for stocks
const searchResults = await alphaVantageClient.data.search("Apple");
```

### Technical Indicators

```typescript
// Simple Moving Average
const sma = await alphaVantageClient.technical.sma(
  "AAPL",
  "daily",
  20,
  "close",
);

// Relative Strength Index
const rsi = await alphaVantageClient.technical.rsi(
  "MSFT",
  "daily",
  14,
  "close",
);

// MACD
const macd = await alphaVantageClient.technical.macd(
  "GOOGL",
  "daily",
  "close",
  12,
  26,
  9,
);

// Bollinger Bands
const bbands = await alphaVantageClient.technical.bbands(
  "AAPL",
  "daily",
  20,
  "close",
  2,
  2,
);
```

### Forex & Crypto

```typescript
// Forex rate
const forexRate = await alphaVantageClient.forex.rate("EUR", "USD");

// Crypto data
const cryptoDaily = await alphaVantageClient.crypto.daily("BTC", "USD");
const cryptoWeekly = await alphaVantageClient.crypto.weekly("ETH", "USD");
```

### Experimental Functions

```typescript
// Use any AlphaVantage API function not yet implemented
const customData = await alphaVantageClient.experimental("TIME_SERIES_DAILY", {
  symbol: "XYZ",
  outputsize: "compact",
  datatype: "json",
});
```

### Data Polishing

```typescript
// Polish raw API response data
const rawData = await alphaVantageClient.data.daily("AAPL");
const polishedData = alphaVantageClient.util.polish(rawData);
```

### Raw Client Access

```typescript
// Access the raw AlphaVantage client for advanced usage
const rawClient = alphaVantageClient.raw;
const customCall = await rawClient.data.intraday("AAPL");
```

## Error Handling

All methods include built-in error handling and logging. Errors are logged to the console and then re-thrown for your application to handle:

```typescript
try {
  const data = await alphaVantageClient.data.daily("INVALID_SYMBOL");
} catch (error) {
  console.error("Failed to fetch data:", error);
  // Handle error in your UI
}
```

## TypeScript Support

The utility includes TypeScript interfaces for common data structures:

```typescript
import type {
  AlpahvantageTimeSeriesData,
  AlpahvantageQuoteData,
  AlpahvantageSearchResult,
} from "@/utils/alphavantage/types";

const dailyData: AlphaVantageResponse<TimeSeriesData> =
  await alphaVantageClient.data.daily("AAPL");
const quote: AlphaVantageResponse<QuoteData> =
  await alphaVantageClient.data.quote("MSFT");
```

## API Key Management

- **Client-side**: Use `NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY` for components that run in the browser
- **Server-side only**: Use `ALPHA_VANTAGE_API_KEY` for API routes and server components
- The utility will warn you if no API key is found

## Rate Limiting

AlphaVantage has rate limits based on your subscription plan:

- Free tier: 5 API calls per minute, 500 per day
- Premium tiers: Higher limits

Consider implementing caching and rate limiting in your application if you're making frequent API calls.

## Contributing

When adding new AlphaVantage API endpoints:

1. Add the method to the appropriate section in `client.ts`
2. Include proper error handling and logging
3. Add TypeScript types if needed
4. Update this README with usage examples
