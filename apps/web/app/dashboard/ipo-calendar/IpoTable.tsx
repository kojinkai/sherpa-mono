"use client";

import {
  Badge,
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/catalyst-components";
import { formatDate, formatNumber, formatPrice } from "@/utils/formatters";
import { useGetLinkParams } from "@/utils/url";
import { CalendarIcon } from "@heroicons/react/24/outline";
import type { IPOEvent } from "database";
import { take, takeRight } from "lodash/fp";

interface IpoTableProps {
  events: IPOEvent[];
  page: number;
  totalPages: number;
}

export function IpoTable({ totalPages, events, page }: IpoTableProps) {
  const getLinkParams = useGetLinkParams();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const { firstPages, lastPages, divide } = (() => {
    const divide = totalPages > 6;
    const first = divide ? 4 : 6;
    const last = divide ? Math.min(2, totalPages - 4) : 0;
    return {
      firstPages: take(first)(pages),
      lastPages: takeRight(last)(pages),
      divide,
    };
  })();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "filed":
        return "green";
      case "expected":
        return "orange";
      case "priced":
        return "blue";
      case "withdrawn":
        return "red";
      default:
        return "zinc";
    }
  };

  return (
    <div className="space-y-4">
      {events.length > 0 && (
        <Table
          striped
          bleed
          className="[--gutter:--spacing(8)] sm:[--gutter:--spacing(10)]"
        >
          <TableHead>
            <TableRow>
              <TableHeader>Company</TableHeader>
              <TableHeader>Symbol</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Exchange</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Total Value</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>
                  {event.symbol ? (
                    <span className="font-mono text-sm">{event.symbol}</span>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{formatDate(event.date)}</TableCell>
                <TableCell>
                  {event.exchange ? (
                    <Badge color="lime">{event.exchange}</Badge>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>{formatPrice(event.price)}</TableCell>
                <TableCell>
                  {event.totalSharesValue
                    ? `$${formatNumber(event.totalSharesValue)}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge color={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationPrevious
            href={page > 1 ? getLinkParams({ page: page - 1 }) : null}
          />
          <PaginationList>
            {firstPages.map((currentPage) => (
              <PaginationPage
                current={currentPage === page}
                href={getLinkParams({ page: currentPage })}
                key={currentPage}
              >
                {currentPage}
              </PaginationPage>
            ))}

            {divide && (
              <>
                <PaginationGap />
                {lastPages.map((currentPage) => (
                  <PaginationPage
                    current={currentPage === page}
                    href={getLinkParams({ page: currentPage })}
                    key={currentPage}
                  >
                    {currentPage}
                  </PaginationPage>
                ))}
              </>
            )}
          </PaginationList>
          <PaginationNext
            href={page < totalPages ? getLinkParams({ page: page + 1 }) : null}
          />
        </Pagination>
      )}

      {events.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-8 text-zinc-500 dark:text-white">
          <CalendarIcon className="w-8" />
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-400">
              No IPO Events Found
            </h3>
            <p className="mt-1 text-sm">Try a different filter.</p>
          </div>
        </div>
      )}
    </div>
  );
}
