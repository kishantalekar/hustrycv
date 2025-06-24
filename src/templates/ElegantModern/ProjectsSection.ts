
import { getSocialIcon } from '../icons';

export const getElegantModernProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 28pt; padding: 24pt; background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%); border-radius: 16pt; position: relative; overflow: hidden; border: 1pt solid #e2e8f0;">
        <div style="position: absolute; top: -20pt; right: -20pt; width: 80pt; height: 80pt; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; opacity: 0.1;"></div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12pt;">
            <div>
              <h3 style="font-size: 13pt; font-weight: 400; color: #667eea; margin-bottom: 6pt; letter-spacing: 1px;">
                ${project.name}
              </h3>
              ${project.links.length > 0 ? `
                <div style="margin-bottom: 8pt;">
                  ${project.links.map(link => `
                    <a href="${link.url}" style="color: #667eea; text-decoration: none; margin-right: 12pt; font-size: 10pt; display: inline-flex; align-items: center; gap: 4px; font-weight: 300;">
                      ${getSocialIcon(link.icon)}
                      ${link.label}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            ${project.startDate ? `
              <div style="font-size: 10pt; color: white; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 8pt 12pt; border-radius: 20pt; font-weight: 300;">
                ${project.startDate} - ${project.current ? 'Present' : project.endDate}
              </div>
            ` : ''}
          </div>
          <div style="font-size: 11pt; color: #4a5568; line-height: 1.8; font-weight: 300;">
            ${project.description}
          </div>
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="elegant-modern-section">
      <h2 class="elegant-modern-section-title">Projects</h2>
      ${projectsHTML}
    </div>
  `;
};
