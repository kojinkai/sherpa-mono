import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { SymbolPageProps } from "./interface";
import SymbolPage from "./symbol-page";

// Mock the actions module
vi.mock("./actions", () => ({
  addSymbolToWatchList: vi.fn(),
  removeSymbolFromWatchList: vi.fn(),
}));

const defaultProps = {
  symbolId: "AAPL",
  isInWatchlist: false,
  data: {
    Symbol: "AAPL",
    AssetType: "Common Stock",
    Name: "Apple Inc",
    Description:
      "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    CIK: "0000320193",
    Exchange: "NASDAQ",
    Currency: "USD",
    Country: "USA",
    Sector: "Technology",
    Industry: "Consumer Electronics",
    Address: "One Apple Park Way, Cupertino, CA 95014",
    OfficialSite: "https://www.apple.com",
    FiscalYearEnd: "September",
    LatestQuarter: "2024-03-30",
    MarketCapitalization: "3000000000000",
    EBITDA: "120000000000",
    PERatio: "25.5",
    PEGRatio: "2.1",
    BookValue: "4.5",
    DividendPerShare: "0.24",
    DividendYield: "0.5",
    EPS: "6.0",
    RevenuePerShareTTM: "25.0",
    ProfitMargin: "25.0",
    OperatingMarginTTM: "30.0",
    ReturnOnAssetsTTM: "20.0",
    ReturnOnEquityTTM: "150.0",
    RevenueTTM: "400000000000",
    GrossProfitTTM: "160000000000",
    DilutedEPSTTM: "6.0",
    QuarterlyEarningsGrowthYOY: "15.0",
    QuarterlyRevenueGrowthYOY: "8.0",
    AnalystTargetPrice: "200.0",
    AnalystRatingStrongBuy: "15",
    AnalystRatingBuy: "20",
    AnalystRatingHold: "10",
    AnalystRatingSell: "2",
    AnalystRatingStrongSell: "1",
    TrailingPE: "25.5",
    ForwardPE: "22.0",
    PriceToSalesRatioTTM: "7.5",
    PriceToBookRatio: "35.0",
    EVToRevenue: "7.0",
    EVToEBITDA: "25.0",
    Beta: "1.2",
    "52WeekHigh": "200.0",
    "52WeekLow": "120.0",
    "50DayMovingAverage": "180.0",
    "200DayMovingAverage": "160.0",
    SharesOutstanding: "15000000000",
    SharesFloat: "14000000000",
    PercentInsiders: "0.1",
    PercentInstitutions: "60.0",
    DividendDate: "2024-05-16",
    ExDividendDate: "2024-05-09",
  },
} satisfies SymbolPageProps;

const setup = (props: Partial<SymbolPageProps> = {}) => {
  const propsWithDefault = { ...defaultProps, ...props };
  return render(<SymbolPage {...propsWithDefault} />);
};

describe("The SymbolPage component", () => {
  describe("displaying company information", () => {
    test("displaying the company name and symbol in the page heading", () => {
      setup();

      expect(screen.getByRole("heading")).toHaveTextContent("Apple Inc (AAPL)");
    });

    test("displaying the exchange information", () => {
      setup();

      expect(screen.getByText("NASDAQ")).toBeInTheDocument();
    });

    test("displaying the company description", () => {
      setup();

      expect(
        screen.getByText(
          /Apple Inc\. designs, manufactures, and markets smartphones/,
        ),
      ).toBeInTheDocument();
    });

    test("not displaying exchange when data.Exchange is empty string", () => {
      setup({
        data: { ...defaultProps.data, Exchange: "" },
      });

      expect(screen.queryByText("NASDAQ")).not.toBeInTheDocument();
    });

    test("not displaying description when data.Description is empty string", () => {
      setup({
        data: { ...defaultProps.data, Description: "" },
      });

      expect(screen.queryByText(/Apple Inc\. designs/)).not.toBeInTheDocument();
    });
  });

  describe("watchlist functionality", () => {
    test("displaying 'Add to watchlist' button when not in watchlist", () => {
      setup({ isInWatchlist: false });

      expect(
        screen.getByRole("button", { name: /Add to watchlist/ }),
      ).toBeInTheDocument();
    });

    test("displaying 'Remove from watchlist' button when in watchlist", () => {
      setup({ isInWatchlist: true });

      expect(
        screen.getByRole("button", { name: /Remove from watchlist/ }),
      ).toBeInTheDocument();
    });

    test("displaying 'Added to Watchlist' badge when in watchlist", () => {
      setup({ isInWatchlist: true });

      expect(screen.getByText("Added to Watchlist")).toBeInTheDocument();
    });

    test("not displaying watchlist badge when not in watchlist", () => {
      setup({ isInWatchlist: false });

      expect(screen.queryByText("Added to Watchlist")).not.toBeInTheDocument();
    });

    test("button is disabled during loading state", async () => {
      const user = userEvent.setup();
      setup();

      const button = screen.getByRole("button", { name: /Add to watchlist/ });
      expect(button).not.toBeDisabled();

      await user.click(button);

      await waitFor(() => {
        expect(button).toBeDisabled();
      });
    });

    test("loading icon is displayed during loading state", async () => {
      const user = userEvent.setup();
      setup();

      const button = screen.getByRole("button", { name: /Add to watchlist/ });
      expect(
        screen.queryByTestId("icon-loading-spinner"),
      ).not.toBeInTheDocument();

      await user.click(button);

      await waitFor(() => {
        expect(
          within(button).getByTestId("icon-loading-spinner"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("button styling based on watchlist state", () => {
    test("button has emerald styling when not in watchlist", () => {
      setup({ isInWatchlist: false });

      const button = screen.getByRole("button", { name: /Add to watchlist/ });
      // Check for emerald color classes in the button's class list
      expect(button.className).toContain("bg-(--btn-bg)");
    });

    test("button has dark/zinc styling when in watchlist", () => {
      setup({ isInWatchlist: true });

      const button = screen.getByRole("button", {
        name: /Remove from watchlist/,
      });
      // Check for dark/zinc color classes in the button's class list
      expect(button.className).toContain("bg-(--btn-bg)");
    });
  });

  describe("component structure", () => {
    test("rendering as a div element", () => {
      setup();

      const container = screen
        .getByRole("heading")
        .closest("div")?.parentElement;
      expect(container).toBeInTheDocument();
    });

    test("rendering page heading with correct title", () => {
      setup();

      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    test("rendering action button in page heading", () => {
      setup();

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("different company data scenarios", () => {
    test("rendering with minimal company data", () => {
      const minimalData = {
        Symbol: "TEST",
        AssetType: "Common Stock",
        Name: "Test Company",
        Description: "",
        CIK: "0000000000",
        Exchange: "",
        Currency: "USD",
        Country: "USA",
        Sector: "Technology",
        Industry: "Software",
        Address: "",
        OfficialSite: "",
        FiscalYearEnd: "",
        LatestQuarter: "",
        MarketCapitalization: "",
        EBITDA: "",
        PERatio: "",
        PEGRatio: "",
        BookValue: "",
        DividendPerShare: "",
        DividendYield: "",
        EPS: "",
        RevenuePerShareTTM: "",
        ProfitMargin: "",
        OperatingMarginTTM: "",
        ReturnOnAssetsTTM: "",
        ReturnOnEquityTTM: "",
        RevenueTTM: "",
        GrossProfitTTM: "",
        DilutedEPSTTM: "",
        QuarterlyEarningsGrowthYOY: "",
        QuarterlyRevenueGrowthYOY: "",
        AnalystTargetPrice: "",
        AnalystRatingStrongBuy: "",
        AnalystRatingBuy: "",
        AnalystRatingHold: "",
        AnalystRatingSell: "",
        AnalystRatingStrongSell: "",
        TrailingPE: "",
        ForwardPE: "",
        PriceToSalesRatioTTM: "",
        PriceToBookRatio: "",
        EVToRevenue: "",
        EVToEBITDA: "",
        Beta: "",
        "52WeekHigh": "",
        "52WeekLow": "",
        "50DayMovingAverage": "",
        "200DayMovingAverage": "",
        SharesOutstanding: "",
        SharesFloat: "",
        PercentInsiders: "",
        PercentInstitutions: "",
        DividendDate: "",
        ExDividendDate: "",
      };

      setup({ data: minimalData });

      expect(screen.getByRole("heading")).toHaveTextContent(
        "Test Company (TEST)",
      );
    });

    test("rendering with different company symbol", () => {
      setup({
        data: { ...defaultProps.data, Symbol: "GOOGL", Name: "Alphabet Inc" },
      });

      expect(screen.getByRole("heading")).toHaveTextContent(
        "Alphabet Inc (GOOGL)",
      );
    });
  });
});
