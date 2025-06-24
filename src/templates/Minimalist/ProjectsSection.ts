
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getMinimalistProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  return `
    <div class="minimalist-section">
      <h2 class="minimalist-section-title">projects</h2>
      ${projects.items
        .map(
          (item) => `
        <div class="minimalist-item">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6pt;">
            <div style="display: flex; align-items: center; gap: 12pt;">
              <div class="minimalist-item-title">${item.name}</div>
              ${item.links.length > 0 ? `
                <div style="display: flex; gap: 8pt;">
                  ${item.links.map(link => `
                    <a href="${link.url}" style="color: #666666; text-decoration: none; display: inline-flex; align-items: center; gap: 2pt; font-size: 9pt;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="minimalist-item-meta">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
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
