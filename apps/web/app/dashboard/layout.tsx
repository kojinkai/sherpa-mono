import { prisma } from "database";
import React from "react";

import { StackedLayout } from "@/catalyst-components";

import { Metadata } from "next";
import { DashboardNavbar } from "./dashboard-navbar";
// import { DashboardSidebar } from "./dashboard-sidebar";

import { DashboardSidebar } from "./dashboard-sidebar";
import { NavItem } from "./interface";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "The Sherpa Dashboard",
};

const navItems: NavItem[] = [
  { label: "Home", url: "/dashboard" },
  { label: "IPO Calendar", url: "/dashboard/ipo-calendar" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return (
    <StackedLayout
      navbar={<DashboardNavbar user={user} navItems={navItems} />}
      sidebar={<DashboardSidebar navItems={navItems} />}
    >
      {children}
    </StackedLayout>
  );
}
