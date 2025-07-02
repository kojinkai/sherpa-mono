import dayjs from "dayjs";

export const formatDate = (dateString: Date) => {
  return dayjs(dateString).format("MMM DD, YYYY");
};

export const formatNumber = (num: number | null | undefined) => {
  if (num === null || num === undefined) return "N/A";
  return num.toLocaleString();
};

export const formatPrice = (price: string | null | undefined) => {
  if (!price) return "N/A";
  return `$${price}`;
};
