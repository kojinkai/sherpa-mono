import { getIpoCalendarData } from "./get-data";
import { IpoCalendar } from "./ipo-calendar";

export default async function IpoCalendarPage() {
  const { data: events } = await getIpoCalendarData();

  return <IpoCalendar events={events} />;
}
