"use client";
import { usePathname } from "next/navigation";

import {
  Avatar,
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/catalyst-components";
import {
  ArrowRightStartOnRectangleIcon,
  CalendarDaysIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  HomeIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { User } from "database";

interface DashboardSidebarProps {
  user: User | null;
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="h-screen">
      <Sidebar className="flex flex-col justify-between">
        <div>
          <SidebarHeader>
            <SidebarSection className="max-lg:hidden flex items-center gap-1">
              <Avatar
                className="size-8"
                src="https://catalyst.tailwindui.com/tailwind-logo.svg"
              />
              <SidebarLabel>Tailwind Labs</SidebarLabel>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarItem href="/search">
                <MagnifyingGlassIcon />
                <SidebarLabel>Search</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                href="/dashboard"
                current={pathname === "/dashboard"}
              >
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="dashboard/ipo-calendar"
                current={pathname === "/dashboard/ipo-calendar"}
              >
                <CalendarDaysIcon />
                <SidebarLabel>IPO Calendar</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem href="/support">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/changelog">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </div>
        <SidebarFooter className="max-lg:hidden">
          <Dropdown>
            <DropdownButton as={SidebarItem}>
              <span className="flex min-w-0 items-center gap-3">
                <Avatar
                  src="https://catalyst.tailwindui.com/profile-photo.jpg"
                  className="size-10"
                  square
                  alt=""
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    {user?.name && user.name}
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {user?.email && user.email}
                  </span>
                </span>
              </span>
              <ChevronUpIcon />
            </DropdownButton>
            <DropdownMenu
              className="min-w-64 bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 border border-zinc-950/10 pb-6 dark:border-white/10"
              anchor="top start"
            >
              <DropdownItem href="/my-profile">
                <UserIcon />
                <DropdownLabel>My profile</DropdownLabel>
              </DropdownItem>
              <DropdownItem href="/settings">
                <Cog8ToothIcon />
                <DropdownLabel>Settings</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/privacy-policy">
                <ShieldCheckIcon />
                <DropdownLabel>Privacy policy</DropdownLabel>
              </DropdownItem>
              <DropdownItem href="/share-feedback">
                <LightBulbIcon />
                <DropdownLabel>Share feedback</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/logout">
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Sign out</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
}
