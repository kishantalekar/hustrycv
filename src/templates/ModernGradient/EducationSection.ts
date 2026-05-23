
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernGradientEducationHTML = (education: Section<EducationItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">Education</h2>
      ${education.items
        .map(
          (item, index) => `
        <div class="modern-gradient-item" style="background: ${gradients[index % gradients.length]}20; border-radius: 16pt; border: 2pt solid ${gradients[index % gradients.length]}40;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <div class="modern-gradient-item-title" style="background: ${gradients[index % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${item.institution}</div>
              <div class="modern-gradient-item-subtitle">${item.degree}</div>
              ${item.gpa ? `<div style="font-size: 9pt; color: #718096; margin-top: 4pt; font-weight: 500;">
                ${item.isPercentage ? "Score: " : "CGPA: "}${item.gpa}${item.isPercentage ? "%" : ""}
              </div>` : ''}
            </div>
            <div class="modern-gradient-item-meta" style="background: ${gradients[index % gradients.length]}; color: white; padding: 6pt 12pt; border-radius: 12pt; font-size: 8pt; font-weight: 600;">
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
