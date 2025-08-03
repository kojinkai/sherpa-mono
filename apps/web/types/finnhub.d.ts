declare module "finnhub" {
  export class ApiClient {
    static instance: {
      authentications: {
        api_key: {
          apiKey: string;
        };
      };
    };
  }

  export class DefaultApi {
    constructor();
    ipoCalendar(
      from: string,
      to: string,
      callback: (error: Error | null, data: any) => void,
    ): void;
    symbolSearch(
      q: string,
      callback: (error: Error | null, data: any) => void,
    ): void;
    stockSymbols(
      exchange: string,
      callback: (error: Error | null, data: any, response: any) => void,
    ): void;
  }
}
