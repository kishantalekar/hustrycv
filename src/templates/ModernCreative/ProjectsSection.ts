
import { getSocialIcon } from '../icons';
import { formatDateRange } from '../Professional/utils/formatDate';

export const getModernCreativeProjectsHTML = (projects: Section<ProjectItem>, settings: Settings) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
  
  return `
    <div class="modern-creative-section">
      <h2 class="modern-creative-section-title">Projects</h2>
      ${projects.items
        .map(
          (item, index) => `
        <div class="modern-creative-item" style="background: linear-gradient(135deg, ${colors[index % colors.length]}15 0%, ${colors[index % colors.length]}05 100%); border-left: 6pt solid ${colors[index % colors.length]}; border-radius: 0 16pt 16pt 0; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -10pt; right: -10pt; width: 30pt; height: 30pt; background: ${colors[index % colors.length]}20; border-radius: 50%; transform: rotate(45deg);"></div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8pt; position: relative; z-index: 1;">
            <div style="display: flex; align-items: center; gap: 16pt;">
              <div class="modern-creative-item-title" style="color: ${colors[index % colors.length]};">${item.name}</div>
              ${item.links.length > 0 ? `
                <div style="display: flex; gap: 10pt;">
                  ${item.links.map(link => `
                    <a href="${link.url}" style="color: ${colors[index % colors.length]}; text-decoration: none; display: inline-flex; align-items: center; gap: 3pt; font-size: 9pt; font-weight: 500; padding: 4pt 8pt; background: ${colors[index % colors.length]}20; border-radius: 10pt;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="modern-creative-item-meta" style="background: linear-gradient(135deg, ${colors[index % colors.length]}, ${colors[(index + 1) % colors.length]}); color: white; padding: 6pt 10pt; border-radius: 12pt; font-size: 8pt; font-weight: 600; transform: rotate(3deg);">
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
