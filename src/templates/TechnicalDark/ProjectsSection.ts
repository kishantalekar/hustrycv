
import { getSocialIcon } from '../icons';

export const getTechnicalDarkProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: #262626; border: 1pt solid #404040; border-radius: 8pt; border-left: 4pt solid #ffa500;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 700; color: #ffa500; margin-bottom: 6pt; font-family: 'Courier New', monospace;">
              ${project.name}
            </h3>
            ${project.links.length > 0 ? `
              <div style="margin-bottom: 8pt;">
                ${project.links.map(link => `
                  <a href="${link.url}" style="color: #00ffff; text-decoration: none; margin-right: 12pt; font-size: 10pt; display: inline-flex; align-items: center; gap: 4px; font-family: 'Courier New', monospace;">
                    ${getSocialIcon(link.icon)}
                    ${link.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          ${project.startDate ? `
            <div style="font-size: 10pt; color: #00ffff; font-family: 'Courier New', monospace; background: #1a1a1a; padding: 6pt 10pt; border-radius: 4pt; border: 1pt solid #404040;">
              ${project.startDate} - ${project.current ? 'Present' : project.endDate}
            </div>
          ` : ''}
        </div>
        <div style="font-size: 11pt; color: #cccccc; line-height: 1.6; font-family: 'Courier New', monospace;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-dark-section">
      <h2 class="technical-dark-section-title"># PROJECTS</h2>
      ${projectsHTML}
    </div>
  `;
};
