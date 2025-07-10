import { PageHeading } from "@/components";
import { IpoTable } from "./IpoTable";
import { IpoTableFilters } from "./IpoTableFilters";
import { getIpoCalendarData } from "./getData";
import { getIpoEventFilters } from "./getIpoEventFilters";

export default async function IpoCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { from, to } = await searchParams;

  const { success, data: events } = await getIpoCalendarData({ from, to });

  const filters = getIpoEventFilters({ from, to });

  return (
    <div className="flex flex-col gap-8">
      <PageHeading title="IPO Calendar">
        <IpoTableFilters filters={filters} />
      </PageHeading>

      <IpoTable events={events} />
    </div>
  );
}
