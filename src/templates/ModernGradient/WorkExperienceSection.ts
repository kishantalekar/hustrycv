
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernGradientWorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">Experience</h2>
      ${work.items
        .map(
          (item, index) => `
        <div class="modern-gradient-item" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%); border: 2pt solid transparent; border-radius: 16pt; background-clip: padding-box; position: relative;">
          <div style="position: absolute; inset: 0; padding: 2pt; background: ${gradients[index % gradients.length]}; border-radius: 16pt; z-index: -1;"></div>
          <div style="background: white; border-radius: 14pt; padding: 22pt; position: relative; z-index: 1;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
              <div>
                <div class="modern-gradient-item-title" style="background: ${gradients[index % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${item.position}</div>
                <div class="modern-gradient-item-subtitle">${item.company} • ${item.location}</div>
              </div>
              <div class="modern-gradient-item-meta" style="background: ${gradients[index % gradients.length]}; color: white; padding: 6pt 12pt; border-radius: 12pt; font-size: 8pt; font-weight: 600;">
                ${formatDateRange(item.startDate, item.endDate, item.current)}
              </div>
            </div>
            <div style="font-size: 10pt; color: #4a5568; line-height: 1.7;">
              ${item.description}
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
