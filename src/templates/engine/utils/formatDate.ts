/**
 * Shared date-formatting utilities for all template section renderers.
 * Previously duplicated in every template's utils/formatDate.ts.
 */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Formats an ISO date string (YYYY-MM or YYYY-MM-DD) to "Mon YYYY".
 * Returns the string as-is if it cannot be parsed.
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) {
    return '';
  }

  // Try parsing YYYY-MM format first (common in resume data)
  const parts = dateString.split('-');
  if (parts.length >= 2) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex < 12) {
      return `${MONTHS[monthIndex]} ${year}`;
    }
  }

  // Fallback to full date parsing
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short'});
  }

  return dateString; // Return as-is if we can't parse
};

/**
 * Formats a date range as "Mon YYYY – Mon YYYY" or "Mon YYYY – Present".
 * Returns an empty string if startDate is absent.
 */
export const formatDateRange = (
  startDate?: string,
  endDate?: string,
  current?: boolean,
): string => {
  if (!startDate) {
    return '';
  }

  const formattedStart = formatDate(startDate);

  if (current) {
    return `${formattedStart} – Present`;
  }

  if (!endDate) {
    return formattedStart;
  }

  return `${formattedStart} – ${formatDate(endDate)}`;
};

/** Renders a styled date-range span (for inline use in section headers). */
export const renderDateRangeSpan = (
  startDate?: string,
  endDate?: string,
  current?: boolean,
  color = '#6b7280',
): string => {
  const text = formatDateRange(startDate, endDate, current);
  if (!text) {
    return '';
  }
  return `<span style="font-size:10pt;color:${color};white-space:nowrap;">${text}</span>`;
};
