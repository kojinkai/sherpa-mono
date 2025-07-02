"use client";
import { Heading } from "@/catalyst-components";
import clsx from "clsx";

export function PageHeading({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex-wrap justify-between gap-4 border-b border-zinc-950/10 px-4 sm:px-6 lg:px-10 dark:border-white/10",
        "-mx-6 lg:-mx-10",
        { "flex items-center": Boolean(children) }
      )}
    >
      <Heading>{title}</Heading>
      {children && <div>{children}</div>}
    </div>
  );
}
