
import { formatDateRange } from "../Professional/utils/formatDate";

export const getMinimalistWorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">experience</h2>
      ${work.items
        .map(
          (item) => `
        <div class="minimalist-item">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6pt;">
            <div class="minimalist-item-title">${item.position}</div>
            <div class="minimalist-item-meta">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
          <div class="minimalist-item-subtitle">${item.company}, ${item.location}</div>
          <div style="font-size: 10pt; color: #666666; line-height: 1.7; font-weight: 300;">
            ${item.description}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
