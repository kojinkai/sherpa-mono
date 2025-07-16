"use client";

import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/catalyst-components";
import { formatDate, formatNumber } from "@/utils/formatters";
import { CalendarIcon } from "@heroicons/react/24/outline";
import type { IPOEvent } from "database";

interface IpoTableProps {
  events: IPOEvent[];
}

export function IpoTable({ events }: IpoTableProps) {
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
              <TableHeader>Total Value</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium w-1/4">
                  {event.name}
                </TableCell>
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
