// Helper function to format dates
const formatDate = (dateString?: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // If it's not a full date, it might be a year-month format
    const parts = dateString.split("-");
    if (parts.length === 2) {
      const year = parts[0];
      const month = new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        1
      ).toLocaleString("default", { month: "short" });
      return `${month} ${year}`;
    }
    return dateString; // Return as is if we can't parse it
  }

  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

// Reusable function to format date range
export const formatDateRange = (
  startDate?: string,
  endDate?: string,
  current?: boolean
): string => {
  if (!startDate) return "";

  const formattedStartDate = formatDate(startDate);

  if (current) {
    return `${formattedStartDate} - Present`;
  }

  if (!endDate) {
    return formattedStartDate;
  }

  const formattedEndDate = formatDate(endDate);
  return `${formattedStartDate} - ${formattedEndDate}`;
};
