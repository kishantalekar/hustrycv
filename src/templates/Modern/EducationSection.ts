
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernEducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">Education</h2>
      ${education.items
        .map(
          (item) => `
        <div class="modern-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="modern-item-title">${item.institution}</div>
              <div class="modern-item-subtitle">${item.degree}</div>
              ${item.gpa ? `<div style="font-size: 9pt; color: #718096; margin-top: 4pt; font-weight: 500;">
                ${item.isPercentage ? "Score: " : "CGPA: "}${item.gpa}${item.isPercentage ? "%" : ""}
              </div>` : ''}
            </div>
            <div class="modern-item-meta" style="background: #764ba2; color: white; padding: 4pt 8pt; border-radius: 6pt; font-size: 8pt;">
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
