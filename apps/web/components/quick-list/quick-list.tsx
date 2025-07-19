"use client";
import { roboto_mono } from "@/app/fonts";
import { Badge, Button, Heading } from "@/catalyst-components";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { chunk } from "lodash/fp";
import { useState } from "react";
import { QuickListProps } from "./interface";
dayjs.extend(relativeTime);

export function QuickList({
  className,
  lastupdated,
  stocksList,
  title,
  ...props
}: QuickListProps & React.ComponentPropsWithoutRef<"div">) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = chunk(5)(stocksList);

  return (
    <div
      {...props}
      className={clsx(
        className,
        "border",
        "border-zinc-900/10",
        "dark:border-white/10",
        "divide-y",
        "divide-zinc-900/10",
        "dark:divide-white/10",
        "flex",
        "flex-col",
        "px-5",
        "pt-5",
        "rounded-lg",
      )}
    >
      <div className="flex items-center justify-between pb-5 px-5 -mx-5">
        <Heading className="capitalise">{title}</Heading>
        <span
          className={clsx(
            roboto_mono.className,
            "text-lime-600 dark:text-lime-400",
            "text-sm",
            "text-right"
          )}
        >
          <time dateTime={lastupdated}>
            Updated {dayjs().to(dayjs(lastupdated))}
          </time>
        </span>
      </div>

      <ul className="divide-y divide-zinc-900/10 dark:divide-white/10">
        {pages[currentPage].map((stock) => {
          const stockIsUp = stock.change_percentage > 0;
          return (
            <li
              className="flex items-center justify-between py-3 -mx-5 px-5"
              key={stock.ticker}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className={clsx(
                      "bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-300 dark:group-data-hover:bg-white/10 rounded-md px-1.5 py-0.5 text-sm",
                      roboto_mono.className,
                    )}
                  >
                    {stock.ticker}
                  </div>
                  <Badge color={stockIsUp ? "lime" : "red"}>
                    ${stock.price}
                  </Badge>
                </div>
                <div className="capitalize mt-1 flex items-center gap-x-2 text-sm/5 text-gray-500 dark:text-gray-400">
                  {stock.name}
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center justify-end gap-x-2">
                  {stockIsUp ? (
                    <ArrowUpIcon className="text-lime-700 dark:text-lime-400 w-3 min-w-[12px]" />
                  ) : (
                    <ArrowDownIcon className="text-red-700 dark:text-red-400 w-3 min-w-[12px]" />
                  )}
                  <div
                    className={clsx("text-sm/5 font-medium sm:text-xs/5", {
                      "text-lime-700 dark:text-lime-400": stockIsUp,
                      "text-red-700 dark:text-red-400": !stockIsUp,
                    })}
                  >
                    ${stock.change_amount}
                  </div>
                  <div
                    className={clsx("text-sm/5 font-medium sm:text-xs/5", {
                      "text-lime-700 dark:text-lime-400": stockIsUp,
                      "text-red-700 dark:text-red-400": !stockIsUp,
                    })}
                  >
                    {stock.change_percentage}%
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400 justify-end">
                  Traded {stock.volume} times
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="my-2 flex justify-around">
      <span className="items-baseline gap-x-2 sm:flex my-2">
        {pages.map((page, index) => (
          <Button
            plain
            aria-label={`Page ${index + 1}`}
            aria-current={currentPage === index ? "page" : undefined}
            className={clsx(
              className,
              "w-9 min-w-9 before:absolute before:-inset-px before:rounded-lg",
              currentPage === index &&
                "before:bg-zinc-950/5 dark:before:bg-white/10",
            )}
            key={index}
            onClick={() => setCurrentPage(index)}
          >
            <span className="-mx-0.5">{index + 1}</span>
          </Button>
        ))}
      </span>
      </div>
    </div>
  );
}
