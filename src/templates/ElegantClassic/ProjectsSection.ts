
import { getSocialIcon } from '../icons';

export const getElegantClassicProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: #f8fafc; border: 2pt solid #e2e8f0; border-radius: 8pt;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 500; color: #5a67d8; margin-bottom: 6pt; font-family: 'Georgia', serif;">
              ${project.name}
            </h3>
            ${project.links.length > 0 ? `
              <div style="margin-bottom: 8pt;">
                ${project.links.map(link => `
                  <a href="${link.url}" style="color: #5a67d8; text-decoration: none; margin-right: 12pt; font-size: 10pt; display: inline-flex; align-items: center; gap: 4px; font-family: 'Georgia', serif;">
                    ${getSocialIcon(link.icon)}
                    ${link.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          ${project.startDate ? `
            <div style="font-size: 10pt; color: #6b7280; text-align: right; background: white; padding: 6pt 10pt; border-radius: 8pt; border: 1pt solid #e5e7eb;">
              ${project.startDate} - ${project.current ? 'Present' : project.endDate}
            </div>
          ` : ''}
        </div>
        <div style="font-size: 12pt; color: #4a5568; line-height: 1.8; font-family: 'Georgia', serif;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-classic-section">
      <h2 class="elegant-classic-section-title">Notable Projects</h2>
      ${projectsHTML}
    </div>
  `;
};
