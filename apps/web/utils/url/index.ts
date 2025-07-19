import { useSearchParams } from "next/navigation";

export function useGetLinkParams() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  return (param: Record<string, string | number>) => {
    // merge current link query with existing queries
    // so individual queries are not overwritten when paginating, filtering by date etc
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries({ ...params, ...param }).map(([key, value]) => [
          key,
          String(value),
        ]),
      ),
    ).toString();

    return `?${queryString}`;
  };
}
