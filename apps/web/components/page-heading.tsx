import { Heading } from "@/catalyst-components";
import clsx from "clsx";

export function PageHeading({
  className,
  title,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(
        className,
        "flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 px-4 sm:px-6 lg:px-8 pb-6 dark:border-white/10"
      )}
    >
      <Heading>{title}</Heading>
    </div>
  );
}
