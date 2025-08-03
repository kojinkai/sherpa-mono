import { getIpoCalendarData } from "./get-data";
import { IpoCalendar } from "./ipo-calendar";

export default async function IpoCalendarPage() {
  const { data: events, success } = await getIpoCalendarData();

  if (!success) {
    return <div>Error loading IPO calendar</div>;
  }

  return <IpoCalendar events={events ?? []} />;
}
