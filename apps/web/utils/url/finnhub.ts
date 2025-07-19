import { serializeQueryParams } from "./serialize-query-params";

export function withFinnhubBaseUrl(
  path: string,
  params?: Record<string, string>,
) {
  return `https://finnhub.io/api/v1/${path}${serializeQueryParams(params)}`;
}
