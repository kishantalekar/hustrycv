
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernCreativeEducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  const colors = ['#4ecdc4', '#45b7d1', '#96ceb4'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">Education</h2>
      ${education.items
        .map(
          (item, index) => `
        <div class="modern-creative-item" style="background: linear-gradient(135deg, ${colors[index % colors.length]}20 0%, ${colors[index % colors.length]}10 100%); border: 2pt solid ${colors[index % colors.length]}40; border-radius: 16pt;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="modern-creative-item-title" style="color: ${colors[index % colors.length]};">${item.institution}</div>
              <div class="modern-creative-item-subtitle">${item.degree}</div>
              ${item.gpa ? `<div style="font-size: 9pt; color: #718096; margin-top: 4pt; font-weight: 500;">
                ${item.isPercentage ? "Score: " : "CGPA: "}${item.gpa}${item.isPercentage ? "%" : ""}
              </div>` : ''}
            </div>
            <div class="modern-creative-item-meta" style="background: ${colors[index % colors.length]}; color: white; padding: 6pt 10pt; border-radius: 12pt; font-size: 8pt; font-weight: 600; transform: skew(-5deg);">
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
