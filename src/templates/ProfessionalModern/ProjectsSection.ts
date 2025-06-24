
import { getSocialIcon } from '../icons';

export const getProfessionalModernProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; padding: 20pt; background: white; border-radius: 8pt; border: 1pt solid #e2e8f0; box-shadow: 0 2pt 4pt rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10pt;">
          <div>
            <h3 style="font-size: 13pt; font-weight: 600; color: #2d3748; margin-bottom: 6pt; letter-spacing: 0.5px;">
              ${project.name}
            </h3>
            ${project.links.length > 0 ? `
              <div style="margin-bottom: 8pt;">
                ${project.links.map(link => `
                  <a href="${link.url}" style="color: #3182ce; text-decoration: none; margin-right: 12pt; font-size: 10pt; display: inline-flex; align-items: center; gap: 4px; background: #f7fafc; padding: 4pt 8pt; border-radius: 12pt;">
                    ${getSocialIcon(link.icon)}
                    ${link.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          ${project.startDate ? `
            <div style="font-size: 10pt; color: #718096; font-weight: 500; text-align: right; background: #f7fafc; padding: 6pt 10pt; border-radius: 12pt;">
              ${project.startDate} - ${project.current ? 'Present' : project.endDate}
            </div>
          ` : ''}
        </div>
        <div style="font-size: 11pt; color: #4a5568; line-height: 1.7;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="professional-modern-section">
      <h2 class="professional-modern-section-title">Projects</h2>
      ${projectsHTML}
    </div>
  `;
};
