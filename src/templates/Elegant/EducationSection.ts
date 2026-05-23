
import { formatDateRange } from "../Professional/utils/formatDate";

export const getElegantEducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">Education</h2>
      <hr class="elegant-divider"/>
      ${education.items
        .map(
          (item) => `
        <div class="elegant-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div>
              <div class="elegant-item-title">${item.degree}</div>
              <div class="elegant-item-subtitle">${item.institution}${item.location ? ", " + item.location : ""}</div>
              ${item.gpa ? `<div style="font-size: 11pt; color: #059669; font-weight: 500;">${item.isPercentage ? "Percentage: " : "GPA: "}${item.gpa}${item.isPercentage ? "%" : ""}</div>` : ''}
            </div>
            <div class="elegant-item-meta">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
