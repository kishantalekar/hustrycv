
import { formatDateRange } from "../Professional/utils/formatDate";

export const getTechnicalWorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">Experience</h2>
      ${work.items
        .map(
          (item) => `
        <div class="technical-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div>
              <div class="technical-item-title">${item.position}</div>
              <div class="technical-item-subtitle">${item.company} • ${item.location}</div>
            </div>
            <div class="technical-item-meta">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
          <div style="font-size: 10pt; color: #4b5563; line-height: 1.6;">
            ${item.description}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
