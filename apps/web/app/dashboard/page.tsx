import { QuickList } from "@/components";
import { getData } from "./getData";

export default async function DashboardPage() {
  const data = await getData();

  if (data) {
    const { last_updated, top_gainers, top_losers, most_actively_traded } =
      data;

    return (
      <div className="flex flex-col md:flex-row gap-4">
        <QuickList
          lastupdated={last_updated}
          className="flex-1"
          stocksList={top_gainers}
          title="Top Gainers"
        />
        <QuickList
          lastupdated={last_updated}
          className="flex-1"
          stocksList={top_losers}
          title="Top Losers"
        />
        <QuickList
          lastupdated={last_updated}
          className="flex-1"
          stocksList={most_actively_traded}
          title="Most Traded"
        />
      </div>
    );
  }

  return <div>data could not be loaded</div>;
}
