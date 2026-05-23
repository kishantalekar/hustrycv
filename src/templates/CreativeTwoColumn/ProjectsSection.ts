
export const getCreativeTwoColumnProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; background: linear-gradient(135deg, #fef3c7 0%, #e0e7ff 100%); padding: 20pt; border-radius: 12pt; border-left: 6pt solid #8b5cf6; box-shadow: 0 4pt 8pt rgba(139, 92, 246, 0.1);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12pt;">
          <h3 style="font-size: 14pt; font-weight: 700; color: #8b5cf6;">
            ${project.name}
          </h3>
          <div style="font-size: 10pt; color: #6b7280; background: white; padding: 6pt 10pt; border-radius: 6pt;">
            ${project.startDate} - ${project.endDate}
          </div>
        </div>
        <div style="font-size: 11pt; color: #4b5563; line-height: 1.7; margin-bottom: 12pt;">
          ${project.description}
        </div>
        ${project.links.length > 0 ? `
          <div style="display: flex; gap: 12pt; margin-top: 12pt;">
            ${project.links.map(link => `
              <a href="${link.url}" style="background: linear-gradient(135deg, #8b5cf6, #f59e0b); color: white; text-decoration: none; font-size: 10pt; padding: 8pt 14pt; border-radius: 20pt; font-weight: 600; box-shadow: 0 2pt 4pt rgba(139, 92, 246, 0.3);">
                ${link.label}
              </a>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `)
    .join('');

  return `
    <div class="creative-two-column-section">
      <h2 class="creative-two-column-section-title">Creative Portfolio</h2>
      ${projectsHTML}
    </div>
  `;
};
