
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getTechnicalProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  return `
    <div class="technical-section">
      <h2 class="technical-section-title">Projects</h2>
      ${projects.items
        .map(
          (item) => `
        <div class="technical-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div style="display: flex; align-items: center; gap: 12pt;">
              <div class="technical-item-title">${item.name}</div>
              ${item.links.length > 0 ? `
                <div style="display: flex; gap: 8pt;">
                  ${item.links.map(link => `
                    <a href="${link.url}" style="color: #059669; text-decoration: none; display: inline-flex; align-items: center; gap: 3pt; font-size: 9pt; font-family: 'JetBrains Mono', monospace;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
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
