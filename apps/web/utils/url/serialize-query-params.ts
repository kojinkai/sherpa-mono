export function serializeQueryParams(
  params?: Record<string, string | string[] | number>,
) {
  if (!params) {
    return;
  }
  const toQueryParams = Object.entries(params).reduce(
    (accumulator, [key, value], currentIdx) =>
      currentIdx === 0 ? `${key}=${value}` : `${accumulator}&${key}=${value}`,
    "",
  );

  return `?${toQueryParams}`;
}
