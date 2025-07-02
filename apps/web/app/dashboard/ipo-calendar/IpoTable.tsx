"use client";

import dayjs from "dayjs";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/catalyst-components";
import type { IPOEvent } from "database";

interface IpoTableProps {
  events: IPOEvent[];
}

export function IpoTable({ events }: IpoTableProps) {
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  const formatNumber = (num: number | null | undefined) => {
    if (num === null || num === undefined) return "N/A";
    return num.toLocaleString();
  };

  const formatPrice = (price: string | null | undefined) => {
    if (!price) return "N/A";
    return `$${price}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      case "postponed":
        return "orange";
      default:
        return "zinc";
    }
  };

  return (
    <div className="space-y-4">
      <Table striped>
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

      {events.length === 0 && (
        <div className="text-center py-8 text-zinc-500">
          No IPO events found.
        </div>
      )}
    </div>
  );
}
