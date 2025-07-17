import { IPOEvent } from "database";
import dayjs from "dayjs";
import { identity } from "lodash/fp";
import { ExchangeFilters, StatusFilters, TimeFilters } from "./interface";

const yesterday = dayjs().subtract(1, "day");
const lastWeek = dayjs().subtract(1, "week");

export const filterFunctionMap = {
  [TimeFilters.MAXIMUM]: identity,
  [TimeFilters.LAST_24]: (event: IPOEvent) =>
    dayjs(event.date).isAfter(yesterday),
  [TimeFilters.LAST_WEEK]: (event: IPOEvent) =>
    dayjs(event.date).isAfter(lastWeek),
  [ExchangeFilters.ALL]: identity,
  [ExchangeFilters.NYSE]: (event: IPOEvent) =>
    event.exchange === ExchangeFilters.NYSE,
  [ExchangeFilters.NASDAQ_GLOBAL]: (event: IPOEvent) =>
    event.exchange === ExchangeFilters.NASDAQ_GLOBAL,
  [ExchangeFilters.NASDAQ_CAPITAL]: (event: IPOEvent) =>
    event.exchange === ExchangeFilters.NASDAQ_CAPITAL,
  [ExchangeFilters.NASDAQ_GLOBAL_SELECT]: (event: IPOEvent) =>
    event.exchange === ExchangeFilters.NASDAQ_GLOBAL_SELECT,
  [StatusFilters.ALL]: identity,
  [StatusFilters.EXPECTED]: (event: IPOEvent) =>
    event.status === StatusFilters.EXPECTED,
  [StatusFilters.FILED]: (event: IPOEvent) =>
    event.status === StatusFilters.FILED,
  [StatusFilters.PRICED]: (event: IPOEvent) =>
    event.status === StatusFilters.PRICED,
  [StatusFilters.WITHDRAWN]: (event: IPOEvent) =>
    event.status === StatusFilters.WITHDRAWN,
};
