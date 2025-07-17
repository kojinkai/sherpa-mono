"use client";

import { PageHeading } from "@/components";
import type { IPOEvent } from "database";
import { filter, flow } from "lodash/fp";
import { useMemo, useState } from "react";
import { filterFunctionMap } from "./filters";
import {
  ExchangeFilters,
  IpoTableFilterOptions,
  StatusFilters,
  TimeFilters,
} from "./interface";
import { IpoTable } from "./ipo-table";
import { IpoTableFilters } from "./ipo-table-filters";

interface IpoCalendarProps {
  events: IPOEvent[];
}

export function IpoCalendar({ events }: IpoCalendarProps) {
  const [timeFilter, setTimeFilter] = useState(TimeFilters.MAXIMUM);
  const [exchangeFilter, setExchangeFilter] = useState(
    ExchangeFilters.NASDAQ_GLOBAL_SELECT
  );
  const [statusFilter, setStatusFilter] = useState(StatusFilters.ALL);

  console.log("statusFIlter: ", statusFilter);

  const filters: IpoTableFilterOptions = useMemo(
    () => [
      {
        name: "date",
        defaultValue: timeFilter,
        value: timeFilter,
        onChange: (value: TimeFilters | ExchangeFilters | StatusFilters) =>
          setTimeFilter(value as TimeFilters),
        options: [
          { label: TimeFilters.MAXIMUM },
          {
            label: TimeFilters.LAST_24,
          },
          {
            label: TimeFilters.LAST_WEEK,
          },
        ],
      },
      {
        name: "exchange",
        defaultValue: exchangeFilter,
        value: exchangeFilter,
        onChange: (value: TimeFilters | ExchangeFilters | StatusFilters) =>
          setExchangeFilter(value as ExchangeFilters),
        options: [
          { label: ExchangeFilters.ALL },
          { label: ExchangeFilters.NYSE },
          {
            label: ExchangeFilters.NASDAQ_CAPITAL,
          },
          {
            label: ExchangeFilters.NASDAQ_GLOBAL,
          },
          {
            label: ExchangeFilters.NASDAQ_GLOBAL_SELECT,
          },
        ],
      },
      {
        name: "status",
        defaultValue: statusFilter,
        value: statusFilter,
        onChange: (value: TimeFilters | ExchangeFilters | StatusFilters) =>
          setStatusFilter(value as StatusFilters),
        options: [
          { label: StatusFilters.ALL },
          { label: StatusFilters.EXPECTED },
          {
            label: StatusFilters.FILED,
          },
          {
            label: StatusFilters.PRICED,
          },
          {
            label: StatusFilters.WITHDRAWN,
          },
        ],
      },
    ],
    [timeFilter, exchangeFilter, statusFilter]
  );

  const filteredEvents = useMemo(
    () =>
      flow(
        filter(filterFunctionMap[timeFilter]),
        filter(filterFunctionMap[exchangeFilter]),
        filter(filterFunctionMap[statusFilter])
      )(events),
    [timeFilter, exchangeFilter, statusFilter]
  );

  return (
    <div className="flex flex-col gap-8">
      <PageHeading title="IPO Calendar">
        <IpoTableFilters filters={filters} />
      </PageHeading>

      <IpoTable events={filteredEvents} />
    </div>
  );
}
