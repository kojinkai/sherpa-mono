import { getIpoCalendarData } from "./get-data";
import { IpoCalendar } from "./ipo-calendar";

export default async function IpoCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { from, to } = await searchParams;

  const { success, data: events } = await getIpoCalendarData({ from, to });

  return <IpoCalendar events={events} />;
}
