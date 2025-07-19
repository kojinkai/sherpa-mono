import { formatNumber } from "./formatNumber";

describe("The toFormattedNumber util", () => {
  test("it returns a number formatted to 6 significant digits", () => {
    const actual = formatNumber(1234567.89);

    expect(actual).toBe("1,234,567.89");
  });
});
