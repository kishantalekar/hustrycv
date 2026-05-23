
import { getSocialIcon } from '../icons';

export const getTechnicalMinimalProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; padding: 16pt; border: 1pt solid #e5e7eb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt; border-bottom: 1pt solid #f3f4f6; padding-bottom: 6pt;">
          <div>
            <h3 style="font-size: 12pt; font-weight: 400; color: #374151; margin-bottom: 4pt; font-family: 'Monaco', monospace;">
              ${project.name}
            </h3>
            ${project.links.length > 0 ? `
              <div style="margin-bottom: 4pt;">
                ${project.links.map(link => `
                  <a href="${link.url}" style="color: #6b7280; text-decoration: none; margin-right: 10pt; font-size: 9pt; display: inline-flex; align-items: center; gap: 2px; font-family: 'Monaco', monospace;">
                    ${getSocialIcon(link.icon)}
                    ${link.label}
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
          ${project.startDate ? `
            <div style="font-size: 9pt; color: #9ca3af; font-family: 'Monaco', monospace;">
              ${project.startDate} - ${project.current ? 'Present' : project.endDate}
            </div>
          ` : ''}
        </div>
        <div style="font-size: 10pt; color: #4b5563; line-height: 1.7; font-family: 'Monaco', monospace;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="technical-minimal-section">
      <h2 class="technical-minimal-section-title">projects</h2>
      ${projectsHTML}
    </div>
  `;
};
