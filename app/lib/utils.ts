import { Revenue } from "./definitions";

/**
 * Format a given amount (in cents) to a string representing the currency amount.
 * The formatted string is a localized string for the 'en-US' locale, with the
 * currency symbol and the 'short' month format.
 * @param amount Amount in cents
 * @returns Formatted string representing the currency amount
 */
export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

/**
 * Format a date string to a localized string, using the locale's date format
 * and the 'short' month format.
 *
 * @param {string} dateStr - The date string to format
 * @param {string} [locale=en-US] - The locale to use for formatting
 * @returns {string} The formatted date string
 */
export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

/**
 * Generates y-axis labels and the highest y-axis value for a bar chart,
 * given an array of revenue data.
 *
 * @param {Revenue[]} revenue - The revenue data to generate the y-axis labels for
 * @returns {{ yAxisLabels: string[], topLabel: number }} An object containing
 *          `yAxisLabels`, an array of strings representing the y-axis labels,
 *          and `topLabel`, the highest y-axis value
 */
export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

/**
 * Generates an array of page numbers for a pagination component, given the
 * current page number and the total number of pages.
 *
 * The algorithm works as follows:
 * - If the total number of pages is 7 or less, display all pages
 *   without any ellipsis.
 * - If the current page is among the first 3 pages, show the first 3,
 *   an ellipsis, and the last 2 pages.
 * - If the current page is among the last 3 pages, show the first 2,
 *   an ellipsis, and the last 3 pages.
 * - If the current page is somewhere in the middle, show the first page,
 *   an ellipsis, the current page and its neighbors, another ellipsis,
 *   and the last page.
 *
 * @param {number} currentPage - The current page number (1-indexed)
 * @param {number} totalPages - The total number of pages
 * @returns {number[]} An array of page numbers
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
