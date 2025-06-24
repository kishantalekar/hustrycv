
import { formatDateRange } from "../Professional/utils/formatDate";

export const getMinimalistEducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">education</h2>
      ${education.items
        .map(
          (item) => `
        <div class="minimalist-item">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div class="minimalist-item-title">${item.institution}</div>
              <div class="minimalist-item-subtitle">${item.degree}</div>
              ${item.gpa ? `<div style="font-size: 9pt; color: #999999; margin-top: 4pt; font-weight: 300;">
                ${item.isPercentage ? "Score: " : "CGPA: "}${item.gpa}${item.isPercentage ? "%" : ""}
              </div>` : ''}
            </div>
            <div class="minimalist-item-meta">
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
