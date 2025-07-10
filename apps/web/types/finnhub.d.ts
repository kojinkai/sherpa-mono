declare module "finnhub" {
  export class ApiClient {
    constructor(config: { api_key: string });
  }

  export class DefaultApi {
    constructor(apiClient: ApiClient);
    ipoCalendar(from: string, to: string): Promise<any>;
  }
}
