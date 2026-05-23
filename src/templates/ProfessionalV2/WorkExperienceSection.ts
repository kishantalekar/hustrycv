
import { formatDateRange } from "../Professional/utils/formatDate";

export const getProfessionalV2WorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">Professional Experience</h2>
      ${work.items
        .map(
          (item) => `
        <div class="professional-v2-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6pt;">
            <div>
              <div class="professional-v2-item-title">${item.position}</div>
              <div class="professional-v2-item-subtitle">${item.company}, ${item.location}</div>
            </div>
            <div class="professional-v2-item-meta">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
          <div style="font-size: 11pt; color: #4a5568; line-height: 1.5;">
            ${item.description}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
