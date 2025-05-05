import { Basics } from "@/types";

export const getSummaryHTML = (basics: Basics): string => {
  const { summary } = basics;

  if (!summary) return "";

  return `
    <div class="section">
      <h2 class="section-title">Summary</h2>
      <div class="summary">${summary}</div>
    </div>
  `;
};
