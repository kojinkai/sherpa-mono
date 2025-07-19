import { AlphaVantageTickerNormalisedWithName } from "@/models/stock-overview";

export interface QuickListProps {
  className?: string;
  lastupdated: string;
  stocksList: AlphaVantageTickerNormalisedWithName[];
  title: string;
}
