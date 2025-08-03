import { RouterParams } from "@/app/interface";
import { getSymbolPageData } from "@/utils/alphavantage";
import { isSymbolInWatchlist } from "./actions";
import SymbolPage from "./symbol-page";

export default async function Page({
  params,
}: {
  params: Promise<RouterParams>;
}) {
  const { symbolId } = await params;

  const { data, success } = await getSymbolPageData({ symbolId });
  const isInWatchlist = await isSymbolInWatchlist({ symbolId });

  if (!success) {
    return <div>Error loading symbol data</div>;
  }

  return (
    <SymbolPage isInWatchlist={isInWatchlist} data={data} symbolId={symbolId} />
  );
}
