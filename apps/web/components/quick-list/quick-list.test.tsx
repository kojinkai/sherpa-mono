import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickListProps } from "./interface";
import { QuickList } from "./quick-list";

const defaultProps = {
  lastupdated: "2025-7-15",
  stocksList: [
    {
      ticker: "CRWV",
      price: "0.255",
      change_amount: 0.1798,
      change_percentage: 239.0957,
      volume: "1891958",
      name: "CoreWeave Inc",
    },
    {
      ticker: "NVDA",
      price: "2.92",
      change_amount: 1.79,
      change_percentage: 158.4071,
      volume: "354750074",
      name: "NVIDIA Corp",
    },
    {
      ticker: "GOOGL",
      price: "0.33",
      change_amount: 0.1899,
      change_percentage: 135.546,
      volume: "28533",
      name: "Alphabet Inc",
    },
  ],
  title: "Last Updated",
} satisfies QuickListProps;

const setup = (props = {}) => {
  const propsWithDefault = { ...defaultProps, ...props };
  return render(<QuickList {...propsWithDefault} />);
};

describe("The QuickList component", async () => {
  describe("displaying the component properties", () => {
    test("displaying the component header", async () => {
      setup();

      expect(screen.getByRole("heading")).toHaveTextContent(defaultProps.title);
    });
  });

  describe("displaying each stock in the list", () => {
    test("displaying each stock in its own row", async () => {
      setup();

      expect(screen.getAllByRole("listitem")).toHaveLength(
        defaultProps.stocksList.length,
      );
    });

    test("displaying the stock ticker", async () => {
      setup();

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText(
          defaultProps.stocksList[0].ticker,
        ),
      ).toBeInTheDocument();
    });

    test("displaying the stock name", async () => {
      setup();

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText(
          defaultProps.stocksList[0].name,
        ),
      ).toBeInTheDocument();
    });

    test("displaying the traded volume", async () => {
      setup();

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText(
          `Traded ${defaultProps.stocksList[0].volume} times`,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("adjusting the colors when the stock is up", () => {
    test("displaying the stock price", async () => {
      setup({
        stocksList: [
          {
            ticker: "CRWV",
            price: "0.255",
            change_amount: 0.1798,
            change_percentage: 239.0957,
            volume: "1891958",
            name: "CoreWeave Inc",
          },
        ],
      });

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText("$0.255"),
      ).toHaveClass("bg-lime-400/20 text-lime-700");
    });

    test("displaying the stock change amount", async () => {
      setup({
        stocksList: [
          {
            ticker: "CRWV",
            price: "0.255",
            change_amount: 0.1798,
            change_percentage: 239.0957,
            volume: "1891958",
            name: "CoreWeave Inc",
          },
        ],
      });

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText("$0.1798"),
      ).toHaveClass("text-lime-700 dark:text-lime-400");
    });

    test("displaying the stock change percentage", async () => {
      setup({
        stocksList: [
          {
            ticker: "CRWV",
            price: "0.255",
            change_amount: 0.1798,
            change_percentage: 239.0957,
            volume: "1891958",
            name: "CoreWeave Inc",
          },
        ],
      });

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText("239.0957%"),
      ).toHaveClass("text-lime-700 dark:text-lime-400");
    });
  });

  describe("adjusting the colors when the stock is down", () => {
    test("displaying the stock price", async () => {
      setup({
        stocksList: [
          {
            ticker: "CRWV",
            price: "-0.255",
            change_amount: 0.1798,
            change_percentage: -239.0957,
            volume: "1891958",
            name: "CoreWeave Inc",
          },
        ],
      });

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText(`$-0.255`),
      ).toHaveClass("bg-red-500/15 text-red-700");
    });

    test("displaying the stock change amount", async () => {
      setup({
        stocksList: [
          {
            ticker: "CRWV",
            price: "0.255",
            change_amount: 0.1798,
            change_percentage: -239.0957,
            volume: "1891958",
            name: "CoreWeave Inc",
          },
        ],
      });

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText("$0.1798"),
      ).toHaveClass("text-red-700 dark:text-red-400");
    });

    test("displaying the stock change percentage", async () => {
      setup({
        stocksList: [
          {
            ticker: "CRWV",
            price: "0.255",
            change_amount: 0.1798,
            change_percentage: -239.0957,
            volume: "1891958",
            name: "CoreWeave Inc",
          },
        ],
      });

      expect(
        within(screen.getAllByRole("listitem")[0]).getByText("-239.0957%"),
      ).toHaveClass("text-red-700 dark:text-red-400");
    });
  });

  describe("pagination functionality", () => {
    test("clicking pagination buttons changes the page to show the next 5 stocks", async () => {
      const user = userEvent.setup();
      setup({
        stocksList: [
          {
            ticker: "CRWV",
            price: "0.255",
            change_amount: 0.1798,
            change_percentage: 239.0957,
            volume: "1891958",
            name: "CoreWeave Inc",
          },
          {
            ticker: "NVDA",
            price: "2.92",
            change_amount: 1.79,
            change_percentage: 158.4071,
            volume: "354750074",
            name: "NVIDIA Corp",
          },
          {
            ticker: "GOOGL",
            price: "0.33",
            change_amount: 0.1899,
            change_percentage: 135.546,
            volume: "28533",
            name: "Alphabet Inc",
          },
          {
            ticker: "AAPL",
            price: "150.25",
            change_amount: 2.50,
            change_percentage: 1.69,
            volume: "456789",
            name: "Apple Inc",
          },
          {
            ticker: "MSFT",
            price: "320.15",
            change_amount: -1.25,
            change_percentage: -0.39,
            volume: "234567",
            name: "Microsoft Corp",
          },
          {
            ticker: "TSLA",
            price: "180.75",
            change_amount: 5.25,
            change_percentage: 2.99,
            volume: "789012",
            name: "Tesla Inc",
          },
        ],
      });

      // Initially, the first 5 stocks should be visible
      expect(screen.getByText("CRWV")).toBeInTheDocument();
      expect(screen.getByText("NVDA")).toBeInTheDocument();
      expect(screen.getByText("GOOGL")).toBeInTheDocument();
      expect(screen.getByText("AAPL")).toBeInTheDocument();
      expect(screen.getByText("MSFT")).toBeInTheDocument();
      expect(screen.queryByText("TSLA")).not.toBeInTheDocument();

      // Click the second page button
      await user.click(screen.getByRole("button", { name: "Page 2" }));

      // Now the 6th stock should be visible and the first 5 should not
      expect(screen.queryByText("CRWV")).not.toBeInTheDocument();
      expect(screen.queryByText("NVDA")).not.toBeInTheDocument();
      expect(screen.queryByText("GOOGL")).not.toBeInTheDocument();
      expect(screen.queryByText("AAPL")).not.toBeInTheDocument();
      expect(screen.queryByText("MSFT")).not.toBeInTheDocument();
      expect(screen.getByText("TSLA")).toBeInTheDocument();
    });
  });
});
