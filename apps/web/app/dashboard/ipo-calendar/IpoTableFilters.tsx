"use client";
import { Navbar, NavbarItem, NavbarSection } from "@/catalyst-components";
import { DateRangeFilter } from "./interface";

interface IpoTableFiltersProps {
  filters: DateRangeFilter[];
}

export function IpoTableFilters({ filters }: IpoTableFiltersProps) {
  return (
    <Navbar>
      <NavbarSection className="max-lg:hidden">
        {filters.map(({ name, href, active }) => (
          <NavbarItem key={name} href={href} current={active}>
            {name}
          </NavbarItem>
        ))}
      </NavbarSection>
    </Navbar>
  );
}
