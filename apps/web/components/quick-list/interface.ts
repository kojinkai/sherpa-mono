import { AlphaVantageTickerNormalisedWithName } from "@/models";

export interface QuickListProps {
  className?: string;
  lastupdated: string;
  stocksList: AlphaVantageTickerNormalisedWithName[];
  title: string;
}
