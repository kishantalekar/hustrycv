
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getModernCorporateProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  return `
    <div class="modern-corporate-section">
      <h2 class="modern-corporate-section-title">Key Projects</h2>
      ${projects.items
        .map(
          (item) => `
        <div class="modern-corporate-item">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt;">
            <div style="display: flex; align-items: center; gap: 16pt;">
              <div class="modern-corporate-item-title">${item.name}</div>
              ${item.links.length > 0 ? `
                <div style="display: flex; gap: 10pt;">
                  ${item.links.map(link => `
                    <a href="${link.url}" style="color: #3182ce; text-decoration: none; display: inline-flex; align-items: center; gap: 3pt; font-size: 9pt; font-weight: 500;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="modern-corporate-item-meta" style="background: linear-gradient(135deg, #1a365d, #2c5282); color: white; padding: 6pt 12pt; border-radius: 4pt; font-size: 8pt; font-weight: 600;">
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
