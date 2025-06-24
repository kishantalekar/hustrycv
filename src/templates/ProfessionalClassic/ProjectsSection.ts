
import { getSocialIcon } from '../icons';

export const getProfessionalClassicProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; padding-bottom: 20pt; border-bottom: 1pt solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 700; color: #2d3748; margin-bottom: 4pt; font-family: 'Times New Roman', serif;">
              ${project.name}
            </h3>
            ${project.links.length > 0 ? `
              <div style="margin-bottom: 6pt;">
                ${project.links.map(link => `
                  <a href="${link.url}" style="color: #2d3748; text-decoration: none; margin-right: 12pt; font-size: 10pt; display: inline-flex; align-items: center; gap: 4px;">
                    ${getSocialIcon(link.icon)}
                    ${link.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          ${project.startDate ? `
            <div style="font-size: 10pt; color: #718096; font-style: italic; text-align: right; font-family: 'Times New Roman', serif;">
              ${project.startDate} - ${project.current ? 'Present' : project.endDate}
            </div>
          ` : ''}
        </div>
        <div style="font-size: 11pt; color: #4a5568; line-height: 1.7; text-align: justify; font-family: 'Times New Roman', serif;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-classic-section">
      <h2 class="professional-classic-section-title">Notable Projects</h2>
      ${projectsHTML}
    </div>
  `;
};
