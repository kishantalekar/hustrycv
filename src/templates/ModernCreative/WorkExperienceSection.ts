
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernCreativeWorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">Experience</h2>
      ${work.items
        .map(
          (item, index) => `
        <div class="modern-creative-item" style="position: relative;">
          <div style="position: absolute; left: -6pt; top: 0; bottom: 0; width: 4pt; background: ${colors[index % colors.length]}; border-radius: 2pt;"></div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div>
              <div class="modern-creative-item-title" style="color: ${colors[index % colors.length]};">${item.position}</div>
              <div class="modern-creative-item-subtitle">${item.company} • ${item.location}</div>
            </div>
            <div class="modern-creative-item-meta" style="background: ${colors[index % colors.length]}; color: white; padding: 6pt 12pt; border-radius: 15pt; font-size: 8pt; font-weight: 600; transform: rotate(-2deg);">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.7;">
            ${item.description}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
