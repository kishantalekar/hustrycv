
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernWorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">Experience</h2>
      ${work.items
        .map(
          (item) => `
        <div class="modern-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div>
              <div class="modern-item-title">${item.position}</div>
              <div class="modern-item-subtitle">${item.company} • ${item.location}</div>
            </div>
            <div class="modern-item-meta" style="background: #667eea; color: white; padding: 4pt 8pt; border-radius: 6pt; font-size: 8pt;">
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
