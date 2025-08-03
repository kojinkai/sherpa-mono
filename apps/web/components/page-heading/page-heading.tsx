"use client";
import { Heading } from "@/catalyst-components";
import clsx from "clsx";
import { PageHeadingProps } from "./interface";

export function PageHeading({
  action,
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & PageHeadingProps) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "border-b border-zinc-950/10 px-4 pb-4 sm:px-6 lg:px-10 dark:border-white/10",
        "-mx-6 lg:-mx-10",
        { "flex gap-4 justify-between items-center": Boolean(action) },
      )}
    >
      <div className={clsx({ "flex flex-col gap-4 ": Boolean(children) })}>
        <Heading>{title}</Heading>
        {children && <div>{children}</div>}
      </div>
      {action && action}
    </div>
  );
}
