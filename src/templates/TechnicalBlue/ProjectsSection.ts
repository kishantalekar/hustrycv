
import { getSocialIcon } from '../icons';

export const getTechnicalBlueProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: white; border: 2pt solid #3b82f6; border-radius: 8pt; box-shadow: 0 4pt 8pt rgba(59, 130, 246, 0.1);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #1e40af; margin-bottom: 6pt; font-family: 'Fira Code', monospace;">
              ${project.name}
            </h3>
            ${project.links.length > 0 ? `
              <div style="margin-bottom: 8pt;">
                ${project.links.map(link => `
                  <a href="${link.url}" style="color: #2563eb; text-decoration: none; margin-right: 12pt; font-size: 10pt; display: inline-flex; align-items: center; gap: 4px; font-family: 'Fira Code', monospace;">
                    ${getSocialIcon(link.icon)}
                    ${link.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          ${project.startDate ? `
            <div style="font-size: 10pt; color: white; background: #2563eb; font-family: 'Fira Code', monospace; padding: 6pt 10pt; border-radius: 6pt; font-weight: 500;">
              ${project.startDate} - ${project.current ? 'Present' : project.endDate}
            </div>
          ` : ''}
        </div>
        <div style="font-size: 11pt; color: #1e40af; line-height: 1.6; font-family: 'Fira Code', monospace;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-blue-section">
      <h2 class="technical-blue-section-title">// PROJECTS</h2>
      ${projectsHTML}
    </div>
  `;
};
