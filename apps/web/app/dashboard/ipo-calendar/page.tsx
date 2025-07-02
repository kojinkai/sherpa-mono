import { Badge } from "@/catalyst-components";
import clsx from "clsx";
import { PageHeading } from "@/components";
import { prisma } from "database";
import { IpoTable } from "./IpoTable";

export default async function IpoCalendarPage() {
  // Fetch all IPO events with all fields
  const events = await prisma.iPOEvent.findMany();

  return (
    <div className="flex flex-col gap-8">
      <PageHeading title="IPO Calendar" />

      <IpoTable events={events} />
    </div>
  );
}
