import { PageHeading } from "@/components";
import { prisma } from "database";
import { redirect } from "next/navigation";
import { getIpoEventFilters } from "./getIpoEventFilters";
import { IpoTable } from "./IpoTable";
import { IpoTableFilters } from "./IpoTableFilters";

const normalize = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export default async function IpoCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", from, to } = await searchParams;

  const fromStr = normalize(from);
  const toStr = normalize(to);

  const { query, filters } = getIpoEventFilters({ from: fromStr, to: toStr });

  let pageNumber = parseInt(page as string);

  if (isNaN(pageNumber)) {
    redirect("/dashboard/ipo-calendar");
  }
  const count = await prisma.iPOEvent.count({ where: query });

  const EVENTS_PER_PAGE = 25;
  const offset = Math.max(0, pageNumber - 1);
  const totalPages = Math.ceil(count / EVENTS_PER_PAGE);

  // Fetch paginated IPO events with all fields
  const events = await prisma.iPOEvent.findMany({
    take: EVENTS_PER_PAGE,
    skip: offset * EVENTS_PER_PAGE,
    orderBy: {
      id: "desc",
    },
    where: query,
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeading title="IPO Calendar">
        <IpoTableFilters filters={filters} />
      </PageHeading>

      <IpoTable events={events} page={pageNumber} totalPages={totalPages} />
    </div>
  );
}
