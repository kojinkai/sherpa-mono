"use client";
import { Navbar, NavbarItem, NavbarSection } from "@/catalyst-components";
import dayjs from "dayjs";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function IpoTableFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const yesterday = useMemo(() => {
    return dayjs().subtract(1, "day").toISOString().split("T")[0];
  }, []);

  const lastWeek = useMemo(() => {
    return dayjs().subtract(1, "week").toISOString().split("T")[0];
  }, []);

  return (
    <Navbar>
      <NavbarSection className="max-lg:hidden">
        <NavbarItem href={pathname} current={!from}>
          All
        </NavbarItem>
        <NavbarItem
          href={`${pathname}?${createQueryString("from", yesterday)}`}
          current={from === yesterday}
        >
          Last 24 Hours
        </NavbarItem>
        <NavbarItem
          href={`${pathname}?${createQueryString("from", lastWeek)}`}
          current={from === lastWeek}
        >
          Last Week
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
