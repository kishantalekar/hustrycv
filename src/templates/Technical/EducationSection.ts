
import { formatDateRange } from "../Professional/utils/formatDate";

export const getTechnicalEducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">Education</h2>
      ${education.items
        .map(
          (item) => `
        <div class="technical-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="technical-item-title">${item.institution}</div>
              <div class="technical-item-subtitle">${item.degree}</div>
              ${item.gpa ? `<div style="font-size: 9pt; color: #6b7280; margin-top: 4pt; font-family: 'JetBrains Mono', monospace;">
                ${item.isPercentage ? "Score: " : "CGPA: "}${item.gpa}${item.isPercentage ? "%" : ""}
              </div>` : ''}
            </div>
            <div class="technical-item-meta">
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
