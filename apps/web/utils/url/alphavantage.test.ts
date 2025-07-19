import { withAlphaVantageBaseUrl } from "./alphavantage";

describe("Testing the withAlphaVantageBaseUrl function", () => {
  it("appends the query params and API key to the base URL", () => {
    const actual = withAlphaVantageBaseUrl({ function: "TOP_GAINERS_LOSERS" });
    const expected =
      "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=TEST_ALPHA_VANTAGE_KEY";

    expect(actual).toEqual(expected);
  });
});
