import { PageHeading } from "@/components";
import { getIpoCalendarData } from "./get-data";
import { IpoTable } from "./ipo-table";
import { IpoTableFilters } from "./ipo-table-filters";

export default async function IpoCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { from, to } = await searchParams;

  const { success, data: events } = await getIpoCalendarData({ from, to });

  return (
    <div className="flex flex-col gap-8">
      <PageHeading title="IPO Calendar">
        <IpoTableFilters />
      </PageHeading>

      <IpoTable events={events} />
    </div>
  );
}
