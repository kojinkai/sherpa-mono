import { withFinnhubBaseUrl } from "./finnhub";

describe("Testing the withFinnhubBaseUrl function", () => {
  it("appends the path and the query params to the API URL", () => {
    const actual = withFinnhubBaseUrl("stock/symbol", { exchange: "US" });
    const expected = "https://finnhub.io/api/v1/stock/symbol?exchange=US";

    expect(actual).toEqual(expected);
  });
});
