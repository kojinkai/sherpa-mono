# AlphaVantage Utility Structure

This folder contains a comprehensive wrapper around the AlphaVantage API library with enhanced functionality, TypeScript support, and better error handling.

## File Structure

```
utils/alphavantage/
├── index.ts              # Main export file - exports the singleton client
├── client.ts             # Enhanced client wrapper with error handling
├── types.ts              # TypeScript interfaces for API responses
├── examples.ts           # Usage examples and common patterns
├── README.md             # Comprehensive documentation
├── migration-guide.md    # Guide for migrating from URL-based approach
└── STRUCTURE.md          # This file - overview of the structure
```

## Key Components

### 1. `index.ts` - Main Export

- Exports the singleton `alphaVantageClient` instance
- Re-exports all types for convenience
- Provides default export for easy importing

### 2. `client.ts` - Enhanced Client

- Wraps the raw AlphaVantage library
- Adds comprehensive error handling and logging
- Provides organized access to all API endpoints
- Includes data polishing utilities
- Maintains singleton pattern for consistent API key usage

### 3. `types.ts` - TypeScript Support

- Common parameter interfaces
- Response data structures
- Generic response wrapper types
- Ensures type safety across the application

### 4. `examples.ts` - Usage Examples

- Common usage patterns
- Error handling examples
- Batch API call examples
- Demonstrates best practices

### 5. `README.md` - Documentation

- Complete API reference
- Setup instructions
- Usage examples for all endpoints
- Environment variable configuration
- Rate limiting information

### 6. `migration-guide.md` - Migration Support

- Step-by-step migration from current URL-based approach
- Before/after code examples
- Benefits of the new approach
- Testing strategies

## Usage Patterns

### Basic Import

```typescript
import { alphaVantageClient } from "@/utils/alphavantage";
// or
import alphaVantageClient from "@/utils/alphavantage";
```

### Stock Data

```typescript
const dailyData = await alphaVantageClient.data.daily("AAPL");
const quote = await alphaVantageClient.data.quote("MSFT");
```

### Technical Indicators

```typescript
const sma = await alphaVantageClient.technical.sma(
  "AAPL",
  "daily",
  20,
  "close",
);
const rsi = await alphaVantageClient.technical.rsi(
  "MSFT",
  "daily",
  14,
  "close",
);
```

### Experimental Functions

```typescript
const overview = await alphaVantageClient.experimental("OVERVIEW", {
  symbol: "AAPL",
});
```

## Environment Variables

The utility supports both client-side and server-side API key configuration:

- `ALPHA_VANTAGE_API_KEY` - Server-side only
- `NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY` - Client-side accessible

## Benefits Over Current Implementation

1. **Centralized Configuration**: Single place for API key management
2. **Better Error Handling**: Built-in logging and error propagation
3. **Type Safety**: Comprehensive TypeScript support
4. **Consistency**: Singleton pattern ensures uniform behavior
5. **Maintainability**: Easy to add new endpoints and features
6. **Developer Experience**: Better IntelliSense and documentation

## Migration Path

The utility is designed to work alongside the current URL-based implementation, allowing for gradual migration:

1. **Phase 1**: Use new utility for new features
2. **Phase 2**: Migrate existing functions one by one
3. **Phase 3**: Remove old implementation once migration is complete

## Extensibility

Adding new endpoints is straightforward:

1. Add the method to the appropriate section in `client.ts`
2. Include proper error handling and logging
3. Add TypeScript types if needed
4. Update documentation and examples

## Testing

The utility includes comprehensive error handling and logging, making it easy to debug issues during development and testing.
