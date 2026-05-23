
import { formatDateRange } from "../Professional/utils/formatDate";

export const getElegantWorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">Professional Experience</h2>
      <hr class="elegant-divider"/>
      ${work.items
        .map(
          (item) => `
        <div class="elegant-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div>
              <div class="elegant-item-title">${item.position}</div>
              <div class="elegant-item-subtitle">${item.company} • ${item.location}</div>
            </div>
            <div class="elegant-item-meta">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
          <div style="font-size: 11pt; color: #374151; line-height: 1.6;">
            ${item.description}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
