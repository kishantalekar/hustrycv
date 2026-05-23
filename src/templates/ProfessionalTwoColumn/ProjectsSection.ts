
export const getProfessionalTwoColumnProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 20pt; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8pt;">
          <h3 style="font-size: 12pt; font-weight: 600; color: #1f2937;">
            ${project.name}
          </h3>
          <div style="font-size: 9pt; color: #6b7280;">
            ${project.startDate} - ${project.endDate}
          </div>
        </div>
        <div style="font-size: 10pt; color: #4b5563; line-height: 1.6; margin-bottom: 8pt;">
          ${project.description}
        </div>
        ${project.links.length > 0 ? `
          <div style="display: flex; gap: 12pt; margin-top: 8pt;">
            ${project.links.map(link => `
              <a href="${link.url}" style="color: #2563eb; text-decoration: none; font-size: 9pt;">
                ${link.label}
              </a>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="professional-two-column-section">
      <h2 class="professional-two-column-section-title">Projects</h2>
      ${projectsHTML}
    </div>
  `;
};
