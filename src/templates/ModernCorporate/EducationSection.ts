
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernCorporateEducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Education</h2>
      ${education.items
        .map(
          (item) => `
        <div class="modern-corporate-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="modern-corporate-item-title">${item.institution}</div>
              <div class="modern-corporate-item-subtitle">${item.degree}</div>
              ${item.gpa ? `<div style="font-size: 9pt; color: #718096; margin-top: 4pt; font-weight: 500;">
                ${item.isPercentage ? "Academic Performance: " : "CGPA: "}${item.gpa}${item.isPercentage ? "%" : ""}
              </div>` : ''}
            </div>
            <div class="modern-corporate-item-meta" style="background: #2c5282; color: white; padding: 6pt 12pt; border-radius: 4pt; font-size: 8pt; font-weight: 600;">
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
