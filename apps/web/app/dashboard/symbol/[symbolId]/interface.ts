import { RouterParams } from "@/app/interface";
import { AlphaVantageCompanyOverview } from "@/utils/alphavantage";

export interface SymbolPageProps {
  data: AlphaVantageCompanyOverview;
  isInWatchlist: boolean;
  symbolId: RouterParams["symbolId"];
}
