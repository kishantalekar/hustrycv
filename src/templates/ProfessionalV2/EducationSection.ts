
import { formatDateRange } from "../Professional/utils/formatDate";

export const getProfessionalV2EducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">Education</h2>
      ${education.items
        .map(
          (item) => `
        <div class="professional-v2-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="professional-v2-item-title">${item.institution}</div>
              <div class="professional-v2-item-subtitle">${item.degree}</div>
              ${item.gpa ? `<div style="font-size: 10pt; color: #718096; margin-top: 2pt;">
                ${item.isPercentage ? "Percentage: " : "CGPA: "}${item.gpa}${item.isPercentage ? "%" : ""}
              </div>` : ''}
            </div>
            <div class="professional-v2-item-meta">
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
