
import { formatDateRange } from "../Professional/utils/formatDate";

export const getModernCorporateWorkExperienceHTML = (work: Section<WorkItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Professional Experience</h2>
      ${work.items
        .map(
          (item, index) => `
        <div class="modern-corporate-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div>
              <div class="modern-corporate-item-title">${item.position}</div>
              <div class="modern-corporate-item-subtitle">${item.company} • ${item.location}</div>
            </div>
            <div class="modern-corporate-item-meta" style="background: #3182ce; color: white; padding: 6pt 12pt; border-radius: 4pt; font-size: 8pt; font-weight: 600;">
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
