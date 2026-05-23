
export const getMinimalistModernProjectsHTML = (projectItems: ProjectItem[], settings: Settings) => {
  if (!projectItems || projectItems.length === 0) return '';

  const projectsHTML = projectItems
    .map(project => `
      <div style="margin-bottom: 24pt; page-break-inside: avoid; padding: 16pt; background: #f9fafb; border-radius: 4pt;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8pt;">
          <h3 style="font-size: 12pt; font-weight: 400; color: #1f2937; letter-spacing: 1px;">${project.name}</h3>
          <span style="font-size: 9pt; color: #6b7280; font-weight: 300;">${project.startDate} - ${project.endDate}</span>
        </div>
        <div style="font-size: 10pt; color: #374151; line-height: 1.8; font-weight: 300; text-align: justify; margin-bottom: 8pt;">
          ${project.description}
        </div>
      </div>
    `)
    .join('');

  return `
    <div class="minimalist-modern-section">
      <h2 class="minimalist-modern-section-title">projects</h2>
      ${projectsHTML}
    </div>
  `;
};
