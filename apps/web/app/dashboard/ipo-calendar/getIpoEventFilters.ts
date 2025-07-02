import dayjs from "dayjs";
import { DateRangeQuery } from "./interface";

export function getIpoEventFilters({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) {
  const query: DateRangeQuery = {};
  const parsedFrom = dayjs(from);
  const parsedTo = dayjs(to);
  const parsedFromIsValid = parsedFrom.isValid();
  const parsedToIsValid = parsedTo.isValid();
  const yesterdayFrom = dayjs().subtract(1, "day").toISOString().split("T")[0];
  const lastWeekFrom = dayjs().subtract(1, "week").toISOString().split("T")[0];

  const filters = [
    {
      name: "All",
      href: "/dashboard/ipo-calendar",
      active: !to && !from,
    },
    {
      name: "Last 24 Hours",
      href: `?from=${yesterdayFrom}`,
      active: from == yesterdayFrom,
    },
    {
      name: "Last Week",
      href: `?from=${lastWeekFrom}`,
      active: from == lastWeekFrom,
    },
  ];

  // Add date range filter if either from or to date is provided
  if (from || to) {
    query.date = {};

    if (from && parsedFromIsValid) {
      query.date.gte = parsedFrom.toISOString();
    }

    if (to && parsedToIsValid) {
      query.date.lte = parsedTo.toISOString();
    }
  }

  return { query, filters };
}
