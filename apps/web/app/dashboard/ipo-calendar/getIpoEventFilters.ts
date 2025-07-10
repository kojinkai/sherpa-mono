import dayjs from "dayjs";

export function getIpoEventFilters({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) {
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

  return filters;
}
