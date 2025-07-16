"use client";
import {
  Field,
  Label,
  Listbox,
  ListboxLabel,
  ListboxOption,
} from "@/catalyst-components";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { IpoTableFilterOptions } from "./interface";

interface IpoTableFiltersProps {
  filters: IpoTableFilterOptions;
}

export function IpoTableFilters({ filters }: IpoTableFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
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

  // const filters = useMemo(
  //   () => [
  //     {
  //       name: "date",
  //       defaultValue: "Maximum",
  //       options: [
  //         { label: "Maximum", onChange: () => router.push(pathname) },
  //         {
  //           label: "Last 24 Hours",
  //           onChange: () =>
  //             router.push(
  //               `${pathname}?${createQueryString("from", yesterday)}`
  //             ),
  //         },
  //         {
  //           label: "Last Week",
  //           onChange: () =>
  //             router.push(`${pathname}?${createQueryString("from", lastWeek)}`),
  //         },
  //       ],
  //     },
  //     {
  //       name: "exchange",
  //       defaultValue: "NASDAQ Global Select",
  //       options: [
  //         { label: "NYSE", onChange: () => console.log("NYSE") },
  //         {
  //           label: "NASDAQ Capital",
  //           onChange: () => console.log("onChange: NASDAQ Capital"),
  //         },
  //         {
  //           label: "NASDAQ Global",
  //           onChange: () => console.log("onChange: NASDAQ Global"),
  //         },
  //         {
  //           label: "NASDAQ Global Select",
  //           onChange: () => console.log("onChange: NASDAQ Global Select"),
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );

  const options = useMemo(() => filters.flatMap(({ options }) => options), []);

  const handleListBoxChange = (value: string) => {
    const handler = options.find(({ label }) => label === value)?.onChange;
    handler && handler();
  };

  return (
    <div className="flex items-center gap-x-4">
      {filters.map(({ name, onChange, defaultValue, value, options }) => (
        <Field className="flex-1" key={name}>
          <Label className="capitalize">{name}</Label>
          <Listbox
            name={name}
            defaultValue={defaultValue}
            value={defaultValue}
            onChange={onChange}
          >
            {options.map(({ label }) => (
              <ListboxOption key={label} value={label}>
                <ListboxLabel className="capitalize">{label}</ListboxLabel>
              </ListboxOption>
            ))}
          </Listbox>
        </Field>
      ))}
    </div>
  );
}
