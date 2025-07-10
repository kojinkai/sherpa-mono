import dayjs from "dayjs";

export async function getIpoCalendarData({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) {
  try {
    const apiKey = process.env.FINNHUB_API_KEY;

    if (!apiKey) {
      throw new Error("FINNHUB_API_KEY environment variable is not set");
    }

    const parsedFrom = dayjs(from);
    const parsedTo = dayjs(to);
    const fromIsValid = parsedFrom.isValid();
    const toIsValid = parsedTo.isValid();

    // Default to current month if no dates provided
    const fromDate =
      from && fromIsValid
        ? parsedFrom.toISOString().split("T")[0]
        : dayjs("2025-01-01").toISOString().split("T")[0];

    const toDate =
      to && toIsValid
        ? parsedTo.toISOString().split("T")[0]
        : dayjs().add(1, "month").toISOString().split("T")[0];

    const url = `https://finnhub.io/api/v1/calendar/ipo?from=${fromDate}&to=${toDate}`;

    const response = await fetch(url, {
      headers: {
        "X-Finnhub-Token": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { ipoCalendar } = await response.json();

    return {
      success: true,
      data: ipoCalendar,
    };
  } catch (error) {
    console.error("Error fetching IPO calendar data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
