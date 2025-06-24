
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getModernGradientProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ];
  
  return `
    <div class="modern-gradient-section">
      <h2 class="modern-gradient-section-title">Projects</h2>
      ${projects.items
        .map(
          (item, index) => `
        <div class="modern-gradient-item" style="background: ${gradients[index % gradients.length]}15; border-radius: 16pt; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; right: 0; width: 60pt; height: 60pt; background: ${gradients[index % gradients.length]}20; border-radius: 0 16pt 0 100pt;"></div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt; position: relative; z-index: 1;">
            <div style="display: flex; align-items: center; gap: 16pt;">
              <div class="modern-gradient-item-title" style="background: ${gradients[index % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${item.name}</div>
              ${item.links.length > 0 ? `
                <div style="display: flex; gap: 10pt;">
                  ${item.links.map(link => `
                    <a href="${link.url}" style="background: ${gradients[index % gradients.length]}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-decoration: none; display: inline-flex; align-items: center; gap: 3pt; font-size: 9pt; font-weight: 500;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="modern-gradient-item-meta" style="background: ${gradients[index % gradients.length]}; color: white; padding: 6pt 12pt; border-radius: 12pt; font-size: 8pt; font-weight: 600;">
              ${formatDateRange(item.startDate, item.endDate, item.current)}
            </div>
          </div>
          <div style="font-size: 10pt; color: #4a5568; line-height: 1.7; position: relative; z-index: 1;">
            ${item.description}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
};
