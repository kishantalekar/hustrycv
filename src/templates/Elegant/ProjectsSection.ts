
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getElegantProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  return `
    <div class="elegant-section">
      <h2 class="elegant-section-title">Notable Projects</h2>
      <hr class="elegant-divider"/>
      ${projects.items
        .map(
          (item) => `
        <div class="elegant-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 12pt; margin-bottom: 4pt;">
                <div class="elegant-item-title">${item.name}</div>
                ${item.links.length > 0 ? 
                  item.links.map(link => 
                    `<a href="${link.url}" style="color: #2563eb; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-size: 10pt;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>`
                  ).join(' • ') : ''
                }
              </div>
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
