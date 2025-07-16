"use client";

import { PageHeading } from "@/components";
import type { IPOEvent } from "database";
import dayjs from "dayjs";
import { filter, flow, identity } from "lodash/fp";
import { useMemo, useState } from "react";
import {
  ExchangeFilters,
  IpoTableFilterOptions,
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

  const yesterday = useMemo(() => {
    return dayjs().subtract(1, "day");
  }, []);

  const lastWeek = useMemo(() => {
    return dayjs().subtract(1, "week");
  }, []);

  const filterFunctionMap = {
    [TimeFilters.MAXIMUM]: identity,
    [TimeFilters.LAST_24]: (event: IPOEvent) =>
      dayjs(event.date).isAfter(yesterday),
    [TimeFilters.LAST_WEEK]: (event: IPOEvent) =>
      dayjs(event.date).isAfter(lastWeek),
    [ExchangeFilters.NYSE]: (event: IPOEvent) =>
      event.exchange === ExchangeFilters.NYSE,
    [ExchangeFilters.NASDAQ_GLOBAL]: (event: IPOEvent) =>
      event.exchange === ExchangeFilters.NASDAQ_GLOBAL,
    [ExchangeFilters.NASDAQ_CAPITAL]: (event: IPOEvent) =>
      event.exchange === ExchangeFilters.NASDAQ_CAPITAL,
    [ExchangeFilters.NASDAQ_GLOBAL_SELECT]: (event: IPOEvent) =>
      event.exchange === ExchangeFilters.NASDAQ_GLOBAL_SELECT,
  };

  const filters: IpoTableFilterOptions = useMemo(
    () => [
      {
        name: "date",
        defaultValue: timeFilter,
        value: timeFilter,
        onChange: (value: TimeFilters | ExchangeFilters) =>
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
        onChange: (value: TimeFilters | ExchangeFilters) =>
          setExchangeFilter(value as ExchangeFilters),
        options: [
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
    ],
    [timeFilter, exchangeFilter]
  );

  const filteredEvents = useMemo(
    () =>
      flow(
        filter(filterFunctionMap[timeFilter]),
        filter(filterFunctionMap[exchangeFilter])
      )(events),
    [timeFilter, exchangeFilter]
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
