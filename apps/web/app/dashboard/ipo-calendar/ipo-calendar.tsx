"use client";

import { PageHeading } from "@/components";
import { StandardAction } from "@/utils/reducer";
import type { IPOEvent } from "database";
import { filter, flow } from "lodash/fp";
import { useMemo, useReducer } from "react";
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

type FilterState = {
  time: TimeFilters;
  exchange: ExchangeFilters;
  status: StatusFilters;
};

enum ActionTypes {
  TIME = "TIME",
  EXCHANGE = "EXCHANGE",
  STATUS = "STATUS",
}

function reducer(
  state: FilterState,
  action: StandardAction<
    ActionTypes,
    TimeFilters | ExchangeFilters | StatusFilters
  >
) {
  switch (action.type) {
    case ActionTypes.TIME: {
      return {
        ...state,
        time: action.payload as TimeFilters,
      };
    }
    case ActionTypes.EXCHANGE: {
      return {
        ...state,
        exchange: action.payload as ExchangeFilters,
      };
    }
    case ActionTypes.STATUS: {
      return {
        ...state,
        status: action.payload as StatusFilters,
      };
    }
  }
}

const initialState: FilterState = {
  time: TimeFilters.MAXIMUM,
  exchange: ExchangeFilters.NASDAQ_GLOBAL_SELECT,
  status: StatusFilters.ALL,
};

export function IpoCalendar({ events }: IpoCalendarProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filters: IpoTableFilterOptions = useMemo(
    () => [
      {
        name: "date",
        defaultValue: state.time,
        value: state.time,
        onChange: (value: TimeFilters | ExchangeFilters | StatusFilters) =>
          dispatch({ type: ActionTypes.TIME, payload: value as TimeFilters }),
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
        defaultValue: state.exchange,
        value: state.exchange,
        onChange: (value: TimeFilters | ExchangeFilters | StatusFilters) =>
          dispatch({
            type: ActionTypes.EXCHANGE,
            payload: value as ExchangeFilters,
          }),
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
        defaultValue: state.status,
        value: state.status,
        onChange: (value: TimeFilters | ExchangeFilters | StatusFilters) =>
          dispatch({
            type: ActionTypes.STATUS,
            payload: value as StatusFilters,
          }),
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
    [state.time, state.exchange, state.status]
  );

  const filteredEvents = useMemo(
    () =>
      flow(
        filter(filterFunctionMap[state.time]),
        filter(filterFunctionMap[state.exchange]),
        filter(filterFunctionMap[state.status])
      )(events),
    [state.time, state.exchange, state.status, events]
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
