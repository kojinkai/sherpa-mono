export type DateRangeQuery = { date?: { gte?: string; lte?: string } };

export type DateRangeFilter = {
  name: string;
  href: string;
  active: boolean;
};
