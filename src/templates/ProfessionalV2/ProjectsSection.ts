
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getProfessionalV2ProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  return `
    <div class="professional-v2-section">
      <h2 class="professional-v2-section-title">Key Projects</h2>
      ${projects.items
        .map(
          (item) => `
        <div class="professional-v2-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6pt;">
            <div style="display: flex; align-items: center; gap: 8pt;">
              <div class="professional-v2-item-title">${item.name}</div>
              ${item.links.length > 0 ? `
                <div style="display: flex; gap: 6pt;">
                  ${item.links.map(link => `
                    <a href="${link.url}" style="color: #1a365d; text-decoration: none; display: inline-flex; align-items: center; gap: 2pt;">
                      ${getSocialIcon(link.icon)}
                      <span style="font-size: 9pt;">${link.label}</span>
                    </a>
                  `).join('')}
                </div>
              ` : ''}
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
