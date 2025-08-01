"use client";
import {
  Field,
  Label,
  Listbox,
  ListboxLabel,
  ListboxOption,
} from "@/catalyst-components";
import { IpoTableFilterOptions } from "./interface";

interface IpoTableFiltersProps {
  filters: IpoTableFilterOptions;
}

export function IpoTableFilters({ filters }: IpoTableFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
      {filters.map(({ name, onChange, defaultValue, value, options }) => (
        <Field className="grow flex-1" key={name}>
          <Label className="capitalize">{name}</Label>
          <Listbox
            name={name}
            defaultValue={defaultValue}
            value={value}
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
