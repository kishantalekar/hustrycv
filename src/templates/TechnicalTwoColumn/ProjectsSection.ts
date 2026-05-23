
export const getTechnicalTwoColumnProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 20pt; page-break-inside: avoid; background: #1a1a1a; padding: 16pt; border-radius: 4pt; border-left: 4pt solid #00ff88;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <h3 style="font-size: 12pt; font-weight: 600; color: #00ff88; font-family: 'Courier New', monospace;">
            ${project.name}
          </h3>
          <div style="font-size: 9pt; color: #888; font-family: 'Courier New', monospace;">
            ${project.startDate} - ${project.endDate}
          </div>
        </div>
        <div style="font-size: 10pt; color: #e5e7eb; line-height: 1.6; margin-bottom: 8pt; font-family: 'Courier New', monospace;">
          ${project.description}
        </div>
        ${project.links.length > 0 ? `
          <div style="display: flex; gap: 12pt; margin-top: 8pt;">
            ${project.links.map(link => `
              <a href="${link.url}" style="color: #00ff88; text-decoration: none; font-size: 9pt; font-family: 'Courier New', monospace;">
                [${link.label}]
              </a>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="technical-two-column-section">
      <h2 class="technical-two-column-section-title">// projects.portfolio</h2>
      ${projectsHTML}
    </div>
  `;
};
