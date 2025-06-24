
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getModernProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  return `
    <div class="modern-section">
      <h2 class="modern-section-title">Projects</h2>
      ${projects.items
        .map(
          (item) => `
        <div class="modern-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div style="display: flex; align-items: center; gap: 16pt;">
              <div class="modern-item-title">${item.name}</div>
              ${item.links.length > 0 ? `
                <div style="display: flex; gap: 10pt;">
                  ${item.links.map(link => `
                    <a href="${link.url}" style="color: #667eea; text-decoration: none; display: inline-flex; align-items: center; gap: 3pt; font-size: 9pt; font-weight: 500;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="modern-item-meta" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4pt 8pt; border-radius: 6pt; font-size: 8pt;">
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
