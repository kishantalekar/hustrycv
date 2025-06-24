
import { getSocialIcon } from '../icons';

export const getElegantMinimalProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 32pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt; border-bottom: 1pt solid #f1f5f9; padding-bottom: 8pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 300; color: #2d3748; margin-bottom: 4pt; letter-spacing: 2px;">
              ${project.name}
            </h3>
            ${project.links.length > 0 ? `
              <div style="margin-bottom: 4pt;">
                ${project.links.map(link => `
                  <a href="${link.url}" style="color: #a0aec0; text-decoration: none; margin-right: 12pt; font-size: 9pt; display: inline-flex; align-items: center; gap: 3px; font-weight: 300; letter-spacing: 1px;">
                    ${getSocialIcon(link.icon)}
                    ${link.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          ${project.startDate ? `
            <div style="font-size: 9pt; color: #a0aec0; font-weight: 300; letter-spacing: 1px;">
              ${project.startDate} - ${project.current ? 'Present' : project.endDate}
            </div>
          ` : ''}
        </div>
        <div style="font-size: 10pt; color: #4a5568; line-height: 1.9; text-align: justify; font-weight: 300; padding-left: 16pt;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-minimal-section">
      <h2 class="elegant-minimal-section-title">projects</h2>
      ${projectsHTML}
    </div>
  `;
};
